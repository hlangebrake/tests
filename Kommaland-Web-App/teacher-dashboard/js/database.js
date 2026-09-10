import {openDB,addIndexes,request,transactionDone,indexAll,getAll} from '../shared/idb.js';
import {uid,nowISO,stableStringify,validateSave} from '../shared/save-schema.js';
import {project} from '../shared/projection.js';
export const STORES=['students','sessions','events','questProgress','taskProgress','snapshots','imports'];
export const databaseName=()=> 'kommaland:teacher:'+location.pathname.replace(/[^/]*$/,'');
const latest=(xs,key)=>xs.slice().sort((a,b)=>a[key].localeCompare(b[key])).at(-1);
/** Pure merge planner also used in tests. An event ID is immutable: conflicting
 * content is rejected, never silently overwritten. Sessions can gain an end/time.
 */
export function planMerge(old,save){
 const events=new Map(old.events.map(e=>[e.eventId,e])),sessions=new Map(old.sessions.map(s=>[s.sessionId,s]));
 const added=[],updated=[];let eventsIgnoredAsDuplicates=0,sessionsIgnoredAsDuplicates=0;
 for(const e of save.events){const previous=events.get(e.eventId);if(previous){if(stableStringify(previous)!==stableStringify(e))throw new Error('Konflikt: Eine vorhandene eventId enthält andere Daten. Datei nicht importiert.');eventsIgnoredAsDuplicates++;}else{events.set(e.eventId,e);added.push(e);}}
 for(const s of save.sessions){const previous=sessions.get(s.sessionId);if(previous){if(previous.startedAt!==s.startedAt)throw new Error('Konflikt: Gleiche sessionId mit anderem Sitzungsbeginn.');if((s.updatedAt>previous.updatedAt||s.updatedAt===previous.updatedAt&&!previous.finishedAt&&s.finishedAt)&&(s.duration>=previous.duration)){const merged={...s,finishedAt:s.finishedAt||previous.finishedAt,finishReason:s.finishReason||previous.finishReason};if(stableStringify(merged)!==stableStringify(previous)){sessions.set(s.sessionId,merged);updated.push(merged);}else sessionsIgnoredAsDuplicates++;}else sessionsIgnoredAsDuplicates++;}else{sessions.set(s.sessionId,s);updated.push(s);}}
 const snapshot={studentId:save.studentId,exportId:save.exportId,exportTimestamp:save.exportTimestamp,studentName:save.studentName,currentState:save.currentState,appVersion:save.appVersion,coverage:save.coverage,catalog:save.catalog};
 const previousSnapshot=old.snapshots.find(s=>s.exportId===save.exportId);
 if(previousSnapshot&&stableStringify(previousSnapshot)!==stableStringify(snapshot))throw new Error('Konflikt: Gleiche Export-ID mit unterschiedlichem Speicherstand.');
 const snapshots=previousSnapshot?old.snapshots:[...old.snapshots,snapshot],newest=latest(snapshots,'exportTimestamp');
 const student={...(old.student||{}),studentId:save.studentId,studentName:newest.studentName,latestExportAt:newest.exportTimestamp,catalog:newest.catalog,coverage:newest.coverage,className:old.student?.className||'',firstImportedAt:old.student?.firstImportedAt||nowISO()};
 return {events:[...events.values()],sessions:[...sessions.values()],snapshots,student,newEvents:added,newSessions:updated,newSnapshot:!previousSnapshot?snapshot:null,eventsIgnoredAsDuplicates,sessionsIgnoredAsDuplicates,status:added.length||updated.length||!previousSnapshot?'imported':'duplicate'};
}
export class TeacherDB{
 constructor(name=databaseName()){this.ready=openDB(name,1,db=>{
  db.createObjectStore('students',{keyPath:'studentId'}).createIndex('studentName','studentName');
  for(const [store,key] of [['sessions','sessionId'],['events','eventId'],['questProgress','questId'],['taskProgress','taskId'],['snapshots','exportId']])addIndexes(db.createObjectStore(store,{keyPath:['studentId',key]}));
  const i=db.createObjectStore('imports',{keyPath:'importId'});i.createIndex('timestamp','timestamp');i.createIndex('studentId','studentId');
 });}
 async all(store){return getAll(await this.ready,store);}
 async forStudent(store,id){return indexAll(await this.ready,store,'studentId',id);}
 async student(id){const db=await this.ready;return request(db.transaction('students').objectStore('students').get(id));}
 async merge(raw,fileName){
  const save=validateSave(raw),db=await this.ready,tx=db.transaction(STORES,'readwrite'),done=transactionDone(tx);let result;
  try{
   const read=(store)=>request(tx.objectStore(store).index('studentId').getAll(save.studentId));
   const [student,events,sessions,snapshots]=await Promise.all([request(tx.objectStore('students').get(save.studentId)),read('events'),read('sessions'),read('snapshots')]);
   const plan=planMerge({student,events,sessions,snapshots},save);
   result={importId:uid(),timestamp:nowISO(),fileName:String(fileName).slice(0,1000),studentId:save.studentId,studentsAffected:[save.studentId],eventsAdded:plan.newEvents.length,eventsIgnoredAsDuplicates:plan.eventsIgnoredAsDuplicates,sessionsUpdated:plan.newSessions.length,sessionsIgnoredAsDuplicates:plan.sessionsIgnoredAsDuplicates,snapshotsAdded:plan.newSnapshot?1:0,status:plan.status};
   for(const e of plan.newEvents)tx.objectStore('events').add(e);
   for(const s of plan.newSessions)tx.objectStore('sessions').put(s);
   if(plan.newSnapshot)tx.objectStore('snapshots').add(plan.newSnapshot);
   tx.objectStore('students').put(plan.student);
   if(plan.status!=='duplicate'){
    const p=project({studentId:save.studentId,catalog:plan.student.catalog,events:plan.events,snapshots:plan.snapshots});
    for(const q of p.quests)tx.objectStore('questProgress').put(q);for(const t of p.tasks)tx.objectStore('taskProgress').put(t);
   }
   tx.objectStore('imports').add(result);await done;return result;
  }catch(e){try{tx.abort();}catch{}await done.catch(()=>{});throw e;}
 }
 async recordFailure(fileName,error,status='invalid'){
  const db=await this.ready,tx=db.transaction('imports','readwrite'),done=transactionDone(tx);
  const r={importId:uid(),timestamp:nowISO(),fileName:String(fileName).slice(0,1000),studentId:null,studentsAffected:[],eventsAdded:0,eventsIgnoredAsDuplicates:0,status,error:String(error).slice(0,1000)};tx.objectStore('imports').add(r);await done;return r;
 }
 async setClass(id,className){const db=await this.ready,tx=db.transaction('students','readwrite'),done=transactionDone(tx);const s=await request(tx.objectStore('students').get(id));if(s){s.className=String(className).trim().slice(0,60);tx.objectStore('students').put(s);}await done;}
 async deleteStudent(id){
  const db=await this.ready,tx=db.transaction(STORES,'readwrite'),done=transactionDone(tx);tx.objectStore('students').delete(id);
  for(const store of STORES.filter(x=>x!=='students')){const idx=tx.objectStore(store).index('studentId'),r=idx.openCursor(IDBKeyRange.only(id));r.onsuccess=()=>{const c=r.result;if(c){c.delete();c.continue();}};}
  await done;
 }
 async clear(){const db=await this.ready,tx=db.transaction(STORES,'readwrite'),done=transactionDone(tx);for(const s of STORES)tx.objectStore(s).clear();await done;}
 async detail(id,asOf){const [student,events,sessions,snapshots]=await Promise.all([this.student(id),this.forStudent('events',id),this.forStudent('sessions',id),this.forStudent('snapshots',id)]);if(!student)return null;return {student,sessions,snapshots,...project({studentId:id,catalog:student.catalog,events,snapshots,asOf})};}
 async backup(){const [students,sessions,events,snapshots,imports]=await Promise.all(['students','sessions','events','snapshots','imports'].map(s=>this.all(s)));return {format:'kommaland.teacher-backup',schemaVersion:1,createdAt:nowISO(),students,sessions,events,snapshots,imports};}
}

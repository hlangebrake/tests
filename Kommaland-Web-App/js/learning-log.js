import {FORMAT, SCHEMA_VERSION, APP_VERSION, uid, nowISO, taskIdFor, cleanName, validateSave,stableStringify} from '../teacher-dashboard/shared/save-schema.js';
import {CATALOG} from '../teacher-dashboard/shared/catalog.js';
import {project,eventOrder} from '../teacher-dashboard/shared/projection.js';
import {openDB,addIndexes,request,transactionDone,indexAll} from '../teacher-dashboard/shared/idb.js';

/** The game state remains authoritative. Only evidence (immutable events and sessions)
 * lives here. No answers, keystrokes, device fingerprints or mathematical solutions.
 * Foreground time is sampled in bounded slices, pauses after 90s without interaction.
 */
export class LearningLog {
 constructor(getState,onError=()=>{}){
  this.getState=getState;this.onError=onError;this.events=[];this.sessions=[];this.pending=new Map();this.ctx={};this.helps=new Map();this.sequence=0;this.studentId=null;this.current=null;this.live=false;this.topic=null;this.lastTick=performance.now();this.lastInput=performance.now();this.lastTimestamp=0;this.chain=Promise.resolve();this.durable=true;this.revision=0;this.flushedRevision=0;this.flushing=null;
  const base=location.pathname.replace(/[^/]*$/,'');this.walKey='kommaland:learning-outbox:'+base;
  this.dbPromise=openDB('kommaland:learning:'+base,1,db=>{addIndexes(db.createObjectStore('events',{keyPath:['studentId','eventId']}));addIndexes(db.createObjectStore('sessions',{keyPath:['studentId','sessionId']}));}).catch(e=>{this.durable=false;this.onError('Die Lernhistorie kann nicht dauerhaft gespeichert werden. Vor dem Schließen unbedingt exportieren. '+e.message);return null;});
  this.timer=setInterval(()=>{this.tick();this.flush();},10000);
  const activity=()=>{this.lastInput=performance.now();};
  document.addEventListener('pointerdown',activity,{passive:true});document.addEventListener('keydown',activity,{passive:true});document.addEventListener('pointermove',e=>{if(e.buttons)activity();},{passive:true});
 }
 attach(){if(this.attaching)return this.attaching;this.attaching=this._attach().finally(()=>this.attaching=null);return this.attaching;}
 async _attach(){
  const p=this.getState().learner;if(!p?.studentId||!cleanName(p.studentName))return;
  if(this.studentId===p.studentId&&this.current)return;
  if(this.current){this.finish('profile_changed');await this.flush();}
  this.studentId=p.studentId;this.ctx={};this.helps.clear();this.events=[];this.sessions=[];this.pending.clear();this.current=null;
  const db=await this.dbPromise;
  if(db){[this.events,this.sessions]=await Promise.all([indexAll(db,'events','studentId',this.studentId),indexAll(db,'sessions','studentId',this.studentId)]);}
  // Recover only this person's short write-ahead outbox. Never fabricate missed activity.
  try{const wal=JSON.parse(localStorage.getItem(this.walKey)||'null');if(wal?.studentId===this.studentId){const ids=new Set(this.events.map(e=>e.eventId));for(const e of wal.events||[]){if(!ids.has(e.eventId)){this.events.push(e);this.pending.set(e.eventId,e);ids.add(e.eventId);}}for(const s of wal.sessions||[]){const i=this.sessions.findIndex(x=>x.sessionId===s.sessionId);if(i<0)this.sessions.push(s);else if(s.updatedAt>this.sessions[i].updatedAt)this.sessions[i]=s;}}}catch{this.onError('Eine Zwischensicherung der Lernhistorie war nicht lesbar. Der Spielstand bleibt erhalten.');}
  this.events.sort(eventOrder);
  this.lastTimestamp=this.events.reduce((n,e)=>Math.max(n,Date.parse(e.timestamp)),0);this.sequence=0;
  for(const s of this.sessions)if(!s.finishedAt){s.finishedAt=s.updatedAt;s.finishReason='interrupted';}
  this.startSession();
  if(!this.events.some(e=>e.type==='history_baseline')){
   const s=this.getState(),dates={};for(const [id,v] of Object.entries(s.completed))dates[id]=v.at;
   this.emit('history_baseline',{completed:Object.keys(s.completed),started:Object.keys(s.progress),completionDates:dates,legacy:!!Object.keys(s.completed).length||!!Object.keys(s.progress).length},{});
  }
  // An open help at a previous abrupt shutdown ends at its last measured activity.
  const opened=new Map();for(const e of this.events){if(e.type.endsWith('_opened'))opened.set(e.data.helpId,e);if(e.type.endsWith('_closed'))opened.delete(e.data.helpId);}
  for(const e of opened.values())this.emit(e.type.replace('_opened','_closed'),{helpId:e.data.helpId,recovered:true,closedAt:this.sessions.find(s=>s.sessionId===e.sessionId)?.finishedAt||e.timestamp},this.contextOf(e));
  this.updateChallenges();await this.flush();
 }
 contextOf(e){const o={};for(const k of ['questId','taskId','topicId','runId','taskRunId','skillId','kind'])if(e[k])o[k]=e[k];return o;}
 stamp(){this.lastTimestamp=Math.max(Date.now(),this.lastTimestamp+1);return new Date(this.lastTimestamp).toISOString();}
 emit(type,data={},context=this.ctx){
  if(!this.studentId||!this.current)return null;
  if(this.current.finishedAt)this.startSession();
  const e={eventId:uid(),studentId:this.studentId,sessionId:this.current.sessionId,timestamp:this.stamp(),sequence:++this.sequence,type,...context,data};
  this.events.push(e);this.pending.set(e.eventId,e);this.current.updatedAt=e.timestamp;this.revision++;this.checkpoint();this.flush();return e;
 }
 startSession(){
  if(!this.studentId||this.current&&!this.current.finishedAt)return;
  const at=this.stamp();this.current={sessionId:uid(),studentId:this.studentId,startedAt:at,updatedAt:at,finishedAt:null,duration:0,finishReason:null};this.sessions.push(this.current);this.live=!document.hidden;this.lastTick=performance.now();this.lastInput=performance.now();this.emit('session_started',{},{});
 }
 ensure(){if(!this.current||this.current.finishedAt)this.startSession();}
 tick(){
  const now=performance.now(),from=this.lastTick;this.lastTick=now;
  if(!this.live||!this.current||this.current.finishedAt)return;
  // An unresponsive/suspended tab cannot accrue a long unattended interval.
  const duration=Math.round(Math.max(0,Math.min(now,this.lastInput+90000)-from));
  if(duration<=0||now-from>30000)return;
  this.current.duration+=duration;
  this.emit('activity_slice',{duration,from:new Date(Date.now()-duration).toISOString(),helpIds:[...this.helps.values()].map(x=>x.helpId)},this.ctx);
 }
 checkpoint(){
  try{localStorage.setItem(this.walKey,JSON.stringify({studentId:this.studentId,events:[...this.pending.values()],sessions:this.current?[this.current]:[]}));}catch{this.onError('Die kurzfristige Lernverlaufs-Sicherung ist voll. Bitte jetzt exportieren.');}
 }
 async flush(){
  // Coalesce event bursts into one writer. Persist only dirty data; a finished session
  // may change without another event, so revision is also bumped by finish().
  if(this.flushing)return this.flushing;
  this.flushing=(async()=>{
   const db=await this.dbPromise;if(!db||!this.studentId)return;
   while(this.pending.size||this.flushedRevision<this.revision){
    const revision=this.revision,batch=[...this.pending.values()],sessions=this.sessions.map(s=>({...s}));
    const tx=db.transaction(['events','sessions'],'readwrite'),done=transactionDone(tx);
    for(const e of batch)tx.objectStore('events').put(e);for(const s of sessions)tx.objectStore('sessions').put(s);
    await done;for(const e of batch)this.pending.delete(e.eventId);this.flushedRevision=revision;this.durable=true;this.checkpoint();
   }
  })().catch(e=>{this.durable=false;this.onError('Lernhistorie noch nicht dauerhaft gesichert. Bitte exportieren. '+e.message);}).finally(()=>{this.flushing=null;});
  return this.flushing;
 }
 pauseVisibility(){this.tick();this.live=false;this.checkpoint();this.flush();}
 resumeVisibility(){this.live=true;this.lastTick=performance.now();this.lastInput=performance.now();}
 setScreen(screen){
  this.tick();
  for(const [key,h] of [...this.helps])if(h.screen!==screen)this.closeHelp(key);
  if(!['task','lesson','example','info'].includes(screen)){this.ctx={};}
 }
 closeHelp(key){const h=this.helps.get(key);if(!h)return;this.tick();this.emit(h.type+'_closed',{helpId:h.helpId},h.context);this.helps.delete(key);}
 closeHelps(){for(const key of [...this.helps.keys()])this.closeHelp(key);}
 help(type,screen,automatic=false,key=type,resumed=false){
  this.ensure();if(this.helps.has(key))return;this.tick();
  const h={type,screen,helpId:uid(),context:{...this.ctx},automatic};this.helps.set(key,h);this.emit(type+'_opened',{helpId:h.helpId,automatic,resumed});
 }
 quest(q,{replay=false,encounter=false,exam=false}={}){
  this.ensure();this.tick();this.closeHelps();
  const kind=exam?'exam':encounter?'encounter':q.challenge?'challenge':'regular';
  const previous=[...this.events].reverse().find(e=>e.questId===q.id&&['quest_started','quest_resumed','challenge_started','exam_started'].includes(e.type));
  const finished=previous&&this.events.some(e=>e.runId===previous.runId&&['quest_completed','challenge_completed','exam_completed'].includes(e.type));
  const runId=!replay&&!finished&&previous?.runId?previous.runId:uid();
  this.ctx={questId:q.id,topicId:q.region,kind,runId};
  this.emit(exam?'exam_started':q.challenge?'challenge_started':previous?.runId===runId?'quest_resumed':'quest_started',{replay,questTitle:q.title});return runId;
 }
 task(q,index,gameSession){
  if(!this.studentId||!gameSession||!this.current)return;
  this.ensure();const t=q.tasks[index],taskId=taskIdFor(q,index);
  if(gameSession.logTaskIndex!==index||!gameSession.logTaskRunId){
   this.tick();this.closeHelps();
   const previous=[...this.events].reverse().find(e=>e.type==='task_started'&&e.taskId===taskId&&e.runId===gameSession.logRunId);
   const completed=previous&&this.events.some(e=>e.type==='task_completed'&&e.taskRunId===previous.taskRunId);
   gameSession.logTaskRunId=previous&&(!completed||gameSession.solved)?previous.taskRunId:uid();gameSession.logTaskIndex=index;
  }
  this.ctx={questId:q.id,taskId,topicId:q.region,skillId:t.lesson||'other',kind:gameSession.exam?'exam':gameSession.encounter?'encounter':q.challenge?'challenge':'regular',runId:gameSession.logRunId,taskRunId:gameSession.logTaskRunId};
  if(!this.events.some(e=>e.type==='task_started'&&e.taskRunId===gameSession.logTaskRunId))this.emit('task_started',{taskType:t.type,taskTitle:t.text});
 }
 attempt(correct,{exam=false}={}){
  this.ensure();this.tick();const attemptNumber=this.events.filter(e=>e.type==='task_attempt'&&e.taskRunId===this.ctx.taskRunId).length+1;
  this.emit('task_attempt',{correct,attemptNumber});
  if(correct)this.emit('task_completed',{});
  else if(exam)this.emit('task_paused',{reason:'exam_round'});
 }
 complete(q,s){this.tick();this.closeHelps();this.emit(s.exam?'exam_completed':q.challenge?'challenge_completed':'quest_completed',{replay:!!s.replay},{questId:q.id,topicId:q.region,kind:s.exam?'exam':s.encounter?'encounter':q.challenge?'challenge':'regular',runId:s.logRunId});}
 pauseQuest(s){if(!s?.q||!this.ctx.questId)return;this.tick();this.closeHelps();if(!s.solved)this.emit('task_paused',{reason:'closed'});this.emit('quest_paused',{reason:'closed'});this.ctx={};}
 skipQuest(q){this.ensure();this.tick();this.closeHelps();const last=[...this.events].reverse().find(e=>e.questId===q.id&&e.type==='task_started');if(last&&!this.events.some(e=>e.type==='task_completed'&&e.taskRunId===last.taskRunId))this.emit('task_skipped',{reason:'quest_deferred'},this.contextOf(last));this.emit('quest_skipped',{reason:'explicit_defer'},{questId:q.id,topicId:q.region,kind:q.challenge?'challenge':'regular'});this.ctx={};}
 bypass(q){this.ensure();this.emit('prerequisite_bypassed',{reason:'explicit_warning_ignored'},{questId:q.id,topicId:q.region,kind:q.challenge?'challenge':'regular'});}
 enterTopic(id){if(this.topic===id||!this.studentId)return;this.ensure();this.tick();if(this.topic)this.emit('topic_left',{}, {topicId:this.topic});this.topic=id;this.emit('topic_entered',{}, {topicId:id});}
 updateChallenges(){if(!this.studentId)return;const s=this.getState();for(const q of CATALOG.quests.filter(q=>q.kind==='challenge'))if(CATALOG.quests.filter(x=>x.kind==='regular'&&x.topicId===q.topicId).every(x=>s.completed[x.questId])&&!this.events.some(e=>e.type==='challenge_unlocked'&&e.questId===q.questId))this.emit('challenge_unlocked',{}, {questId:q.questId,topicId:q.topicId,kind:'challenge'});}
 finish(reason='unit_finished'){
  if(!this.current||this.current.finishedAt)return;this.tick();this.closeHelps();this.emit('session_finished',{reason},{});this.current.finishedAt=this.current.updatedAt;this.current.finishReason=reason;this.revision++;this.live=false;this.ctx={};this.checkpoint();this.flush();
 }
 async exportSave(finish=false){
  await this.attach();this.ensure();this.tick();this.closeHelps();this.updateChallenges();
  if(finish)this.finish('unit_finished');
  await this.flush();const s=structuredClone(this.getState());
  const out={format:FORMAT,schemaVersion:SCHEMA_VERSION,studentId:s.learner.studentId,studentName:s.learner.studentName,exportId:uid(),exportTimestamp:this.stamp(),appVersion:APP_VERSION,currentState:s,catalog:CATALOG,sessions:this.sessions.map(x=>({...x})),events:this.events.map(x=>({...x})),coverage:{loggingStartedAt:this.events.find(e=>e.type==='history_baseline')?.timestamp||null,activeTimeOnly:true,idleThresholdSeconds:90,persistenceAvailable:this.durable}};
  const p=project({studentId:out.studentId,catalog:CATALOG,events:out.events,snapshots:[out]});out.questProgress=p.quests;out.taskProgress=p.tasks;
  validateSave(out);return out;
 }
 async importHistory(save){
  const data=validateSave(save);this.finish('import');await this.flush();
  const db=await this.dbPromise;if(!db)throw new Error('Zum sicheren Import der Historie ist lokaler Datenbankspeicher erforderlich.');
  const existing=await indexAll(db,'events','studentId',data.studentId),ids=new Set(existing.map(e=>e.eventId)),existingById=new Map(existing.map(e=>[e.eventId,e]));
  for(const e of data.events){const old=existingById.get(e.eventId);if(old&&stableStringify(old)!==stableStringify(e))throw new Error('Eine Ereignis-ID hat widersprüchliche Daten. Import abgebrochen.');}
  const oldSessions=await indexAll(db,'sessions','studentId',data.studentId),smap=new Map(oldSessions.map(s=>[s.sessionId,s]));
  const tx=db.transaction(['events','sessions'],'readwrite'),done=transactionDone(tx);
  for(const e of data.events)if(!ids.has(e.eventId))tx.objectStore('events').put(e);
  for(const s of data.sessions){const old=smap.get(s.sessionId);if(!old||s.updatedAt>old.updatedAt)tx.objectStore('sessions').put(s);}
  await done;this.studentId=null;this.current=null;this.events=[];this.sessions=[];this.pending.clear();try{localStorage.removeItem(this.walKey);}catch{}
 }
 dispose(){clearInterval(this.timer);this.finish('closed');}
}

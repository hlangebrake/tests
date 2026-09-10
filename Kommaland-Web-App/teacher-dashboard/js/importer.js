import {transactionDone} from '../shared/idb.js';
import {LIMITS,parseLearningSave,FORMAT,SCHEMA_VERSION,validateSave} from '../shared/save-schema.js';
import {jsonFilesInZip} from './zip-importer.js';
/** Parsing, validation, ZIP traversal and merge are UI-independent. */
export async function importFiles(files,db,onProgress=()=>{}){
 const summary={processed:0,imported:0,duplicate:0,invalid:0,ignored:0,eventsAdded:0,eventsIgnoredAsDuplicates:0,results:[]};
 async function process(name,text,error){
  let r;try{if(error)throw new Error(error);const raw=JSON.parse(text);
   if(raw.format==='kommaland.teacher-backup'){if(new TextEncoder().encode(text).length>LIMITS.teacherBackupBytes)throw new Error('Lehrkräfte-Sicherung überschreitet 256 MiB.');r={fileName:name,...await restoreBackup(raw,db,onProgress)};}
   else {if(new TextEncoder().encode(text).length>LIMITS.jsonBytes)throw new Error('Lernstandsdatei überschreitet 64 MiB.');r=await db.merge(raw,name);}
  }catch(e){r=await db.recordFailure(name,e.message);}
  summary.processed++;summary[r.status==='imported'?'imported':r.status==='duplicate'?'duplicate':'invalid']++;summary.eventsAdded+=r.eventsAdded||0;summary.eventsIgnoredAsDuplicates+=r.eventsIgnoredAsDuplicates||0;summary.results.push(r);onProgress({...summary,current:name});
 }
 for(const file of files){
  if(/\.zip$/i.test(file.name)){
   try{if(file.size>LIMITS.zipBytes)throw new Error('ZIP-Datei überschreitet 250 MiB.');let n=0;for await(const entry of jsonFilesInZip(file)){n++;await process(entry.name,entry.text,entry.error);}if(!n){summary.ignored++;onProgress({...summary,current:file.name+' · keine JSON-Dateien'});}}
   catch(error){await process(file.name,null,error.message);}
  }else if(/\.json$/i.test(file.name)){if(file.size>LIMITS.teacherBackupBytes)await process(file.name,null,'JSON-Datei überschreitet 256 MiB.');else {try{await process(file.name,await file.text());}catch(error){await process(file.name,null,'Datei nicht lesbar: '+error.message);}}}
  else summary.ignored++;
 }
 return summary;
}
async function restoreBackup(raw,db,onProgress){
 if(raw.schemaVersion!==1||!Array.isArray(raw.students)||!Array.isArray(raw.events)||!Array.isArray(raw.sessions)||!Array.isArray(raw.snapshots)||raw.students.length>5000||raw.events.length>2000000)throw new Error('Ungültige Lehrkräfte-Sicherung.');
 // Validate EVERY student before any write; per-student merges then remain atomic.
 const saves=[];for(const student of raw.students){
  const snapshots=raw.snapshots.filter(s=>s.studentId===student.studentId);if(!snapshots.length)throw new Error('Sicherung ohne zugehörigen Speicherstand.');
  for(const s of snapshots){const allEvents=raw.events.filter(e=>e.studentId===student.studentId&&e.timestamp<=s.exportTimestamp),ids=new Set(allEvents.map(e=>e.sessionId));
   saves.push(validateSave({format:FORMAT,schemaVersion:SCHEMA_VERSION,studentId:student.studentId,studentName:s.studentName,exportId:s.exportId,exportTimestamp:s.exportTimestamp,appVersion:s.appVersion,currentState:s.currentState,catalog:s.catalog,coverage:s.coverage,sessions:raw.sessions.filter(x=>x.studentId===student.studentId&&ids.has(x.sessionId)),events:allEvents}));
  }
 }
 const totals={status:'duplicate',eventsAdded:0,eventsIgnoredAsDuplicates:0};
 for(const s of saves){const result=await db.merge(s,'Lehrkräfte-Sicherung/'+s.studentId);totals.eventsAdded+=result.eventsAdded;totals.eventsIgnoredAsDuplicates+=result.eventsIgnoredAsDuplicates;if(result.status==='imported')totals.status='imported';onProgress({current:'Sicherung: '+s.studentName});}
 for(const s of raw.students)if(s.className)await db.setClass(s.studentId,s.className);
 // Original audit entries are restored with stable import IDs, not duplicated.
 if(Array.isArray(raw.imports)){const database=await db.ready;const tx=database.transaction('imports','readwrite');const done=transactionDone(tx);for(const i of raw.imports)if(typeof i.importId==='string'&&typeof i.timestamp==='string')tx.objectStore('imports').put(i);await done;}
 return totals;
}

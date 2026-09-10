import {SRL_EVENTS} from './regulation.js';
import {validateRegulationEvent} from './regulation-validation.js';
/** Canonical exchange contract, shared by game and standalone dashboard.
 * Export schema is deliberately independent of currentState.schemaVersion (the old game).
 * Raw answers, names in events, device IDs and IP addresses are not recorded.
 */
export const SCHEMA_VERSION = 3;
export const APP_VERSION = '6.0.0';
export const FORMAT = 'kommaland.learning-save';
export const LIMITS = Object.freeze({jsonBytes:64*1024*1024,teacherBackupBytes:256*1024*1024,zipBytes:250*1024*1024,expandedBytes:512*1024*1024,files:5000,events:250000,sessions:20000});
export const EVENT_TYPES = new Set(['session_started','session_finished','session_resumed','activity_slice','history_baseline','history_gap','profile_updated','quest_started','quest_resumed','quest_completed','quest_skipped','quest_paused','task_started','task_attempt','task_completed','task_skipped','task_paused','hint_opened','hint_closed','example_opened','example_closed','solutionStep_opened','solutionStep_closed','otherHelp_opened','otherHelp_closed','knowledge_opened','knowledge_closed','challenge_unlocked','challenge_started','challenge_completed','topic_entered','topic_left','prerequisite_bypassed','exam_started','exam_round_finished','exam_completed','state_restored','curriculum_changed']);
for(const type of Object.keys(SRL_EVENTS))EVENT_TYPES.add(type);
export const HELP_TYPES = ['hint','example','solutionStep','otherHelp'];
export const nowISO = () => new Date().toISOString();
export function uid(){
 if(globalThis.crypto?.randomUUID)return crypto.randomUUID();
 if(!globalThis.crypto?.getRandomValues)throw new Error('Sichere Zufalls-IDs sind in diesem Browser nicht verfügbar.');
 const a=crypto.getRandomValues(new Uint8Array(16));a[6]=(a[6]&15)|64;a[8]=(a[8]&63)|128;
 return [...a].map((v,i)=>([4,6,8,10].includes(i)?'-':'')+v.toString(16).padStart(2,'0')).join('');
}
export const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
export const validId=x=>typeof x==='string'&&x.length>0&&x.length<=200&&/^[a-zA-Z0-9:_./>\-]+$/.test(x)&&!['__proto__','prototype','constructor'].includes(x);
export const validDate=x=>typeof x==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString()===x;
export function cleanName(value){return typeof value==='string'?value.normalize('NFC').replace(/[\u0000-\u001f\u007f]/g,'').replace(/\s+/g,' ').trim().slice(0,80):'';}
export function filename(name,date=new Date()){
 const part=cleanName(name).replace(/[^\p{L}\p{N} _-]/gu,'').replace(/\s+/g,'_')||'Lernende';
 const day=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
 return `Kommaland_Speicherstand_${part}_${day}.json`;
}
export const taskIdFor=(q,i)=>`${q.id}:${q.tasks[i]?.key||String(i+1).padStart(3,'0')}`;
export function stableStringify(value){
 if(value===null||typeof value!=='object')return JSON.stringify(value);
 if(Array.isArray(value))return '['+value.map(stableStringify).join(',')+']';
 return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+stableStringify(value[k])).join(',')+'}';
}
function assert(ok,message){if(!ok)throw new Error(message);}
function boundedArray(v,max,label){assert(Array.isArray(v)&&v.length<=max,`${label}: Liste fehlt oder ist zu groß.`);}
function safeData(v,depth=0){
 assert(depth<6,'Ereignisdaten sind zu tief verschachtelt.');
 if(v===null||typeof v==='boolean')return v;
 if(typeof v==='number'){assert(Number.isFinite(v)&&Math.abs(v)<1e15,'Ungültige Zahl in Ereignisdaten.');return v;}
 if(typeof v==='string'){assert(v.length<=1500,'Ereignistext zu lang.');return v;}
 if(Array.isArray(v)){assert(v.length<=500,'Ereignisliste zu lang.');return v.map(x=>safeData(x,depth+1));}
 assert(plain(v)&&Object.keys(v).length<=60,'Ungültige Ereignisdaten.');
 const out={};for(const [k,x] of Object.entries(v)){assert(validId(k),'Ungültiger Datenschlüssel.');out[k]=safeData(x,depth+1);}return out;
}
export function validateCatalog(c){
 assert(plain(c)&&validId(c.version),'Aufgabenkatalog fehlt.');
 boundedArray(c.topics,100,'Themen');boundedArray(c.quests,500,'Quests');boundedArray(c.tasks,10000,'Aufgaben');
 const topics=new Set(),quests=new Map(),tasks=new Set();
 const label=x=>{assert(typeof x==='string'&&x.length>0&&x.length<1000,'Ungültige Katalogbeschriftung.');return x;};
 const out={version:c.version,topics:c.topics.map(x=>{assert(plain(x)&&validId(x.topicId)&&!topics.has(x.topicId),'Ungültiges Thema.');topics.add(x.topicId);return {topicId:x.topicId,title:label(x.title),place:label(x.place)};}),quests:[],tasks:[]};
 out.quests=c.quests.map(x=>{assert(plain(x)&&validId(x.questId)&&!quests.has(x.questId)&&topics.has(x.topicId)&&['regular','challenge'].includes(x.kind),'Ungültige Katalogquest.');quests.set(x.questId,x.topicId);return {questId:x.questId,topicId:x.topicId,title:label(x.title),kind:x.kind,...(x.active!==undefined?{active:x.active===true,contentVersion:x.contentVersion===6?6:5}:{})};});
 out.tasks=c.tasks.map(x=>{assert(plain(x)&&validId(x.taskId)&&!tasks.has(x.taskId)&&quests.get(x.questId)===x.topicId&&validId(x.skillId)&&validId(x.type),'Ungültige Katalogaufgabe.');tasks.add(x.taskId);return {taskId:x.taskId,questId:x.questId,topicId:x.topicId,skillId:x.skillId,skillTitle:label(x.skillTitle),type:x.type,title:label(x.title),...(x.active!==undefined?{active:x.active===true,contentVersion:x.contentVersion===6?6:5}:{})};});
 return out;
}
export function validateSave(raw){
 assert(plain(raw)&&raw.format===FORMAT,'Keine Kommaland-Lernstandsdatei. Alte Spielstände zuerst in der Schüler-App öffnen und neu exportieren.');
 assert([1,2,SCHEMA_VERSION].includes(raw.schemaVersion),`Nicht unterstützte Lernstand-Version: ${String(raw.schemaVersion)}.`);
 assert(validId(raw.studentId),'studentId fehlt oder ist ungültig.');
 assert(cleanName(raw.studentName)&&cleanName(raw.studentName)===raw.studentName,'studentName fehlt oder ist ungültig.');
 assert(validDate(raw.exportTimestamp)&&validId(raw.exportId)&&typeof raw.appVersion==='string'&&raw.appVersion.length<40,'Ungültige Exportangaben.');
 assert(plain(raw.currentState)&&raw.currentState.app==='kommaland'&&Number.isInteger(raw.currentState.schemaVersion)&&plain(raw.currentState.completed)&&plain(raw.currentState.progress),'Aktueller Spielstand fehlt oder ist ungültig.');
 assert(raw.currentState.learner?.studentId===raw.studentId&&raw.currentState.learner?.studentName===raw.studentName,'Identität im Spielstand und Export stimmt nicht überein.');
 const catalog=validateCatalog(raw.catalog),knownQuests=new Set(catalog.quests.map(q=>q.questId));
 for(const [id,v] of Object.entries(raw.currentState.completed)){assert(knownQuests.has(id)&&plain(v)&&validDate(v.at),'Ungültiger Questabschluss im Spielstand.');}
 boundedArray(raw.sessions,LIMITS.sessions,'sessions');boundedArray(raw.events,LIMITS.events,'events');
 const sessionIds=new Set();
 const sessions=raw.sessions.map(s=>{
  assert(plain(s)&&validId(s.sessionId)&&s.studentId===raw.studentId&&!sessionIds.has(s.sessionId)&&validDate(s.startedAt)&&validDate(s.updatedAt),'Ungültige oder doppelte Sitzung.');sessionIds.add(s.sessionId);
  assert(s.finishedAt===null||validDate(s.finishedAt),'Ungültiges Sitzungsende.');
  assert(Number.isFinite(s.duration)&&s.duration>=0&&s.duration<1e12,'Ungültige Sitzungsdauer.');
  assert(!s.finishedAt||s.finishedAt>=s.startedAt,'Sitzungsende liegt vor dem Beginn.');
  return {sessionId:s.sessionId,studentId:s.studentId,startedAt:s.startedAt,finishedAt:s.finishedAt,updatedAt:s.updatedAt,duration:s.duration,finishReason:typeof s.finishReason==='string'?s.finishReason.slice(0,80):null};
 });
 const eventIds=new Set();
 const events=raw.events.map(e=>{
  assert(plain(e)&&validId(e.eventId)&&!eventIds.has(e.eventId)&&e.studentId===raw.studentId&&sessionIds.has(e.sessionId)&&validDate(e.timestamp)&&EVENT_TYPES.has(e.type),'Ungültiges Ereignis, doppelte eventId oder fehlende Sitzung.');eventIds.add(e.eventId);
  const result={eventId:e.eventId,studentId:e.studentId,sessionId:e.sessionId,timestamp:e.timestamp,type:e.type,data:safeData(e.data||{})};
  if(e.sequence!==undefined){assert(Number.isSafeInteger(e.sequence)&&e.sequence>=0,'Ungültige Ereignisreihenfolge.');result.sequence=e.sequence;}
  for(const k of ['questId','taskId','topicId','runId','taskRunId','skillId']){if(e[k]!=null){assert(validId(e[k]),`Ungültiges Feld ${k}.`);result[k]=e[k];}}
  if(e.kind!=null){assert(['regular','challenge','exam','encounter'].includes(e.kind),'Ungültige Aufgabenart.');result.kind=e.kind;}
  if(e.type.startsWith('task_'))assert(['questId','taskId','topicId','runId','taskRunId'].every(k=>validId(e[k])),'Aufgabenereignis ohne vollständigen Kontext.');
  if(/^(quest|challenge|exam)_/.test(e.type))assert(validId(e.questId)&&validId(e.topicId),'Questereignis ohne Kontext.');
  if(e.type==='task_attempt')assert(validId(e.taskId)&&validId(e.taskRunId)&&typeof e.data?.correct==='boolean'&&Number.isInteger(e.data.attemptNumber)&&e.data.attemptNumber>0,'Ungültiger Versuch.');
  if(e.type==='activity_slice')assert(Number.isFinite(e.data.duration)&&e.data.duration>=0&&e.data.duration<=30000&&validDate(e.data.from),'Ungültiges Zeitintervall.');
  if(e.type.endsWith('_opened')||e.type.endsWith('_closed'))assert(validId(e.data.helpId),'Hilfe-ID fehlt.');
  validateRegulationEvent(result,assert);
  return result;
 });
 return {format:FORMAT,schemaVersion:raw.schemaVersion,studentId:raw.studentId,studentName:raw.studentName,exportId:raw.exportId,exportTimestamp:raw.exportTimestamp,appVersion:raw.appVersion,currentState:structuredClone(raw.currentState),catalog,sessions,events,coverage:plain(raw.coverage)?safeData(raw.coverage):{}};
}
export function parseLearningSave(text){
 assert(typeof text==='string'&&new TextEncoder().encode(text).length<=LIMITS.jsonBytes,'JSON-Datei überschreitet 64 MiB.');
 let raw;try{raw=JSON.parse(text);}catch{throw new Error('Die Datei enthält kein gültiges JSON.');}return validateSave(raw);
}

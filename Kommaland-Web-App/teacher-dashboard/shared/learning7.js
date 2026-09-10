import {PRACTICE_CATALOG} from './practice-catalog.js';
import {LEARNING_GOALS,PRACTICE_SKILLS,OPEN_WORK} from './learning7-content.js';
/** Version-7 policies are transparent starting values, not validated diagnostic cutoffs. */
export const PRACTICE_RULES=Object.freeze({minimum:2,normal:3,maximum:5,repeatedErrors:3,repeatedHelp:2,lookbackEvents:1000,diagnosticErrors:3,stableAfterDays:7,coreConfirmations:2});
export const CONFIDENCE_LABELS=Object.freeze(['Noch unsicher','Teilweise sicher','Sicher','Ich könnte es jemandem erklären']);
export const WORK_STATUSES=Object.freeze({started:'Begonnen',worked:'Bearbeitet',deferred:'Für später',self_checked:'Selbst kontrolliert',partner_discussed:'Mit Partner besprochen',teacher_discussed:'Mit Lehrkraft besprochen'});
export const V7_EVENTS=Object.freeze(['v7_goal_selected','v7_goal_reflection','v7_practice_decision','v7_practice_started','v7_practice_task','v7_practice_attempt','v7_practice_skipped','v7_practice_finished','v7_practice_paused','v7_practice_reflection','v7_work_started','v7_work_changed','v7_work_model']);
const goalById=id=>Object.values(LEARNING_GOALS).find(g=>g.goalId===id);
const workById=id=>OPEN_WORK.find(w=>w.id===id);
const id=x=>typeof x==='string'&&/^[a-zA-Z0-9:_./>\-]{1,200}$/.test(x)&&!['__proto__','constructor','prototype'].includes(x);
const specific=Object.freeze({'c6:v1:03':'reading','c6:v1:05':'zeros','c6:v1:06':'zeros','c6:f1:01':'order','c6:f1:04':'order','c6:h5:01':'units','c6:k1:01':'plausible'});
export function skillsForEvent(e){
 if(e.data?.skillId&&PRACTICE_SKILLS[e.data.skillId])return [e.data.skillId];
 const key=Object.keys(specific).find(k=>e.taskId?.endsWith(':'+k));
 const found=key?[specific[key]]:Object.values(PRACTICE_SKILLS).filter(s=>s.lessons.includes(e.skillId)&&!['reading','order','written'].includes(s.id)).map(s=>s.id);
 if(/(?:a1:0[23]|s1:02|m2:02|d1:0[23]|d2:01)$/.test(e.taskId||''))found.push('written');
 return [...new Set(found)];
}
export function validateV7Event(e,assert){
 if(!e.type.startsWith('v7_'))return;
 const d=e.data;assert(V7_EVENTS.includes(e.type),'Unbekanntes Version-7-Ereignis.');
 const keys={v7_goal_selected:['goalId','confidence'],v7_goal_reflection:['goalId','value'],v7_practice_decision:['skillId','choice','reason'],v7_practice_started:['roundId','skillId','taskKeys'],v7_practice_task:['roundId','skillId','taskKey','index'],v7_practice_attempt:['roundId','skillId','taskKey','attemptNumber','correct'],v7_practice_skipped:['roundId','taskKey'],v7_practice_finished:['roundId'],v7_practice_paused:['roundId'],v7_practice_reflection:['roundId','choice'],v7_work_started:['workId'],v7_work_changed:['workId','status','note','checks'],v7_work_model:['workId']};
 assert(Object.keys(d).every(k=>keys[e.type].includes(k)),'Unerwartetes Feld in einer neuen Lernspur.');
 if(e.type.startsWith('v7_goal_'))assert(!!goalById(d.goalId),'Unbekanntes Lernziel.');
 if(e.type==='v7_goal_selected')assert(d.confidence===null||Number.isInteger(d.confidence)&&d.confidence>=1&&d.confidence<=4,'Ungültige Zieleinschätzung.');
 if(e.type==='v7_goal_reflection')assert(Number.isInteger(d.value)&&d.value>=1&&d.value<=4,'Ungültige Selbsteinschätzung.');
 if(e.type.startsWith('v7_practice_')&&e.type!=='v7_practice_decision')assert(id(d.roundId),'Übungsrunden-ID fehlt.');
 if(['v7_practice_decision','v7_practice_started','v7_practice_task','v7_practice_attempt'].includes(e.type))assert(!!PRACTICE_SKILLS[d.skillId],'Unbekanntes Übungsziel.');
 if(e.type==='v7_practice_decision')assert(['now','later','declined'].includes(d.choice)&&['manual','errors','help','confidence','exam'].includes(d.reason),'Ungültige Übungsentscheidung.');
 if(e.type==='v7_practice_started')assert(Array.isArray(d.taskKeys)&&d.taskKeys.length>=2&&d.taskKeys.length<=5&&new Set(d.taskKeys).size===d.taskKeys.length&&d.taskKeys.every(k=>id(k)&&k.startsWith('v7:'+d.skillId+':')&&PRACTICE_CATALOG.some(t=>t.key===k)),'Ungültige Übungsrunde.');
 if(['v7_practice_task','v7_practice_attempt','v7_practice_skipped'].includes(e.type))assert(id(d.taskKey)&&d.taskKey.startsWith('v7:'),'Übungsaufgabe fehlt.');
 if(e.type==='v7_practice_task')assert(Number.isInteger(d.index)&&d.index>=0&&d.index<5,'Ungültige Position.');
 if(e.type==='v7_practice_attempt')assert(typeof d.correct==='boolean'&&Number.isInteger(d.attemptNumber)&&d.attemptNumber>=1&&d.attemptNumber<=100000,'Ungültiger Übungsversuch.');
 if(e.type==='v7_practice_reflection')assert(['safer','more','return'].includes(d.choice),'Ungültiger Rundenrückblick.');
 if(e.type.startsWith('v7_work_'))assert(!!workById(d.workId),'Unbekannter offener Auftrag.');
 if(e.type==='v7_work_changed')assert(Object.hasOwn(WORK_STATUSES,d.status)&&typeof d.note==='string'&&d.note.length<=1200&&Array.isArray(d.checks)&&d.checks.length===3&&d.checks.every(x=>typeof x==='boolean'),'Ungültige offene Bearbeitung.');
}
/** Additional evidence lives only in the existing event log. A projection is disposable. */
export function learning7Projection(events,{from='',to='9999-12-31T23:59:59.999Z'}={}){
 const rounds=new Map(),works=new Map(),goals=[],decisions=[],checks=new Map();
 const es=events.filter(e=>e.timestamp<=to).slice().sort((a,b)=>a.timestamp.localeCompare(b.timestamp)||(a.sequence||0)-(b.sequence||0)||a.eventId.localeCompare(b.eventId));
 for(const e of es){const d=e.data||{};
  if(e.type==='v7_practice_started'&&!rounds.has(d.roundId))rounds.set(d.roundId,{roundId:d.roundId,skillId:d.skillId,startedAt:e.timestamp,lastAt:e.timestamp,finishedAt:null,sessionId:e.sessionId,tasks:d.taskKeys.map(taskKey=>({taskKey,attempts:[],correct:false,skipped:false,helpCount:0,duration:0})),duration:0,helps:[],reflection:null});
  const r=rounds.get(d.roundId||e.runId);
  if(r){const t=r.tasks.find(t=>t.taskKey===d.taskKey)||r.tasks.find((_,i)=>e.taskRunId===r.roundId+':'+i);
   if(e.type.startsWith('v7_practice_'))r.lastAt=e.timestamp;
   if(e.type==='v7_practice_task'&&t)t.startedAt??=e.timestamp;
   if(e.type==='v7_practice_attempt'&&t){t.attempts.push({eventId:e.eventId,correct:d.correct,attemptNumber:d.attemptNumber,timestamp:e.timestamp});if(d.correct){t.correct=true;t.finishedAt=e.timestamp;}}
   if(e.type==='v7_practice_skipped'&&t){t.skipped=true;t.finishedAt=e.timestamp;}
   if(e.type==='v7_practice_finished')r.finishedAt=e.timestamp;
   if(e.type==='v7_practice_reflection')r.reflection=d.choice;
   if(e.type==='activity_slice'&&e.kind==='practice'){r.duration+=d.duration;if(t)t.duration+=d.duration;}
   if(e.kind==='practice'&&e.type.endsWith('_opened')&&!d.automatic){r.helps.push({type:e.type.replace('_opened',''),at:e.timestamp,resumed:!!d.resumed});if(t&&!d.resumed)t.helpCount++;}
  }
  if(e.type.startsWith('v7_goal_'))goals.push({type:e.type,at:e.timestamp,sessionId:e.sessionId,...d});
  if(e.type==='v7_practice_decision')decisions.push({at:e.timestamp,...d});
  if(e.type.startsWith('v7_work_')){let w=works.get(d.workId);if(!w){w={workId:d.workId,status:'started',startedAt:e.timestamp,lastAt:e.timestamp,note:'',checks:[false,false,false],history:[],modelSeen:false};works.set(d.workId,w);}w.lastAt=e.timestamp;w.history.push({type:e.type,at:e.timestamp,status:d.status||null});if(e.type==='v7_work_changed'){w.status=d.status;w.note=d.note;w.checks=[...d.checks];}if(e.type==='v7_work_model')w.modelSeen=true;}
  if(e.type==='task_attempt'&&['regular','exam'].includes(e.kind))for(const skill of skillsForEvent(e)){
   if(!checks.has(skill))checks.set(skill,{skillId:skill,correctCore:[],correctExam:[],errors:[],attempts:[]});const c=checks.get(skill);c.attempts.push(e);if(!d.correct)c.errors.push(e);else (e.kind==='exam'?c.correctExam:c.correctCore).push(e);
  }
 }
 const evidence=Object.values(PRACTICE_SKILLS).map(s=>{const c=checks.get(s.id)||{skillId:s.id,correctCore:[],correctExam:[],errors:[],attempts:[]};
  const tasks=new Set(c.correctCore.map(e=>e.taskId));const days=[...new Set(c.correctCore.map(e=>e.timestamp.slice(0,10)))].sort();
  const spaced=tasks.size>=PRACTICE_RULES.coreConfirmations&&days.length>1&&Date.parse(days.at(-1))-Date.parse(days[0])>=PRACTICE_RULES.stableAfterDays*86400000;
  const status=spaced?'spaced':tasks.size>=PRACTICE_RULES.coreConfirmations?'repeated':c.correctExam.length?'sample':'unobserved';
  const errors=c.errors.filter(e=>e.timestamp>=from),attempts=c.attempts.filter(e=>e.timestamp>=from);
  return {skillId:s.id,status,coreTasks:tasks.size,coreDays:days.length,sampleTasks:new Set(c.correctExam.map(e=>e.taskId)).size,errorCount:errors.length,errorTasks:new Set(errors.map(e=>e.taskId)).size,attempts:attempts.length,conversation:errors.length>=PRACTICE_RULES.diagnosticErrors,lastError:errors.at(-1)?.timestamp||null};
 });
 const deferred=[...new Set(decisions.map(d=>d.skillId))].filter(s=>decisions.filter(d=>d.skillId===s).at(-1)?.choice==='later');
 return {rounds:[...rounds.values()].filter(r=>r.lastAt>=from),works:[...works.values()].filter(w=>w.lastAt>=from),goals:goals.filter(g=>g.at>=from),decisions:decisions.filter(d=>d.at>=from),deferred,evidence};
}
export const EVIDENCE_LABELS=Object.freeze({sample:'In einer Wegstichprobe richtig',repeated:'Im Kernlernweg mehrfach gezeigt',spaced:'Im Kernlernweg erneut nach Abstand gezeigt',unobserved:'Noch keine ausreichende Lernspur'});
/** The recommendation is an inline offer, not another unsolicited modal. */
export function practiceRecommendation(events,skillId,{questId=null,sessionId=null}={}){
 if(!PRACTICE_SKILLS[skillId])return null;
 const es=events.slice(-PRACTICE_RULES.lookbackEvents),declined=es.some(e=>e.sessionId===sessionId&&e.type==='v7_practice_decision'&&e.data.skillId===skillId&&['declined','later'].includes(e.data.choice));if(declined)return null;
 const relevant=es.filter(e=>['regular','exam'].includes(e.kind)&&skillsForEvent(e).includes(skillId));
 const errors=relevant.filter(e=>e.type==='task_attempt'&&!e.data.correct).length;
 const help=relevant.filter(e=>['hint_opened','example_opened','otherHelp_opened'].includes(e.type)&&!e.data.resumed&&!e.data.automatic).length;
 const g=questId&&LEARNING_GOALS[questId],confidence=g&&es.filter(e=>['v7_goal_reflection','v7_goal_selected'].includes(e.type)&&e.data.goalId===g.goalId).map(e=>e.data.value??e.data.confidence).at(-1);
 if(errors>=PRACTICE_RULES.repeatedErrors)return {skillId,reason:'errors',text:`Bei ${errors} Versuchen zu diesem Ziel hat es noch nicht gepasst. Eine kurze Übungsrunde ist eine Möglichkeit.`};
 if(help>=PRACTICE_RULES.repeatedHelp)return {skillId,reason:'help',text:'Du hast mehrfach Hilfe zu diesem Ziel gewählt. Du kannst die Anwendung in einer kurzen Runde erproben.'};
 if(confidence===1)return {skillId,reason:'confidence',text:'Du hast dich bei diesem Ziel noch unsicher eingeschätzt. Du kannst kurz üben oder im Lernweg weitergehen.'};
 return null;
}

/** Validate references within a full export. Unknown/future banks fail visibly, not as fake core data.
 * Attempt numbers are not globally forced consecutive: two offline branches can contain distinct events.
 */
export function validateV7History(events,assert){
 const starts=new Map(),workStarts=new Set();
 for(const e of events){if(e.type==='v7_practice_started'){assert(!starts.has(e.data.roundId),'Übungsrunde hat mehrere verschiedene Start-Ereignisse.');starts.set(e.data.roundId,e);}if(e.type==='v7_work_started')workStarts.add(e.data.workId);}
 for(const e of events){const d=e.data;
  if(e.type.startsWith('v7_practice_')&&!['v7_practice_started','v7_practice_decision'].includes(e.type)){
   const start=starts.get(d.roundId);assert(start&&e.timestamp>=start.timestamp,'Zusatzereignis ohne vorangegangenen Rundenstart.');
   if(d.taskKey)assert(start.data.taskKeys.includes(d.taskKey),'Aufgabe gehört nicht zu dieser Übungsrunde.');
   if(d.skillId)assert(d.skillId===start.data.skillId,'Übungsziel wurde innerhalb einer Runde verändert.');
   if(e.type==='v7_practice_task')assert(start.data.taskKeys[d.index]===d.taskKey,'Aufgabe und Position stimmen nicht überein.');
  }
  if(['v7_work_changed','v7_work_model'].includes(e.type))assert(workStarts.has(d.workId),'Offener Auftrag ohne Beginn.');
 }
}

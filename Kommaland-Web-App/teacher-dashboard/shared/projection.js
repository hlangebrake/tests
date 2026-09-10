/** Pure, replayable projections. Never use imported aggregate metrics as evidence.
 * Durations are milliseconds of foreground activity, not inferred from wall-clock gaps.
 * Snapshots set current game status; events retain replays, skips and earlier outcomes.
 */
export const eventOrder=(a,b)=>a.timestamp.localeCompare(b.timestamp)||(a.sequence||0)-(b.sequence||0)||a.eventId.localeCompare(b.eventId);
const minDate=(a,b)=>!a||b<a?b:a;
const maxDate=(a,b)=>!a||b>a?b:a;
const kindOf=e=>e.kind||'regular';
const helpTypes=['hint','example','solutionStep','otherHelp'];
export function project({studentId,catalog,events,snapshots=[],asOf='9999-12-31T23:59:59.999Z'}){
 // Use the catalog actually available at the historical cutoff; do not apply today's denominator retroactively.
 const historical=snapshots.filter(s=>s.exportTimestamp<=asOf&&s.catalog).sort((a,b)=>a.exportTimestamp.localeCompare(b.exportTimestamp)).at(-1);
 const migrated=events.some(e=>e.type==='curriculum_changed'&&e.timestamp<=asOf);
 const modern=[catalog,...snapshots.map(s=>s.catalog).filter(Boolean)].find(c=>c.quests.some(q=>q.contentVersion===6&&q.active!==false));
 if(migrated&&modern)catalog=modern;
 else if(historical)catalog=historical.catalog;
 else if(events.some(e=>e.type==='curriculum_changed'&&e.timestamp>asOf))catalog={...catalog,quests:catalog.quests.map(q=>({...q,active:q.contentVersion!==6})),tasks:catalog.tasks.map(t=>({...t,active:t.contentVersion!==6}))};
 const es=events.filter(e=>e.timestamp<=asOf).slice().sort(eventOrder);
 const qs=new Map(catalog.quests.map(q=>[q.questId,{...q,studentId,status:'not_started',firstStartedAt:null,lastWorkedAt:null,completedAt:null,skipCount:0,history:[],runs:[],challengeUnlocked:false,challengeStarted:false,challengeCompleted:false,attemptCount:0,helpUsage:0}]));
 const ts=new Map(catalog.tasks.map(t=>[t.taskId,{...t,studentId,status:'not_started',startedAt:null,finishedAt:null,lastWorkedAt:null,duration:0,attemptCount:0,correct:null,everCorrect:false,attempts:[],helps:[],runs:[],skipCount:0,hintOpenCount:0,exampleOpenCount:0,totalHintDuration:0,totalExampleDuration:0}]));
 const runs=new Map(),helps=new Map(),questRuns=new Map();let baselineAt=null;
 function quest(e){if(!e.questId)return null;if(!qs.has(e.questId))qs.set(e.questId,{studentId,questId:e.questId,topicId:e.topicId||'unknown',title:e.data?.questTitle||e.questId,kind:kindOf(e),status:'not_started',firstStartedAt:null,lastWorkedAt:null,completedAt:null,skipCount:0,history:[],runs:[],challengeUnlocked:false,challengeStarted:false,challengeCompleted:false,attemptCount:0,helpUsage:0});return qs.get(e.questId);}
 function task(e){if(!e.taskId)return null;if(!ts.has(e.taskId))ts.set(e.taskId,{studentId,taskId:e.taskId,questId:e.questId,topicId:e.topicId||'unknown',skillId:e.skillId||'other',title:e.data?.taskTitle||e.taskId,type:e.data?.taskType||'unknown',kind:kindOf(e),status:'not_started',startedAt:null,finishedAt:null,lastWorkedAt:null,duration:0,attemptCount:0,correct:null,everCorrect:false,attempts:[],helps:[],runs:[],skipCount:0,hintOpenCount:0,exampleOpenCount:0,totalHintDuration:0,totalExampleDuration:0});return ts.get(e.taskId);}
 for(const e of es){
  // Additional practice/open work is projected separately; it cannot create core records.
  if(e.kind==='practice'||e.type.startsWith('v7_')||e.type.startsWith('v71_'))continue;
  if(e.type==='history_baseline'){
   baselineAt??=e.timestamp;
   for(const id of e.data.completed||[]){const q=qs.get(id);if(q){q.status='completed';q.baseline=true;q.completedAt=e.data.completionDates?.[id]||null;if(q.kind==='challenge'){q.challengeUnlocked=true;q.challengeCompleted=true;}}}
   for(const id of e.data.started||[]){const q=qs.get(id);if(q&&q.status!=='completed'){q.status='started';q.baseline=true;}}
  }
  if(e.type==='curriculum_changed'){for(const id of e.data.credited||[]){const q=qs.get(id);if(q){q.status='completed';q.baseline=true;q.credit='legacy';q.stateAt=e.timestamp;}}for(const id of e.data.started||[]){const q=qs.get(id);if(q&&q.status!=='completed'){q.status='started';q.stateAt=e.timestamp;}}}
  if(e.type==='state_restored'){for(const q of qs.values()){if(!['regular','challenge'].includes(q.kind))continue;q.status=(e.data.completed||[]).includes(q.questId)?'completed':(e.data.started||[]).includes(q.questId)?'started':'not_started';q.stateAt=e.timestamp;}}
  const q=quest(e),t=task(e);
  if(e.type==='challenge_unlocked'&&q){q.challengeUnlocked=true;q.unlockedAt??=e.timestamp;}
  if(['quest_started','quest_resumed','challenge_started','exam_started'].includes(e.type)&&q){
   if(q.status!=='completed')q.status='started';q.firstStartedAt=minDate(q.firstStartedAt,e.timestamp);q.lastWorkedAt=e.timestamp;q.stateAt=e.timestamp;
   if(q.kind==='challenge'){q.challengeStarted=true;q.challengeUnlocked=true;}
   if(e.runId&&!questRuns.has(e.runId)){const r={runId:e.runId,startedAt:e.timestamp,finishedAt:null,replay:!!e.data.replay,status:'started'};questRuns.set(e.runId,r);q.runs.push(r);}
  }
  if(['quest_completed','challenge_completed','exam_completed'].includes(e.type)&&q){q.status='completed';q.completedAt=e.timestamp;q.lastWorkedAt=e.timestamp;if(q.kind==='challenge')q.challengeCompleted=true;q.stateAt=e.timestamp;const r=questRuns.get(e.runId);if(r){r.status='completed';r.finishedAt=e.timestamp;}}
  if(e.type==='quest_skipped'&&q){q.skipCount++;if(q.status!=='completed')q.status='skipped';q.lastWorkedAt=e.timestamp;q.stateAt=e.timestamp;}
  if(q&&['quest_started','quest_resumed','quest_completed','quest_skipped','quest_paused','challenge_started','challenge_completed','exam_started','exam_completed','exam_round_finished'].includes(e.type))q.history.push({eventId:e.eventId,type:e.type,timestamp:e.timestamp,runId:e.runId||null});
  if(e.type==='task_started'&&t){
   t.startedAt=minDate(t.startedAt,e.timestamp);t.lastWorkedAt=e.timestamp;if(t.status!=='completed')t.status='started';
   if(!runs.has(e.taskRunId)){const r={taskRunId:e.taskRunId,taskId:e.taskId,questId:e.questId,topicId:e.topicId,skillId:e.skillId,kind:kindOf(e),sessionId:e.sessionId,runId:e.runId,...(e.data.difficultyLevel?{difficultyLevel:e.data.difficultyLevel,variantId:e.data.variantId,slotId:e.data.slotId,taskType:e.data.taskType,taskTitle:e.data.taskTitle}:{}),startedAt:e.timestamp,finishedAt:null,duration:0,attempts:[],helps:[],correct:null,status:'started'};runs.set(e.taskRunId,r);t.runs.push(r);}
  }
  const r=runs.get(e.taskRunId);
  if(e.type==='task_attempt'&&t){
   const a={attemptId:e.eventId,attemptNumber:e.data.attemptNumber,timestamp:e.timestamp,correct:e.data.correct,sessionId:e.sessionId,taskRunId:e.taskRunId};t.attempts.push(a);t.attemptCount++;t.correct=a.correct;t.lastWorkedAt=e.timestamp;if(q){q.attemptCount++;q.lastWorkedAt=e.timestamp;}
   if(r){r.attempts.push(a);r.correct=a.correct;}
  }
  if(e.type==='task_completed'&&t){t.status='completed';t.everCorrect=true;t.correct=true;t.finishedAt=e.timestamp;t.lastWorkedAt=e.timestamp;if(r){r.status='completed';r.correct=true;r.finishedAt=e.timestamp;}}
  if(e.type==='task_skipped'&&t){t.skipCount++;if(t.status!=='completed')t.status='skipped';t.lastWorkedAt=e.timestamp;if(r){r.status='skipped';r.finishedAt=e.timestamp;}}
  if(e.type==='task_paused'&&t){t.lastWorkedAt=e.timestamp;if(r&&r.status==='started')r.status='paused';}
  if(e.type==='exam_round_finished'&&q){q.lastWorkedAt=e.timestamp;}
  if(e.type==='activity_slice'){
   if(t){t.duration+=e.data.duration;t.lastWorkedAt=e.timestamp;}if(r)r.duration+=e.data.duration;
   for(const id of e.data.helpIds||[]){const h=helps.get(id);if(h)h.duration+=e.data.duration;}
  }
  const ht=e.type.replace(/_(opened|closed)$/,'');
  if([...helpTypes,'knowledge'].includes(ht)&&e.type.endsWith('_opened')){
   const h={helpId:e.data.helpId,helpType:ht,openedAt:e.timestamp,closedAt:null,duration:0,automatic:!!e.data.automatic,resumed:!!e.data.resumed,taskRunId:e.taskRunId||null,sessionId:e.sessionId};helps.set(h.helpId,h);if(t)t.helps.push(h);if(r)r.helps.push(h);if(q&&!h.automatic&&!h.resumed)q.helpUsage++;
  }
  if(e.type.endsWith('_closed')){const h=helps.get(e.data.helpId);if(h){h.closedAt=e.data.closedAt||e.timestamp;h.endEstimated=!!e.data.recovered;}}
 }
 // Only a snapshot actually available by the cutoff may influence an as-of view.
 const snap=snapshots.filter(s=>s.exportTimestamp<=asOf).sort((a,b)=>a.exportTimestamp.localeCompare(b.exportTimestamp)).at(-1);
 if(snap?.currentState){
  const state=snap.currentState;
  for(const q of qs.values()){
   if(!['regular','challenge'].includes(q.kind)||q.stateAt>snap.exportTimestamp)continue;
   const recordState=q.active===false&&state.contentArchive?state.contentArchive:state;
   if(recordState.completed[q.questId]){q.status='completed';q.completedAt=recordState.completed[q.questId].at||q.completedAt;if(recordState.completed[q.questId].credit==='legacy'){q.credit='legacy';q.baseline=true;}}
   else if(recordState.progress[q.questId])q.status=q.status==='skipped'?'skipped':'started';
   // A deliberate rollback is current gameplay truth, but historical success stays in history/runs.
   else q.status=q.skipCount&&q.history.at(-1)?.type==='quest_skipped'?'skipped':'not_started';
   if(q.kind==='challenge'){q.challengeCompleted=!!recordState.completed[q.questId];q.challengeStarted=q.challengeStarted||!!recordState.progress[q.questId];q.challengeUnlocked=q.challengeUnlocked||catalog.quests.filter(x=>x.kind==='regular'&&x.active===q.active&&x.topicId===q.topicId).every(x=>!!recordState.completed[x.questId]);}
  }
 }
 for(const t of ts.values()){
  const q=qs.get(t.questId);t.kind??=q?.kind||'regular';
  if(!t.startedAt&&q?.status==='completed'){t.status='unobserved';t.baseline=true;}
  t.hintOpenCount=t.helps.filter(h=>h.helpType==='hint'&&!h.resumed).length;t.exampleOpenCount=t.helps.filter(h=>h.helpType==='example'&&!h.resumed).length;
  t.totalHintDuration=t.helps.filter(h=>h.helpType==='hint').reduce((n,h)=>n+h.duration,0);t.totalExampleDuration=t.helps.filter(h=>h.helpType==='example').reduce((n,h)=>n+h.duration,0);
 }
 return {studentId,knownState:!!baselineAt||!!snap,quests:[...qs.values()],tasks:[...ts.values()],runs:[...runs.values()],helps:[...helps.values()],baselineAt,lastActive:es.filter(e=>!['activity_slice','profile_updated'].includes(e.type)).at(-1)?.timestamp||baselineAt||null,events:es};
}

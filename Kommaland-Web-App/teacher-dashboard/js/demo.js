import {CATALOG} from '../shared/catalog.js';
import {FORMAT,SCHEMA_VERSION,APP_VERSION,uid,validateSave} from '../shared/save-schema.js';
/** Explicitly synthetic, isolated demo data. Never mixed into the real classroom DB. */
export function makeDemoSave(index=0){
 const studentId='demo-student-'+index,studentName='Demo · '+['Ada','Ben','Cleo','Deniz','Elin','Fynn','Greta','Hedi','Ivo','Jona','Kim','Luca'][index%12];
 const state={app:'kommaland',schemaVersion:3,createdAt:'2026-09-01T07:00:00.000Z',updatedAt:'2026-09-10T10:00:00.000Z',player:{x:0,z:24},completed:{},progress:{},mastery:{},competencies:{},exams:{},visited:['village'],read:[],activeQuest:'v0a',tutorial:true,settings:{sound:false,quality:'normal',largeText:false,reducedMotion:false},stats:{attempts:0,correct:0,hints:0},encounters:{count:0,distance:0},learner:{studentId,studentName}};
 const sessions=[],events=[];let current,at,seq=0,ctx={},active=0;
 const emit=(type,data={},context=ctx)=>{at+=2;const e={eventId:uid(),studentId,sessionId:current.sessionId,timestamp:new Date(at).toISOString(),sequence:++seq,type,...context,data};events.push(e);current.updatedAt=e.timestamp;return e;};
 const begin=day=>{at=Date.parse(`2026-09-${String(day).padStart(2,'0')}T08:00:00Z`)+index*50000;current={sessionId:uid(),studentId,startedAt:new Date(at).toISOString(),finishedAt:null,updatedAt:new Date(at).toISOString(),duration:0,finishReason:null};sessions.push(current);ctx={};emit('session_started');};
 const slice=(ms,helpIds=[])=>{while(ms>0){const n=Math.min(ms,20000),from=new Date(at).toISOString();at+=n;current.duration+=n;emit('activity_slice',{duration:n,from,helpIds});ms-=n;}};
 const end=()=>{ctx={};emit('session_finished',{reason:'unit_finished'});current.finishedAt=current.updatedAt;current.finishReason='unit_finished';};
 const count=[9,7,24,5,37,14,18,3,20,10,30,15][index%12],regular=CATALOG.quests.filter(q=>q.kind==='regular');
 let day=1;begin(day);emit('history_baseline',{completed:[],started:[],completionDates:{},legacy:false});
 for(let qi=0;qi<count;qi++){
  if(qi&&qi%4===0){end();day=Math.min(10,day+1);begin(day);}
  const q=regular[qi],runId=uid();ctx={questId:q.questId,topicId:q.topicId,kind:'regular',runId};
  if(index%6===3&&qi%2===0){emit('quest_skipped',{reason:'explicit_defer'});continue;}
  emit('quest_started',{questTitle:q.title,replay:false});state.progress[q.questId]={step:0,mistakes:0,hints:0};
  const tasks=CATALOG.tasks.filter(t=>t.questId===q.questId);let completed=true;
  for(let ti=0;ti<tasks.length;ti++){
   const t=tasks[ti],taskRunId=uid();ctx={questId:q.questId,topicId:q.topicId,kind:'regular',runId,taskId:t.taskId,taskRunId,skillId:t.skillId};emit('task_started',{taskType:t.type,taskTitle:t.title});
   const help=index%4===0||index%6===1&&ti%2===0;const helpId=uid();if(help){emit(ti%2?'example_opened':'hint_opened',{helpId,automatic:false});slice(14000,[helpId]);emit(ti%2?'example_closed':'hint_closed',{helpId});}
   const errors=index===4?0:index%6===0?2+ti%3:index%6===1?ti%2:index%6===3?2:ti%4===0?1:0;
   for(let a=1;a<=errors;a++){slice(17000);emit('task_attempt',{attemptNumber:a,correct:false});state.stats.attempts++;}
   const unresolved=(index===0||index===1)&&qi===count-1&&ti===3;
   if(unresolved){emit('task_paused',{reason:'closed'});state.progress[q.questId].step=ti;completed=false;break;}
   slice(index===4?12000:21000);emit('task_attempt',{attemptNumber:errors+1,correct:true});emit('task_completed');state.stats.attempts++;state.stats.correct++;
  }
  ctx={questId:q.questId,topicId:q.topicId,kind:'regular',runId};if(completed){const e=emit('quest_completed');state.completed[q.questId]={mistakes:0,hints:0,at:e.timestamp};delete state.progress[q.questId];}else emit('quest_paused',{reason:'closed'});
 }
 for(const q of CATALOG.quests.filter(q=>q.kind==='challenge'&&regular.filter(x=>x.topicId===q.topicId).every(x=>state.completed[x.questId]))){ctx={questId:q.questId,topicId:q.topicId,kind:'challenge',runId:uid()};emit('challenge_unlocked');if(index!==4)continue;emit('challenge_started');for(const t of CATALOG.tasks.filter(t=>t.questId===q.questId)){ctx={...ctx,taskId:t.taskId,taskRunId:uid(),skillId:t.skillId};emit('task_started',{taskType:t.type,taskTitle:t.title});slice(22000);emit('task_attempt',{attemptNumber:1,correct:true});emit('task_completed');}ctx={questId:q.questId,topicId:q.topicId,kind:'challenge',runId:ctx.runId};const e=emit('challenge_completed');state.completed[q.questId]={at:e.timestamp,mistakes:0,hints:0};}
 end();state.updatedAt=current.finishedAt;
 return validateSave({format:FORMAT,schemaVersion:SCHEMA_VERSION,studentId,studentName,exportId:uid(),exportTimestamp:new Date(at+100).toISOString(),appVersion:APP_VERSION,currentState:state,catalog:CATALOG,sessions,events,coverage:{loggingStartedAt:sessions[0].startedAt,activeTimeOnly:true,idleThresholdSeconds:90,demo:true}});
}

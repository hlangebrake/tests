import {compactRegulation} from './regulation-view.js';
import {studentSummary,aggregate,topicRows,metrics,sum,ratio} from './analytics.js';
import {classHistory} from './timeline.js';
/** Called in a module worker by default. Read one learner at a time to bound memory. */
export async function report(db,{range={},className='',kind='summary',studentId=null,bucket='day'}={}){
 if(kind==='detail')return db.detail(studentId,range.to);
 const students=(await db.all('students')).filter(s=>!className||s.className===className),details=[];
 const rows=[],topics=new Map(),skills=new Map();
 for(const s of students){
  const p=await db.detail(s.studentId,range.to);if(!p)continue;
  if(kind==='history'){details.push(p);continue;}
  rows.push({...studentSummary(s,p,range),regulation:compactRegulation(p.events,range)});
  for(const t of (p.knownState?topicRows([p],range):[])){if(!topics.has(t.topicId))topics.set(t.topicId,{...t,metrics:[]});topics.get(t.topicId).metrics.push(...t.metrics);}
  for(const task of p.tasks.filter(t=>t.active!==false)){if(!skills.has(task.skillId))skills.set(task.skillId,{skillId:task.skillId,title:task.skillTitle,topicId:task.topicId,attempts:0,errors:0,runs:0,helpRuns:0});}
  const seen=new Set();for(const task of p.tasks.filter(t=>t.active!==false)){if(seen.has(task.skillId))continue;seen.add(task.skillId);const m=metrics(p,{...range,skillId:task.skillId});const k=skills.get(task.skillId);k.attempts+=m.attempts;k.errors+=m.errors;k.runs+=m.attemptedRuns;k.helpRuns+=(m.helpRate||0)*m.attemptedRuns;}
 }
 if(kind==='history')return classHistory(details,{...range,bucket});
 const topicResults=[...topics.values()].map(t=>{const m=t.metrics;return {...t,students:m.length,progress:ratio(sum(m,x=>x.completed),sum(m,x=>x.totalQuests)),participation:ratio(sum(m,x=>x.started),sum(m,x=>x.totalQuests)),successRate:ratio(sum(m,x=>(x.successRate||0)*x.attemptedRuns),sum(m,x=>x.attemptedRuns)),avgAttempts:ratio(sum(m,x=>x.attempts),sum(m,x=>x.attemptedRuns)),skipRate:ratio(sum(m,x=>x.skipCount),sum(m,x=>x.totalQuests)),helpRate:ratio(sum(m,x=>(x.helpRate||0)*x.attemptedRuns),sum(m,x=>x.attemptedRuns)),hintRate:ratio(sum(m,x=>(x.hintRate||0)*x.attemptedRuns),sum(m,x=>x.attemptedRuns)),exampleRate:ratio(sum(m,x=>(x.exampleRate||0)*x.attemptedRuns),sum(m,x=>x.attemptedRuns)),errorRate:ratio(sum(m,x=>x.errors),sum(m,x=>x.attempts)),avgDuration:ratio(sum(m,x=>x.duration),sum(m,x=>x.attemptedRuns)),attempts:sum(m,x=>x.attempts),completed:sum(m,x=>x.completed),totalQuests:sum(m,x=>x.totalQuests),metrics:undefined};});
 return {rows,summary:aggregate(rows),topics:topicResults,skills:[...skills.values()].filter(x=>x.runs).map(s=>({...s,errorRate:ratio(s.errors,s.attempts),avgAttempts:ratio(s.attempts,s.runs),helpRate:ratio(s.helpRuns,s.runs)}))};
}

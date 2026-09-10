/** Direction-aware progress. Source mastery and destination prerequisites are
 * deliberately separate: passing a source test must never certify untested skills. */
import {REGIONS,PATHS,INFO,QUESTS,regionById} from './content.js';
import {LESSONS} from './lessons.js';
import {makeVariant,seedOf} from './practice.js';
export const PREREQUISITES={
 village:[],
 forest:['places-hundred','write-thousand','equal-zeros'],
 harbor:['places-hundred','write-thousand','fraction-quarter','compare-hundred','limits'],
 market:['places-hundred','equal-zeros','write-thousand'],
 cliffs:['add-align','add-carry','equal-zeros'],
 mill:['add-group','add-carry','fraction-quarter','places-hundred'],
 cave:['multiply-integer','multiply-decimal','times-ten','times-hundred','fraction-quarter','subtract-basic'],
 castle:['compare-hundred','limits','round-near','metres-cm','kg-grams','ml-litres','add-carry','subtract-exchange','multiply-decimal','unit-price','portion-hundred','divide-equal']
};
export const sourceLessons=id=>INFO[id].map(p=>p.id);
export const basicQuests=id=>QUESTS.filter(q=>q.region===id&&!q.challenge);
export const allBasicDone=(id,completed)=>basicQuests(id).every(q=>!!completed[q.id]);
export const challengeVisible=(id,completed)=>allBasicDone(id,completed);
export const routeKey=(from,to)=>from+'>'+to;
export const validRoute=(from,to)=>PATHS.some(([a,b])=>(a===from&&b===to)||(a===to&&b===from));
export function gateStatus(state,from,to){
 const sourcePassed=!!state.mastery?.[from];
 const missing=PREREQUISITES[to].filter(id=>!state.competencies?.[id]);
 return {sourcePassed,missing,open:sourcePassed&&missing.length===0,kind:sourcePassed?'prerequisite':'source',unfinished:basicQuests(from).filter(q=>!state.completed?.[q.id]).length};
}
export function requiredForRoute(state,from,to){
 if(!validRoute(from,to))throw new Error('Unbekannter Weg.');
 const status=gateStatus(state,from,to);
 const keys=[...new Set([...(status.sourcePassed?[]:sourceLessons(from)),...status.missing])];
 // A newly started prerequisite ward is a small multi-item check, never a single-question toll.
 // Already certified prerequisites may provide one or two confirmation items; retries still
 // concentrate only on the concepts not yet answered correctly in this particular check.
 if(status.sourcePassed && keys.length>0 && keys.length<3){
  for(const id of [...PREREQUISITES[to],...sourceLessons(from)]){
   if(!keys.includes(id))keys.push(id);
   if(keys.length>=3)break;
  }
 }
 return keys;
}
export function ensureExam(state,from,to){
 const key=routeKey(from,to);state.exams??={};
 let exam=state.exams[key];
 if(!exam){exam={keys:requiredForRoute(state,from,to),passed:[],round:0,index:0,results:[]};state.exams[key]=exam;}
 return exam;
}
export const examQueue=exam=>exam.keys.filter(k=>!exam.passed.includes(k));
export function examQuest(state,from,to){
 const exam=ensureExam(state,from,to),queue=examQueue(exam);
 return {id:'test-'+routeKey(from,to),region:from,title:'Bereit für '+regionById(to).name+'?',npc:'Wegprüfung · ohne Wissen, Beispiele oder Tipps',kind:'gate',exam:true,from,to,reward:'Der Weg ist freigegeben.',tasks:queue.map((id,i)=>{
  // A different seed and context from ordinary quests; the stable round makes pauses reproducible.
  const t=makeVariant(id,'exam',seedOf(`weg:${from}:${to}:${exam.round}:${id}`));
  return {...t,key:id,skill:LESSONS[id].title,examSource:sourceLessons(from).includes(id)?'Gebietswissen':'Zusätzliches Vorwissen',text:`${t.text}`,stage:'exam'};
 })};
}
export function finishExamRound(state,from,to){
 const exam=ensureExam(state,from,to),queue=examQueue(exam);
 if(exam.index!==queue.length||exam.results.length!==queue.length)throw new Error('Der Test ist noch nicht vollständig.');
 const failed=queue.filter((_,i)=>!exam.results[i]);
 for(let i=0;i<queue.length;i++)if(exam.results[i]&&!exam.passed.includes(queue[i]))exam.passed.push(queue[i]);
 const newlyMastered=!state.mastery[from];
 if(failed.length===0){
  const at=new Date().toISOString();state.mastery[from]={at};
  for(const id of [...sourceLessons(from),...exam.keys])state.competencies[id]=true;
  delete state.exams[routeKey(from,to)];
  return {complete:true,newlyMastered,failed:[],correct:queue.length,total:queue.length};
 }
 exam.round++;exam.index=0;exam.results=[];
 return {complete:false,newlyMastered:false,failed,correct:queue.length-failed.length,total:queue.length,remaining:failed.length};
}
export const BARRIER_KINDS={village:'gate',forest:'log',harbor:'cargo',market:'cartblock',cliffs:'rocks',mill:'log',cave:'monsters',castle:'runes'};
export const BARRIER_NAMES={gate:'Wegtor',log:'Umgestürzter Baum',cargo:'Versperrte Frachtgasse',cartblock:'Karren auf dem Weg',rocks:'Felssturz',monsters:'Kleine Wegwächter',runes:'Sternenbarriere'};

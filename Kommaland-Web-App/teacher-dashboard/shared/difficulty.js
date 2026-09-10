import {DIFFICULTY_SLOTS} from './difficulty-catalog.js';
import {LEARNING_GOALS} from './learning7-content.js';
/** Learner-controlled demand, not ability classification. All policies are centrally
 * adjustable, transparent starting values, not empirically validated cutoffs.
 * Active time is displayed as context only; it has zero weight in recommendations.
 */
export const DIFFICULTY_RULES=Object.freeze({window:8,maxAgeDays:30,minUpTasks:4,minDownTasks:3,minFormats:2,firstTryRate:.85,maxUpErrors:1,maxUpHelps:1,downErrorTasks:2,downErrorsPerTask:2,downTotalErrors:6,downHelpTasks:2,newTasksAfterDecision:4,cooldownMinutes:10,maxOffersPerSession:2,maxOffersPerQuestSession:1});
export const DIFFICULTY_EVENTS=Object.freeze(['v71_level_selected','v71_level_offered','v71_level_response','v71_level_reflection']);
export const LEVEL_LABELS=Object.freeze({1:'Mehr Struktur',2:'Standard',3:'Herausfordernd'});
export const FIT_LABELS=Object.freeze({fits:'Gut passend',hard:'Etwas zu schwer',easy:'Noch zu leicht'});
const validLevel=n=>Number.isInteger(n)&&n>=1&&n<=3;
const order=(a,b)=>a.timestamp.localeCompare(b.timestamp)||(a.sequence||0)-(b.sequence||0)||a.eventId.localeCompare(b.eventId);
const slotsByTask=new Map(DIFFICULTY_SLOTS.map(s=>[s.baseTaskId,s]));
const slotsByKey=new Map(DIFFICULTY_SLOTS.map(s=>[s.slotId,s]));
export function chosenLevel(state,questId){return validLevel(state?.questLevels?.[questId])?state.questLevels[questId]:2;}
export function cleanQuestLevels(raw){
 if(raw===undefined)return {};
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||Object.keys(raw).length>16)throw new Error('Ungültige questbezogene Niveauwahl.');
 const out={};for(const [id,n] of Object.entries(raw)){if(!Object.hasOwn(LEARNING_GOALS,id)||!validLevel(n))throw new Error('Unbekannte Quest oder ungültiges Niveau.');out[id]=n;}return out;
}
export function cleanTaskVariants(raw,questId){
 if(raw===undefined)return {};
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||Object.keys(raw).length>6)throw new Error('Ungültige Aufgabenvarianten.');
 const out={};for(const [slot,n]of Object.entries(raw)){if(slotsByKey.get(slot)?.questId!==questId||!validLevel(n))throw new Error('Ungültige festgeschriebene Aufgabenvariante.');out[slot]=n;}return out;
}
export function validateDifficultyEvent(e,assert){
 const d=e.data||{};
 if(e.type==='task_started'&&('difficultyLevel'in d||'variantId'in d||'slotId'in d)){
  const s=slotsByTask.get(e.taskId);
  assert(e.kind==='regular'&&s&&s.questId===e.questId&&s.topicId===e.topicId&&d.slotId===s.slotId&&validLevel(d.difficultyLevel),'Ungültiges Niveau an einem Aufgabenbeginn.');
  const v=s.variants.find(v=>v.level===d.difficultyLevel);
  assert(v?.variantId===d.variantId&&v.type===d.taskType&&v.title===d.taskTitle,'Variante und dokumentierte Aufgabe stimmen nicht überein.');
 }
 if(!e.type.startsWith('v71_'))return;
 assert(DIFFICULTY_EVENTS.includes(e.type)&&Object.hasOwn(LEARNING_GOALS,e.questId)&&e.kind==='regular'&&DIFFICULTY_SLOTS.some(s=>s.questId===e.questId&&s.topicId===e.topicId),'Unbekannte Niveau-Lernspur.');
 const allowed={v71_level_selected:['fromLevel','level','source','recommendationId'],v71_level_offered:['recommendationId','fromLevel','targetLevel','reason','evidenceIds','text'],v71_level_response:['recommendationId','decision','targetLevel'],v71_level_reflection:['level','fit','changeId']};
 assert(Object.keys(d).every(k=>allowed[e.type].includes(k)),'Unerwartete Felder in Niveau-Lernspur.');
 if(e.type==='v71_level_selected')assert(validLevel(d.level)&&validLevel(d.fromLevel)&&['manual','recommendation'].includes(d.source)&&(d.recommendationId===null||typeof d.recommendationId==='string'),'Ungültige Niveauwahl.');
 if(e.type==='v71_level_offered')assert(validLevel(d.fromLevel)&&validLevel(d.targetLevel)&&Math.abs(d.targetLevel-d.fromLevel)===1&&['independent_success','structure_needed'].includes(d.reason)&&Array.isArray(d.evidenceIds)&&d.evidenceIds.length>=DIFFICULTY_RULES.minDownTasks&&d.evidenceIds.length<=DIFFICULTY_RULES.window&&new Set(d.evidenceIds).size===d.evidenceIds.length&&d.evidenceIds.every(x=>typeof x==='string'&&x.length<=200)&&typeof d.recommendationId==='string'&&d.recommendationId.length<=200&&typeof d.text==='string'&&d.text.length<=1000,'Ungültige Niveauempfehlung.');
 if(e.type==='v71_level_response')assert(typeof d.recommendationId==='string'&&['accepted','declined','dismissed'].includes(d.decision)&&validLevel(d.targetLevel),'Ungültige Empfehlungsentscheidung.');
 if(e.type==='v71_level_reflection')assert(validLevel(d.level)&&Object.hasOwn(FIT_LABELS,d.fit)&&typeof d.changeId==='string','Ungültiger Niveaurückblick.');
}
export function validateDifficultyHistory(events,assert){
 const offers=new Map(),changes=new Map(),starts=new Map(events.filter(e=>e.type==='task_started').map(e=>[e.taskRunId,e]));
 for(const e of events.slice().sort(order)){
  const d=e.data;
  if(e.type==='v71_level_offered'){
   assert(!offers.has(d.recommendationId),'Doppelte Empfehlungs-ID.');
   assert(d.evidenceIds.every(id=>{const a=starts.get(id);return a&&a.questId===e.questId&&a.kind==='regular'&&a.timestamp<=e.timestamp;}),'Empfehlung ohne passende vorherige Aufgabenbeobachtungen.');offers.set(d.recommendationId,e);
  }
  if(e.type==='v71_level_response'||e.type==='v71_level_selected'&&d.source==='recommendation'){
   const o=offers.get(d.recommendationId);assert(o&&o.questId===e.questId&&o.data.targetLevel===(d.targetLevel||d.level),'Entscheidung ohne passende Empfehlung.');
  }
  if(e.type==='v71_level_selected')changes.set(e.eventId,e);
  if(e.type==='v71_level_reflection'){const c=changes.get(d.changeId);assert(c&&c.questId===e.questId&&c.data.level===d.level,'Niveaurückblick ohne zugehörige Wahl.');}
 }
}
/** Raw observation projection: no historical default levels are written. Missing is
 * genuinely unknown in teacher views. Only the recommender may compare unchanged V7
 * task content against today's neutral N2; this does not create a historical choice.
 */
export function difficultyObservations(events,{questId,from='',to='9999-12-31T23:59:59.999Z'}={}){
 const runs=new Map();const es=events.filter(e=>e.timestamp<=to&&(!questId||e.questId===questId)).slice().sort(order);
 for(const e of es){
  const s=slotsByTask.get(e.taskId),d=e.data||{};
  if(e.type==='task_started'&&e.kind==='regular'&&s&&!runs.has(e.taskRunId))runs.set(e.taskRunId,{taskRunId:e.taskRunId,taskId:e.taskId,questId:e.questId,topicId:e.topicId,slotId:s.slotId,skillId:e.skillId,sessionId:e.sessionId,startedAt:e.timestamp,lastAt:e.timestamp,level:validLevel(d.difficultyLevel)?d.difficultyLevel:null,variantId:d.variantId||null,type:d.taskType||s.variants[1].type,title:d.taskTitle||s.variants[1].title,attempts:[],helps:0,helpTypes:[],duration:0,correct:false,paused:0});
  const r=runs.get(e.taskRunId);if(!r||e.kind!=='regular')continue;
  if(e.type==='task_attempt'){r.attempts.push({correct:d.correct,at:e.timestamp});r.lastAt=e.timestamp;}
  if(e.type==='task_completed'){r.correct=true;r.lastAt=e.timestamp;}
  if(e.type==='task_paused'||e.type==='task_skipped'){r.paused++;r.lastAt=e.timestamp;}
  if(['hint_opened','example_opened','knowledge_opened','solutionStep_opened','otherHelp_opened'].includes(e.type)&&!d.automatic&&!d.resumed){r.helps++;r.helpTypes.push(e.type.replace('_opened',''));r.lastAt=e.timestamp;}
  if(e.type==='activity_slice'){r.duration+=d.duration||0;r.lastAt=e.timestamp;}
 }
 return [...runs.values()].filter(r=>r.lastAt>=from).map(r=>({...r,errors:r.attempts.filter(a=>!a.correct).length,firstTry:r.correct&&r.attempts.length===1&&r.attempts[0].correct}));
}
function confidenceFor(events,questId){const goalId=LEARNING_GOALS[questId]?.goalId;const g=events.filter(e=>['v7_goal_reflection','v7_goal_selected'].includes(e.type)&&e.data.goalId===goalId&&(e.data.value||e.data.confidence)).sort(order).at(-1);return g?.data.value||g?.data.confidence||null;}
export function difficultyRecommendation(events,{questId,level=2,sessionId,now=new Date().toISOString()}={}){
 if(!LEARNING_GOALS[questId]||!validLevel(level))return null;
 const rules=DIFFICULTY_RULES,es=events.filter(e=>e.timestamp<=now).slice().sort(order),cutoff=new Date(Date.parse(now)-rules.maxAgeDays*86400000).toISOString();
 const decisions=es.filter(e=>e.questId===questId&&['v71_level_selected','v71_level_response'].includes(e.type));const lastDecision=decisions.at(-1);
 const allRuns=difficultyObservations(es,{questId,from:cutoff,to:now}).filter(r=>r.startedAt>=cutoff&&r.attempts.length&&(r.level===level||r.level===null&&level===2));
 // At most one current observation per distinct competence position; immediate replay
 // of one item cannot satisfy the minimum sample size or unlock repeated offers.
 const unique=new Map();for(const r of allRuns)unique.set(r.slotId,r);const runs=[...unique.values()].sort((a,b)=>a.lastAt.localeCompare(b.lastAt)).slice(-rules.window);
 if(lastDecision){if(Date.parse(now)-Date.parse(lastDecision.timestamp)<rules.cooldownMinutes*60000)return null;
  if(runs.filter(r=>r.startedAt>lastDecision.timestamp).length<rules.newTasksAfterDecision)return null;}
 const offers=es.filter(e=>e.type==='v71_level_offered');
 if(sessionId&&(offers.filter(e=>e.sessionId===sessionId).length>=rules.maxOffersPerSession||offers.some(e=>e.sessionId===sessionId&&e.questId===questId)))return null;
 const recentOffer=offers.at(-1);if(recentOffer&&Date.parse(now)-Date.parse(recentOffer.timestamp)<rules.cooldownMinutes*60000)return null;
 const confidence=confidenceFor(es.filter(e=>e.timestamp>=cutoff),questId),low=confidence!==null&&confidence<=2;
 const wrong=runs.reduce((n,r)=>n+r.errors,0),helpTasks=runs.filter(r=>r.helps>=2).length;
 const fit=es.filter(e=>e.type==='v71_level_reflection'&&e.questId===questId&&e.data.level===level&&e.timestamp>=cutoff).at(-1)?.data.fit;
 if(level<3&&!low&&fit!=='hard'&&runs.length>=rules.minUpTasks&&runs.every(r=>r.correct)&&runs.filter(r=>r.firstTry).length/runs.length>=rules.firstTryRate&&wrong<=rules.maxUpErrors&&runs.reduce((n,r)=>n+r.helps,0)<=rules.maxUpHelps&&new Set(runs.map(r=>r.type)).size>=rules.minFormats){
  return {targetLevel:level+1,reason:'independent_success',evidenceIds:runs.map(r=>r.taskRunId),text:`Du hast ${runs.length} unterschiedliche Aufgaben überwiegend direkt richtig gelöst und kaum fachliche Hilfen geöffnet. Möchtest du Niveau ${level+1} ausprobieren?`};
 }
 if(level>1&&runs.length>=rules.minDownTasks&&runs.filter(r=>r.errors>=rules.downErrorsPerTask).length>=rules.downErrorTasks&&(wrong>=rules.downTotalErrors||helpTasks>=rules.downHelpTasks||low||fit==='hard')){
  return {targetLevel:level-1,reason:'structure_needed',evidenceIds:runs.map(r=>r.taskRunId),text:`Bei mehreren unterschiedlichen Aufgaben gab es wiederholte Fehlversuche${helpTasks>=rules.downHelpTasks?' und mehrere Hilfeöffnungen':''}. Möchtest du auf Niveau ${level-1} etwas mehr Struktur am gleichen Lernziel ausprobieren?`};
 }
 return null;
}
export function difficultyView(events,{from='',to='9999-12-31T23:59:59.999Z'}={}){
 const es=events.filter(e=>e.timestamp<=to).slice().sort(order),history=es.filter(e=>e.type.startsWith('v71_')&&e.timestamp>=from),observations=difficultyObservations(es,{from,to});
 const quests=Object.keys(LEARNING_GOALS).map(questId=>{
  const own=history.filter(e=>e.questId===questId),runs=observations.filter(r=>r.questId===questId),lastChoice=es.filter(e=>e.type==='v71_level_selected'&&e.questId===questId).at(-1);
  const counts=[1,2,3].map(level=>({level,shown:runs.filter(r=>r.level===level).length,attempted:runs.filter(r=>r.level===level&&r.attempts.length).length,firstTry:runs.filter(r=>r.level===level&&r.firstTry).length,helps:runs.filter(r=>r.level===level).reduce((n,r)=>n+r.helps,0)}));
  return {questId,topicId:DIFFICULTY_SLOTS.find(s=>s.questId===questId).topicId,selected:lastChoice?.data.level||null,selectedAt:lastChoice?.timestamp||null,history:own,counts,unknown:runs.filter(r=>r.level===null).length,runs,conversation:runs.filter(r=>r.level===3&&r.helps>=2).length>=3};
 }).filter(q=>q.selected||q.history.length||q.runs.length);
 return {quests,history,observations};
}

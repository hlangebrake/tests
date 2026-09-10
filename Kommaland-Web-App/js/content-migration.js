/** Curriculum IDs never identify two different tasks. An old completion is a credit,
 * not a fabricated attempt on a rewritten problem. Preserve old records in the save.
 * A changed unfinished sequence restarts; its previous evidence remains in the log.
 */
import {QUESTS,LEGACY_QUEST_MAP} from './curriculum-data.js';
import {SOURCE_CHECKS} from './foundation-checks.js';
const OLD={"v0a": {"tasks": 6, "oldCount": 3}, "v0b": {"tasks": 9, "oldCount": 3}, "v1": {"tasks": 9, "oldCount": 3}, "v0c": {"tasks": 9, "oldCount": 3}, "v2": {"tasks": 9, "oldCount": 3}, "v0d": {"tasks": 6, "oldCount": 3}, "v3": {"tasks": 15, "oldCount": 5}, "v4": {"tasks": 9, "oldCount": 3}, "f1": {"tasks": 12, "oldCount": 4}, "f2": {"tasks": 9, "oldCount": 3}, "f3": {"tasks": 9, "oldCount": 4}, "f4": {"tasks": 6, "oldCount": 3}, "h1": {"tasks": 9, "oldCount": 4}, "h2": {"tasks": 9, "oldCount": 3}, "h3": {"tasks": 9, "oldCount": 3}, "h4": {"tasks": 9, "oldCount": 3}, "h5": {"tasks": 9, "oldCount": 3}, "a1": {"tasks": 12, "oldCount": 4}, "a2": {"tasks": 9, "oldCount": 3}, "a3": {"tasks": 9, "oldCount": 3}, "a4": {"tasks": 9, "oldCount": 3}, "s1": {"tasks": 12, "oldCount": 4}, "s2": {"tasks": 9, "oldCount": 3}, "s3": {"tasks": 9, "oldCount": 3}, "s4": {"tasks": 9, "oldCount": 3}, "m1": {"tasks": 9, "oldCount": 4}, "m2": {"tasks": 15, "oldCount": 5}, "m3": {"tasks": 9, "oldCount": 3}, "m4": {"tasks": 9, "oldCount": 3}, "d1": {"tasks": 9, "oldCount": 4}, "d2": {"tasks": 9, "oldCount": 3}, "d3": {"tasks": 9, "oldCount": 3}, "d4": {"tasks": 9, "oldCount": 3}, "k1": {"tasks": 9, "oldCount": 3}, "k2": {"tasks": 9, "oldCount": 3}, "k3": {"tasks": 9, "oldCount": 3}, "k4": {"tasks": 9, "oldCount": 3}, "master-village": {"tasks": 6, "oldCount": 6}, "master-forest": {"tasks": 6, "oldCount": 6}, "master-harbor": {"tasks": 6, "oldCount": 6}, "master-market": {"tasks": 6, "oldCount": 6}, "master-cliffs": {"tasks": 6, "oldCount": 6}, "master-mill": {"tasks": 6, "oldCount": 6}, "master-cave": {"tasks": 6, "oldCount": 6}, "master-castle": {"tasks": 6, "oldCount": 6}};
const OLD_SOURCES={"village": ["between", "half-name", "tenths", "half-tenths", "write-tenths", "places-tenths", "hundred-grid", "write-hundred", "zero-hundred", "places-hundred", "equal-zeros", "thousand", "write-thousand", "fraction-meaning", "fraction-tenths", "fraction-hundred", "fraction-quarter", "fraction-threequarters", "fraction-thousand"], "forest": ["compare-tenths", "compare-hundred", "order-thousand", "limits", "line-tenths", "line-fives", "midpoint", "round-near", "round-digit", "round-carry", "estimate"], "harbor": ["metres-cm", "cm-metres", "kilometres", "kg-grams", "grams-kg", "litres-ml", "ml-litres", "time-half", "time-quarter", "money", "square-units", "cube-units", "cube-litre"], "market": ["add-tenths", "add-align", "add-carry", "add-thousand", "add-group", "add-units"], "cliffs": ["subtract-basic", "subtract-exchange", "subtract-whole", "subtract-thousand", "missing", "subtract-proof", "two-subtractions"], "mill": ["multiply-repeat", "multiply-integer", "multiply-half", "multiply-decimal", "rectangle", "rectangle-decimal", "multiply-smaller", "unit-price", "times-ten", "times-hundred", "multiply-quarter", "distribute", "product-then-double"], "cave": ["divide-equal", "divide-leftover", "divide-proof", "portion-tenths", "portion-hundred", "divide-small", "divide-ten", "divide-hundred", "divide-scale", "need-minus-stock"], "castle": ["model", "one-discount", "operations", "plan-leftover"]};

const plain=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const date=x=>typeof x==='string'&&x.length<50&&Number.isFinite(Date.parse(x));
const integer=x=>Number.isInteger(x)&&x>=0&&x<=1000000;
export function validateArchive(raw){
 if(!plain(raw)||raw.version!=='5.1'||!plain(raw.completed)||!plain(raw.progress))throw new Error('Ungültiges Inhaltsarchiv.');
 const out={version:'5.1',completed:{},progress:{},mastery:{},competencies:{},exams:{}};
 for(const [id,v] of Object.entries(raw.completed)){
  if(!OLD[id]||!plain(v)||!integer(v.mistakes)||!integer(v.hints)||!date(v.at))throw new Error('Ungültiger alter Questabschluss.');
  out.completed[id]={mistakes:v.mistakes,hints:v.hints,at:v.at};
 }
 for(const [id,v] of Object.entries(raw.progress)){
  if(!OLD[id]||!plain(v)||!integer(v.step)||v.step>=OLD[id].tasks||!integer(v.mistakes)||!integer(v.hints))throw new Error('Ungültiger alter Aufgabenstand.');
  out.progress[id]={step:v.step,mistakes:v.mistakes,hints:v.hints,...(v.ready===true?{ready:true}:{})};
 }
 const known=new Set(Object.values(OLD_SOURCES).flat());
 for(const [id,v]of Object.entries(raw.competencies||{})){if(!known.has(id)||v!==true)throw new Error('Ungültiger alter Wissensnachweis.');out.competencies[id]=true;}
 for(const [id,v]of Object.entries(raw.mastery||{})){if(!OLD_SOURCES[id]||!plain(v)||!date(v.at)||!OLD_SOURCES[id].every(k=>out.competencies[k]))throw new Error('Ungültiges altes Gebietssiegel.');out.mastery[id]={at:v.at};}
 for(const [key,e]of Object.entries(raw.exams||{})){
  if(!/^[a-z]+>[a-z]+$/.test(key)||!plain(e)||!Array.isArray(e.keys)||e.keys.length>83||!e.keys.every(k=>known.has(k))||!Array.isArray(e.passed)||!e.passed.every(k=>e.keys.includes(k))||!integer(e.round)||!integer(e.index)||!Array.isArray(e.results)||!e.results.every(x=>typeof x==='boolean')||e.results.length!==e.index)throw new Error('Ungültige alte Wegprüfung.');
  out.exams[key]={keys:[...e.keys],passed:[...e.passed],round:e.round,index:e.index,results:[...e.results]};
 }
 return out;
}
export function migrateCurriculum(raw){
 if(!plain(raw)||raw.contentVersion===6)return raw;
 if(raw.contentVersion!==undefined)throw new Error('Unbekannte Inhaltsversion.');
 if(!plain(raw.completed)||!plain(raw.progress))return raw;
 const archive=validateArchive({version:'5.1',completed:raw.completed,progress:raw.progress,mastery:raw.mastery||{},competencies:raw.competencies||{},exams:raw.exams||{}});
 const completed={},progress={},mastery={},competencies={};
 for(const q of QUESTS){const sources=q.legacySources||[];
  if(sources.length&&sources.every(id=>archive.completed[id])){
   const records=sources.map(id=>archive.completed[id]);completed[q.id]={at:records.map(x=>x.at).sort().at(-1),mistakes:records.reduce((n,x)=>n+x.mistakes,0),hints:records.reduce((n,x)=>n+x.hints,0),credit:'legacy'};
  }else if(sources.some(id=>archive.progress[id]||archive.completed[id]))progress[q.id]={step:0,mistakes:0,hints:0};
 }
 for(const [region,m]of Object.entries(archive.mastery)){mastery[region]={at:m.at};for(const key of SOURCE_CHECKS[region])competencies[key]=true;}
 return {...raw,schemaVersion:3,contentVersion:6,contentArchive:archive,completed,progress,mastery,competencies,exams:{},activeQuest:LEGACY_QUEST_MAP[raw.activeQuest]||'c6-v1',contentMigration:{from:'5.1',credited:Object.keys(completed),restarted:Object.keys(progress),pausedTests:Object.keys(archive.exams).length}};
}

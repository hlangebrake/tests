import test from 'node:test';import assert from 'node:assert/strict';
import {QUESTS,REGIONS,PATHS,questById,questUnlocked} from '../js/content.js';
import {LESSONS} from '../js/lessons.js';
import {makeVariant,shuffleIndices} from '../js/practice.js';
import {defaultState,parseSave,validateState} from '../js/state.js';
import {basicQuests,allBasicDone,sourceLessons,PREREQUISITES,gateStatus,requiredForRoute,ensureExam,examQueue,examQuest,finishExamRound} from '../js/adventure.js';
import {checkAnswer,equalDecimal} from '../js/math.js';import {numberLine} from '../js/ui.js';
const done=()=>({mistakes:0,hints:0,at:new Date().toISOString()});
const canonical=t=>t.type==='mark'?Array.from({length:t.answer},(_,i)=>i):t.answer;
const sig=t=>JSON.stringify([t.type,t.text,t.items,t.options,t.steps,t.start,t.end,t.answer]);
const pass=(s,a,b)=>{const e=ensureExam(s,a,b),queue=examQueue(e);e.index=queue.length;e.results=queue.map(()=>true);return finishExamRound(s,a,b);};
test('Jeder Lerngedanke besitzt mindestens drei Aufgaben, mit Festigung und Transfer',()=>{
 for(const q of QUESTS.filter(q=>!q.challenge)){
  const groups=new Map();for(const t of q.tasks){if(!groups.has(t.group))groups.set(t.group,[]);groups.get(t.group).push(t);}
  for(const tasks of groups.values()){assert.ok(tasks.length>=3,q.id);assert.equal(tasks[0].stage,'guided');assert.equal(tasks[1].stage,'near');assert.equal(tasks.at(-1).stage,'transfer');assert.equal(new Set(tasks.map(t=>t.lesson)).size,1);}
 }
});
test('Alle 83 Themen erzeugen gültige Nah-, Transfer- und Testaufgaben in 30 Parameterständen',()=>{
 for(const id of Object.keys(LESSONS))for(const mode of ['near','transfer','exam'])for(let seed=0;seed<30;seed++){
  const t=makeVariant(id,mode,seed);assert.ok(t.text&&t.why&&t.hint,id);assert.ok(checkAnswer(t,canonical(t)),id);assert.ok(!checkAnswer(t,null),id);
  if(t.options){assert.equal(new Set(t.options).size,t.options.length,id);for(const i of Array.isArray(t.answer)?t.answer:[t.answer])assert.ok(i>=0&&i<t.options.length,id);}
  if(t.type==='mark')assert.ok(Number.isInteger(t.answer)&&t.answer>=0&&t.answer<=t.parts,id);
  if(t.type==='line'){const pos=(Number(t.answer)-t.start)/t.step;assert.ok(pos>=0&&pos<=(t.end-t.start)/t.step+1e-7,id);assert.ok(Math.abs(pos-Math.round(pos))<1e-7,id);}
 }
});
test('Testkarten sind keine identischen Kopien der 393 Questaufgaben',()=>{
 const normal=new Set(QUESTS.flatMap(q=>q.tasks.map(sig)));
 for(const [a,b] of PATHS)for(const [from,to]of [[a,b],[b,a]])for(const t of examQuest(defaultState(),from,to).tasks)assert.ok(!normal.has(sig(t)),from+'>'+to+': '+t.lesson);
});
test('Acht Herausforderungen erscheinen ausschließlich nach allen regulären Gebietsquests',()=>{
 for(const r of REGIONS){const c={},q=questById('master-'+r.id),base=basicQuests(r.id);assert.equal(q.tasks.length,6);assert.deepEqual(q.requires,base.map(q=>q.id));assert.ok(!questUnlocked(q,c));
  for(const b of base.slice(0,-1))c[b.id]=done();assert.ok(!allBasicDone(r.id,c));assert.ok(!questUnlocked(q,c));c[base.at(-1).id]=done();assert.ok(allBasicDone(r.id,c));assert.ok(questUnlocked(q,c));}
});
test('Jeder gerichtete Wegtest umfasst das Ausgangsgebiet und sämtliches noch fehlendes Zielvorwissen',()=>{
 for(const [a,b]of PATHS)for(const [from,to]of [[a,b],[b,a]]){
  const keys=requiredForRoute(defaultState(),from,to);assert.ok(keys.length>=6);for(const id of [...sourceLessons(from),...PREREQUISITES[to]])assert.ok(keys.includes(id),`${from}>${to}: ${id}`);assert.equal(new Set(keys).size,keys.length);
 }
 for(const from of ['mill','cliffs']){const keys=requiredForRoute(defaultState(),from,'castle');assert.ok(keys.includes('multiply-decimal'));assert.ok(keys.includes('subtract-exchange'));assert.ok(keys.includes('portion-hundred'));assert.ok(keys.includes('add-carry'));}
});
test('Gebietstest ist schon ohne abgeschlossene Quests vollständig versuchbar',()=>{
 const s=defaultState();assert.equal(gateStatus(s,'village','forest').unfinished,8);assert.equal(examQuest(s,'village','forest').tasks.length,19);assert.ok(!s.completed.v0a);
 const result=pass(s,'village','forest');assert.ok(result.complete&&result.newlyMastered);assert.ok(gateStatus(s,'village','forest').open);assert.equal(Object.keys(s.completed).length,0);
});
test('Ein Gebietssiegel räumt Source-Sperren weg, bescheinigt aber kein ungeprüftes Zielvorwissen',()=>{
 const s=defaultState();pass(s,'village','forest');for(const to of ['forest','harbor','market','mill'])assert.ok(gateStatus(s,'village',to).sourcePassed);
 assert.ok(gateStatus(s,'village','market').open);assert.ok(!gateStatus(s,'village','harbor').open);assert.deepEqual(requiredForRoute(s,'village','harbor'),['compare-hundred','limits','places-hundred']);
 assert.ok(!s.mastery.forest);const result=pass(s,'village','harbor');assert.ok(!result.newlyMastered);assert.ok(gateStatus(s,'village','harbor').open);assert.equal(Object.keys(s.mastery).length,1);
});
test('Falsche Testantworten sperren den Weg; nur fehlende Gedanken kommen erneut',()=>{
 const s=defaultState(),e=ensureExam(s,'village','forest');e.index=e.keys.length;e.results=e.keys.map((_,i)=>i!==3&&i!==7);
 const r=finishExamRound(s,'village','forest');assert.equal(r.failed.length,2);assert.equal(r.correct,17);assert.ok(!s.mastery.village);assert.deepEqual(examQueue(e),r.failed);assert.equal(e.round,1);assert.equal(e.index,0);assert.deepEqual(e.results,[]);
 assert.throws(()=>finishExamRound(s,'village','forest'));pass(s,'village','forest');assert.ok(gateStatus(s,'village','forest').open);assert.ok(sourceLessons('village').every(k=>s.competencies[k]));assert.ok(!s.exams['village>forest']);
});
test('Unterbrochene Tests behalten Position und reproduzierbare Aufgaben nach Export/Import',()=>{
 const s=defaultState(),q=examQuest(s,'mill','castle'),e=s.exams['mill>castle'];e.index=3;e.results=[true,false,true];
 const clean=parseSave(JSON.stringify(s));assert.deepEqual(clean.exams,s.exams);assert.deepEqual(examQuest(clean,'mill','castle').tasks,q.tasks);
 const invalid=structuredClone(s);invalid.exams['mill>castle'].results=[true];assert.throws(()=>validateState(invalid));
});
test('Version-2-Lernfortschritt wird auf die eingefügten Übungsschritte abgebildet',()=>{
 const s=defaultState();s.schemaVersion=2;s.progress.v1={step:1,mistakes:2,hints:1};s.completed.v0a=done();const r=validateState(s);
 assert.equal(r.progress.v1.step,questById('v1').legacyStepMap[1]);assert.deepEqual(r.completed,s.completed);assert.deepEqual(r.mastery,{});assert.equal(r.schemaVersion,3);
 s.progress.v1={step:2,mistakes:0,hints:0,ready:true};const ready=validateState(s);assert.ok(!ready.progress.v1.ready);assert.equal(ready.progress.v1.step,questById('v1').legacyStepMap[2]+1);
});
test('Neue Aufgabentypen lehnen falsche Schritte, Argumente und Markierungen ab',()=>{
 assert.ok(checkAnswer({type:'mark',parts:100,answer:25},Array.from({length:25},(_,i)=>99-i)));assert.ok(!checkAnswer({type:'mark',parts:10,answer:2},[0,0]));assert.ok(!checkAnswer({type:'mark',parts:10,answer:2},[0,10]));
 assert.ok(checkAnswer({type:'argument',answer:[2,0,1]},[2,0,1]));assert.ok(!checkAnswer({type:'argument',answer:[2,0,1]},[2,1,0]));assert.ok(!checkAnswer({type:'argument',answer:[2,0,1]},[2,0,1,3]));
 assert.ok(checkAnswer({type:'error',answer:2},2));assert.ok(!checkAnswer({type:'error',answer:2},'2'));
});
test('Zahlengeraden haben Striche, aber nur zwei Zahlenbeschriftungen; Marker verrät keinen Wert',()=>{
 const a=numberLine(0,1,.1,'0.6',true);assert.equal((a.match(/<text /g)||[]).length,2);assert.equal((a.match(/stroke="currentColor"/g)||[]).length,12);assert.ok(!a.includes('0,6'));assert.ok(!a.includes('0.6'));
});
test('Mischen ergibt über mehrere Sitzungen verschiedene vollständige Permutationen',()=>{
 const variants=new Set();for(let i=0;i<20;i++){const a=shuffleIndices(4,i);assert.deepEqual([...a].sort(),[0,1,2,3]);variants.add(a.join());}assert.ok(variants.size>=4);
});
test('Meisteraufgaben: unabhängige Rechnungen zu Rückwärtsweg, Grenzwerten, Einheiten und Resten',()=>{
 const val=(r,i)=>questById('master-'+r).tasks[i].answer;
 const checks=[['village',4,3+42/1000],['harbor',0,.004*1000],['harbor',3,1+45/60],['market',0,4-1.375-.85],['market',2,.875+.65+1.025],['market',4,2.03-.09],['cliffs',0,10-3.875-2.68],['cliffs',1,1.075+2.85],['cliffs',3,7.5-4.875],['mill',0,.18/.4],['mill',1,1.25*.48],['mill',4,2.4*1.5/.75],['cave',0,Math.floor(4.1/.35)],['cave',1,1.575/7],['cave',3,1/.125],['castle',0,(8.1+1.5)/1.2],['castle',1,Math.ceil((12*.35-2.75)/.5)],['castle',3,Math.max(0,2.4*1.25-3)]];
 for(const [r,i,n]of checks)assert.ok(equalDecimal(val(r,i),Number(n.toFixed(6)).toString()),`${r}: ${i}`);
});

test('Neue Zusatzprüfungen haben mindestens drei Aufgaben, auch wenn nur ein oder zwei Gedanken fehlen',()=>{
 for(const [a,b] of PATHS)for(const [from,to]of [[a,b],[b,a]]){
  const s=defaultState();s.mastery[from]={at:new Date().toISOString()};for(const id of sourceLessons(from))s.competencies[id]=true;
  for(const id of PREREQUISITES[to].slice(1))s.competencies[id]=true;
  if(gateStatus(s,from,to).open)continue;
  const tasks=examQuest(s,from,to).tasks;assert.ok(tasks.length>=3,from+'>'+to);
  for(const key of gateStatus(s,from,to).missing)assert.ok(tasks.some(t=>t.key===key));
 }
});

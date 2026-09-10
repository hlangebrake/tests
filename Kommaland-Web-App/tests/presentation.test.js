import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import {QUESTS,questById} from '../js/content.js';
import {LESSONS} from '../js/lessons.js';
import {introductionKey,cleanShownLessons,shownLessonsForQuest,shouldIntroduce} from '../js/learning-flow.js';
import {defaultState,parseSave,SaveStore} from '../js/state.js';
import {questGeometry} from '../js/world.js';
import {questAppearance,MODEL_STAGES} from '../js/quest-models.js';
const q=id=>questById(id),record=(step=0)=>({step,mistakes:0,hints:0});
const positions=g=>g.data.filter((_,i)=>i%10<3);
const digest=xs=>createHash('sha256').update(JSON.stringify(xs)).digest('hex');

test('In jeder regulären Quest erscheint jeder bekannte Gedanke höchstens einmal, auch über Gruppengrenzen hinweg',()=>{
 let groups=0,cards=0;
 for(const quest of QUESTS.filter(q=>!q.challenge)){
  const seen=new Set(),automatic=[];groups+=new Set(quest.tasks.map(t=>t.group)).size;
  for(const t of quest.tasks)if(shouldIntroduce(t,seen)){automatic.push(t.lesson);seen.add(t.lesson);}
  assert.equal(new Set(automatic.map(introductionKey)).size,automatic.length,quest.id);
  assert.deepEqual(automatic,[...new Set(quest.tasks.map(t=>t.lesson))].filter(id=>quest.id!=='m2'||id!=='rectangle-decimal'),quest.id);cards+=automatic.length;
 }
 assert.equal(groups,115);assert.equal(cards,108);
});
test('Brunnen: der gleiche Stellenwertgedanke wird nach einer anderen Aufgabe nicht erneut automatisch geöffnet',()=>{
 const quest=q('v1'),seen=new Set();const shown=[];
 for(const t of quest.tasks){if(shouldIntroduce(t,seen)){shown.push(t.lesson);seen.add(t.lesson);}}
 assert.deepEqual(shown,['places-tenths','write-tenths']);
});
test('Neue fachliche Teilgedanken bleiben eigenständig: Nullstellen, Tausendstel, Viertel, Entbündeln und Einheiten',()=>{
 const groups=[['hundred-grid','write-hundred','zero-hundred'],['thousand','write-thousand'],['fraction-quarter','fraction-threequarters'],['subtract-exchange','subtract-whole','subtract-thousand'],['square-units','cube-units','cube-litre'],['multiply-half','multiply-smaller'],['metres-cm','cm-metres']];
 for(const ids of groups){const seen=new Set();for(const id of ids){assert.ok(shouldIntroduce({lesson:id},seen),id);seen.add(id);}}
 assert.equal(new Set(Object.keys(LESSONS).map(introductionKey)).size,83);
});
test('Laufende alte Spielstände leiten bekanntes Wissen nur aus bereits gelösten Aufgaben ab',()=>{
 const quest=q('v0c'),p=record(3),seen=shownLessonsForQuest(quest,p);
 assert.ok(seen.has('hundred-grid'));assert.ok(!seen.has('write-hundred'));
 assert.ok(shouldIntroduce(quest.tasks[3],seen));assert.ok(!shouldIntroduce(quest.tasks[1],seen));
});
test('Freiwillig geöffnetes Wissen bleibt nach JSON-Export und Import bekannt, ohne richtige Antworten zu erfinden',()=>{
 const s=defaultState();s.progress.v1={...record(),shownLessons:['places-tenths']};
 const clean=parseSave(JSON.stringify(s));assert.deepEqual(clean,s);
 const seen=shownLessonsForQuest(q('v1'),clean.progress.v1);
 assert.ok(!shouldIntroduce(q('v1').tasks[0],seen));assert.equal(clean.progress.v1.step,0);assert.deepEqual(clean.completed,{});assert.deepEqual(clean.competencies,{});
});
test('Unbrauchbare optionale Lesemetadaten beschädigen keinen gültigen mathematischen Spielstand',()=>{
 const s=defaultState();for(const value of ['unsafe',{bad:true},Array(100).fill('places-tenths')]){
  s.progress.v1={...record(2),shownLessons:value};const clean=parseSave(JSON.stringify(s));assert.equal(clean.progress.v1.step,2);assert.equal(clean.progress.v1.shownLessons,undefined);
 }
 assert.deepEqual(cleanShownLessons(q('v1'),['places-tenths','<script>','places-tenths','cube-units']),['places-tenths']);
});
test('Fertige Quests wiederholen sich ohne automatische Wissenspflicht, Prüfungen erhalten keine Hilfen',()=>{
 for(const quest of QUESTS){const seen=shownLessonsForQuest(quest,null,true);assert.ok(quest.tasks.every(t=>!shouldIntroduce(t,seen)));}
 for(const opts of [{exam:true},{challenge:true},{encounter:true}])assert.equal(shouldIntroduce(q('v1').tasks[0],new Set(),opts),false);
});
test('Fachaufgaben, Wissenskarten, Antwortprüfer und Weganforderungen bleiben bytegleich zur Version 4.0',()=>{
 const files=JSON.parse(fs.readFileSync(new URL('./content-lock.json',import.meta.url),'utf8'));
 for(const [file,hash]of Object.entries(files))assert.equal(createHash('sha256').update(fs.readFileSync(new URL('../'+file,import.meta.url))).digest('hex'),hash,file);
});
test('Alle 45 Questobjekte haben drei strukturell verschiedene, vollständig endliche Modelle',()=>{
 for(const quest of QUESTS){assert.ok(MODEL_STAGES[quest.kind],quest.id);const shapes=[0,1,2].map(stage=>questGeometry(quest.kind,stage,quest.region));
  for(const g of shapes){assert.ok(g.data.length>0);assert.ok(g.data.every(Number.isFinite),quest.id);}
  assert.equal(new Set(shapes.map(g=>digest(positions(g)))).size,3,quest.id+' – nicht nur Farbe oder Licht');
 }
});
test('Ein reines Öffnen oder eine falsche Antwort repariert kein Objekt; erst gelöste Aufgaben ergeben den Teilaufbau',()=>{
 const s=defaultState(),quest=q('v2');assert.equal(questAppearance(quest,s).status,'NOT_STARTED');
 s.progress.v2={...record(),mistakes:2,hints:1,shownLessons:['places-hundred']};assert.equal(questAppearance(quest,s).status,'IN_PROGRESS');assert.equal(questAppearance(quest,s).stage,0);
 s.progress.v2.step=1;assert.equal(questAppearance(quest,s).stage,1);
});
test('Alle Antworten richtig heißt noch nicht abgeschlossen: ready behält den Teilaufbau bis zur Bestätigung',()=>{
 for(const quest of QUESTS){const s=defaultState();s.progress[quest.id]={...record(quest.tasks.length-1),ready:true};let a=questAppearance(quest,s);assert.equal(a.stage,1);assert.equal(a.status,'IN_PROGRESS');assert.equal(a.solved,quest.tasks.length);
  s.completed[quest.id]={mistakes:0,hints:0,at:s.createdAt};a=questAppearance(quest,s);assert.equal(a.stage,2);assert.equal(a.status,'COMPLETED');
 }
});
test('Haus und Brunnen sind am Anfang tatsächlich niedrig und unvollständig, nicht nur anders eingefärbt',()=>{
 for(const kind of ['house','fountain']){const bounds=[0,1,2].map(s=>Math.max(...questGeometry(kind,s,'village').data.filter((_,i)=>i%10===1)));
  assert.ok(bounds[0]<bounds[2]*.4,kind);assert.ok(bounds[1]>bounds[0]*1.5,kind);assert.ok(bounds[1]<bounds[2],kind);
 }
});
test('JSON-Rundsicherung erhält gleichzeitig Teilaufbau, ready, Gebietssiegel und bereits gezeigte Gedanken',()=>{
 const s=defaultState();s.progress.v2={...record(8),ready:true,shownLessons:['places-hundred','zero-hundred','equal-zeros']};s.progress.v1=record(2);s.completed.v0a={mistakes:0,hints:0,at:s.createdAt};
 const clean=parseSave(JSON.stringify(s));for(const quest of QUESTS)assert.deepEqual(questAppearance(quest,clean),questAppearance(quest,s));assert.deepEqual(clean.progress,s.progress);assert.deepEqual(clean.mastery,s.mastery);
});
test('Alle abgeschlossenen Modelle bleiben geometrisch identisch zu Version 4.0',()=>{
 const expected=JSON.parse(fs.readFileSync(new URL('./completed-model-lock.json',import.meta.url),'utf8'));
 for(const quest of QUESTS)assert.equal(digest(questGeometry(quest.kind,2,quest.region).data),expected[quest.id],quest.id);
});

test('Ein bloßes Wiederverbinden zweier schon eingeführter Gedanken erscheint nicht als neues Wissen',()=>{
 const t={lesson:'rectangle-decimal'};
 assert.equal(shouldIntroduce(t,new Set(['rectangle','multiply-decimal'])),false);
 assert.equal(shouldIntroduce(t,new Set(['rectangle'])),true);
 assert.equal(shouldIntroduce(t,new Set(['multiply-decimal'])),true);
 assert.equal(shouldIntroduce({lesson:'multiply-smaller'},new Set(['multiply-half','rectangle','multiply-decimal'])),true);
});

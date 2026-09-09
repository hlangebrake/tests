import test from 'node:test';
import assert from 'node:assert/strict';
import {QUESTS,REGIONS,INFO,questById,questUnlocked,makeEncounter,BADGES} from '../js/content.js';
import {LESSONS,lessonById} from '../js/lessons.js';
import {equalDecimal} from '../js/math.js';
test('Jede Teilaufgabe hat einen kleinen Wissensschritt und ein vollständiges Lösungsbeispiel',()=>{
 assert.equal(Object.keys(LESSONS).length,83);assert.equal(new Set(Object.values(LESSONS).map(l=>l.id)).size,83);
 for(const q of QUESTS)for(const t of q.tasks){const l=lessonById(t.lesson);assert.ok(l,`${q.id}: ${t.lesson}`);assert.ok(t.skill);assert.ok(l.text&&l.title);assert.ok(l.visual?.kind);assert.ok(l.example.prompt);assert.equal(l.example.steps.length,3);assert.ok(l.example.steps.every(s=>typeof s==='string'&&s.length>10));assert.ok(INFO[l.region].some(p=>p.id===l.id));}
 const used=new Set(QUESTS.flatMap(q=>q.tasks.map(t=>t.lesson)));assert.equal(used.size,83);
});
test('Der Dorfeinstieg baut ganze Zahlen, Hälfte, Zehntel, Hundertstel und Brüche getrennt auf',()=>{
 const ids=QUESTS.filter(q=>q.region==='village').map(q=>q.id);assert.deepEqual(ids,['v0a','v0b','v1','v0c','v2','v0d','v3','v4']);
 assert.deepEqual(QUESTS.filter(q=>questUnlocked(q,{})).map(q=>q.id),['v0a']);
 const done={};for(const id of ['v0a','v0b','v1','v0c','v2']){assert.ok(questUnlocked(questById(id),done));done[id]=true;}
 assert.ok(questUnlocked(questById('v0d'),done));assert.ok(questUnlocked(questById('v3'),done));
 assert.ok(!questUnlocked(questById('v4'),done));done.v0d=true;done.v3=true;assert.ok(questUnlocked(questById('v4'),done));
 const first=questById('v0a');assert.match(first.tasks[0].text,/2/);assert.match(first.tasks[0].text,/3/);
 assert.ok(first.tasks.every(t=>!/(Hundertstel|Tausendstel|Zähler|Nenner)/.test(t.text)));
});
test('Voraussetzungen sind konkrete Aufgaben; es gibt keine unbekannten oder zyklischen Kanten',()=>{
 const visited=new Set(),stack=new Set();
 function visit(q){if(visited.has(q.id))return;assert.ok(!stack.has(q.id),'Zyklus bei '+q.id);stack.add(q.id);
  const region=REGIONS.find(r=>r.id===q.region);for(const id of [...q.requires,...region.unlock]){assert.ok(questById(id),id);visit(questById(id));}stack.delete(q.id);visited.add(q.id);}
 QUESTS.forEach(visit);assert.equal(visited.size,37);
});
test('Kernroute erreicht das Finale ohne die beiden gekennzeichneten Zusatzwege',()=>{
 const extra=QUESTS.filter(q=>q.extension).map(q=>q.id);assert.deepEqual(extra,['h4','h5']);
 const done={};let changed=true;while(changed){changed=false;for(const q of QUESTS)if(!q.extension&&!done[q.id]&&questUnlocked(q,done)){done[q.id]=true;changed=true;}}
 assert.ok(done.k4);assert.equal(Object.keys(done).length,35);assert.ok(Object.values(BADGES).every(id=>done[id]));
});
test('Erinnerungsrätsel verwenden ausschließlich wirklich bearbeitete Aufgaben',()=>{
 const known=['v0a','v2','m1'];const completed=Object.fromEntries(known.map(id=>[id,true]));const pool=new Set(known.flatMap(id=>questById(id).tasks.map(t=>t.text)));
 for(let i=0;i<100;i++)assert.ok(pool.has(makeEncounter(completed,i).tasks[0].text));
});
test('Ausgewählte neue Ergebnisse werden unabhängig vom Antwortprüfer nachgerechnet',()=>{
 const val=(id,i)=>questById(id).tasks[i].answer;
 assert.ok(equalDecimal(questById('v0a').tasks[1].options[val('v0a',1)].split(' ')[0],(2+1/2).toString()));
 assert.ok(equalDecimal(val('v0b',2),(3/10).toString()));
 assert.ok(equalDecimal(val('v0c',1),(35/100).toString()));
 assert.ok(equalDecimal(val('v0c',2),(6/100).toString()));
 assert.ok(equalDecimal(val('v0d',1),(4/1000).toString()));
});

test('Traglasten im Hafen setzen das Vergleichen im Wald voraus',()=>{
 const done={v0a:true,v0b:true,v1:true,v0c:true,v2:true,v0d:true,h1:true};
 assert.equal(questUnlocked(questById('h2'),done),false);done.f1=true;assert.equal(questUnlocked(questById('h2'),done),true);
});

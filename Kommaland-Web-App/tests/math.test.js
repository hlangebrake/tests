import test from 'node:test';
import assert from 'node:assert/strict';
import {decimal,equalDecimal,checkAnswer} from '../js/math.js';
import {QUESTS,REGIONS,INFO,questUnlocked,regionUnlocked,makeEncounter} from '../js/content.js';

test('Dezimalkomma, Punkt, Stellenhalter und gleichwertige Eingaben',()=>{
 for(const [a,b]of [['0,5','0.50'],['0,06','0.0600'],[' 2,700 ','2.7'],['.5','0.5'],['000,50','0.5'],['-0','0']])assert.ok(equalDecimal(a,b),`${a} = ${b}`);
 for(const [a,b]of [['0,06','0.6'],['2.5001','2.5'],['1,25','125'],['-1','1']])assert.equal(equalDecimal(a,b),false);
});
test('Keine Ausdrücke, Tausendertrennzeichen oder Fließkomma-Toleranz',()=>{
 for(const value of ['1+2','1,000.5','NaN','Infinity','','0x10','1e3','<script>','.',{},null])assert.equal(decimal(value),null);
 assert.equal(equalDecimal('0.30000000000000004','0.3'),false);
 assert.equal(equalDecimal('9007199254740993.1','9007199254740993.10'),true);
});
test('Alle sechs Antwortformate prüfen korrekt und lehnen falsche Antworten ab',()=>{
 const cases=[
 [{type:'number',answer:'2.5'},'2,50','2,05'],
 [{type:'line',answer:'1.25'},'1,25','1,3'],
 [{type:'choice',answer:1},1,'1'],
 [{type:'multi',answer:[1,2]},[2,1],[1,1]],
 [{type:'order',answer:[2,0,1]},[2,0,1],[0,1,2]],
 [{type:'classify',answer:[0,1,2]},[0,1,2],[0,1]]
 ];
 for(const[t,right,wrong]of cases){assert.ok(checkAnswer(t,right));assert.equal(checkAnswer(t,wrong),false);assert.equal(checkAnswer(t,null),false);}
});
test('37 eindeutige Quests, 122 vollständige Aufgaben und 83 Wissensschritte',()=>{
 assert.equal(QUESTS.length,37);assert.equal(new Set(QUESTS.map(q=>q.id)).size,37);
 assert.equal(QUESTS.reduce((n,q)=>n+q.tasks.length,0),122);
 assert.equal(REGIONS.reduce((n,r)=>n+INFO[r.id].length,0),83);
 const types=new Set();
 for(const q of QUESTS){assert.ok(REGIONS.some(r=>r.id===q.region));assert.ok(q.story&&q.reward&&q.npc);assert.ok(q.tasks.length>=3&&q.tasks.length<=5);
  for(const t of q.tasks){types.add(t.type);assert.ok(t.text&&t.hint&&t.why);assert.ok(checkAnswer(t,t.answer),q.id+': '+t.text);
   if(t.type==='number'||t.type==='line')assert.ok(decimal(t.answer));
   if(t.type==='choice')assert.ok(t.answer>=0&&t.answer<t.options.length);
   if(t.type==='multi')assert.ok(t.answer.every(i=>i>=0&&i<t.options.length));
   if(t.type==='order')assert.deepEqual([...t.answer].sort((a,b)=>a-b),t.items.map((_,i)=>i));
   if(t.type==='classify')assert.ok(t.answer.length===t.items.length&&t.answer.every(i=>i>=0&&i<t.categories.length));
   if(t.type==='line'){assert.ok(Number(t.answer)>=t.start&&Number(t.answer)<=t.end);assert.ok(Math.abs((Number(t.answer)-t.start)/t.step-Math.round((Number(t.answer)-t.start)/t.step))<1e-8);}
  }
 }
 assert.equal(types.size,6);
});
test('Der Lernweg ist ohne Zirkelschluss bis zum Finale lösbar',()=>{
 const done={};let changed=true;
 assert.equal(regionUnlocked('forest',done),false);assert.equal(regionUnlocked('village',done),true);
 while(changed){changed=false;for(const q of QUESTS)if(!done[q.id]&&questUnlocked(q,done)){done[q.id]=true;changed=true;}}
 assert.equal(Object.keys(done).length,QUESTS.length);assert.equal(regionUnlocked('castle',done),true);
});
test('Waldbegegnungen beziehen sich nur auf tatsächlich abgeschlossene Aufgaben',()=>{
 for(let i=0;i<30;i++){const q=makeEncounter({v1:true,a1:true},i);assert.ok(['village','market'].includes(q.region));assert.ok(checkAnswer(q.tasks[0],q.tasks[0].answer));}
});

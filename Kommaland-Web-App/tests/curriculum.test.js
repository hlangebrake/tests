/** Curriculum-6 invariants. Earlier volume/ID requirements are archived, not retained
 * as false constraints. Arithmetic examples below are independently recalculated. */
import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
import {QUESTS,REGIONS,PATHS,INFO,questById,questUnlocked,makeEncounter} from '../js/content.js';
import {CORE_LESSONS,LEGACY_QUEST_MAP} from '../js/curriculum-data.js';import {LESSONS} from '../js/lessons.js';import {LABS,initialLab} from '../js/visual-models.js';
import {defaultState,parseSave,validateState,SaveStore} from '../js/state.js';
import {checkAnswer,equalDecimal} from '../js/math.js';import {CHECKS,makeCheck} from '../js/foundation-checks.js';
import {basicQuests,allBasicDone,sourceLessons,PREREQUISITES,gateStatus,requiredForRoute,ensureExam,examQueue,examQuest,finishExamRound} from '../js/adventure.js';
import {introductionKey,shownLessonsForQuest,shouldIntroduce,cleanShownLessons} from '../js/learning-flow.js';
import {questGeometry} from '../js/world.js';import {questAppearance,MODEL_STAGES} from '../js/quest-models.js';import {numberLine} from '../js/ui.js';
import {CATALOG} from '../teacher-dashboard/shared/catalog.js';
import {project} from '../teacher-dashboard/shared/projection.js';import {metrics} from '../teacher-dashboard/js/analytics.js';
import {errorEvidence,helpEvidence,SRL_RULES,fadeDecision} from '../teacher-dashboard/shared/regulation.js';
const baseline=JSON.parse(fs.readFileSync(new URL('./archive-v5.1/baseline.json',import.meta.url),'utf8'));
const done=()=>({mistakes:0,hints:0,at:'2026-09-01T10:00:00.000Z'}), record=(step=0)=>({step,mistakes:0,hints:0});
const canonical=t=>t.type==='mark'?Array.from({length:t.answer},(_,i)=>i):t.answer;
const pass=(s,a,b)=>{const e=ensureExam(s,a,b);e.index=examQueue(e).length;e.results=examQueue(e).map(()=>true);return finishExamRound(s,a,b);};
const oldState=()=>{const s=defaultState();delete s.contentVersion;s.activeQuest='v0a';return s;};
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');

test('Deutliche Reduktion ist Ergebnis eines Kompetenzplans, nicht Dreier-Expansion',()=>{
 assert.equal(QUESTS.filter(q=>!q.challenge).length,16);assert.equal(QUESTS.filter(q=>!q.challenge).reduce((n,q)=>n+q.tasks.length,0),77);
 assert.equal(QUESTS.filter(q=>q.challenge).reduce((n,q)=>n+q.tasks.length,0),24);
 assert.ok(QUESTS.flatMap(q=>q.tasks).length<baseline.QUESTS.flatMap(q=>q.tasks).length/3);
 for(const q of QUESTS){assert.ok(q.goal&&q.why);assert.ok(new Set(q.tasks.map(t=>t.type)).size>=2,q.id);for(const t of q.tasks)assert.ok(t.purpose&&t.level&&t.key&&LESSONS[t.lesson]);}
});
test('Jede aktuelle Quest und Aufgabe hat eine neue unverwechselbare ID',()=>{
 const oldIds=new Set(baseline.QUESTS.map(q=>q.id));for(const q of QUESTS)assert.ok(!oldIds.has(q.id)&&q.id.startsWith('c6-'));
 assert.equal(new Set(QUESTS.flatMap(q=>q.tasks.map(t=>t.key))).size,101);assert.equal(CATALOG.quests.filter(q=>q.active).length,24);assert.equal(CATALOG.tasks.filter(t=>t.active).length,101);
});
test('Alle 45 früheren Quests sind im expliziten Übernahmeplan erfasst',()=>{
 for(const q of baseline.QUESTS)assert.ok(questById(LEGACY_QUEST_MAP[q.id]),q.id);
 for(const q of QUESTS)assert.ok(q.legacySources.length>=1);
});
test('Kein versteckter Zyklus: der gesamte Kernweg und alle optionalen Challenges sind erreichbar',()=>{
 const seen=new Set(),stack=new Set();function visit(q){assert.ok(!stack.has(q.id));if(seen.has(q.id))return;stack.add(q.id);for(const id of q.requires){assert.ok(questById(id));visit(questById(id));}stack.delete(q.id);seen.add(q.id);}QUESTS.forEach(visit);
 const completed={};let changed=true;while(changed){changed=false;for(const q of QUESTS)if(!q.challenge&&!completed[q.id]&&questUnlocked(q,completed)){completed[q.id]=done();changed=true;}}
 assert.equal(Object.keys(completed).length,16);assert.ok(completed['c6-k4']);for(const q of QUESTS.filter(q=>q.challenge))assert.ok(questUnlocked(q,completed));
});
test('24 Kernkarten, 83 abrufbare Grundgedanken: kein obligatorischer Mikroquest-Parcours',()=>{
 assert.equal(Object.keys(CORE_LESSONS).length,24);assert.equal(Object.keys(LESSONS).length,107);
 for(const [id,l]of Object.entries(CORE_LESSONS)){assert.ok(l.text&&l.example.prompt);assert.equal(l.example.steps.length,3);assert.ok(LABS[id]);assert.doesNotThrow(()=>initialLab(LABS[id]));for(const support of l.support||[])assert.ok(LESSONS[support],support);}
 assert.equal(QUESTS.filter(q=>q.region==='village'&&!q.challenge).length,2);
});
test('Jeder wirklich neue Gedanke erscheint innerhalb seiner Quest höchstens einmal',()=>{
 for(const q of QUESTS){const seen=new Set(),shown=[];for(const t of q.tasks)if(shouldIntroduce(t,seen,{challenge:q.challenge})){shown.push(introductionKey(t.lesson));seen.add(t.lesson);}assert.equal(new Set(shown).size,shown.length);}
 const q=questById('c6-v1'),seen=new Set();assert.ok(shouldIntroduce(q.tasks[0],seen));seen.add(q.tasks[0].lesson);assert.ok(!shouldIntroduce(q.tasks[1],seen));
 for(const id of ['c6-s4','c6-k4'])assert.ok(questById(id).tasks.every(t=>!shouldIntroduce(t,new Set())));
});
test('Nachlesen bleibt gespeichert, ohne eine Lösung oder einen Fortschritt zu erfinden',()=>{
 const s=defaultState(),q=questById('c6-v1');s.progress[q.id]={...record(),shownLessons:['c6-place']};const clean=parseSave(JSON.stringify(s));assert.equal(clean.progress[q.id].step,0);assert.deepEqual(clean.completed,{});assert.ok(!shouldIntroduce(q.tasks[0],shownLessonsForQuest(q,clean.progress[q.id])));
 assert.deepEqual(cleanShownLessons(q,['c6-place','<script>','c6-place']),['c6-place']);
 for(const q of QUESTS){const seen=shownLessonsForQuest(q,null,true);assert.ok(q.tasks.every(t=>!shouldIntroduce(t,seen)));}
});
test('Schriftliche Rechentafeln prüfen Zwischenwerte UND Endergebnis',()=>{
 const worksheets=QUESTS.flatMap(q=>q.tasks).filter(t=>t.type==='work');assert.ok(worksheets.length>=10);
 for(const t of worksheets){assert.equal(t.fields.length,t.answer.length);assert.ok(checkAnswer(t,t.answer));for(let i=0;i<t.answer.length;i++){const a=[...t.answer];a[i]='999999';assert.equal(checkAnswer(t,a),false,t.key+' field '+i);}assert.equal(checkAnswer(t,t.answer.slice(1)),false);const fields=t.rows.flat().filter(x=>x&&typeof x==='object').map(x=>x.field);assert.deepEqual([...new Set(fields)].sort((a,b)=>a-b),t.answer.map((_,i)=>i));}
});
test('Offene Dezimalzahl-Konstruktion akzeptiert mehrere passende Lösungen, aber keine Randwerte',()=>{
 const t=questById('c6-master-village').tasks[0];for(const x of ['0,7041','0,7045','0.704999','0.70401'])assert.ok(checkAnswer(t,x),x);for(const x of ['0.704','0.705','0.706','0.7040','0.70'])assert.ok(!checkAnswer(t,x),x);
});
test('Zahlengeraden verraten gesuchte Werte nicht durch Beschriftung',()=>{
 for(const q of QUESTS)for(const t of q.tasks.filter(t=>t.type==='line')){const h=numberLine(t.start,t.end,t.step,null,true);assert.equal((h.match(/<text /g)||[]).length,2);assert.ok(!h.includes(String(t.answer).replace('.',',')));}
});
test('Distraktoren sind verschieden und jede aktive Antwort ist innerhalb des Darstellungsraums',()=>{
 for(const q of QUESTS)for(const t of q.tasks){if(t.options)assert.equal(new Set(t.options).size,t.options.length,t.key);assert.ok(checkAnswer(t,canonical(t)),t.key);assert.ok(!checkAnswer(t,null),t.key);}
});
test('Alle acht Challenges bleiben optional und haben unterschiedliche kognitive Aufgaben',()=>{
 for(const r of REGIONS){const c=questById('c6-master-'+r.id),b=basicQuests(r.id),completed={};assert.deepEqual(c.requires,b.map(q=>q.id));assert.ok(!questUnlocked(c,completed));completed[b[0].id]=done();assert.ok(!allBasicDone(r.id,completed));completed[b[1].id]=done();assert.ok(questUnlocked(c,completed));assert.ok(c.tasks.some(t=>['argument','multi','work'].includes(t.type)));}
});
test('22 gerichtete Erstprüfungen umfassen 3–6 Kernaufgaben ohne Redundanzfüllung',()=>{
 for(const [a,b]of PATHS)for(const [from,to]of [[a,b],[b,a]]){const keys=requiredForRoute(defaultState(),from,to);assert.ok(keys.length>=3&&keys.length<=6,from+'>'+to);assert.equal(new Set(keys).size,keys.length);for(const key of [...sourceLessons(from),...PREREQUISITES[to]])assert.ok(keys.includes(key));}
});
test('21 Prüfungsmodelle bestehen über 50 Varianten strukturelle und Antwortprüfungen',()=>{
 assert.equal(Object.keys(CHECKS).length,21);for(const key of Object.keys(CHECKS))for(let seed=0;seed<50;seed++){const t=makeCheck(key,seed);assert.ok(checkAnswer(t,canonical(t)),key);assert.ok(questById(CHECKS[key].quest));if(t.options)assert.equal(new Set(t.options).size,t.options.length,key);}
});
test('Prüfungskarten sind keine wortgleichen Kopien regulärer Aufgaben',()=>{
 const texts=new Set(QUESTS.flatMap(q=>q.tasks.map(t=>t.text)));for(const k of Object.keys(CHECKS))for(let i=0;i<7;i++)assert.ok(!texts.has(makeCheck(k,i).text),k);
});
test('Vorzeitiger Test ist vollständig möglich, ohne Quests fälschlich abzuschließen',()=>{
 const s=defaultState();assert.equal(gateStatus(s,'village','forest').unfinished,2);assert.equal(examQuest(s,'village','forest').tasks.length,3);assert.ok(pass(s,'village','forest').complete);assert.ok(gateStatus(s,'village','forest').open);assert.equal(Object.keys(s.completed).length,0);
});
test('Gebietssiegel wirkt an allen Ausgängen; ungeprüftes Zielwissen bleibt offen',()=>{
 const s=defaultState();pass(s,'village','forest');for(const to of ['forest','market','harbor','mill'])assert.ok(gateStatus(s,'village',to).sourcePassed);assert.ok(gateStatus(s,'village','market').open);assert.deepEqual(requiredForRoute(s,'village','harbor'),['c6-compare']);assert.equal(examQuest(s,'village','harbor').tasks.length,1);pass(s,'village','harbor');assert.ok(!s.mastery.forest);
});
test('Fehlerrunde wiederholt nur die fehlenden Kompetenzen und variiert die Zahlen',()=>{
 const s=defaultState(),before=examQuest(s,'village','forest'),e=s.exams['village>forest'];e.index=3;e.results=[false,true,true];const r=finishExamRound(s,'village','forest');assert.deepEqual(r.failed,[e.keys[0]]);assert.equal(r.passed.length,2);assert.ok(!s.mastery.village);const retry=examQuest(s,'village','forest');assert.equal(retry.tasks.length,1);assert.notEqual(retry.tasks[0].text,before.tasks[0].text);assert.ok(pass(s,'village','forest').complete);
});
test('Pausierte kurze Prüfung bleibt nach JSON-Import identisch',()=>{
 const s=defaultState(),q=examQuest(s,'mill','castle'),e=s.exams['mill>castle'];e.index=2;e.results=[false,true];const r=parseSave(JSON.stringify(s));assert.deepEqual(examQuest(r,'mill','castle').tasks,q.tasks);assert.deepEqual(r.exams,s.exams);
});
test('Vollständige alte Gruppen werden angerechnet, ohne neue Aufgabenversuche zu erfinden',()=>{
 const s=oldState();for(const id of ['v0a','v0b','v1','v0c','v2','v0d'])s.completed[id]=done();const n=validateState(s);assert.equal(n.completed['c6-v1'].credit,'legacy');assert.equal(Object.keys(n.completed).length,1);assert.deepEqual(n.contentArchive.completed,s.completed);assert.deepEqual(n.stats,s.stats);assert.deepEqual(parseSave(JSON.stringify(n)),n);
});
test('Angefangene geänderte Quests starten neu; alte Teilergebnisse bleiben im Archiv',()=>{
 const s=oldState();s.progress.v1={step:4,mistakes:2,hints:1};s.completed.v0a=done();const n=validateState(s);assert.deepEqual(n.progress['c6-v1'],record());assert.deepEqual(n.contentArchive.progress.v1,s.progress.v1);assert.ok(!n.completed['c6-v1']);
});
test('Alte Versionen 1 und 2 und stabile Speicherorte bleiben lesbar',()=>{
 for(const v of [1,2]){const s=oldState();s.schemaVersion=v;s.progress.v1={step:1,mistakes:1,hints:0};s.completed.v0a=done();const n=validateState(s);assert.equal(n.schemaVersion,3);assert.equal(n.contentVersion,6);assert.deepEqual(n.contentArchive.completed,s.completed);}
});
test('Alte Gebietssiegel gelten weiter; pausierte Langtests werden archiviert statt umgedeutet',()=>{
 const s=oldState();s.mastery.village={at:s.createdAt};for(const l of baseline.INFO.village)s.competencies[l.id]=true;
 const keys=baseline.exams.find(x=>x.from==='forest'&&x.to==='harbor').keys;s.exams['forest>harbor']={keys,passed:[],round:0,index:1,results:[false]};
 const n=validateState(s);assert.ok(n.mastery.village);assert.ok(sourceLessons('village').every(k=>n.competencies[k]));assert.deepEqual(n.exams,{});assert.deepEqual(n.contentArchive.exams,s.exams);assert.equal(n.contentMigration.pausedTests,1);
});
test('Alle bisherigen Abschlüsse ergeben 24 angerechnete neue Quests, kein Datenverlust',()=>{
 const s=oldState();for(const q of baseline.QUESTS)s.completed[q.id]=done();const n=validateState(s);assert.equal(Object.keys(n.completed).length,24);assert.equal(Object.keys(n.contentArchive.completed).length,45);
});
test('Archiv übernimmt keine unbekannten IDs oder fremden Felder',()=>{
 const s=oldState();s.completed['<script>']=done();assert.throws(()=>validateState(s));const n=validateState(oldState());n.contentArchive.completed.x=done();assert.throws(()=>validateState(n));
});
test('Aktive und historische Aufgaben haben getrennte Kennzahlen',()=>{
 const cat=CATALOG,p=project({studentId:'test',catalog:cat,events:[],snapshots:[{exportTimestamp:'2026-09-10T10:00:00.000Z',currentState:defaultState(),catalog:cat}],asOf:'2026-09-10T12:00:00.000Z'});assert.equal(metrics(p).totalQuests,16);assert.equal(metrics(p).totalTasks,77);assert.equal(metrics(p,{kind:'challenge'}).totalTasks,24);
});
test('Alle verbleibenden Bauobjekte besitzen drei strukturell verschiedene Zustände',()=>{
 for(const q of QUESTS){assert.ok(MODEL_STAGES[q.kind]);const data=[0,1,2].map(x=>questGeometry(q.kind,x,q.region).data);data.forEach(a=>assert.ok(a.every(Number.isFinite)));assert.equal(new Set(data.map(x=>hash(x.filter((_,i)=>i%10<3)))).size,3);}
});
test('Bauabschluss erfordert weiterhin die ausdrückliche Bestätigung',()=>{
 for(const q of QUESTS){const s=defaultState();assert.equal(questAppearance(q,s).stage,0);s.progress[q.id]={...record(q.tasks.length-1),ready:true};assert.equal(questAppearance(q,s).stage,1);const n=parseSave(JSON.stringify(s));assert.equal(n.progress[q.id].ready,true);n.completed[q.id]=done();assert.equal(questAppearance(q,n).stage,2);}
});
test('Erinnerungsrätsel referenzieren nur tatsächlich erledigte neue Quests',()=>{
 const ids=['c6-v1','c6-m1'],pool=new Set(ids.flatMap(id=>questById(id).tasks.map(t=>t.text)));for(let n=0;n<70;n++)assert.ok(pool.has(makeEncounter(Object.fromEntries(ids.map(id=>[id,true])),n).tasks[0].text));
});
const ctx={kind:'regular',taskRunId:'t2',questId:'q',skillId:'skill'},now=Date.parse('2026-09-10T10:00:00.000Z');
const ev=(i,taskRunId='t2',correct=false,kind='regular')=>({timestamp:new Date(now-10000+i*100).toISOString(),type:'task_attempt',kind,taskRunId,questId:'q',skillId:'skill',data:{correct}});
test('Einzelner Fehler unterbricht nicht; drei Fehler am selben Problem sind ein Anlass',()=>{assert.equal(errorEvidence([ev(1)],ctx,now),null);assert.equal(errorEvidence([ev(1),ev(2),ev(3)],ctx,now).pattern,'same_task');});
test('Mehrere Fehler auf verschiedenen Aufgaben derselben Quest sind konfigurierbar erkennbar',()=>{
 const events=[ev(1,'t1'),ev(2,'t1'),ev(3,'t1',true),ev(4,'t2'),ev(5,'t2'),ev(6,'t3')];assert.equal(errorEvidence(events,{...ctx,taskRunId:'t3'},now).pattern,'quest_window');
});
test('Wiederkehrende Kompetenzschwierigkeit ist kein automatischer Fehlertyp-Befund',()=>{
 const events=[ev(1,'t1'),ev(2,'t1'),ev(3,'t1',true),ev(4,'t2'),ev(5,'t2')];assert.equal(errorEvidence(events,ctx,now).pattern,'skill_window');
});
test('Challenge-Misserfolg aktiviert keine übergreifende Grundkompetenz-Eskalation',()=>{
 const events=[ev(1,'t1',false,'challenge'),ev(2,'t1',false,'challenge'),ev(3,'t2',false,'challenge'),ev(4,'t2',false,'challenge')];assert.equal(errorEvidence(events,{...ctx,kind:'challenge'},now),null);
});
test('Wiederholt sichtbare oder automatisch geöffnete Hilfen sind keine bewussten neuen Anforderungen',()=>{
 const e=(type,data={})=>({taskRunId:'t2',type,data});const counts=helpEvidence([e('hint_opened'),e('hint_opened'),e('hint_opened',{resumed:true}),e('otherHelp_opened',{screen:'lesson'}),e('otherHelp_opened',{screen:'srl-scaffold'}),e('example_opened',{automatic:true})],ctx);assert.deepEqual(counts,{hint:2,example:0,knowledge:1});assert.equal(SRL_RULES.maxUnplanned,2);assert.equal(SRL_RULES.cooldownMs,300000);
});

test('Sternenfest buys one continuous ribbon; no impossible cutting of four short pieces',()=>{
 const q=QUESTS.find(q=>q.id==='c6-k4');assert.match(q.tasks[1].text,/am Stück/);assert.match(q.tasks[3].text,/verbleibende Stück/);
});
test('Forest estimating does not presuppose the later written addition quest',()=>{
 const t=QUESTS.find(q=>q.id==='c6-f3').tasks[2];assert.equal(t.type,'choice');assert.match(t.why,/beweist aber nicht/);
});

test('Independent Decimal/Fraction oracles validate all 53 numerical tasks, not merely their own authored answers',()=>{
 const cases=JSON.parse(fs.readFileSync(new URL('./exact-arithmetic-oracles.json',import.meta.url),'utf8'));
 const tasks=new Map(QUESTS.flatMap(q=>q.tasks.map(t=>[t.key,t])));assert.equal(cases.length,53);
 for(const {key,expected} of cases)assert.ok(checkAnswer(tasks.get(key),expected),key);
});

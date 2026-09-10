import test from 'node:test';
import assert from 'node:assert/strict';
import {REGIONS,QUESTS,questUnlocked} from '../js/content.js';
import {REGION_GOALS,OPEN_TASKS,placementTasks,learningEvidence} from '../js/didactics.js';

test('Jedes Gebiet hat transparentes Kompetenzziel, Standortcheck und offene Werkstatt',()=>{
 for(const r of REGIONS){
  assert.ok(REGION_GOALS[r.id]?.startsWith('Ich kann '),r.id);
  assert.ok(OPEN_TASKS[r.id]?.prompt&&OPEN_TASKS[r.id]?.product&&OPEN_TASKS[r.id]?.teacher,r.id);
  const tasks=placementTasks(r.id,QUESTS);assert.equal(tasks.length,5,r.id);
  assert.equal(new Set(tasks.map(t=>t.placementSkill)).size,5,r.id);
  assert.ok(tasks.every(t=>['number','choice'].includes(t.type)),r.id);
 }
});

test('Bestandener Standortcheck schafft nur Navigationsevidenz, keine künstlichen Questabschlüsse',()=>{
 const state={completed:{},placement:{village:{passed:true,score:4,total:5,at:new Date().toISOString()}}};
 const evidence=learningEvidence(state,QUESTS),regular=QUESTS.filter(q=>q.region==='village'&&!q.challenge),master=QUESTS.find(q=>q.id==='master-village');
 assert.deepEqual(state.completed,{});
 assert.ok(regular.every(q=>evidence[q.id]?.placement===true));
 assert.ok(questUnlocked(master,evidence));
});

test('Nicht bestandener Standortcheck verändert die Freischaltung nicht',()=>{
 const state={completed:{},placement:{village:{passed:false,score:3,total:5,at:new Date().toISOString()}}};
 const evidence=learningEvidence(state,QUESTS);
 assert.deepEqual(evidence,{});
 assert.equal(questUnlocked(QUESTS.find(q=>q.id==='master-village'),evidence),false);
});

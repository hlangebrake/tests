import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultState,validateState,parseSave,SaveStore} from '../js/state.js';
function memoryStorage(){const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear()};}
test('Spielstand-Rundreise erhält Fortschritt, Einstellungen und Position',()=>{
 const s=defaultState();s.completed['c6-v1']={mistakes:1,hints:1,at:new Date().toISOString()};s.progress['c6-v3']={step:2,mistakes:0,hints:1};s.player={x:3,z:20};s.settings.largeText=true;
 assert.deepEqual(parseSave(JSON.stringify(s)),s);
});
test('Ungültige Daten werden vor einer Übernahme abgelehnt',()=>{
 const s=defaultState();
 for(const data of [{...s,app:'fremd'},{...s,schemaVersion:99},{...s,player:{x:NaN,z:0}},{...s,completed:{xyz:{mistakes:0,hints:0}}},{...s,progress:{'c6-v1':{step:999,mistakes:0,hints:0}}},{...s,visited:['unknown']}])assert.throws(()=>validateState(data));
 assert.throws(()=>parseSave('not json'));assert.throws(()=>parseSave(' '.repeat(1000001)));
});
test('Import übernimmt weder HTML noch fremde Felder',()=>{
 const s=defaultState(),result=validateState({...s,name:'<script>alert(1)</script>',html:'unsafe',settings:{...s.settings,external:'secret'}});
 assert.equal('html' in result,false);assert.equal('name' in result,false);assert.equal('external' in result.settings,false);
});
test('Speichern, Fortsetzen, Exportieren, Importieren und Rücksichern',()=>{
 globalThis.localStorage=memoryStorage();const store=new SaveStore();store.state.progress['c6-v1']={step:1,mistakes:2,hints:1};assert.ok(store.save());
 const again=new SaveStore();assert.equal(again.state.progress['c6-v1'].step,1);
 const exported=again.exportText();assert.equal(parseSave(exported).progress['c6-v1'].mistakes,2);
 again.replace(defaultState());assert.deepEqual(again.state.progress,{});again.restorePrevious();assert.equal(again.state.progress['c6-v1'].step,1);
});
test('Beschädigter Hauptstand lädt den letzten gültigen Snapshot',()=>{
 globalThis.localStorage=memoryStorage();const store=new SaveStore();store.save();store.state.progress['c6-v1']={step:2,mistakes:0,hints:0};store.save();store.save();
 localStorage.setItem(store.key,'broken');const recovered=new SaveStore();assert.ok(recovered.recovered);assert.equal(recovered.state.progress['c6-v1'].step,2);
});
test('Nicht verfügbarer Gerätespeicher blockiert das Spiel nicht',()=>{
 globalThis.localStorage={getItem(){throw new Error('blocked');},setItem(){throw new Error('blocked');}};
 const store=new SaveStore();assert.equal(store.available,false);assert.equal(store.save(),false);assert.equal(parseSave(store.exportText()).app,'kommaland');
});

test('Fertige Antworten bleiben bis zum ausdrücklichen Bauabschluss als ready erhalten',()=>{
 const s=defaultState();s.progress['c6-v1']={step:5,mistakes:0,hints:0,ready:true};
 const clean=parseSave(JSON.stringify(s));assert.equal(clean.progress['c6-v1'].ready,true);assert.equal(clean.completed['c6-v1'],undefined);
 assert.throws(()=>validateState({...s,progress:{'c6-v1':{step:0,mistakes:0,hints:0,ready:true}}}));
});

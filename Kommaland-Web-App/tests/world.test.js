import test from 'node:test';
import assert from 'node:assert/strict';
import {World,terrainHeight} from '../js/world.js';
import {defaultState} from '../js/state.js';
import {REGIONS,QUESTS} from '../js/content.js';
import {sourceLessons} from '../js/adventure.js';
import {OUTLINE,CLEARINGS,ROUTES,onMainland,walkableLand} from '../js/terrain.js';
// Geometry and navigation can be tested without a GPU or browser.
class FakeRenderer {
 constructor(){this.meshes=[];this.right=[.777,0,-.63];this.forward=[-.48,-.65,-.59];}
 mesh(g,options={}){const m={count:g.data.length/10,x:0,y:0,z:0,scale:1,visible:true,...options};this.meshes.push(m);return m;}
 setCamera(){}
}
const w=new World(new FakeRenderer(),()=>{});const full=defaultState();for(const r of REGIONS){full.mastery[r.id]={at:full.createdAt};for(const id of sourceLessons(r.id))full.competencies[id]=true;}for(const q of QUESTS)if(!q.challenge)full.completed[q.id]={mistakes:0,hints:0,at:full.createdAt};w.sync(full);
test('83 interaktive Objekte und endliche 3D-Geometrie',()=>{
 assert.equal(w.objects.length,83);assert.equal(w.objects.filter(o=>o.type==='quest').length,45);
 assert.ok(w.renderer.meshes.every(m=>Number.isFinite(m.count)&&m.count>=0));
});
test('Jeder Lernort liegt auf seinem begehbaren Gelände',()=>{
 for(const r of REGIONS){assert.ok(onMainland(r.x,r.z));assert.ok(walkableLand(r.x,r.z));assert.ok(Number.isFinite(terrainHeight(r.x,r.z)));}
 assert.equal(w.canWalk(-80,80),false);assert.ok(w.canWalk(0,30));
});
test('Alle 83 interaktiven Ziele haben einen Weg vom Dorf aus',()=>{
 const failed=[];
 for(const o of w.objects){w.teleport(0,30);if(!w.goToObject(o))failed.push(o.id);}
 assert.deepEqual(failed,[]);
});
test('Pfade enden in Interaktionsreichweite, nicht mitten im Objekt',()=>{
 for(const o of w.objects){w.teleport(0,30);w.goToObject(o);const p=w.path.at(-1);assert.ok(p&&Math.hypot(p.x-o.x,p.z-o.z)<5.2,o.id);assert.ok(w.canWalk(p.x,p.z),o.id);}
});
test('Die Laufphysik erreicht alle Objekte ohne Hängenbleiben',()=>{
 const failed=[];let reached=null;w.onInteract=o=>reached=o.id;let time=0;
 for(const o of w.objects){w.teleport(0,30);reached=null;w.goToObject(o);let ticks=0;
  while(w.path.length&&ticks++<7000){time+=1/30;w.update(1/30,time,false);}
  if(reached!==o.id)failed.push({id:o.id,position:{...w.player},distance:Math.hypot(o.x-w.player.x,o.z-w.player.z)});
 }
 assert.deepEqual(failed,[]);
});

test('Zusammenhängendes Festland statt Inseln: alle Pfade verlaufen über Land',()=>{
 assert.ok(OUTLINE.length>15);assert.equal(CLEARINGS.length,8);
 for(const route of ROUTES)for(const [x,z] of route.points)assert.ok(onMainland(x,z),route.a+'–'+route.b);
 for(let x=-60;x<70;x+=3)for(let z=-80;z<60;z+=3)assert.ok(Math.abs(terrainHeight(x+.01,z)-terrainHeight(x,z))<.01,'stetiger Hang');
 assert.equal(walkableLand(-62,0),false,'Wald außerhalb der Wege ist gesperrt');
});
test('Bauabschluss enthüllt das echte neue Objekt und beendet den Aufbau genau einmal',()=>{
 const s=defaultState();w.sync(s);const o=w.objects.find(o=>o.id==='v2');let count=0;
 assert.equal(o.after.visible,false);w.time=10;w.beginBuild('v2',()=>count++);
 assert.equal(o.after.reveal,0);assert.equal(o.before.visible,true);
 w.updateBuild(11);assert.ok(o.after.reveal>0&&o.after.reveal<o.height);assert.equal(o.before.visible,false);assert.equal(count,0);
 w.updateBuild(13);assert.equal(o.after.reveal,1000);assert.equal(o.after.visible,true);assert.equal(w.building,null);assert.equal(count,1);
 w.updateBuild(14);assert.equal(count,1);
});
test('Reduzierte Bewegung verkürzt den Aufbau ohne Verlust der Fertigstellung',()=>{
 const s=defaultState();s.settings.reducedMotion=true;w.sync(s);w.time=20;let done=false;
 w.beginBuild('v0a',()=>done=true);assert.equal(w.building.duration,.25);w.updateBuild(20.3);assert.ok(done);
});

test('Alle 22 gerichteten Wege stoppen die Figur an der richtigen geschlossenen Blockade',()=>{
 w.sync(defaultState());let stopped=null,time=0;w.onInteract=o=>{stopped=o.id;w.stop();};
 for(const g of w.gates){const r=REGIONS.find(r=>r.id===g.from);w.teleport(r.x,r.z);stopped=null;w.goToObject(w.objects.find(o=>o.id==='info-'+g.to));let ticks=0;while(w.path.length&&ticks++<7000)w.update(1/30,time+=1/30,false);assert.equal(stopped,g.id);}
});
test('Die blockierten Wegquerschnitte können nicht seitlich über begehbares Gras umgangen werden',()=>{
 for(const g of w.gates)for(let l=-9;l<=9;l+=.5){if(Math.abs(l)<3.85)continue;const x=g.x+g.normal.z*l,z=g.z-g.normal.x*l;assert.ok(!(w.canWalk(x,z)&&w.canWalk(x-g.normal.x,z-g.normal.z)&&w.canWalk(x+g.normal.x,z+g.normal.z)),g.id+': '+l);}
});
test('Ein Gebietssiegel öffnet alle Source-Gitter; zusätzliche Vorwissenszeichen bleiben separat',()=>{
 const s=defaultState();s.mastery.village={at:s.createdAt};for(const k of sourceLessons('village'))s.competencies[k]=true;w.sync(s);
 for(const g of w.gates.filter(g=>g.from==='village')){w.teleport(g.x-g.normal.x*2,g.z-g.normal.z*2);w.refreshGates();assert.ok(!g.frame.visible&&!g.left.visible&&!g.right.visible,g.id);if(g.to==='harbor'||g.to==='mill')assert.ok(g.ward.visible);else assert.ok(!g.ward.visible);}
});
test('Gate animation hinges and fades before terminating exactly once',()=>{
 const s=defaultState(),g=w.gates.find(g=>g.from==='village'&&g.to==='forest');w.sync(s);w.teleport(g.x-g.normal.x*2,g.z-g.normal.z*2);w.time=100;let calls=0;
 s.mastery.village={at:s.createdAt};for(const k of sourceLessons('village'))s.competencies[k]=true;w.sync(s);w.beginGateOpening('village','forest',true,()=>calls++);
 w.updateGateOpening(101.5);assert.ok(g.left.visible);assert.ok(g.left.opacity<1&&g.left.opacity>0);assert.ok(Math.abs(g.left.ry-g.angle)>.5);
 w.updateGateOpening(103);assert.equal(calls,1);assert.equal(w.gateOpening,null);assert.ok(!g.left.visible);w.updateGateOpening(104);assert.equal(calls,1);
});
test('Meisterkristalle sind vorher unsichtbar und nicht kollidierend; Erfolg verwandelt das Gebiet dauerhaft',()=>{
 const s=defaultState(),m=w.objects.find(o=>o.id==='master-village');w.sync(s);assert.ok(m.hidden);assert.ok(!m.before.visible&&!m.after.visible);assert.equal(m.obstacle.active,false);
 for(const q of QUESTS.filter(q=>q.region==='village'&&!q.challenge))s.completed[q.id]={mistakes:0,hints:0,at:s.createdAt};w.sync(s);assert.ok(!m.hidden&&m.before.visible&&m.obstacle.active);
 s.completed['master-village']={mistakes:0,hints:0,at:s.createdAt};w.sync(s);w.time=200;w.beginBuild(m.id);const a=w.adornments.find(a=>a.region==='village');assert.equal(a.mesh.opacity,0);w.updateBuild(202);assert.ok(a.mesh.opacity>0&&a.mesh.opacity<1);w.updateBuild(205);assert.equal(a.mesh.opacity,1);assert.ok(a.rainbow.visible);w.sync(s);assert.ok(a.rainbow.visible&&a.mesh.visible&&m.after.visible);
});

test('Alle Questmodelle zeigen je Zustand genau eine Silhouette; sync erzeugt keine neuen Meshes',()=>{
 const s=defaultState(),count=w.renderer.meshes.length;
 for(const q of QUESTS.filter(q=>!q.challenge)){
  w.sync(s);const o=w.objects.find(o=>o.id===q.id);assert.deepEqual(o.models.map(m=>m.visible),[true,false,false]);
  s.progress[q.id]={step:1,mistakes:0,hints:0};w.sync(s);assert.deepEqual(o.models.map(m=>m.visible),[false,true,false]);
  s.progress[q.id]={step:q.tasks.length-1,ready:true,mistakes:0,hints:0};w.sync(s);assert.deepEqual(o.models.map(m=>m.visible),[false,true,false]);
  s.completed[q.id]={mistakes:0,hints:0,at:s.createdAt};delete s.progress[q.id];w.sync(s);assert.deepEqual(o.models.map(m=>m.visible),[false,false,true]);
 }
 assert.equal(w.renderer.meshes.length,count);
});
test('Die Abschlussanimation beginnt am sichtbaren Teilaufbau, nicht am zerstörten Anfangsmodell',()=>{
 const s=defaultState();s.progress.v2={step:8,ready:true,mistakes:0,hints:0};w.sync(s);const o=w.objects.find(o=>o.id==='v2');assert.ok(o.working.visible);
 s.completed.v2={mistakes:0,hints:0,at:s.createdAt};delete s.progress.v2;w.sync(s);w.time=500;let calls=0;w.beginBuild('v2',()=>calls++);
 assert.equal(w.building.source,o.working);assert.equal(o.before.visible,false);assert.equal(o.working.visible,true);
 w.updateBuild(501);assert.equal(o.working.visible,false);assert.ok(o.after.reveal>0);w.updateBuild(503);assert.equal(calls,1);assert.deepEqual(o.models.map(m=>m.visible),[false,false,true]);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {World,terrainHeight} from '../js/world.js';
import {defaultState} from '../js/state.js';
import {REGIONS} from '../js/content.js';
import {OUTLINE,CLEARINGS,ROUTES,onMainland,walkableLand} from '../js/terrain.js';
// Geometry and navigation can be tested without a GPU or browser.
class FakeRenderer {
 constructor(){this.meshes=[];this.right=[.777,0,-.63];this.forward=[-.48,-.65,-.59];}
 mesh(g,options={}){const m={count:g.data.length/10,x:0,y:0,z:0,scale:1,visible:true,...options};this.meshes.push(m);return m;}
 setCamera(){}
}
const w=new World(new FakeRenderer(),()=>{});w.sync(defaultState());
test('45 interaktive Objekte und endliche 3D-Geometrie',()=>{
 assert.equal(w.objects.length,45);assert.equal(w.objects.filter(o=>o.type==='quest').length,37);
 assert.ok(w.renderer.meshes.every(m=>Number.isFinite(m.count)&&m.count>=0));
});
test('Jeder Lernort liegt auf seinem begehbaren Gelände',()=>{
 for(const r of REGIONS){assert.ok(onMainland(r.x,r.z));assert.ok(walkableLand(r.x,r.z));assert.ok(Number.isFinite(terrainHeight(r.x,r.z)));}
 assert.equal(w.canWalk(-80,80),false);assert.ok(w.canWalk(0,30));
});
test('Alle 45 interaktiven Ziele haben einen Weg vom Dorf aus',()=>{
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

import test from 'node:test';
import assert from 'node:assert/strict';
import {World,terrainHeight} from '../js/world.js';
import {defaultState} from '../js/state.js';
import {REGIONS} from '../js/content.js';
// Geometry and navigation can be tested without a GPU or browser.
class FakeRenderer {
 constructor(){this.meshes=[];this.right=[.777,0,-.63];this.forward=[-.48,-.65,-.59];}
 mesh(g,options={}){const m={count:g.data.length/10,x:0,y:0,z:0,scale:1,visible:true,...options};this.meshes.push(m);return m;}
 setCamera(){}
}
const w=new World(new FakeRenderer(),()=>{});w.sync(defaultState());
test('41 interaktive Objekte und endliche 3D-Geometrie',()=>{
 assert.equal(w.objects.length,41);assert.equal(w.objects.filter(o=>o.type==='quest').length,33);
 assert.ok(w.renderer.meshes.every(m=>Number.isFinite(m.count)&&m.count>=0));
});
test('Jeder Lernort liegt auf seinem begehbaren Gelände',()=>{
 for(const r of REGIONS)assert.equal(terrainHeight(r.x,r.z),r.h);
 assert.equal(w.canWalk(-80,80),false);assert.ok(w.canWalk(0,30));
});
test('Alle 41 interaktiven Ziele haben einen Weg vom Dorf aus',()=>{
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

import {constructionGeometry, protectionRunes, questAppearance} from './quest-models.js';
import {specialModel, resident, barrierParts, rainbowGeometry, areaAdornment, biomeAccents, beeGeometry} from './scenery.js';
import {gateStatus, challengeVisible, BARRIER_KINDS, BARRIER_NAMES} from './adventure.js';
import {Geometry, rgb, V} from './engine.js';
import {REGIONS, PATHS, QUESTS, regionById, regionUnlocked, questUnlocked, questsIn} from './content.js';
const TAU=Math.PI*2;
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function rng(seed){return ()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
const R=rng(16062026);
const pick=a=>a[Math.floor(R()*a.length)];
const wood='#806344', darkwood='#5e4b39', cream='#f4dfb2', teal='#3b8d80', terracotta='#ca7453', gold='#edbb63', stone='#bdc3ae';
const pointOn=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,l2=dx*dx+dz*dz;const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/l2));return {t,x:a.x+t*dx,z:a.z+t*dz,d:Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz),length:Math.sqrt(l2)};};
export {terrainHeight} from './terrain.js';
import {OUTLINE, CLEARINGS, ROUTES, walkableLand as landAt, roadDistance as pathDistance, terrainHeight, onMainland, clearingDistance, nearestRegion, mountainZone} from './terrain.js';
const shadow=(g,x,y,z,rx,rz)=>g.disc(x,y+.05,z,rx,rz,[.15,.25,.22,.17],18);
function pine(g,x,y,z,s=1,color='#639572'){
 g.cylinder(x,y+.8*s,z,.24*s,.19*s,1.6*s,wood,6);
 g.cylinder(x,y+1.7*s,z,1.2*s,.06*s,2*s,color,7,.2);
 g.cylinder(x,y+2.5*s,z,.95*s,0,1.8*s,color,7,.2);
 g.cylinder(x,y+3.15*s,z,.6*s,0,1.4*s,color,7,.2);return g;
}
function leafy(g,x,y,z,s=1,color='#72a47a'){
 g.cylinder(x,y+1.05*s,z,.28*s,.19*s,2.1*s,wood,7);
 g.sphere(x,y+2.8*s,z,1.6*s,1.5*s,1.35*s,color,7,4);
 g.sphere(x-.85*s,y+2.4*s,z+.3*s,1.05*s,1*s,1.0*s,color,7,4);
 g.sphere(x+.8*s,y+2.65*s,z+.15*s,.95*s,1.1*s,.95*s,color,7,4);return g;
}
function crystal(g,x,y,z,s=1,c='#b6a0d1'){
 g.cylinder(x,y+.65*s,z,.34*s,.30*s,1.3*s,c,5,.3);g.cylinder(x,y+1.5*s,z,.30*s,0,.4*s,c,5,.3);return g;
}
function face(g,x,y,z,s=1){
 g.box(x-.23*s,y,z,.12*s,.19*s,.075*s,'#334845');g.box(x+.23*s,y,z,.12*s,.19*s,.075*s,'#334845');
 g.box(x-.4*s,y-.15*s,z,.15*s,.09*s,.08*s,'#dda591');g.box(x+.4*s,y-.15*s,z,.15*s,.09*s,.08*s,'#dda591');
 g.box(x,y-.20*s,z+.015*s,.13*s,.05*s,.08*s,'#755448');return g;
}
function house(g,done=true,roofcolor=terracotta){
 g.box(0,.15,0,4.5,.3,3.8,'#bdc0a2');g.box(0,1.6,0,3.9,2.8,3.4,cream);
 g.box(0,2.8,1.73,3.9,.18,.12,wood);for(const x of [-1.87,1.87])g.box(x,1.5,1.75,.16,2.8,.13,wood);
 g.box(0,.95,1.76,1.05,1.7,.1,darkwood);g.cylinder(.3,1,1.86,.07,.07,.13,gold,7);
 for(const x of [-1.22,1.22]){g.box(x,1.65,1.8,.73,.87,.09,wood);g.box(x,1.67,1.86,.55,.66,.08,done?'#f8c875':'#8c9f92');g.box(x,1.67,1.92,.06,.7,.05,wood);g.box(x,1.67,1.92,.55,.07,.05,wood);g.box(x,1.12,2,.9,.18,.3,wood);}
 if(done){g.roof(0,3.0,0,4.7,1.7,4.1,roofcolor);g.box(.95,4.1,-.7,.65,1.8,.7,'#d2b591');g.box(.95,5.02,-.7,.82,.2,.85,cream);g.box(0,.3,2.15,1.6,.25,.65,stone);}
 else {g.roof(-.85,3.0,0,2.5,1.0,3.4,'#a49172');g.box(1.1,3.25,0,.2,.2,4.2,wood);g.box(1.5,2.6,2.2,.17,5,.17,wood);g.box(2.2,2.6,2.2,.17,5,.17,wood);for(let i=0;i<8;i++)g.box(1.85,.5+i*.52,2.2,.8,.13,.17,wood);}
 return g;
}
function lamp(g,x=0,y=0,z=0,done=true){
 g.cylinder(x,y+1.5,z,.1,.1,3,wood,7);g.box(x,y+3.1,z,.68,.14,.68,darkwood);g.box(x,y+2.72,z,.48,.65,.48,done?'#ffce79':'#81978e');g.roof(x,y+3.2,z,.85,.38,.85,teal);return g;
}
function signModel(){
 const g=new Geometry();g.cylinder(0,1,0,.14,.12,2,wood,7);g.box(0,2,0,2.2,1.5,.23,wood);g.box(0,2,.145,1.96,1.23,.10,'#f6e7bd');g.roof(0,2.8,0,2.65,.6,.85,teal);
 // An embossed open book, readable without a texture.
 g.box(-.32,2,.23,.56,.66,.06,teal,-.08);g.box(.32,2,.23,.56,.66,.06,teal,.08);g.box(0,2,.3,.065,.68,.08,gold);return g;
}
function model(kind,done,region){
 const special=specialModel(kind,done,region);if(special)return special;
 const g=new Geometry();
 if(kind==='house')return house(g,done,region==='market'?'#7b9ea1':terracotta);
 if(kind==='fountain'){
  g.cylinder(0,.18,0,2.0,2.0,.3,stone,12);g.disc(0,.38,0,1.55,1.55,done?'#79c2c5':'#949d8f');
  for(let i=0;i<12;i++){const a=i*TAU/12;g.box(Math.cos(a)*1.62,.65,Math.sin(a)*1.62,.85,.55,.43,i%2?'#d0d1b8':'#bcc5b4',-a+Math.PI/2);}
  g.cylinder(0,1.2,0,.36,.28,1.7,stone,8);g.cylinder(0,1.7,0,.3,1.0,.45,'#d3d4be',10);g.cylinder(0,1.95,0,1,.9,.12,stone,10);
  if(done){g.disc(0,2.03,0,.86,.86,'#88d3d0');g.cylinder(0,2.52,0,.085,.075,1.0,'#b4e3d4',8);g.sphere(0,3.0,0,.18,.21,.18,'#b4e3d4');}return g;
 }
 if(kind==='crates'){
  for(let i=0;i<(done?6:3);i++){
   const x=(i%3-1)*1.12,y=.6+Math.floor(i/3)*1.13,z=(i%2)*.18;
   g.box(x,y,z,1.08,1.08,1.08,i%2?'#b99565':'#cca975');g.box(x,y+.38,z,1.15,.1,1.15,wood);g.box(x,y-.38,z,1.15,.1,1.15,wood);g.box(x,y,z+.56,.12,1.02,.04,wood);
  }if(done){lamp(g,2,0,0);g.sphere(0,2.5,0,.38,.25,.36,'#e5aa5c',7,4);}return g;
 }
 if(kind==='statue'||kind==='crystal'||kind==='beacon'){
  g.cylinder(0,.25,0,1.4,1.4,.5,stone,8,.2);g.cylinder(0,.7,0,1.1,1.05,.45,'#ded7b5',8,.2);g.cylinder(0,1.05,0,.8,.8,.3,stone,8,.2);
  if(done){if(kind==='statue'){g.cylinder(0,1.6,0,.43,.3,.9,'#d0b67e',7);g.sphere(0,2.42,0,.6,.66,.55,'#e6ce97',7,4);g.cylinder(0,3.1,0,.52,0,.78,teal,5);}
   else {crystal(g,0,1.3,0,1.7,kind==='beacon'?'#ffd384':'#d7bc72');crystal(g,.95,.7,.3,.75,'#bce2c4');crystal(g,-.9,.7,-.2,.6,'#d9c7a2');}
  }else{g.box(.4,1.4,0,1,.4,.8,'#a3ae9b',.3);g.box(-.7,.3,1,.45,.4,.4,stone);}
  return g;
 }
 if(kind==='gate'){
  for(const x of [-1.5,1.5]){g.box(x,1.8,0,.65,3.6,.8,region==='cave'?'#8e89a4':wood);g.cylinder(x,3.7,0,.57,.45,.3,done?gold:teal,6);}
  g.box(0,3.25,0,3.4,.6,.8,region==='cave'?'#a49ab6':wood);g.cylinder(0,3.75,0,.42,.0,.7,done?gold:'#768d80',5);
  if(!done)for(let i=-2;i<=2;i++)g.box(i*.52,1.45,.1,.16,2.7,.16,region==='cave'?'#ada5c0':'#9a8461');
  else{g.box(-1.1,1.25,-1,.2,2.5,2,wood,.45);g.box(1.1,1.25,-1,.2,2.5,2,wood,-.45);}return g;
 }
 if(kind==='stones'){
  const count=region==='village'?10:5,spacing=count===10?.48:.9,rad=count===10?.27:.55;
  for(let i=0;i<count;i++){const x=(i-(count-1)/2)*spacing,z=Math.sin(i)*.4;g.cylinder(x,.18,z,rad,rad*.91,.35,done?'#e6c877':'#a2b1a1',6,.3);if(done)g.cylinder(x,.42,z,.12,.07,.12,'#fff0bf',6);}
  return g;
 }
 if(kind==='lantern'){lamp(g,0,0,0,done);g.box(0,.12,0,1.5,.2,1.5,stone);return g;}
 if(kind==='tree'){
  leafy(g,0,0,0,1.7,done?'#9dac72':'#548678');
  g.box(0,.9,1.0,.9,.6,.2,wood);
  if(done)for(let i=0;i<8;i++){const a=i*TAU/8;g.sphere(Math.cos(a)*1.9,3.9+(i%2)*.6,Math.sin(a)*1.7,.22,.28,.22,gold,6,3);}return g;
 }
 if(kind==='boat'){
  g.box(0,.25,0,4.4,.35,3.8,wood);for(let i=-2;i<=2;i++)g.box(i*.9,.5,-1.5,.16,.7,.16,wood);
  g.cylinder(0,.82,0,1.4,1.85,.6,'#b78a5c',6,.52);g.box(0,1.1,0,2.6,.13,1.8,cream);g.cylinder(0,2.5,0,.10,.09,3.0,wood,7);
  if(done){g.tri([.13,4.1,0],[.13,1.55,0],[1.8,1.65,0],'#f8e3b2');g.tri([-.13,3.9,0],[-1.2,1.8,0],[-.13,1.75,0],teal);}return g;
 }
 if(kind==='tank'){
  for(const x of [-.9,.9])for(const z of [-.9,.9])g.box(x,.7,z,.2,1.4,.2,wood);
  g.cylinder(0,1.9,0,1.25,1.25,2.3,'#b89163',12);
  for(const y of [.95,2.6])g.cylinder(0,y,0,1.28,1.28,.17,teal,12);
  g.disc(0,3.08,0,1.18,1.18,done?'#8dd1d0':'#6c8379');g.box(.6,1.0,1.3,.2,.2,.6,stone);if(done)g.cylinder(.6,.7,1.58,.06,.08,.6,'#96d8cf',7);return g;
 }
 if(kind==='clock'){
  g.box(0,.3,0,2,.6,2,stone);g.box(0,2,0,1.5,3,1.2,cream);g.roof(0,3.6,0,2.2,.9,1.7,teal);
  g.sphere(0,2.7,.67,.61,.61,.09,gold,12,5);g.box(0,2.86,.81,.06,.35,.06,darkwood);g.box(.16,2.71,.81,.35,.06,.06,darkwood);
  if(done){g.box(0,1.38,.69,.9,.5,.07,teal);g.box(0,1.38,.75,.68,.04,.07,cream);}return g;
 }
 if(kind==='pavilion'){
  g.box(0,.15,0,4,.3,3.5,wood);for(const x of [-1.7,1.7])for(const z of [-1.4,1.4])g.box(x,1.65,z,.17,3,.17,wood);
  if(done){g.roof(0,3.2,0,4.4,1.0,3.9,teal);g.box(0,1,-.9,2.9,1.7,.6,cream);}else g.box(0,.5,0,1.4,.5,1.1,cream);
  return g;
 }
 if(kind==='stall'){
  g.box(0,.9,0,3.7,1.5,1.8,wood);g.box(0,1.75,0,4.0,.22,2,cream);
  for(const x of [-1.8,1.8])g.box(x,2.0,-.7,.14,3.5,.14,wood);
  for(let i=0;i<6;i++){const x=-1.8+i*.72;g.box(x,3.4,0,.72,.14,2.3,i%2?cream:(done?terracotta:'#9ea492'));g.box(x,3.2,1.15,.72,.35,.08,i%2?cream:(done?terracotta:'#9ea492'));}
  if(done)for(let i=0;i<9;i++)g.sphere((i%3-1)*.8,1.97,Math.floor(i/3)*.35-.5,.27,.24,.27,i%2?'#d3ac54':'#cb7655',7,4);return g;
 }
 if(kind==='banner'){
  for(const x of [-2.2,2.2]){g.cylinder(x,1.7,0,.1,.09,3.4,wood,6);g.cylinder(x,3.45,0,.14,0,.3,gold,5);}
  g.box(0,3.1,0,4.5,.06,.06,wood);
  if(done)for(let i=0;i<7;i++){const x=-1.9+i*.63;g.tri([x-.24,3.07,0],[x,2.45,0],[x+.24,3.07,0],[teal,terracotta,gold][i%3]);}
  else g.box(0,.28,0,1.8,.45,1.0,wood);return g;
 }
 if(kind==='table'){
  for(const x of [-1.4,1.4])for(const z of [-.65,.65])g.box(x,.6,z,.2,1.2,.2,wood);
  g.box(0,1.3,0,4,.2,2.2,wood);g.box(0,1.43,0,1.1,.045,2.2,cream);
  for(const z of [-1.65,1.65])g.box(0,.65,z,4,.18,.55,wood);
  if(done)for(let i=0;i<4;i++){g.cylinder((i-1.5)*.9,1.55,.45,.29,.29,.08,cream,10);g.sphere((i-1.5)*.9,1.65,.45,.18,.12,.18,terracotta,7,4);g.cylinder((i-1.5)*.9,1.67,-.55,.12,.13,.4,teal,7);}return g;
 }
 if(kind==='lift'){
  for(const x of [-1.8,1.8])g.box(x,2,0,.28,4,.35,wood);g.box(0,4.0,0,4.2,.35,.5,wood);
  g.cylinder(0,4.3,0,.7,.7,.25,stone,12);g.box(0,2.3,0,.065,3.2,.07,darkwood);
  g.box(0,done?1.1:.3,0,2.7,.25,2.2,wood);if(done)g.box(0,1.65,-.8,2.6,.9,.12,teal);return g;
 }
 if(kind==='bridge'){
  for(let i=0;i<7;i++)g.box(0,.15,(i-3)*.55,2.7,.24,.5,wood);
  for(const x of [-1.45,1.45])for(const z of [-1.6,0,1.6])g.box(x,.8,z,.15,1.6,.15,wood);
  if(done)for(const x of [-1.45,1.45])g.box(x,1.4,0,.14,.14,3.7,cream);return g;
 }
 if(kind==='mill'){
  g.cylinder(0,2.2,0,2,1.55,4.4,cream,8,Math.PI/8);g.cylinder(0,5,0,2.2,0,1.9,teal,8,Math.PI/8);
  g.box(0,.9,1.94,1,1.8,.1,wood);g.box(0,2.8,1.85,.7,.8,.1,done?gold:'#82988d');g.box(0,.2,2.3,1.8,.35,1,stone);return g;
 }
 if(kind==='garden'){
  g.box(0,.22,0,4,.4,3.4,wood);g.box(0,.45,0,3.65,.16,3.05,'#8c7153');
  if(region==='village'){
   // The physical hundredth bed matches the 10-by-10 picture in its learning card.
   for(let i=0;i<=10;i++){g.box(-1.8+i*.36,.555,0,.015,.018,3.0,'#baaa7d');g.box(0,.555,-1.5+i*.30,3.6,.018,.015,'#baaa7d');}
   if(done)for(let i=0;i<35;i++){const x=-1.62+(i%10)*.36,z=-1.35+Math.floor(i/10)*.30;g.box(x,.565,z,.32,.022,.26,'#97b675');if(i%3===0)g.sphere(x,.68,z,.08,.12,.08,'#e6bd89',5,3);}
  }else if(done)for(let i=0;i<12;i++){const x=(i%4-1.5)*.82,z=(Math.floor(i/4)-1)*.85;g.cylinder(x,.8,z,.06,.04,.6,'#68975e',5);g.sphere(x,.97,z,.27,.36,.26,'#90b779',6,3);}
  return g;
 }
 if(kind==='mushroom'){
  for(let i=0;i<3;i++){const x=(i-1)*1.3,z=i%2*.7,s=i===1?1.15:.8;g.cylinder(x,.8*s,z,.28*s,.18*s,1.6*s,cream,7);g.sphere(x,1.7*s,z,1*s,.55*s,.9*s,done?'#bba7d2':'#9188ac',9,4);g.sphere(x-.3*s,2.0*s,z+.3*s,.16,.065,.16,cream,6,3);}
  if(done)g.cylinder(0,.35,1.4,.24,.18,.7,'#a4d5c1',7);return g;
 }
 if(kind==='slime'||kind==='boss'||kind==='dragon'){
  const s=kind==='boss'?1.6:kind==='dragon'?1.45:1.0,c=done?'#90c39f':kind==='dragon'?'#b6a8cc':'#95b9ab';
  g.sphere(0,1.0*s,0,1.15*s,.96*s,1.0*s,c,9,5);face(g,0,1.05*s,.95*s,s);
  g.sphere(-.65*s,.18*s,.65*s,.32*s,.15*s,.4*s,c,7,3);g.sphere(.65*s,.18*s,.65*s,.32*s,.15*s,.4*s,c,7,3);
  if(kind==='boss'){g.cylinder(0,2.03*s,0,.47,.35,.25,gold,6);for(let i=0;i<5;i++){const a=i*TAU/5;g.cylinder(Math.cos(a)*.3,2.27*s,Math.sin(a)*.3,.1,0,.3,gold,5);}}
  if(kind==='dragon'){g.cylinder(-.55*s,1.85*s,0,.18,0,.6,cream,5);g.cylinder(.55*s,1.85*s,0,.18,0,.6,cream,5);g.tri([-1.0*s,.8*s,0],[-2*s,1.7*s,-.3],[-1.4*s,.4*s,-.7],'#8e8eab');g.tri([1.0*s,.8*s,0],[1.4*s,.4*s,-.7],[2*s,1.7*s,-.3],'#8e8eab');}
  if(done){g.sphere(1.3*s,.4,1.0,.28,.25,.28,gold,7,4);}return g;
 }
 if(kind==='tower'){
  g.cylinder(0,2,0,1.7,1.55,4,stone,8);g.cylinder(0,4.1,0,1.8,1.8,.4,'#d0d0b5',8);
  for(let i=0;i<8;i++){const a=i*TAU/8;g.box(Math.cos(a)*1.5,4.55,Math.sin(a)*1.5,.7,.75,.6,stone,-a);}
  g.box(0,1.2,1.67,.95,2.1,.12,wood);g.box(0,3,1.58,.4,.8,.1,'#67897f');
  if(done){g.cylinder(0,5.4,0,.07,.07,2.2,wood,5);g.tri([.06,6.4,0],[.06,5.5,0],[1.1,6.0,0],terracotta);}return g;
 }
 if(kind==='chest'){
  g.box(0,.7,0,2.5,1.3,1.8,wood);g.box(0,.15,0,2.65,.2,1.9,gold);
  if(done){g.box(0,1.72,-.7,2.5,1.4,.2,wood);for(let i=0;i<5;i++)g.cylinder((i-2)*.4,1.5,0,.26,.25,.15,gold,8);}
  else g.roof(0,1.35,0,2.5,.5,1.8,'#ae8c58');
  for(const x of [-.85,.85])g.box(x,.7,.94,.16,1.3,.06,gold);g.box(0,1,.98,.35,.45,.1,gold);return g;
 }
 return g.box(0,.6,0,1,1,1,teal);
}
/** Shared by the live scene and visual regression tests. Completed models stay unchanged. */
export function questGeometry(kind,stage=0,region='village'){
 if(stage===2)return model(kind,true,region);
 const construction=constructionGeometry(kind,stage,region);
 if(construction)return construction;
 const g=model(kind,false,region);
 if(['slime','boss','dragon'].includes(kind))g.append(protectionRunes(kind,stage));
 return g;
}
function avatarParts(renderer){
 const body=new Geometry();body.box(0,.88,0,.72,.78,.48,teal);body.box(0,1.12,-.28,.82,.72,.15,'#286d69');body.box(0,.78,-.35,.55,.62,.24,'#c49257');
 body.box(0,1.68,0,.87,.85,.78,'#f0cfa4');body.box(0,2.01,-.04,.99,.18,.85,'#327c70');body.cylinder(0,2.29,-.11,.62,0,.68,'#3f8b79',5,Math.PI/4);
 body.box(0,1.28,.12,.88,.18,.6,'#d89a57');body.box(.30,1.08,.34,.20,.43,.1,'#dcaa60');face(body,0,1.64,.407,.7);
 const arm=new Geometry().box(0,-.13,0,.22,.55,.24,teal).box(0,-.42,0,.23,.22,.24,'#f0cfa4');
 const leg=new Geometry().box(0,-.16,0,.26,.46,.3,'#6e6250').box(0,-.37,.07,.3,.18,.45,'#534f41');
 return {body:renderer.mesh(body),arms:[renderer.mesh(arm),renderer.mesh(arm)],legs:[renderer.mesh(leg),renderer.mesh(leg)],shadow:renderer.mesh(new Geometry().disc(0,0,0,.76,.63,[.10,.23,.22,.25]),{depthWrite:false,glow:1})};
}
function annulus(inner,outer,color){const g=new Geometry();for(let i=0;i<48;i++){const a=i*TAU/48,b=(i+1)*TAU/48;g.quad([Math.cos(a)*inner,0,Math.sin(a)*inner],[Math.cos(b)*inner,0,Math.sin(b)*inner],[Math.cos(b)*outer,0,Math.sin(b)*outer],[Math.cos(a)*outer,0,Math.sin(a)*outer],color);}return g;}
export class World {
 constructor(renderer, onInteract){
  this.renderer=renderer;this.onInteract=onInteract;this.objects=[];this.obstacles=[];this.dynamic=[];this.path=[];this.targetObject=null;this.time=0;this.keys=new Set();this.stick={x:0,y:0};this.player={x:0,z:30,angle:0};this.walkTime=0;this.lastMoved=0;this.waypoint=null;
  this.gates=[];this.adornments=[];this.bees=[];this.build();this.buildGates();this.buildResidents();this.avatar=avatarParts(renderer);this.highlight=renderer.mesh(annulus(2.2,2.35,[1,.85,.42,.95]),{glow:1,visible:false,depthWrite:false});
  this.destination=renderer.mesh(annulus(.30,.42,[1,.94,.7,.8]),{glow:1,visible:false,depthWrite:false});
  this.routeMarkers=[];for(let i=0;i<12;i++)this.routeMarkers.push(renderer.mesh(new Geometry().sphere(0,0,0,.12,.12,.12,gold,6,3),{glow:1,visible:false}));
  this.particles=[];for(let i=0;i<22;i++)this.particles.push(renderer.mesh(new Geometry().box(0,0,0,.12,.12,.12,[gold,'#b7d6a1','#f4e9be'][i%3]),{visible:false,glow:1}));
  this.encounterMesh=renderer.mesh(model('slime',false),{visible:false});
  this.buildNavigation();this.camera=[0,1.3,24];
 }
 build(){
  const render=this.renderer;
  render.mesh(new Geometry().box(0,-.24,0,700,.3,700,'#7cb9bb'),{water:1});
  const land=new Geometry(),roads=new Geometry(),props=new Geometry(),shadows=new Geometry(),shore=new Geometry();
  const colors={village:['#a6bf81','#a9c284','#adc587'],forest:['#84a086','#789c7f','#89a483'],harbor:['#d1c899','#d6caa0','#cbbb91'],market:['#afbf80','#b6c585','#b3c182'],cliffs:['#b4baa0','#b7bda1','#bac0a5'],mill:['#b7c783','#bdca8a','#b1c27e'],cave:['#a3a3b2','#a5a3b3','#999cab'],castle:['#bfc59f','#c4c9a5','#bbc39d']};
  const center=[5,-5],sub=18;
  const groundColor=(x,z)=>{const r=nearestRegion(x,z);if(!landAt(x,z)&&!mountainZone(x,z))return pick(['#719570','#799d75','#80a47a']);return pick(colors[r.id]);};
  const pt=(p)=>[p[0],terrainHeight(...p),p[1]];
  // Subdivide one mainland polygon, not separate island fans. Shared edges coincide.
  for(let edge=0;edge<OUTLINE.length;edge++){
   const a=OUTLINE[edge],b=OUTLINE[(edge+1)%OUTLINE.length];
   const at=(i,j)=>[center[0]+(a[0]-center[0])*i/sub+(b[0]-center[0])*j/sub,center[1]+(a[1]-center[1])*i/sub+(b[1]-center[1])*j/sub];
   const tri=(aa,bb,cc)=>{const x=(aa[0]+bb[0]+cc[0])/3,z=(aa[1]+bb[1]+cc[1])/3;const ab=[bb[0]-aa[0],bb[1]-aa[1]],ac=[cc[0]-aa[0],cc[1]-aa[1]];if(ab[0]*ac[1]-ab[1]*ac[0]>0)land.tri(pt(aa),pt(cc),pt(bb),groundColor(x,z));else land.tri(pt(aa),pt(bb),pt(cc),groundColor(x,z));};
   for(let i=0;i<sub;i++)for(let j=0;j<sub-i;j++){tri(at(i,j),at(i+1,j),at(i,j+1));if(i+j<sub-1)tri(at(i+1,j),at(i+1,j+1),at(i,j+1));}
   // A sand rim follows the actual coastline. Mountains form the far boundary.
   const dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz),steps=Math.ceil(len/2);
   for(let i=0;i<steps;i++){
    const t=i/steps,u=(i+1)/steps,x=a[0]+dx*t,z=a[1]+dz*t,xx=a[0]+dx*u,zz=a[1]+dz*u;
    const outer=(x,z,f)=>[center[0]+(x-center[0])*f,center[1]+(z-center[1])*f];
    const o=outer(x,z,1.025),oo=outer(xx,zz,1.025);
    shore.quad([x,terrainHeight(x,z)-.02,z],[xx,terrainHeight(xx,zz)-.02,zz],[oo[0],.04,oo[1]],[o[0],.04,o[1]],'#d4caa4');
    land.quad([o[0],.04,o[1]],[oo[0],.04,oo[1]],[oo[0],-.6,oo[1]],[o[0],-.6,o[1]],'#9bb4a1');
   }
  }
  // Curving dirt paths remain on continuous ground. There are no connecting boardwalks.
  const ribbon=(points,width=1.35)=>{
   for(let i=1;i<points.length;i++){
    const a=points[i-1],b=points[i],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz)||1,px=-dz/len,pz=dx/len;
    const corner=(p,side,w=width)=>[p[0]+px*w*side,terrainHeight(p[0]+px*w*side,p[1]+pz*w*side)+(w===width?.14:.075),p[1]+pz*w*side];
    roads.quad(corner(a,1,width+.28),corner(b,1,width+.28),corner(b,-1,width+.28),corner(a,-1,width+.28),'#bac295');
    roads.quad(corner(a,1),corner(b,1),corner(b,-1),corner(a,-1),i%3?'#d8c7a0':'#d4c39b');
   }
  };
  for(const route of ROUTES)ribbon(route.points);
  // Quest objects are independent meshes. Their final form is revealed after confirmation.
  for(const q of QUESTS){
   const r=regionById(q.region),x=r.x+q.x,z=r.z+q.z,y=terrainHeight(x,z)+.09;
   const small=['slime','crystal','statue','lantern','clock','stones'].includes(q.kind),radius=q.kind==='tree'?2.4:small?1.1:1.9;
   const o={id:q.id,type:'quest',q,region:r.id,x,y,z,radius,hidden:!!q.challenge,height:q.kind==='tree'?7:q.kind==='mill'?7:q.kind==='tower'?6:4.5};
   const shapes=[0,1,2].map(stage=>questGeometry(q.kind,stage,r.id));
   o.before=render.mesh(shapes[0],{x,y,z});o.working=render.mesh(shapes[1],{x,y,z,visible:false});o.after=render.mesh(shapes[2],{x,y,z,visible:false});
   o.models=[o.before,o.working,o.after];o.visualStage=0;o.previousStage=0;
   o.buildHeight=shapes[2].data.reduce((h,n,i)=>i%10===1?Math.max(h,n):h,0)+.05;
   this.objects.push(o);
   o.obstacle={x,z,r:radius,active:!q.challenge};this.obstacles.push(o.obstacle);shadow(shadows,x,y-.08,z,radius+1,radius*.75+.6);
   if(!q.challenge){const trails=this.localTrails(r.id),anchor=trails.reduce((best,p)=>Math.hypot(p[0]-q.x,p[1]-q.z)<Math.hypot(best[0]-q.x,best[1]-q.z)?p:best,trails[0]);ribbon([[r.x+anchor[0],r.z+anchor[1]],[r.x+anchor[0]*.35+q.x*.65,r.z+anchor[1]*.35+q.z*.65],[x,z]],.55);}
   if(q.kind==='mill'){
    const wings=new Geometry();for(let i=0;i<4;i++){const blade=new Geometry().box(0,1.45,0,.25,3.5,.15,wood).box(.3,1.9,0,.72,1.7,.11,cream);wings.append(blade,0,0,0,0,0,i*Math.PI/2);}
    o.blades=render.mesh(wings,{x,y:y+4,z:z+2.15,visible:false});
   }
  }
  for(const r of REGIONS){
   ribbon(this.localTrails(r.id).map(([x,z])=>[x+r.x,z+r.z]),r.id==='market'?1.55:.75);
   biomeAccents(props,r,terrainHeight);
   const x=r.x-4,z=r.z+6,y=terrainHeight(x,z)+.1;
   const o={id:'info-'+r.id,type:'info',region:r.id,x,y,z,radius:.65,height:3.2,mesh:render.mesh(signModel(),{x,y,z})};this.objects.push(o);this.obstacles.push({x,z,r:.8});shadow(shadows,x,y-.09,z,1.25,.65);
   if(r.id==='village')for(const [hx,hz,sc,col]of [[-14,0,.64,'#74988c'],[10,-12,.66,'#ca9870'],[-3,-12,.75,'#bd8065'],[11,14,.62,'#728c81']]){
    const xx=r.x+hx,zz=r.z+hz,yy=terrainHeight(xx,zz);if(this.obstacles.some(o=>distance(o,{x:xx,z:zz})<o.r+2)||pathDistance(xx,zz)<1.6)continue;
    props.append(house(new Geometry(),true,col),xx,yy,zz,0,0,0,sc);this.obstacles.push({x:xx,z:zz,r:2.05*sc});shadow(shadows,xx,yy,zz,2.8*sc,2*sc);
   }
   if(r.id==='cave'){
    for(let i=0;i<13;i++){const a=Math.PI+i*Math.PI/12,xx=r.x+Math.cos(a)*15,zz=r.z+Math.sin(a)*15,yy=terrainHeight(xx,zz);props.sphere(xx,yy+2,zz,2.7,3.1+R()*2.4,2.7,'#818d91',7,4);}
    for(let i=0;i<14;i++){const a=R()*TAU,xx=r.x+Math.cos(a)*12,zz=r.z+Math.sin(a)*11;if(pathDistance(xx,zz)<2.3)continue;crystal(props,xx,terrainHeight(xx,zz),zz,.5+R()*.6,pick(['#b9a5cb','#8bbbbd','#b2c9b7']));}
   }
   if(r.id==='castle'){
    for(const dx of [-10,10]){const xx=r.x+dx,zz=r.z-11;props.append(model('tower',true),xx,terrainHeight(xx,zz),zz,0,0,0,.85);this.obstacles.push({x:xx,z:zz,r:1.6});}
    for(let i=-9;i<=9;i++){const xx=r.x+i,zz=r.z-13,yy=terrainHeight(xx,zz);props.box(xx,yy+1.4,zz,1.05,2.8,1,stone);if(i%2===0)props.box(xx,yy+3.15,zz,.9,.7,1,stone);this.obstacles.push({x:xx,z:zz,r:.65});}
   }
  }
  // Continuous woodland walls with grass beneath: paths lead to irregular clearings.
  // All inaccessible inland surfaces are represented by trees or rocks, not invisible sea gaps.
  for(let z=-83;z<67;z+=3.05)for(let x=-64;x<85;x+=3.05){
   const xx=x+(R()-.5)*1.15,zz=z+(R()-.5)*1.15;if(!onMainland(xx,zz)||landAt(xx,zz,.0))continue;
   const y=terrainHeight(xx,zz),clear=clearingDistance(xx,zz),road=pathDistance(xx,zz);
   if(road<3.5||clear<.35||this.obstacles.some(o=>distance(o,{x:xx,z:zz})<o.r+1.7))continue;
   if(mountainZone(xx,zz)){
    if(R()>.57)continue;const sc=1.3+R()*1.1;props.sphere(xx,y+1.3,zz,2.5*sc,2.7*sc,2.4*sc,pick(['#8e9b95','#9aa49a','#899991']),6,3);
    if(zz<-79||xx>80){props.cylinder(xx,y+4,zz,4,0,10+R()*5,'#899894',5,.3);}
   }else{
    const sc=.8+R()*.6;
    if(R()<.77)pine(props,xx,y,zz,sc,pick(['#487e64','#568b6b','#639574','#6a9c73']));else leafy(props,xx,y,zz,sc,pick(['#739d70','#85a975','#66936e']));
    shadow(shadows,xx,y,zz,1.65*sc,1.3*sc);
   }
  }
  // Occasional trees and wildflowers INSIDE the clearings can be walked around.
  for(const r of REGIONS){
   for(let n=0;n<75;n++){
    const x=r.x+(R()-.5)*31,z=r.z+(R()-.5)*28;if(!landAt(x,z,1)||pathDistance(x,z)<2.5||this.obstacles.some(o=>distance(o,{x,z})<o.r+2))continue;
    const y=terrainHeight(x,z),edge=clearingDistance(x,z);
    if(n<9&&edge>-5&&r.id!=='castle'){
     const sc=.66+R()*.3;if(r.id==='cliffs'||r.id==='cave')props.sphere(x,y+.45,z,.85,.75,.72,'#a2ad9c',6,3);else leafy(props,x,y,z,sc,pick(['#8cb27a','#96b97f','#7ca472']));this.obstacles.push({x,z,r:.48});shadow(shadows,x,y,z,1.2,1);
    }else if(n%4===0){props.cylinder(x,y+.2,z,.025,.016,.4,'#719164',4);props.sphere(x,y+.43,z,.15,.13,.15,pick(['#f3df9e','#dfb5a0','#e3e7c0']),5,3);}
    else props.tri([x-.1,y+.04,z],[x,y+.37,z],[x+.1,y+.04,z],'#91ad73');
   }
  }
  const objectMeshes=render.meshes.splice(1);
  render.mesh(land);render.mesh(shore,{glow:.2});render.mesh(roads);render.mesh(shadows,{glow:1,depthWrite:false});render.mesh(props);render.meshes.push(...objectMeshes);
  const glints=new Geometry();for(let i=0;i<160;i++){const x=R()*190-95,z=R()*180-90;if(onMainland(x,z))continue;glints.box(x,.06,z,.5+R()*1.5,.008,.065,[.85,.94,.87,.4]);}render.mesh(glints,{water:1,glow:1,depthWrite:false});
 }

 localTrails(id){
  return ({village:[[-10,-5],[-7,2],[-3,5],[1,9],[8,8],[10,1],[6,-6]],forest:[[-9,9],[-10,3],[-6,-2],[-1,-7],[5,-5],[9,1],[7,7]],harbor:[[-10,0],[-5,0],[0,0],[5,0],[9,0],[9,9],[-7,9]],market:[[-10,-6],[-5,-6],[0,-6],[5,-4],[9,0],[8,6],[-8,6]],cliffs:[[-10,7],[-7,2],[-8,-5],[-3,-9],[2,-8],[7,-3],[8,6]],mill:[[-9,5],[-8,-5],[-3,-8],[4,-7],[9,-2],[8,7],[1,9],[-9,5]],cave:[[-10,7],[-9,0],[-7,-7],[0,-9],[7,-5],[10,1],[5,7]],castle:[[-9,7],[-9,-7],[8,-7],[8,7],[-9,7]]})[id];
 }
 buildResidents(){
  this.bees=[];const hive=QUESTS.find(q=>q.id==='c6-m1'),mr=regionById('mill');for(let i=0;i<5;i++)this.bees.push({mesh:this.renderer.mesh(beeGeometry(),{visible:false}),x:mr.x+hive.x,z:mr.z+hive.z,phase:i*1.25});
  const names={village:'Jori',forest:'Fenn',harbor:'Nela',market:'Ravi',cliffs:'Taro',mill:'Alva',cave:'Miko',castle:'Yumi'};
  for(const r of REGIONS){
   const spot=this.nearestFree(r.x-1,r.z+3,5),x=spot.x,z=spot.z,y=terrainHeight(x,z)+.1;
   const o={id:'resident-'+r.id,type:'resident',region:r.id,name:names[r.id],x,y,z,radius:.5,height:2.4};
   o.mesh=this.renderer.mesh(resident(new Geometry(),0,0,0,.8,r.id==='cave'?'#9987ac':r.id==='cliffs'?'#aa8872':'#769b8a'),{x,y,z});this.objects.push(o);
   const mesh=this.renderer.mesh(areaAdornment(r,terrainHeight,(x,z)=>landAt(x,z,.3)&&!this.obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.r+1)),{visible:false});
   const rainbow=this.renderer.mesh(rainbowGeometry(),{x:r.x,y:terrainHeight(r.x,r.z-11)+2.5,z:r.z-11,opacity:.65,glow:.9,depthWrite:false,visible:false});
   this.adornments.push({region:r.id,mesh,rainbow});
  }
 }
 buildGates(){
  for(const route of ROUTES){
   // Place the physical check at the narrowest outside-clearing section, not inside a plaza.
   let index=12,best=-Infinity;
   for(let i=8;i<=16;i++){const [x,z]=route.points[i],score=clearingDistance(x,z)-Math.abs(i-12)*.13;if(score>best){index=i;best=score;}}
   const [x,z]=route.points[index],a=route.points[index-1],b=route.points[index+1],len=Math.hypot(b[0]-a[0],b[1]-a[1]);
   const normal={x:(b[0]-a[0])/len,z:(b[1]-a[1])/len},y=terrainHeight(x,z)+.1;
   for(const reverse of [false,true]){
    const from=reverse?route.b:route.a,to=reverse?route.a:route.b,n={x:normal.x*(reverse?-1:1),z:normal.z*(reverse?-1:1)},angle=Math.atan2(n.x,n.z),kind=BARRIER_KINDS[from];
    const parts=barrierParts(kind),ward=barrierParts('runes');
    const o={id:'gate-'+from+'-'+to,type:'gate',region:from,from,to,x,y,z,radius:1.7,height:4.1,normal:n,angle,kind,name:BARRIER_NAMES[kind],hidden:false};
    o.frame=this.renderer.mesh(parts.frame,{x,y,z,ry:angle,visible:false});
    o.left=this.renderer.mesh(parts.left,{x:x-3*Math.cos(angle),y,z:z+3*Math.sin(angle),ry:angle,visible:false});
    o.right=this.renderer.mesh(parts.right,{x:x+3*Math.cos(angle),y,z:z-3*Math.sin(angle),ry:angle,visible:false});
    const wg=new Geometry().append(ward.frame).append(ward.left,-3,0,0).append(ward.right,3,0,0);
    o.ward=this.renderer.mesh(wg,{x,y,z,ry:angle,visible:false,glow:.7,depthWrite:false});
    this.gates.push(o);this.objects.push(o);
   }
  }
 }
 gateFacesPlayer(o){return (this.player.x-o.x)*o.normal.x+(this.player.z-o.z)*o.normal.z<=0;}
 crossingBlocker(ox,oz,nx,nz){
  for(const o of this.gates){
   if(gateStatus(this.state||{},o.from,o.to).open)continue;
   const before=(ox-o.x)*o.normal.x+(oz-o.z)*o.normal.z,after=(nx-o.x)*o.normal.x+(nz-o.z)*o.normal.z;
   const lateral=Math.abs((nx-o.x)*o.normal.z-(nz-o.z)*o.normal.x);
   if(before<-.5&&after>=-.5&&lateral<3.85)return o;
  }
  return null;
 }
 refreshGates(){
  for(const o of this.gates){
   const status=gateStatus(this.state||{},o.from,o.to),facing=this.gateFacesPlayer(o),active=!status.open&&facing;
   o.status=status;o.hidden=!active;o.unlocked=true;
   const animated=this.gateOpening?.objects.includes(o);
   if(animated)continue;
   const source=active&&!status.sourcePassed;
   for(const m of [o.frame,o.left,o.right]){m.visible=source;m.opacity=1;m.ry=o.angle;m.y=o.y;}
   o.left.x=o.x-3*Math.cos(o.angle);o.left.z=o.z+3*Math.sin(o.angle);
   o.right.x=o.x+3*Math.cos(o.angle);o.right.z=o.z-3*Math.sin(o.angle);
   o.ward.visible=active&&status.sourcePassed;o.ward.opacity=.6;
  }
 }
 beginGateOpening(from,to,newlyMastered,onComplete=()=>{}){
  const target=this.gates.find(g=>g.from===from&&g.to===to);if(!target){onComplete();return;}
  this.stop();const objects=newlyMastered?this.gates.filter(g=>g.from===from):[target];
  this.gateOpening={object:target,objects,start:this.time,duration:this.state?.settings.reducedMotion?.valueOf()? .25:2.9,onComplete,newlyMastered};
  for(const o of objects){o.animateSource=newlyMastered;o.animateFacing=this.gateFacesPlayer(o);}
 }
 updateGateOpening(time){
  const e=this.gateOpening;if(!e)return;const t=Math.min(1,Math.max(0,(time-e.start)/e.duration)),opening=Math.min(1,t/.6),fade=t<.45?1:Math.max(0,1-(t-.45)/.55);
  for(const o of e.objects){
   o.hidden=true;
   for(const m of [o.frame,o.left,o.right]){m.visible=o.animateFacing&&o.animateSource;m.opacity=fade;}
   o.ward.visible=o.animateFacing&&!o.animateSource;o.ward.opacity=fade*.7;
   if(['gate','runes'].includes(o.kind)){o.left.ry=o.angle-opening*1.55;o.right.ry=o.angle+opening*1.55;}
   else {o.left.x=o.x-3*Math.cos(o.angle)-opening*1.6*Math.cos(o.angle);o.right.x=o.x+3*Math.cos(o.angle)+opening*1.6*Math.cos(o.angle);o.left.y=o.y+Math.sin(opening*Math.PI)*.45;o.right.y=o.left.y;}
  }
  if(t>.6&&!e.sparked){e.sparked=true;this.celebrate(e.object.x,e.object.z);}
  if(t>=1){this.gateOpening=null;this.refreshGates();e.onComplete();}
 }
 canWalk(x,z,clearance=.38){return landAt(x,z,Math.max(0,clearance-.38))&&!this.obstacles.some(o=>o.active!==false&&Math.hypot(x-o.x,z-o.z)<o.r+clearance);}
 buildNavigation(){
  this.minX=-72;this.minZ=-90;this.gridW=166;this.gridH=165;
  this.nav=new Uint8Array(this.gridW*this.gridH);
  for(let j=0;j<this.gridH;j++)for(let i=0;i<this.gridW;i++)this.nav[j*this.gridW+i]=this.canWalk(this.minX+i,this.minZ+j,.68)?1:0;
 }
 nearestFree(x,z,max=12){
  if(this.canWalk(x,z))return{x,z};
  for(let r=.7;r<max;r+=.6)for(let a=0;a<TAU;a+=.38){const xx=x+Math.cos(a)*r,zz=z+Math.sin(a)*r;if(this.canWalk(xx,zz))return{x:xx,z:zz};}
  return{x:0,z:30};
 }
 findPath(tx,tz){
  const free=this.nearestFree(tx,tz,6);tx=free.x;tz=free.z;
  const idx=(x,z)=>{const i=Math.round(x-this.minX),j=Math.round(z-this.minZ);return i<0||j<0||i>=this.gridW||j>=this.gridH?-1:j*this.gridW+i;};
  let start=idx(this.player.x,this.player.z),goal=idx(tx,tz);
  const nearby=id=>{if(id>=0&&this.nav[id])return id;for(let r=1;r<5;r++)for(let z=-r;z<=r;z++)for(let x=-r;x<=r;x++){const n=id+z*this.gridW+x;if(n>=0&&n<this.nav.length&&this.nav[n])return n;}return -1;};
  start=nearby(start);goal=nearby(goal);if(start<0||goal<0)return[];
  const gx=goal%this.gridW,gz=Math.floor(goal/this.gridW),N=this.nav.length;
  const cost=new Float32Array(N).fill(Infinity),parent=new Int32Array(N).fill(-1),closed=new Uint8Array(N),heap=[];
  const heur=id=>Math.hypot(id%this.gridW-gx,Math.floor(id/this.gridW)-gz);
  const push=(id,f)=>{const n={id,f};heap.push(n);let i=heap.length-1;while(i>0){const p=(i-1)>>1;if(heap[p].f<=f)break;heap[i]=heap[p];i=p;}heap[i]=n;};
  const pop=()=>{const best=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let c=i*2+1;if(c+1<heap.length&&heap[c+1].f<heap[c].f)c++;if(heap[c].f>=last.f)break;heap[i]=heap[c];i=c;}heap[i]=last;}return best.id;};
  cost[start]=0;push(start,heur(start));let found=false,iterations=0;
  while(heap.length&&iterations++<22000){const id=pop();if(closed[id])continue;if(id===goal){found=true;break;}closed[id]=1;const x=id%this.gridW,z=Math.floor(id/this.gridW);
   for(const [dx,dz]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){
    const xx=x+dx,zz=z+dz;if(xx<0||zz<0||xx>=this.gridW||zz>=this.gridH)continue;const next=zz*this.gridW+xx;if(!this.nav[next]||closed[next])continue;
    if(dx&&dz&&(!this.nav[id+dx]||!this.nav[id+dz*this.gridW]))continue;
    // Validate every edge so a route cannot cut through trees or a mountain boundary.
    if(![.2,.4,.6,.8].every(t=>this.canWalk(this.minX+x+dx*t,this.minZ+z+dz*t,.48)))continue;
    const value=cost[id]+(dx&&dz?1.4142:1);if(value<cost[next]){cost[next]=value;parent[next]=id;push(next,value+heur(next));}
   }
  }
  if(!found)return[];const route=[];for(let id=goal;id!==start&&id!==-1;id=parent[id])route.push({x:this.minX+id%this.gridW,z:this.minZ+Math.floor(id/this.gridW)});route.reverse();
  // Use the exact touch point only if the last small segment is obstacle free.
  if(this.canWalk(tx,tz)&&Math.hypot(tx-(this.minX+goal%this.gridW),tz-(this.minZ+Math.floor(goal/this.gridW)))<.8)route.push({x:tx,z:tz});
  return route;
 }
 goTo(x,z,object=null){if(!landAt(x,z))return false;this.path=this.findPath(x,z);this.targetObject=object;return this.path.length>0;}
 goToObject(o){
  if(o.type==='gate')return this.goTo(o.x-o.normal.x*2.8,o.z-o.normal.z*2.8,o);
  const a=Math.atan2(this.player.z-o.z,this.player.x-o.x),r=o.radius+1.1;
  const target=this.nearestFree(o.x+Math.cos(a)*r,o.z+Math.sin(a)*r,4);
  return this.goTo(target.x,target.z,o);
 }
 stop(){this.path=[];this.targetObject=null;this.keys.clear();this.stick={x:0,y:0};}
 teleport(x,z){const p=this.nearestFree(x,z);this.player.x=p.x;this.player.z=p.z;this.stop();this.camera=[p.x,terrainHeight(p.x,p.z),p.z-2];this.renderer.setCamera(this.camera);}
 sync(state){
  this.state=state;let navigationChanged=false;
  for(const o of this.objects)if(o.type==='quest'){
   const done=!!state.completed[o.id],hidden=o.q.challenge&&!challengeVisible(o.region,state.completed);
   if(o.hidden!==hidden){navigationChanged=true;o.hidden=hidden;o.obstacle.active=!hidden;}
   o.done=done;o.unlocked=questUnlocked(o.q,state.completed);
   const appearance=questAppearance(o.q,state);o.questStatus=appearance.status;o.statusText=appearance.label;
   if(this.building?.object===o)continue;
   if(o.visualStage!==appearance.stage)o.previousStage=o.visualStage;
   o.visualStage=appearance.stage;
   o.models.forEach((mesh,stage)=>{mesh.visible=stage===o.visualStage&&!hidden;mesh.reveal=1000;mesh.opacity=1;});
   if(o.blades)o.blades.visible=done&&!hidden;
  }
  for(const a of this.adornments){const done=!!state.completed['c6-master-'+a.region];a.mesh.visible=done;a.mesh.reveal=1000;a.mesh.opacity=1;a.rainbow.visible=done;a.rainbow.opacity=.62;}
  this.refreshGates();if(navigationChanged&&this.nav)this.buildNavigation();
 }
 nearest(){let best=null,d=Infinity;for(const o of this.objects){if(o.hidden)continue;const dd=distance(o,this.player);if(dd<5.2&&dd<d){best=o;d=dd;}}return best;}
 region(){let best=REGIONS[0],d=Infinity;for(const r of REGIONS){const dd=distance(r,this.player);if(dd<d){best=r;d=dd;}}return best;}
 onPath(){return clearingDistance(this.player.x,this.player.z)>0&&pathDistance(this.player.x,this.player.z)<3.1;}
 beginBuild(id,onComplete=()=>{}){
  const o=this.objects.find(o=>o.id===id);if(!o){onComplete();return;}
  this.stop();
  const source=o.models[Math.min(1,o.visualStage===2?o.previousStage:o.visualStage)];
  this.building={object:o,source,start:this.time,duration:this.state?.settings.reducedMotion ? .25 : o.q?.challenge?4.2:2.65,onComplete,stage:0};
  if(o.q?.challenge){const a=this.adornments.find(a=>a.region===o.region);if(a){a.mesh.opacity=0;a.rainbow.opacity=0;}}
  o.before.visible=false;o.working.visible=false;
  Object.assign(source,{visible:true,opacity:1});Object.assign(o.after,{visible:true,reveal:0,opacity:1,y:o.y});
  if(o.blades)o.blades.visible=false;
 }
 updateBuild(time){
  const b=this.building;if(!b)return;
  const o=b.object,t=Math.max(0,Math.min(1,(time-b.start)/b.duration));
  b.stage=Math.min(2,Math.floor(t*3));
  if(o.q?.challenge){const a=this.adornments.find(a=>a.region===o.region);if(a){a.mesh.opacity=Math.max(0,(t-.2)/.8);a.rainbow.opacity=Math.max(0,(t-.45)/.55)*.62;}}
  // A moving cut plane reveals the real completed mesh from foundation to roof.
  o.after.reveal=o.buildHeight*Math.min(1,t/.86);
  b.source.opacity=Math.max(0,1-t*4);b.source.visible=t<.26;
  if(t>.55&&!b.sparked){b.sparked=true;this.celebrate(o.x,o.z);}
  if(t>=1){o.before.visible=false;o.working.visible=false;b.source.opacity=1;o.after.reveal=1000;o.after.visible=true;o.visualStage=2;if(o.blades)o.blades.visible=true;this.building=null;b.onComplete();}
 }
 celebrate(x,z){this.burst={x,z,y:terrainHeight(x,z)+1.5,start:this.time};}
 update(dt,time,paused=false){
  this.time=time;this.updateBuild(time);this.updateGateOpening(time);this.refreshGates();let vx=0,vz=0,moved=0,moveLimit=Infinity;
  if(!paused){
   let sx=this.stick.x,sy=this.stick.y;
   if(this.keys.has('arrowleft')||this.keys.has('a'))sx-=1;if(this.keys.has('arrowright')||this.keys.has('d'))sx+=1;
   if(this.keys.has('arrowup')||this.keys.has('w'))sy-=1;if(this.keys.has('arrowdown')||this.keys.has('s'))sy+=1;
   const manual=Math.hypot(sx,sy)>.08;
   if(manual){this.path=[];this.targetObject=null;const len=Math.max(1,Math.hypot(sx,sy));sx/=len;sy/=len;vx=this.renderer.right[0]*sx-this.renderer.forward[0]*sy;vz=this.renderer.right[2]*sx-this.renderer.forward[2]*sy;const n=Math.hypot(vx,vz);if(n){vx/=n;vz/=n;}}
   else if(this.path.length){const next=this.path[0],d=distance(next,this.player);if(d<.035){const barrier=this.crossingBlocker(this.player.x,this.player.z,next.x,next.z);if(barrier){this.stop();this.onInteract(barrier);}else{this.player.x=next.x;this.player.z=next.z;this.path.shift();}}else{vx=(next.x-this.player.x)/d;vz=(next.z-this.player.z)/d;moveLimit=d;}}
   const step=Math.min(5.7*dt,moveLimit),ox=this.player.x,oz=this.player.z;
   if(vx||vz){
    const nx=ox+vx*step,nz=oz+vz*step;
    const barrier=this.crossingBlocker(ox,oz,nx,nz);
    if(barrier){this.stop();this.onInteract(barrier);}
    else if(this.canWalk(nx,nz)){this.player.x=nx;this.player.z=nz;}else if(this.canWalk(nx,oz)){const b=this.crossingBlocker(ox,oz,nx,oz);if(b){this.stop();this.onInteract(b);}else this.player.x=nx;}else if(this.canWalk(ox,nz)){const b=this.crossingBlocker(ox,oz,ox,nz);if(b){this.stop();this.onInteract(b);}else this.player.z=nz;}else if(!manual){this.path=[];this.targetObject=null;}
    moved=Math.hypot(this.player.x-ox,this.player.z-oz);if(moved>.001){this.player.angle=Math.atan2(vx,vz);this.walkTime+=dt*10;this.lastMoved=time;}
   }
   if(!this.path.length&&this.targetObject){const o=this.targetObject;this.targetObject=null;if(distance(o,this.player)<5.2)this.onInteract(o);}
  }
  for(const b of this.bees){b.mesh.visible=!!this.state?.completed['c6-m1'];const t=this.state?.settings.reducedMotion?b.phase:time*1.2+b.phase;b.mesh.x=b.x+Math.cos(t)*2;b.mesh.z=b.z+Math.sin(t)*1.5;b.mesh.y=terrainHeight(b.mesh.x,b.mesh.z)+1.8+Math.sin(t*2)*.3;}
  const p=this.player,y=terrainHeight(p.x,p.z)+.12,bob=this.state?.settings.reducedMotion?0:moved?Math.abs(Math.sin(this.walkTime))*.07:Math.sin(time*2)*.015;
  const body=this.avatar.body;Object.assign(body,{x:p.x,y:y+bob,z:p.z,ry:p.angle});
  const sin=Math.sin(p.angle),cos=Math.cos(p.angle);
  this.avatar.arms.forEach((m,i)=>{const x=i?-.51:.51;Object.assign(m,{x:p.x+x*cos,y:y+1.03+bob,z:p.z-x*sin,ry:p.angle,rx:moved?Math.sin(this.walkTime+(i?Math.PI:0))*.6:0});});
  this.avatar.legs.forEach((m,i)=>{const x=i?-.19:.19;Object.assign(m,{x:p.x+x*cos,y:y+.48,z:p.z-x*sin,ry:p.angle,rx:moved?Math.sin(this.walkTime+(i?0:Math.PI))*.5:0});});
  Object.assign(this.avatar.shadow,{x:p.x,y:y-.06,z:p.z});
  const focus=this.building?.object||this.gateOpening?.object;const desired=focus?[focus.x,focus.y+1,focus.z]:[p.x,terrainHeight(p.x,p.z),p.z-2.0],alpha=1-Math.exp(-dt*(focus?6:4));
  this.camera=this.camera.map((v,i)=>v+(desired[i]-v)*alpha);this.renderer.setCamera(this.camera);
  const nearest=paused?null:this.nearest();this.highlight.visible=!!nearest;
  if(nearest){this.highlight.x=nearest.x;this.highlight.z=nearest.z;this.highlight.y=nearest.y+.01;this.highlight.scale=nearest.radius>1.5?1:.7;this.highlight.opacity=.7+Math.sin(time*3)*.2;}
  for(const o of this.objects){
   if(o.type==='resident'&&!this.state?.settings.reducedMotion){o.mesh.ry=Math.sin(time*.7+o.x)*.13;o.mesh.y=o.y+Math.sin(time*1.8+o.z)*.025;}
   if(o.blades)o.blades.rz=o.done&&!this.state?.settings.reducedMotion?time*.65:.4;
   if(o.type==='quest'&&this.building?.object!==o&&['slime','boss','dragon'].includes(o.q.kind)){
    const m=o.models[o.visualStage];const animate=!this.state?.settings.reducedMotion;m.y=o.y+(animate?Math.abs(Math.sin(time*1.7+o.x))*.10:0);m.ry=animate?Math.sin(time*.5+o.z)*.12:0;
   }
  }
  this.destination.visible=!paused&&this.path.length>0;
  if(this.destination.visible){const end=this.path.at(-1);Object.assign(this.destination,{x:end.x,y:terrainHeight(end.x,end.z)+.18,z:end.z});}
  this.routeMarkers.forEach((m,i)=>{const node=this.path[i*4+2];m.visible=!!node&&!paused;if(node){Object.assign(m,{x:node.x,y:terrainHeight(node.x,node.z)+.16,z:node.z});}});
  this.particles.forEach((m,i)=>{const age=this.burst?time-this.burst.start:10;m.visible=age<2.2&&!this.state?.settings.reducedMotion;if(m.visible){const a=i*2.4,v=1+(i%4)*.6;Object.assign(m,{x:this.burst.x+Math.cos(a)*age*v,z:this.burst.z+Math.sin(a)*age*v,y:this.burst.y+age*(2+i%3)-age*age*2,ry:time*4,rz:time*3,opacity:Math.max(0,1-age/2.2)});}});
  return moved;
 }
}

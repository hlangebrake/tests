/** Original low-poly scenery built entirely with local geometry. */
import {Geometry} from './engine.js';
const wood='#876446',dark='#514a3d',gold='#efc76e',cream='#f3dfae',green='#76a87b';
export function pony(g=new Geometry(),x=0,y=0,z=0,s=1,color='#b58d65',deer=false){
 g.box(x,y+1.02*s,z,1.35*s,.77*s,.62*s,color);
 for(const a of [-.45,.46])for(const b of [-.22,.23]){g.box(x+a*s,y+.4*s,z+b*s,.16*s,.8*s,.17*s,color);g.box(x+a*s,y+.09*s,z+b*s,.19*s,.17*s,.23*s,dark);}
 g.box(x+.56*s,y+1.5*s,z,.36*s,1.0*s,.44*s,color,0,0,-.2);
 g.box(x+.73*s,y+1.98*s,z,.68*s,.5*s,.47*s,color);
 g.box(x+1.04*s,y+1.86*s,z,.27*s,.27*s,.48*s,'#d7bc94');
 for(const zz of [-.17,.17]){g.box(x+.56*s,y+2.34*s,z+zz*s,.14*s,.4*s,.13*s,color,0,0,.1);g.box(x+.84*s,y+2.08*s,z+zz*1.42*s,.06*s,.07*s,.05*s,dark);}
 g.box(x+.36*s,y+1.8*s,z,.18*s,.65*s,.45*s,'#72563f');g.box(x-.79*s,y+.91*s,z,.18*s,.87*s,.19*s,'#72563f',0,0,-.25);
 if(deer){for(const dz of [-.17,.17]){g.box(x+.46*s,y+2.58*s,z+dz*s,.075*s,.67*s,.075*s,wood,0,0,.24);g.box(x+.40*s,y+2.72*s,z+dz*s,.3*s,.07*s,.07*s,wood);}for(const dx of [-.4,0,.3])g.box(x+dx*s,y+1.27*s,z+.32*s,.08*s,.07*s,.04*s,cream);}
 return g;
}
export function resident(g=new Geometry(),x=0,y=0,z=0,s=1,color='#668f85'){
 for(const dx of [-.18,.18])g.box(x+dx*s,y+.34*s,z,.23*s,.65*s,.3*s,dark);
 g.box(x,y+.95*s,z,.74*s,.75*s,.47*s,color);g.box(x,y+1.62*s,z,.69*s,.66*s,.62*s,'#e9c29a');
 g.cylinder(x,y+2*s,z,.5,.18,.22,cream,7);g.cylinder(x,y+2.16*s,z,.29,.25,.28,cream,7);
 for(const dx of [-.13,.13])g.box(x+dx*s,y+1.65*s,z+.32*s,.07*s,.09*s,.04*s,dark);
 for(const dx of [-.46,.46])g.box(x+dx*s,y+.9*s,z,.18*s,.63*s,.21*s,color,0,0,dx*.6);
 return g;
}

function littleDragon(g,x,y,z,s=.75){
 g.sphere(x,y+.72*s,z,.68*s,.82*s,.5*s,'#9fbfaf',8,4);g.sphere(x+.19*s,y+1.5*s,z,.5*s,.47*s,.45*s,'#acccb4',7,4);
 for(const side of [-1,1]){g.box(x-.11*s,y+.22*s,z+side*.37*s,.35*s,.3*s,.33*s,'#809d97');g.box(x+.35*s,y+1.6*s,z+side*.32*s,.07*s,.12*s,.06*s,dark);g.tri([x-.25*s,y+1.2*s,z+side*.4*s],[x-1.25*s,y+1.65*s,z+side*1.05*s],[x-.75*s,y+.7*s,z+side*.7*s],'#b7a6cd');g.cylinder(x+.04*s,y+2*s,z+side*.22*s,.09*s,0,.4*s,gold,5);}
 g.box(x+.57*s,y+1.4*s,z,.5*s,.28*s,.5*s,'#bad4af');return g;
}
function goat(g,x,y,z,s=.8){
 g.box(x,y+.7*s,z,1.3*s,.75*s,.65*s,'#ddd5bb');for(const a of [-.45,.45])for(const b of [-.22,.22])g.box(x+a*s,y+.23*s,z+b*s,.15*s,.46*s,.17*s,dark);
 g.box(x+.62*s,y+1.04*s,z,.45*s,.67*s,.48*s,'#cbbfa8');g.box(x+.85*s,y+1.1*s,z,.3*s,.3*s,.45*s,'#ddd5bb');
 for(const dz of [-.18,.18]){g.cylinder(x+.48*s,y+1.64*s,z+dz*s,.07*s,.015*s,.55*s,'#82725a',5);g.box(x+.82*s,y+1.24*s,z+dz*1.4*s,.06*s,.075*s,.05*s,dark);}return g;
}
export function beeGeometry(){const g=new Geometry();g.sphere(0,0,0,.14,.10,.1,'#e1bd60',6,3);g.box(0,0,.09,.07,.13,.03,dark);for(const side of [-1,1])g.sphere(0,.07,side*.13,.1,.035,.09,'#f2efd3',5,2);return g;}

function fence(g,x,z,length=4){for(let i=0;i<=length;i+=2)g.box(x+i,.66,z,.15,1.3,.16,wood);for(const h of [.5,1])g.box(x+length/2,h,z,length,.12,.13,wood);}
function flowers(g,x,y,z,n=6){for(let i=0;i<n;i++){const a=i*2.399,rr=.4+(i%3)*.28,xx=x+Math.cos(a)*rr,zz=z+Math.sin(a)*rr;g.box(xx,y+.21,zz,.04,.42,.04,green);g.sphere(xx,y+.47,zz,.17,.13,.17,['#edc87c','#d598b0','#afcbe0'][i%3],5,3);}}
export function specialModel(kind,done,region){
 const g=new Geometry();
 if(kind==='masterstone'){
  g.cylinder(0,.27,0,1.45,1.3,.5,'#819c93',7);g.cylinder(0,.72,0,.95,.85,.45,gold,7);
  g.cylinder(0,1.9,0,.62,.50,1.9,done?'#b9e4c3':'#c3a0d8',6,.2);g.cylinder(0,3.13,0,.5,0,.55,done?'#f6de95':'#c7b2e0',6,.2);
  for(let i=0;i<5;i++){const a=i*Math.PI*2/5;g.cylinder(Math.cos(a)*1.45,1.15,Math.sin(a)*1.45,.16,.03,.6,gold,5);}
  return g;
 }
 if(kind==='stable'){
  for(const x of [-1.9,1.9])for(const z of [-1.4,1.4])g.box(x,1.5,z,.2,3,.2,wood);
  g.box(0,.72,-1.4,4,.12,.16,wood);g.box(0,1.42,-1.4,4,.12,.16,wood);
  if(done){g.roof(0,3.0,0,4.65,1.05,3.5,'#829d76');pony(g,-.7,0,.15,.85);pony(g,2.2,0,1.4,.65,'#dbc29a');g.box(-.7,.48,1.72,1.2,.4,.6,wood);g.box(-.7,.71,1.72,1.05,.05,.5,'#b5c779');}
  else{g.box(0,.25,0,3.4,.22,.5,wood);g.box(1,.42,.4,1.2,.3,.5,cream);}
  fence(g,-2.2,2.6,4);return g;
 }
 if(kind==='lumber'){
  for(let i=0;i<(done?6:2);i++){const log=new Geometry().cylinder(0,0,0,.34,.34,2.4,wood,8).cylinder(0,1.21,0,.3,.3,.025,'#c4a779',8);g.append(log,(i%3-1)*.76,.43+Math.floor(i/3)*.66,0,Math.PI/2,0,0);}
  g.cylinder(1.8,.4,1,.58,.52,.8,'#8b7453',9);g.box(1.8,1.0,1,.14,1.2,.14,dark,0,0,-.25);g.box(1.6,1.43,1,.62,.44,.14,'#b4c5c0');resident(g,-2,0,.9,.85,'#a48960');return g;
 }
 if(kind==='deer'){
  g.cylinder(0,.17,0,1.6,1.5,.35,wood,9);flowers(g,-1,0,1,4);
  if(done){pony(g,0,.3,0,.88,'#be9770',true);pony(g,2,0,.9,.52,'#bf9e75',true);}else g.box(0,.65,0,.9,.7,.15,cream);return g;
 }
 if(kind==='trail'){
  for(let i=0;i<8;i++){g.cylinder(Math.sin(i*.7)*1.6,.14,(i-3)*.55,.4,.38,.25,done?'#ead095':'#a7b29c',7);if(done&&i%2===0)flowers(g,Math.sin(i*.7)*1.6+1,.1,(i-3)*.55,3);}return g;
 }
 if(kind==='cart'||kind==='cartblock'){
  g.box(0,.85,0,3.2,.25,1.8,wood);for(const z of [-.8,.8])g.box(0,1.3,z,3.2,.7,.13,wood);
  for(const x of [-1,1])for(const z of [-1,1]){g.append(new Geometry().cylinder(0,0,0,.45,.45,.2,dark,9),x,.48,z,Math.PI/2,0,0);g.box(x,.48,z,.1,.65,.27,cream);}
  if(done){for(let i=0;i<4;i++)g.box((i%2-.5)*1.0,1.55+(i>1?.65:0),0,.85,.75,.85,cream);pony(g,2.8,0,0,.72);}return g;
 }
 if(kind==='feeding'){
  g.box(0,.9,0,3.6,.22,1.4,wood);for(const x of [-1.5,1.5])g.box(x,.43,0,.2,.85,.6,wood);
  for(let i=0;i<4;i++){g.cylinder((i-1.5)*.8,1.18,0,.26,.35,.35,done?'#afc081':'#bbbea1',9);if(done)g.sphere((i-1.5)*.8,1.35,0,.22,.17,.22,'#dcba79',6,3);}
  resident(g,-2.2,0,-.3,.8,'#b09167');if(done)pony(g,1.9,0,1.6,.58,'#d1b79b');return g;
 }
 if(kind==='camp'){
  g.roof(-.8,.1,0,3.2,2.6,3.1,done?'#c2a378':'#a5ad96');g.box(-.8,.8,1.57,.8,1.55,.06,dark);
  for(let i=0;i<6;i++){const a=i*Math.PI/3;g.sphere(2+Math.cos(a)*.75,.2,1+Math.sin(a)*.75,.25,.22,.25,'#9fa894',6,3);}
  if(done){g.cylinder(2,.55,1,.35,.02,.9,'#e4ae61',6);resident(g,1,0,-1,.75,'#798caa');resident(g,3.1,0,.6,.68,'#a27974');}return g;
 }
 if(kind==='apiary'){
  for(let i=0;i<3;i++){g.box((i-1)*1.65,.5,0,1.2,.95,1.05,done?'#d9b36c':'#a5a48a');g.roof((i-1)*1.65,1,0,1.4,.6,1.2,done?'#899d7a':'#a0a391');g.box((i-1)*1.65,.38,.55,.48,.12,.08,dark);if(done)flowers(g,(i-1)*1.65,0,1.5,4);}return g;
 }
 if(kind==='crystals'){
  for(let i=0;i<(done?7:3);i++){const x=Math.sin(i*2.1)*1.4,z=Math.cos(i*2.1)*1.2,h=.7+(i%3)*.6;g.cylinder(x,h/2,z,.28,.23,h,done?['#c5add9','#92c9c6','#cce0b1'][i%3]:'#9a9ca7',5);g.cylinder(x,h+.2,z,.23,0,.4,done?'#e2d3e9':'#adaeb4',5);}return g;
 }
 return null;
}
export function barrierParts(kind){
 const frame=new Geometry(),left=new Geometry(),right=new Geometry();
 if(kind==='gate'||kind==='runes'){
  for(const x of [-3,3]){frame.box(x,1.85,0,.5,3.7,.6,kind==='runes'?'#a494ba':wood);frame.cylinder(x,3.92,0,.39,0,.65,gold,5);}
  frame.box(0,3.4,0,6.3,.43,.55,kind==='runes'?'#a798c3':wood);
  for(let i=0;i<5;i++){left.box(.35+i*.5,1.55,0,.17,2.95,.15,kind==='runes'?'#d8c5e7':'#b29a70');right.box(-.35-i*.5,1.55,0,.17,2.95,.15,kind==='runes'?'#d8c5e7':'#b29a70');}
  left.box(1.5,1.0,0,2.9,.2,.2,gold);right.box(-1.5,1.0,0,2.9,.2,.2,gold);
 }else if(kind==='log'){
  left.append(new Geometry().cylinder(0,0,0,.6,.57,6,wood,8),2.7,.62,0,0,0,Math.PI/2);
  // The meshes use low-poly rectangular trunk sections to make the fallen orientation unmistakable.
  left.box(2.7,.6,0,6.0,1.0,1.1,wood);left.box(3,1.1,.25,.8,.65,.6,'#73936b');right.box(-1.2,.65,0,2.4,.95,1.0,wood);
 }else if(kind==='rocks'){
  for(let i=0;i<5;i++)left.sphere(i*1.2,.55+(i%2)*.3,0,.83,1.1,.8,'#9ba6a0',6,3);right.sphere(-1.2,.65,.1,1.2,1.1,.85,'#b0b5a1',6,3);
 }else if(kind==='monsters'){
  for(let i=0;i<3;i++){const x=.7+i*1.8;left.sphere(x,.83,0,.72,.83,.67,['#97b9ae','#baabc9','#b7c68f'][i],8,4);for(const dx of [-.2,.2])left.box(x+dx,.99,.63,.1,.14,.055,dark);left.box(x,.69,.66,.21,.06,.05,dark);}
  right.sphere(-.9,.8,0,.8,.8,.7,'#a9c9b1',8,4);
 }else if(kind==='cartblock'){
  left.append(specialModel('cart',false),3,0,0);left.box(.5,.6,0,1,1.2,1,cream);right.box(-.5,.6,0,1,1.2,1,wood);
 }else{
  for(let i=0;i<4;i++){left.box(.6+i*1.35,.65+(i%2)*.45,0,1.2,1.3,1.1,cream);left.box(.6+i*1.35,.65+(i%2)*.45,.58,.12,1.22,.08,wood);}
  right.box(-.8,.62,0,1.5,1.2,1.2,wood);
 }
 return {frame,left,right};
}
export function rainbowGeometry(){
 const g=new Geometry(),colors=['#e8a693','#efc778','#e0d89c','#9fc9a6','#99c6d0','#b6a5d0'];
 for(let j=0;j<colors.length;j++)for(let i=0;i<28;i++){
  const a=i*Math.PI/28,b=(i+1)*Math.PI/28,r=5.8-j*.21,rr=r-.18;
  g.quad([Math.cos(a)*r,Math.sin(a)*r,0],[Math.cos(b)*r,Math.sin(b)*r,0],[Math.cos(b)*rr,Math.sin(b)*rr,0],[Math.cos(a)*rr,Math.sin(a)*rr,0],colors[j]);
 }
 return g;
}
export function areaAdornment(r,height,canPlace=()=>true){
 const g=new Geometry(),positions=[[-10,8],[9,8],[-10,-8],[10,-9],[-2,11],[5,10],[-9,2],[8,-9]];
 for(let i=0;i<positions.length;i++){const [dx,dz]=positions[i],x=r.x+dx,z=r.z+dz;if(!canPlace(x,z))continue;flowers(g,x,height(x,z),z,10);if(i%2===0){g.box(x,height(x,z)+1.15,z,.1,2.3,.1,wood);g.sphere(x,height(x,z)+2.4,z,.25,.3,.25,gold,7,4);}}
 const x=r.x+9,z=r.z+8;
 if(r.id==='cliffs')goat(g,x,height(x,z),z,.8);else if(r.id==='cave'||r.id==='castle')littleDragon(g,x,height(x,z),z,.8);else{pony(g,x,height(x,z),z,.62,r.id==='forest'?'#c29e76':r.id==='harbor'?'#99c6c8':'#d7bb92',r.id==='forest');if(r.id==='mill')for(const side of [-1,1])g.tri([x-.2,height(x,z)+1,z+side*.2],[x-.65,height(x,z)+1.8,z+side*1.0],[x+.4,height(x,z)+1,z+side*.65],'#eae2c2');}
 resident(g,r.x-8,height(r.x-8,r.z+8),r.z+8,.72,r.id==='cave'?'#a08caf':'#b89576');
 return g;
}
export function biomeAccents(g,r,height){
 const at=(x,z)=>height(r.x+x,r.z+z);
 if(r.id==='mill'){
  for(let i=0;i<5;i++)for(let j=0;j<5;j++){const x=r.x-9+i*.6,z=r.z-10+j*.6,y=height(x,z);g.box(x,y+.42,z,.05,.84,.05,'#bcad63');g.cylinder(x,y+.9,z,.16,.11,.28,'#e7cb77',5);}
 }else if(r.id==='harbor'){
  for(let i=0;i<7;i++){const x=r.x-4+i*1.2,z=r.z+12,y=height(x,z);g.box(x,y+.1,z,1.1,.17,2.0,wood);g.cylinder(x,y+.7,z+1.1,.13,.13,1.4,wood,6);}
  for(let i=0;i<7;i++){const x=r.x+10+(i%2)*.4,z=r.z+6+i*.65,y=height(x,z);g.box(x,y+.8,z,.05,1.6,.05,'#8f9e72');g.cylinder(x,y+1.55,z,.12,.12,.46,'#a68b5e',6);}
 }else if(r.id==='forest'){
  for(let i=0;i<12;i++){const x=r.x-12+(i%4)*.65,z=r.z+2+Math.floor(i/4)*.7,y=height(x,z);g.cylinder(x,y+.28,z,.08,.08,.5,cream,5);g.sphere(x,y+.6,z,.33,.21,.3,['#c59983','#9faccb'][i%2],7,3);}
 }else if(r.id==='cliffs'){
  for(let i=0;i<5;i++){const x=r.x+11,z=r.z-8+i*2.5,y=height(x,z);g.sphere(x,y+.65,z,.8,1.3,.75,'#a0aaa2',6,3);g.box(x,y+1.8,z,.1,.65,.1,wood);}
 }else if(r.id==='market'){
  for(let i=0;i<7;i++){const x=r.x-8+i*2.4,z=r.z-11,y=height(x,z);g.box(x,y+2.5,z,.07,5,.07,wood);if(i<6)g.tri([x,y+4.4,z],[x+2.4,y+4.4,z],[x+1.2,y+3.7,z],['#dca37e','#89afa3','#e5c985'][i%3]);}
 }else if(r.id==='cave'){
  for(let i=0;i<8;i++){const x=r.x+10+(i%2)*.6,z=r.z-8+i*1.6,y=height(x,z);g.cylinder(x,y+.65,z,.2,.14,1.3,'#a298b8',5);g.cylinder(x,y+1.4,z,.14,0,.2,'#c9b6dc',5);}
 }
}

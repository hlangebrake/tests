/**
 * Kommaland's small dependency-free WebGL renderer.
 * Real depth-buffered 3D, orthographic camera, flat lighting and atmospheric fog.
 * Geometry and art are generated locally, with no remote assets or libraries.
 */
export const V = {
 add:(a,b)=>a.map((v,i)=>v+b[i]), sub:(a,b)=>a.map((v,i)=>v-b[i]),
 mul:(a,s)=>a.map(v=>v*s), dot:(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),
 cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],
 norm:a=>{const d=Math.hypot(...a)||1;return a.map(v=>v/d);}
};
export const M4 = {
 identity:()=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),
 multiply:(a,b)=>{const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o;},
 transform:(m,v)=>{const o=[0,0,0,0];for(let r=0;r<4;r++)o[r]=m[r]*v[0]+m[4+r]*v[1]+m[8+r]*v[2]+m[12+r]*(v[3]??1);return o;},
 ortho:(l,r,b,t,n,f)=>new Float32Array([2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1]),
 lookAt:(eye,target)=>{const z=V.norm(V.sub(eye,target)),x=V.norm(V.cross([0,1,0],z)),y=V.cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-V.dot(x,eye),-V.dot(y,eye),-V.dot(z,eye),1]);},
 model:(x=0,y=0,z=0,rx=0,ry=0,rz=0,s=1)=>{
  const cx=Math.cos(rx),sx=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry),cz=Math.cos(rz),sz=Math.sin(rz);
  const ax=new Float32Array([1,0,0,0,0,cx,sx,0,0,-sx,cx,0,0,0,0,1]);
  const ay=new Float32Array([cy,0,-sy,0,0,1,0,0,sy,0,cy,0,0,0,0,1]);
  const az=new Float32Array([cz,sz,0,0,-sz,cz,0,0,0,0,1,0,0,0,0,1]);
  const m=M4.multiply(ay,M4.multiply(ax,az));for(let i=0;i<12;i++)m[i]*=s;m[12]=x;m[13]=y;m[14]=z;return m;
 }
};
export function rgb(hex,alpha=1) {
 if(Array.isArray(hex))return hex.length===4?hex:[...hex,alpha];
 const h=typeof hex==='number'?hex:parseInt(hex.replace('#',''),16);
 return [(h>>16&255)/255,(h>>8&255)/255,(h&255)/255,alpha];
}
export class Geometry {
 constructor(){this.data=[];}
 tri(a,b,c,color) {
  const n=V.norm(V.cross(V.sub(b,a),V.sub(c,a))), col=rgb(color);
  for(const p of [a,b,c])this.data.push(...p,...n,...col);
  return this;
 }
 quad(a,b,c,d,color){return this.tri(a,b,c,color).tri(a,c,d,color);}
 box(x,y,z,w,h,d,color,ry=0) {
  const co=Math.cos(ry),si=Math.sin(ry);
  const pts=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(p=>[x+p[0]*w*.5*co+p[2]*d*.5*si,y+p[1]*h*.5,z-p[0]*w*.5*si+p[2]*d*.5*co]);
  for(const f of [[4,5,6,7],[1,0,3,2],[0,4,7,3],[5,1,2,6],[3,7,6,2],[0,1,5,4]])this.quad(...f.map(i=>pts[i]),color);
  return this;
 }
 cylinder(x,y,z,r1,r2,h,color,sides=10,phase=0) {
  for(let i=0;i<sides;i++){
   const a=phase+i*Math.PI*2/sides,b=phase+(i+1)*Math.PI*2/sides;
   const p=[x+Math.cos(a)*r1,y-h/2,z+Math.sin(a)*r1],q=[x+Math.cos(b)*r1,y-h/2,z+Math.sin(b)*r1],s=[x+Math.cos(a)*r2,y+h/2,z+Math.sin(a)*r2],t=[x+Math.cos(b)*r2,y+h/2,z+Math.sin(b)*r2];
   this.quad(q,p,s,t,color);if(r2>0)this.tri([x,y+h/2,z],t,s,color);if(r1>0)this.tri([x,y-h/2,z],p,q,color);
  }return this;
 }
 sphere(x,y,z,rx,ry,rz,color,sides=8,rings=5) {
  const p=(a,b)=>[x+rx*Math.sin(a)*Math.cos(b),y+ry*Math.cos(a),z+rz*Math.sin(a)*Math.sin(b)];
  for(let j=0;j<rings;j++)for(let i=0;i<sides;i++){
   const a=j*Math.PI/rings,b=(j+1)*Math.PI/rings,c=i*2*Math.PI/sides,d=(i+1)*2*Math.PI/sides;
   this.quad(p(a,c),p(a,d),p(b,d),p(b,c),color);
  }return this;
 }
 disc(x,y,z,rx,rz,color,sides=24){for(let i=0;i<sides;i++){const a=i*2*Math.PI/sides,b=(i+1)*2*Math.PI/sides;this.tri([x,y,z],[x+rx*Math.cos(b),y,z+rz*Math.sin(b)],[x+rx*Math.cos(a),y,z+rz*Math.sin(a)],color);}return this;}
 roof(x,y,z,w,h,d,color){
  const a=[x-w/2,y,z-d/2],b=[x+w/2,y,z-d/2],c=[x,y+h,z-d/2],e=[x-w/2,y,z+d/2],f=[x+w/2,y,z+d/2],g=[x,y+h,z+d/2];
  this.tri(a,c,b,color).tri(e,f,g,color).quad(a,e,g,c,color).quad(c,g,f,b,color);return this;
 }
 append(other,x=0,y=0,z=0,rx=0,ry=0,rz=0,scale=1){
  const m=M4.model(x,y,z,rx,ry,rz,scale),d=other.data;
  for(let i=0;i<d.length;i+=10){const p=M4.transform(m,[...d.slice(i,i+3),1]),n=V.norm(M4.transform(m,[...d.slice(i+3,i+6),0]).slice(0,3));this.data.push(...p.slice(0,3),...n,...d.slice(i+6,i+10));}
  return this;
 }
}
const VS=`
 precision highp float;
 attribute vec3 aPos; attribute vec3 aNormal; attribute vec4 aColor;
 uniform mat4 uVP; uniform mat4 uModel; uniform mediump float uTime; uniform mediump float uWater;
 varying mediump vec3 vWorld; varying mediump vec3 vNormal; varying mediump vec4 vColor; varying mediump float vLocalY;
 void main(){vec4 world=uModel*vec4(aPos,1.0);if(uWater>0.5){world.y+=sin(world.x*.12+uTime*.6)*.045+cos(world.z*.15+uTime*.4)*.025;}
 vLocalY=aPos.y;vWorld=world.xyz;vNormal=normalize(mat3(uModel)*aNormal);vColor=aColor;gl_Position=uVP*world;}
`;
const FS=`
 precision mediump float;
 uniform float uReveal; uniform vec3 uCamera; uniform vec3 uFog; uniform float uOpacity; uniform float uGlow; uniform float uWater; uniform float uTime;
 varying mediump vec3 vWorld; varying mediump vec3 vNormal; varying mediump vec4 vColor; varying mediump float vLocalY;
 void main(){if(vLocalY>uReveal)discard;vec3 n=normalize(vNormal);float sun=max(dot(n,normalize(vec3(-.55,1.,.65))),0.0);
 float hemi=.5+.5*n.y;vec3 light=mix(vec3(.51,.60,.63),vec3(.83,.86,.75),hemi)+sun*vec3(.26,.23,.19);
 vec3 col=vColor.rgb*mix(light,vec3(1.0),uGlow);
 if(uWater>.5){float wave=sin(vWorld.x*.24+vWorld.z*.17+uTime*.7)*sin(vWorld.z*.33-uTime*.3);col+=wave*.017;}
 float fog=smoothstep(88.,190.,distance(uCamera,vWorld));col=mix(col,uFog,fog);
 gl_FragColor=vec4(col,vColor.a*uOpacity);}
`;
export class Renderer {
 constructor(canvas) {
  this.canvas=canvas;
  this.gl=canvas.getContext('webgl',{alpha:false,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:false})||canvas.getContext('experimental-webgl');
  if(!this.gl)throw new Error('WebGL ist auf diesem Gerät nicht verfügbar. Bitte aktiviere Hardwarebeschleunigung oder nutze einen aktuellen Safari-Browser.');
  const g=this.gl;this.meshes=[];
  const shader=(type,source)=>{const s=g.createShader(type);g.shaderSource(s,source);g.compileShader(s);if(!g.getShaderParameter(s,g.COMPILE_STATUS))throw new Error(g.getShaderInfoLog(s));return s;};
  const p=g.createProgram();g.attachShader(p,shader(g.VERTEX_SHADER,VS));g.attachShader(p,shader(g.FRAGMENT_SHADER,FS));g.linkProgram(p);if(!g.getProgramParameter(p,g.LINK_STATUS))throw new Error(g.getProgramInfoLog(p));this.program=p;g.useProgram(p);
  this.a={};for(const name of ['aPos','aNormal','aColor'])this.a[name]=g.getAttribLocation(p,name);
  this.u={};for(const name of ['uVP','uModel','uCamera','uFog','uOpacity','uGlow','uTime','uWater','uReveal'])this.u[name]=g.getUniformLocation(p,name);
  g.enable(g.DEPTH_TEST);g.depthFunc(g.LEQUAL);g.enable(g.BLEND);g.blendFunc(g.SRC_ALPHA,g.ONE_MINUS_SRC_ALPHA);
  this.fog=rgb('#b8d9d0').slice(0,3);g.clearColor(...this.fog,1);
  this.target=[0,1,24];this.eye=[30,43,59];this.height=39;this.dpr=1.5;this.right=[.759,0,-.651];this.up=[-.45,.75,-.525];this.forward=V.norm(V.sub(this.target,this.eye));this.resize();
 }
 mesh(geometry,options={}){
  const g=this.gl,b=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,b);g.bufferData(g.ARRAY_BUFFER,new Float32Array(geometry.data),g.STATIC_DRAW);
  const mesh={buffer:b,count:geometry.data.length/10,x:0,y:0,z:0,rx:0,ry:0,rz:0,scale:1,opacity:1,reveal:1000,glow:0,water:0,visible:true,depthWrite:true,...options};this.meshes.push(mesh);return mesh;
 }
 resize(){const c=this.canvas;this.width=c.clientWidth;this.h=c.clientHeight;const d=Math.min(devicePixelRatio||1,this.dpr);c.width=Math.round(this.width*d);c.height=Math.round(this.h*d);this.gl.viewport(0,0,c.width,c.height);this.updateCamera();}
 updateCamera(){
  this.aspect=this.width/this.h;this.forward=V.norm(V.sub(this.target,this.eye));this.right=V.norm(V.cross(this.forward,[0,1,0]));this.up=V.cross(this.right,this.forward);
  const half=this.height/2;this.vp=M4.multiply(M4.ortho(-half*this.aspect,half*this.aspect,-half,half,.1,300),M4.lookAt(this.eye,this.target));
 }
 setCamera(target){this.target=target;this.eye=V.add(target,[30,42,37]);this.updateCamera();}
 project(x,y,z){const p=M4.transform(this.vp,[x,y,z,1]);return {x:(p[0]+1)*this.width/2,y:(1-p[1])*this.h/2,visible:p[2]>-1&&p[2]<1&&Math.abs(p[0])<1.15&&Math.abs(p[1])<1.15};}
 screenToGround(sx,sy,heightAt){
  const a=(sx/this.width-.5)*this.height*this.aspect,b=(.5-sy/this.h)*this.height;
  const origin=V.add(this.eye,V.add(V.mul(this.right,a),V.mul(this.up,b)));
  let y=1.3,p;for(let i=0;i<5;i++){const t=(y-origin[1])/this.forward[1];p=V.add(origin,V.mul(this.forward,t));y=heightAt(p[0],p[2]);}return {x:p[0],z:p[2]};
 }
 render(time){
  const g=this.gl;g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);g.useProgram(this.program);
  g.uniformMatrix4fv(this.u.uVP,false,this.vp);g.uniform3fv(this.u.uCamera,this.eye);g.uniform3fv(this.u.uFog,this.fog);g.uniform1f(this.u.uTime,time);
  for(const m of this.meshes){if(!m.visible||!m.count)continue;
   g.bindBuffer(g.ARRAY_BUFFER,m.buffer);for(const [name,size,offset] of [['aPos',3,0],['aNormal',3,12],['aColor',4,24]]){g.enableVertexAttribArray(this.a[name]);g.vertexAttribPointer(this.a[name],size,g.FLOAT,false,40,offset);}
   g.depthMask(m.depthWrite);g.uniformMatrix4fv(this.u.uModel,false,M4.model(m.x,m.y,m.z,m.rx,m.ry,m.rz,m.scale));g.uniform1f(this.u.uOpacity,m.opacity);g.uniform1f(this.u.uGlow,m.glow);g.uniform1f(this.u.uWater,m.water);g.uniform1f(this.u.uReveal,m.reveal);g.drawArrays(g.TRIANGLES,0,m.count);
  }g.depthMask(true);
 }
 destroy(){for(const m of this.meshes)this.gl.deleteBuffer(m.buffer);this.gl.deleteProgram(this.program);}
}

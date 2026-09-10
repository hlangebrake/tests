/** One continuous mainland. Clearings and woodland paths define the walkable space.
 * The same polygons drive the terrain, collision, navigation and paper map. */
import {REGIONS, PATHS, regionById} from './content.js';
export const OUTLINE=[[-66,65],[-61,48],[-65,29],[-61,8],[-64,-12],[-56,-32],[-55,-58],[-39,-80],[-10,-86],[20,-86],[51,-75],[75,-52],[86,-22],[83,12],[77,41],[65,60],[37,66],[7,68],[-22,66],[-44,69]];
const SHAPES={
 village:[[-17,12],[-16,3],[-18,-5],[-12,-14],[0,-17],[11,-14],[17,-7],[15,5],[17,13],[6,17],[-8,16]],
 forest:[[-13,9],[-16,0],[-12,-11],[-2,-15],[8,-12],[14,-4],[12,8],[4,12],[-5,13]],
 harbor:[[-14,8],[-12,-6],[-3,-13],[10,-12],[14,-3],[13,9],[7,14],[-5,13]],
 market:[[-15,7],[-14,-9],[-5,-14],[8,-14],[14,-6],[13,10],[4,13],[-6,12]],
 cliffs:[[-12,9],[-14,-3],[-11,-11],[-1,-13],[12,-10],[13,2],[9,12],[-2,14]],
 mill:[[-14,10],[-14,-4],[-8,-14],[5,-13],[14,-7],[16,4],[8,12],[-3,14]],
 cave:[[-12,10],[-14,0],[-10,-11],[0,-14],[10,-11],[14,-2],[12,10],[2,13]],
 castle:[[-14,10],[-14,-9],[-10,-15],[9,-15],[14,-7],[14,10],[4,14],[-7,13]]
};
export const CLEARINGS=REGIONS.map(r=>({id:r.id,points:SHAPES[r.id].map(([x,z])=>[x+r.x,z+r.z])}));
export function inside(x,z,points){let hit=false;for(let i=0,j=points.length-1;i<points.length;j=i++){
 const [ax,az]=points[i],[bx,bz]=points[j];if((az>z)!==(bz>z)&&x<(bx-ax)*(z-az)/(bz-az)+ax)hit=!hit;
}return hit;}
export function segmentDistance(x,z,a,b){const dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1)));return Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz);}
export function polygonDistance(x,z,points){let d=Infinity;for(let i=0;i<points.length;i++)d=Math.min(d,segmentDistance(x,z,points[i],points[(i+1)%points.length]));return (inside(x,z,points)?-1:1)*d;}
export const ROUTES=PATHS.map(([a,b],i)=>{const p=regionById(a),q=regionById(b),dx=q.x-p.x,dz=q.z-p.z,d=Math.hypot(dx,dz),bend=(i%2?1:-1)*Math.min(6,d*.13),cx=(p.x+q.x)/2-dz/d*bend,cz=(p.z+q.z)/2+dx/d*bend;
 const points=[];for(let j=0;j<=24;j++){const t=j/24,u=1-t;points.push([u*u*p.x+2*u*t*cx+t*t*q.x,u*u*p.z+2*u*t*cz+t*t*q.z]);}return {a,b,points};});
export function roadDistance(x,z){let d=Infinity;for(const route of ROUTES)for(let i=1;i<route.points.length;i++)d=Math.min(d,segmentDistance(x,z,route.points[i-1],route.points[i]));return d;}
export function clearingDistance(x,z){let d=Infinity;for(const c of CLEARINGS)d=Math.min(d,polygonDistance(x,z,c.points));return d;}
export function walkableLand(x,z,margin=0){if(!inside(x,z,OUTLINE))return false;return clearingDistance(x,z)<-.12-margin||roadDistance(x,z)<3.1-margin;}
export const onMainland=(x,z)=>inside(x,z,OUTLINE);
const smooth=(a,b,v)=>{const t=Math.max(0,Math.min(1,(v-a)/(b-a)));return t*t*(3-2*t);};
export function terrainHeight(x,z){
 // Broad slopes rather than circular plateaus. The south-west is a low coastline.
 return 1.35+2.9*smooth(4,62,x)*smooth(28,-15,z)+2.55*smooth(-7,-62,z)+.08*Math.sin(x*.09)*Math.sin(z*.1);
}
export function nearestRegion(x,z){let best=REGIONS[0],d=Infinity;for(const r of REGIONS){const v=Math.hypot(x-r.x,z-r.z);if(v<d){best=r;d=v;}}return best;}
export function mountainZone(x,z){return z<-76||x>76||(x<-51&&z<-23);}

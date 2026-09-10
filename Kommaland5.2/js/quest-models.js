/** Hand-built low-poly construction stages. Never alter tasks or collision footprints here. */
import {Geometry} from './engine.js';
import {resident} from './scenery.js';
const wood='#876446',dark='#5e4b39',cream='#f1dcb2',stone='#b6bda8',soil='#8b745b',teal='#648d7e',gold='#edbb63';
const TAU=Math.PI*2;

/** The existing progress record is authoritative. Reading alone earns no construction. */
export function questAppearance(q,state){
 if(state.completed[q.id])return {status:'COMPLETED',stage:2,solved:q.tasks.length,label:'Fertig'};
 const p=state.progress[q.id];
 if(!p)return {status:'NOT_STARTED',stage:0,solved:0,label:'Noch offen'};
 const solved=p.ready?q.tasks.length:Math.max(0,Math.min(q.tasks.length,p.step||0));
 return {status:'IN_PROGRESS',stage:solved>0?1:0,solved,label:p.ready?'Bereit zum Abschluss':`In Arbeit · ${solved}/${q.tasks.length}`};
}

// These notes are also used to build the shipped per-quest visual audit.
export const MODEL_STAGES={
 lantern:['Kurzer Pfostenrest; Laternengehäuse liegt am Boden.','Aufgerichteter Pfosten, offenes Laternenkreuz ohne Dach und Licht.','Vollständige, leuchtende Laterne.'],
 stones:['Wenige lose, schief liegende Messsteine; breite Lücken.','Mehrere gesetzte Messsteine, andere liegen noch lose.','Vollständiger heller Messweg.'],
 fountain:['Lücken im niedrigen Becken; Wassersäule und Schale liegen zerbrochen daneben.','Becken weitgehend geschlossen, Säule teilweise aufgerichtet; noch keine Schale und kein Wasser.','Geschlossenes Becken, hohe Schale und sichtbarer Wasserstrahl.'],
 garden:['Lückenhafte Beeteinfassung und ungepflanzte Erde.','Geschlossene Einfassung, einzelne kleine Keimlinge.','Viele ausgewachsene Pflanzen.'],
 house:['Nur Grundmauern mit großen Lücken; Dachbretter liegen neben der Baustelle.','Teilweise hohe Wände und offene Dachbalken; halbe Vorderwand, kein geschlossenes Dach.','Geschlossenes Haus mit rotem Dach, Kamin und Fenstern.'],
 crystal:['Niedriger unvollständiger Sockel mit liegenden Kristallstücken.','Sockel und kurzer aufrechter Kristallkern.','Hoher Kristall mit seitlichen Kristallen.'],
 stable:['Niedrige Pfosten, unverbundene Latten und zusammengelegtes Dachholz.','Stehender Rahmen und Rückwandstreben; kein Dach und leere Futterstelle.','Überdachter Stall mit Futtertrögen und zwei Ponys.'],
 statue:['Lückenhafte Sockelsteine, Statue in liegenden Einzelteilen.','Sockel teilweise aufgebaut, erst der Rumpf ist aufgerichtet.','Hoher vollständiger Sockel mit ganzer Statue.'],
 deer:['Umgestürzte Wegtafel und einzelne ungelegte Trittsteine.','Wegtafel aufgerichtet, Trittsteine gelegt; Lichtung noch leer.','Rehfamilie auf der erschlossenen Lichtung.'],
 trail:['Nur zwei Trittsteine; lose Steine und störendes Aststück.','Halb verlegter Weg mit sichtbaren Lücken.','Vollständiger geschwungener Trittsteinweg mit Blumen.'],
 tree:['Astgerippe mit nur wenigen Blättern.','Kleine Blattbüschel wachsen an mehreren Ästen.','Große belaubte Krone mit goldenen Früchten.'],
 boat:['Offene Bootsrippen, lose Planken und liegender Mast.','Geschlossener niedriger Rumpf, ein Teil des Masts aufgerichtet; noch kein Segel.','Hoch aufgerichteter Mast und zwei Segel.'],
 cart:['Schiefe gebrochene Ladefläche; ein Rad abseits, keine Fracht.','Repariertes Untergestell, einzelne Bordwand und eine Kiste.','Vollständiger beladener Wagen mit Pony.'],
 tank:['Nur wenige Fassdauben; offene große Lücke und gebrochener Reifen.','Mehr Dauben und Stützen, obere Wand noch lückenhaft; leer.','Geschlossener hoher Wassertank mit sichtbarem Wasser.'],
 clock:['Niedriger Sockel, zerlegte Uhr und liegende Gehäuseteile.','Gehäuserahmen ohne Dach; leeres Zifferblatt wird montiert.','Hohe fertige Hafenuhr mit Dach, Zeigern und Fahrplan.'],
 pavilion:['Bodenplatten, wenige niedrige Pfosten und lose Dachbalken.','Aufgestellter offener Rahmen, erste Rückwand; noch kein Dach.','Überdachter Lagerpavillon.'],
 stall:['Einzelne Beine und zerlegte Ladentheke; Markise zusammengelegt.','Theke und zwei Pfosten, halbe Markise und leere Auslage.','Ganze gestreifte Markise und reich gefüllter Marktstand.'],
 feeding:['Abgebaute Tischplatte, fehlende Beine und leere Näpfe am Boden.','Aufgerichtete halbe Ausgabetheke mit einem Napf.','Lange Futtertheke mit vollen Näpfen und Tier.'],
 banner:['Niedrige Pfostenreste und eingerollte Wimpel am Boden.','Ein hoher Pfosten, zweiter teilweise aufgerichtet; einige Wimpel erst am Pfosten.','Hohe gespannte Girlande mit allen Wimpeln.'],
 table:['Lose Tischplatte, umgekippte Bank, fehlende Beine.','Ein aufgebauter halber Tisch, eine Bank; noch nicht gedeckt.','Vollständige lange Festtafel mit Bänken und Geschirr.'],
 lumber:['Ein langer ungeschnittener Stamm und Arbeitsbock.','Erste zugeschnittene Holzstücke; ein Stamm noch auf dem Bock.','Hoher Stapel geschnittener Stämme.'],
 camp:['Zeltplane liegt flach; lose Stangen und unfertige Feuerstelle.','Eine Zelthälfte aufgespannt; andere Hälfte noch offen, Feuerstelle unentzündet.','Ganzes hohes Zelt, Feuer und Bewohner.'],
 bridge:['Große mittlere Lücke im Steg und umgefallene Geländerpfosten.','Mittlere Lücke geschlossen; nur ein Teil des Geländers steht.','Durchgehender Steg mit vollständigem Geländer.'],
 apiary:['Drei niedrige Bodenrahmen; lose Seitenbretter und abgenommene Dächer.','Ein Stock aufgerichtet, zwei noch offene Kästen.','Drei geschlossene Bienenstöcke mit Dächern, Blumen und Bienen.'],
 mushroom:['Abgeknickte Werkstatthalter, liegende Pilzdächer und leere Fläschchen.','Ein Pilzdach aufgestellt, zweites erst halbhoch.','Drei große Pilzdächer und gefüllte Werkstatt.'],
 crystals:['Liegende Kristallsplitter und kaum aufragende Spitzen.','Drei kleinere stehende Kristalle.','Sieben hohe farbige Kristalle.'],
 chest:['Geschlossene Truhe mit großem Schloss und Querbändern.','Ein Schloss gelöst; Deckel einen Spalt angehoben.','Weit geöffnete Truhe mit sichtbaren Goldmünzen.'],
 beacon:['Zerlegter niedriger Sockel und liegende Leuchtsteine.','Aufgebauter Sockel mit kurzem Kristallkern.','Großes hohes Sternenlicht.'],
 masterstone:['Niedriger ruhender Kristallkreis mit liegenden Splittern.','Kleiner aufrechter Meisterkristall im offenen Runenkreis.','Hoher Meisterkristall und dauerhaft geschmücktes Gebiet.'],
 slime:['Gesunder Schleimling mit drei großen Schutzrunen.','Gesunder Schleimling mit nur noch einer Schutzrune.','Befreundeter Schleimling ohne Schutzrunen.'],
 boss:['Gesunder Grottenhüter mit drei großen Schutzrunen.','Gesunder Grottenhüter mit nur noch einer Schutzrune.','Befreundeter Grottenhüter ohne Schutzrunen.'],
 dragon:['Gesunder Drache mit drei großen Schutzrunen.','Gesunder Drache mit nur noch einer Schutzrune.','Befreundeter Drache ohne Schutzrunen.'],
 // Retained library models, currently not assigned to a regular v4 quest.
 crates:['Zerlegte Kistenbretter.','Drei geschlossene Kisten.','Sechs Kisten und Laterne.'],
 gate:['Eingestürzter Rahmen.','Zwei Pfosten, noch kein Querbalken.','Vollständiger geöffneter Torbogen.'],
 lift:['Liegende Hubteile.','Erster aufgerichteter Pfosten und Plattform.','Fertiges Hubwerk.'],
 mill:['Niedrige, lückenhafte Mauerreste.','Halbhoher Mühlenturm ohne Dach und Flügel.','Vollständige Mühle mit laufenden Flügeln.'],
 tower:['Unvollständiger Mauerring.','Halbhoher Turm, keine Zinnen.','Hoher Turm mit Zinnen und Fahne.']
};

function beam(g,a,b,width=.18,color=wood){
 const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],length=Math.hypot(dx,dy,dz);
 const part=new Geometry().box(0,0,0,width,length,width,color);
 g.append(part,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,0,-Math.atan2(dz,dx),-Math.atan2(Math.hypot(dx,dz),dy));return g;
}
function planks(g,n=3,x=0,z=0){for(let i=0;i<n;i++)g.box(x+(i%2)*.23,.16+i*.1,z+(i%2)*.32,2.1,.15,.28,wood,.14+i*.38);}
function base(g,w=3.9,d=3.3){g.box(0,.1,0,w,.2,d,'#b7b698');}
function ring(g,count,total=12,r=1.5,y=.4,h=.45){for(let i=0;i<count;i++){const a=i*TAU/total;g.box(Math.cos(a)*r,y,Math.sin(a)*r,.75,h,.35,i%2?stone:'#c9cbb5',Math.PI/2-a);}}
function shard(g,x,y,z,h=.5,c='#a7a99c',lying=false){const p=new Geometry().cylinder(0,h/2,0,.23,.2,h,c,5).cylinder(0,h+.15,0,.2,0,.3,c,5);g.append(p,x,y,z,lying?Math.PI/2:0,lying?.5:0,0);}
function sprout(g,x,z,h=.4){g.box(x,h/2+.3,z,.045,h,.045,teal);g.sphere(x,h+.28,z,.19,.17,.14,'#90ac72',6,3);}
function flask(g,x,y,z,full=false){g.cylinder(x,y+.18,z,.18,.16,.36,full?'#b9dec5':'#a4afa4',7);g.cylinder(x,y+.46,z,.07,.07,.24,cream,6);}
function halfWalls(g,working,w=3.7,d=3.2){
 base(g,w+.5,d+.4);
 if(working){g.box(0,1.0,-d/2,w,1.8,.23,cream);g.box(-w/2,1.0,0,.23,1.8,d,cream);g.box(.9,.55,d/2,1.4,.8,.23,cream);g.box(w/2,.7,-.95,.23,1.1,1.3,cream);}
 else {g.box(-1.0,.42,-d/2,1.75,.6,.35,stone);g.box(-w/2,.42,-.9,.35,.6,1.5,stone);g.box(w/2,.32,1.0,.35,.4,.9,stone);g.box(-.8,.34,d/2,1.3,.4,.35,stone);}
}
function blankFrame(g,w=3.4,d=2.8,working=false){
 base(g,w+.5,d+.4);
 for(const [i,[x,z]]of [[-w/2,-d/2],[w/2,-d/2],[-w/2,d/2],[w/2,d/2]].entries()){
  const h=working?(i===3?1.75:2.65):(.35+(i%2)*.25);g.box(x,h/2+.2,z,.18,h,.18,wood);
 }
 if(working){g.box(0,2.85,-d/2,w+.15,.18,.18,wood);g.box(-w/2,2.85,0,.18,.18,d+.15,wood);beam(g,[-w/2,.55,-d/2],[w/2,2.6,-d/2],.12);}
 else planks(g,3,0,.45);
}

/** All positions are real changed geometry, not a tint, texture or whole-model opacity trick. */
export function constructionGeometry(kind,stage=0,region='village'){
 const g=new Geometry(),work=stage===1;
 if(kind==='house'){
  halfWalls(g,work);
  if(work){for(const x of [-1.9,1.9])for(const z of [-1.5,1.5])g.box(x,1.32,z,.15,2.25,.15,wood);for(const z of [-1.5,1.5]){beam(g,[-1.9,2.45,z],[0,3.7,z]);beam(g,[0,3.7,z],[1.9,2.45,z]);}g.box(0,3.7,0,.17,.17,3.3,wood);g.box(-1.0,1.25,1.71,.16,2.1,.15,wood);}
  planks(g,work?2:4,.2,.5);g.box(1.25,.27,1.85,.7,.3,.55,stone);return g;
 }
 if(kind==='fountain'){
  g.cylinder(0,.14,0,1.95,1.95,.25,stone,12);g.disc(0,.28,0,1.48,1.48,soil);
  ring(g,work?10:5,12,1.62,.5,.48);
  if(work)g.cylinder(0,.83,0,.36,.31,1.25,stone,8);
  else g.append(new Geometry().cylinder(0,0,0,.35,.28,1.65,stone,8),.4,.55,0,0,0,Math.PI/2);
  g.box(-.2,.38,1.0,.92,.15,.58,'#c8cbb2',.55);g.box(1.62,.27,1.15,.7,.34,.45,stone,.38);return g;
 }
 if(kind==='lantern'){
  base(g,1.5,1.5);
  if(work){g.cylinder(0,1.4,0,.1,.1,2.8,wood,7);for(const x of [-.24,.24])g.box(x,2.75,0,.065,.65,.07,wood);g.box(0,2.45,0,.62,.1,.5,wood);}
  else {g.cylinder(0,.43,0,.13,.1,.65,wood,7);beam(g,[-.6,.25,-.3],[.6,.25,.35],.15);g.box(.45,.37,.5,.45,.46,.45,wood,.55);g.box(.45,.39,.74,.29,.25,.06,'#a4ada0');}
  return g;
 }
 if(kind==='stones'||kind==='trail'){
  const total=kind==='stones'?(region==='village'?10:5):8,count=work?Math.ceil(total*.6):2;
  for(let i=0;i<count;i++){
   const x=kind==='stones'?(i-(total-1)/2)*(total===10?.48:.9):Math.sin(i*.7)*1.6;
   const z=kind==='stones'?Math.sin(i)*.4:(i-3)*.55;
   g.cylinder(x,.16,z,kind==='stones'&&total===10?.27:.4,.24,.26,work?stone:'#9f9d88',6);
  }
  for(let i=0;i<(work?1:3);i++)g.box(.6+i*.28,.18+i*.12,.7-i*.4,.55,.2,.45,stone,.4+i*.6);
  if(kind==='trail'&&!work)beam(g,[-1.4,.2,.45],[1.4,.25,.8],.26);return g;
 }
 if(kind==='garden'){
  g.box(0,.12,0,3.8,.24,3.2,soil);
  g.box(-1.93,.34,-.4,.16,.45,work?3.4:2.2,wood);g.box(.3,.34,-1.66,work?4:2.3,.45,.16,wood);
  if(work){g.box(1.93,.34,0,.16,.45,3.4,wood);g.box(0,.34,1.66,4,.45,.16,wood);for(let i=0;i<4;i++)sprout(g,(i%2-.5)*1.2,(Math.floor(i/2)-.5)*1.25,.27);}
  else planks(g,2,.35,.65);return g;
 }
 if(['crystal','statue','beacon'].includes(kind)){
  ring(g,work?8:4,8,1.0,.25,.4);
  if(work){g.cylinder(0,.55,0,1.05,1,.55,'#d6ceb0',8);g.cylinder(0,.97,0,.75,.72,.3,stone,8);if(kind==='statue')g.cylinder(0,1.48,0,.43,.3,.75,'#c4b28c',7);else shard(g,0,1.08,0,.62,'#b6b99f');}
  else {g.box(.1,.28,0,1.1,.35,.75,stone,.3);if(kind==='statue')g.sphere(.65,.38,1,.46,.4,.43,stone,7,4);else shard(g,.05,.32,.8,.8,'#a6aa99',true);}
  g.box(-.85,.22,1.0,.5,.3,.4,stone,.4);return g;
 }
 if(kind==='stable'||kind==='pavilion'){
  blankFrame(g,3.8,2.8,work);
  if(work){g.box(0,.9,-1.4,3.8,.12,.15,wood);g.box(0,1.5,-1.4,3.8,.12,.15,wood);g.box(-.8,.36,.9,1.25,.35,.6,wood);}
  else beam(g,[-1.3,.3,-1],[1.4,.3,1.2],.2);
  return g;
 }
 if(kind==='deer'){
  g.cylinder(0,.12,0,1.6,1.5,.24,soil,9);
  if(work){g.box(0,.72,-.5,.12,1.4,.12,wood);g.box(0,1.28,-.5,1.3,.55,.15,cream);for(let i=0;i<4;i++)g.cylinder((i-1.5)*.65,.24,.7,.27,.25,.2,stone,6);}
  else {beam(g,[-.9,.18,-.1],[.7,.3,.5],.13);g.box(.6,.35,.55,.8,.15,.65,cream,.6);g.box(-.9,.2,.7,.55,.35,.45,stone);}
  return g;
 }
 if(kind==='tree'){
  g.cylinder(0,1.7,0,.46,.29,3.4,wood,7);
  for(let i=0;i<5;i++){const a=i*TAU/5,x=Math.cos(a)*(work?1.8:1.65),z=Math.sin(a)*1.6,y=3.0+(i%2)*1.1;beam(g,[0,1.9,0],[x,y,z],.2);if(work||i===2)g.sphere(x,y+.2,z,work?.75:.38,work?.65:.28,work?.75:.38,'#779677',7,4);}
  g.box(0,.8,1.0,.9,.6,.2,wood);return g;
 }
 if(kind==='boat'){
  base(g,4.4,3.8);
  g.box(0,.34,0,2.6,.15,1.25,wood);
  if(work){g.cylinder(0,.79,0,1.3,1.65,.62,'#b18a60',6,.52);g.cylinder(0,1.65,0,.1,.09,1.9,wood,7);g.box(0,1.13,0,2.4,.12,1.5,cream);}
  else{for(const x of [-1,0,1]){beam(g,[x,.42,-.6],[x,.95,-1.1],.16);beam(g,[x,.42,.6],[x,.95,1.1],.16);}beam(g,[-1.5,.45,-.1],[1.5,.45,.55],.15);}
  planks(g,work?1:2,.4,1.25);return g;
 }
 if(kind==='cart'){
  if(work){g.box(0,.8,0,3.2,.25,1.8,wood);g.box(0,1.13,-.85,3.2,.55,.14,wood);g.box(-.65,1.26,0,.85,.68,.8,cream);}
  else{g.box(-.7,.43,0,1.5,.2,1.65,wood,.2);g.box(.85,.29,.3,1.4,.2,1.55,wood,-.2);planks(g,2,-.1,0);}
  for(const x of [-1,1])for(const z of [-1,1]){if(!work&&x===1&&z===1)continue;g.append(new Geometry().cylinder(0,0,0,.44,.44,.2,dark,9),x,.47,z,Math.PI/2,0,0);}
  if(!work)g.cylinder(1.15,.19,1.3,.45,.45,.2,dark,9);return g;
 }
 if(kind==='tank'){
  for(const x of [-.9,.9])for(const z of [-.9,.9])g.box(x,work?.67:.26,z,.2,work?1.3:.5,.2,wood);
  g.cylinder(0,work?.92:.43,0,1.22,1.22,.16,wood,12);
  const count=work?9:4;
  for(let i=0;i<count;i++){const a=i*TAU/12,h=work?(i<5?1.65:.8):.65;g.box(Math.cos(a)*1.14,(work?1.0:.5)+h/2,Math.sin(a)*1.14,.56,h,.16,wood,Math.PI/2-a);}
  planks(g,2,-.3,.8);return g;
 }
 if(kind==='clock'){
  base(g,2,2);
  if(work){g.box(-.67,1.4,-.45,.16,2.5,.16,wood);g.box(.67,1.4,-.45,.16,2.5,.16,wood);g.box(0,.8,0,1.4,1.15,1.1,cream);g.sphere(0,2.0,.45,.48,.48,.08,'#cac7aa',10,4);}
  else {g.box(-.55,.45,0,.3,.6,1.15,stone);g.box(.53,.35,-.4,.4,.4,.5,stone);g.append(new Geometry().cylinder(0,0,0,.52,.52,.12,gold,10),.2,.28,.45);planks(g,2,0,.25);}
  return g;
 }
 if(kind==='stall'){
  if(work){g.box(0,.8,0,3.5,1.4,1.75,wood);g.box(0,1.57,0,3.7,.2,1.9,cream);for(const x of [-1.7,1.7])g.box(x,1.8,-.75,.16,3.2,.16,wood);g.box(-.95,3.35,0,1.7,.15,2.2,teal);g.box(0,3.3,-.75,3.5,.15,.15,wood);g.box(-1.73,2.46,1.0,.13,1.72,.13,wood);}
  else{g.box(-1.6,.53,-.7,.2,.9,.2,wood);g.box(1.6,.26,-.7,.2,.38,.2,wood);g.box(0,.33,0,3.65,.2,1.2,wood,.1);g.box(.3,.49,.5,2.1,.14,.55,cream,.1);}
  return g;
 }
 if(kind==='feeding'||kind==='table'){
  const feeding=kind==='feeding';
  if(work){for(const x of [-1.5,0])for(const z of [-.55,.55])g.box(x,.5,z,.18,1,.18,wood);g.box(-.75,1.1,0,1.9,.22,feeding?1.4:2.2,wood);if(feeding)g.cylinder(-.9,1.4,0,.3,.34,.35,'#bcbba2',8);else g.box(-.7,.55,1.6,1.9,.16,.5,wood);}
  else {g.box(.1,.26,0,3.4,.18,feeding?1.25:1.85,wood,.15);beam(g,[-1.3,.12,-.5],[-.65,.55,-.5],.17);beam(g,[1.2,.2,-.4],[1.55,.72,-.4],.17);if(!feeding)g.box(.7,.25,1.25,2.5,.15,.5,wood,-.3);else for(let i=0;i<2;i++)g.cylinder(i-.5,.45,.4,.26,.33,.3,'#bcbba2',8);}
  if(feeding)resident(g,-2.2,0,-.3,.8,'#b09167');return g;
 }
 if(kind==='banner'){
  for(const x of [-2.2,2.2])g.cylinder(x,(work?(x<0?3.4:1.5):.45)/2,0,.12,.1,work?(x<0?3.4:1.5):.45,wood,6);
  if(work)for(let i=0;i<2;i++)g.tri([-2.15,2.8-i*.65,0],[-1.5,2.55-i*.65,0],[-2.15,2.3-i*.65,0],i?gold:teal);
  g.box(0,.23,0,1.8,.35,.9,wood);g.box(0,.47,0,1.45,.1,.72,cream);return g;
 }
 if(kind==='lumber'){
  g.cylinder(1.7,.4,1,.56,.51,.8,wood,8);
  if(work){for(let i=0;i<3;i++)g.append(new Geometry().cylinder(0,0,0,.3,.3,1.6,wood,8),i*.6-.7,.38,0,Math.PI/2,0,0);}
  else {g.append(new Geometry().cylinder(0,0,0,.48,.43,4.0,wood,8),0,.58,0,0,0,Math.PI/2);g.box(0,.4,0,.2,.8,1.4,dark);}
  resident(g,-2,0,.9,.85,'#a48960');return g;
 }
 if(kind==='camp'){
  const x=-.8;
  g.box(x,.12,0,3.2,.17,3.05,'#b8a58a');
  if(work){beam(g,[x-1.55,.18,-1.4],[x,2.65,-1.4],.1);beam(g,[x,2.65,-1.4],[x+1.55,.18,-1.4],.1);beam(g,[x,2.65,-1.4],[x,2.65,1.4],.1);beam(g,[x-1.55,.18,1.4],[x,2.65,1.4],.1);beam(g,[x,2.65,1.4],[x+1.55,.18,1.4],.1);g.quad([x+1.55,.2,0],[x,2.65,0],[x,2.65,1.5],[x+1.55,.2,1.5],'#baa380');}
  else{g.box(x,.3,0,2.85,.12,2.65,'#baa380',.16);beam(g,[-1.8,.35,-1.0],[.6,.35,1.3],.12);beam(g,[-1.7,.4,.5],[.8,.4,-1.1],.12);}
  for(let i=0;i<(work?6:3);i++){const a=i*TAU/6;g.sphere(2+Math.cos(a)*.65,.18,1+Math.sin(a)*.65,.24,.19,.24,stone,6,3);}return g;
 }
 if(kind==='bridge'){
  // The wide central gap is genuine missing geometry, not a darker board.
  for(let i=0;i<7;i++)if(work||i<2||i>4)g.box(0,.15,(i-3)*.55,2.7,.24,.5,wood);
  for(const x of [-1.45,1.45]){for(const z of [-1.6,1.6])g.box(x,work?.7:.3,z,.15,work?1.4:.55,.15,wood);if(work)g.box(x,1.25,-.9,.14,.14,1.6,cream);else beam(g,[x,.25,-1.1],[x-.4,.25,.65],.15);}
  if(!work)g.box(.8,.02,.15,.35,.12,1.3,wood,.45);return g;
 }
 if(kind==='apiary'){
  for(let i=0;i<3;i++){const x=(i-1)*1.65;g.box(x,.14,0,1.22,.24,1.08,wood);if(work&&i===0){g.box(x,.7,0,1.2,.9,1.05,'#d1b276');g.roof(x,1.18,0,1.4,.6,1.2,teal);}else{g.box(x-.51,work?.43:.3,0,.13,work?.6:.3,.96,wood);g.box(x,work?.43:.3,-.46,1.16,work?.6:.3,.13,wood);g.box(x+.16,.18,.85,1.25,.15,.75,teal,.25);}}
  return g;
 }
 if(kind==='mushroom'){
  for(let i=0;i<3;i++){const x=(i-1)*1.3,z=i%2*.7;if(work&&i<2){const h=i===0?1.5:.8;g.cylinder(x,h/2,z,.23,.17,h,cream,7);g.sphere(x,h,z,.85,.42,.75,'#b2a4c2',9,4);}else{g.cylinder(x,.3,z,.24,.2,.6,cream,7);g.sphere(x+.3,.27,z+.7,.7,.18,.65,'#918b9f',8,4);}}
  flask(g,-.5,.1,1.6);flask(g,.1,.1,1.5);return g;
 }
 if(kind==='crystals'){
  if(work)for(let i=0;i<3;i++)shard(g,Math.sin(i*2.1)*1.2,0,Math.cos(i*2.1),.6+(i%2)*.25,'#b2aac3');
  else for(let i=0;i<4;i++)shard(g,(i%2-.5)*1.7,.22,(Math.floor(i/2)-.5)*1.4,.7,'#969ea2',true);
  return g;
 }
 if(kind==='chest'){
  g.box(0,.7,0,2.5,1.3,1.8,wood);g.box(0,.15,0,2.65,.2,1.9,gold);
  if(work)g.append(new Geometry().box(0,0,.8,2.5,.3,1.8,wood),0,1.5,-.7,-.4);
  else g.roof(0,1.35,0,2.5,.5,1.8,'#ae8c58');
  for(const x of [-.85,.85])g.box(x,.8,.94,.17,1.3,.08,gold);
  if(!work){g.box(0,.9,1.01,.68,.72,.2,dark);g.box(0,.96,1.13,.2,.26,.04,gold);g.box(0,.82,1.03,2.4,.17,.12,dark);}return g;
 }
 if(kind==='masterstone'){
  g.cylinder(0,.24,0,1.45,1.3,.45,'#819c93',7);
  if(work){g.cylinder(0,.61,0,.95,.85,.35,gold,7);shard(g,0,.8,0,.95,'#b4a1ca');}
  else for(let i=0;i<3;i++){const a=i*TAU/3;shard(g,Math.cos(a)*.65,.38,Math.sin(a)*.65,.75,'#aaa1b7',true);}
  for(let i=0;i<(work?2:5);i++){const a=i*TAU/5;g.box(Math.cos(a)*1.4,.72,Math.sin(a)*1.4,.22,.75,.22,'#ad99b9',a);}
  return g;
 }
 if(kind==='crates'){
  if(work)for(let i=0;i<3;i++)g.box((i-1)*1.1,.55,0,1.04,1.04,1.04,wood);
  else {planks(g,4,-.5,.1);g.box(1.1,.4,0,.16,.65,1,wood);}return g;
 }
 if(kind==='gate'||kind==='lift'){
  for(const x of [-1.5,1.5])g.box(x,work?1.35:.35,0,.35,work?2.7:.7,.45,wood);
  planks(g,work?2:4,0,.4);return g;
 }
 if(kind==='mill'||kind==='tower'){
  ring(g,work?10:5,12,1.55,.4,.65);if(work){ring(g,8,12,1.5,1.15,.8);ring(g,5,12,1.4,1.95,.8);}else planks(g,2,0,0);return g;
 }
 // Living creatures use the original body plus removable protective runes.
 return null;
}

export function protectionRunes(kind,stage){
 const g=new Geometry(),r=kind==='boss'?2.15:kind==='dragon'?2.1:1.5;
 for(let i=0;i<(stage===1?1:3);i++){
  const a=(i-1)*1.5,x=Math.sin(a)*r,z=Math.cos(a)*r;
  g.cylinder(x,.75,z,.13,.13,1.5,'#a59bb5',5);
  g.append(new Geometry().box(0,0,0,.58,.58,.18,'#c7b5dd'),x,1.65,z,0,0,Math.PI/4);
  g.box(x,1.65,z+.13,.07,.28,.04,gold);
 }
 return g;
}

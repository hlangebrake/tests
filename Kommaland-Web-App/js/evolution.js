/** Add thoughtful practice without changing quest IDs or old completed buildings. */
import {makeVariant,seedOf} from './practice.js';
import {makeChallenges} from './challenges.js';
export function evolveContent(quests){
 // Stories and objects no longer default to another house. Mathematical requests remain connected to the object.
 const changes={
  v3:{title:'Futter für die Dorfponys',npc:'Jori · Tierpfleger',kind:'stable',story:'Neben Joris Dach entsteht ein offener Unterstand für zwei Ponys. Sortiere die Futteretiketten nach ihren Anteilen und beschrifte die Vorräte.',reward:'Der Pferdeunterstand bekommt Futtertröge und zwei neugierige Ponys.'},
  f1:{title:'Ein Pfad für die Rehe',kind:'deer',npc:'Fenn · Waldhüter',story:'Die Rehe finden den sicheren Pfad nur mit geordneten Wegschildern. Vergleiche Maße und beachte die Grenzen.',reward:'Eine Rehfamilie kommt zur ruhigen Lichtung.'},
  f2:{title:'Die Spuren der Waldtiere',kind:'trail',story:'Am Waldboden fehlen einige Wegmarken. Setze sie an die richtigen Stellen, damit die Tiere den Pfad finden.',reward:'Ein geschwungener Pfad aus Trittsteinen und Pilzen wird sichtbar.'},
  h2:{title:'Fracht für die Küstenponys',kind:'cart',npc:'Nela · Hafenmeisterin',story:'Ein beladener Wagen muss an die Tränke. Prüfe Massen und Traglasten, bevor die Ponys die Fracht übernehmen.',reward:'Der Frachtwagen wird beladen; ein Pony wartet am Hafen.'},
  a2:{title:'Die Futterküche',kind:'feeding',npc:'Ravi · Tierfreund',story:'Für die Tiere kommen mehrere Futterkörbe zusammen. Addiere die Portionen sorgfältig, damit die Futterküche öffnen kann.',reward:'Die Futterküche öffnet mit Näpfen und freundlichen Tieren.'},
  s1:{title:'Hilf beim Holzhacken',kind:'lumber',npc:'Taro · Holzhelfer',story:'Taro sägt Holz für die Bergwege. Berechne, welche Längen nach dem Kürzen übrig sind und welche Vorräte noch fehlen.',reward:'Geschnittene Stämme werden gestapelt; Taro kann seine Arbeit fortsetzen.'},
  s3:{kind:'camp',title:'Das Lager der Bergführer',reward:'Zelte, ein Vorratskorb und eine warme Feuerstelle machen das Lager bewohnbar.'},
  m1:{title:'Hafer für die Himmelsponys',kind:'stable',npc:'Alva · Tierpflegerin',story:'Jedes Pony braucht eine gleich große Futterportion. Berechne den Bedarf für mehrere Tiere und bringe die Futterausgabe in Gang.',reward:'Ein Pferdestall mit offener Weide und Futtertrögen wird fertig.'},
  m3:{kind:'apiary',title:'Die Bienen der Malmühle',story:'Die Bienenstöcke erhalten gleich große Vorratsgläser und Materialpakete. Bestimme Gesamtmengen und vervielfache mit 10 und 100.',reward:'Die Bienenstöcke öffnen; kleine Bienen kreisen über den Blumen.'},
  d3:{kind:'crystals',title:'Die singenden Kristalle',story:'Die Kristallgruppen klingen nur, wenn die Mengen richtig geteilt werden. Stimme ihre Zehner- und Hundertergruppen.',reward:'Eine Gruppe farbiger Kristalle leuchtet im Grottengarten.'},
  k1:{kind:'camp',title:'Die Gäste der Sternenburg',story:'Die Festgäste treffen ein. Berechne Getränke, Kosten und Vorräte, damit ihr Lager versorgt ist.',reward:'Die Gäste beziehen ihr Lager; an den Tischen kommt Leben auf.'}
 };
 // Non-radial object arrangements reinforce each biome without adding new islands.
 const positions={f1:[-8,-5],f2:[0,-3],f3:[7,4],f4:[-7,7],h1:[-8,-6],h2:[0,-7],h3:[7,-3],h4:[7,5],h5:[-7,5],a1:[-8,-5],a2:[0,-6],a3:[8,-3],a4:[7,6],s1:[-8,3],s2:[-5,-6],s3:[5,-7],s4:[8,2],m1:[-8,3],m2:[1,-7],m3:[8,-1],m4:[7,6],d1:[-8,4],d2:[-6,-5],d3:[3,-7],d4:[8,0]};
 for(const q of quests){
  Object.assign(q,changes[q.id]||{});if(positions[q.id]){q.x=positions[q.id][0];q.z=positions[q.id][1];}
  const old=q.tasks;q.legacyTaskCount=old.length;q.legacyStepMap=[];q.tasks=[];
  let i=0;
  while(i<old.length){
   let j=i+1;while(j<old.length&&old[j].lesson===old[i].lesson)j++;
   const id=old[i].lesson,groupKey=q.id+':'+i;
   for(let z=i;z<j;z++){
    const t={...old[z],key:q.id+':old:'+z,group:groupKey,stage:z===i?'guided':'near'};
    if(t.type==='classify'){
     t.type='match';t.unique=new Set(t.answer).size===t.answer.length;
     if(['places-tenths','places-hundred','write-thousand'].includes(id)){
      t.number=(t.text.match(/\d+[,.]\d+/)||[])[0]||null;
      if(t.number && t.items.length===t.number.replace(/[,.]/,'').length)t.commaAfter=t.number.indexOf(',');
     }
    }
    if(t.type==='line')t.sparse=true;
    q.legacyStepMap[z]=q.tasks.length;q.tasks.push(t);
   }
   const amount=j-i;
   if(amount<2){const t=makeVariant(id,'near',seedOf(groupKey+':near'));q.tasks.push({...t,skill:old[i].skill,group:groupKey,key:groupKey+':near'});}
   const t=makeVariant(id,'transfer',seedOf(groupKey+':transfer'));q.tasks.push({...t,skill:old[i].skill,group:groupKey,key:groupKey+':transfer'});
   i=j;
  }
 }
 // Replace distractors that were implausible due to unrelated units or magnitudes.
 const replace=(q,index,options,answer)=>{const t=quests.find(x=>x.id===q)?.tasks.find(t=>t.key===q+':old:'+index);if(t)Object.assign(t,{options,answer});};
 replace('v0a',2,['Einen ganzen und einen halben Meter','Einen ganzen und fünf ganze Meter','Einen ganzen und fünf Hundertstel Meter'],0);
 replace('v1',0,['2 ganze Liter und 5 Zehntel Liter','2 ganze Liter und 5 Hundertstel Liter','25 ganze Liter'],0);
 replace('v3',0,['Das Ganze ist in zwei gleich große Teile geteilt.','Es sind zwei von gleich großen Teilen gemeint.','Ein Teil ist immer zwei Liter groß.'],0);
 quests.push(...makeChallenges(quests));
}

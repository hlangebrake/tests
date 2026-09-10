import {QUESTS} from './content.js';
import {LEVEL_SUPPORT,STRUCTURED_PATCHES,EXTENDED_PATCHES} from './difficulty-data.js';
/** A slot remains the unit of core progress; variants never add compulsory steps.
 * N2 is a shallow metadata-only extension of the verified original, without content edits.
 * N1 deliberately reuses mathematical content where structured representation suffices.
 * N3 uses reviewed per-slot patches, never a larger-number generator.
 */
export const CORE_SLOTS=QUESTS.filter(q=>!q.challenge).flatMap(q=>q.tasks.map((t,index)=>({slotId:t.key,baseTaskId:q.id+':'+t.key,questId:q.id,topicId:q.region,index,goal:t.purpose,lesson:t.lesson,original:t})));
const slotMap=new Map(CORE_SLOTS.map(s=>[s.slotId,s]));
const fields=['type','text','answer','fields','rows','options','items','categories','number','unique','steps','parts','start','end','step','accept','unit','visual','sparse'];
export function taskVariant(slotId,level=2){
 const s=slotMap.get(slotId);if(!s||![1,2,3].includes(level))throw new Error('Unbekannter Aufgabenslot oder ungültiges Niveau.');
 const t=structuredClone(s.original),patch=level===1?STRUCTURED_PATCHES[slotId]:level===3?EXTENDED_PATCHES[slotId]:null;
 if(patch){for(const f of fields)delete t[f];Object.assign(t,structuredClone(patch));}
 t.slotId=slotId;t.baseTaskId=s.baseTaskId;t.variantId='v71:'+slotId+':n'+level;t.difficultyLevel=level;
 t.difficulty={level,complexity:level===3?3:2,scaffolding:level===1?3:level===2?2:1,transfer:level===3?2:1,abstraction:level===1?1:2};
 if(level===1){
  t.orientation={title:'Dein Gerüst',steps:(['c6:m1:01','c6:m1:03','c6:m1:04'].includes(slotId)?LEVEL_SUPPORT['c6-groups']:LEVEL_SUPPORT[t.lesson])};
  t.differentiation=patch?'Explizite Zerlegung und übersichtliche Daten; dieselbe Kompetenzposition.':'Bewährte Kernaufgabe mit unmittelbar sichtbarer, fachlich passender Orientierung.';
 }else if(level===3){
  t.differentiation=patch.type!==s.original.type?'Weniger Antwortvorgaben, eigenständiges Konstruieren/Prüfen beim selben Kernziel.':'Zusätzliche Bedingung, Darstellungswechsel oder reduzierte Vorgaben innerhalb desselben Lernziels.';
  // Levels are NOT requirement areas: N3 can be AB II, not automatically AB III.
  t.level='II';t.cognitive={...t.cognitive,level:'II',rationale:'Verknüpfung bekannter Zusammenhänge oder eigenständige numerische Rekonstruktion, keine automatisch bewertete freie Argumentation.'};
 }else t.differentiation='Unveränderte reguläre Aufgabe aus Kommaland 7.';
 return t;
}
export function runtimeQuest(q){return q.challenge||q.practice||q.id.startsWith('exam:')?q:{...q,tasks:q.tasks.slice(),coreVariants:true};}
export function slotFor(key){return slotMap.get(key)||null;}

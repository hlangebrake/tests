/** Active authored content. No automatic near/transfer expansion. */
import {REGIONS,PATHS,QUESTS as ORIGINAL_QUESTS,INFO} from './curriculum-data.js';
import {reviewQuests} from './cognitive-review.js';
const QUESTS=reviewQuests(ORIGINAL_QUESTS);
export {REGIONS,PATHS,QUESTS,INFO};
export const regionById=id=>REGIONS.find(r=>r.id===id);
export const questById=id=>QUESTS.find(q=>q.id===id);
export const questsIn=id=>QUESTS.filter(q=>q.region===id);
export function regionUnlocked(id,completed){const r=regionById(id);return !!r&&r.unlock.every(key=>!!completed[key]);}
export function questUnlocked(q,completed){return !!q&&(q.challenge ? (q.requires||[]).every(id=>!!completed[id]) : regionUnlocked(q.region,completed)&&(q.requires||[]).every(id=>!!completed[id]));}
export function missingRequirements(q,completed){return [...new Set([...regionById(q.region).unlock,...(q.requires||[])])].filter(id=>!completed[id]);}
export function requirementText(id,completed){const q=questById(id),ids=q?missingRequirements(q,completed):regionById(id).unlock.filter(key=>!completed[key]);return ids.length?'Zuerst: '+ids.map(key=>'„'+questById(key).title+'“').join(', ')+'.':'Du kannst hier beginnen.';}
export const BADGES={village:'c6-v3',forest:'c6-f3',harbor:'c6-h5',market:'c6-a4',cliffs:'c6-s4',mill:'c6-m2',cave:'c6-d2'};
export function badgeEarned(region,completed){return !!completed[BADGES[region]];}
/** Retrieval uses only actual completed tasks, never merely a visited region. */
export function makeEncounter(completed,count){
 const known=QUESTS.filter(q=>completed[q.id]&&q.region!=='castle'&&!q.challenge);
 const q=known[count%Math.max(known.length,1)]||QUESTS[0];
 const task=q.tasks[Math.floor(count/Math.max(known.length,1))%q.tasks.length];
 return {id:'encounter',region:q.region,title:'Mikos Erinnerungsrätsel',npc:'Miko · Waldkobold',story:'Erinnerst du dich an dieses kleine Problem aus „'+q.title+'“? Hilf mir beim Nachdenken – oder reise in Ruhe weiter.',reward:'Miko hat sich wieder erinnert und hüpft zurück in den Wald.',tasks:[{...task}],kind:'slime'};
}

import {project} from '../shared/projection.js';
import {metrics,average,ratio,sum} from './analytics.js';
export const EVENT_LABELS={session_started:'Lernsitzung begonnen',session_finished:'Lernsitzung beendet',history_baseline:'Vorhandener Lernstand übernommen',quest_started:'Quest begonnen',quest_resumed:'Quest fortgesetzt',quest_completed:'Quest abgeschlossen',quest_skipped:'Quest für später markiert',quest_paused:'Quest unterbrochen',task_started:'Aufgabe geöffnet',task_attempt:'Antwort geprüft',task_completed:'Aufgabe gelöst',task_paused:'Aufgabe unterbrochen',task_skipped:'Aufgabe zurückgestellt',hint_opened:'Tipp geöffnet',hint_closed:'Tipp geschlossen',example_opened:'Beispiel geöffnet',example_closed:'Beispiel geschlossen',solutionStep_opened:'Lösungsschritt geöffnet',solutionStep_closed:'Lösungsschritt geschlossen',otherHelp_opened:'Wissen bewusst geöffnet',otherHelp_closed:'Wissen geschlossen',knowledge_opened:'Neuer Gedanke eingeführt',knowledge_closed:'Gedanke geschlossen',challenge_unlocked:'Meisterherausforderung freigeschaltet',challenge_started:'Meisterherausforderung begonnen',challenge_completed:'Meisterherausforderung geschafft',topic_entered:'Gebiet betreten',topic_left:'Gebiet verlassen',prerequisite_bypassed:'Vorwissenswarnung bewusst übergangen',exam_started:'Wegprüfung begonnen',exam_round_finished:'Prüfrunde ausgewertet',exam_completed:'Wegprüfung bestanden',state_restored:'Spielstand geladen',profile_updated:'Name bestätigt',history_gap:'Lücke in der Historie'};
export const localDay=iso=>{const d=new Date(iso);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
export function dateRange(from,to){return {from:from?new Date(from+'T00:00:00').toISOString():'',to:to?new Date(to+'T23:59:59.999').toISOString():'9999-12-31T23:59:59.999Z'};}
export function filterEvents(events,{from='',to='9999-12-31T23:59:59.999Z',category='all'}={}){return events.filter(e=>e.timestamp>=from&&e.timestamp<=to&&e.type!=='activity_slice'&&(category==='all'||category==='help'&&/_opened$/.test(e.type)||category==='attempts'&&e.type==='task_attempt'||category==='quests'&&/^(quest|challenge|exam)_/.test(e.type)||category==='sessions'&&/^session_/.test(e.type))).sort((a,b)=>b.timestamp.localeCompare(a.timestamp)||(b.sequence||0)-(a.sequence||0));}
/** Historical class progress is reconstructed, not linearly interpolated from exports.
 * Before a student's first baseline the state is UNKNOWN, never shown as zero.
 */
export function classHistory(details,{from='',to='9999-12-31T23:59:59.999Z',bucket='day'}={}){
 const dates=[...new Set(details.flatMap(d=>d.events.filter(e=>e.type!=='activity_slice'&&e.timestamp>=from&&e.timestamp<=to).map(e=>localDay(e.timestamp))))].sort();
 const selected=dates.length>120?dates.filter((_,i)=>i%Math.ceil(dates.length/120)===0||i===dates.length-1):dates;
 const days=bucket==='week'?[...new Set(selected.map(day=>{const d=new Date(day+'T12:00:00');d.setDate(d.getDate()+(7-d.getDay())%7);return localDay(d.toISOString());}))]:selected;
 return days.map(day=>{
  const cutoff=[dateRange('',day).to,to].sort()[0],observed=details.filter(d=>d.events.some(e=>e.type==='history_baseline'&&e.timestamp<=cutoff));
  const ms=observed.map(d=>metrics(project({studentId:d.student.studentId,catalog:d.student.catalog,events:d.events,snapshots:d.snapshots,asOf:cutoff})));
  return {day,observed:observed.length,total:details.length,progress:average(ms.map(m=>m.progress||0)),attempts:sum(ms,m=>m.attempts),errorRate:ratio(sum(ms,m=>m.errors),sum(ms,m=>m.attempts))};
 });
}

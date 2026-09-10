/** All pedagogical thresholds live here. Signals are invitations to inspect evidence,
 * not diagnoses, ability scores or rankings of children. Help use alone is NEVER a risk.
 */
export const RULES=Object.freeze({minimumAttemptedRuns:8,errorRate:.40,averageAttempts:2.2,helpRate:.50,lowSuccess:.65,skipRate:.20,persistenceAttempts:3,secureFirstTry:.85,stretchFirstTry:.95,stretchProgress:.80,stretchChallengeCompleted:1});
export const ratio=(a,b)=>b?a/b:null;
export const sum=(xs,f)=>xs.reduce((n,x)=>n+f(x),0);
export const average=xs=>xs.length?sum(xs,x=>x)/xs.length:null;
export const median=xs=>{if(!xs.length)return null;const a=xs.slice().sort((a,b)=>a-b),i=Math.floor(a.length/2);return a.length%2?a[i]:(a[i-1]+a[i])/2;};
const voluntary=h=>!h.automatic&&h.helpType!=='knowledge';
// One projection feeds many topic/skill cards; scan its time slices only once per range.
const durationCache=new WeakMap();
function intervalDurations(projection,from,to){
 const key=from+'|'+to;let cached=durationCache.get(projection);if(cached?.key===key)return cached;
 const sliceDurations=new Map(),helpDurations=new Map();
 const lo=from?Date.parse(from):-Infinity,hi=to==='9999-12-31T23:59:59.999Z'?Infinity:Date.parse(to);
 for(const e of projection.events||[]){if(e.type!=='activity_slice')continue;const a=Date.parse(e.data.from),b=Date.parse(e.timestamp);const amount=Math.min(e.data.duration,Math.max(0,Math.min(b,hi)-Math.max(a,lo)));if(!amount)continue;if(e.taskRunId)sliceDurations.set(e.taskRunId,(sliceDurations.get(e.taskRunId)||0)+amount);for(const id of e.data.helpIds||[])helpDurations.set(id,(helpDurations.get(id)||0)+amount);}
 cached={key,sliceDurations,helpDurations};durationCache.set(projection,cached);return cached;
}
/** All behavioural rates are computed on attempted task RUNS in the requested period,
 * so an intentional replay is not conflated with multiple failed attempts in one run.
 * Current quest progress is as-of end-date; rates describe the selected interval.
 */
export function metrics(projection, {kind='regular',topicId=null,skillId=null,from='',to='9999-12-31T23:59:59.999Z'}={}){
 const {quests,tasks,events=[],knownState=true}=projection;
 const {sliceDurations,helpDurations}=intervalDurations(projection,from,to);
 const q=quests.filter(q=>q.kind===kind&&(!topicId||q.topicId===topicId));
 const t=tasks.filter(t=>t.kind===kind&&(!topicId||t.topicId===topicId)&&(!skillId||t.skillId===skillId));
 const runs=t.flatMap(t=>t.runs).map(r=>{
  const attempts=r.attempts.filter(a=>a.timestamp>=from&&a.timestamp<=to),helps=r.helps.filter(h=>h.openedAt<=to&&(h.openedAt>=from||(helpDurations.get(h.helpId)||0)>0)&&voluntary(h));
  return {...r,attempts,helps:helps.map(h=>({...h,duration:events.length?(helpDurations.get(h.helpId)||0):h.duration})),duration:events.length?(sliceDurations.get(r.taskRunId)||0):r.duration};
 }).filter(r=>r.attempts.length);
 const attempts=runs.flatMap(r=>r.attempts),correct=attempts.filter(a=>a.correct).length,solved=runs.filter(r=>r.attempts.some(a=>a.correct)).length;
 const hints=runs.flatMap(r=>r.helps).filter(h=>h.helpType==='hint'),examples=runs.flatMap(r=>r.helps).filter(h=>h.helpType==='example');
 const skipCount=q.filter(x=>x.skipCount>0).length,currentlySkipped=q.filter(x=>x.status==='skipped').length;
 const skippedEvents=sum(q,x=>x.history.filter(e=>e.type==='quest_skipped'&&e.timestamp>=from&&e.timestamp<=to).length);
 const completed=q.filter(x=>x.status==='completed').length,started=q.filter(x=>x.status!=='not_started').length;
 const withHelp=runs.filter(r=>r.helps.length).length;
 return {knownState,totalQuests:q.length,completed:knownState?completed:null,started:knownState?started:null,skipCount,currentlySkipped,skippedEvents,progress:knownState?ratio(completed,q.length):null,participation:knownState?ratio(started,q.length):null,skipRate:ratio(skipCount,q.length),attemptedRuns:runs.length,attemptedTasks:t.filter(t=>t.runs.some(r=>r.attempts.some(a=>a.timestamp>=from&&a.timestamp<=to))).length,totalTasks:t.length,attempts:attempts.length,errors:attempts.length-correct,errorRate:ratio(attempts.length-correct,attempts.length),successRate:ratio(solved,runs.length),firstTryRate:ratio(runs.filter(r=>r.attempts[0]?.attemptNumber===1&&r.attempts[0].correct).length,runs.length),avgAttempts:ratio(attempts.length,runs.length),helpRate:ratio(withHelp,runs.length),hintRate:ratio(runs.filter(r=>r.helps.some(h=>h.helpType==='hint')).length,runs.length),exampleRate:ratio(runs.filter(r=>r.helps.some(h=>h.helpType==='example')).length,runs.length),hintOpenCount:hints.filter(h=>h.openedAt>=from&&!h.resumed).length,exampleOpenCount:examples.filter(h=>h.openedAt>=from&&!h.resumed).length,totalHintDuration:sum(hints,h=>h.duration),totalExampleDuration:sum(examples,h=>h.duration),duration:sum(runs,r=>r.duration),avgDuration:average(runs.map(r=>r.duration)),medianDuration:median(runs.map(r=>r.duration)),unlocked: q.filter(q=>q.challengeUnlocked).length,challengeStarted:q.filter(q=>q.challengeStarted).length,persistence:runs.filter(r=>r.attempts.length>=RULES.persistenceAttempts&&r.helps.length&&r.attempts.some(a=>a.correct)).length,unfinished:runs.filter(r=>!r.attempts.some(a=>a.correct)).length};
}
export function signals(m,challenge){
 const out=[];const enough=m.attemptedRuns>=RULES.minimumAttemptedRuns;
 const pct=v=>Math.round((v||0)*100)+' %';
 if(enough&&m.errorRate>=RULES.errorRate&&m.avgAttempts>=RULES.averageAttempts)out.push({code:'support',priority:3,title:'Wiederholte Schwierigkeiten prüfen',evidence:`${pct(m.errorRate)} Fehlversuche · Ø ${m.avgAttempts.toFixed(1)} Versuche in ${m.attemptedRuns} Bearbeitungen.`,suggestion:'An einer gemeinsam bearbeiteten Aufgabe die Denkwege nachvollziehen.'});
 if(enough&&m.helpRate>=RULES.helpRate&&m.successRate<RULES.lowSuccess&&m.errorRate>=RULES.errorRate)out.push({code:'help',priority:3,title:'Unterstützung genauer abstimmen',evidence:`${pct(m.helpRate)} mit Hilfe; ${pct(m.successRate)} anschließend gelöst.`,suggestion:'Prüfen, welche Erklärung oder Darstellung tatsächlich weiterhilft.'});
 if(m.skipRate>=RULES.skipRate)out.push({code:'skips',priority:enough&&m.errorRate>=RULES.errorRate?3:2,title:'Mehrere Inhalte für später markiert',evidence:`${m.skipCount} von ${m.totalQuests} Quests ausdrücklich zurückgestellt; ${m.currentlySkipped} noch zurückgestellt.`,suggestion:'Nach den Gründen fragen. Ein übersprungener Inhalt ist nicht automatisch eine Wissenslücke.'});
 if(enough&&m.firstTryRate>=RULES.stretchFirstTry&&m.progress>=RULES.stretchProgress&&challenge.completed>=RULES.stretchChallengeCompleted)out.push({code:'stretch',priority:2,title:'Zusätzliche Herausforderung anbieten',evidence:`${pct(m.firstTryRate)} direkt richtig · ${challenge.completed} Meisterherausforderung(en) abgeschlossen.`,suggestion:'Eine offene Transfer- oder Begründungsaufgabe anbieten; keine automatische Unterforderungsdiagnose.'});
 if(m.persistence)out.push({code:'persistence',priority:1,title:'Nach mehreren Versuchen weitergekommen',evidence:`${m.persistence} Bearbeitung(en) nach mindestens ${RULES.persistenceAttempts} Versuchen und Hilfe erfolgreich.`,suggestion:'Im Gespräch aufgreifen, welche Strategie geholfen hat.'});
 if(enough&&!out.some(x=>x.priority>=2)&&m.firstTryRate>=RULES.secureFirstTry)out.push({code:'steady',priority:0,title:'Kontinuierlich erfolgreicher Aufgabenverlauf',evidence:`${pct(m.firstTryRate)} beim ersten Versuch richtig.`,suggestion:'Den weiteren Lernweg und freiwillige Herausforderungen besprechen.'});
 if(!enough)out.push({code:'limited',priority:0,title:'Noch wenig beobachtete Aufgaben',evidence:`${m.attemptedRuns} Bearbeitungen mit Versuchsdaten; mindestens ${RULES.minimumAttemptedRuns} für Schwierigkeitshinweise.`,suggestion:'Weitere Beobachtungen sammeln. Fehlende Historie ist kein Misserfolg.'});
 return out;
}
export function studentSummary(student,p,range={}){const regular=metrics(p,range),challenge=metrics(p,{...range,kind:'challenge'}),exam=metrics(p,{...range,kind:'exam'});const s=signals(regular,challenge);return {student,regular,challenge,exam,signals:s,priority:Math.max(0,...s.map(s=>s.priority)),lastActive:p.lastActive||null};}
export function aggregate(rows){
 const m=rows.map(r=>r.regular);const n=key=>sum(m,x=>x[key]||0);
 return {students:rows.length,observedStudents:m.filter(x=>x.knownState!==false).length,averageProgress:average(m.filter(x=>x.progress!==null).map(x=>x.progress)),totalQuests:n('totalQuests'),completed:n('completed'),skipped:n('skipCount'),progress:ratio(n('completed'),sum(m.filter(x=>x.knownState!==false),x=>x.totalQuests)),avgAttempts:ratio(n('attempts'),n('attemptedRuns')),errorRate:ratio(n('errors'),n('attempts')),helpRate:ratio(sum(m,x=>(x.helpRate||0)*x.attemptedRuns),n('attemptedRuns')),avgDuration:ratio(n('duration'),n('attemptedRuns')),duration:n('duration'),attention:rows.filter(r=>r.priority>=2).length,unlocked:sum(rows,r=>r.challenge.unlocked),challengeCompleted:sum(rows,r=>r.challenge.completed)};
}
export function topicRows(details,range={}){
 const topics=new Map();for(const d of details)for(const t of d.student.catalog.topics)topics.set(t.topicId,t);
 return [...topics.values()].map(t=>{const rows=details.map(d=>({regular:metrics(d,{...range,topicId:t.topicId}),challenge:metrics(d,{...range,kind:'challenge',topicId:t.topicId}),priority:0}));return {...t,...aggregate(rows),metrics:rows.map(r=>r.regular),participation:ratio(sum(rows,r=>r.regular.started),sum(rows,r=>r.regular.totalQuests)),successRate:ratio(sum(rows,r=>(r.regular.successRate||0)*r.regular.attemptedRuns),sum(rows,r=>r.regular.attemptedRuns)),skipRate:ratio(sum(rows,r=>r.regular.skipCount),sum(rows,r=>r.regular.totalQuests)),hintRate:ratio(sum(rows,r=>(r.regular.hintRate||0)*r.regular.attemptedRuns),sum(rows,r=>r.regular.attemptedRuns)),exampleRate:ratio(sum(rows,r=>(r.regular.exampleRate||0)*r.regular.attemptedRuns),sum(rows,r=>r.regular.attemptedRuns)),attempts:sum(rows,r=>r.regular.attempts)};});
}

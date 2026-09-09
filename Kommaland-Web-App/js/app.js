import {Renderer} from './engine.js';
import {World, terrainHeight} from './world.js';
import {REGIONS, PATHS, QUESTS, INFO, regionById, questById, questsIn, regionUnlocked, questUnlocked, requirementText, makeEncounter} from './content.js';
import {SaveStore, defaultState, parseSave} from './state.js';
import {checkAnswer, decimal, formatNumber, describeAnswer} from './math.js';
import {icon, questIcon, esc, mathVisual, numberLine} from './ui.js';

const $ = id => document.getElementById(id);
const panel = $('panel'), overlay = $('overlay'), shell = $('gameShell');
let mode = '', session = null, returnFromInfo = null, lastFocus = null;
let pendingCelebration = null, toastTimer, arrivalTimer, offlineReady = false;
let lastRegion = 'village', lastEncounter = 0, lastFrame = 0, clock = 0, lastDraw = 0;
let audio = null, pendingImport = null, storageWarned = false, graphicsLost = false;
const store = new SaveStore(ok => {
 $('saveDot').classList.toggle('warning', !ok);
 $('saveLabel').textContent = ok ? 'Lokal gespeichert' : 'Nicht gespeichert · bitte exportieren';
 if (!ok && !storageWarned) {storageWarned=true; toast('Der Gerätespeicher ist nicht verfügbar. Sichere deinen Stand über den Rucksack.');}
});
let state = store.state;
const renderer = new Renderer($('world'));
const world = new World(renderer, interact);
world.sync(state); world.teleport(state.player.x, state.player.z);

function toast(text) {
 $('toast').textContent=text; $('toast').classList.add('show');
 clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('toast').classList.remove('show'),4500);
}
function persist() {
 state.player={x:world.player.x,z:world.player.z}; store.state=state; store.save();
}
function applySettings() {
 document.documentElement.style.setProperty('--text-scale', state.settings.largeText?'1.15':'1');
 document.body.classList.toggle('reduce-motion',state.settings.reducedMotion);
 renderer.dpr=state.settings.quality==='eco'?1:1.5;
 renderer.resize(); world.sync(state);
}
function chime(success=true) {
 if(!state.settings.sound) return;
 try {
  audio??=new (window.AudioContext||window.webkitAudioContext)();
  audio.resume().catch(()=>{});
  const start=audio.currentTime;
  (success?[523.25,659.25,783.99]:[330]).forEach((frequency,i)=>{
   const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=frequency;
   g.gain.setValueAtTime(0,start+i*.07);g.gain.linearRampToValueAtTime(.07,start+i*.07+.02);
   g.gain.exponentialRampToValueAtTime(.001,start+i*.07+.35);o.connect(g);g.connect(audio.destination);
   o.start(start+i*.07);o.stop(start+i*.07+.36);
  });
 } catch { /* Audio is optional, never required to play. */ }
}
function openPanel(nextMode,{title,tag='KOMMALAND',symbol='book',subtitle='',body='',foot='',actions='',className=''}={}) {
 if(overlay.hidden) lastFocus=document.activeElement;
 mode=nextMode; world.stop(); releaseStick(); overlay.hidden=false; shell.inert=true;
 panel.className='scroll-panel '+className;
 panel.innerHTML=`<header class="panel-head"><div class="panel-topline"><span class="section-tag">${icon(symbol)}${esc(tag)}</span><div class="head-actions">${actions}<button class="close-button" id="closePanel" aria-label="Schriftrolle schließen">${icon('close')}</button></div></div><h2 id="panelTitle">${esc(title)}</h2>${subtitle?`<p class="panel-subtitle">${esc(subtitle)}</p>`:''}</header><div class="panel-body">${body}</div>${foot?`<footer class="panel-foot">${foot}</footer>`:''}`;
 $('closePanel').onclick=closePanel;
 panel.focus({preventScroll:true});
}
function closePanel() {
 if(mode==='info' && returnFromInfo){const back=returnFromInfo;returnFromInfo=null;back();return;}
 mode='';overlay.hidden=true;shell.inert=false;world.stop();releaseStick();world.encounterMesh.visible=false;
 if(pendingCelebration){world.celebrate(pendingCelebration.x,pendingCelebration.z);pendingCelebration=null;}
 if(lastFocus?.isConnected && !lastFocus.closest('#overlay'))lastFocus.focus({preventScroll:true});
 else $('world').focus({preventScroll:true});
 persist();
}
function closeToWorld(){returnFromInfo=null;closePanel();}
function primary(label,id='primary',symbol='arrow',disabled=false){return `<button id="${id}" class="primary-button" ${disabled?'disabled':''}>${esc(label)}${icon(symbol)}</button>`;}
function secondary(label,id,symbol='back'){return `<button id="${id}" class="secondary-button">${icon(symbol)}${esc(label)}</button>`;}
function countCompleted(){return Object.keys(state.completed).length;}
function seals(){return REGIONS.filter(r=>r.id!=='castle'&&questsIn(r.id).filter(q=>state.completed[q.id]).length>=2).length;}
function chooseNext(preferred) {
 const choices=QUESTS.filter(q=>!state.completed[q.id]&&questUnlocked(q,state.completed));
 const next=choices.find(q=>q.region===preferred)||choices[0];state.activeQuest=next?.id||'k4';
}
function updateHUD(){
 $('questCount').textContent=countCompleted();
 const q=questById(state.activeQuest)||QUESTS[0],r=regionById(q.region),done=!!state.completed[q.id];
 $('trackerTitle').textContent=countCompleted()===QUESTS.length?'Kommaland leuchtet!':q.title;
 $('trackerDetail').textContent=done?'Erkunde die Welt oder übe noch einmal.':`${r.name} · ${state.progress[q.id]?.step||0} von 3 Schritten`;
 $('trackerIcon').innerHTML=icon(questIcon(q));$('trackerFill').style.width=(done?100:(state.progress[q.id]?.step||0)/3*100)+'%';
 syncLabels();
}
function interact(o) {
 if(!o || mode) return;
 if(Math.hypot(o.x-world.player.x,o.z-world.player.z)>=5.3){world.goToObject(o);return;}
 if(o.type==='info'){showInfo(o.region);return;}
 const q=o.q;
 if(!questUnlocked(q,state.completed) && !state.completed[q.id]){showLocked(q);return;}
 showQuestIntro(q);
}
function showLocked(q) {
 const special=q.id==='k4'&&regionUnlocked('castle',state.completed);
 openPanel('locked',{title:'Hier fehlt noch ein Funke',tag:regionById(q.region).name,symbol:'lock',body:`<div class="intro-layout"><div class="story-medallion">${icon('lock')}</div><div class="story-text"><p>${esc(special?'Schließe zuerst die drei anderen Burgquests ab.':requirementText(q.region,state.completed))}</p><p>Erkunden und am Infoschild nachlesen darfst du hier schon jetzt.</p></div></div>`,foot:secondary('Lernlandkarte','lockedMap','map')+primary('Wissen lesen','lockedInfo','book')});
 $('lockedInfo').onclick=()=>showInfo(q.region);$('lockedMap').onclick=()=>showMap(q.region);
}
function showQuestIntro(q) {
 session=null;returnFromInfo=null;
 const done=state.completed[q.id],progress=state.progress[q.id],r=regionById(q.region);
 openPanel('intro',{title:q.title,tag:r.name,symbol:questIcon(q),subtitle:q.npc,body:`<div class="intro-layout"><div class="story-medallion">${icon(questIcon(q))}</div><div class="story-text"><p>${esc(q.story)}</p><div class="reward-line">${icon(done?'check':'spark')}<span>${esc(done?'Schon geschafft: '+q.reward:q.reward)}</span></div></div></div><div class="quest-meta"><span class="mini-tag">${icon(q.advanced?'star':'flag')}${q.advanced?'Große Quest':'Kleine Quest'}</span><span class="mini-tag">3 kleine Schritte</span><span class="mini-tag">${esc(r.topic)}</span></div>${done?'<p class="replay-note">Du kannst diese Quest wiederholen. Dein Bauwerk und dein Fortschritt bleiben erhalten.</p>':progress?`<p class="replay-note">${progress.step} von 3 Schritten geschafft. Du machst genau dort weiter.</p>`:''}`,foot:secondary('Wissen lesen','introInfo','book')+primary(done?'Noch einmal üben':progress?'Weiterlernen':'Quest beginnen','beginQuest')});
 $('introInfo').onclick=()=>{returnFromInfo=()=>showQuestIntro(q);showInfo(q.region);};
 $('beginQuest').onclick=()=>startQuest(q,!!done);
}
function startQuest(q,replay=false,encounter=false) {
 const p=!replay&&!encounter?state.progress[q.id]:null;
 session={q,index:p?.step||0,answer:null,solved:false,wrong:false,stepAttempts:0,usedHint:false,showHint:false,showSolution:false,mistakes:p?.mistakes||0,hints:p?.hints||0,replay,encounter};
 if(!encounter&&!replay){state.activeQuest=q.id;state.progress[q.id]??={step:0,mistakes:0,hints:0};persist();updateHUD();}
 resetAnswer();showTask();
}
function resetAnswer(){
 const t=session.q.tasks[session.index];
 session.answer=t.type==='number'?'':t.type==='multi'||t.type==='order'?[]:t.type==='classify'?Array(t.items.length).fill(null):null;
 session.solved=false;session.wrong=false;session.stepAttempts=0;session.usedHint=false;session.showHint=false;session.showSolution=false;
}
function answerReady(){
 if(!session)return false;const t=session.q.tasks[session.index],a=session.answer;
 if(t.type==='number')return !!decimal(a);
 if(t.type==='multi')return a.length>0;
 if(t.type==='classify')return a.every(x=>Number.isInteger(x));
 if(t.type==='order')return a.length===t.items.length;
 return a!==null;
}
function taskControl(t) {
 const a=session.answer;
 if(t.type==='number')return `<div class="task-numeric"><div><p class="question">${esc(t.text)}</p>${mathVisual(t.visual,true)}<p class="keypad-help">Dein Ergebnis genügt. Die Einheit steht schon am Eingabefeld.</p></div><div><div class="number-entry"><input id="numberAnswer" type="text" inputmode="none" readonly value="${esc(a)}" aria-label="Deine Antwort" autocomplete="off" spellcheck="false"><span class="unit">${esc(t.unit||'')}</span></div><div class="keypad">${['7','8','9','4','5','6','1','2','3',',','0','⌫'].map(k=>`<button data-key="${k}" aria-label="${k==='⌫'?'Letzte Ziffer löschen':k===','?'Dezimalkomma':k}" ${session.solved?'disabled':''}>${k==='⌫'?icon('erase'):k}</button>`).join('')}</div></div></div>`;
 const question=`<p class="question">${esc(t.text)}</p>`;
 if(t.type==='choice'||t.type==='multi')return question+mathVisual(t.visual,true)+`<p class="task-instruction">${t.type==='multi'?'Wähle alle passenden Antworten.':'Wähle eine Antwort.'}</p><div class="choices">${t.options.map((s,i)=>{const selected=t.type==='multi'?a.includes(i):a===i;return `<button class="choice ${t.type==='multi'?'multi':''} ${selected?'selected':''}" data-choice="${i}" aria-pressed="${selected}" ${session.solved?'disabled':''}><span class="choice-symbol">${selected?icon('check'):String.fromCharCode(65+i)}</span><span>${esc(s)}</span></button>`;}).join('')}</div>`;
 if(t.type==='order')return question+`<p class="task-instruction">Tippe die Kärtchen in der richtigen Reihenfolge an. Tippe oben auf ein Kärtchen, um es zurückzulegen.</p><div class="order-target" aria-label="Deine Reihenfolge">${a.length?a.map((i,j)=>`<button data-remove="${j}" ${session.solved?'disabled':''}><small>${j+1}</small>${esc(t.items[i])}</button>`).join(''):'<span>Hier entsteht deine Reihenfolge …</span>'}</div><div class="order-source">${t.items.map((s,i)=>`<button data-order="${i}" ${a.includes(i)||session.solved?'disabled':''}>${esc(s)}</button>`).join('')}</div>`;
 if(t.type==='classify')return question+`<p class="task-instruction">Wähle für jede Karte die passende Gruppe.</p><div class="classify-rows">${t.items.map((s,i)=>`<div class="classify-row"><strong>${esc(s)}</strong><div class="category-options">${t.categories.map((c,j)=>`<button data-row="${i}" data-category="${j}" class="${a[i]===j?'selected':''}" aria-pressed="${a[i]===j}" ${session.solved?'disabled':''}>${esc(c)}</button>`).join('')}</div></div>`).join('')}</div>`;
 if(t.type==='line') {
  const n=Math.round((t.end-t.start)/t.step),pos=a===null?0:Math.round((Number(a)-t.start)/t.step);
  return question+`<div class="line-control"><div id="lineDrawing">${numberLine(t.start,t.end,t.step,a)}</div><input type="range" id="lineRange" min="0" max="${n}" step="1" value="${pos}" aria-label="Markierung auf der Zahlengeraden" ${session.solved?'disabled':''}><div class="line-value"><button id="lineMinus" class="secondary-button" aria-label="Einen Schritt nach links" ${session.solved?'disabled':''}>${icon('minus')}</button><output id="lineOutput">${a===null?'Wähle eine Stelle':esc(formatNumber(a))}</output><button id="linePlus" class="secondary-button" aria-label="Einen Schritt nach rechts" ${session.solved?'disabled':''}>${icon('plus')}</button></div><p class="task-instruction">Verschiebe die Markierung. Die kleinen Tasten gehen genau einen Schritt.</p></div>`;
 }
 return question;
}
function showTask() {
 const s=session,t=s.q.tasks[s.index];returnFromInfo=null;
 const duel=['slime','boss','dragon'].includes(s.q.kind)&&!s.encounter;
 const duelRunes=duel?`<div class="duel-bar"><span>${icon('shield')} Rätselduell · Schutzrunen</span><span>${s.q.tasks.map((_,i)=>`<i class="${i<s.index+(s.solved?1:0)?'cleared':''}">${icon(i<s.index+(s.solved?1:0)?'check':'gem')}</i>`).join('')}</span><small>Jede richtige Antwort löst eine Rune.</small></div>`:'';
 const feedback=s.solved?`<div class="feedback correct" role="status"><strong>${icon('check')}Das passt!</strong><p>${esc(t.why)}</p></div>`:s.wrong?`<div class="feedback wrong" role="status"><strong>Noch nicht ganz. Probiere es weiter.</strong><p>${esc(s.stepAttempts===1?'Lies noch einmal, was in der Geschichte gesucht ist.':t.hint)}</p>${s.stepAttempts>=2?'<button class="text-button" id="showSolution">Rechenweg ansehen</button>':''}</div>`:'';
 openPanel('task',{title:s.q.title,tag:s.encounter?'WALDRÄTSEL':regionById(s.q.region).name,symbol:questIcon(s.q),subtitle:s.q.npc,actions:`<button id="taskInfo" class="text-button">${icon('book')}Wissen</button>`,body:`<div class="step-line"><span>Schritt ${s.index+1} von ${s.q.tasks.length}</span><span class="step-dots">${s.q.tasks.map((_,i)=>`<i class="${i<s.index?'done':i===s.index?'current':''}"></i>`).join('')}</span></div>${duelRunes}${taskControl(t)}${s.showHint?`<aside class="hint-box">${icon('help')}<span>${esc(t.hint)}</span></aside>`:''}${feedback}${s.showSolution?`<div class="solution-box"><strong>So geht es: ${esc(describeAnswer(t))}</strong><p>${esc(t.why)}</p><small>Trage das Ergebnis selbst ein und prüfe noch einmal.</small></div>`:''}`,foot:secondary(s.showHint?'Tipp ausblenden':'Ein kleiner Tipp','taskHint','help')+primary(s.solved?(s.index===s.q.tasks.length-1?'Quest abschließen':'Nächster Schritt'):'Antwort prüfen','checkTask',s.solved?'arrow':'check',!s.solved&&!answerReady())});
 $('taskInfo').onclick=()=>{returnFromInfo=()=>showTask();showInfo(s.q.region);};
 $('taskHint').onclick=()=>{session.showHint=!session.showHint;if(session.showHint)recordHint();showTask();};
 if($('showSolution'))$('showSolution').onclick=()=>{session.showSolution=true;recordHint();showTask();};
 $('checkTask').onclick=()=>s.solved?advanceTask():submitAnswer();
 panel.querySelectorAll('[data-key]').forEach(b=>b.onclick=()=>enterDigit(b.dataset.key));
 panel.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{
  if(s.solved)return;const i=+b.dataset.choice;
  if(t.type==='multi')s.answer=s.answer.includes(i)?s.answer.filter(v=>v!==i):[...s.answer,i];else s.answer=i;
  clearWrong();showTask();
 });
 panel.querySelectorAll('[data-order]').forEach(b=>b.onclick=()=>{s.answer.push(+b.dataset.order);clearWrong();showTask();});
 panel.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{s.answer.splice(+b.dataset.remove,1);clearWrong();showTask();});
 panel.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{s.answer[+b.dataset.row]=+b.dataset.category;clearWrong();showTask();});
 if(t.type==='line'){
  const setLine=value=>{if(s.solved)return;const pos=Math.max(0,Math.min(Math.round((t.end-t.start)/t.step),value));s.answer=String(Number((t.start+pos*t.step).toFixed(5)));clearWrong();$('lineRange').value=pos;$('lineDrawing').innerHTML=numberLine(t.start,t.end,t.step,s.answer);$('lineOutput').textContent=formatNumber(s.answer);$('checkTask').disabled=false;};
  $('lineRange').oninput=e=>setLine(+e.target.value);$('lineRange').onchange=e=>setLine(+e.target.value);
  $('lineMinus').onclick=()=>setLine(+$('lineRange').value-1);$('linePlus').onclick=()=>setLine(+$('lineRange').value+1);
 }
}
function clearWrong(){session.wrong=false;}
function enterDigit(k){
 if(mode!=='task'||session.solved||session.q.tasks[session.index].type!=='number')return;
 let a=String(session.answer);
 if(k==='⌫'||k==='Backspace')a=a.slice(0,-1);
 else if(k==='Delete')a='';
 else if(k===','||k==='.') {if(!/[,.]/.test(a))a=(a||'0')+',';}
 else if(/^\d$/.test(k)&&a.length<18)a+=k;
 else return;
 session.answer=a;session.wrong=false;
 $('numberAnswer').value=a;$('checkTask').disabled=!answerReady();
 const old=panel.querySelector('.feedback.wrong');if(old)old.remove();
}
function recordHint(){
 if(!session.usedHint){session.usedHint=true;session.hints++;state.stats.hints++;
  const p=state.progress[session.q.id];if(p&&!session.replay&&!session.encounter)p.hints=session.hints;
  persist();
 }
}
function submitAnswer(){
 if(!session||session.solved||!answerReady())return;
 const s=session,t=s.q.tasks[s.index];s.stepAttempts++;state.stats.attempts++;
 if(checkAnswer(t,s.answer)){
  s.solved=true;s.wrong=false;state.stats.correct++;chime(true);
  if(!s.replay&&!s.encounter){
   if(s.index===s.q.tasks.length-1){
    state.completed[s.q.id]={mistakes:s.mistakes,hints:s.hints,at:new Date().toISOString()};delete state.progress[s.q.id];
    world.sync(state);chooseNext(s.q.region);
    const obj=world.objects.find(o=>o.id===s.q.id);if(obj)pendingCelebration={x:obj.x,z:obj.z};
   } else state.progress[s.q.id]={step:s.index+1,mistakes:s.mistakes,hints:s.hints};
  }
 }else{
  s.wrong=true;s.mistakes++;chime(false);
  if(!s.replay&&!s.encounter)state.progress[s.q.id]={step:s.index,mistakes:s.mistakes,hints:s.hints};
 }
 persist();updateHUD();showTask();
}
function advanceTask(){
 if(session.index<session.q.tasks.length-1){session.index++;resetAnswer();showTask();}
 else showSuccess();
}
function showSuccess(){
 const s=session,final=s.q.id==='k4';
 openPanel('success',{title:final?'Kommaland leuchtet!':s.encounter?'Miko lächelt.':'Ein kleines Wunder geschafft',tag:s.encounter?'WALDRÄTSEL':regionById(s.q.region).name,symbol:'spark',body:`<div class="success-body"><div class="success-emblem">${icon(final?'star':questIcon(s.q))}</div><h3>${esc(s.q.title)}</h3><p>${esc(s.q.reward)}</p>${final?'<p>Du hast die vier Rechenarten zusammengebracht und das Sternenlicht entzündet. Offene Quests darfst du weiter entdecken.</p>':''}<div class="success-stats"><span>${icon('check')}${s.q.tasks.length} Schritte geschafft</span><span>${s.encounter?'Ein Gedanke aufgefrischt':`${countCompleted()} von 33 Quests`}</span></div>${s.replay?'<p class="small-note">Gut aufgefrischt! Dein bisheriger Fortschritt bleibt erhalten.</p>':''}</div>`,foot:`<span>${s.encounter?'Der Weg ist frei.':'Dein Fortschritt ist lokal gesichert.'}</span>`+primary('Zurück ins Abenteuer','backWorld')});
 $('backWorld').onclick=closeToWorld;
}
function showInfo(id,page=0) {
 if(!state.read.includes(id)){state.read.push(id);persist();}
 const r=regionById(id),pages=INFO[id],p=pages[page];
 openPanel('info',{title:p.title,tag:'WISSEN · '+r.name,symbol:'book',body:`<div class="info-layout"><div><p class="info-text">${esc(p.text)}</p><div class="example-stack">${p.examples.map(e=>`<div class="example">${esc(e)}</div>`).join('')}</div></div>${mathVisual(p.visual)}</div>`,foot:page>0?secondary('Zurück','infoPrev')+`<span class="pagination">${pages.map((_,i)=>`<i class="${i===page?'active':''}"></i>`).join('')}</span>`+primary(page<pages.length-1?'Weiter':returnFromInfo?'Zur Quest':'Verstanden','infoNext',page<pages.length-1?'arrow':'check'):`<span class="pagination">${pages.map((_,i)=>`<i class="${i===page?'active':''}"></i>`).join('')}</span>`+primary('Weiter','infoNext')});
 if($('infoPrev'))$('infoPrev').onclick=()=>showInfo(id,page-1);
 $('infoNext').onclick=()=>page<pages.length-1?showInfo(id,page+1):closePanel();
}

function mapPoint(r){return {x:72+(r.x+43)*5.1,y:36+(r.z+57)*2.85};}
function showMap(selected=world.region().id) {
 returnFromInfo=null;
 const r=regionById(selected),p=mapPoint(world.player),available=regionUnlocked(selected,state.completed);
 const lines=PATHS.map(([a,b])=>{const x=mapPoint(regionById(a)),y=mapPoint(regionById(b));return `<path class="map-path" d="M${x.x} ${x.y}L${y.x} ${y.y}"/>`;}).join('');
 const nodes=REGIONS.map(n=>{
  const xy=mapPoint(n),unlocked=regionUnlocked(n.id,state.completed),done=questsIn(n.id).filter(q=>state.completed[q.id]).length;
  return `<g class="map-node ${n.id===selected?'active':''} ${unlocked?'':'locked'}" transform="translate(${xy.x} ${xy.y})" data-region="${n.id}" tabindex="0" role="button" aria-label="${esc(n.name)}, ${esc(n.topic)}, ${done} Quests geschafft"><circle class="node-disc" r="23" fill="${n.color}"/><svg x="-12" y="-12" width="24" height="24" viewBox="0 0 24 24" class="node-icon">${icon(n.icon)}</svg><text class="node-title" text-anchor="middle" y="39">${esc(n.name)}</text><text class="node-sub" text-anchor="middle" y="53">${done}/${questsIn(n.id).length} ${unlocked?'✦':'· noch gesperrt'}</text></g>`;
 }).join('');
 const body=`<div class="map-body"><svg class="map-art" viewBox="0 0 705 375" role="group" aria-label="Lernlandkarte mit acht Orten"><defs><pattern id="mapDots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#c9c9ac" opacity=".55"/></pattern></defs><rect width="705" height="375" fill="url(#mapDots)" rx="14"/>${lines}${nodes}<circle class="player-dot" cx="${p.x}" cy="${p.y}" r="5"/><text x="20" y="28" fill="#9da68b" font-size="10" letter-spacing="2">N ↑</text><text x="570" y="345" fill="#9da68b" font-size="10" letter-spacing="1">DEIN ABENTEUER</text></svg><div class="map-selection"><div><span class="section-tag">${icon(r.icon)}${esc(r.tag)}</span><h3>${esc(r.name)}</h3><p>${esc(r.topic)}</p><small>${esc(available?r.hint:requirementText(selected,state.completed))}</small></div><div class="map-quests">${questsIn(selected).map(q=>`<button data-map-quest="${q.id}" class="${state.completed[q.id]?'done':''}">${icon(state.completed[q.id]?'check':questUnlocked(q,state.completed)?questIcon(q):'lock')}<span>${esc(q.title)}</span><small>${state.completed[q.id]?'3/3':(state.progress[q.id]?.step||0)+'/3'}</small>${icon('chevron')}</button>`).join('')}</div></div></div>`;
 openPanel('map',{title:'Deine Lernlandkarte',tag:`${seals()} VON 7 REISESIEGELN`,symbol:'map',subtitle:'Ein Reisesiegel erhältst du für zwei Quests an einem Lernort.',className:'map-panel',body,foot:`<span class="map-foot-note">Tippe einen Ort oder eine Quest an. Deine Figur läuft dorthin.</span>`+primary('Zum Infoschild','walkInfo','route')});
 panel.querySelectorAll('[data-region]').forEach(node=>{const select=()=>showMap(node.dataset.region);node.onclick=select;node.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}};});
 panel.querySelectorAll('[data-map-quest]').forEach(b=>b.onclick=()=>walkToQuest(b.dataset.mapQuest));
 $('walkInfo').onclick=()=>walkToObject(world.objects.find(o=>o.id==='info-'+selected));
}
function walkToObject(o) {
 if(!o)return;closeToWorld();
 if(Math.hypot(o.x-world.player.x,o.z-world.player.z)<5.2){interact(o);return;}
 const ok=world.goToObject(o);toast(ok?'Folge den kleinen Weglichtern. Du kannst jederzeit selbst steuern.':'Dieser Weg ist gerade nicht erreichbar. Gehe ein Stück weiter und versuche es erneut.');
}
function walkToQuest(id){const q=questById(id);state.activeQuest=id;persist();updateHUD();walkToObject(world.objects.find(o=>o.id===q.id));}
function showJournal(){
 openPanel('journal',{title:'Dein Reisebuch',tag:'DEIN LERNWEG',symbol:'book',body:`<div class="journal-grid">${REGIONS.map(r=>{const qs=questsIn(r.id),done=qs.filter(q=>state.completed[q.id]).length;return `<button class="journal-card" data-journal="${r.id}">${icon(r.icon)}<h3>${esc(r.name)}</h3><strong>${done} von ${qs.length} Quests</strong><small>${esc(r.topic)}</small><span>${r.id==='castle'?(state.completed.k4?'Sternenlicht entzündet':'Dein großes Finale'):done>=2?'Reisesiegel gefunden':`${Math.max(0,2-done)} Quests bis zum Reisesiegel`}</span></button>`;}).join('')}</div><p class="small-note">Jeder gelöste Schritt zählt. Fehler gehören zum Lernen und nehmen dir nichts weg. Deine Infoschilder sind jederzeit offen.</p>`,foot:secondary('Zum Rucksack','journalBack','menu')+primary('Weiterreisen','journalDone')});
 panel.querySelectorAll('[data-journal]').forEach(b=>b.onclick=()=>showMap(b.dataset.journal));$('journalBack').onclick=showMenu;$('journalDone').onclick=closeToWorld;
}
function showMenu(){
 returnFromInfo=null;
 const s=state.settings;
 const menuItem=(id,symbol,title,sub)=>`<button id="${id}">${icon(symbol)}<span><strong>${esc(title)}</strong><small>${esc(sub)}</small></span></button>`;
 const toggle=(id,title,sub,on)=>`<div class="settings-row"><div><strong>${esc(title)}</strong><small>${esc(sub)}</small></div><button id="${id}" class="toggle ${on?'on':''}" role="switch" aria-checked="${on}" aria-label="${esc(title)}"><i></i></button></div>`;
 openPanel('menu',{title:'Dein Reiserucksack',tag:'ALLES DABEI',symbol:'menu',body:`<div class="menu-summary"><strong>${countCompleted()} <span>von 33 Quests geschafft</span></strong><span>${seals()} / 7 Reisesiegel</span></div><div class="menu-grid">${menuItem('exportSave','download','Spielstand exportieren','Als JSON-Datei sichern')}${menuItem('importSave','upload','Spielstand importieren','Eine Sicherung laden')}${menuItem('openJournal','book','Reisebuch','Deine Lernorte im Überblick')}${menuItem('fullScreen','fullscreen','Vollbild','Ohne Browserleisten, soweit unterstützt')}${menuItem('goHome','home','Zurück nach Hause','Ins Funkeldorf zurückkehren')}${menuItem('previousSave','undo','Vorherigen Stand laden','Letzten Import oder Neustart rückgängig machen')}</div><h3 class="section-heading">So spielst du</h3><p class="small-note">Steuerkreis ziehen oder auf den Boden tippen. Nahe Objekte leuchten: Tippe darauf oder auf „Entdecken“. Tastatur: Pfeile / WASD, E zum Öffnen, M für die Karte, Esc zum Schließen.</p><div class="settings-block">${toggle('toggleSound','Sanfte Klänge','Kurze Töne bei einer Antwort',s.sound)}${toggle('toggleText','Größere Schrift','Mehr Platz zum Lesen',s.largeText)}${toggle('toggleMotion','Weniger Bewegung','Ohne schwingende Figuren und Konfetti',s.reducedMotion)}${toggle('toggleEco','Sparmodus','Niedrigere Auflösung und 30 Bilder pro Sekunde',s.quality==='eco')}</div><p class="storage-note ${!store.available?'warning':''}">${store.available?'Dein Fortschritt wird automatisch nur in diesem Browser gespeichert.':'Der Browser kann momentan nicht speichern. Bitte exportiere deinen Stand.'} Exportiere regelmäßig: Gelöschte Websitedaten, privates Surfen oder eine andere Geräteadresse können deinen Stand verschwinden lassen.</p><p class="small-note">${offlineReady?'Offline-Dateien sind auf diesem Gerät bereit.':'Für Offline-Nutzung: über HTTPS öffnen und einmal vollständig laden.'} Auf dem iPad: Safari → Teilen → Zum Home-Bildschirm → als Web-App öffnen.</p><button id="newGame" class="danger-button">Neues Abenteuer beginnen</button>`,foot:`<span>Keine Anmeldung. Keine Werbung. Kein Spielstand-Upload.</span>`+primary('Weiterreisen','menuDone')});
 $('menuDone').onclick=closeToWorld;$('exportSave').onclick=exportSave;$('importSave').onclick=()=>{$('importFile').value='';$('importFile').click();};
 $('openJournal').onclick=showJournal;$('fullScreen').onclick=toggleFullscreen;
 $('goHome').onclick=()=>{world.teleport(0,30);persist();closeToWorld();toast('Willkommen zu Hause im Funkeldorf.');};
 $('previousSave').onclick=()=>confirmAction('Den vorherigen Stand laden?','Der aktuelle Stand wird als Rücksicherung behalten. Diese Funktion ist nach einem Import oder Neustart verfügbar.','Sicherung laden',()=>{try{setState(store.restorePrevious());closeToWorld();toast('Der vorherige Stand ist wieder da.');}catch(e){toast(e.message);showMenu();}});
 $('newGame').onclick=()=>confirmAction('Ein neues Abenteuer?','Der aktuelle Spielstand wird ersetzt. Exportiere ihn vorher, um ihn dauerhaft zu behalten. Eine Rücksicherung bleibt im Rucksack erhalten.','Neu beginnen',()=>{setState(store.replace(defaultState()));closeToWorld();showWelcome();});
 [['toggleSound','sound'],['toggleText','largeText'],['toggleMotion','reducedMotion']].forEach(([id,key])=>$(id).onclick=()=>{s[key]=!s[key];applySettings();persist();showMenu();if(key==='sound')chime();});
 $('toggleEco').onclick=()=>{s.quality=s.quality==='eco'?'normal':'eco';applySettings();persist();showMenu();};
}
function confirmAction(title,text,label,action){
 openPanel('confirm',{title,tag:'DEIN SPIELSTAND',symbol:'shield',body:`<p class="confirm-text">${esc(text)}</p>`,foot:secondary('Abbrechen','cancelConfirm')+primary(label,'confirmAction','check')});
 $('cancelConfirm').onclick=showMenu;$('confirmAction').onclick=action;
}
function setState(next){
 state=next;store.state=state;session=null;returnFromInfo=null;pendingCelebration=null;
 world.sync(state);world.teleport(state.player.x,state.player.z);lastRegion=world.region().id;
 applySettings();updateHUD();updatePlace(lastRegion,false);persist();
}
function exportSave(){
 persist();const blob=new Blob([store.exportText()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 const stamp=new Date().toISOString().slice(0,16).replace(/[:T]/g,'-');a.href=url;a.download=`Kommaland-${stamp}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
 toast('Deine JSON-Sicherung ist bereit. Bewahre sie in „Dateien“ auf.');
}
$('importFile').addEventListener('change',async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{
  if(file.size>1000000)throw new Error('Die Datei ist zu groß (höchstens 1 MB).');
  pendingImport=parseSave(await file.text());
  confirmAction('Diesen Spielstand laden?',`${Object.keys(pendingImport.completed).length} Quests geschafft. Gespeichert am ${new Date(pendingImport.updatedAt).toLocaleString('de-DE')}. Dein jetziger Stand wird ersetzt und als Rücksicherung behalten.`,'Spielstand laden',()=>{setState(store.replace(pendingImport));pendingImport=null;closeToWorld();toast('Dein Abenteuer ist wieder da.');});
 }catch(error){pendingImport=null;toast(error.message||'Die Datei konnte nicht gelesen werden.');}
});
async function toggleFullscreen(){
 try{
  if(document.fullscreenElement)await document.exitFullscreen();
  else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();
  else if(document.documentElement.webkitRequestFullscreen)document.documentElement.webkitRequestFullscreen();
  else throw new Error('unsupported');
 }catch{toast('Safari: Teilen → Zum Home-Bildschirm. Dort kannst du Kommaland als Web-App öffnen.');}
}
function showWelcome(){
 openPanel('welcome',{title:'Willkommen in Kommaland.',tag:'DEIN DEZIMALZAHLEN-ABENTEUER',symbol:'spark',className:'welcome-panel',body:`<p class="welcome-intro">Im Funkeldorf ist das Sternenlicht erloschen. Mit kleinen Zahlen und klugen Ideen bringst du die Welt wieder zum Leuchten.</p><div class="welcome-features"><div class="welcome-feature">${icon('route')}<strong>Entdecken</strong><span>Ziehe den Steuerkreis oder tippe auf den Boden.</span></div><div class="welcome-feature">${icon('book')}<strong>Verstehen</strong><span>Die Infoschilder zeigen kurze Erklärungen und Beispiele.</span></div><div class="welcome-feature">${icon('spark')}<strong>Verändern</strong><span>Löse kleine Quests. Die Welt wächst mit dir.</span></div></div><p class="small-note">Kein Zeitdruck. Keine verlorenen Leben. Du kannst alles noch einmal versuchen. Papier und Stift dürfen mitreisen.</p>`,foot:`<span>Dein Fortschritt wird automatisch lokal gespeichert.</span>`+primary('Abenteuer beginnen','welcomeStart')});
 $('welcomeStart').onclick=()=>{state.tutorial=true;persist();closeToWorld();toast('Das Infoschild neben dir hilft dir beim Start. Danach wartet der Dorfbrunnen.');};
}

// Contextual labels are DOM buttons above their actual 3D positions.
const labels=new Map();
for(const o of world.objects){
 const b=document.createElement('button');b.className='world-label';b.dataset.object=o.id;
 b.setAttribute('aria-label',o.type==='info'?'Infoschild: '+regionById(o.region).name:o.q.title);
 b.innerHTML=`<span class="pin"><span></span></span><span class="label-text"></span>`;
 b.onclick=e=>{e.stopPropagation();if(mode)return;if(Math.hypot(o.x-world.player.x,o.z-world.player.z)<5.2)interact(o);else walkToObject(o);};
 $('worldLabels').appendChild(b);labels.set(o.id,b);
}
function syncLabels(){
 for(const o of world.objects){const b=labels.get(o.id);if(!b)continue;
  b.classList.toggle('info',o.type==='info');b.classList.toggle('done',!!o.done);b.classList.toggle('locked',o.type==='quest'&&!o.unlocked&&!o.done);
  b.querySelector('.pin>span').innerHTML=icon(o.type==='info'?'book':o.done?'check':!o.unlocked?'lock':questIcon(o.q));
  b.querySelector('.label-text').textContent=o.type==='info'?'Wissen · '+regionById(o.region).name:o.q.title;
 }
}
function updateLabels(){
 const nearest=mode?null:world.nearest();
 for(const o of world.objects){
  const b=labels.get(o.id),p=renderer.project(o.x,o.y+o.height+.4,o.z),visible=!mode&&Math.hypot(o.x-world.player.x,o.z-world.player.z)<29&&p.visible&&p.x>12&&p.x<renderer.width-12&&p.y>88&&p.y<renderer.h-45;
  b.hidden=!visible;if(visible){b.style.left=p.x+'px';b.style.top=p.y+'px';b.classList.toggle('near',o===nearest);}
 }
 $('interactButton').disabled=!nearest;$('interactText').textContent=nearest?(nearest.type==='info'?'Wissen lesen':nearest.done?'Noch mal üben':!nearest.unlocked?'Entdecken':'Quest öffnen'):'Entdecken';
 $('interactHint').textContent=nearest?(nearest.type==='info'?regionById(nearest.region).topic:nearest.q.title):'Geh zu einem Schild oder einer Quest.';
 $('interactIcon').innerHTML=icon(nearest?.type==='info'?'book':'hand');
}
function updatePlace(id,announce=true){
 const r=regionById(id);$('placeName').textContent=r.name;$('placeTopic').textContent=r.topic;$('placeIcon').innerHTML=icon(r.icon);
 if(!state.visited.includes(id)){state.visited.push(id);persist();}
 if(announce){$('arrivalTag').textContent=r.tag;$('arrivalName').textContent=r.name;$('arrival').classList.add('show-arrival');clearTimeout(arrivalTimer);arrivalTimer=setTimeout(()=>$('arrival').classList.remove('show-arrival'),3200);}
}

// Touch navigation deliberately uses a custom decimal keypad, not the iPad keyboard.
let stickPointer=null,stickRect=null,canvasDown=null;
function releaseStick(){stickPointer=null;world.stick={x:0,y:0};$('stickKnob').style.transform='translate(0,0)';}
function moveStick(e){
 if(e.pointerId!==stickPointer)return;e.preventDefault();
 const dx=e.clientX-(stickRect.left+stickRect.width/2),dy=e.clientY-(stickRect.top+stickRect.height/2),len=Math.hypot(dx,dy),f=len>38?38/len:1;
 world.stick={x:dx*f/38,y:dy*f/38};$('stickKnob').style.transform=`translate(${dx*f}px,${dy*f}px)`;
}
$('joystick').addEventListener('pointerdown',e=>{if(mode)return;e.preventDefault();stickPointer=e.pointerId;stickRect=$('joystick').getBoundingClientRect();$('joystick').setPointerCapture(e.pointerId);moveStick(e);});
$('joystick').addEventListener('pointermove',moveStick);
for(const ev of ['pointerup','pointercancel','lostpointercapture'])$('joystick').addEventListener(ev,releaseStick);
$('world').addEventListener('pointerdown',e=>{if(mode)return;canvasDown={id:e.pointerId,x:e.clientX,y:e.clientY};});
$('world').addEventListener('pointerup',e=>{
 if(!canvasDown||canvasDown.id!==e.pointerId||mode)return;const down=canvasDown;canvasDown=null;
 if(Math.hypot(e.clientX-down.x,e.clientY-down.y)>14)return;
 const rect=$('world').getBoundingClientRect(),p=renderer.screenToGround(e.clientX-rect.left,e.clientY-rect.top,terrainHeight);
 if(!world.goTo(p.x,p.z))toast('Bleib auf den Inseln und ihren Wegen.');
});
$('world').addEventListener('pointercancel',()=>canvasDown=null);
$('interactButton').onclick=()=>interact(world.nearest());
$('mapButton').onclick=()=>showMap();$('menuButton').onclick=showMenu;
$('tracker').onclick=()=>showMap((questById(state.activeQuest)||QUESTS[0]).region);
$('brandIcon').innerHTML=icon('gem');$('mapButton').innerHTML=icon('map');$('menuButton').innerHTML=icon('menu');
for(const event of ['gesturestart','gesturechange','gestureend'])document.addEventListener(event,e=>e.preventDefault(),{passive:false});
document.addEventListener('keydown',e=>{
 if(e.key==='Tab'&&mode){
  const buttons=[...panel.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex="0"]')].filter(x=>x.offsetParent!==null);
  const first=buttons[0],last=buttons.at(-1);
  if(!first){e.preventDefault();return;}
  if(e.shiftKey&&(document.activeElement===first||document.activeElement===panel)){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===panel)){e.preventDefault();first.focus();}
  return;
 }
 if(e.key==='Escape'){e.preventDefault();if(mode)closePanel();else showMenu();return;}
 if(mode){
  if(mode==='task'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
   if(e.key==='Enter'&&document.activeElement?.tagName!=='BUTTON'){e.preventDefault();if(session.solved)advanceTask();else submitAnswer();}
   else if(/^[0-9.,]$/.test(e.key)||['Backspace','Delete'].includes(e.key)){e.preventDefault();enterDigit(e.key);}
  }
  return;
 }
 const k=e.key.toLowerCase();
 if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(k)){e.preventDefault();world.keys.add(k);}
 if(!e.repeat&&(k==='e'||k===' ')){e.preventDefault();interact(world.nearest());}
 if(!e.repeat&&k==='m'){e.preventDefault();showMap();}
});
document.addEventListener('keyup',e=>world.keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>{world.stop();releaseStick();persist();});
window.addEventListener('pagehide',persist);
$('world').addEventListener('webglcontextlost',e=>{e.preventDefault();graphicsLost=true;world.stop();persist();toast('Die Grafik pausiert kurz. Dein Fortschritt bleibt gespeichert.');});
$('world').addEventListener('webglcontextrestored',()=>location.reload());
document.addEventListener('visibilitychange',()=>{world.stop();releaseStick();persist();lastFrame=0;});
let resizeTimer;
function resize(){clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{renderer.height=innerWidth<innerHeight?44:39;renderer.resize();},60);}
window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);

function encounter(){
 const q=makeEncounter(state.completed,state.encounters.count);state.encounters.count++;state.encounters.distance=0;lastEncounter=clock;persist();
 const mesh=world.encounterMesh;mesh.x=world.player.x+2;mesh.z=world.player.z-1;mesh.y=terrainHeight(mesh.x,mesh.z);mesh.visible=true;
 openPanel('encounter',{title:q.title,tag:'EINE BEGEGNUNG AM WEG',symbol:'leaf',subtitle:q.npc,body:`<div class="intro-layout"><div class="story-medallion">${icon('leaf')}</div><div class="story-text"><p>${esc(q.story)}</p><p>Ein kleines Rätsel zu etwas, das du schon kennst.</p></div></div>`,foot:secondary('Heute nicht','skipEncounter')+primary('Rätsel lösen','startEncounter')});
 $('skipEncounter').onclick=closeToWorld;$('startEncounter').onclick=()=>startQuest(q,false,true);
}
function frame(timestamp){
 requestAnimationFrame(frame);if(document.hidden||graphicsLost){lastFrame=0;return;}
 const dt=Math.min(.045,lastFrame?(timestamp-lastFrame)/1000:1/60);lastFrame=timestamp;clock+=dt;
 const moved=world.update(dt,clock,!!mode);state.encounters.distance+=moved;
 if(!mode){
  const r=world.region();if(r.id!==lastRegion){lastRegion=r.id;updatePlace(r.id);}
  if(countCompleted()>0&&state.encounters.distance>220+state.encounters.count%3*30&&clock-lastEncounter>180&&world.onPath())encounter();
 }
 const interval=mode?1000/24:state.settings.quality==='eco'?1000/30:0;
 if(timestamp-lastDraw>=interval){renderer.render(clock);updateLabels();lastDraw=timestamp;}
}
applySettings();resize();updateHUD();updatePlace(world.region().id,false);persist();
requestAnimationFrame(frame);
requestAnimationFrame(()=>{
 $('loading').classList.add('loaded');setTimeout(()=>$('loading').hidden=true,650);
 if(!state.tutorial)showWelcome();
 if(store.recovered)toast('Der letzte Spielstand war beschädigt. Eine gültige Sicherung wurde geladen, soweit vorhanden; sonst beginnt ein neuer Stand. Prüfe dein Reisebuch.');
});
setInterval(persist,10000);

// No CDN calls. Every required file is installed inside this site's own subdirectory.
if('serviceWorker' in navigator && (location.protocol==='https:'||['localhost','127.0.0.1'].includes(location.hostname))){
 navigator.serviceWorker.register(new URL('../sw.js',import.meta.url),{scope:new URL('../',import.meta.url).pathname})
 .then(()=>navigator.serviceWorker.ready).then(()=>{offlineReady=true;}).catch(error=>console.info('Offline-Modus nicht verfügbar:',error.message));
}
// Opt-in diagnostics for local teachers/developers. Not a secret or an examination system.
if(new URLSearchParams(location.search).get('debug')==='1'){
 window.__kommaland={world,renderer,get state(){return state;},get session(){return session;},get mode(){return mode;},interact,showMap,close:closeToWorld,persist,showQuestIntro,encounter};
}

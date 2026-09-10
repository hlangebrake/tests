import {questTopic,knowledgeTitle,progressDots,knowledgeContent,feedbackHTML,helpHTML,bindHelp} from './presentation.js';
import {QuestDifficulty} from './difficulty-ui.js';
import {Enrichment} from './enrichment.js';
import {LEARNING_GOALS, PRACTICE_SKILLS} from '../teacher-dashboard/shared/learning7-content.js';
import {skillsForEvent} from '../teacher-dashboard/shared/learning7.js';
import {writtenHTML,attachWritten,clearWrittenMemory} from './written.js';
import {CHECKS} from './foundation-checks.js';
import {Regulation} from './regulation.js';
import {RegulationUI} from './regulation-ui.js';
import {LearningLog} from './learning-log.js';
import {uid,cleanName,filename,FORMAT,validateSave,APP_VERSION,LIMITS} from '../teacher-dashboard/shared/save-schema.js';
import {shuffleIndices,seedOf} from './practice.js';
import {widgetHTML,attachTaskWidgets} from './task-widgets.js';
import {gateStatus, requiredForRoute, sourceLessons, basicQuests, allBasicDone, ensureExam, examQueue, examQuest, finishExamRound, routeKey, BARRIER_NAMES} from './adventure.js';
import {Renderer} from './engine.js';
import {World, terrainHeight} from './world.js';
import {REGIONS, PATHS, QUESTS, INFO, regionById, questById, questsIn, regionUnlocked, questUnlocked, requirementText, makeEncounter, badgeEarned} from './content.js';
import {LESSONS, lessonById} from './lessons.js';
import {shownLessonsForQuest, shouldIntroduce} from './learning-flow.js';
import {OUTLINE, CLEARINGS, ROUTES, onMainland, walkableLand, mountainZone} from './terrain.js';
import {SaveStore, defaultState, parseSave} from './state.js';
import {checkAnswer, decimal, formatNumber, describeAnswer} from './math.js';
import {icon, questIcon, esc, mathVisual, numberLine} from './ui.js';
import {labHTML, attachLabs, clearLabMemory} from './visuals.js';

const $ = id => document.getElementById(id);
const panel = $('panel'), overlay = $('overlay'), shell = $('gameShell');
let disposeLabs = ()=>{}, disposeWidgets=()=>{};
let mode = '', session = null, returnFromInfo = null, lastFocus = null;
// Previewing a card before starting a quest does not create mathematical progress.
const previewedLessons = new Map();
let toastTimer, arrivalTimer, offlineReady = false;
let lastRegion = 'village', lastEncounter = 0, lastFrame = 0, clock = 0, lastDraw = 0;
let audio = null, pendingImport = null, storageWarned = false, graphicsLost = false, logWarning=false;
const store = new SaveStore(ok => {
 $('saveDot').classList.toggle('warning', !ok||logWarning);
 $('saveDot').hidden=ok&&!logWarning;
 $('saveLabel').textContent = !ok ? 'Nicht gespeichert · bitte exportieren' : logWarning?'Lernhistorie: bitte exportieren':'';
 if (!ok && !storageWarned) {storageWarned=true; toast('Der Gerätespeicher ist nicht verfügbar. Sichere deinen Stand über den Rucksack.');}
});
let state = store.state;
let srlUI=null;let enrichment=null,practiceParent=null;let difficulty=null;
const learning=new LearningLog(()=>state,message=>{if(!logWarning){logWarning=true;toast(message);}$('saveDot').hidden=false;$('saveLabel').textContent='Lernhistorie: bitte exportieren';$('saveDot').classList.add('warning');});
const regulation=new Regulation(learning,()=>state);
let pendingLearningImport=null;
const renderer = new Renderer($('world'));
const world = new World(renderer, interact);
world.sync(state); world.teleport(state.player.x, state.player.z);
srlUI=new RegulationUI(regulation,{
 open:openPanel,closeWorld:()=>{srlUI.release();closeToWorld();},state:()=>state,session:()=>session,region:()=>world.region().id,
 regions:REGIONS,quests:QUESTS,unlocked:q=>questUnlocked(q,state.completed),recommended:recommendedQuest,walk:walkToQuest,
 walkInfo:q=>{state.activeQuest=q.id;persist();updateHUD();walkToObject(world.objects.find(o=>o.id==='info-'+q.region));},
 showMap,showTask,toast,refresh:updateHUD,strategyAction,exportFinished:()=>exportSave(true,true)
});
enrichment=new Enrichment(learning,{
 open:openPanel,closeWorld:()=>{enrichment.back=null;mode='v7-return';closeToWorld();},
 quests:QUESTS,region:()=>world.region().id,showQuest:showQuestIntro,showTask,toast,
 startPractice,returnPractice,advancePractice
});
difficulty=new QuestDifficulty(learning,{state:()=>state,session:()=>session,open:openPanel,persist,toast});
// Optional work uses the existing answer UI and help logger, never the core quest commit path.
function startPractice(q,index=0){
 if(!session?.practice){practiceParent=session&&!session.exam?session:null;learning.pauseQuest(session);}
 learning.tick();learning.closeHelps();
 session={q,index,practice:true,replay:true,encounter:false,answer:null,solved:false,wrong:false,stepAttempts:0,mistakes:0,hints:0,usedHint:false,shownLessons:new Set()};
 resetAnswer();showTask();
}
function returnPractice(){
 learning.tick();learning.closeHelps();learning.ctx={};enrichment.back=null;
 const previous=practiceParent||(!session?.practice?session:null);practiceParent=null;session=previous;
 if(session)showTask();else{mode='v7-return';closeToWorld();}
}
function advancePractice(){
 if(!session?.practice)return;
 learning.tick();learning.closeHelps();
 if(session.index<session.q.tasks.length-1){session.index++;resetAnswer();showTask();}
 else enrichment.finishRound(session.q.roundId);
}
function submitPractice(){
 if(!session?.practice||session.solved||!answerReady())return;
 const s=session,t=s.q.tasks[s.index],correct=checkAnswer(t,s.answer);
 s.reviewAttempt=false;s.lastAttempt=structuredClone(s.answer);s.stepAttempts++;
 enrichment.attempt(s,correct);s.solved=correct;s.wrong=!correct;if(!correct)s.mistakes++;
 chime(correct);showTask();
}
function enterLearning(){regulation.sync();updateHUD();if(regulation.needsPlan())srlUI.planning();else closeToWorld();}
function recommendedQuest(preferred=world.region().id){const choices=QUESTS.filter(q=>!q.challenge&&!state.completed[q.id]&&questUnlocked(q,state.completed));return choices.find(q=>q.region===preferred)||choices[0]||QUESTS.find(q=>q.challenge&&questUnlocked(q,state.completed)&&!state.completed[q.id]);}
function strategyAction(strategy){
 if(!session||session.exam)return;
 const t=session.q.tasks[session.index];learning.task(session.q,session.index,session);
 if(strategy==='later'&&session.practice){srlUI.release();enrichment.pause(session);returnPractice();return;}
 if(strategy==='later'){learning.skipQuest(session.q);srlUI.release();closeToWorld();announce('Für später aufgehoben.');return;}
 if(strategy==='example'){returnFromInfo=()=>showTask();showExample(t.lesson);return;}
 if(strategy==='knowledge'||strategy==='drawing'){returnFromInfo=()=>showTask();showKnowledge(t.lesson,false);return;}
 if(strategy==='check'){session.reviewAttempt=true;showTask();return;}
 if(strategy==='steps'){showScaffold(1);return;}
 if(strategy==='person'){showTask();toast('Bitte eine Lehrkraft oder eine andere Person um Hilfe. Zeige, was du schon versucht hast.');return;}
 if(strategy==='hint'){session.showHint=true;recordHint();learning.help('hint','task');showTask();return;}
 showTask();const target=panel.querySelector('.question')||panel.querySelector('.panel-body');target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true});target?.scrollIntoView({block:'nearest'});
}
function showScaffold(step=1){
 if(!session||session.exam)return;learning.task(session.q,session.index,session);const t=session.q.tasks[session.index];
 returnFromInfo=()=>showTask();
 openPanel('srl-scaffold',{title:questTopic(session.q),subtitle:'Schrittweise Unterstützung',symbol:'help',className:'srl-panel',body:`<p class="question">${esc(t.text)}</p><ol class="srl-steps"><li><strong>Was ist gesucht?</strong><p>Formuliere für dich, was du herausfinden oder begründen sollst. Welche Einheit oder Darstellung gehört dazu?</p></li>${step>=2?`<li><strong>Welche Angaben helfen?</strong><p>${esc(t.hint)}</p></li>`:''}${step>=3?'<li><strong>Plane einen kleinen Rechenschritt.</strong><p>Notiere eine passende Rechnung oder Skizze. Prüfe danach, ob dein Ergebnis zur Frage passt. Ein ähnliches Beispiel ist unten verfügbar.</p></li>':''}</ol>`,foot:secondary('Zur Aufgabe','scaffoldBack')+(step<3?primary('Nächsten kleinen Schritt zeigen','scaffoldNext'):secondary('Ähnliches Beispiel','scaffoldExample','eye')+secondary('Rechenweg jetzt aufdecken','scaffoldSolution','help'))});
 srlUI.back=()=>showTask();learning.help('otherHelp','srl-scaffold',false,'scaffold');
 $('scaffoldBack').onclick=()=>{srlUI.release();showTask();};if($('scaffoldNext'))$('scaffoldNext').onclick=()=>showScaffold(step+1);
 if($('scaffoldExample'))$('scaffoldExample').onclick=()=>{srlUI.release();returnFromInfo=()=>showTask();showExample(t.lesson);};
 if($('scaffoldSolution'))$('scaffoldSolution').onclick=()=>{srlUI.release();session.showSolution=true;recordHint();learning.help('solutionStep','task');showTask();};
}

function announce(text){$('worldStatus').textContent='';queueMicrotask(()=>{$('worldStatus').textContent=text;});}
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
function openPanel(nextMode,{title,tag='KOMMALAND',symbol='book',subtitle='',body='',foot='',actions='',className='',math=false,progress=''}={}) {
 enrichment?.beforePanel(nextMode);
 if(!nextMode.startsWith('srl-'))srlUI?.release();
 learning.setScreen(nextMode);
 disposeWidgets();disposeWidgets=()=>{};
 disposeLabs(); disposeLabs=()=>{};
 if(overlay.hidden) lastFocus=document.activeElement;
 const previousMode=mode,previousFocus=panel.contains(document.activeElement)?document.activeElement?.id:null,previousScroll=panel.querySelector('.panel-body')?.scrollTop||0;
 mode=nextMode; world.stop(); releaseStick(); overlay.hidden=false; shell.inert=true;
 const compact=math||['lesson','example','info','task','intro','success','gate-intro','gate-result','difficulty-select','srl-scaffold'].includes(nextMode)||nextMode.startsWith('srl-')||nextMode.startsWith('v7-');
 panel.className='scroll-panel '+className+(compact?' math-surface':'');
 panel.dataset.mode=nextMode;
 const close=`<button class="close-button" id="closePanel" aria-label="Ansicht schließen">${icon('close')}</button>`;
 panel.innerHTML=(compact?`<header class="panel-head math-head"><div class="math-title-row"><h2 id="panelTitle">${esc(title)}</h2><div class="head-actions">${actions}${close}</div></div>${subtitle||progress?`<div class="math-context-row">${subtitle?`<p class="panel-subtitle">${esc(subtitle)}</p>`:''}${progress}</div>`:''}</header>`:`<header class="panel-head"><div class="panel-topline"><span class="section-tag">${icon(symbol)}${esc(tag)}</span><div class="head-actions">${actions}${close}</div></div><h2 id="panelTitle">${esc(title)}</h2>${subtitle?`<p class="panel-subtitle">${esc(subtitle)}</p>`:''}</header>`)+`<div class="panel-body">${body}</div>${foot?`<footer class="panel-foot">${foot}</footer>`:''}`;
 const stopLabs=attachLabs(panel),stopWritten=attachWritten(panel);
 disposeLabs=()=>{stopWritten();stopLabs();};
 $('closePanel').onclick=closePanel;
 panel.focus({preventScroll:true});
 if(previousMode===nextMode){const focus=previousFocus&&$(previousFocus);if(focus&&!focus.disabled&&focus.getClientRects().length)focus.focus({preventScroll:true});panel.querySelector('.panel-body').scrollTop=previousScroll;}
}

function closePanel() {
 if(difficulty?.handleClose())return;
 if(enrichment?.handleClose())return;
 if(mode==='task'&&session?.practice){enrichment.pause(session);returnPractice();return;}
 if(srlUI?.handleClose())return;
 if(mode==='build'||mode==='gatebuild'||mode==='profile'||mode==='learning-loading')return;
 if(['info','lesson','example'].includes(mode) && returnFromInfo){const back=returnFromInfo;returnFromInfo=null;back();return;}
 const checkOrientation=mode==='task'&&session&&!session.exam&&!session.solved;
 learning.pauseQuest(session);learning.setScreen('world');
 disposeWidgets();disposeWidgets=()=>{};
 disposeLabs();disposeLabs=()=>{};
 if($('taskHelpMenu')){$('taskHelpMenu').hidden=true;$('taskHelpToggle').setAttribute('aria-expanded','false');}
 mode='';overlay.hidden=true;shell.inert=false;world.stop();releaseStick();world.encounterMesh.visible=false;
 if(lastFocus?.isConnected && !lastFocus.closest('#overlay'))lastFocus.focus({preventScroll:true});
 else $('world').focus({preventScroll:true});
 persist();
 if(checkOrientation)queueMicrotask(()=>{if(!mode)srlUI.maybe('orientation');});
}
function closeToWorld(){returnFromInfo=null;closePanel();}
function primary(label,id='primary',symbol='arrow',disabled=false){return `<button id="${id}" class="primary-button" ${disabled?'disabled':''}>${esc(label)}${icon(symbol)}</button>`;}
function secondary(label,id,symbol='back'){return `<button id="${id}" class="secondary-button">${icon(symbol)}${esc(label)}</button>`;}
function countCompleted(){return Object.keys(state.completed).length;}
function seals(){return Object.keys(state.mastery).length;}
function chooseNext(preferred) {
 const choices=QUESTS.filter(q=>!state.completed[q.id]&&questUnlocked(q,state.completed));
 const next=choices.find(q=>q.region===preferred)||choices[0];state.activeQuest=next?.id||'c6-k4';
}
function updateHUD(){
 document.body.classList.toggle('tutorial-done',!!state.tutorial);
 $('questCount').textContent=countCompleted();$('questTotal').textContent=QUESTS.length;
 const q=questById(state.activeQuest)||QUESTS[0],r=regionById(q.region),done=!!state.completed[q.id];
 $('trackerTitle').textContent=questTopic(q);
 $('trackerDetail').textContent=q.title;
 $('trackerIcon').innerHTML=icon(questIcon(q));$('trackerFill').style.width=(done?100:(state.progress[q.id]?.ready?q.tasks.length:(state.progress[q.id]?.step||0))/q.tasks.length*100)+'%';
 const level=regulation.levels.navigation;
 $('tracker').querySelector('.eyebrow').textContent=['DEINE ENTSCHEIDUNG','DEIN LERNWEG','EMPFOHLENER SCHRITT','DEIN NÄCHSTER SCHRITT'][level];
 $('tracker').setAttribute('aria-label',level<=1?'Hilf mir bei der Auswahl':'Empfohlenen Lernschritt anzeigen');
 if(level<=1){$('trackerTitle').textContent='Hilf mir bei der Auswahl';$('trackerDetail').textContent=level===0?'Du entscheidest auf der Karte.':'Weiterüben, wiederholen oder Neues entdecken.';}
 $('tracker').classList.toggle('srl-free',level===0);
 syncLabels();
}
function interact(o) {
 if(!o || mode) return;
 if(Math.hypot(o.x-world.player.x,o.z-world.player.z)>=5.3){world.goToObject(o);return;}
 if(o.hidden)return;
 if(o.type==='info'){showInfo(o.region);return;}
 if(o.type==='gate'){showGateIntro(o);return;}
 if(o.type==='resident'){showResident(o);return;}
 const q=o.q;
 if(!questUnlocked(q,state.completed) && !state.completed[q.id]){showLocked(q);return;}
 showQuestIntro(q);
}
function showLocked(q) {
 openPanel('locked',{title:questTopic(q),subtitle:q.title,math:true,symbol:'help',body:`<p>${esc(requirementText(q.id,state.completed))}</p><p class="small-note">Du darfst die Quest trotzdem versuchen.</p>`,foot:secondary('Vorwissen ansehen','lockedInfo','book')+primary('Trotzdem beginnen','ignoreLocked')});
 $('lockedInfo').onclick=()=>showInfo(q.region);$('ignoreLocked').onclick=()=>{learning.bypass(q);showQuestIntro(q);};
}
function showQuestIntro(q) {
 if(session?.practice)enrichment.pause(session);practiceParent=null;
 session=null;returnFromInfo=null;
 const done=state.completed[q.id],progress=state.progress[q.id],r=regionById(q.region);
 openPanel('intro',{title:questTopic(q),subtitle:q.title,progress:progressDots(q.tasks.length,done?q.tasks.length:progress?.step||0,!!progress?.ready),className:'intro-panel',body:`${q.challenge?'<p class="calm-note">Freiwillige Vertiefung. Hilfen sind verfügbar; du kannst später zurückkommen.</p>':''}${done?.credit==='legacy'?'<p class="replay-note">Frühere Abschlüsse angerechnet; für neue Aufgaben gibt es noch keine Antwortdaten.</p>':''}<details class="quest-story"><summary>Questgeschichte anzeigen</summary><p>${esc(q.story)}</p><p class="small-note">${esc(q.npc)} · ${esc(r.name)}</p><p>${esc(q.reward)}</p></details>${done?'<p class="small-note">Wiederholen verändert deinen bisherigen Abschluss nicht.</p>':''}`,foot:helpHTML(secondary('Wissen','introInfo','book'))+primary(done?'Noch einmal üben':progress?.ready?'Quest abschließen':progress?'Weiterlernen':'Quest beginnen','beginQuest')});
 bindHelp(panel);
 $('introInfo').onclick=()=>{returnFromInfo=()=>showQuestIntro(q);showKnowledge(q.tasks[progress?.step||0].lesson,false,q);};
 $('beginQuest').onclick=()=>startQuest(q,!!done);
 if(!done){const b=document.createElement('button');b.className='text-button';b.id='deferQuest';b.textContent='Für später merken';panel.querySelector('#taskHelpMenu .learning-actions').append(b);b.onclick=()=>{learning.skipQuest(q);if(q.challenge)regulation.challenge(q,'later','quest_intro');closeToWorld();announce('Für später gemerkt.');srlUI.maybe('skips');};}
 enrichment.mountQuest(q);difficulty.mount(q,()=>showQuestIntro(q),{taskContext:false});
}
function startQuest(q,replay=false,encounter=false) {
 const p=!replay&&!encounter?state.progress[q.id]:null;
 q=difficulty.prepare(q);
 session={q,index:p?.step||0,answer:null,solved:false,wrong:false,stepAttempts:0,usedHint:false,showHint:false,showSolution:false,mistakes:p?.mistakes||0,hints:p?.hints||0,replay,encounter};
 if(p&&!p.taskVariants)session.legacyOpenSlot=q.tasks[session.index].key;
 if(!encounter&&!replay){state.activeQuest=q.id;state.progress[q.id]??={step:0,mistakes:0,hints:0};persist();updateHUD();}
 session.logRunId=learning.quest(q,{replay,encounter});
 if(!encounter)regulation.questStarted(q);
 session.shownLessons=shownLessonsForQuest(q,p,!!state.completed[q.id]);
 for(const id of previewedLessons.get(q.id)||[])session.shownLessons.add(id);
 saveShownLessons();
 world.sync(state);updateHUD();
 resetAnswer();
 if(p?.ready){session.solved=true;session.answer=q.tasks[session.index].answer;showTask();}
 else beginLearningStep();
}
function resetAnswer(){
 difficulty?.fixTask(session);
 const t=session.q.tasks[session.index];
 session.workIndex=0;session.lastAttempt=null;
 session.answer=t.type==='work'?Array(t.fields.length).fill(''):t.type==='number'?'':['multi','order','argument'].includes(t.type)?[]:['classify','match'].includes(t.type)?Array(t.items.length).fill(null):null;
 session.seed=seedOf(session.q.id+':'+session.index+':'+(session.exam?state.exams[routeKey(session.q.from,session.q.to)]?.round:Date.now()));
 session.optionOrder=shuffleIndices(t.options?.length||t.items?.length||0,session.seed);
 session.solved=false;session.wrong=false;session.stepAttempts=0;session.usedHint=false;session.showHint=false;session.showSolution=false;
}
function answerReady(){
 if(!session)return false;const t=session.q.tasks[session.index],a=session.answer;
 if(t.type==='work')return Array.isArray(a)&&a.length===t.fields.length&&a.every(x=>!!decimal(x));
 if(t.type==='number')return !!decimal(a);
 if(t.type==='multi')return a.length>0;
 if(t.type==='classify'||t.type==='match')return a.every(x=>Number.isInteger(x));
 if(t.type==='order'||t.type==='argument')return a.length===t.answer.length;
 if(t.type==='mark')return Array.isArray(a);
 return a!==null;
}
function taskControl(t) {
 const a=session.answer,widget=widgetHTML(t,a,session.solved,session.seed,session.workIndex||0);if(widget!==null)return widget;
 if(t.type==='number')return `<div class="task-numeric"><div><p class="question">${esc(t.text)}</p>${mathVisual(t.visual,true)}</div><div><div class="number-entry"><input id="numberAnswer" type="text" inputmode="none" readonly value="${esc(a)}" aria-label="Deine Antwort" autocomplete="off" spellcheck="false"><span class="unit">${esc(t.unit||'')}</span></div><div class="keypad">${['7','8','9','4','5','6','1','2','3',',','0','⌫'].map(k=>`<button data-key="${k}" aria-label="${k==='⌫'?'Letzte Ziffer löschen':k===','?'Dezimalkomma':k}" ${session.solved?'disabled':''}>${k==='⌫'?icon('erase'):k}</button>`).join('')}</div></div></div>`;
 const question=`<p class="question">${esc(t.text)}</p>`;
 if(t.type==='choice'||t.type==='multi')return question+mathVisual(t.visual,true)+`<p class="task-instruction">${t.type==='multi'?'Wähle alle passenden Antworten.':'Wähle eine Antwort.'}</p><div class="choices">${session.optionOrder.map((i,pos)=>{const s=t.options[i];const selected=t.type==='multi'?a.includes(i):a===i;return `<button class="choice ${t.type==='multi'?'multi':''} ${selected?'selected':''}" data-choice="${i}" aria-pressed="${selected}" ${session.solved?'disabled':''}><span class="choice-symbol">${selected?icon('check'):String.fromCharCode(65+pos)}</span><span>${esc(s)}</span></button>`;}).join('')}</div>`;
 if(t.type==='order')return question+`<p class="task-instruction">Kärtchen der Reihe nach wählen. Erneutes Antippen legt sie zurück.</p><div class="order-target" aria-label="Deine Reihenfolge">${a.length?a.map((i,j)=>`<button data-remove="${j}" ${session.solved?'disabled':''}><small>${j+1}</small>${esc(t.items[i])}</button>`).join(''):'<span>Hier entsteht deine Reihenfolge …</span>'}</div><div class="order-source">${session.optionOrder.map(i=>`<button data-order="${i}" ${a.includes(i)||session.solved?'disabled':''}>${esc(t.items[i])}</button>`).join('')}</div>`;
 if(t.type==='classify')return question+`<p class="task-instruction">Wähle für jede Karte die passende Gruppe.</p><div class="classify-rows">${t.items.map((s,i)=>`<div class="classify-row"><strong>${esc(s)}</strong><div class="category-options">${t.categories.map((c,j)=>`<button data-row="${i}" data-category="${j}" class="${a[i]===j?'selected':''}" aria-pressed="${a[i]===j}" ${session.solved?'disabled':''}>${esc(c)}</button>`).join('')}</div></div>`).join('')}</div>`;
 if(t.type==='line') {
  const n=Math.round((t.end-t.start)/t.step),pos=a===null?0:Math.round((Number(a)-t.start)/t.step);
  return question+`<div class="line-control"><div id="lineDrawing">${numberLine(t.start,t.end,t.step,a,true)}</div><input type="range" id="lineRange" min="0" max="${n}" step="1" value="${pos}" aria-label="Markierung auf der Zahlengeraden" aria-valuetext="Unbeschriftete Markierung" ${session.solved?'disabled':''}><div class="line-value"><button id="lineMinus" class="secondary-button" aria-label="Einen Schritt nach links" ${session.solved?'disabled':''}>${icon('minus')}</button><output id="lineOutput">${a===null?'Wähle eine Stelle':session.solved?esc(formatNumber(a)):'Markierung gesetzt'}</output><button id="linePlus" class="secondary-button" aria-label="Einen Schritt nach rechts" ${session.solved?'disabled':''}>${icon('plus')}</button></div><p class="task-instruction">Marker verschieben oder mit − / + schrittweise bewegen.</p></div>`;
 }
 return question;
}
function describeAttempt(t,a){
 if(a===null||a===undefined)return 'Noch kein abgegebener Versuch. Deine aktuelle Eingabe bleibt unten erhalten.';
 if(t.type==='work')return t.fields.map((x,i)=>x+': '+String(a[i]??'leer')).join(' · ');
 if(t.type==='choice')return t.options[a]||'Keine Auswahl';
 if(t.type==='error')return 'Markierte Zeile '+(a+1)+': '+t.steps[a];
 if(['order','argument'].includes(t.type))return a.map(i=>t.items[i]).join(' → ');
 if(t.type==='multi')return a.map(i=>t.options[i]).join(' · ');
 if(t.type==='match')return t.items.map((x,i)=>x+': '+(t.categories[a[i]]||'leer')).join(' · ');
 if(t.type==='mark')return a.length+' markierte Felder';
 return String(a);
}
function showTask() {
 if(session?.practice)enrichment.task(session);
 else if(session)learning.task(session.q,session.index,session);
 if(session?.exam){showExamTask();return;}
 const s=session,t=s.q.tasks[s.index];returnFromInfo=null;
 const feedback=s.solved?feedbackHTML(t,s.answer):s.wrong?`<div class="feedback wrong" role="status"><strong>Noch nicht richtig.</strong>${s.stepAttempts>=2?'<button class="text-button" id="showSolution">Schrittweise Unterstützung</button>':''}</div>`:'';
 openPanel('task',{title:questTopic(s.q),subtitle:s.q.title===questTopic(s.q)?'':s.q.title,progress:progressDots(s.q.tasks.length,s.index,s.solved),body:`${taskControl(t)}${s.reviewAttempt?`<aside class="evidence-note"><strong>Dein letzter Versuch</strong><p>${esc(describeAttempt(t,s.lastAttempt))}</p></aside>`:''}${t.orientation&&!s.solved?`<aside class="difficulty-scaffold"><strong>${esc(t.orientation.title)}</strong><p>${t.orientation.steps.map(esc).join(' ')}</p></aside>`:''}${s.showHint?`<aside class="hint-box">${icon('help')}<span>${esc(t.hint)}</span></aside>`:''}${feedback}${s.showSolution?`<div class="solution-box"><strong>${esc(describeAnswer(t))}</strong><p>${esc(t.why)}</p></div>`:''}`,className:'task-panel',foot:helpHTML(secondary('Wissen','taskInfo','book')+secondary('Beispiel','taskExample','eye')+secondary(s.showHint?'Tipp schließen':'Tipp','taskHint','help')+secondary('Strategie','taskStrategy','route'))+primary(s.solved?(s.index===s.q.tasks.length-1?(s.practice?'Runde beenden':'Quest abschließen'):'Weiter'):'Antwort prüfen','checkTask',s.solved?'arrow':'check',!s.solved&&!answerReady())});
 bindHelp(panel);
 bindSpecialWidgets(t);bindWorkFields(t);
 $('taskStrategy').onclick=()=>{learning.task(s.q,s.index,s);srlUI.strategy();};
 if(s.solved)$('taskStrategy').disabled=true;
 const suggested={1:'taskHint',2:'taskExample',3:'taskStrategy'}[regulation.levels.content];if(suggested&&!s.solved)$(suggested)?.classList.add('srl-suggested');
 $('taskInfo').onclick=()=>{returnFromInfo=()=>showTask();showKnowledge(t.lesson);};
 $('taskExample').onclick=()=>{regulation.selectStrategy('example',{source:'help_button'});returnFromInfo=()=>showTask();showExample(t.lesson);};
 if(s.showHint)learning.help('hint','task',false,'hint',true);if(s.showSolution)learning.help('solutionStep','task',false,'solutionStep',true);
 $('taskHint').onclick=()=>{session.showHint=!session.showHint;if(session.showHint){regulation.selectStrategy('hint',{source:'help_button'});recordHint();learning.help('hint','task');}else learning.closeHelp('hint');showTask();};
 if($('showSolution'))$('showSolution').onclick=()=>{regulation.selectStrategy('steps',{source:'help_button'});showScaffold();};
 $('checkTask').onclick=()=>s.solved?advanceTask():submitAnswer();
 if(s.solved||s.wrong)queueMicrotask(()=>{if(mode==='task')panel.querySelector('.feedback')?.scrollIntoView({block:'nearest'});});
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
  const setLine=value=>{if(s.solved)return;const pos=Math.max(0,Math.min(Math.round((t.end-t.start)/t.step),value));s.answer=String(Number((t.start+pos*t.step).toFixed(5)));clearWrong();$('lineRange').value=pos;$('lineDrawing').innerHTML=numberLine(t.start,t.end,t.step,s.answer,true);$('lineOutput').textContent='Markierung gesetzt';$('checkTask').disabled=false;};
  $('lineRange').oninput=e=>setLine(+e.target.value);$('lineRange').onchange=e=>setLine(+e.target.value);
  $('lineMinus').onclick=()=>setLine(+$('lineRange').value-1);$('linePlus').onclick=()=>setLine(+$('lineRange').value+1);
 }
 if(s.practice){
  const foot=panel.querySelector('#taskHelpMenu .learning-actions');const controls=document.createElement('div');controls.className='v7-practice-controls';
  controls.innerHTML=secondary('Runde später fortsetzen','v7PauseRound')+(!s.solved?secondary('Diese Aufgabe auslassen','v7SkipPractice'):'');foot.append(controls);
  $('v7PauseRound').onclick=()=>{enrichment.pause(s);returnPractice();};if($('v7SkipPractice'))$('v7SkipPractice').onclick=()=>enrichment.skip(s);
 }else if(!s.encounter){enrichment.mountTask(s);difficulty.mount(s.q,()=>showTask());}
}
function bindWorkFields(t){
 if(t.type!=='work')return;
 panel.querySelectorAll('[data-work-field]').forEach(b=>b.onclick=()=>{if(session.solved)return;session.workIndex=+b.dataset.workField;showTask();});
 if($('workNext'))$('workNext').onclick=()=>{session.workIndex=((session.workIndex||0)+1)%t.fields.length;showTask();};
}
function clearWrong(){session.wrong=false;}
function enterDigit(k){
 if(mode!=='task'||session.solved)return;const t=session.q.tasks[session.index];if(!['number','work'].includes(t.type))return;const i=session.workIndex||0;
 let a=String(t.type==='work'?session.answer[i]:session.answer);
 if(k==='⌫'||k==='Backspace')a=a.slice(0,-1);
 else if(k==='Delete')a='';
 else if(k===','||k==='.') {if(!/[,.]/.test(a))a=(a||'0')+',';}
 else if(/^\d$/.test(k)&&a.length<18)a+=k;
 else return;
 if(t.type==='work'){session.answer[i]=a;const b=panel.querySelector('[data-work-field="'+i+'"]');if(b){b.textContent=a||'□';b.setAttribute('aria-label',t.fields[i]+': '+(a||'noch leer'));}if($('workValue'))$('workValue').textContent=a||'□';}
 else{session.answer=a;$('numberAnswer').value=a;}session.wrong=false;
 $('checkTask').disabled=!answerReady();
 const old=panel.querySelector('.feedback.wrong');if(old)old.remove();
}
function recordHint(){
 if(session?.practice){if(!session.usedHint){session.usedHint=true;session.hints++;}return;}
 if(!session.usedHint){session.usedHint=true;session.hints++;state.stats.hints++;
  const p=state.progress[session.q.id];if(p&&!session.replay&&!session.encounter)p.hints=session.hints;
  persist();
 }
}
function submitAnswer(){
 if(session?.practice){submitPractice();return;}
 if(session?.exam){submitExamAnswer();return;}
 if(!session||session.solved||!answerReady())return;
 const s=session,t=s.q.tasks[s.index];s.reviewAttempt=false;s.lastAttempt=structuredClone(s.answer);s.stepAttempts++;state.stats.attempts++;
 learning.task(s.q,s.index,s);learning.attempt(checkAnswer(t,s.answer));
 if(checkAnswer(t,s.answer)){
  s.solved=true;s.wrong=false;state.stats.correct++;chime(true);
  if(!s.replay&&!s.encounter){
   if(s.index===s.q.tasks.length-1){
    state.progress[s.q.id]={...state.progress[s.q.id],step:s.index,mistakes:s.mistakes,hints:s.hints,ready:true};
   } else state.progress[s.q.id]={...state.progress[s.q.id],step:s.index+1,mistakes:s.mistakes,hints:s.hints};
  }
 }else{
  s.wrong=true;s.mistakes++;chime(false);
  if(!s.replay&&!s.encounter)state.progress[s.q.id]={...state.progress[s.q.id],step:s.index,mistakes:s.mistakes,hints:s.hints};
 }
 world.sync(state);persist();updateHUD();showTask();
 if(!s.solved)srlUI.maybe('errors');
}
function advanceTask(){
 if(!session?.solved)return;
 if(session.practice){advancePractice();return;}
 if(session.index<session.q.tasks.length-1){session.index++;resetAnswer();beginLearningStep();}
 else finishQuest();
}
function saveShownLessons(){
 const s=session,p=s&&state.progress[s.q.id];
 if(!s||!p||s.replay||s.encounter||s.exam)return;
 if(s.shownLessons?.size)p.shownLessons=[...s.shownLessons];
 persist();
}
function rememberKnowledge(id,q=session?.q){
 if(!q||session?.exam||!q.tasks.some(t=>t.lesson===id))return;
 let shown=previewedLessons.get(q.id);
 if(!shown){shown=new Set();previewedLessons.set(q.id,shown);}
 shown.add(id);
 if(session?.q.id===q.id){session.shownLessons??=new Set();session.shownLessons.add(id);saveShownLessons();}
 else if(state.progress[q.id]&&!state.completed[q.id]){
  state.progress[q.id].shownLessons=[...new Set([...(state.progress[q.id].shownLessons||[]),id])];persist();
 }
}
function beginLearningStep(){
 const s=session,t=s.q.tasks[s.index];learning.task(s.q,s.index,s);
 if(!shouldIntroduce(t,s.shownLessons,{encounter:s.encounter,exam:s.exam,challenge:s.q.challenge})){showTask();return;}
 returnFromInfo=()=>showTask();showKnowledge(t.lesson,true);
}
function finishQuest(){
 if(session?.practice){enrichment.finishRound(session.q.roundId);return;}
 const s=session;if(!s?.solved||mode==='build')return;
 learning.complete(s.q,s);
 if(s.replay||s.encounter){showSuccess();return;}
 // This explicit confirmation is the single commit point. Reloading mid-animation keeps the build.
 state.completed[s.q.id]={mistakes:s.mistakes,hints:s.hints,at:new Date().toISOString()};delete state.progress[s.q.id];
 chooseNext(s.q.region);world.sync(state);persist();learning.updateChallenges();updateHUD();
 returnFromInfo=null;mode='build';overlay.hidden=true;shell.inert=true;world.stop();releaseStick();
 $('buildNotice').hidden=true;announce('Quest abgeschlossen.');
 world.beginBuild(s.q.id,()=>{$('buildNotice').hidden=true;showSuccess();});
 chime(true);
}
function showSuccess(){
 const s=session;
 if(s.encounter||s.q.challenge){if(!s.encounter){regulation.fade();updateHUD();}mode='completed';closeToWorld();announce('Quest abgeschlossen.');return;}
 openPanel('success',{title:questTopic(s.q),subtitle:s.q.title,className:'completion-panel',body:'<p class="completion-status">Quest abgeschlossen ✓</p><div class="success-body"></div>',foot:primary('Zur Welt','backWorld')});
 $('backWorld').onclick=closeToWorld;
 srlUI.afterQuest(s.q,s.replay);enrichment.mountQuest(s.q,{after:true});difficulty.reflect(s.q);
}
function showKnowledge(id,automatic=false,contextQuest=session?.q){
 const l=lessonById(id);if(!l){showTask();return;}
 rememberKnowledge(id,contextQuest);
 const back=returnFromInfo;
 openPanel('lesson',{title:knowledgeTitle(l),className:'lesson-panel',body:knowledgeContent(l,labHTML(l.id),writtenHTML(l.id,{linked:true}))+`${l.support?.length?`<details class="srl-optional"><summary>Grundlagen auffrischen</summary><div class="learning-actions">${l.support.filter(k=>LESSONS[k]).map(k=>`<button class="secondary-button" data-recall="${k}">${esc(LESSONS[k].title)}</button>`).join('')}</div></details>`:''}`,foot:secondary('Beispiel ansehen','knowledgeExample','eye')+primary(automatic||session?'Zur Aufgabe':'Zurück','knowledgeDone')});
 learning.help(automatic?'knowledge':'otherHelp','lesson',automatic);
 panel.querySelectorAll('[data-recall]').forEach(b=>b.onclick=()=>{returnFromInfo=()=>{returnFromInfo=back;showKnowledge(id,automatic,contextQuest);};showKnowledge(b.dataset.recall,false,contextQuest);});
 difficulty?.mount(contextQuest,()=>{returnFromInfo=back;showKnowledge(id,automatic,contextQuest);},{offer:false});
 $('knowledgeDone').onclick=closePanel;
 $('knowledgeExample').onclick=()=>{returnFromInfo=()=>{returnFromInfo=back;showKnowledge(id,automatic,contextQuest);};showExample(id);};
}
function showExample(id,revealed=1){
 const l=lessonById(id),e=l.example;const back=returnFromInfo;
 openPanel('example',{title:knowledgeTitle(l),subtitle:'Beispiel',symbol:'eye',className:'example-panel',body:`<p class="example-prompt">${esc(e.prompt)}</p><div class="worked-steps">${e.steps.map((step,i)=>i<revealed?`<div class="worked-step"><span>${i+1}</span><p>${esc(step)}</p></div>`:`<div class="worked-step not-yet" aria-hidden="true"><span>${i+1}</span><p>…</p></div>`).join('')}</div>${writtenHTML(l.id)}`,foot:secondary('Zurück','exampleBack')+primary(revealed<e.steps.length?'Nächster Schritt':'Beispiel schließen','exampleNext')});
 learning.help('example','example');
 difficulty?.mount(session?.q,()=>{returnFromInfo=back;showExample(id,revealed);},{offer:false});
 $('exampleBack').onclick=closePanel;
 $('exampleNext').onclick=()=>{if(revealed<e.steps.length){returnFromInfo=back;showExample(id,revealed+1);}else closePanel();};
}
function showInfo(id,page=0) {
 learning.ctx={topicId:id};
 if(!state.read.includes(id)){state.read.push(id);persist();}
 const r=regionById(id),pages=INFO[id],index=Math.max(0,Math.min(pages.length-1,page)),l=lessonById(pages[index].id),back=returnFromInfo;
 openPanel('info',{title:knowledgeTitle(l),className:'lesson-panel',body:knowledgeContent(l,labHTML(l.id),writtenHTML(l.id,{linked:true}))+`<details class="knowledge-topics"><summary>Anderes Thema nachlesen</summary><label class="knowledge-index" for="infoTopic">Thema<select id="infoTopic">${pages.map((p,i)=>`<option value="${i}" ${i===index?'selected':''}>${esc(lessonById(p.id).title)}</option>`).join('')}</select></label></details>`,foot:`<div class="info-controls">${index>0?secondary('Zurück','infoPrev'):''}${secondary('Beispiel','infoExample','eye')}</div>`+primary(index<pages.length-1?'Weiter':'Zur Welt','infoNext',index<pages.length-1?'arrow':'check')});
 if($('infoPrev'))$('infoPrev').onclick=()=>showInfo(id,index-1);
 $('infoNext').onclick=()=>index<pages.length-1?showInfo(id,index+1):closePanel();
 learning.help('otherHelp','info');
 $('infoTopic').onchange=e=>showInfo(id,Number(e.target.value));
 $('infoExample').onclick=()=>{returnFromInfo=()=>{returnFromInfo=back;showInfo(id,index);};showExample(l.id);};
 const tools=document.createElement('button');tools.type='button';tools.className='secondary-button';tools.id='v7InfoWorkshop';tools.textContent='Lernwerkstatt · üben und erklären';tools.onclick=()=>enrichment.hub(id,()=>showInfo(id,index));panel.querySelector('.panel-body').append(tools);
}


function bindSpecialWidgets(t){
 disposeWidgets=attachTaskWidgets(panel,t,()=>session.answer,a=>{session.answer=a;clearWrong();showTask();},session.solved);
}
function showResident(o){
 const qs=basicQuests(o.region),next=qs.find(q=>!state.completed[q.id]&&questUnlocked(q,state.completed))||qs.find(q=>!state.completed[q.id])||questById('c6-master-'+o.region);
 openPanel('resident',{title:o.name+' hat einen Wunsch',tag:regionById(o.region).name,symbol:'leaf',body:`<div class="story-text"><p>${esc(next.story)}</p><p>${allBasicDone(o.region,state.completed)?'Du hast allen regulären Projekten geholfen. Beim Meisterkristall wartet etwas Besonderes.':'Die hellen Zeichen zeigen dir empfohlene nächste Projekte. Blasse Zeichen darfst du ebenfalls versuchen.'}</p></div>`,foot:secondary('Zurück','residentBack')+primary('Zum Projekt gehen','residentWish')});
 $('residentBack').onclick=closeToWorld;$('residentWish').onclick=()=>walkToQuest(next.id);
}
function showGateIntro(o){
 const status=gateStatus(state,o.from,o.to);if(status.open){announce('Dieser Weg ist bereits frei.');return;}
 session=null;returnFromInfo=null;
 const pending=state.exams[routeKey(o.from,o.to)],keys=pending?examQueue(pending):requiredForRoute(state,o.from,o.to),sourceCount=keys.filter(k=>sourceLessons(o.from).includes(k)).length;
 openPanel('gate-intro',{title:'Kurze Lernstandsprobe',subtitle:regionById(o.from).topic,progress:progressDots(keys.length,pending?.index||0),className:'exam-panel',body:`<p class="calm-note">Ohne Hilfen. Papier und Stift sind erlaubt. Rückmeldung am Ende der Runde.</p><div class="exam-topics">${keys.map(k=>`<span>${esc(CHECKS[k]?.title||lessonById(k)?.title||k)}</span>`).join('')}</div>${status.unfinished?`<p class="exam-warning">Noch ${status.unfinished} Quests offen. Du darfst die Lernstandsprobe trotzdem versuchen.</p>`:''}<details><summary>Was prüft diese Runde?</summary><p>Eine Momentaufnahme, keine vollständige Kompetenzdiagnose. Alle Aufgaben müssen richtig gelöst sein; bei Fehlern folgen nur die offenen Gedanken mit anderen Aufgaben.</p><p>Der Weg nach ${esc(regionById(o.to).name)} bleibt nach bestandener Probe in beide Richtungen offen.</p></details>`,foot:secondary('Zurück','gateBack')+primary(pending?'Fortsetzen':'Beginnen','beginGate','shield')});
 $('gateBack').onclick=()=>{regulation.areaDecision(o.from,o.to,'stay');closeToWorld();};$('beginGate').onclick=()=>{regulation.areaDecision(o.from,o.to,'continue');startGateTest(o.from,o.to);};
}
function startGateTest(from,to){
 // Do not create an empty reverse exam: navigation access is not a knowledge test.
 if(gateStatus(state,from,to).open){closeToWorld();announce('Dieser Weg bleibt in beide Richtungen frei.');return;}
 const e=ensureExam(state,from,to),q=examQuest(state,from,to);
 session={q,index:e.index,answer:null,solved:false,wrong:false,stepAttempts:0,mistakes:0,hints:0,replay:false,encounter:false,exam:true};session.logRunId=learning.quest(q,{exam:true});returnFromInfo=null;persist();
 if(session.index>=q.tasks.length){completeGateRound();return;}
 resetAnswer();showTask();
}
function showExamTask(){
 const s=session,t=s.q.tasks[s.index];returnFromInfo=null;
 openPanel('task',{title:CHECKS[t.lesson]?.title||lessonById(t.lesson)?.title||'Dezimalzahlen',subtitle:'Lernstandsprobe',progress:progressDots(s.q.tasks.length,s.index),className:'task-panel exam-panel',body:taskControl(t),foot:secondary('Unterbrechen','pauseExam')+primary(s.index===s.q.tasks.length-1?'Auswerten':'Antwort abgeben','checkTask','check',!answerReady())});
 bindSpecialWidgets(t);bindWorkFields(t);$('pauseExam').onclick=closeToWorld;
 $('checkTask').onclick=submitExamAnswer;
 bindCommonAnswerControls(t);
}
function bindCommonAnswerControls(t){
 const s=session;
 panel.querySelectorAll('[data-key]').forEach(b=>b.onclick=()=>enterDigit(b.dataset.key));
 panel.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{const i=+b.dataset.choice;s.answer=t.type==='multi'?(s.answer.includes(i)?s.answer.filter(v=>v!==i):[...s.answer,i]):i;showTask();});
 panel.querySelectorAll('[data-order]').forEach(b=>b.onclick=()=>{s.answer.push(+b.dataset.order);showTask();});
 panel.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{s.answer.splice(+b.dataset.remove,1);showTask();});
 if(t.type==='line'){
  const set=value=>{const pos=Math.max(0,Math.min(Math.round((t.end-t.start)/t.step),value));s.answer=String(Number((t.start+pos*t.step).toFixed(6)));$('lineRange').value=pos;$('lineDrawing').innerHTML=numberLine(t.start,t.end,t.step,s.answer,true);$('lineOutput').textContent='Markierung gesetzt';$('checkTask').disabled=false;};
  $('lineRange').oninput=e=>set(+e.target.value);$('lineRange').onchange=e=>set(+e.target.value);$('lineMinus').onclick=()=>set(+$('lineRange').value-1);$('linePlus').onclick=()=>set(+$('lineRange').value+1);
 }
}
function submitExamAnswer(){
 if(!session?.exam||!answerReady())return;
 const s=session,e=ensureExam(state,s.q.from,s.q.to),t=s.q.tasks[s.index],correct=checkAnswer(t,s.answer);
 learning.task(s.q,s.index,s);learning.attempt(correct,{exam:true});
 e.results.push(correct);e.index++;state.stats.attempts++;if(correct)state.stats.correct++;persist();
 if(e.index===s.q.tasks.length){completeGateRound();return;}
 s.index=e.index;resetAnswer();showTask();
}
function completeGateRound(){
 const s=session,result=finishExamRound(state,s.q.from,s.q.to);persist();
 learning.emit('exam_round_finished',{correct:result.correct,total:result.total,complete:result.complete,failedSkills:result.failed,passedSkills:result.passed||s.q.tasks.map(t=>t.lesson)});if(result.complete)learning.complete(s.q,s);
 if(result.complete){
  world.sync(state);updateHUD();returnFromInfo=null;mode='gatebuild';overlay.hidden=true;shell.inert=true;disposeWidgets();disposeWidgets=()=>{};world.stop();releaseStick();
  $('buildNotice').hidden=true;learning.setScreen('world');
  world.beginGateOpening(s.q.from,s.q.to,result.newlyMastered,()=>{$('buildNotice').hidden=true;showGateSuccess(result);});chime(true);return;
 }
 showGateReport(result,s);
 srlUI.examReview(result,(action,key)=>examStudy(action,key,result,s),()=>{srlUI.release();showGateReport(result,s);},{questId:s.q.id,topicId:s.q.region,kind:'exam'});
}
function showGateReport(result,s){
 const passed=result.passed||[],keys=[...new Set([...passed,...result.failed])];
 openPanel('gate-result',{title:'Gezielt weiterüben',subtitle:'Lernstandsprobe',symbol:'shield',className:'exam-panel',body:`<div class="test-result-score"><strong>${result.correct} / ${result.total}</strong><span>in dieser Runde richtig</span></div><p>Die richtigen Nachweise bleiben gespeichert. In der nächsten Runde ${result.failed.length===1?'kommt nur die noch offene Kernaufgabe':'kommen nur die '+result.failed.length+' noch offenen Kernaufgaben'} mit anderen Zahlen vor.</p><div class="diagnostic-list">${keys.map(id=>`<div class="diagnostic-item">${icon(result.failed.includes(id)?'help':'check')}<strong>${esc(CHECKS[id].title)}</strong><small>${result.failed.includes(id)?'Hier noch gezielt üben':'In dieser Stichprobe richtig'}</small></div>`).join('')}</div><label class="srl-field">Welchen offenen Gedanken möchtest du nacharbeiten?<select id="studySkill">${result.failed.map(id=>`<option value="${id}">${esc(CHECKS[id].title)}</option>`).join('')}</select></label><div class="learning-actions">${secondary('Passende Quest','studyQuest','flag')}${secondary('Wissen nachlesen','studyKnowledge','book')}${secondary('Beispiel ansehen','studyExample','eye')}${secondary('Kurze Zusatzrunde','studyPractice','route')}</div><details><summary>Zur Einordnung</summary><p>Eine Stichprobe ist keine vollständige Kompetenzdiagnose. Hilfen öffnen außerhalb der Prüfrunde; Testlösungen werden nicht angezeigt.</p></details>`,foot:secondary('Im Gebiet weiterlernen','leaveExam')+primary('Offene Aufgaben prüfen','retryExam','shield')});
 $('leaveExam').onclick=closeToWorld;$('retryExam').onclick=()=>startGateTest(s.q.from,s.q.to);
 for(const [button,action]of [['studyQuest','quest'],['studyKnowledge','knowledge'],['studyExample','example']])$(button).onclick=()=>examStudy(action,$('studySkill').value,result,s);
 $('studyPractice').onclick=()=>{const key=$('studySkill').value,check=CHECKS[key];const skill=skillsForEvent({skillId:check.lesson||key})[0]||Object.keys(PRACTICE_SKILLS).find(k=>PRACTICE_SKILLS[k].questId===check.quest)||'place';enrichment.offer(skill,'exam',()=>showGateReport(result,s));};
}
function examStudy(action,key,result,examSession){
 const q=questById(CHECKS[key].quest);learning.pauseQuest(examSession);session=null;returnFromInfo=null;
 if(action==='quest'){showQuestIntro(q);return;}
 if(action==='person'||action==='later'){closeToWorld();if(action==='person')toast('Zeige einer Lehrkraft den offenen Gedanken: '+CHECKS[key].title);return;}
 learning.ctx={topicId:q.region,questId:q.id,kind:'regular'};
 returnFromInfo=()=>{session=examSession;showGateReport(result,examSession);};
 if(action==='example')showExample(key);else showKnowledge(key,false,q);
}
function showGateSuccess(result){
 // Commit occurred in finishExamRound. No second confirmation or invented learning event.
 const destination=session.q.to;
 mode='gate-open';closeToWorld();announce('Alle Aufgaben dieser Lernstandsprobe richtig. Der Weg ist in beide Richtungen frei.');
 world.goToObject(world.objects.find(o=>o.id==='info-'+destination));
}
function mapPoint(r){return {x:24+(r.x+69)*4.25,y:25+(r.z+89)*2.4};}
function mapPolygon(points){return points.map(([x,z])=>{const p=mapPoint({x,z});return `${p.x},${p.y}`;}).join(' ');}
function showMap(selected=world.region().id) {
 returnFromInfo=null;
 const r=regionById(selected),p=mapPoint(world.player),available=regionUnlocked(selected,state.completed);
 const lines=ROUTES.map(route=>`<polyline class="map-path" points="${mapPolygon(route.points)}"/>`).join('');
 const clearings=CLEARINGS.map(c=>`<polygon points="${mapPolygon(c.points)}" fill="${c.id==='harbor'?'#dfd9b0':c.id==='cave'?'#b5bcb4':'#c7d2a7'}" opacity=".95"/>`).join('');
 let scenery='';
 for(let z=-80;z<67;z+=7)for(let x=-64;x<84;x+=8){if(!onMainland(x,z)||walkableLand(x,z))continue;const p=mapPoint({x,z});scenery+=mountainZone(x,z)?`<path d="M${p.x-8} ${p.y+6}l8-14 8 14z" fill="#94a79b" opacity=".65"/>`:`<path d="M${p.x-4} ${p.y+3}l4-9 4 9z" fill="#72967c" opacity=".55"/>`;}
 const nodes=REGIONS.map(n=>{
  const xy=mapPoint(n),unlocked=regionUnlocked(n.id,state.completed),done=questsIn(n.id).filter(q=>state.completed[q.id]).length;
  return `<g class="map-node ${n.id===selected?'active':''} ${unlocked?'':'locked'}" transform="translate(${xy.x} ${xy.y})" data-region="${n.id}" tabindex="0" role="button" aria-label="${esc(n.name)}, ${esc(n.topic)}, ${done} Quests geschafft"><rect class="node-disc" x="-19" y="-23" width="38" height="38" rx="9" fill="${n.color}"/><path d="M-5 15 0 22 5 15" fill="${n.color}"/><svg x="-11" y="-16" width="22" height="22" viewBox="0 0 24 24" class="node-icon">${icon(n.icon)}</svg><text class="node-title" text-anchor="middle" y="35">${esc(n.name)}</text><text class="node-sub" text-anchor="middle" y="47">${done}/${questsIn(n.id).length} ${unlocked?'✦':'· später'}</text></g>`;
 }).join('');
 const body=`<div class="map-body"><svg class="map-art landscape-map" viewBox="0 0 705 430" role="group" aria-label="Zusammenhängende Landschaft mit Küste, Wäldern, Bergzügen und acht Lernorten"><rect width="705" height="430" fill="#b6d4d0" rx="14"/><polygon points="${mapPolygon(OUTLINE)}" fill="#a4bd97" stroke="#e3dcb5" stroke-width="8"/>${clearings}${scenery}${lines}${nodes}<circle class="player-dot" cx="${p.x}" cy="${p.y}" r="5"/><text x="20" y="28" fill="#5f827c" font-size="10" letter-spacing="2">N ↑</text><text x="38" y="419" fill="#5f827c" font-size="10" letter-spacing="2">DIE SÜDKÜSTE</text></svg><div class="map-selection"><div><span class="section-tag">${icon(r.icon)}${esc(r.tag)}</span><h3>${esc(r.name)}</h3><p>${esc(r.topic)}</p><small>${esc(available?r.hint:requirementText(selected,state.completed))}</small></div><div class="map-quests">${questsIn(selected).filter(q=>!q.challenge||allBasicDone(selected,state.completed)).map(q=>`<button data-map-quest="${q.id}" class="${state.completed[q.id]?'done':!questUnlocked(q,state.completed)?'recommended-later':''} ${q.challenge?'master-row':''}">${icon(state.completed[q.id]?'check':questUnlocked(q,state.completed)?questIcon(q):'lock')}<span><strong>${esc(questTopic(q))}</strong><small>${esc(q.title)}</small>${q.challenge?'<em>MEISTERHERAUSFORDERUNG</em>':q.extension?'<em>Zusatzweg</em>':''}</span><small>${state.completed[q.id]||state.progress[q.id]?.ready?q.tasks.length:(state.progress[q.id]?.step||0)}/${q.tasks.length}</small>${icon('chevron')}</button>`).join('')}</div></div></div>`;
 openPanel('map',{title:'Deine Lernlandkarte',tag:`${seals()} VON 8 GEBIETSSIEGELN`,symbol:'map',subtitle:'',className:'map-panel',body,foot:``+primary('Zum Infoschild','walkInfo','route')});
 panel.querySelectorAll('[data-region]').forEach(node=>{const select=()=>showMap(node.dataset.region);node.onclick=select;node.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}};});
 panel.querySelectorAll('[data-map-quest]').forEach(b=>b.onclick=()=>walkToQuest(b.dataset.mapQuest));
 $('walkInfo').onclick=()=>walkToObject(world.objects.find(o=>o.id==='info-'+selected));
}
function walkToObject(o) {
 if(!o)return;closeToWorld();
 if(Math.hypot(o.x-world.player.x,o.z-world.player.z)<5.2){interact(o);return;}
 const ok=world.goToObject(o);if(!ok)toast('Dieser Weg ist gerade nicht erreichbar. Gehe ein Stück weiter und versuche es erneut.');
}
function walkToQuest(id){const q=questById(id);state.activeQuest=id;persist();updateHUD();walkToObject(world.objects.find(o=>o.id===q.id));}
function showJournal(){
 openPanel('journal',{title:'Dein Reisebuch',tag:'DEIN LERNWEG',symbol:'book',body:`<div class="journal-grid">${REGIONS.map(r=>{const qs=questsIn(r.id),done=qs.filter(q=>state.completed[q.id]).length;return `<button class="journal-card" data-journal="${r.id}">${icon(r.icon)}<h3>${esc(r.name)}</h3><strong>${done} von ${qs.length} Quests</strong><small>${esc(r.topic)}</small><span>${state.completed['c6-master-'+r.id]?'Meisterherausforderung geschafft · der Ort blüht auf':state.mastery[r.id]?'Gebietstest bestanden · Siegel erhalten':'Gebietstest noch offen'}</span></button>`;}).join('')}</div><p class="small-note">Jeder gelöste Schritt zählt. Fehler gehören zum Lernen und nehmen dir nichts weg. Deine Infoschilder sind jederzeit offen.</p>`,foot:secondary('Zum Rucksack','journalBack','menu')+primary('Weiterreisen','journalDone')});
 panel.querySelectorAll('[data-journal]').forEach(b=>b.onclick=()=>showMap(b.dataset.journal));$('journalBack').onclick=showMenu;$('journalDone').onclick=closeToWorld;
}
function showMenu(){
 returnFromInfo=null;
 const s=state.settings;
 const menuItem=(id,symbol,title,sub)=>`<button id="${id}">${icon(symbol)}<span><strong>${esc(title)}</strong><small>${esc(sub)}</small></span></button>`;
 const toggle=(id,title,sub,on)=>`<div class="settings-row"><div><strong>${esc(title)}</strong><small>${esc(sub)}</small></div><button id="${id}" class="toggle ${on?'on':''}" role="switch" aria-checked="${on}" aria-label="${esc(title)}"><i></i></button></div>`;
 openPanel('menu',{title:'Dein Reiserucksack',tag:'KOMMALAND 7.2 · ALLES DABEI',symbol:'menu',body:`<div class="menu-summary"><strong>${countCompleted()} <span>von ${QUESTS.length} Quests geschafft</span></strong><span>${seals()} / 8 Gebietssiegel</span></div>${state.contentMigration?'<p class="callout">Kompakter Lernweg: vollständig erledigte Vorgängergruppen wurden angerechnet. Veränderte, noch offene Quests beginnen neu; frühere Ergebnisse bleiben im Export erhalten. Bereits erworbene Gebietssiegel gelten weiter.</p>':''}<div class="menu-grid">${menuItem('exportSave','download','Spielstand exportieren','Spielstand und vollständige Lernhistorie')}${menuItem('finishLearning','check','Lerneinheit abschließen','Sitzung beenden und Speicherstand exportieren')}${menuItem('v7Workshop','book','Lernwerkstatt','Gezielte Zusatzübung · offene Partneraufträge')}${menuItem('learningPlan','route','Mein Lernplan','Ziel ansehen oder für heute ändern')}${menuItem('learningSupport','help','Meine Unterstützung','Mehr oder weniger Orientierung wählen')}${menuItem('learnerProfile','book',state.learner?.studentName||'Name eingeben','Dein Name · dauerhaft mit deinem Lernstand verbunden')}${menuItem('importSave','upload','Spielstand importieren','Eine Sicherung laden')}${menuItem('openJournal','book','Reisebuch','Deine Lernorte im Überblick')}${menuItem('fullScreen','fullscreen','Vollbild','Ohne Browserleisten, soweit unterstützt')}${menuItem('goHome','home','Zurück nach Hause','Zu Fuß zum Infoschild · offene Wege bleiben frei')}${menuItem('previousSave','undo','Vorherigen Stand laden','Letzten Import oder Neustart rückgängig machen')}</div><details class="controls-help"><summary>Steuerung nachlesen</summary><p class="small-note">Steuerkreis ziehen oder auf den Boden tippen. Nahe Objekte leuchten: Tippe darauf oder auf „Entdecken“. Tastatur: Pfeile / WASD, E zum Öffnen, M für die Karte, Esc zum Schließen. Tab wählt sichtbare Weltobjekte und Schaltflächen; Enter oder Leertaste aktiviert das gewählte Objekt.</p></details><div class="settings-block">${toggle('toggleSound','Sanfte Klänge','Kurze Töne bei einer Antwort',s.sound)}${toggle('toggleText','Größere Schrift','Mehr Platz zum Lesen',s.largeText)}${toggle('toggleMotion','Weniger Bewegung','Ohne schwingende Figuren und Konfetti',s.reducedMotion)}${toggle('toggleEco','Sparmodus','Niedrigere Auflösung und 30 Bilder pro Sekunde',s.quality==='eco')}</div><p class="storage-note ${!store.available?'warning':''}">${store.available?'Dein Fortschritt wird automatisch nur in diesem Browser gespeichert.':'Der Browser kann momentan nicht speichern. Bitte exportiere deinen Stand.'} Exportiere regelmäßig: Gelöschte Websitedaten, privates Surfen oder eine andere Geräteadresse können deinen Stand verschwinden lassen.</p><p class="small-note">${offlineReady?'Offline-Dateien sind auf diesem Gerät bereit.':'Für Offline-Nutzung: über HTTPS öffnen und einmal vollständig laden.'} Auf dem iPad: Safari → Teilen → Zum Home-Bildschirm → als Web-App öffnen.</p><button id="newGame" class="danger-button">Neues Abenteuer beginnen</button>`,foot:`<span>Keine Anmeldung. Keine Werbung. Kein Spielstand-Upload.</span>`+primary('Weiterreisen','menuDone')});
 $('v7Workshop').onclick=()=>enrichment.hub(world.region().id,showMenu);
 $('learningPlan').onclick=()=>srlUI.planning({amend:true});$('learningSupport').onclick=()=>srlUI.settings();
 $('finishLearning').onclick=()=>exportSave(true);$('learnerProfile').onclick=()=>showProfile(showMenu);
 $('menuDone').onclick=closeToWorld;$('exportSave').onclick=()=>exportSave(false);$('importSave').onclick=()=>{$('importFile').value='';$('importFile').click();};
 $('openJournal').onclick=showJournal;$('fullScreen').onclick=toggleFullscreen;
 $('goHome').onclick=()=>walkToObject(world.objects.find(o=>o.id==='info-village'));
 $('previousSave').onclick=()=>confirmAction('Den vorherigen Stand laden?','Der aktuelle Stand wird als Rücksicherung behalten. Diese Funktion ist nach einem Import oder Neustart verfügbar.','Sicherung laden',()=>{try{setState(store.restorePrevious());closeToWorld();announce('Der vorherige Stand ist wieder da.');}catch(e){toast(e.message);showMenu();}});
 $('newGame').onclick=()=>confirmAction('Ein neues Abenteuer?','Der aktuelle Spielstand wird ersetzt. Exportiere ihn vorher, um ihn dauerhaft zu behalten. Eine Rücksicherung bleibt im Rucksack erhalten.','Neu beginnen',()=>{const fresh=defaultState();if(state.learner)fresh.learner={...state.learner};setState(store.replace(fresh));closeToWorld();showWelcome();});
 [['toggleSound','sound'],['toggleText','largeText'],['toggleMotion','reducedMotion']].forEach(([id,key])=>$(id).onclick=()=>{s[key]=!s[key];applySettings();persist();showMenu();if(key==='sound')chime();});
 $('toggleEco').onclick=()=>{s.quality=s.quality==='eco'?'normal':'eco';applySettings();persist();showMenu();};
}
function confirmAction(title,text,label,action){
 openPanel('confirm',{title,tag:'DEIN SPIELSTAND',symbol:'shield',body:`<p class="confirm-text">${esc(text)}</p>`,foot:secondary('Abbrechen','cancelConfirm')+primary(label,'confirmAction','check')});
 $('cancelConfirm').onclick=showMenu;$('confirmAction').onclick=action;
}
function setState(next){
 openPanel('learning-loading',{title:'Dein Lernstand wird geöffnet …',body:'<p>Spielstand und Lernhistorie werden zusammengeführt.</p>'});$('closePanel').hidden=true;
 learning.finish('state_replaced');if(!next.learner&&state.learner)next.learner={...state.learner};
 clearLabMemory();clearWrittenMemory();previewedLessons.clear();
 state=next;store.state=state;session=null;returnFromInfo=null;
 world.sync(state);world.teleport(state.player.x,state.player.z);lastRegion=world.region().id;
 applySettings();updateHUD();updatePlace(lastRegion,false);persist();
 learning.current=null;return learning.attach().then(()=>{learning.emit('state_restored',{completed:Object.keys(state.completed),started:Object.keys(state.progress)},{});learning.enterTopic(lastRegion);mode='ready';if(!state.learner?.studentName)showProfile(()=>state.tutorial?closeProfileToWorld():showWelcome());else if(!state.tutorial)showWelcome();else enterLearning();});
}
function closeProfileToWorld(){mode='profile-done';enterLearning();}
function showProfile(after=closeProfileToWorld){
 openPanel('profile',{title:'Wie heißt du?',tag:'DEIN PERSÖNLICHER LERNSTAND',symbol:'book',body:`<p>Dein Name verbindet deinen Lernstand mit deiner Speicherdatei. Verwende den Namen oder das Kürzel, das deine Lehrkraft vereinbart hat.</p><label class="profile-label" for="studentName">Name oder vereinbartes Kürzel<input id="studentName" type="text" maxlength="80" autocomplete="off" autocapitalize="words" value="${esc(state.learner?.studentName||'')}" placeholder="Zum Beispiel: Max M."></label><p class="small-note">Gespeichert werden Aufgabenereignisse, Versuche, Hilfen und aktive Bearbeitungszeiten. Nichts wird automatisch hochgeladen. Deine exportierte Datei enthält diese Daten für deine Lehrkraft.</p><p id="profileError" role="alert"></p>`,foot:primary('Name speichern','saveStudentName','check')});
 $('closePanel').hidden=true;
 $('saveStudentName').onclick=async()=>{const name=cleanName($('studentName').value);if(!name){$('profileError').textContent='Bitte gib einen Namen oder das vereinbarte Kürzel ein.';$('studentName').focus();return;}const b=$('saveStudentName');b.disabled=true;state.learner={studentId:state.learner?.studentId||uid(),studentName:name};persist();await learning.attach();learning.enterTopic(world.region().id);learning.emit('profile_updated',{},{});mode='profile-done';after();};
 $('studentName').onkeydown=e=>{if(e.key==='Enter'){$('saveStudentName').click();}};setTimeout(()=>$('studentName')?.focus(),40);
}
async function exportSave(finish=false,reflected=false){
 if(!cleanName(state.learner?.studentName)){showProfile(()=>exportSave(finish,reflected));return;}
 if(finish&&!reflected){srlUI.finish();return;}
 try{
  persist();const data=await learning.exportSave(finish);persist();data.currentState=structuredClone(state);
  const blob=new Blob([JSON.stringify(data)],{type:'application/json'});if(blob.size>LIMITS.jsonBytes)throw new Error('Die vollständige Historie überschreitet die dokumentierte Grenze von 64 MiB. Es wurden keine Daten gelöscht.');const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=filename(data.studentName);document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
  if(finish){openPanel('unit-finished',{className:'unit-panel',title:'Deine Lerneinheit ist abgeschlossen.',tag:'DEIN LERNSTAND ZUM MITNEHMEN',symbol:'check',body:`<p>Die Speicherdatei für <strong>${esc(data.studentName)}</strong> wurde zum Speichern bereitgestellt. Sie enthält dein Abenteuer und deine Lernhistorie.</p><p>Kontrolliere, dass die Datei in „Dateien“ gespeichert wurde. Übertrage sie anschließend auf dem vereinbarten Weg an deine Lehrkraft.</p><p class="small-note">${data.events.length} Ereignisse · ${data.sessions.length} Sitzungen. Die App kann nicht prüfen, ob du den Speicherdialog tatsächlich abgeschlossen hast.</p>`,foot:primary('Weiterlernen: neue Sitzung','resumeLearning')});$('resumeLearning').onclick=()=>{learning.startSession();enterLearning();};}
  else toast('Dein vollständiger Lernstand ist zum Speichern bereit. Bewahre die JSON-Datei in „Dateien“ auf.');
 }catch(error){toast('Export nicht abgeschlossen: '+error.message);}
}
$('importFile').addEventListener('change',async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{
  if(file.size>67108864)throw new Error('Die Datei ist zu groß (höchstens 64 MiB).');
  const text=await file.text(),raw=JSON.parse(text);pendingLearningImport=raw.format===FORMAT?validateSave(raw):null;pendingImport=parseSave(text);
  confirmAction('Diesen Spielstand laden?',`${pendingLearningImport?'Lernstand von '+pendingLearningImport.studentName+'. ':''}${Object.keys(pendingImport.completed).length} Quests geschafft. Gespeichert am ${new Date(pendingImport.updatedAt).toLocaleString('de-DE')}. ${pendingImport.migration?'Fertige Projekte bleiben erhalten. Frühere Teilschritte wurden auf die erweiterte Übungsfolge übertragen; neue Wegprüfungen und Herausforderungen bleiben offen. ':''}Dein jetziger Stand wird ersetzt und als Rücksicherung behalten.`,'Spielstand laden',async()=>{try{if(pendingLearningImport)await learning.importHistory(pendingLearningImport);await setState(store.replace(pendingImport));pendingImport=null;pendingLearningImport=null;announce('Spielstand importiert.');}catch(error){toast('Import nicht abgeschlossen: '+error.message);}});
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
 openPanel('welcome',{title:'Willkommen in Kommaland.',tag:'DEIN DEZIMALZAHLEN-ABENTEUER',symbol:'spark',className:'welcome-panel',body:`<p class="welcome-intro">Im Funkeldorf ist das Sternenlicht erloschen. Mit kleinen Zahlen und klugen Ideen bringst du die Welt wieder zum Leuchten.</p><div class="welcome-features"><div class="welcome-feature">${icon('route')}<strong>Entdecken</strong><span>Ziehe den Steuerkreis oder tippe auf den Boden.</span></div><div class="welcome-feature">${icon('book')}<strong>Verstehen</strong><span>Jeder neue Gedanke beginnt mit einem Bild. In Quests sind Beispiele jederzeit da.</span></div><div class="welcome-feature">${icon('spark')}<strong>Verändern</strong><span>Löse kleine Quests. Die Welt wächst mit dir.</span></div></div><p class="small-note">Kein Zeitdruck. Keine verlorenen Leben. Du kannst alles noch einmal versuchen. Papier und Stift dürfen mitreisen.</p>`,foot:`<span>Dein Fortschritt wird automatisch lokal gespeichert.</span>`+primary('Abenteuer beginnen','welcomeStart')});
 $('welcomeStart').onclick=()=>{state.tutorial=true;persist();enterLearning();};
}

// Labels keep future quests discreet; only the closest label expands to text.
const labels=new Map();
for(const o of world.objects){
 const b=document.createElement('button');b.className='world-label';b.dataset.object=o.id;
 b.setAttribute('aria-label',o.type==='info'?'Infoschild: '+regionById(o.region).name:o.type==='resident'?o.name:o.type==='gate'?'Wegprüfung: '+regionById(o.from).name+' nach '+regionById(o.to).name:o.q.title);
 b.innerHTML=`<span class="pin"><span></span></span><span class="label-text"></span>`;
 b.onclick=e=>{e.stopPropagation();if(mode)return;if(Math.hypot(o.x-world.player.x,o.z-world.player.z)<5.2)interact(o);else walkToObject(o);};
 $('worldLabels').appendChild(b);labels.set(o.id,b);
}
function syncLabels(){
 for(const o of world.objects){const b=labels.get(o.id);if(!b)continue;
  b.classList.toggle('info',o.type==='info');b.classList.toggle('resident',o.type==='resident');b.classList.toggle('gate-label',o.type==='gate');b.classList.toggle('master-label',!!o.q?.challenge);
  b.classList.toggle('prerequisite',o.type==='gate'&&o.status?.sourcePassed);b.classList.toggle('done',!!o.done);b.classList.toggle('in-progress',o.questStatus==='IN_PROGRESS');b.classList.toggle('locked',o.type==='quest'&&!o.unlocked&&!o.done);
  b.querySelector('.pin>span').innerHTML=icon(o.type==='info'?'book':o.type==='resident'?'help':o.type==='gate'?'shield':o.done?'check':!o.unlocked?'lock':questIcon(o.q));
  b.querySelector('.label-text').textContent=o.type==='info'?'Wissen · '+regionById(o.region).name:o.type==='resident'?o.name+' · sprich mich an':o.type==='gate'?'Bereit für '+regionById(o.to).name+'?':questTopic(o.q);
  if(o.type==='quest')b.setAttribute('aria-label',o.q.title+'. '+o.statusText);
 }
}
function updateLabels(){
 const nearest=mode?null:world.nearest();const occupied=[];
 // Reserve space for usable quests first, then place faint future pins only if they do not overlap.
 const ordered=[...world.objects].sort((a,b)=>(a===nearest?-100:a.type==='quest'&&!a.unlocked?10:0)-(b===nearest?-100:b.type==='quest'&&!b.unlocked?10:0));
 for(const o of ordered){
  const b=labels.get(o.id),p=renderer.project(o.x,o.y+o.height+.4,o.z),dist=Math.hypot(o.x-world.player.x,o.z-world.player.z);
  let visible=!mode&&!o.hidden&&dist<(o.type==='gate'?18:o.type==='resident'?6.5:26)&&p.visible&&p.x>20&&p.x<renderer.width-20&&p.y>105&&p.y<renderer.h-55;
  const later=o.type==='quest'&&!o.unlocked&&!o.done;
  if(visible&&later&&o!==nearest&&occupied.some(a=>Math.hypot(a.x-p.x,a.y-p.y)<42))visible=false;
  b.hidden=!visible;if(visible){b.style.left=p.x+'px';b.style.top=p.y+'px';b.classList.toggle('near',o===nearest);if(!later)occupied.push(p);}
 }
 $('interactButton').disabled=!nearest;
 $('interactText').textContent=nearest?(nearest.type==='info'?'Wissen lesen':nearest.type==='gate'?'Bereitschaft prüfen':nearest.type==='resident'?'Ansprechen':nearest.done?'Noch mal üben':!nearest.unlocked?'Trotzdem entdecken':nearest.q?.challenge?'Herausforderung':'Quest öffnen'):'Entdecken';
 $('interactHint').textContent=nearest?(nearest.type==='info'?regionById(nearest.region).topic:nearest.type==='gate'?regionById(nearest.from).name+' → '+regionById(nearest.to).name:nearest.type==='resident'?nearest.name:questTopic(nearest.q)):'';
 $('interactIcon').innerHTML=icon(nearest?.type==='info'?'book':nearest?.type==='gate'?'shield':'hand');
}
function updatePlace(id,announce=true){
 learning.enterTopic(id);
 const r=regionById(id);$('placeName').textContent=r.name;$('placeTopic').textContent=r.topic;$('placeIcon').innerHTML=icon(r.icon);
 if(!state.visited.includes(id)){state.visited.push(id);persist();}
 if(announce&&!state.tutorial){$('arrivalTag').textContent=r.tag;$('arrivalName').textContent=r.name;$('arrival').classList.add('show-arrival');clearTimeout(arrivalTimer);arrivalTimer=setTimeout(()=>$('arrival').classList.remove('show-arrival'),3200);}
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
 if(!world.goTo(p.x,p.z))toast('Dichter Wald, Felsen und Meer begrenzen den Weg. Suche einen offenen Pfad.');
});
$('world').addEventListener('pointercancel',()=>canvasDown=null);
$('interactButton').onclick=()=>interact(world.nearest());
$('mapButton').onclick=()=>showMap();$('menuButton').onclick=showMenu;
$('tracker').onclick=()=>{if(regulation.levels.navigation<=2)srlUI.navigation();else{const q=questById(state.activeQuest)||QUESTS[0];regulation.choose(q,'recommended');walkToObject(world.objects.find(o=>o.id==='info-'+q.region));}};
$('brandIcon').innerHTML=icon('gem');$('mapButton').innerHTML=icon('map');$('menuButton').innerHTML=icon('menu');
for(const event of ['gesturestart','gesturechange','gestureend'])document.addEventListener(event,e=>e.preventDefault(),{passive:false});
document.addEventListener('keydown',e=>{
 if(e.key==='Tab'&&mode){
  const buttons=[...panel.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, [tabindex="0"]')].filter(x=>x.getClientRects().length>0&&!x.closest('[hidden]'));
  const first=buttons[0],last=buttons.at(-1);
  if(!first){e.preventDefault();return;}
  if(e.shiftKey&&(document.activeElement===first||document.activeElement===panel)){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===panel)){e.preventDefault();first.focus();}
  return;
 }
 if(e.key==='Escape'&&mode&&!overlay.hidden&&$('taskHelpMenu')&&!$('taskHelpMenu').hidden){e.preventDefault();$('taskHelpMenu').hidden=true;$('taskHelpToggle').setAttribute('aria-expanded','false');$('taskHelpToggle').focus();return;}
 if(e.key==='Escape'){e.preventDefault();if(mode==='build'||mode==='gatebuild')return;if(mode)closePanel();else showMenu();return;}
 if(mode){
  if(mode==='task'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
   if(e.key==='Enter'&&!document.activeElement?.closest('button,summary,select,textarea')){e.preventDefault();if(session.solved)advanceTask();else submitAnswer();}
   else if(/^[0-9.,]$/.test(e.key)||['Backspace','Delete'].includes(e.key)){e.preventDefault();enterDigit(e.key);}
  }
  return;
 }
 const k=e.key.toLowerCase();
 // Native button activation must win over the world-space shortcut (especially focused quest pins).
 if((e.key===' '||e.key==='Enter')&&document.activeElement?.closest('button,[role=button]'))return;
 if(e.key==='Tab'){world.stop();releaseStick();}
 if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(k)){e.preventDefault();world.keys.add(k);}
 if(!e.repeat&&(k==='e'||k===' ')){e.preventDefault();interact(world.nearest());}
 if(!e.repeat&&k==='m'){e.preventDefault();showMap();}
});
document.addEventListener('keyup',e=>world.keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>{world.stop();releaseStick();persist();});
window.addEventListener('pagehide',()=>{enrichment.saveWorkDraft();learning.finish('page_hidden_or_closed');persist();});
window.addEventListener('pageshow',e=>{if(e.persisted){learning.startSession();learning.resumeVisibility();if(!mode)enterLearning();}});
$('world').addEventListener('webglcontextlost',e=>{e.preventDefault();graphicsLost=true;world.stop();persist();toast('Die Grafik pausiert kurz. Dein Fortschritt bleibt gespeichert.');});
$('world').addEventListener('webglcontextrestored',()=>location.reload());
document.addEventListener('visibilitychange',()=>{if(document.hidden)learning.pauseVisibility();else learning.resumeVisibility();world.stop();releaseStick();persist();lastFrame=0;});
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
 const elapsed=lastFrame?(timestamp-lastFrame)/1000:1/60,dt=Math.min(.045,elapsed);lastFrame=timestamp;clock+=elapsed;
 const beforeMove={x:world.player.x,z:world.player.z};const pathEnd=world.path?.at(-1),pathObject=world.targetObject;
 const moved=world.update(dt,clock,!!mode);state.encounters.distance+=moved;
 if(mode==='gatebuild')$('buildStage').textContent='Der Weg öffnet sich …';
 if(mode==='build'&&world.building)$('buildStage').textContent=['Der Sockel entsteht …','Die Teile fügen sich zusammen …','Der letzte Funke …'][world.building.stage];
 if(!mode){
  const r=world.region();if(r.id!==lastRegion){
   const dest={x:world.player.x,z:world.player.z},dx=dest.x-beforeMove.x,dz=dest.z-beforeMove.z,len=Math.hypot(dx,dz)||1,target=pathEnd||{x:dest.x+dx/len*4,z:dest.z+dz/len*4};
   if(srlUI.exit(lastRegion,r.id,()=>world.goTo(target.x,target.z,pathObject))){world.player.x=beforeMove.x;world.player.z=beforeMove.z;world.stop();}
   else{lastRegion=r.id;updatePlace(r.id);if(!mode)srlUI.maybe('new_topic');}
  }
  if(countCompleted()>0&&state.encounters.distance>220+state.encounters.count%3*30&&clock-lastEncounter>180&&world.onPath())encounter();
 }
 // Keep written inputs responsive; the paused, blurred world needs no 24-fps redraw.
 const interval=mode?(['build','gatebuild'].includes(mode)?1000/24:1000):state.settings.quality==='eco'?1000/30:0;
 if(timestamp-lastDraw>=interval){renderer.render(clock);updateLabels();lastDraw=timestamp;}
}
applySettings();resize();updateHUD();updatePlace(world.region().id,false);persist();
requestAnimationFrame(frame);
requestAnimationFrame(()=>{
 $('loading').classList.add('loaded');setTimeout(()=>$('loading').hidden=true,650);
 if(!state.learner?.studentName)showProfile(()=>state.tutorial?closeProfileToWorld():showWelcome());
 else {openPanel('learning-loading',{title:'Dein Lernstand wird geöffnet …',body:'<p>Deine lokale Lernhistorie wird geladen.</p>'});$('closePanel').hidden=true;learning.attach().then(()=>{learning.enterTopic(world.region().id);mode='ready';if(!state.tutorial)showWelcome();else enterLearning();}).catch(e=>{toast(e.message);mode='ready';closeToWorld();});}
 if(store.migrated)toast('Deine fertigen Projekte wurden übernommen. Neue Übungsvarianten, Gebietstests und Meisterherausforderungen bleiben offen.');
 if(store.recovered)toast('Der letzte Spielstand war beschädigt. Eine gültige Sicherung wurde geladen, soweit vorhanden; sonst beginnt ein neuer Stand. Prüfe dein Reisebuch.');
});
setInterval(persist,10000);

// No CDN calls. Every required file is installed inside this site's own subdirectory.
if('serviceWorker' in navigator && (location.protocol==='https:'||['localhost','127.0.0.1'].includes(location.hostname))){
 navigator.serviceWorker.register(new URL('../sw.js',import.meta.url),{scope:new URL('../',import.meta.url).pathname})
 .then(()=>navigator.serviceWorker.ready).then(()=>{offlineReady=true;}).catch(error=>console.info('Offline-Modus nicht verfügbar:',error.message));
}

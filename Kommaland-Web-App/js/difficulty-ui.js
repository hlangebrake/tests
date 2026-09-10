import {chosenLevel,difficultyRecommendation,LEVEL_LABELS,FIT_LABELS} from '../teacher-dashboard/shared/difficulty.js';
import {taskVariant,runtimeQuest} from './difficulty-bank.js';
import {uid} from '../teacher-dashboard/shared/save-schema.js';
import {LEARNING_GOALS} from '../teacher-dashboard/shared/learning7-content.js';
import {esc} from './ui.js';
/** Small integration boundary; this controller never awards completion or changes
 * quest prerequisites. A level change only writes a preference for unshown slots.
 */
export class QuestDifficulty {
 constructor(log,actions){this.log=log;this.a=actions;this.back=null;this.openQuest=null;}
 eligible(q){return !!q&&!q.challenge&&!q.practice&&Object.hasOwn(LEARNING_GOALS,q.id);}
 level(q){return chosenLevel(this.a.state(),q.id);}
 emit(type,q,data){this.log.ensure();this.log.emit('v71_'+type,data,{questId:q.id,topicId:q.region,kind:'regular'});}
 prepare(q){return this.eligible(q)?runtimeQuest(q):q;}
 fixTask(s){
  if(!this.eligible(s?.q)||s.practice||s.exam||s.encounter)return;
  s.pinnedLevels??={};const key=s.q.tasks[s.index].key,state=this.a.state(),p=!s.replay?state.progress[s.q.id]:null;
  if(!Object.hasOwn(s.pinnedLevels,key)){
   const previous=[...this.log.events].reverse().find(e=>e.type==='task_started'&&e.runId===s.logRunId&&e.taskId===s.q.id+':'+key);
   // Resuming a pre-7.1 task freezes its unchanged original, without inventing a past
   // choice or modifying its task_started event. Pure game-save migration likewise
   // retains the already open task at N2, even if a new preference is selected.
   const n=p?.taskVariants?.[key]||previous?.data?.difficultyLevel||(previous||s.legacyOpenSlot===key?2:this.level(s.q));
   s.pinnedLevels[key]=n;
   if(p){p.taskVariants??={};p.taskVariants[key]=n;this.a.persist();}
  }
  s.q.tasks[s.index]=taskVariant(key,s.pinnedLevels[key]);
 }
 select(q,n,source='manual',offer=null){
  if(!this.eligible(q)||![1,2,3].includes(n))return;
  const state=this.a.state(),from=this.level(q);
  if(offer)this.emit('level_response',q,{recommendationId:offer.data.recommendationId,decision:'accepted',targetLevel:n});
  this.emit('level_selected',q,{fromLevel:from,level:n,source,recommendationId:offer?.data.recommendationId||null});
  state.questLevels??={};state.questLevels[q.id]=n;this.a.persist();
 }
 handleClose(){
  if(!this.back)return false;const back=this.back,saved=this.suspended;
  this.back=null;this.openQuest=null;this.suspended=null;
  // The selector is not mathematical help. Returning to a visible explanation
  // resumes its time tracking, without counting a second conscious help request.
  if(saved){this.log.ctx={...saved.context};for(const [key,h]of saved.helps){this.log.ctx={...h.context};this.log.help(h.type,h.screen,h.automatic,key,true);}this.log.ctx={...saved.context};}
  back();return true;
 }
 open(q,back,{taskContext=true}={}){
  if(!this.eligible(q))return;this.back=back;this.openQuest=q;this.suspended={context:{...this.log.ctx},helps:this.log.helps?[...this.log.helps].map(([key,h])=>[key,{...h,context:{...h.context}}]):[]};
  const n=this.level(q),s=this.a.session(),active=taskContext&&s?.q.id===q.id&&s.q.tasks[s.index]?.difficultyLevel;
  this.a.open('difficulty-select',{title:'Welches Niveau passt gerade zu dir?',tag:'DU ENTSCHEIDEST',symbol:'route',className:'difficulty-panel',body:`<div class="difficulty-options" role="group" aria-label="Niveau für diese Quest wählen">${[1,2,3].map(i=>`<button type="button" data-level="${i}" aria-pressed="${i===n}"><strong>Niveau ${i} – ${LEVEL_LABELS[i]}</strong><span>${{1:'Das gleiche Lernziel mit mehr Orientierung und übersichtlicheren Teilschritten.',2:'Die regulären Aufgaben dieser Quest.',3:'Das gleiche Lernziel mit weniger Vorgaben, zusätzlichen Bedingungen oder mehr Eigenständigkeit.'}[i]}</span></button>`).join('')}</div><p class="calm-note">Das Niveau ist keine Note. Du kannst es jederzeit ändern – auch nur für diese Quest. Niveau 3 ist keine zusätzliche Challenge.</p>${active?`<p class="small-note">Die bereits geöffnete Aufgabe bleibt auf <strong>Niveau ${active}</strong>; deine Eingabe bleibt erhalten. Die Wahl gilt ab der nächsten noch nicht gezeigten Aufgabe${s.index===s.q.tasks.length-1?' beziehungsweise beim nächsten Wiederholen':''}. Hilfen für die aktuelle Aufgabe bleiben verfügbar.</p>`:''}`,foot:'<button type="button" class="secondary-button" id="difficultyCancel">Zurück ohne Änderung</button>'});
  document.getElementById('difficultyCancel').onclick=()=>this.handleClose();
  document.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{this.select(q,+b.dataset.level);this.handleClose();});
 }
 mount(q,back,{offer=true,taskContext=true}={}){
  if(!this.eligible(q))return;
  const head=document.querySelector('.head-actions');if(!head)return;
  const old=document.getElementById('difficultyToggle');old?.remove();
  const s=this.a.session(),active=taskContext&&s?.q.id===q.id&&s.q.tasks[s.index]?.difficultyLevel,selected=this.level(q);
  const b=document.createElement('button');b.type='button';b.className='difficulty-toggle';b.id='difficultyToggle';b.textContent='N'+(active||selected)+' ▾';b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-label',`Niveau ${active||selected}. Niveauwahl öffnen${active&&active!==selected?`; nächste Aufgabe Niveau ${selected}`:''}`);
  if(active&&active!==selected){const next=document.createElement('small');next.textContent='→ '+selected;b.append(next);}
  b.onclick=()=>this.open(q,back,{taskContext});head.prepend(b);
  if(offer)this.mountOffer(q,back);
 }
 mountOffer(q,back){
  if(!this.log.current||this.log.current.finishedAt)return;
  const es=this.log.events,selected=this.level(q);
  let event=[...es].reverse().find(e=>e.type==='v71_level_offered'&&e.questId===q.id&&e.sessionId===this.log.current.sessionId&&e.data.fromLevel===selected&&!es.some(r=>r.type==='v71_level_response'&&r.data.recommendationId===e.data.recommendationId)&&!es.some(r=>r.type==='v71_level_selected'&&r.questId===q.id&&(r.timestamp>e.timestamp||r.timestamp===e.timestamp&&r.sequence>e.sequence)));
  if(!event){
   const r=difficultyRecommendation(es,{questId:q.id,level:selected,sessionId:this.log.current.sessionId,now:this.log.stamp()});
   if(!r)return;
   this.emit('level_offered',q,{recommendationId:uid(),fromLevel:selected,targetLevel:r.targetLevel,reason:r.reason,evidenceIds:r.evidenceIds,text:r.text});event=this.log.events.at(-1);
  }
  const d=event.data,body=document.querySelector('.panel-body');if(!body)return;
  body.insertAdjacentHTML('beforeend',`<aside class="difficulty-offer" aria-label="Freiwillige Niveauempfehlung"><strong>${d.targetLevel>selected?'Das läuft sicher.':'Mehr Struktur ausprobieren?'}</strong><details><summary>Warum diese Empfehlung?</summary><p>${esc(d.text)}</p></details><div><button type="button" class="secondary-button" id="difficultyAccept">N${d.targetLevel} ausprobieren</button><button type="button" class="text-button" id="difficultyDecline">Bei N${selected} bleiben</button></div></aside>`);
  document.getElementById('difficultyAccept').onclick=()=>{this.select(q,d.targetLevel,'recommendation',event);back();};
  document.getElementById('difficultyDecline').onclick=()=>{this.emit('level_response',q,{recommendationId:d.recommendationId,decision:'declined',targetLevel:d.targetLevel});back();};
 }
 reflect(q){
  if(!this.eligible(q))return;
  const change=[...this.log.events].reverse().find(e=>e.type==='v71_level_selected'&&e.questId===q.id&&e.data.fromLevel!==e.data.level);
  if(!change||this.log.events.some(e=>e.type==='v71_level_reflection'&&e.data.changeId===change.eventId))return;
  const seen=this.log.events.filter(e=>e.type==='task_started'&&e.questId===q.id&&e.data.difficultyLevel===change.data.level&&(e.timestamp>change.timestamp||e.timestamp===change.timestamp&&e.sequence>change.sequence));
  if(seen.length<2)return;
  const body=document.querySelector('.panel-body');body.insertAdjacentHTML('beforeend',`<details class="difficulty-reflection"><summary>Wie hat sich Niveau ${change.data.level} angefühlt? · freiwillig</summary><div>${Object.entries(FIT_LABELS).map(([key,label])=>`<button type="button" class="secondary-button" data-level-fit="${key}">${label}</button>`).join('')}</div></details>`);
  document.querySelectorAll('[data-level-fit]').forEach(b=>b.onclick=()=>{this.emit('level_reflection',q,{level:change.data.level,fit:b.dataset.levelFit,changeId:change.eventId});document.querySelector('.difficulty-reflection').innerHTML='<p>Danke für deine Einschätzung.</p>';});
 }
}

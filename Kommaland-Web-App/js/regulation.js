import {errorEvidence,helpEvidence,SRL_RULES,SUPPORT_DEFAULTS,supportLevels,latestPlan,promptBudget,repeatedErrors,multipleSkips,rapidExits,fadeDecision,sessionReview,previousIntention} from '../teacher-dashboard/shared/regulation.js';
import {uid} from '../teacher-dashboard/shared/save-schema.js';
import {CATALOG} from '../teacher-dashboard/shared/catalog.js';
/** Evidence lives in LearningLog. This controller stores only disposable UI state.
 * Subscribers never open a panel inside emit(): the caller chooses a safe boundary.
 */
export class Regulation {
 constructor(log,getState){this.log=log;this.getState=getState;this.levels={...SUPPORT_DEFAULTS};this.studentId=null;this.navigationSource=new Map();this.newTopic=null;this.unsubscribe=log.subscribe(e=>this.observe(e));}
 sync(){this.levels=supportLevels(this.log.events);this.studentId=this.log.studentId;return this.levels;}
 get sessionId(){return this.log.current?.sessionId;}
 emit(type,data={},context={}){return this.log.emit('srl_'+type,data,context);}
 context(){return this.log.contextOf(this.log.ctx);}
 observe(e){if(e.type==='session_started'){this.navigationSource.clear();this.sync();}if(e.type==='srl_support_changed')this.levels[e.data.dimension]=e.data.level;
  if(e.type==='task_completed')this.recordOutcome(e);
  if(e.type==='topic_entered'&&this.levels.navigation<2&&!this.log.events.some(x=>x!==e&&x.type==='topic_entered'&&x.topicId===e.topicId))this.newTopic=e.topicId;
 }
 needsPlan(){return !!this.sessionId&&!latestPlan(this.log.events,this.sessionId);}
 plan(){return latestPlan(this.log.events,this.sessionId)?.data||null;}
 intention(){return previousIntention(this.log.events,this.sessionId)?.data||null;}
 setPlan(data){const amended=!!this.plan();this.emit('plan_set',{...data,amended,support:this.levels.planning});}
 review(){this.log.tick();return sessionReview(this.log.events,this.sessionId,CATALOG);}
 budget(){return promptBudget(this.log.events,this.sessionId);}
 prompt(reason,context={},requested=false){if(!requested&&!this.budget().allowed)return null;const id=uid();this.emit('prompt_shown',{promptId:id,reason,unsolicited:!requested},context);return id;}
 answerPrompt(id,reason,choice,context={}){this.emit('prompt_answered',{promptId:id,reason,choice},context);}
 candidate(reason,context=null){if(!this.sessionId||this.log.current?.finishedAt||!this.budget().allowed)return null;const es=this.log.events,sid=this.sessionId,ctx=context||this.context();
  if(reason==='errors'&&this.levels.strategy>0&&errorEvidence(es,ctx)&&!es.some(e=>e.sessionId===sid&&e.type==='srl_prompt_shown'&&e.taskRunId===ctx.taskRunId&&e.data.reason==='errors'))return {reason,context:ctx};
  if(reason==='exam_errors'&&this.levels.strategy>0&&es.filter(e=>e.sessionId===sid&&e.type==='exam_round_finished'&&e.questId===ctx.questId&&!e.data.complete).length>=SRL_RULES.examFailedRounds&&!es.some(e=>e.sessionId===sid&&e.type==='srl_prompt_shown'&&e.questId===ctx.questId&&e.data.reason==='exam_errors'))return {reason,context:ctx};
  if(reason==='skips'&&multipleSkips(es,sid).length>=SRL_RULES.skipCount)return {reason,context:{}};
  if(reason==='orientation'&&this.levels.navigation<3&&rapidExits(es,sid).length>=SRL_RULES.rapidExits&&!es.some(e=>e.sessionId===sid&&e.type==='srl_prompt_shown'&&e.data.reason==='orientation'))return {reason,context:{}};
  if(reason==='new_topic'&&this.newTopic&&this.levels.navigation<2){const topicId=this.newTopic;this.newTopic=null;return {reason,context:{topicId}};}
  return null;
 }
 helpEvidence(context=this.context()){return helpEvidence(this.log.events,context);}
 reviewStrategy(promptId,actions,context=this.context()){this.emit('strategy_review',{promptId,actions,observedHelp:this.helpEvidence(context)},context);}
 selectStrategy(strategy,{source='manual',context=this.context()}={}){return this.emit('strategy_selected',{strategy,source},context);}
 recordOutcome(e){
  let selected=null;const now=Date.parse(e.timestamp);
  // Reverse scan bounds work to the recent window. Never attribute one success
  // to every earlier strategy or to a different task/session retrospectively.
  for(let i=this.log.events.length-1;i>=0;i--){const x=this.log.events[i];if(now-Date.parse(x.timestamp)>SRL_RULES.strategyOutcomeMs)break;if(x.type==='srl_strategy_selected'&&x.sessionId===e.sessionId&&x.taskRunId===e.taskRunId&&x.timestamp<e.timestamp){selected=x;break;}}
  if(!selected||this.log.events.some(y=>y.type==='srl_strategy_outcome'&&y.data.selectionEventId===selected.eventId))return;
  const assisted=this.log.events.some(x=>x.taskRunId===e.taskRunId&&x.type==='solutionStep_opened'&&x.timestamp>selected.timestamp&&x.timestamp<e.timestamp);
  this.emit('strategy_outcome',{strategy:selected.data.strategy,selectionEventId:selected.eventId,solved:true,assisted,relation:'later_success_not_causation'},this.log.contextOf(e));
 }
 changeSupport(dimension,level,reason='student_choice',evidence={}){if(!Object.hasOwn(this.levels,dimension)||!Number.isInteger(level)||level<0||level>3)return;if(this.levels[dimension]===level)return;this.emit('support_changed',{dimension,previous:this.levels[dimension],level,reason,evidence});}
 fade(){const decision=fadeDecision(this.log.events,this.levels);if(decision){this.changeSupport(decision.dimension,decision.level,decision.reason,decision.evidence);return decision;}return null;}
 choose(q,source='map'){this.navigationSource.set(q.id,source);}
 questStarted(q){const source=this.navigationSource.get(q.id)||'map';this.navigationSource.delete(q.id);this.emit('navigation_choice',{source,questId:q.id,support:this.levels.navigation},{questId:q.id,topicId:q.region,kind:q.challenge?'challenge':'regular'});if(q.challenge)this.challenge(q,'start',source);}
 challenge(q,choice,source='offer'){this.emit('challenge_decision',{choice,source},{questId:q.id,topicId:q.region,kind:'challenge'});}
 mayAskExit(from,to){return this.budget().allowed&&!this.log.events.some(e=>e.sessionId===this.sessionId&&e.type==='srl_area_decision'&&e.data.from===from&&e.data.to===to&&e.data.choice==='continue');}
 areaDecision(from,to,choice,reason='unspecified'){this.emit('area_decision',{from,to,choice,reason},{topicId:from});}
 reflect(data){if(this.log.events.some(e=>e.sessionId===this.sessionId&&e.type==='srl_reflection'))return;this.emit('reflection',{...data,support:{...this.levels}});}
}

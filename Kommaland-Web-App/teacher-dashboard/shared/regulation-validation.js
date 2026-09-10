import {REVIEW_ACTIONS,GOALS,NEXT_GOALS,STRATEGIES,SUPPORT_DEFAULTS,SRL_EVENTS,SKIP_REASONS} from './regulation.js';
/** Strict validation for the additional schema-2 events. No free-text reflection. */
export function validateRegulationEvent(e,assert){if(!Object.hasOwn(SRL_EVENTS,e.type))return;const d=e.data,one=(x,v)=>v.includes(x),confidence=x=>x===null||Number.isInteger(x)&&x>=1&&x<=5;
 if(e.type==='srl_plan_set'){assert(Object.hasOwn(GOALS,d.goal)&&confidence(d.confidence)&&(d.targetCount===null||one(d.targetCount,[2,3,4,5])),'Ungültiger Lernplan.');assert(d.topicId===null||typeof d.topicId==='string'&&d.topicId.length<100,'Ungültiges Planziel.');assert(one(d.source,['self','declined','previous_intention']),'Ungültige Planquelle.');}
 if(e.type==='srl_prompt_shown')assert(typeof d.promptId==='string'&&one(d.reason,['errors','exam_errors','skips','orientation','new_topic','area_exit','requested'])&&typeof d.unsolicited==='boolean','Ungültiger Regulationsimpuls.');
 if(e.type==='srl_prompt_answered')assert(typeof d.promptId==='string'&&typeof d.choice==='string'&&d.choice.length<=50,'Ungültige Impulsantwort.');
 if(e.type==='srl_strategy_review')assert(typeof d.promptId==='string'&&Array.isArray(d.actions)&&d.actions.length<=7&&new Set(d.actions).size===d.actions.length&&d.actions.every(k=>Object.hasOwn(REVIEW_ACTIONS,k)), 'Ungültige kurze Strategierückschau.');
 if(e.type==='srl_strategy_selected')assert(Object.hasOwn(STRATEGIES,d.strategy)&&typeof d.source==='string'&&d.source.length<=60&&!!e.taskRunId,'Ungültige Strategieauswahl.');
 if(e.type==='srl_strategy_outcome')assert(Object.hasOwn(STRATEGIES,d.strategy)&&typeof d.selectionEventId==='string'&&typeof d.solved==='boolean'&&!!e.taskRunId,'Ungültiger Strategieverlauf.');
 if(e.type==='srl_support_changed')assert(Object.hasOwn(SUPPORT_DEFAULTS,d.dimension)&&Number.isInteger(d.level)&&d.level>=0&&d.level<=3&&typeof d.reason==='string','Ungültiger Unterstützungsgrad.');
 if(e.type==='srl_navigation_choice')assert(typeof d.source==='string'&&typeof d.questId==='string'&&Number.isInteger(d.support)&&d.support>=0&&d.support<=3,'Ungültige Lernwegauswahl.');
 if(e.type==='srl_reflection'){assert(confidence(d.confidence)&&confidence(d.startConfidence)&&Object.hasOwn(NEXT_GOALS,d.nextGoal),'Ungültige Reflexion.');assert(d.support&&Object.entries(SUPPORT_DEFAULTS).every(([k])=>Number.isInteger(d.support[k])&&d.support[k]>=0&&d.support[k]<=3),'Ungültige Unterstützung in Reflexion.');}
 if(e.type==='srl_challenge_decision')assert(one(d.choice,['accept','later','explore','start'])&&e.kind==='challenge'&&e.questId,'Ungültige Vertiefungsentscheidung.');
 if(e.type==='srl_area_decision')assert(typeof d.from==='string'&&typeof d.to==='string'&&one(d.choice,['stay','continue'])&&Object.hasOwn(SKIP_REASONS,d.reason),'Ungültige Gebietsentscheidung.');
}

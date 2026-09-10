/** Presentation only: introducing a thought does not award a solved task or a test competency. */
import {LESSONS} from './lessons.js';

// A shared introductionKey may only be assigned after a subject-matter review.
// Do not merge by similar words, titles, numbers or visuals: new decimal places,
// different units and new mathematical operations must keep their introductions.
export function introductionKey(id) {
 const lesson=LESSONS[id];
 return lesson ? (lesson.introductionKey || lesson.id) : null;
}

// This later card only restates the combination of area = length × width (including m²)
// and multiplication of two decimal factors. It is redundant ONLY after BOTH cards.
// A direct entry without those introductions must still show it.
export const COVERED_INTRODUCTIONS = Object.freeze({
 'rectangle-decimal': Object.freeze(['rectangle','multiply-decimal'])
});

/** Read optional UI metadata conservatively; corrupt metadata never invalidates task progress. */
export function cleanShownLessons(q, value) {
 if(!q || !Array.isArray(value) || value.length>83)return [];
 const allowed=new Set(q.tasks.map(t=>t.lesson));
 return [...new Set(value.filter(id=>typeof id==='string'&&allowed.has(id)&&Object.hasOwn(LESSONS,id)))];
}

/** Older saves already prove that the thoughts preceding solved steps have been encountered. */
export function shownLessonsForQuest(q, progress, completed=false) {
 const solved=completed||progress?.ready ? q.tasks.length : Math.max(0,Math.min(q.tasks.length,progress?.step||0));
 return new Set([...q.tasks.slice(0,solved).map(t=>t.lesson),...cleanShownLessons(q,progress?.shownLessons)]);
}

export function shouldIntroduce(task, shownLessons, {encounter=false,exam=false,challenge=false}={}) {
 if(encounter||exam||challenge||task?.introduce===false)return false;
 const key=introductionKey(task?.lesson);
 if(!key)return false;
 const keys=new Set([...shownLessons].map(introductionKey));
 if(keys.has(key))return false;
 const coveredBy=COVERED_INTRODUCTIONS[task.lesson];
 return !(coveredBy&&coveredBy.every(id=>keys.has(introductionKey(id))));
}

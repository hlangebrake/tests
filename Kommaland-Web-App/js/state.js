import {migrateCurriculum,validateArchive} from './content-migration.js';
import {cleanName,validId,FORMAT,validateSave} from '../teacher-dashboard/shared/save-schema.js';
import {REGIONS, QUESTS, questById} from './content.js';
import {LESSONS} from './lessons.js';
import {cleanShownLessons} from './learning-flow.js';
import {validRoute, sourceLessons} from './adventure.js';
export const SCHEMA = 3;
export const APP_ID = 'kommaland';
export const defaultState = () => ({
 app:APP_ID, schemaVersion:SCHEMA, contentVersion:6, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(),
 player:{x:0,z:30}, completed:{}, progress:{}, visited:['village'], read:[],
 mastery:{}, competencies:{}, exams:{},
 activeQuest:'c6-v1', tutorial:false, encounters:{count:0,distance:0},
 settings:{sound:false,quality:'normal',largeText:false,reducedMotion:false},
 stats:{attempts:0,correct:0,hints:0}
});
const plain = x => x !== null && typeof x==='object' && !Array.isArray(x);
const integer = (x,min=0,max=1000000) => Number.isInteger(x) && x>=min && x<=max;
const validDate = x => typeof x==='string' && x.length<=40 && !Number.isNaN(Date.parse(x));
/** Only known fields are copied. No HTML, code, arbitrary object keys or names are imported. */
export function validateState(raw) {
 if(!plain(raw)||raw.app!==APP_ID||![1,2,SCHEMA].includes(raw.schemaVersion)) throw new Error('Das ist kein unterstützter Kommaland-Spielstand (Version 1, 2 oder 3).');
 raw=migrateCurriculum(raw);
 const legacy=raw.schemaVersion===1, expanded=raw.schemaVersion<3;
 if(!plain(raw.player)||!Number.isFinite(raw.player.x)||!Number.isFinite(raw.player.z)||Math.abs(raw.player.x)>100||Math.abs(raw.player.z)>100) throw new Error('Die gespeicherte Position ist ungültig.');
 if(!plain(raw.completed)||!plain(raw.progress)) throw new Error('Die Questdaten sind unvollständig.');
 const s=defaultState();
 if(raw.contentArchive)s.contentArchive=validateArchive(raw.contentArchive);
 if(raw.contentMigration&&s.contentArchive)s.contentMigration={from:'5.1',credited:Object.keys(raw.completed).filter(id=>raw.completed[id].credit==='legacy'),restarted:Object.keys(raw.progress),pausedTests:Object.keys(s.contentArchive.exams).length};
 if(plain(raw.learner)&&validId(raw.learner.studentId)){s.learner={studentId:raw.learner.studentId,studentName:cleanName(raw.learner.studentName)};}
 s.player={x:raw.player.x,z:raw.player.z};
 for(const [id,value] of Object.entries(raw.completed)) {
  if(!questById(id)||!plain(value)||!integer(value.mistakes)||!integer(value.hints)) throw new Error('Eine abgeschlossene Quest enthält ungültige Daten.');
  s.completed[id]={mistakes:value.mistakes,hints:value.hints,at:validDate(value.at)?value.at:new Date().toISOString(),...(value.credit==='legacy'?{credit:'legacy'}:{})};
 }
 for(const [id,value] of Object.entries(raw.progress)) {
  const q=questById(id),limit=expanded?(q?.legacyTaskCount||q?.tasks.length):q?.tasks.length;
  if(!q||!plain(value)||!integer(value.step,0,limit-1)||!integer(value.mistakes)||!integer(value.hints)) throw new Error('Eine laufende Quest enthält ungültige Daten.');
  if(value.ready===true&&value.step!==limit-1)throw new Error('Ungültiger Questabschluss.');
  if(!legacy&&!s.completed[id]) {
   const mapped=expanded?(q.legacyStepMap?.[value.step]??value.step):value.step;
   const step=expanded&&value.ready?Math.min(mapped+1,q.tasks.length-1):mapped;
   s.progress[id]={step,mistakes:value.mistakes,hints:value.hints};
   if(value.ready===true&&!expanded)s.progress[id].ready=true;
   // Optional presentation metadata; the existing save schema and mathematical fields stay intact.
   const shown=cleanShownLessons(q,value.shownLessons);
   if(shown.length)s.progress[id].shownLessons=shown;
  }
 }
 if(raw.schemaVersion===SCHEMA){
  for(const field of ['mastery','competencies','exams'])if(raw[field]!==undefined&&!plain(raw[field]))throw new Error('Ungültige Testdaten.');
  for(const [id,v] of Object.entries(raw.mastery||{})){
   if(!REGIONS.some(r=>r.id===id)||!plain(v)||!validDate(v.at))throw new Error('Ungültiges Gebietssiegel.');
   s.mastery[id]={at:v.at};
  }
  for(const [id,v] of Object.entries(raw.competencies||{})){
   if(!Object.hasOwn(LESSONS,id)||v!==true)throw new Error('Unbekannter Wissensnachweis.');s.competencies[id]=true;
  }
  for(const id of Object.keys(s.mastery))if(!sourceLessons(id).every(k=>s.competencies[k]))throw new Error('Dem Gebietssiegel fehlen Wissensnachweise.');
  if(Object.keys(raw.exams||{}).length>22)throw new Error('Zu viele Wegprüfungen.');
  for(const [key,e] of Object.entries(raw.exams||{})){
   const [from,to,...rest]=key.split('>');
   if(rest.length||!validRoute(from,to)||!plain(e)||!Array.isArray(e.keys)||e.keys.length<1||e.keys.length>83||new Set(e.keys).size!==e.keys.length||!e.keys.every(k=>Object.hasOwn(LESSONS,k))||!Array.isArray(e.passed)||new Set(e.passed).size!==e.passed.length||!e.passed.every(k=>e.keys.includes(k))||!integer(e.round,0,100000))throw new Error('Ungültige laufende Wegprüfung.');
   const remaining=e.keys.length-e.passed.length;
   if(!integer(e.index,0,remaining)||!Array.isArray(e.results)||e.results.length!==e.index||!e.results.every(x=>typeof x==='boolean'))throw new Error('Ungültiger Prüfungsfortschritt.');
   s.exams[key]={keys:[...e.keys],passed:[...e.passed],round:e.round,index:e.index,results:[...e.results]};
  }
 }
 if(raw.visited!==undefined && (!Array.isArray(raw.visited)||raw.visited.length>8||!raw.visited.every(id=>REGIONS.some(r=>r.id===id)))) throw new Error('Ungültige Liste besuchter Orte.');
 s.visited=[...new Set(['village',...(raw.visited||[])])];
 if(Array.isArray(raw.read)) s.read=[...new Set(raw.read.filter(id=>REGIONS.some(r=>r.id===id)))];
 s.activeQuest=questById(raw.activeQuest)?raw.activeQuest:'c6-v1';
 s.tutorial=raw.tutorial===true;
 if(validDate(raw.createdAt)) s.createdAt=raw.createdAt;
 if(validDate(raw.updatedAt)) s.updatedAt=raw.updatedAt;
 if(plain(raw.settings)) {
  for(const k of ['sound','largeText','reducedMotion']) s.settings[k]=raw.settings[k]===true;
  s.settings.quality=['normal','eco'].includes(raw.settings.quality)?raw.settings.quality:'normal';
 }
 if(plain(raw.stats)) for(const k of ['attempts','correct','hints']) s.stats[k]=integer(raw.stats[k])?raw.stats[k]:0;
 if(plain(raw.encounters)) {
  s.encounters.count=integer(raw.encounters.count)?raw.encounters.count:0;
  s.encounters.distance=Number.isFinite(raw.encounters.distance)?Math.max(0,Math.min(raw.encounters.distance,500)):0;
 }
 if(legacy) {s.activeQuest='c6-v1';s.migration={from:1,restarted:Object.keys(raw.progress).length};}
 else if(expanded){s.migration={from:2,restarted:0,practiceExpanded:true};}
 else if(plain(raw.migration)&&[1,2].includes(raw.migration.from)&&integer(raw.migration.restarted))s.migration={from:raw.migration.from,restarted:raw.migration.restarted};
 return s;
}
export function parseSave(text) {
 if(typeof text!=='string'||text.length>67108864) throw new Error('Die Datei ist zu groß (höchstens 64 MiB).');
 let raw; try{raw=JSON.parse(text);}catch{throw new Error('Die Datei ist kein gültiges JSON.');}
 return validateState(raw.format===FORMAT?validateSave(raw).currentState:raw);
}
export class SaveStore {
 constructor(onStatus=()=>{}) {
  this.onStatus=onStatus;
  // A subdirectory can contain an independent class installation on the same origin.
  const base = typeof location!=='undefined'?location.pathname.replace(/[^/]*$/,''):'';
  this.key='kommaland:v1:'+base; // Stable installation key; payload schema migrates independently.
  this.available=true; this.recovered=false; this.migrated=false; this.rawBackup=null;
  this.state=this.load();
 }
 load() {
  try {
   const raw=localStorage.getItem(this.key);
   if(!raw) return defaultState();
   try{const parsed=parseSave(raw);this.migrated=JSON.parse(raw).schemaVersion<SCHEMA;return parsed;}catch {
    this.rawBackup=raw;
    const backup=localStorage.getItem(this.key+':backup');
    if(backup) {try {this.recovered=true;return parseSave(backup);}catch{}}
    this.recovered=true; return defaultState();
   }
  } catch { this.available=false;return defaultState(); }
 }
 save() {
  this.state.updatedAt=new Date().toISOString();
  try{
   const text=JSON.stringify(this.state);
   // Preserve the previous known-valid snapshot. Corrupt input never becomes a backup.
   const old=localStorage.getItem(this.key);
   if(old){try{parseSave(old);localStorage.setItem(this.key+':backup',old);}catch{}}
   localStorage.setItem(this.key,text);this.available=true;this.onStatus(true);return true;
  }catch{this.available=false;this.onStatus(false);return false;}
 }
 replace(next) {
  const clean=validateState(next);
  // Keep a separate recovery copy before an intentional replacement or reset.
  try{localStorage.setItem(this.key+':before-import',JSON.stringify(this.state));}catch{}
  this.state=clean;this.save();return clean;
 }
 restorePrevious() {
  try {const previous=localStorage.getItem(this.key+':before-import');if(!previous)throw new Error('Keine Sicherung vorhanden.');return this.replace(parseSave(previous));}
  catch(e){throw new Error(e.message||'Die Sicherung konnte nicht geladen werden.');}
 }
 exportText() {this.save();return JSON.stringify(this.state,null,2);}
}

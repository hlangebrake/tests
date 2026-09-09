import {REGIONS, QUESTS, questById} from './content.js';
export const SCHEMA = 1;
export const APP_ID = 'kommaland';
export const defaultState = () => ({
 app:APP_ID, schemaVersion:SCHEMA, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(),
 player:{x:0,z:30}, completed:{}, progress:{}, visited:['village'], read:[],
 activeQuest:'v1', tutorial:false, encounters:{count:0,distance:0},
 settings:{sound:false,quality:'normal',largeText:false,reducedMotion:false},
 stats:{attempts:0,correct:0,hints:0}
});
const plain = x => x !== null && typeof x==='object' && !Array.isArray(x);
const integer = (x,min=0,max=1000000) => Number.isInteger(x) && x>=min && x<=max;
const validDate = x => typeof x==='string' && x.length<=40 && !Number.isNaN(Date.parse(x));
/** Only known fields are copied. No HTML, code, arbitrary object keys or names are imported. */
export function validateState(raw) {
 if(!plain(raw)||raw.app!==APP_ID||raw.schemaVersion!==SCHEMA) throw new Error('Das ist kein unterstützter Kommaland-Spielstand (Version 1).');
 if(!plain(raw.player)||!Number.isFinite(raw.player.x)||!Number.isFinite(raw.player.z)||Math.abs(raw.player.x)>100||Math.abs(raw.player.z)>100) throw new Error('Die gespeicherte Position ist ungültig.');
 if(!plain(raw.completed)||!plain(raw.progress)) throw new Error('Die Questdaten sind unvollständig.');
 const s=defaultState(); s.player={x:raw.player.x,z:raw.player.z};
 for(const [id,value] of Object.entries(raw.completed)) {
  if(!questById(id)||!plain(value)||!integer(value.mistakes)||!integer(value.hints)) throw new Error('Eine abgeschlossene Quest enthält ungültige Daten.');
  s.completed[id]={mistakes:value.mistakes,hints:value.hints,at:validDate(value.at)?value.at:new Date().toISOString()};
 }
 for(const [id,value] of Object.entries(raw.progress)) {
  const q=questById(id);
  if(!q||!plain(value)||!integer(value.step,0,q.tasks.length-1)||!integer(value.mistakes)||!integer(value.hints)) throw new Error('Eine laufende Quest enthält ungültige Daten.');
  if(!s.completed[id]) s.progress[id]={step:value.step,mistakes:value.mistakes,hints:value.hints};
 }
 if(raw.visited!==undefined && (!Array.isArray(raw.visited)||raw.visited.length>8||!raw.visited.every(id=>REGIONS.some(r=>r.id===id)))) throw new Error('Ungültige Liste besuchter Orte.');
 s.visited=[...new Set(['village',...(raw.visited||[])])];
 if(Array.isArray(raw.read)) s.read=[...new Set(raw.read.filter(id=>REGIONS.some(r=>r.id===id)))];
 s.activeQuest=questById(raw.activeQuest)?raw.activeQuest:'v1';
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
 return s;
}
export function parseSave(text) {
 if(typeof text!=='string'||text.length>1000000) throw new Error('Die Datei ist zu groß (höchstens 1 MB).');
 let raw; try{raw=JSON.parse(text);}catch{throw new Error('Die Datei ist kein gültiges JSON.');}
 return validateState(raw);
}
export class SaveStore {
 constructor(onStatus=()=>{}) {
  this.onStatus=onStatus;
  // A subdirectory can contain an independent class installation on the same origin.
  const base = typeof location!=='undefined'?location.pathname.replace(/[^/]*$/,''):'';
  this.key='kommaland:v1:'+base; this.available=true; this.recovered=false; this.rawBackup=null;
  this.state=this.load();
 }
 load() {
  try {
   const raw=localStorage.getItem(this.key);
   if(!raw) return defaultState();
   try{return parseSave(raw);}catch {
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

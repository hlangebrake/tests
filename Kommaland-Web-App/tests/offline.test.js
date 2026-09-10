import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
function serviceWorkerHarness(){
 const events={},requests=[],stored=new Map();let claimed=false,skipped=false;
 const scope='https://school.example/mathe/kommaland/';
 const cache={async addAll(paths){paths.forEach(p=>{assert.ok(fs.existsSync(new URL(p==='./'?'index.html':p,root)),p);stored.set(new URL(p,scope).href,'CACHED:'+p);});},async match(req,opts){const u=new URL(req.url||String(req),scope);if(opts?.ignoreSearch)u.search='';return stored.get(u.href);}};
 const context={URL,console,self:{registration:{scope},location:{origin:'https://school.example'},addEventListener:(event,fn)=>events[event]=fn,skipWaiting:async()=>{skipped=true;},clients:{claim:async()=>{claimed=true;}}},caches:{open:async()=>cache,keys:async()=>[],delete:async()=>true},fetch:async req=>{requests.push(req);throw new Error('offline');}};
 vm.runInNewContext(fs.readFileSync(new URL('sw.js',root),'utf8'),context);
 return {events,stored,requests,scope,get claimed(){return claimed;},get skipped(){return skipped;}};
}
test('Offline-Installation enthält alle existierenden App-Dateien',async()=>{
 const h=serviceWorkerHarness();let task;h.events.install({waitUntil:p=>task=p});await task;assert.equal(h.stored.size,35);assert.ok(h.stored.has(h.scope+'js/learning-log.js'));assert.ok(h.stored.has(h.scope+'teacher-dashboard/shared/save-schema.js'));assert.ok(h.stored.has(h.scope+'js/visuals.js'));assert.ok(h.stored.has(h.scope+'js/visual-models.js'));assert.ok(h.skipped);
 h.events.activate({waitUntil:p=>task=p});await task;assert.ok(h.claimed);
});
test('Offline-Cache funktioniert auch in einem Unterordner und mit Querystring',async()=>{
 const h=serviceWorkerHarness();let task;h.events.install({waitUntil:p=>task=p});await task;
 h.events.fetch({request:{url:h.scope+'index.html?debug=1',method:'GET',mode:'navigate'},respondWith:p=>task=p});assert.equal(await task,'CACHED:./index.html');assert.equal(h.requests.length,0);
 h.events.fetch({request:{url:h.scope+'js/content.js',method:'GET',mode:'cors'},respondWith:p=>task=p});assert.equal(await task,'CACHED:./js/content.js');
});
test('Fremde Domains und Schreibanfragen werden nicht abgefangen',()=>{
 const h=serviceWorkerHarness();let intercepted=false;
 for(const request of [{url:'https://other.example/x',method:'GET'},{url:h.scope+'upload',method:'POST'}])h.events.fetch({request,respondWith:()=>intercepted=true});
 assert.equal(intercepted,false);
});

/* Same-origin, subdirectory-safe offline installation; no telemetry or CDN. */
const CACHE_PREFIX='kommaland:'+self.registration.scope+'::';
const CACHE=CACHE_PREFIX+'v7.2.0';
const FILES=['./js/presentation.js','./js/difficulty-ui.js','./js/difficulty-bank.js','./js/difficulty-data.js','./teacher-dashboard/shared/difficulty.js','./teacher-dashboard/shared/difficulty-catalog.js','./teacher-dashboard/shared/practice-catalog.js','./js/enrichment.js','./js/adaptive-bank.js','./js/cognitive-review.js','./teacher-dashboard/shared/learning7.js','./teacher-dashboard/shared/learning7-content.js','./','./index.html','./styles.css','./js/app.js','./js/written.js','./js/written-models.js','./js/written-examples.js','./js/written-link.js','./js/regulation.js','./js/regulation-ui.js','./teacher-dashboard/shared/regulation.js','./teacher-dashboard/shared/regulation-validation.js','./js/learning-log.js','./teacher-dashboard/shared/save-schema.js','./teacher-dashboard/shared/projection.js','./teacher-dashboard/shared/idb.js','./teacher-dashboard/shared/catalog.js','./js/practice.js','./js/curriculum-data.js','./js/content-migration.js','./js/foundation-checks.js','./js/adventure.js','./js/scenery.js','./js/quest-models.js','./js/learning-flow.js','./js/task-widgets.js','./js/ui.js','./js/content.js','./js/lessons.js','./js/visuals.js','./js/visual-models.js','./js/terrain.js','./js/math.js','./js/state.js','./js/engine.js','./js/world.js','./manifest.webmanifest','./icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(url.pathname.includes('/teacher-dashboard/')&&!url.pathname.includes('/teacher-dashboard/shared/'))return;
 if(req.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const cached=await cache.match(req,{ignoreSearch:true});if(cached)return cached;
  try{return await fetch(req);}catch(error){
   if(req.mode==='navigate')return await cache.match(new URL('./index.html',self.registration.scope));
   throw error;
  }
 }));
});

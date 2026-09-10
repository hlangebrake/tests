/* Same-origin, subdirectory-safe offline installation; no telemetry or CDN. */
const CACHE_PREFIX='kommaland-teacher:'+self.registration.scope+'::';
const CACHE=CACHE_PREFIX+'v7.2.0';
const FILES=['./shared/difficulty.js','./shared/difficulty-catalog.js','./js/difficulty-view.js','./icon.svg','./shared/practice-catalog.js',"./", "./index.html", "./vendor/jszip.min.js", "./js/view-helpers.js", "./js/class-overview.js", "./js/import-worker.js", "./js/analysis-worker.js", "./js/importer.js", "./js/timeline.js", "./js/analytics.js", "./js/learning7-view.js", "./js/student-detail.js", "./js/regulation-view.js", "./js/demo.js", "./js/report.js", "./js/app.js", "./js/zip-importer.js", "./js/database.js", "./css/styles.css", "./shared/idb.js", "./shared/catalog.js", "./shared/catalog-legacy.js", "./shared/regulation.js", "./shared/learning7.js", "./shared/projection.js", "./shared/save-schema.js", "./shared/learning7-content.js", "./shared/regulation-validation.js"];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const cached=await cache.match(req,{ignoreSearch:true});if(cached)return cached;
  try{return await fetch(req);}catch(error){
   if(req.mode==='navigate')return await cache.match(new URL('./index.html',self.registration.scope));
   throw error;
  }
 }));
});

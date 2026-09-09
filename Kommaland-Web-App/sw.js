/* Same-origin, subdirectory-safe offline installation; no telemetry or CDN. */
const CACHE_PREFIX='kommaland:'+self.registration.scope+'::';
const CACHE=CACHE_PREFIX+'v1.0.0';
const FILES=['./','./index.html','./styles.css','./js/app.js','./js/ui.js','./js/content.js','./js/math.js','./js/state.js','./js/engine.js','./js/world.js','./manifest.webmanifest','./icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png'];
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

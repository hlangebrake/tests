/** Small IndexedDB primitives. No network, third-party services or hidden fallback DB. */
export function request(req){return new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('Datenbankanfrage fehlgeschlagen.'));});}
export function transactionDone(tx){return new Promise((resolve,reject)=>{tx.oncomplete=()=>resolve();tx.onabort=()=>reject(tx.error||new Error('Datenbanktransaktion abgebrochen.'));tx.onerror=()=>{};});}
export function openDB(name,version,upgrade){return new Promise((resolve,reject)=>{
 if(!globalThis.indexedDB){reject(new Error('IndexedDB ist nicht verfügbar. Bitte einen normalen Browsermodus verwenden.'));return;}
 const r=indexedDB.open(name,version);r.onupgradeneeded=e=>upgrade(r.result,e.oldVersion,r.transaction);r.onerror=()=>reject(r.error);r.onblocked=()=>reject(new Error('Die Datenbank ist in einem anderen Fenster geöffnet. Andere Kommaland-Fenster schließen.'));r.onsuccess=()=>{r.result.onversionchange=()=>r.result.close();resolve(r.result);};
});}
export function addIndexes(store){for(const name of ['studentId','timestamp','questId','topicId','type','sessionId'])if(!store.indexNames.contains(name))store.createIndex(name,name,{unique:false});}
export const indexAll=(db,store,index,key)=>request(db.transaction(store,'readonly').objectStore(store).index(index).getAll(key));
export const getAll=(db,store)=>request(db.transaction(store,'readonly').objectStore(store).getAll());

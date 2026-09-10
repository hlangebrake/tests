/** TEST ONLY: deterministic, asynchronous, transactional in-memory adapter for the
 * subset of IDB used here. It is NOT a browser persistence/IndexedDB conformance test.
 * Production imports never reference this module. All transactions are serialized.
 */
export function installMemoryIDB(target=globalThis,seed=[]){
 const databases=new Map();
 for(const [name,x] of seed){const defs=new Map(x.defs.map(([k,v])=>[k,{...v,indexes:new Map(v.indexes),records:new Map(v.records)}]));databases.set(name,{defs,version:x.version,queue:[],active:false});}
 const clone=x=>x===undefined?undefined:structuredClone(x),key=x=>JSON.stringify(x);
 class Tx{
  constructor(data,names,mode){this.data=data;this.names=Array.isArray(names)?names:[names];this.mode=mode;this.pending=[];this.state='waiting';this.ended=false;this.error=null;this.oncomplete=null;this.onabort=null;data.queue.push(this);pump(data);}
  // Records are immutable here: get results and writes are cloned by the request/store layer.
  // A shallow map snapshot therefore provides copy-on-write rollback without cloning the class.
  start(){this.state='active';this.maps=new Map(this.names.map(n=>[n,new Map(this.data.defs.get(n).records)]));this.drain();}
  objectStore(name){if(!this.names.includes(name))throw new Error('NotFoundError');return new Store(this,name);}
  req(fn){if(this.ended)throw new Error('TransactionInactiveError');const r={onsuccess:null,onerror:null,result:undefined,error:null};this.pending.push({r,fn});if(this.state==='active')queueMicrotask(()=>this.drain());return r;}
  drain(){if(this.state!=='active'||this.ended)return;clearTimeout(this.timer);const op=this.pending.shift();if(!op){this.timer=setTimeout(()=>this.complete(),0);return;}try{op.r.result=clone(op.fn());op.r.onsuccess?.({target:op.r});}catch(e){op.r.error=e;op.r.onerror?.({target:op.r,preventDefault(){}});this.error=e;this.abort();}queueMicrotask(()=>this.drain());}
  complete(){if(this.pending.length)return this.drain();if(this.ended)return;this.ended=true;clearTimeout(this.timer);if(this.mode==='readwrite')for(const [name,records]of this.maps)this.data.defs.get(name).records=records;this.oncomplete?.();this.data.active=false;pump(this.data);}
  abort(){if(this.ended)throw new Error('InvalidStateError');this.ended=true;clearTimeout(this.timer);queueMicrotask(()=>{this.onabort?.();this.data.active=false;pump(this.data);});}
 }
 function pump(d){if(d.active)return;const tx=d.queue.shift();if(tx){d.active=true;queueMicrotask(()=>tx.start());}}
 class Store{
  constructor(tx,name){this.tx=tx;this.name=name;this.def=tx.data.defs.get(name);this.keyPath=this.def.keyPath;}
  values(){return this.tx.maps.get(this.name);}
  get(k){return this.tx.req(()=>this.values().get(key(k)));}
  getAll(){return this.tx.req(()=>[...this.values().values()]);}
  put(v){return this.write(v,false);}
  add(v){return this.write(v,true);}
  write(v,add){const copy=clone(v);return this.tx.req(()=>{if(this.tx.mode!=='readwrite')throw new Error('ReadOnlyError');const id=Array.isArray(this.keyPath)?this.keyPath.map(k=>copy[k]):copy[this.keyPath];if(id===undefined||Array.isArray(id)&&id.some(x=>x===undefined))throw new Error('DataError');if(add&&this.values().has(key(id)))throw new Error('ConstraintError');this.values().set(key(id),copy);return id;});}
  delete(k){return this.tx.req(()=>this.values().delete(key(k)));}
  clear(){return this.tx.req(()=>this.values().clear());}
  index(name){const path=this.def.indexes.get(name);if(!path)throw new Error('IndexNotFound '+name);const s=this;return {getAll(k){return s.tx.req(()=>[...s.values().values()].filter(v=>k===undefined||key(v[path])===key(k)));},openCursor(range){let items=null,i=0;const r={onsuccess:null,onerror:null,result:null};const step=()=>{s.tx.req(()=>{items??=[...s.values().entries()].filter(([_,v])=>!range||key(v[path])===key(range.value));const item=items[i++];r.result=item?{value:clone(item[1]),primaryKey:JSON.parse(item[0]),delete:()=>s.delete(JSON.parse(item[0])),continue:step}:null;queueMicrotask(()=>r.onsuccess?.({target:r}));return null;});};step();return r;}};}
 }
 const factory={open(name,version=1){const r={onsuccess:null,onerror:null,onupgradeneeded:null,onblocked:null,result:null,transaction:null};queueMicrotask(()=>{let data=databases.get(name),old=data?.version||0;if(!data){data={defs:new Map(),version,queue:[],active:false};databases.set(name,data);}const db={objectStoreNames:{contains:n=>data.defs.has(n)},close(){},createObjectStore(n,options){const d={keyPath:options.keyPath,indexes:new Map(),records:new Map()};data.defs.set(n,d);return {indexNames:{contains:n=>d.indexes.has(n)},createIndex:(n,path)=>d.indexes.set(n,path)};},transaction:(names,mode='readonly')=>new Tx(data,names,mode),onversionchange:null};r.result=db;if(old<version)r.onupgradeneeded?.({oldVersion:old});r.onsuccess?.();});return r;},deleteDatabase(name){databases.delete(name);return{};}};
 Object.defineProperty(target,'indexedDB',{value:factory,configurable:true});Object.defineProperty(target,'IDBKeyRange',{value:{only:value=>({value})},configurable:true});
 return {dump:()=>[...databases].map(([n,d])=>[n,{version:d.version,defs:[...d.defs].map(([k,v])=>[k,{keyPath:v.keyPath,indexes:[...v.indexes],records:[...v.records]}])}]),databases};
}

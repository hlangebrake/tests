import '../vendor/jszip.min.js';
import {LIMITS} from '../shared/save-schema.js';
/** Enumerates JSON files at any directory depth. Does not extract to a filesystem.
 * Nested ZIP *archives*, encryption and ZIP64 are intentionally rejected/ignored.
 * A central-directory preflight and bounded streaming decompression defend against
 * expansion bombs; actual output length + CRC are checked, not just declared size.
 */
const crcTable=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;crcTable[n]=c;}
const updateCRC=(crc,chunk)=>{for(const v of chunk)crc=crcTable[(crc^v)&255]^(crc>>>8);return crc;};
export function inspectZip(bytes){
 if(bytes.length>LIMITS.zipBytes)throw new Error('ZIP überschreitet 250 MiB.');
 const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),u16=p=>v.getUint16(p,true),u32=p=>v.getUint32(p,true);let end=-1;
 for(let p=bytes.length-22;p>=Math.max(0,bytes.length-65557);p--)if(u32(p)===0x06054b50&&p+22+u16(p+20)===bytes.length){end=p;break;}
 if(end<0)throw new Error('Ungültiges oder beschädigtes ZIP-Archiv.');
 if(u16(end+4)||u16(end+6))throw new Error('Mehrteilige ZIP-Archive werden nicht unterstützt.');
 const count=u16(end+10),start=u32(end+16);if(count===65535||start===0xffffffff)throw new Error('ZIP64 wird nicht unterstützt. Bitte als normales ZIP exportieren.');
 if(count>LIMITS.files)throw new Error('ZIP enthält mehr als 5000 Einträge.');
 let pos=start,total=0;const entries=[],seen=new Set();
 for(let i=0;i<count;i++){
  if(pos+46>bytes.length||u32(pos)!==0x02014b50)throw new Error('Beschädigtes ZIP-Verzeichnis.');
  const flags=u16(pos+8),method=u16(pos+10),crc=u32(pos+16),compressed=u32(pos+20),size=u32(pos+24),nl=u16(pos+28),extra=u16(pos+30),comment=u16(pos+32),offset=u32(pos+42);
  if(pos+46+nl+extra+comment>bytes.length)throw new Error('Unvollständiger ZIP-Eintrag.');
  const name=new TextDecoder().decode(bytes.subarray(pos+46,pos+46+nl));pos+=46+nl+extra+comment;
  if(!/\.json$/i.test(name)||name.startsWith('__MACOSX/')||name.split('/').some(x=>x.startsWith('.')))continue;
  if(flags&1)throw new Error('Verschlüsselte ZIP-Dateien bitte vorher entschlüsseln.');
  if(![0,8].includes(method))throw new Error('ZIP-Kompression nicht unterstützt. Nutze STORE oder DEFLATE.');
  if([size,compressed,offset].includes(0xffffffff))throw new Error('ZIP64-Datei nicht unterstützt.');
  if(size>LIMITS.jsonBytes||(total+=size)>LIMITS.expandedBytes)throw new Error('Entpackte Daten überschreiten die Sicherheitsgrenze (64 MiB pro JSON / 512 MiB gesamt).');
  if(offset+30>bytes.length||u32(offset)!==0x04034b50)throw new Error('Ungültiger ZIP-Dateiverweis.');
  const dataStart=offset+30+u16(offset+26)+u16(offset+28);if(dataStart+compressed>start)throw new Error('ZIP-Dateibereich überschreitet das Inhaltsverzeichnis.');
  const normalized=name.replace(/\\/g,'/');if(seen.has(normalized))throw new Error('ZIP enthält doppelte Dateipfade.');seen.add(normalized);entries.push({name,normalized,size,crc,compressed,offset});
 }
 return entries;
}
function boundedText(file,entry){return new Promise((resolve,reject)=>{
 const chunks=[];let size=0,crc=0xffffffff,failed=false;const stream=file.internalStream('uint8array');
 stream.on('data',chunk=>{if(failed)return;size+=chunk.length;if(size>LIMITS.jsonBytes||size>entry.size){failed=true;stream.pause();reject(new Error('ZIP-Eintrag entpackt größer als angegeben.'));return;}crc=updateCRC(crc,chunk);chunks.push(chunk);});
 stream.on('error',e=>{failed=true;reject(new Error('ZIP-Datei konnte nicht entpackt werden: '+e.message));});
 stream.on('end',()=>{if(failed)return;if(size!==entry.size||((crc^0xffffffff)>>>0)!==entry.crc){reject(new Error('ZIP-Prüfsumme oder Dateigröße stimmt nicht.'));return;}const out=new Uint8Array(size);let p=0;for(const c of chunks){out.set(c,p);p+=c.length;}try{resolve(new TextDecoder('utf-8',{fatal:true}).decode(out));}catch{reject(new Error('ZIP-Eintrag enthält kein gültiges UTF-8.'));}});stream.resume();
});}
export async function* jsonFilesInZip(file){
 const bytes=new Uint8Array(await file.arrayBuffer()),entries=inspectZip(bytes),zip=await globalThis.JSZip.loadAsync(bytes,{checkCRC32:false,createFolders:false});
 for(const e of entries){
  const f=Object.values(zip.files).find(f=>!f.dir&&(f.unsafeOriginalName===e.name||f.name===e.normalized));
  if(!f){yield {name:file.name+'/'+e.name,error:'ZIP-Dateieintrag nicht gefunden.'};continue;}
  try{yield {name:file.name+'/'+e.name,text:await boundedText(f,e)};}catch(error){yield {name:file.name+'/'+e.name,error:error.message};}
 }
}

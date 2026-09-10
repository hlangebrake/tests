export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const pct=v=>v==null?'—':Math.round(v*100)+' %';
export const num=(v,places=1)=>v==null?'—':v.toLocaleString('de-DE',{maximumFractionDigits:places,minimumFractionDigits:places});
export const date=v=>v?new Date(v).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'}):'—';
export const dateTime=v=>v?new Date(v).toLocaleString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}):'—';
export const duration=ms=>ms==null?'—':ms<60000?Math.round(ms/1000)+' s':ms<3600000?Math.round(ms/60000)+' min':Math.floor(ms/3600000)+' h '+Math.round(ms%3600000/60000)+' min';
export const initials=name=>name.trim().split(/\s+/).slice(0,2).map(n=>n[0]).join('').toUpperCase();
export const progress=(value,label='')=>`<div class="progress-wrap"><span class="progress-track ${value==null?'unknown':''}" role="progressbar" aria-label="${esc(label||'Fortschritt')}" ${value==null?'aria-valuetext="Noch kein beobachteter Lernstand"':'aria-valuenow="'+Math.round(value*100)+'"'} aria-valuemin="0" aria-valuemax="100"><i style="width:${Math.max(0,Math.min(100,(value||0)*100))}%"></i></span><strong>${pct(value)}</strong></div>`;
export const statusLabel=s=>({unobserved:'Ohne Verlaufsdaten',not_started:'Noch offen',started:'In Arbeit',completed:'Abgeschlossen',skipped:'Für später',paused:'Unterbrochen'}[s]||s);
export const status=s=>`<span class="status ${esc(s)}">${esc(statusLabel(s))}</span>`;
export const empty=(title,text)=>`<div class="empty-state"><span class="empty-symbol" aria-hidden="true">↗</span><h2>${esc(title)}</h2><p>${esc(text)}</p></div>`;
export const stat=(label,value,sub='',cls='')=>`<article class="stat-card ${cls}"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(sub)}</small></article>`;
export function signalsHTML(signals){return signals.map(s=>`<article class="signal-card ${s.priority>=3?'attention':s.code==='stretch'?'stretch':'neutral'}"><span class="signal-dot"></span><div><h3>${esc(s.title)}</h3><p>${esc(s.evidence)}</p><small>${esc(s.suggestion)}</small></div></article>`).join('');}
export function downloadJSON(data,name){const blob=new Blob([JSON.stringify(data)],{type:'application/json'});if(blob.size>256*1024*1024)throw new Error('Gesamtsicherung überschreitet die dokumentierte Grenze von 256 MiB. Der lokale Datenbestand bleibt erhalten.');const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
export function downloadCSV(rows,name){
 // Neutralize spreadsheet formulas in user-controlled names; quote every cell.
 const cell=x=>{let s=String(x??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};
 const blob=new Blob(['\ufeff'+rows.map(r=>r.map(cell).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
}

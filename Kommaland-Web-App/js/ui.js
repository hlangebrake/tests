/** Small, self-contained interface illustrations. No fonts or remote assets. */
export const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={
 home:'<path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-8h6v8"/>',
 leaf:'<path d="M20 3C10 2 3 6 4 14c.4 4 4 7 8 5 7-3 8-10 8-16Z M4 21 15 9M9 16l-1-6m5 2 5 1"/>',
 anchor:'<circle cx="12" cy="5" r="2"/><path d="M12 7v14M8 10h8M3 14c0 4 4 7 9 7s9-3 9-7M3 14l-2 3m2-3 3 2m15-2 2 3m-2-3-3 2"/>',
 bag:'<path d="M5 7h14l2 14H3L5 7ZM8 8V6a4 4 0 0 1 8 0v2"/>',
 mountain:'<path d="m2 21 8-17 5 10 3-5 5 12H2Zm5-10 3 2 3-2"/>',
 wind:'<circle cx="12" cy="10" r="2"/><path d="m10 8-5-5 4-2 3 7m2 0 5-5 2 4-7 3m0 2 5 5-4 2-3-7m-2 0-5 5-2-4 7-3M9 15 8 23h8l-1-8"/>',
 gem:'<path d="m3 8 4-5h10l4 5-9 14L3 8Zm0 0h18M7 3l2 5 3 14 3-14 2-5"/>',
 star:'<path d="m12 2 2.8 6.5 7.2.6-5.5 4.7 1.7 7.2-6.2-3.7L5.8 21l1.7-7.2L2 9.1l7.2-.6L12 2Z"/>',
 book:'<path d="M12 5C8 2 4 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-2-1-6-2-10 1Zm0 0v16M5 8l4 1M5 12l4 1m6-4 4-1m-4 5 4-1"/>',
 map:'<path d="m2 5 6-3 8 3 6-3v17l-6 3-8-3-6 3V5Zm6-3v17m8-14v17"/>',
 menu:'<path d="M7 7V5a5 5 0 0 1 10 0v2M5 7h14l2 14H3L5 7Zm3 5h8v5H8v-5Z"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 check:'<path d="m4 12 5 5L20 6"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
 hand:'<path d="M8 12V4a2 2 0 0 1 4 0v7-3a2 2 0 0 1 4 0v3-1a2 2 0 0 1 4 0v5c0 5-3 7-6 7-4 0-6-3-10-8a2 2 0 0 1 3-2l3 3"/>',
 download:'<path d="M12 2v13m-5-5 5 5 5-5M3 15v6h18v-6"/>',
 upload:'<path d="M12 16V3m-5 5 5-5 5 5M3 15v6h18v-6"/>',
 fullscreen:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
 sound:'<path d="m11 3-6 5H2v8h3l6 5V3Zm4 5c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',
 undo:'<path d="M3 9h11a7 7 0 1 1-6 11M3 9l5-5M3 9l5 5"/>',
 help:'<circle cx="12" cy="12" r="10"/><path d="M9 8a3 3 0 1 1 4 3c-1 .5-1 1-1 3m0 3v.2"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 4v3"/>',
 route:'<circle cx="5" cy="4" r="2"/><circle cx="19" cy="20" r="2"/><path d="M8 4h8a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8h8"/>',
 shield:'<path d="m12 2 9 4v6c0 5-6 9-9 10-3-1-9-5-9-10V6l9-4Zm-5 9 3 3 7-7"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 reset:'<path d="M3 11a9 9 0 1 1 2 7M3 3v8h8"/>',
 droplet:'<path d="M12 2C9 7 4 12 4 16a8 8 0 0 0 16 0c0-4-5-9-8-14ZM8 15c-1 2 0 4 2 4"/>',
 flag:'<path d="M5 22V3m0 0c5-5 9 5 15 0v11c-6 5-10-5-15 0"/>',
 spark:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>',
 minus:'<path d="M5 12h14"/>',
 plus:'<path d="M5 12h14M12 5v14"/>',
 erase:'<path d="m8 5-6 7 6 7h14V5H8Zm4 4 6 6m0-6-6 6"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'
};
export function icon(name, cls='') { return `<svg class="icon ${esc(cls)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.spark}</svg>`; }
export function questIcon(q) {return ({masterstone:'star',stable:'leaf',deer:'leaf',trail:'route',cart:'bag',feeding:'bag',lumber:'wind',camp:'flag',apiary:'leaf',crystals:'gem',fountain:'droplet',house:'home',crates:'bag',statue:'star',gate:'shield',stones:'route',lantern:'spark',tree:'leaf',boat:'anchor',tank:'droplet',clock:'clock',pavilion:'home',stall:'bag',banner:'flag',table:'bag',lift:'mountain',bridge:'route',mill:'wind',garden:'leaf',crystal:'gem',mushroom:'leaf',slime:'gem',boss:'shield',tower:'home',chest:'bag',dragon:'star',beacon:'spark'})[q.kind]||'star';}
export function numberLine(start=0,end=1,step=.1,selected=null,sparse=false) {
 const count=Math.round((end-start)/step); let ticks='';
 for(let i=0;i<=count;i++){const x=24+312*i/count,n=start+i*step;const label=n.toLocaleString('de-DE',{maximumFractionDigits:3});ticks+=`<path d="M${x} 31v${i%5===0?14:9}" stroke="currentColor"/>`;if(!sparse||i===0||i===count)ticks+=`<text x="${x}" y="64" text-anchor="middle" font-size="${count>12?10:12}" fill="currentColor">${esc(label)}</text>`;}
 const marker=selected!==null?`<path d="m${24+312*(Number(String(selected).replace(',','.'))-start)/(end-start)} 29-7-12h14Z" fill="#bc8544"/>`:'';
 return `<svg class="numberline-svg" viewBox="0 0 360 75" role="img" aria-label="Zahlengerade von ${esc(start)} bis ${esc(end)}"><path d="M20 36h322m-5-4 5 4-5 4" stroke="currentColor" fill="none" stroke-width="1.6"/>${ticks}${marker}</svg>`;
}
export function mathVisual(type, taskMode=false) {
 if(!type) return '';
 let s='',cap='';
 switch(type){
 case 'place': case 'places':
  s=`<table class="place-table"><thead><tr><th>E</th><th class="comma"></th><th>z</th><th>h</th>${type==='places'?'<th>t</th>':''}</tr></thead><tbody><tr><td>${type==='places'?'0':'2'}</td><td class="comma">,</td><td class="active">${type==='places'?'0':'4'}</td><td>${type==='places'?'0':'7'}</td>${type==='places'?'<td>4</td>':''}</tr></tbody></table>`;
  cap=type==='places'?'Einer · Zehntel · Hundertstel · Tausendstel':'Einer · Zehntel · Hundertstel';break;
 case 'hundred': s=`<div class="hundred-grid">${Array.from({length:100},(_,i)=>`<i class="${i<(taskMode?6:25)?'filled':''}"></i>`).join('')}</div>`;cap=taskMode?'6 von 100 gleich großen Teilen':'Ein Ganzes besteht aus 100 Hundertsteln.';break;
 case 'quarters':s='<div class="fraction-grid"><i class="filled"></i><i class="filled"></i><i class="filled"></i><i></i></div>';cap='3 von 4 gleich großen Teilen';break;
 case 'line': s=numberLine();cap='Jeder kleine Schritt ist ein Zehntel.';break;
 case 'compare':s='<div class="visual-equation">0,80 <span>&gt;</span> 0,75<small>80 Hundertstel &gt; 75 Hundertstel</small></div>';break;
 case 'round':s='<div class="visual-equation">3,4<span style="color:var(--gold)">6</span> → 3,5<small>Die 6 sagt: aufrunden.</small></div>';break;
 case 'units':s='<div class="visual-operation"><span>1 m</span>→<span>100 cm</span></div>';cap='Gleiche Länge. Andere Einheit.';break;
 case 'clock':s='<svg viewBox="0 0 120 120" style="height:130px;width:130px;margin:auto;display:block" aria-label="Eine Viertelstunde ist ein Viertel des Zifferblatts" role="img"><circle cx="60" cy="60" r="49" fill="#f6f0df" stroke="#4d6f5c" stroke-width="3"/><path d="M60 60V11a49 49 0 0 1 49 49Z" fill="#bfcc9b"/><path d="M60 25v35h32" stroke="#3a584b" fill="none" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="60" r="4" fill="#3a584b"/></svg>';cap='Ein Viertel einer Stunde: 15 Minuten';break;
 case 'area':s='<div class="visual-equation">1 m²<small>10 dm × 10 dm = 100 dm²</small></div>';break;
 case 'addition':s='<div class="arithmetic"><div>  1,25</div><div>+ 2,40</div><div class="rule">  3,65</div></div>';cap='Komma unter Komma';break;
 case 'subtraction':s='<div class="arithmetic"><div>  5,80</div><div>− 2,35</div><div class="rule">  3,45</div></div>';cap='Gleiche Stellen untereinander';break;
 case 'inverse':s='<div class="concept-equations"><p>3 · 0,5 = 1,5</p><p>1,5 : 3 = 0,5</p></div>';cap='Multiplikation und Division sind Umkehroperationen.';break;
 case 'multiply':s='<div class="visual-equation">1,2 · 0,5<small>12 · 5 = 60 → 0,60</small></div>';cap='Zusammen zwei Nachkommastellen';break;
 case 'powers':s='<div class="visual-operation"><span>0,37</span>× 10<span>3,7</span></div>';cap='Jede Ziffer erhält den zehnfachen Stellenwert.';break;
 case 'divide':s='<div class="visual-operation"><span>3 Liter</span>→<span>4 Becher</span></div>';cap='3 l : 4 = 0,75 l je Becher';break;
 case 'operations':s='<div class="visual-operation"><span>( )</span>→<span>· und :</span>→<span>+ und −</span></div>';cap='In dieser Reihenfolge rechnen';break;
 default:s='<div class="visual-operation"><span>1,75</span>+<span>0,25</span>=<span>2</span></div>';cap='Passende Teile ergeben ein Ganzes.';
 }
 return `<div class="math-visual">${s}${cap?`<span class="caption">${esc(cap)}</span>`:''}</div>`;
}

/** Illustrations are parameterized, so a knowledge card never shows an unrelated harder example. */
export function lessonVisual(v){
 if(!v)return '';let body='';
 if(v.kind==='halves'){
  body=`<div class="whole-kannens">${Array.from({length:v.whole},()=>'<div class="kannen full"><i></i><span>1 Ganzes</span></div>').join('')}<div class="kannen half"><i></i><span>ein halb</span></div></div><div class="visual-caption">${v.whole} Ganze und ein halbes Ganzes</div>`;
 }else if(v.kind==='strip'){
  body=`<div class="tenth-strip" role="img" aria-label="${esc(v.label)}">${Array.from({length:v.parts},(_,i)=>`<i class="${i<v.filled?'filled':''}"><small>${i+1}</small></i>`).join('')}</div><div class="strip-bracket">ein Ganzes</div><div class="visual-caption">${esc(v.label)}</div>`;
 }else if(v.kind==='grid'){
  body=`<div class="hundred-grid lesson-grid" role="img" aria-label="${esc(v.label)}">${Array.from({length:100},(_,i)=>`<i class="${i<v.filled?'filled':''}"></i>`).join('')}</div><div class="visual-caption">${esc(v.label)}</div>`;
 }else if(v.kind==='place'){
  body=`<table class="place-table detailed-place"><caption>${esc(v.number)}</caption><thead><tr>${v.names.map((n,i)=>`${i===1?'<th class="comma"></th>':''}<th scope="col">${esc(n)}</th>`).join('')}</tr></thead><tbody><tr>${v.digits.map((d,i)=>`${i===1?'<td class="comma">,</td>':''}<td>${esc(d)}</td>`).join('')}</tr></tbody></table>`;
 }else if(v.kind==='line'||v.kind==='halfline'){
  body=numberLine(v.start,v.end,v.step??.5,v.mark);if(v.kind==='halfline')body+='<div class="visual-caption">2,5 liegt genau in der Mitte.</div>';
 }else if(v.kind==='fraction'){
  body=`<div class="fraction-explained"><div class="written-fraction"><b>${v.top}</b><b>${v.bottom}</b></div><div><p><b>oben:</b> ${v.top} ${v.top===1?'Teil ist':'Teile sind'} gemeint</p><p><b>unten:</b> ${v.bottom} gleich große Teile bilden das Ganze</p></div></div><div class="tenth-strip fraction-strip">${Array.from({length:v.bottom},(_,i)=>`<i class="${i<v.top?'filled':''}"></i>`).join('')}</div>`;
 }else if(v.kind==='arithmetic'){
  body=`<div class="arithmetic">${v.rows.map((r,i)=>`<div class="${i===v.rows.length-1?'rule':''}">${esc(r)}</div>`).join('')}</div>`;
 }else if(v.kind==='equation'){
  body=`<div class="concept-equations">${v.lines.map(l=>`<p>${esc(l)}</p>`).join('')}</div>`;
 }
 return `<figure class="concept-visual">${body}</figure>`;
}

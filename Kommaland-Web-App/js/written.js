/** Accessible, optional written-work stepper. All navigation uses normal buttons
 * and a range control; no timers, no extra quiz tasks, no mathematical progress.
 */
import {esc} from './ui.js';
import {buildWritten,calculationLabel} from './written-models.js';
import {WRITTEN_EXAMPLES} from './written-examples.js';
const memory=new Map();
const cellText=v=>v&&typeof v==='object'?v.text:String(v??'');
const resultHTML=m=>{
 if(!m.periodic)return esc(m.result);
 const [before,period]=m.result.split('(');return esc(before)+`<span class="written-period" aria-label="Periode ${esc(period.slice(0,-1))}">${esc(period.slice(0,-1))}</span>`;
};
function cellsHTML(cells,m,step,head=false,showComma=true){
 let out='';for(let i=0;i<m.columns.length;i++){
  if(m.scale&&i===m.columns.length-m.scale)out+=head?'<th class="written-comma" scope="col">,</th>':`<td class="written-comma">${showComma&&(head||cells.some(v=>cellText(v)!==''))?',':''}</td>`;
  const v=cells[i],value=cellText(v),obj=v&&typeof v==='object'?v:{};
  if(head){out+=`<th scope="col" title="${esc(m.columns[i].title)}">${esc(m.columns[i].label)}</th>`;continue;}
  out+=`<td class="${step.focus.includes(i)?'written-active ':''}${obj.added?'written-added ':''}${obj.previous?'written-rewritten ':''}">${obj.previous?`<span class="written-old" aria-label="ersetzt: ${esc(obj.previous.join(', '))}">${obj.previous.map(x=>`<s>${esc(x)}</s>`).join(' ')}</span>`:''}<span class="written-digit">${esc(value)||'&nbsp;'}</span></td>`;
 }return out;
}
export function writtenStepHTML(m,index){
 const step=m.steps[Math.max(0,Math.min(index,m.steps.length-1))];
 const division=m.op==='div';
 // Decimal dividers in add/sub grids denote the unchanged place boundary.
 // Division subtractions are local natural-number operations: their remainder
 // rows do NOT contain a decimal comma, even underneath a decimal dividend.
 const tableModel=division?{...m,scale:0}:m;
 const quotientHTML=step.showResult?resultHTML(m):(step.quotient?esc(step.quotient)+'…':'…');
 const header=division?`<div class="written-division-heading"><span>${esc(m.dividend)}</span><span>: ${esc(m.divisor)} ${step.showResult&&!m.exact?'≈':'='}</span><strong>${quotientHTML}</strong></div>`:'';
 const dividendRow=division?`<tr class="written-row written-dividend"><th scope="row">Dividend</th>${m.dividend.replace(',','').split('').map((v,i)=>`<td class="${m.scale&&i===m.columns.length-m.scale-1?'written-decimal-boundary':''}">${esc(v)}</td>`).join('')}</tr>`:'';
 const rows=dividendRow+step.rows.map(r=>`<tr class="written-row written-${r.kind||'operand'}"><th scope="row" title="${esc(r.title||r.label)}">${esc(r.label)}</th>${cellsHTML(r.cells,tableModel,step,false,r.kind!=='carry')}</tr>`).join('');
 return `${header}<table class="written-table" aria-label="${esc(m.expression)} · ${esc(step.heading)}"><thead><tr><th scope="col" class="written-row-name">${division?'Schritt':'Stelle'}</th>${cellsHTML(m.columns.map(x=>x.label),tableModel,step,true)}</tr></thead><tbody>${rows}</tbody></table>${step.showResult?`<div class="written-result">${esc(m.expression)} ${m.exact?'=':'≈'} <strong>${resultHTML(m)}</strong></div>`:''}`;
}
export function writtenHTML(id,{linked=false,prompt=''}={}){
 if(!WRITTEN_EXAMPLES[id])return '';
 return `<section class="written-work" data-written="${esc(id)}" data-written-linked="${linked}" aria-label="Schriftliche Rechnung ausprobieren"><header class="written-head"><span class="written-eyebrow">${linked?'VOM SCHAUBILD ZUR RECHNUNG':'DAS BEISPIEL SCHRIFTLICH'}</span><h3>Schriftliche Rechnung</h3><p>${linked?'Mit den Zahlen aus dem Schaubild.':'Mit den Zahlen dieses Beispiels.'}</p></header>${prompt?`<p class="written-source-prompt">${esc(prompt)}</p>`:''}<label class="written-selection">Teilrechnung auswählen<select data-written-choice aria-label="Schriftliche Teilrechnung auswählen"></select></label><p class="written-context"></p><div class="written-stage-heading"></div><div class="written-paper" tabindex="0" aria-label="Rechentafel, bei Bedarf scrollbar"></div><div class="written-explanation" role="status" aria-live="polite"></div><div class="written-controls"><button type="button" data-written-action="prev" aria-label="Einen Rechenschritt zurück">← Zurück</button><span class="written-position"></span><button type="button" data-written-action="next">Nächster Schritt →</button></div><label class="written-scrubber"><span class="sr-only">Rechenschritt auswählen</span><input type="range" min="0" step="1" value="0" data-written-range aria-label="Rechenschritt auswählen"></label><div class="written-shortcuts"><button type="button" data-written-action="start">Von vorn</button><button type="button" data-written-action="all">Ganze Rechnung zeigen</button></div><details><summary>Zeichen und Stellenwerte</summary><p class="written-legend">Kleine markierte Ziffern: Überträge. Durchgestrichene Werte: beim Entbündeln ersetzt. E: Einer · Z: Zehner · H: Hunderter · z: Zehntel · h: Hundertstel · t: Tausendstel. Die farbig umrandeten Stellen gehören zum aktuellen Schritt.</p></details></section>`;
}
export function attachWritten(root=document){
 const cleanups=[];
 root.querySelectorAll('[data-written]').forEach(host=>{
  const id=host.dataset.written,linked=host.dataset.writtenLinked==='true',key=(linked?'model:':'example:')+id;
  let calculations=linked?root.querySelector(`[data-lab="${id}"]`)?.writtenCalculations:WRITTEN_EXAMPLES[id];
  if(!calculations?.length){host.hidden=true;return;}
  let signature=JSON.stringify(calculations),saved=memory.get(key),selection=saved?.signature===signature?saved.selection:0,index=saved?.signature===signature?saved.index:0,model;
  const select=host.querySelector('[data-written-choice]'),range=host.querySelector('[data-written-range]'),paper=host.querySelector('.written-paper');
  function setup(){
   selection=Math.min(selection,calculations.length-1);model=buildWritten(calculations[selection]);index=Math.min(index,model.steps.length-1);
   select.innerHTML=calculations.map((c,i)=>`<option value="${i}" ${i===selection?'selected':''}>${calculations.length>1?(i+1)+'. ':''}${esc(c.title?c.title+' · ':'')}${esc(calculationLabel(c))}</option>`).join('');
   host.querySelector('.written-selection').hidden=calculations.length===1;
   host.querySelector('.written-context').textContent=model.context;host.querySelector('.written-context').hidden=!model.context;
   range.max=model.steps.length-1;draw();
  }
  function draw(){
   const step=model.steps[index];paper.innerHTML=writtenStepHTML(model,index);
   host.querySelector('.written-stage-heading').textContent=step.heading;
   host.querySelector('.written-explanation').textContent=step.text;
   host.querySelector('.written-position').textContent=`${index+1} / ${model.steps.length}`;
   host.querySelector('[data-written-action=prev]').disabled=index===0;host.querySelector('[data-written-action=next]').disabled=index===model.steps.length-1;
   range.value=index;range.setAttribute('aria-valuetext',`${index+1} von ${model.steps.length}: ${step.heading}`);
   host.dataset.writtenExpression=model.expression;host.dataset.writtenResult=model.result;host.dataset.writtenStep=index;
   memory.set(key,{signature,selection,index});
   // Preserve focus on buttons/range. The table, not its controls, is refreshed.
   if(model.op==='div')paper.scrollTop=paper.scrollHeight;
  }
  const click=e=>{const b=e.target.closest('[data-written-action]');if(!b||!host.contains(b))return;const action=b.dataset.writtenAction;
   index=action==='start'?0:action==='all'?model.steps.length-1:Math.max(0,Math.min(model.steps.length-1,index+(action==='next'?1:-1)));draw();};
  const input=e=>{if(e.target===range){index=Number(range.value);draw();}};
  const change=e=>{if(e.target===select){selection=Number(select.value);index=0;setup();}else input(e);};
  const update=e=>{if(!linked||e.detail?.id!==id)return;const next=e.detail.calculations,newSignature=JSON.stringify(next);if(newSignature===signature)return;
   if(!next?.length){host.hidden=true;return;}host.hidden=false;calculations=next;signature=newSignature;selection=Math.min(selection,next.length-1);index=0;setup();};
  host.addEventListener('click',click);host.addEventListener('input',input);host.addEventListener('change',change);root.addEventListener('written-model-change',update);setup();
  cleanups.push(()=>{host.removeEventListener('click',click);host.removeEventListener('input',input);host.removeEventListener('change',change);root.removeEventListener('written-model-change',update);});
 });return ()=>cleanups.forEach(fn=>fn());
}
export function clearWrittenMemory(){memory.clear();}

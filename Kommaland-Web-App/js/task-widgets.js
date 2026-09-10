/** Touch-first assessment widgets. Dragging always has a tap/keyboard alternative.
 * Pointer events keep the same behavior for a finger, pencil or mouse. */
import {esc,icon} from './ui.js';
import {shuffleIndices} from './practice.js';
let lastPointerActivation=-Infinity;
const keyboardClick=e=>e.detail===0&&!e.pointerType&&(!e.isTrusted||performance.now()-lastPointerActivation>300);
export function widgetHTML(t,answer,solved,seed=1,activeField=0){
 const disabled=solved?'disabled':'';
 if(t.type==='work'){
  const a=Array.isArray(answer)?answer:Array(t.fields.length).fill(''),cols=Math.max(...t.rows.map(r=>r.length));
  const rows=t.rows.map(row=>'<tr>'+row.map((cell,j)=>{const field=cell&&typeof cell==='object'?cell.field:null;const span=j===row.length-1&&row.length<cols?` colspan="${cols-row.length+1}"`:'';
   return `<td${span}>${Number.isInteger(field)?`<button type="button" ${disabled} data-work-field="${field}" class="work-field ${field===activeField?'active':''}" aria-pressed="${field===activeField}" aria-label="${esc(t.fields[field])}: ${esc(a[field]||'noch leer')}">${esc(a[field]||'□')}</button>`:esc(String(cell))}</td>`;}).join('')+'</tr>').join('');
  return `<p class="question">${esc(t.text)}</p><p class="task-instruction">Feld wählen und Zahl eingeben. Prüfe anschließend die ganze Rechnung.</p><div class="work-layout"><div class="work-scroll"><table class="work-calculation" aria-label="Rechnung mit ausfüllbaren Zwischenschritten"><tbody>${rows}</tbody></table></div><div class="work-pad"><div class="work-readout"><small id="workLabel">${esc(t.fields[activeField])}</small><output id="workValue">${esc(a[activeField]||'□')}</output></div><div class="keypad">${['7','8','9','4','5','6','1','2','3',',','0','⌫'].map(k=>`<button ${disabled} data-key="${k}" aria-label="${k==='⌫'?'Letzte Ziffer löschen':k}">${k}</button>`).join('')}</div><button ${disabled} class="secondary-button" id="workNext">Nächstes Feld</button></div></div>`;
 }
 if(t.type==='match'){
  const a=Array.isArray(answer)?answer:Array(t.items.length).fill(null);
  let ids=shuffleIndices(t.categories.length,seed);
  if(t.unique&&ids.length===t.answer.length&&ids.every((v,i)=>v===t.answer[i]))ids=[...ids.slice(1),ids[0]];
  const numeric=!!t.number&&t.items.every(x=>/^\d$/.test(x));
  const allDigits=t.number?.replace(/[,.]/g,'').length===t.items.length;
  const commaIndex=allDigits?t.number.search(/[,.]/):null;
  const slots=t.items.map((item,i)=>`${numeric&&commaIndex===i?'<span class="slot-comma" aria-hidden="true">,</span>':''}<div class="drop-pair"><strong class="drop-value">${esc(item)}</strong><button ${disabled} class="drop-slot ${a[i]!==null?'filled':''}" data-drop-slot="${i}" ${a[i]!==null?`data-drag-token="${a[i]}"`:''} aria-label="Zuordnung zur ${numeric?'Ziffer an Position '+(i+1)+': ':''}${esc(item)}${a[i]!==null?', zugeordnet: '+esc(t.categories[a[i]]):', noch leer'}">${a[i]===null?'<span>Hier ablegen</span>':esc(t.categories[a[i]])}</button></div>`).join('');
  return `<p class="question">${esc(t.text)}</p><p class="task-instruction">Ziehe die gemischten Kärtchen an ihren Platz. Oder: Kärtchen antippen, dann das Ziel antippen. Eine belegte Stelle kannst du wieder ändern.</p><div class="drag-bank" aria-label="Gemischte Bezeichnungen">${ids.map(i=>`<button ${disabled} class="drag-chip" data-drag-token="${i}" aria-pressed="false">${icon('hand')}${esc(t.categories[i])}</button>`).join('')}</div><div class="drop-board ${numeric?'place-drop-board':''}" ${numeric?`aria-label="Zahl ${esc(t.number)}"`:''}>${numeric&&!allDigits?`<span class="place-prefix">${esc(t.number.split(/[,.]/)[0])},</span>`:''}${slots}</div><div id="dragStatus" class="widget-status" aria-live="polite">Alle Bezeichnungen stehen gemischt bereit.</div>`;
 }
 if(t.type==='error')return `<p class="question">${esc(t.text)}</p><p class="task-instruction">Tippe die erste fehlerhafte Zeile an – nicht nur eine spätere Folge des Fehlers.</p><div class="error-lines">${t.steps.map((line,i)=>`<button ${disabled} class="error-line ${answer===i?'selected':''}" data-error="${i}" aria-pressed="${answer===i}"><span>Zeile ${i+1}</span><strong>${esc(line)}</strong>${answer===i?icon('flag'):''}</button>`).join('')}</div>`;
 if(t.type==='mark'){
  const a=Array.isArray(answer)?answer:[],columns=t.parts===100?10:t.parts;
  return `<p class="question">${esc(t.text)}</p><p class="task-instruction">Tippe Felder an oder streiche über sie. Jedes Kästchen ist gleich groß. Der äußere Rahmen ist ein Ganzes.</p><div class="mark-whole"><span>ein Ganzes</span><div class="mark-grid" style="--mark-cols:${columns}" role="group" aria-label="Ein Ganzes aus ${t.parts} gleich großen Teilen">${Array.from({length:t.parts},(_,i)=>`<button ${disabled} data-mark-cell="${i}" class="${a.includes(i)?'marked':''}" aria-pressed="${a.includes(i)}" aria-label="Reihe ${Math.floor(i/columns)+1}, Feld ${i%columns+1}"></button>`).join('')}</div></div><div class="mark-tools"><button ${disabled} id="markLess" class="secondary-button" aria-label="Ein Feld weniger">${icon('minus')}</button><output>${answer===null?'Noch nichts markiert':a.length+' von '+t.parts+' Feldern markiert'}</output><button ${disabled} id="markMore" class="secondary-button" aria-label="Ein Feld mehr">${icon('plus')}</button><button ${disabled} id="markClear" class="secondary-button">Alles frei</button></div>`;
 }
 if(t.type==='argument'){
  const a=Array.isArray(answer)?answer:[],ids=shuffleIndices(t.items.length,seed);
  return `<p class="question">${esc(t.text)}</p><p class="task-instruction">Wähle ${t.answer.length} passende Kärtchen in einer schlüssigen Reihenfolge. Beginne mit der Grundidee, führe sie aus und schließe mit dem Ergebnis. Unpassende Karten bleiben übrig. Oben antippen legt eine Karte zurück.</p><div class="argument-target" aria-label="Deine Begründung">${Array.from({length:t.answer.length},(_,j)=>j<a.length?`<button ${disabled} data-remove="${j}"><span>${j+1}</span>${esc(t.items[a[j]])}${icon('undo')}</button>`:`<div class="argument-empty"><span>${j+1}</span>Passenden Gedanken einsetzen</div>`).join('')}</div><div class="argument-bank">${ids.map(i=>`<button data-order="${i}" ${a.includes(i)||solved||a.length>=t.answer.length?'disabled':''}>${esc(t.items[i])}</button>`).join('')}</div>`;
 }
 return null;
}
export function attachTaskWidgets(root,t,getAnswer,onChange,solved){
 if(solved)return ()=>{};
 const removers=[];let ghost=null,drag=null,selected=null,paint=null;
 const listen=(el,type,fn,opts)=>{el.addEventListener(type,fn,opts);removers.push(()=>el.removeEventListener(type,fn,opts));};
 const clearGhost=()=>{ghost?.remove();ghost=null;root.querySelectorAll('.drop-hover').forEach(x=>x.classList.remove('drop-hover'));};
 if(t.type==='match'){
  const assign=(token,slot)=>{
   const a=[...(getAnswer()||Array(t.items.length).fill(null))];
   if(t.unique)a.forEach((v,i)=>{if(v===token)a[i]=null;});
   a[slot]=token;clearGhost();onChange(a);
  };
  const select=token=>{selected=token;root.querySelectorAll('.drag-chip').forEach(b=>{const yes=+b.dataset.dragToken===token;b.classList.toggle('selected',yes);b.setAttribute('aria-pressed',String(yes));});const status=root.querySelector('#dragStatus');if(status)status.textContent=t.categories[token]+' gewählt. Tippe auf das Ziel.';};
  root.querySelectorAll('[data-drag-token]').forEach(b=>{
   listen(b,'pointerdown',e=>{if(e.button!==0||e.isPrimary===false)return;e.preventDefault();lastPointerActivation=performance.now();drag={id:e.pointerId,token:+b.dataset.dragToken,x:e.clientX,y:e.clientY,moved:false};b.setPointerCapture(e.pointerId);});
   listen(b,'pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;e.preventDefault();if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>6)drag.moved=true;if(!drag.moved)return;
    if(!ghost){ghost=document.createElement('div');ghost.className='drag-ghost';ghost.textContent=t.categories[drag.token];document.body.appendChild(ghost);}
    ghost.style.left=e.clientX+'px';ghost.style.top=(e.clientY-28)+'px';root.querySelectorAll('.drop-hover').forEach(x=>x.classList.remove('drop-hover'));
    const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-drop-slot]');if(target&&root.contains(target))target.classList.add('drop-hover');
   });
   listen(b,'pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-drop-slot]');clearGhost();
    if(d.moved){if(target&&root.contains(target))assign(d.token,+target.dataset.dropSlot);else select(d.token);}
    else if(b.hasAttribute('data-drop-slot')&&selected!==null)assign(selected,+b.dataset.dropSlot);else select(d.token);
   });
   listen(b,'pointercancel',()=>{drag=null;clearGhost();});
   listen(b,'lostpointercapture',()=>{drag=null;clearGhost();});
   listen(b,'click',e=>{if(keyboardClick(e)){if(b.hasAttribute('data-drop-slot')&&selected!==null)assign(selected,+b.dataset.dropSlot);else select(+b.dataset.dragToken);}});
  });
  root.querySelectorAll('[data-drop-slot]').forEach(b=>{
   if(b.hasAttribute('data-drag-token'))return;
   listen(b,'click',()=>{if(selected!==null)assign(selected,+b.dataset.dropSlot);else{const status=root.querySelector('#dragStatus');if(status)status.textContent='Wähle zuerst eine Bezeichnung oben.';}});
  });
 }
 if(t.type==='error')root.querySelectorAll('[data-error]').forEach(b=>listen(b,'click',()=>onChange(+b.dataset.error)));
 if(t.type==='mark'){
  const grid=root.querySelector('.mark-grid');
  const cells=()=>root.querySelectorAll('[data-mark-cell]');
  const draw=()=>{for(const b of cells()){const filled=paint.values.has(+b.dataset.markCell);b.classList.toggle('marked',filled);b.setAttribute('aria-pressed',String(filled));}const o=root.querySelector('.mark-tools output');if(o)o.textContent=paint.values.size+' von '+t.parts+' Feldern markiert';};
  const paintCell=e=>{const b=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-mark-cell]');if(b&&root.contains(b)){const i=+b.dataset.markCell;paint.fill?paint.values.add(i):paint.values.delete(i);draw();}};
  listen(grid,'pointerdown',e=>{const b=e.target.closest('[data-mark-cell]');if(!b||e.button!==0||e.isPrimary===false)return;e.preventDefault();lastPointerActivation=performance.now();const values=new Set(getAnswer()||[]);paint={id:e.pointerId,values,fill:!values.has(+b.dataset.markCell)};grid.setPointerCapture(e.pointerId);paintCell(e);});
  listen(grid,'pointermove',e=>{if(!paint||paint.id!==e.pointerId)return;e.preventDefault();paintCell(e);});
  const finish=()=>{if(!paint)return;const values=[...paint.values].sort((a,b)=>a-b);paint=null;onChange(values);};
  listen(grid,'pointerup',finish);listen(grid,'pointercancel',()=>{if(!paint)return;paint.values=new Set(getAnswer()||[]);draw();paint=null;});
  cells().forEach(b=>listen(b,'click',e=>{if(!keyboardClick(e))return;const set=new Set(getAnswer()||[]),i=+b.dataset.markCell;set.has(i)?set.delete(i):set.add(i);onChange([...set].sort((a,b)=>a-b));}));
  listen(root.querySelector('#markClear'),'click',()=>onChange([]));
  listen(root.querySelector('#markMore'),'click',()=>{const a=[...(getAnswer()||[])];for(let i=0;i<t.parts;i++)if(!a.includes(i)){a.push(i);break;}onChange(a.sort((a,b)=>a-b));});
  listen(root.querySelector('#markLess'),'click',()=>{const a=[...(getAnswer()||[])].sort((a,b)=>a-b);a.pop();onChange(a);});
 }
 return ()=>{clearGhost();paint=null;drag=null;for(const remove of removers)remove();};
}

import test from 'node:test';import assert from 'node:assert/strict';
import {LESSONS} from '../js/lessons.js';import {LABS,FAMILY_LABELS,initialLab,roundTicks,arithmeticStages,portionResult,placeValue} from '../js/visual-models.js';import {labSnapshot,labHTML} from '../js/visuals.js';
test('Alle 83 Wissenskarten haben ein eigenes konfiguriertes, bedienbares Schaubild',()=>{
 assert.deepEqual(Object.keys(LABS).sort(),Object.keys(LESSONS).sort());
 for(const [id,c] of Object.entries(LABS)){
  const m=labSnapshot(id);assert.ok(c.prompt.length>30,id);assert.ok(FAMILY_LABELS[c.type],id);assert.ok(m.art.length>50,id);assert.ok(m.controls.includes('data-lab-'),id);assert.ok(m.out.length>2,id);assert.ok(m.detail.length>10,id);assert.match(labHTML(id),new RegExp(`data-lab="${id}"`));assert.doesNotMatch(JSON.stringify(m),/NaN|undefined|Infinity/);
 }
});
test('Alle Regler-Grenzen und Auswahlwerte ergeben endliche, vollständige Darstellungen',()=>{
 for(const [id,c] of Object.entries(LABS)){
  const first=labSnapshot(id);for(const field of first.controls.matchAll(/<input[^>]+>/g)){
   const get=name=>field[0].match(new RegExp(name+'="([^\"]+)"'))?.[1];const key=get('data-lab-field');
   for(const value of [Number(get('min')),Number(get('max'))]){
    const s=initialLab(c);s[key]=value;const m=labSnapshot(id,s);assert.doesNotMatch(JSON.stringify(m),/NaN|undefined|Infinity/,id+' '+key);assert.ok(m.art&&m.out&&m.controls,id);
   }
  }
  if(c.cases&&c.type==='arithmetic')for(let i=0;i<c.cases.length;i++){
   const s=initialLab(c);s.case=i;for(let step=0;step<8;step++){s.step=step;assert.doesNotMatch(JSON.stringify(labSnapshot(id,s)),/NaN|undefined|Infinity/,id);}
  }
 }
});
test('Bündeln und Entbündeln erhalten in jedem Zwischenschritt den passenden Wert',()=>{
 for(const c of Object.values(LABS).filter(c=>c.type==='arithmetic'))for(const [a,b] of c.cases){
  const m=arithmeticStages(a,b,c.places,c.op);for(let i=0;i<m.stages.length;i++){
   const expected=c.op==='+'?a+b:i<m.stages.length-1?a:a-b;
   assert.equal(placeValue(m.stages[i].counts),expected,c.id+' Schritt '+i);assert.ok(m.stages[i].counts.every(v=>v>=0&&Number.isInteger(v)));
  }
  assert.equal(placeValue(m.stages.at(-1).counts),m.result);assert.ok(m.stages.at(-1).counts.every(v=>v<10));
 }
});
test('Entbündeln über mehrere Nullstellen ist auch außerhalb der Beispiele korrekt',()=>{
 for(let a=0;a<1000;a+=17)for(let b=0;b<=a;b+=23){const m=arithmeticStages(a,b,3,'-');assert.equal(placeValue(m.stages.at(-1).counts),a-b);for(const st of m.stages.slice(0,-1))assert.equal(placeValue(st.counts),a);}
});
test('Kaufmännisches Runden: Nachbarn, exakte Mitte und Übertrag werden ganzzahlig gerechnet',()=>{
 assert.equal(roundTicks(423,10),420);assert.equal(roundTicks(425,10),430);assert.equal(roundTicks(5675,10),5680);assert.equal(roundTicks(497,10),500);
 for(let i=0;i<10000;i++)for(const u of [10,100,1000]){const r=roundTicks(i,u);assert.equal(r%u,0);assert.ok(Math.abs(r-i)<=u/2);if(i%u===u/2)assert.ok(r>i);}
 assert.throws(()=>roundTicks(-1,10));assert.throws(()=>roundTicks(3,0));
});
test('Viertel sind räumlich zusammenhängende 5-mal-5-Quadrate mit exakt 25 Zellen',()=>{
 for(const id of ['fraction-quarter','fraction-threequarters'])for(let n=0;n<=4;n++){
  const s=initialLab(LABS[id]);s.n=n;const m=labSnapshot(id,s);assert.equal((m.art.match(/class="lab-cell filled"/g)||[]).length,n*25);assert.match(m.out,new RegExp(`${n*25}/100`));
 }
});
test('Rechtecksmodell zeigt für alle 400 Seitenkombinationen die korrekte Fläche',()=>{
 for(let a=1;a<=20;a++)for(let b=1;b<=20;b++){
  const s=initialLab(LABS['rectangle-decimal']);s.a=a;s.b=b;const m=labSnapshot('rectangle-decimal',s);
  assert.equal((m.art.match(/class="lab-cell filled"/g)||[]).length,a*b);assert.ok(m.out.endsWith((a*b/100).toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' m²'));
  assert.match(m.art,/0,1 m · 0,1 m/);
 }
});
test('Tausendstel-Lupe: volle Hundertstel plus Rest statt 1000 gleich großer Zehntel',()=>{
 for(const n of [0,1,9,10,237,999,1000]){const s=initialLab(LABS['fraction-thousand']);s.n=n;const m=labSnapshot('fraction-thousand',s);
  assert.equal((m.art.match(/class="lab-cell filled"/g)||[]).length,Math.floor(n/10)+(n===1000?10:n%10));assert.match(m.art,/LUPE: ein Hundertstel/);assert.match(m.out,new RegExp(`${n}/1000`));
 }
});
test('Portionieren zählt nur volle Portionen; der Rest bleibt kleiner als die Portion',()=>{
 for(const c of Object.values(LABS).filter(c=>c.type==='portion'))for(const p of c.choices){const r=portionResult(c.total,p);assert.equal(r.count*p+r.remainder,c.total);assert.ok(r.remainder>=0&&r.remainder<p);}
 assert.throws(()=>portionResult(100,0));assert.throws(()=>portionResult(100,-1));assert.deepEqual(portionResult(350,75),{count:4,remainder:50,total:350,portion:75});
});
test('Verteilen: jede zugelassene Empfängerzahl ist exakt darstellbar und passt in die Becher',()=>{
 for(const c of Object.values(LABS).filter(c=>c.type==='share'))for(const t of c.cases)for(const n of [2,4,...(c.cases.every(v=>v%3===0)?[3]:[])]){
  assert.equal(t%n,0);assert.ok(t/n<=500);const s=initialLab(c);s.total=t;s.n=n;const m=labSnapshot(c.id,s);assert.match(m.out,/l je Person/);assert.ok(m.detail.includes('5 l'));
 }
});
test('Zeitmodell hält Stunden und Minuten auseinander',()=>{
 for(let w=0;w<=3;w++)for(const n of [0,15,30,45,60]){const s=initialLab(LABS['time-quarter']);s.whole=w;s.n=n;const m=labSnapshot('time-quarter',s);assert.ok(m.out.endsWith(`= ${w*60+n} min`));}
});
test('Potenzen verschieben Stellen, nicht das Komma; alle vier Lernfälle bleiben korrekt',()=>{
 const cases=[['times-ten',1,'0,048 · 10 = 0,48'],['times-hundred',2,'0,32 · 100 = 32'],['divide-ten',1,'3,7 : 10 = 0,37'],['divide-hundred',2,'4,5 : 100 = 0,045']];
 for(const [id,step,equation] of cases){const s=initialLab(LABS[id]);s.step=step;const m=labSnapshot(id,s);assert.equal(m.out,equation);assert.equal((m.art.match(/lab-fixed-comma/g)||[]).length,2);}
});
test('Szenarien zeigen keine negativen Fehlbeträge oder halbe fertige Gegenstände',()=>{
 const c=LABS['need-minus-stock'];const s=initialLab(c);s.n=1;assert.match(labSnapshot(c.id,s).detail,/bleiben übrig/);
 const p=initialLab(LABS['plan-leftover']);p.stock=400;assert.match(labSnapshot('plan-leftover',p).detail,/Es fehlen/);p.stock=1000;assert.match(labSnapshot('plan-leftover',p).detail,/7 volle Schleifen/);
});
test('Fachlich korrigierte Darstellungen tragen vollständige Einheiten und passende Anzahlen',()=>{
 assert.equal(LESSONS['rectangle-decimal'].visual.lines[0],'1,4 m · 1,3 m = 1,82 m²');assert.match(LESSONS['product-then-double'].visual.lines[1],/zwei Geräte/);assert.match(LESSONS['divide-scale'].text,/von null verschiedenen/);assert.match(LESSONS['round-digit'].text,/neuer Einer/);
});
test('Brüche zeigen Zähler und Nenner getrennt; wechselnde Nenner behalten gleich große Teile',()=>{
 for(const parts of [2,4,5,10])for(let n=0;n<=parts;n++){
  const s=initialLab(LABS['fraction-meaning']);s.parts=parts;s.n=n;const m=labSnapshot('fraction-meaning',s);
  assert.equal((m.art.match(/class="lab-cell(?: filled)?"/g)||[]).length,parts);
  assert.equal((m.art.match(/class="lab-cell filled"/g)||[]).length,n);
  assert.ok(m.art.includes(`<b>${n}</b><b>${parts}</b>`));assert.equal(m.out,`${n} von ${parts} gleichen Teilen`);
 }
});
test('Sachmodell-Notation vermischt keine dimensionslose Gleichung mit einer Flächeneinheit',()=>{
 assert.equal(LESSONS.rectangle.example.steps[2],'1,6 m · 0,5 m = 0,8 m².');
 assert.match(LESSONS['product-then-double'].example.prompt,/Zwei gleiche Pumpen/);
 assert.match(LESSONS['product-then-double'].example.steps[2],/2,4 l/);
 assert.equal(labSnapshot('plan-leftover').out,'Bedarf: 4 · 1,25 m + 0,8 m = 5,8 m');
 const s=initialLab(LABS['portion-hundred']);s.portion=75;assert.equal(labSnapshot('portion-hundred',s).out,'4 volle Portionen und 0,5 l Rest');
});
test('Gleichwertige Unterteilungen erhalten die gefärbte Fläche exakt',()=>{
 for(let n=0;n<=10;n++){
  const s=initialLab(LABS['equal-zeros']);s.n=n;const coarse=labSnapshot('equal-zeros',s);s.fine=true;const fine=labSnapshot('equal-zeros',s);
  assert.equal(coarse.out,fine.out);assert.equal(coarse.art.match(/<rect[^>]+class="lab-fill"[^>]*\/>/)[0],fine.art.match(/<rect[^>]+class="lab-fill"[^>]*\/>/)[0]);
  assert.equal((fine.art.match(/class="lab-fine"/g)||[]).length,9);
 }
});

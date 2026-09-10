import {linkedCalculations} from './written-link.js';
/** Original interactive, vector-based teaching models. All content is local/offline. */
import {esc} from './ui.js';
import {LABS,FAMILY_LABELS,initialLab,fmt,fixed,clamp,roundTicks,arithmeticStages,portionResult,placeValue} from './visual-models.js';
const memory=new Map();
const txt=(x,y,t,cls='',anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}">${esc(t)}</text>`;
const rect=(x,y,w,h,cls='',extra='')=>`<rect x="${x}" y="${y}" width="${Math.max(0,w)}" height="${Math.max(0,h)}" class="${cls}" ${extra}/>`;
const line=(x,y,x2,y2,cls='')=>`<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
const svg=(body,h=190,attrs='')=>`<svg viewBox="0 0 560 ${h}" class="lab-svg" ${attrs}>${body}</svg>`;
const image=(body,label,h=190)=>{if(typeof label==='number'){h=label;label='Mengenmodell mit beschrifteten Teilmengen und gemeinsamer Skala.';}return svg(body,h,`role="img" aria-label="${esc(label)}"`);};
const bracket=(x,y,w,label)=>`<path d="M${x} ${y}v7h${w}v-7" class="lab-bracket"/>${txt(x+w/2,y+26,label,'lab-tiny')}`;
const button=(label,action,value='',active=false)=>`<button type="button" class="lab-button${active?' active':''}" data-lab-action="${action}" data-value="${esc(value)}" ${active?'aria-pressed="true"':''}>${esc(label)}</button>`;
const actions=html=>`<div class="lab-actions">${html}</div>`;
const note=t=>`<p class="lab-note">${esc(t)}</p>`;
const output=(equation,explanation='')=>`<div class="lab-result" role="status" aria-live="polite" aria-atomic="true"><strong>${esc(equation)}</strong>${explanation?`<span>${esc(explanation)}</span>`:''}</div>`;
function control(key,label,value,min,max,step=1,den=1,unit=''){
 return `<label class="lab-control"><span>${esc(label)} <b data-readout="${key}">${esc(fmt(value/den))}${unit?' '+esc(unit):''}</b></span><span class="lab-range-row"><button type="button" data-lab-action="decrease" data-value="${key}" aria-label="${esc(label)} verringern">−</button><input type="range" aria-label="${esc(label)}" data-lab-field="${key}" data-den="${den}" data-unit="${esc(unit)}" min="${min}" max="${max}" step="${step}" value="${value}" aria-valuetext="${esc(fmt(value/den)+' '+unit)}"><button type="button" data-lab-action="increase" data-value="${key}" aria-label="${esc(label)} erhöhen">+</button></span></label>`;
}
const choice=(key,label,value,options)=>`<label class="lab-choice">${esc(label)}<select data-lab-field="${key}" aria-label="${esc(label)}">${options.map(o=>{const val=Array.isArray(o)?o[0]:o,text=Array.isArray(o)?o[1]:o;return `<option value="${val}" ${Number(value)===Number(val)?'selected':''}>${esc(text)}</option>`;}).join('')}</select></label>`;
function bar(segments,total,{y=55,x=40,width=480,height=44,labels=true}={}){
 let pos=x,body=rect(x,y,width,height,'lab-empty');
 for(let i=0;i<segments.length;i++){
  const s=segments[i],w=width*s.value/total;body+=rect(pos,y,w,height,s.cls??['lab-fill','lab-gold','lab-pale'][i%3]);
  if(labels&&w>45&&s.label)body+=txt(pos+w/2,y+height/2+5,s.label,'lab-bar-label');pos+=w;
 }return body;
}
function axis({min,max,n,den=1,step=1,other=null,mid=false,round=false,bound=null,labels=10}){
 const x=v=>40+480*(v-min)/(max-min),y=87;let body='';
 if(round){body+=rect(40,57,240,59,'lab-soft')+rect(280,57,240,59,'lab-soft-gold')+line(280,43,280,126,'lab-dashed');}
 body+=line(36,y,525,y,'lab-axis');
 const divisions=Math.round((max-min)/step),stride=Math.max(1,Math.ceil(divisions/labels));
 for(let i=0;i<=divisions;i++){const val=min+i*step,xx=x(val);body+=line(xx,y-7,xx,y+7,'lab-tick');if(i%stride===0||i===divisions)body+=txt(xx,124,fmt(val/den),'lab-axis-label');}
 if(bound!==null)body+=line(x(bound),33,x(bound),104,'lab-dashed')+txt(x(bound),25,'Grenze','lab-tiny');
 if(mid){body+=line(40,150,x(n),150,'lab-distance')+line(x(n),174,520,174,'lab-distance gold');body+=txt((40+x(n))/2,145,fmt((n-min)/den),'lab-tiny')+txt((520+x(n))/2,169,fmt((max-n)/den),'lab-tiny');}
 if(other!==null){body+=`<circle cx="${x(other)}" cy="${y}" r="10" class="lab-marker gold"/>`+txt(x(other),156,'B: '+fmt(other/den),'lab-axis-label');}
 body+=`<circle cx="${x(n)}" cy="${y}" r="11" class="lab-marker"/>`+txt(clamp(x(n),76,484),45,(other!==null?'A: ':'')+fmt(n/den),'lab-number');
 const h=mid?192:other!==null?175:round?156:153;
 return svg(body,h,`data-surface="line" data-min="${min}" data-max="${max}" data-step="${step}" role="img" aria-label="Zahlengerade von ${fmt(min/den)} bis ${fmt(max/den)}. Marker bei ${fmt(n/den)}. Auch mit dem Regler bedienbar."`);
}
function hundredCells(n,{quarters=false,scale=18,x=190,y=18,den=100,mask=null}={}){
 let body='';for(let row=0;row<10;row++)for(let col=0;col<10;col++){
  const i=row*10+col,q=(row<5?0:2)+(col<5?0:1),filled=mask?mask[i]:quarters?q<n:i<n;
  body+=rect(x+col*scale,y+row*scale,scale,scale,filled?'lab-cell filled':'lab-cell',`data-cell="${i}"`);
 }
 body+=rect(x,y,10*scale,10*scale,'lab-outline');
 if(quarters)body+=line(x+5*scale,y,x+5*scale,y+10*scale,'lab-quarterline')+line(x,y+5*scale,x+10*scale,y+5*scale,'lab-quarterline');
 return body;
}
function gridSurface(n,{quarters=false,mask=null,caption='ein Ganzes = 100 gleich große Kästchen',mode='grid'}={}){
 const body=hundredCells(n,{quarters,mask})+bracket(190,204,180,caption);
 return svg(body,247,`data-surface="${mode}" role="img" aria-label="${quarters?n*25:n} von 100 Kästchen gefärbt. Auch mit den großen Tasten bedienbar."`);
}
function blocks3D(n,unit='dm³'){
 let body='';for(let i=0;i<n;i++){
  const x=42+(i%5)*101,y=45+Math.floor(i/5)*91;
  body+=`<path d="M${x} ${y}l22-14 52 0-22 14Z" class="lab-cube-top"/><path d="M${x+52} ${y}l22-14v47l-22 14Z" class="lab-cube-side"/>`+rect(x,y,52,47,'lab-cube-front')+txt(x+26,y+29,'1 '+unit,'lab-tiny');
 }return body;
}
function model(c,s){
 let art='',out='',detail='',controls='',n=s.n;
 switch(c.type){
 case 'periodic':{
  const divisor=s.divisor||3,count=s.steps||4;let remainder=1,digits='',rows='',seen=new Map(),repeatAt=null;
  for(let i=0;i<count&&remainder!==0;i++){
   if(seen.has(remainder)&&repeatAt===null)repeatAt=seen.get(remainder);seen.set(remainder,i);
   const carried=remainder*10,digit=Math.floor(carried/divisor),next=carried%divisor;
   rows+=`<tr><td>${i+1}</td><td>${carried} : ${divisor}</td><td>${digit}</td><td>${next}</td></tr>`;digits+=digit;remainder=next;
  }
  art=`<table class="work-calculation"><thead><tr><th>Stelle</th><th>Herunterholen</th><th>Ziffer</th><th>Rest</th></tr></thead><tbody>${rows}</tbody></table>`;
  out=`1 : ${divisor} = 0,${digits}${remainder?'…':''}`;detail=remainder===0?'Rest 0: Diese Dezimaldarstellung endet.':repeatAt!==null?'Ein Rest wiederholt sich. Von dort an wiederholen sich auch die Ziffern. Die Auslassungspunkte bedeuten: Es geht unbegrenzt weiter.':'Noch ein Rest: Du kannst weitere Stellen berechnen.';
  controls=choice('divisor','Teiler',divisor,[3,4,6,8])+control('steps','Stellen untersuchen',count,1,8);break;
 }
 case 'halves':{
  n=clamp(n,0,2);const fraction=n/2;let b='';for(let i=0;i<3;i++){
   const x=86+i*148,fill=i<2?1:fraction;
   b+=rect(x,25,89,104,'lab-vessel')+rect(x+3,28+98*(1-fill),83,98*fill,'lab-water')+line(x,77,x+89,77,'lab-dashed')+txt(x+44,153,i<2?'1 Ganzes':n===0?'leer':n===1?'ein halb':'1 Ganzes','lab-axis-label');
  }
  art=image(b,'Zwei ganze Kannen und eine veränderbare Kanne mit gleicher Grundfläche.',174);
  out=c.decimal?`${fmt(2+fraction)} = ${n===1?'2 Ganze und ein Halb':n===2?'3 Ganze':'2 Ganze'}`:n===1?'Zwei Ganze und ein Halbes':n===0?'Zwei Ganze':'Drei Ganze';
  detail=n===1?'Genau zwischen zwei und drei ganzen Kannen.':'Die halbe Füllung liegt genau in der Mitte.';
  controls=actions(button('leer','set-n',0,n===0)+button('halb','set-n',1,n===1)+button('voll','set-n',2,n===2));break;
 }
 case 'strip':{
  const p=s.parts||c.parts;let b='';for(let i=0;i<p;i++)b+=rect(40+i*480/p,42,480/p,64,i<n?'lab-cell filled':'lab-cell')+txt(40+(i+.5)*480/p,83,String(i+1),'lab-tiny');
  b+=line(280,31,280,118,'lab-dashed')+bracket(40,119,480,'ein Ganzes'+(c.id==='tenths'?' = 1 m':''));
  art=svg(b,170,`data-surface="strip" role="img" aria-label="${n} von ${p} gleichen Teilen sind gefärbt."`);
  if(c.fraction)art+=`<div class="lab-fraction-readout"><span class="lab-written-fraction" aria-label="${n} geteilt durch ${p}"><b>${n}</b><b>${p}</b></span><span>oben: ${n} Teile zählen<br>unten: in ${p} gleiche Teile teilen</span></div>`;
  const word=p===2?'Hälften':'Zehntel';out=c.wordsOnly?`${n} von ${p} gleichen Teilen`:`${n} ${word} = ${fmt(n/p)}`;
  if(c.fraction&&!c.wordsOnly)out=`${n}/${p} = ${fmt(n/p)}`;
  detail=c.id==='half-tenths'?`${c.whole} Ganze und ${n} Zehntel = ${fmt(c.whole+n/10)}. Der Streifen zeigt nur den Anteil nach den zwei Ganzen. ${n===5?'Fünf Zehntel sind genau die Hälfte.':'Die gestrichelte Linie markiert die Hälfte.'}`:c.fraction?`Unten steht ${p}: so viele Teile bilden das Ganze. Oben steht ${n}: so viele sind markiert.`:'Die Teile sind gleich groß; die äußere Klammer umfasst immer das ganze Band.';
  controls=control('n','Gefärbte Teile',n,0,p)+(c.id==='fraction-meaning'?choice('parts','Ganze Teilanzahl',p,[2,4,5,10]):'');break;
 }
 case 'grid':{
  if(s.paint)n=s.paint.filter(Boolean).length;
  art=gridSurface(n,{mask:s.paint});out=c.fraction?`${n}/100 = ${fixed(n/100,2)}`:c.intro?`${n} Hundertstel`:`${n} Hundertstel = ${fixed(n/100,2)}`;
  detail=n===100?'100 Hundertstel bilden genau ein Ganzes.':`${Math.floor(n/10)} volle Zehntel und ${n%10} Hundertstel. Das ganze Feld bleibt gleich groß.`;
  controls=control('n','Hundertstel',n,0,100)+actions(button('− 10','grid-step',-10)+button('+ 10','grid-step',10)+button('Ordnen','grid-organize'))+note('Kästchen antippen oder darüberstreichen. „Ordnen“ legt denselben Anteil lückenlos an den Anfang.');break;
 }
 case 'quarters':{
  art=gridSurface(n,{quarters:true,mode:'quarters'});out=`${n}/4 = ${n*25}/100 = ${fixed(n/4,2)}`;
  detail=`${n} ${n===1?'Viertel':'Viertel'} mit je 25 Kästchen: ${Array(n).fill('25').join(' + ')||'0'} = ${n*25}.`;
  controls=control('n','Viertel',n,0,4)+note('Die vier 5-mal-5-Blöcke sind gleich groß. Jeder Block ist ein Viertel desselben Ganzen.');break;
 }
 case 'equivalence':{
  let b=rect(40,28,480,100,'lab-empty')+rect(40,28,480*n/10,100,'lab-fill');
  for(let i=0;i<=10;i++)b+=line(40+i*48,28,40+i*48,128,'lab-tick');
  if(s.fine)for(let i=1;i<10;i++)b+=line(40,28+i*10,520,28+i*10,'lab-fine');
  b+=bracket(40,139,480,'dasselbe Ganze – dieselbe gefärbte Fläche');art=image(b,'Gleiche Fläche mit einer feineren oder gröberen Einteilung.',180);
  out=`${fmt(n/10,1)} = ${fixed(n/10,2)}`;detail=`${n} Zehntel = ${n*10} Hundertstel. Es wird nur anders eingeteilt, nicht mehr oder weniger.`;
  controls=control('n','Zehntel',n,0,10)+actions(button(s.fine?'Wieder Zehntel zeigen':'In Hundertstel unterteilen','toggle-fine'));break;
 }
 case 'place':{
  const whole=c.wholeDigits||1,names=whole===2?['Zehner','Einer','Zehntel','Hundertstel','Tausendstel']:['Einer','Zehntel','Hundertstel','Tausendstel'],d=s.digits,places=d.length-whole,den=10**places,value=i=>10**(whole-1-i);n=placeValue(d);
  art=`<div class="lab-place">${d.map((digit,i)=>`${i===whole?'<span class="lab-comma">,</span>':''}<button type="button" class="lab-place-cell ${s.selected===i?'active':''}" data-lab-action="select-digit" data-value="${i}" aria-label="${names[i]}: ${digit}" aria-pressed="${s.selected===i}"><small>${names[i]}</small><b>${digit}</b><span>${fmt(digit*value(i))}</span></button>`).join('')}</div>`;
  const selected=s.selected;out=`${fixed(n/den,places)} = ${d.map((v,i)=>`${v} ${names[i]}`).join(' + ')}`;
  detail=`Die ausgewählte ${d[selected]} an der ${names[selected]}stelle ist ${fmt(d[selected]*value(selected))} wert. Eine 0 hält einen unbesetzten Platz frei.`;
  let b='';for(let i=0;i<10;i++)b+=rect(40+i*48,24,48,35,i<d[selected]?'lab-cell filled':'lab-cell');
  // This material represents tenths of a ten-unit group, not tenths of one in every column.
  b+=bracket(40,70,480,`zehn ${names[selected]} = ${fmt(10*value(selected))}`);art+=image(b,'Zehn gleich große Teile des gewählten Stellenwerts.',112);
  controls=actions(button('Ziffer − 1','digit-change',-1)+button('Ziffer + 1','digit-change',1));break;
 }
 case 'zoom':{
  const full=Math.floor(n/10),rest=n%10,index=Math.min(full,99),xx=32+(index%10)*14,yy=20+Math.floor(index/10)*14;
  let b=hundredCells(full,{x:32,y:20,scale:14});
  b+=rect(xx,yy,14*(n===1000?1:rest/10),14,'lab-fill')+rect(xx,yy,14,14,'lab-focus')+line(xx+14,yy+7,270,70,'lab-dashed')+line(xx+14,yy+14,270,126,'lab-dashed');
  const focusFilled=n===1000?10:rest;
  for(let i=0;i<10;i++)b+=rect(270+i*24,63,24,63,i<focusFilled?'lab-cell filled':'lab-cell');
  b+=txt(390,39,'LUPE: ein Hundertstel','lab-tiny')+bracket(270,139,240,'10 Tausendstel = 1 Hundertstel')+txt(102,188,'100 Hundertstel = 1 Ganzes','lab-tiny');
  art=image(b,'Ein Hundertfeld und ein ausdrücklich vergrößerter einzelner Hundertstelteil mit zehn Tausendsteln.',208);
  out=`${n} Tausendstel = ${fixed(n/1000,3)}${c.id==='fraction-thousand'?` = ${n}/1000`:''}`;
  detail=n===1000?'1000 Tausendstel sind ein Ganzes. Die Lupe zeigt das letzte, vollständig gefüllte Hundertstel.':`${full} vollständige Hundertstel und ${rest} weitere Tausendstel. Der rechte Streifen ist vergrößert, kein zusätzliches Ganzes.`;
  controls=control('n','Tausendstel',n,0,c.intro?10:1000)+note(c.intro?'Hier untersuchst du nur das erste Hundertstel des Ganzen.':'Der Regler setzt ganze Tausendstel; + und − verändern jeweils genau eines.');break;
 }
 case 'line':
  art=axis({...c,n,mid:c.mid});out=c.mid?`${fmt((n-c.min)/c.den)} Abstand links · ${fmt((c.max-n)/c.den)} Abstand rechts`:`Marker: ${fmt(n/c.den)}`;
  detail=c.mid?(n*2===c.min+c.max?'Beide Abstände sind gleich: Das ist die Mitte.':'Verschiebe den Marker, bis beide Abstände gleich sind.'):`Ein Schritt beträgt ${fmt(c.step/c.den)}. Zwischen ${fmt(c.min/c.den)} und ${fmt(c.max/c.den)} liegen ${(c.max-c.min)/c.step} Schritte.`;
  controls=control('n','Marker',n,c.min,c.max,c.step,c.den);break;
 case 'round':{
  const r=roundTicks(n,c.unit),place=c.den===1000?'Hundertstel':'Zehntel';art=axis({...c,n,step:1,round:true});
  out=`${fmt(n/c.den)} ≈ ${fixed(r/c.den,c.den===1000?2:1)} (auf ${place})`;
  detail=n*2===c.min+c.max?'Gleicher Abstand zu beiden Nachbarn. Für positive Zahlen gilt hier: Die Mitte wird aufgerundet.':`${fmt((n-c.min)/c.den)} zum linken, ${fmt((c.max-n)/c.den)} zum rechten Nachbarn. Die Ausgangszahl bleibt unverändert.`;
  controls=control('n','Ausgangszahl',n,c.min,c.max,1,c.den);break;
 }
 case 'compare':{
  art=axis({min:c.min,max:c.max,n:s.a,other:s.b,den:c.den,step:c.den===100?10:1});
  const sign=s.a===s.b?'=':s.a<s.b?'<':'>';out=`${fmt(s.a/c.den)} ${sign} ${fmt(s.b/c.den)}`;
  detail=c.den===100?`${fixed(s.a/100)} und ${fixed(s.b/100)}: Vergleiche dieselben Stellen. Beide Marker nutzen dieselbe Skala.`:'Weiter rechts bedeutet größer. Gleiche Lage bedeutet gleicher Wert.';
  controls=control('a','Zahl A',s.a,c.min,c.max,c.step,c.den)+control('b','Zahl B',s.b,c.min,c.max,c.step,c.den);break;
 }
 case 'order':{
  art=`<div class="lab-order">${s.order.map((v,i)=>`<button type="button" class="lab-number-card ${i===s.selected?'active':''}" data-lab-action="select-order" data-value="${i}" aria-pressed="${i===s.selected}">${fixed(v/1000,3)}</button>`).join('')}</div>`;
  const sorted=s.order.every((v,i)=>!i||s.order[i-1]<=v);
  let b='';const values=[...s.order].sort((a,b)=>a-b),min=2000,max=2400;
  b+=line(40,54,520,54,'lab-axis');for(let i=0;i<=4;i++)b+=line(40+i*120,48,40+i*120,60,'lab-tick')+txt(40+i*120,88,fmt((2000+i*100)/1000),'lab-tiny');
  values.forEach((v,i)=>{const x=40+480*(v-min)/(max-min);b+=`<circle cx="${x}" cy="54" r="7" class="lab-marker"/>`+txt(x,i%2?128:24,fmt(v/1000),'lab-axis-label');if(i%2)b+=line(x,64,x,109,'lab-dashed');});
  art+=image(b,'Alle drei Zahlen auf einer gemeinsamen Zahlengeraden.',149);
  out=sorted?s.order.map(v=>fmt(v/1000)).join(' < '):'Noch nicht von klein nach groß.';
  detail=sorted?'Die erste unterschiedliche Stelle von links entscheidet.':'Die Karte mit dem kleineren Wert muss links stehen. 2,3 = 2,300.';
  controls=actions(button('← Karte nach links','move-order',-1)+button('Karte nach rechts →','move-order',1));break;
 }
 case 'limit':{
  art=axis({...c,n,step:1,bound:c.bound});const rule=s.comparison===0,ok=rule?n<=c.bound:n>c.bound;
  out=`${fmt(n/1000)} ${rule?'≤': '>'} ${fmt(c.bound/1000)}: ${ok?'passt':'passt nicht'}`;
  detail=rule?'„Höchstens“ erlaubt die Grenze selbst. Schon ein Tausendstel darüber ist zu viel.':'„Mehr als“ schließt die Grenze selbst aus. Du musst wirklich darüber liegen.';
  controls=actions(button('Höchstens 1,8','comparison',0,rule)+button('Mehr als 1,8','comparison',1,!rule))+control('n','Prüfwert',n,c.min,c.max,1,1000);break;
 }
 case 'estimate':{
  const a=roundTicks(s.a,10),b=roundTicks(s.b,10),total=s.a+s.b,estimated=a+b;
  art=image(bar([{value:s.a,label:fmt(s.a/10)},{value:s.b,label:fmt(s.b/10)}],100,{y:25})+bar([{value:a,label:fmt(a/10)},{value:b,label:fmt(b/10)}],100,{y:108})+txt(40,18,'genau','lab-tiny','start')+txt(40,101,'Überschlag','lab-tiny','start')+bracket(40,160,480,'gleiche Skala: ganze Breite = 10'),204);
  out=`Genau: ${fmt(s.a/10)} + ${fmt(s.b/10)} = ${fmt(total/10)}`;detail=`Überschlag: ${fmt(a/10)} + ${fmt(b/10)} = ${fmt(estimated/10)}. Abweichung: ${fmt(Math.abs(total-estimated)/10)}. Kein Ersatz für die genaue Rechnung.`;
  controls=control('a','Erste Menge',s.a,0,50,1,10)+control('b','Zweite Menge',s.b,0,50,1,10);break;
 }
 case 'units':{
  const ratio=n/c.max,value=n/c.factor;
  if(c.shape==='volume'){
   let b=rect(161,25,238,150,'lab-vessel')+rect(164,28+144*(1-ratio),232,144*ratio,'lab-water');
   for(let i=0;i<=4;i++){const y=172-i*36;b+=line(151,y,166,y,'lab-tick')+txt(137,y+5,fmt(i*.5)+' l','lab-tiny','end')+txt(413,y+5,`${i*500} ml`,'lab-tiny','start');}
   art=image(b,'Geradwandiger Messbehälter mit zwei Skalen für dieselbe Flüssigkeitsmenge.',202);
  }else if(c.shape==='mass'){
   let b=line(110,110,450,110,'lab-axis')+`<path d="M280 114l-27 62h54Z" class="lab-pale"/>`;
   b+=rect(60,32,150,65,'lab-fill')+rect(350,32,150,65,'lab-gold')+txt(135,70,fmt(value)+' kg','lab-number')+txt(425,70,n+' g','lab-number')+line(135,97,135,110,'lab-tick')+line(425,97,425,110,'lab-tick');
   art=image(b,'Gleichgewicht: beide Seiten bezeichnen dieselbe Masse in verschiedenen Einheiten.',188);
  }else if(c.shape==='money'){
   let b='';const euros=Math.floor(n/100),cents=n%100;for(let i=0;i<euros;i++)b+=`<circle cx="${68+i*92}" cy="68" r="32" class="lab-coin"/>`+txt(68+i*92,74,'1 €','lab-number');
   b+=bar([{value:cents,label:cents+' ct'}],100,{y:128,height:28});b+=bracket(40,164,480,'unterer Streifen: 100 ct = 1 €');art=image(b,'Ganze Euro und der übrige Centanteil als Hundertstel-Euro-Streifen.',211);
  }else{
   let b=bar([{value:n,label:`${fmt(value)} ${c.unit}`}],c.max,{y:53,height:35});
   for(let i=0;i<=10;i++){const x=40+i*48;b+=line(x,94,x,102,'lab-tick')+txt(x,127,fmt(c.max*i/10/c.factor),'lab-tiny');if(i%2===0)b+=txt(x,153,String(c.max*i/10),'lab-tiny');}
   b+=txt(531,127,c.unit,'lab-tiny','start')+txt(531,153,c.small,'lab-tiny','start');art=image(b,'Doppelskala: beide Beschriftungen gehören zu derselben Länge.',175);
  }
  out=`${fmt(value)} ${c.unit} = ${n} ${c.small}`;detail=`1 ${c.unit} = ${c.factor} ${c.small}. Die ${c.shape==='length'?'Länge':c.shape==='mass'?'Masse':'Menge'} bleibt gleich; nur die Einheit wechselt.`;
  controls=control('n',`Menge in ${c.small}`,n,0,c.max,c.factor===1000?10:1,1,c.small);break;
 }
 case 'time':{
  const angle=n/60*2*Math.PI,endX=175+76*Math.sin(angle),endY=99-76*Math.cos(angle);
  let b=`<circle cx="175" cy="99" r="77" class="lab-empty"/>`;
  if(n===60)b+=`<circle cx="175" cy="99" r="76" class="lab-fill"/>`;else if(n>0)b+=`<path d="M175 99L175 23A76 76 0 ${n>30?1:0} 1 ${endX} ${endY}Z" class="lab-fill"/>`;
  for(let i=0;i<12;i++){const a=i*Math.PI/6;b+=line(175+68*Math.sin(a),99-68*Math.cos(a),175+77*Math.sin(a),99-77*Math.cos(a),'lab-tick');}
  b+=txt(175,15,'0 / 60 min','lab-tiny')+txt(269,104,'15','lab-tiny')+txt(175,194,'30','lab-tiny')+txt(82,104,'45','lab-tiny')+txt(403,86,`${s.whole} ganze Stunden`,'lab-axis-label')+txt(403,122,`+ ${n} Minuten`,'lab-number');
  art=image(b,'Dauer: ein voller Kreis steht für 60 Minuten, nicht für eine Uhrzeit.',212);
  out=`${fmt(s.whole+n/60,2)} h = ${s.whole*60+n} min`;
  detail=`${s.whole*60} min + ${n} min. Der Kreis zeigt nur den Minutenanteil; ein ganzer Kreis ist eine weitere Stunde.`;
  controls=control('whole','Ganze Stunden',s.whole,0,3)+control('n','Minutenanteil',n,0,60,15,1,'min');break;
 }
 case 'square':{
  let b=hundredCells(n*10,{x:184,y:22,scale:18})+bracket(184,215,180,'10 dm = 1 m');
  b+=txt(159,115,'1 m','lab-tiny','end')+txt(400,90,'jede Zelle:','lab-tiny','start')+txt(400,115,'1 dm · 1 dm','lab-tiny','start')+txt(400,140,'= 1 dm²','lab-tiny','start');
  art=image(b,'Quadrat mit zwei Längen von je einem Meter und 100 Quadratdezimetern.',258);out=`${fmt(n/10)} m² = ${n*10} dm²`;
  detail=`${n} Reihen · 10 Kästchen = ${n*10} dm². Das ganze Quadrat: 10 dm · 10 dm = 100 dm².`;
  controls=control('n','Gefärbte Reihen',n,0,10);break;
 }
 case 'cube':{
  let b='';for(let i=0;i<10;i++){
   const y=173-i*13,cls=i<n?'lab-layer-fill':'lab-layer-empty';
   b+=`<path d="M57 ${y}l70-30 135 0-70 30Z" class="${cls}"/>`;
   for(let j=1;j<10;j++)b+=line(57+j*13.5,y,127+j*13.5,y-30,'lab-fine')+line(57+j*7,y-j*3,192+j*7,y-j*3,'lab-fine');
  }
  b+=txt(159,208,'10 mögliche Schichten','lab-tiny')+hundredCells(100,{x:342,y:28,scale:14})+txt(412,191,'Draufsicht: 100 Würfel','lab-tiny');
  art=image(b,'Zehn gleich dicke Schichten eines Einheitswürfels; daneben die 10 mal 10 Würfel einer Schicht in Draufsicht.',225);out=`${n} · 100 dm³ = ${n*100} dm³ = ${fmt(n/10)} m³`;
  detail='Jeder kleine Würfel hat 1 dm Kantenlänge. Jede Schicht ist 1 dm hoch und enthält 100 dm³. Die Schichten sind zur Ansicht auseinandergezogen.';
  controls=control('n','Schichten',n,0,10);break;
 }
 case 'litrecubes':
  art=image(blocks3D(n),'Gleich große Würfel: jeder hat 1 dm Länge, Breite und Höhe.',n>5?242:160);out=`${n} dm³ = ${n} l`;
  detail='Ein Würfel: 1 dm · 1 dm · 1 dm = 1 dm³ = 1 l. Anzahl und Gesamtrauminhalt sind verschiedene Angaben.';controls=control('n','Einheitswürfel',n,0,10);break;
 case 'arithmetic':{
  const [a,b]=c.cases[s.case],m=arithmeticStages(a,b,c.places,c.op),idx=clamp(s.step,0,m.stages.length-1),stage=m.stages[idx];
  art=`<div class="lab-calculation">${fixed(a/10**c.places,c.places)} ${c.op==='+'?'+':'−'} ${fixed(b/10**c.places,c.places)}</div><div class="lab-bundle" style="--columns:${m.names.length}">${m.names.map((name,i)=>`<div class="lab-bundle-column ${stage.from===i||stage.to===i?'changed':''}"><b>${name}</b><div class="lab-counters">${Array.from({length:stage.counts[i]},()=>'<i></i>').join('')}</div><strong>${stage.counts[i]}</strong>${c.op==='-'&&idx<m.stages.length-1?`<span>weg: ${m.b[i]}</span>`:''}</div>`).join('')}</div>`;
  out=idx===m.stages.length-1?`${fixed(a/10**c.places,c.places)} ${c.op==='+'?'+':'−'} ${fixed(b/10**c.places,c.places)} = ${fixed(m.result/10**c.places,c.places)}`:stage.counts.map((v,i)=>`${v} ${m.names[i]}`).join(' + ');
  detail=stage.text;
  controls=actions(button('← Schritt zurück','stage-back')+button(idx<m.stages.length-1?(c.op==='-'&&idx===m.stages.length-2?'Jetzt wegnehmen':'Nächster Tausch →'):'Noch einmal','stage-next',m.stages.length))+choice('case','Andere Zahlen',s.case,c.cases.map(([x,y],i)=>[i,`${fixed(x/10**c.places,c.places)} ${c.op==='+'?'+':'−'} ${fixed(y/10**c.places,c.places)}`]))+note('Die gleich großen Plättchen sind Zählzeichen: Ihr Wert steht über der Spalte. Sie sind keine maßstäblichen Flächenstücke.');break;
 }
 case 'group':{
  const complement=300-n,total=300+c.other;
  art=image(bar([{value:n,label:fmt(n/100)},{value:complement,label:fmt(complement/100)},{value:c.other,label:fmt(c.other/100)}],500,{y:45})+bracket(40,105,480*300/500,'diese beiden Teile ergeben 3'),164);
  out=`(${fmt(n/100)} + ${fmt(complement/100)}) + ${fmt(c.other/100)} = ${fmt(total/100)}`;
  detail='Die Klammer fasst passende Summanden zusammen. Die Summe ändert sich durch Umordnen nicht.';
  controls=control('n','Erster Teil',n,100,300,5,100);break;
 }
 case 'addunits':{
  const total=s.a+s.b;art=image(bar([{value:s.a,label:fmt(s.a/100)+' m'},{value:s.b,label:s.b+' cm'}],300,{y:44})+bar([{value:s.a,label:fmt(s.a/100)+' m'},{value:s.b,label:fmt(s.b/100)+' m'}],300,{y:112})+bracket(40,170,480,'beide Balken: gesamte Skala = 3 m'),215);
  out=`${fmt(s.a/100)} m + ${s.b} cm = ${fmt(total/100)} m`;
  detail=`Zuerst ${s.b} cm = ${fmt(s.b/100)} m. Dann ${fmt(s.a/100)} + ${fmt(s.b/100)} = ${fmt(total/100)}.`;
  controls=control('a','Erste Länge',s.a,0,150,5,100,'m')+control('b','Zweite Länge',s.b,0,150,5,1,'cm');break;
 }
 case 'difference':{
  const rest=c.total-s.a;art=image(bar([{value:s.a,label:fmt(s.a/100)},{value:rest,label:fmt(rest/100)}],c.total,{y:40})+bracket(40,103,480,`Ganzes: ${fixed(c.total/100)} m`),157);
  out=`${fixed(s.a/100)} m + ${fixed(rest/100)} m = ${fixed(c.total/100)} m`;
  detail=c.proof?`Probe: Rest + weggenommener Teil. ${fixed(c.total/100)} − ${fixed(s.a/100)} = ${fixed(rest/100)}.`:`Noch nötig: Ziel − vorhandener Teil = ${fixed(c.total/100)} m − ${fixed(s.a/100)} m = ${fixed(rest/100)} m.`;
  controls=control('a',c.proof?'Weggenommener Teil':'Vorhandener Teil',s.a,0,c.total,5,100,'m');break;
 }
 case 'twoout':{
  const rest=c.total-s.a-s.b;art=image(bar([{value:s.a,label:fmt(s.a/100),cls:'lab-gold'},{value:s.b,label:fmt(s.b/100),cls:'lab-pale'},{value:rest,label:fmt(rest/100),cls:'lab-fill'}],c.total,{y:40})+bracket(40,104,480,`Vorrat: ${fmt(c.total/100)} l`),157);
  out=`${fmt(c.total/100)} − ${fmt(s.a/100)} − ${fmt(s.b/100)} = ${fmt(rest/100)}`;
  detail=`Gleichwertig: ${fmt(c.total/100)} l − (${fmt(s.a/100)} l + ${fmt(s.b/100)} l) = ${fmt(rest/100)} l. In der Klammer steht eine Summe, keine Differenz.`;
  controls=control('a','Erste Entnahme',s.a,0,400,10,100,'l')+control('b','Zweite Entnahme',s.b,0,400,10,100,'l');break;
 }
 case 'repeat':{
  let b='';for(let i=0;i<n;i++){const x=42+(i%4)*130,y=22+Math.floor(i/4)*89;b+=rect(x,y,90,53,'lab-bag', 'rx="8"')+rect(x+4,y+49*(1-s.a/100),82,49*s.a/100,'lab-fill','rx="3"')+txt(x+45,y+75,`${fmt(s.a/100)} kg`,'lab-tiny');}
  art=image(b,'Gleich große Beutel mit gleichem Inhalt.',n>4?208:120);out=`${n} · ${fmt(s.a/100)} kg = ${fmt(n*s.a/100)} kg`;
  detail=`${n===0?'Kein Beutel':Array(n).fill(fmt(s.a/100)).join(' + ')}${n?' = '+fmt(n*s.a/100)+' kg':''}. Jeder Beutel fasst höchstens 1 kg.`;
  controls=control('n','Anzahl der Beutel',n,0,8)+control('a','Menge je Beutel',s.a,0,100,c.step,100,'kg');break;
 }
 case 'partof':{
  const part=c.adjustPart?s.part:c.part,ratio=part/c.den,value=n/10,result=n*part/(10*c.den);
  let b=bar([{value:n*ratio,label:fmt(result)},{value:n*(1-ratio),label:fmt(value-result),cls:'lab-empty'}],60,{y:42});
  for(let i=0;i<=c.den;i++){const x=40+480*n/60*i/c.den;b+=line(x,37,x,92,'lab-tick');}b+=bracket(40,104,480*n/60,`Ausgangsmenge: ${fmt(value)} l`);
  art=image(b,'Eine positive Ausgangsmenge wird in gleich große Anteile geteilt.',160);out=`${fmt(value)} · ${fmt(ratio,2)} = ${fmt(result)}`;
  detail=`${part} von ${c.den} gleichen Teilen sind markiert. ${c.den===4?'Ein Viertel erhältst du auch durch zweimaliges Halbieren.':'Bei einem Anteil zwischen 0 und 1 wird die positive Menge nicht größer.'}`;
  controls=control('n','Ausgangsmenge',n,0,60,2,10,'l')+(c.adjustPart?control('part','Anteil in Zehnteln',s.part,0,10):'');break;
 }
 case 'area':{
  const a=s.a,b=s.b,x=91,y=27,scale=15;let body='';
  for(let row=0;row<20;row++)for(let col=0;col<20;col++)body+=rect(x+col*scale,y+row*scale,scale,scale,col<a&&row<b?'lab-cell filled':'lab-area-empty');
  body+=rect(x,y,a*scale,b*scale,'lab-area-outline');
  for(let i=0;i<=2;i++){body+=line(x+i*150,y,x+i*150,y+300,'lab-wholeline')+line(x,y+i*150,x+300,y+i*150,'lab-wholeline');}
  body+=`<circle cx="${x+a*scale}" cy="${y+b*scale}" r="13" class="lab-marker"/>`;
  body+=txt(x+a*scale/2,17,fmt(a/10)+(c.units?' m':''),'lab-axis-label')+txt(62,y+b*scale/2,fmt(b/10)+(c.units?' m':''),'lab-axis-label')+txt(470,84,'1 kleines','lab-tiny')+txt(470,105,'Kästchen:','lab-tiny')+txt(470,137,c.units?'0,1 m · 0,1 m':'0,1 · 0,1','lab-tiny')+txt(470,159,'= 0,01'+(c.units?' m²':''),'lab-tiny')+txt(241,351,'große Gitterabstände: 1'+(c.units?' m':''),'lab-tiny');
  art=svg(body,370,`data-surface="area" role="img" aria-label="Rechteck mit Seiten ${fmt(a/10)} und ${fmt(b/10)}${c.units?' Metern':''}. ${a*b} Hundertstel${c.units?' Quadratmeter':''}."`);
  out=`${fmt(a/10)}${c.units?' m':''} · ${fmt(b/10)}${c.units?' m':''} = ${fixed(a*b/100,2)}${c.units?' m²':''}`;
  detail=`${a} · ${b} = ${a*b} kleine Kästchen. Jedes ist ein Hundertstel ${c.units?'Quadratmeter':'des Einheitsquadrats'}. Das graue Raster bleibt immer 2 mal 2 groß.`;
  controls=control('a',c.units?'Länge':'Erster Faktor',a,1,20,1,10,c.units?'m':'')+control('b',c.units?'Breite':'Zweiter Faktor',b,1,20,1,10,c.units?'m':'');break;
 }
 case 'price':{
  const cents=c.price*n/10;let b=bar([{value:n,label:fmt(n/10)+' m'}],30,{y:40})+bar([{value:cents,label:fixed(cents/100)+' €'}],c.price*3,{y:117});
  b+=txt(40,27,'Länge · ganze Skala 3 m','lab-tiny','start')+txt(40,104,`Preis · ganze Skala ${fixed(c.price*3/100)} €`,'lab-tiny','start');
  art=image(b,'Zwei getrennt beschriftete Skalen: Länge und dazu proportionaler Preis.',185);
  out=`${fixed(c.price/100)} €/m · ${fmt(n/10)} m = ${fixed(cents/100)} €`;
  detail='Einheitspreis mal Länge ergibt einen Preis. Die beiden Balken haben unterschiedliche Einheiten.';
  controls=control('n','Gekaufte Länge',n,0,30,5,10,'m');break;
 }
 case 'powers':{
  const shift=s.step,sign=Math.sign(c.exponent),actual=sign*shift,original=c.n/1000,value=original*10**actual;
  const positions=[2,1,0,-1,-2,-3],names=['H','Z','E','z','h','t'];
  let digits=String(c.n).padStart(4,'0').split('').map(Number);const nonzero=digits.map((d,i)=>({d,p:-i})).filter(v=>v.d!==0);
  const row=(offset,label)=>`<div class="lab-power-row"><span class="lab-row-label">${label}</span>${positions.map((p,i)=>`${i===3?'<span class="lab-fixed-comma">,</span>':''}<div class="lab-power-cell"><small>${names[i]}</small><b class="${nonzero.some(v=>v.p+offset===p)?'lab-moving-digit':''}">${nonzero.find(v=>v.p+offset===p)?.d??'0'}</b></div>`).join('')}</div>`;
  art=row(0,'vorher')+row(actual,'jetzt');out=`${fmt(original)} ${sign>0?'·':':'} ${10**shift} = ${fmt(value,5)}`;
  detail=shift===0?'Ausgangszahl. Das Komma trennt die Einer von den Zehnteln.':`${shift} ${shift===1?'Stelle':'Stellen'} nach ${sign>0?'links':'rechts'}: Jede Ziffer erhält den ${sign>0?10**shift+'-fachen Wert':'entsprechend kleineren Wert'}. Nullen halten die anderen Plätze frei.`;
  controls=actions(button('Ausgangszahl','set-stage',0,shift===0)+button(sign>0?'Einmal · 10':'Einmal : 10','set-stage',1,shift===1)+(Math.abs(c.exponent)===2?button(sign>0?'Noch einmal · 10':'Noch einmal : 10','set-stage',2,shift===2):''))+note('H = Hunderter, Z = Zehner, E = Einer, z = Zehntel, h = Hundertstel, t = Tausendstel. Die Einteilung bleibt fest, die Ziffern wechseln die Stelle.');break;
 }
 case 'distribute':{
  const whole=Math.floor(s.a/10),tenths=s.a%10;let b='';for(let i=0;i<n;i++)b+=bar([{value:whole*10,label:String(whole)},{value:tenths,label:fmt(tenths/10)}],40,{y:17+i*40,height:30});
  art=image(b,'Jeder gleich große Mengenbalken wird in Ganze und Zehntel zerlegt.',n*40+24);
  out=`${n} · (${whole} + ${fmt(tenths/10)}) = ${fmt(n*s.a/10)}`;
  detail=`${n} · ${whole} + ${n} · ${fmt(tenths/10)} = ${n*whole} + ${fmt(n*tenths/10)}. Beide Teile werden ${n}-mal genommen.`;
  controls=control('n','Beutelanzahl',n,1,5)+control('a','Menge je Beutel',s.a,10,39,1,10,'kg');break;
 }
 case 'devices':{
  const per=c.rate*c.time/100;art=image(bar(Array.from({length:n},(_,i)=>({value:per,label:`${fmt(per)} l`,cls:i%2?'lab-gold':'lab-fill'})),per*4,{y:47})+bracket(40,110,480,'Skala für höchstens vier gleiche Geräte'),165);
  out=`${n} · (${fmt(c.rate/10)} l/min · ${fmt(c.time/10)} min) = ${fmt(n*per)} l`;
  detail=`Ein Gerät liefert ${fmt(per)} l. ${n} ${n===1?'Gerät liefert':'Geräte liefern'} ${fmt(n*per)} l. Bei zwei Geräten wird verdoppelt.`;
  controls=control('n','Anzahl der Geräte',n,1,4);break;
 }
 case 'share':{
  const total=s.total,count=n,per=total/count;let b='';
  for(let i=0;i<count;i++){
   const x=47+i*119,capacity=500,fill=per/capacity;
   b+=rect(x,25,82,115,'lab-vessel')+rect(x+3,28+109*(1-fill),76,109*fill,'lab-water')+txt(x+41,162,`${fmt(per/100)} l`,'lab-axis-label')+txt(x+41,183,`Person ${i+1}`,'lab-tiny');
  }
  art=image(b,'Alle geradwandigen Becher sind gleich groß und gleich gefüllt; Kapazität je Becher 5 Liter.',204);
  out=`${fmt(total/100)} l : ${count} = ${fmt(per/100)} l je Person`;
  detail=`Probe: ${count} · ${fmt(per/100)} l = ${fmt(total/100)} l. Kein Liter verschwindet. Jeder Behälter in der Zeichnung fasst 5 l.`;
  controls=choice('total','Gesamtmenge',total,c.cases.map(v=>[v,fmt(v/100)+' l']))+choice('n','Empfänger',n,[2,4].concat(c.cases.every(t=>t%3===0)?[3]:[]).sort((a,b)=>a-b));break;
 }
 case 'portion':{
  const r=portionResult(c.total,s.portion);let b=bar(Array.from({length:r.count},(_,i)=>({value:s.portion,label:fmt(s.portion/100),cls:i%2?'lab-gold':'lab-fill'})).concat(r.remainder?[{value:r.remainder,label:'Rest',cls:'lab-empty'}]:[]),c.total,{y:38});
  for(let i=0;i<=r.count;i++)b+=line(40+i*480*s.portion/c.total,34,40+i*480*s.portion/c.total,88,'lab-tick');
  b+=bracket(40,104,480,`Gesamtmenge: ${fmt(c.total/100)} l`);art=image(b,'Gleich große Portionen in einer festen Gesamtmenge; ein möglicher Rest ist nicht als volle Portion gezählt.',161);
  out=r.remainder===0?`${fmt(c.total/100)} l : ${fmt(s.portion/100)} l = ${r.count} volle Portionen`:`${r.count} volle Portionen und ${fmt(r.remainder/100)} l Rest`;
  detail=`${r.count} · ${fmt(s.portion/100)} l${r.remainder?' + '+fmt(r.remainder/100)+' l':''} = ${fmt(c.total/100)} l. ${r.remainder?'Der Rest reicht nicht für eine weitere volle Portion.':'Gesucht ist die Anzahl, nicht Liter je Person.'}`;
  controls=choice('portion','Portionsgröße',s.portion,c.choices.map(v=>[v,fmt(v/100)+' l']));break;
 }
 case 'scale':{
  const factor=[1,10,100][s.step],total=c.total/100*factor,portion=c.portion/100*factor;let b=bar([{value:c.total,label:fmt(total)}],c.total,{y:30});
  for(let i=0;i<40;i++)b+=line(40+i*12,30,40+i*12,74,'lab-fine');b+=bracket(40,98,480,'40 gleich große Teilabschnitte');
  art=image(b,'Ein Verhältnis bleibt gleich, wenn beide Maßzahlen mit demselben Faktor verändert werden.',149);out=`${fmt(c.total/100)} : ${fmt(c.portion/100)} = ${fmt(total)} : ${fmt(portion)} = 40`;
  detail=`Beide Zahlen wurden mit ${factor} multipliziert. Die Verhältniszeichnung bleibt gleich. Nur eine Zahl zu verändern wäre eine andere Division.`;
  controls=actions([1,10,100].map((f,i)=>button('beide · '+f,'set-stage',i,s.step===i)).join(''));break;
 }
 case 'need':{
  const need=n*c.per,missing=Math.max(0,need-c.stock),surplus=Math.max(0,c.stock-need),max=1000;
  let b=bar([{value:need,label:fmt(need/100)+' m'}],max,{y:28})+bar([{value:c.stock,label:fmt(c.stock/100)+' m',cls:'lab-gold'}],max,{y:111})+txt(40,20,'Bedarf','lab-tiny','start')+txt(40,103,'Vorrat','lab-tiny','start');
  art=image(b,'Bedarf und Vorrat in Metern auf derselben Skala.',181);out=`Bedarf: ${n} · ${fmt(c.per/100)} m = ${fmt(need/100)} m`;
  detail=missing?`Es fehlen ${fmt(missing/100)} m: Bedarf − Vorrat.`:surplus?`Der Vorrat reicht. ${fmt(surplus/100)} m bleiben übrig. Kein negativer Fehlbetrag.`:'Der Vorrat reicht genau. Es fehlt nichts.';
  controls=control('n','Anzahl der Bögen',n,1,8);break;
 }
 case 'model':{
  const labels=['Drei gleiche Beutel','Zwei Vorräte zusammen','Vom Vorrat wegnehmen','Gerecht auf drei verteilen'];
  if(s.story===0){art=image(bar(Array.from({length:3},()=>({value:150,label:'1,5 kg'})),600),140);out='3 · 1,5 kg = 4,5 kg';detail='Gesucht ist die Gesamtmasse von drei gleichen Beuteln.';}
  if(s.story===1){art=image(bar([{value:150,label:'1,5 kg'},{value:200,label:'2 kg'}],600),140);out='1,5 kg + 2 kg = 3,5 kg';detail='Gesucht ist die gemeinsame Masse zweier Vorräte.';}
  if(s.story===2){art=image(bar([{value:150,label:'1,5 kg weg',cls:'lab-gold'},{value:300,label:'3 kg Rest'}],450),140);out='4,5 kg − 1,5 kg = 3 kg';detail='Gesucht ist, was von 4,5 kg nach der Entnahme übrig bleibt.';}
  if(s.story===3){art=image(bar(Array.from({length:3},()=>({value:150,label:'1,5 kg'})),450),140);out='4,5 kg : 3 = 1,5 kg je Person';detail='Gesucht ist die Menge je Person, nicht die Anzahl der Personen.';}
  controls=choice('story','Geschichte auswählen',s.story,labels.map((label,i)=>[i,label]));break;
 }
 case 'discount':{
  const total=n*c.price,paid=total-c.discount;art=image(bar([{value:paid,label:fixed(paid/100)+' €',cls:'lab-fill'},{value:c.discount,label:fixed(c.discount/100)+' €',cls:'lab-gold'}],total,{y:40})+bracket(40,102,480,`${n} Stück · ${fixed(c.price/100)} €`),159);
  out=`${n} · ${fixed(c.price/100)} € − ${fixed(c.discount/100)} € = ${fixed(paid/100)} €`;
  detail=`Grün: zu bezahlen. Gold: einmaliger Gesamtrabatt. Er wird nicht ${n}-mal abgezogen.`;
  controls=control('n','Stückzahl',n,1,6);break;
 }
 case 'operations':{
  const parent=s.comparison===1,step=s.step,mult=n*1.5,add=2+n,result=parent?add*1.5:2+mult;
  const l=parent?'2 + '+n:n+' · 1,5',r=parent?fmt(add):fmt(mult);
  let b='';b+=line(170,61,280,142,'lab-branch')+line(390,61,280,142,'lab-branch')+rect(68,24,205,58,'lab-tree-node','rx="12"')+rect(302,24,190,58,'lab-tree-node','rx="12"')+rect(181,128,199,58,'lab-tree-result','rx="12"');
  b+=txt(170,59,step>=1?r:l,'lab-number')+txt(398,59,parent?'· 1,5':'+ 2','lab-number')+txt(280,163,step>=2?fmt(result):'Ergebnis?','lab-number');
  art=image(b,'Rechenbaum mit markierter zuerst auszuführender Teilrechnung.',207);out=parent?`(2 + ${n}) · 1,5${step>=2?' = '+fmt(result):''}`:`2 + ${n} · 1,5${step>=2?' = '+fmt(result):''}`;
  detail=step===0?(parent?'Zuerst die Klammer: '+l+'.':'Zuerst die Multiplikation: '+l+'.'):step===1?`Zwischenergebnis ${r}. Jetzt ${parent?'mit 1,5 multiplizieren.':'2 addieren.'}`:'Beide Rechnungen nutzen dieselben Zahlen, aber die Klammer verändert das Ergebnis.';
  controls=actions(button('Ohne Klammer','operation-case',0,!parent)+button('Mit Klammer','operation-case',1,parent)+button(step<2?'Nächsten Schritt zeigen':'Noch einmal','operation-next'))+control('n','Zahl in der Rechnung',n,1,6);break;
 }
 case 'plan':{
  const need=c.n*c.per+c.extra,available=Math.max(0,s.stock-need),r=portionResult(available,c.portion),max=1500;
  let b=bar([{value:Math.min(s.stock,need),label:'Bedarf',cls:'lab-gold'},{value:available,label:'Rest',cls:'lab-fill'}],max,{y:45})+bracket(40,109,480*s.stock/max,`Vorrat: ${fmt(s.stock/100)} m`);
  art=image(b,'Materialplanung mit Bedarf und Rest. Der Rest ist Ausgangsmenge für die nächste Teilung.',167);out=`Bedarf: ${c.n} · ${fmt(c.per/100)} m + ${fmt(c.extra/100)} m = ${fmt(need/100)} m`;
  detail=s.stock<need?`Es fehlen ${fmt((need-s.stock)/100)} m. Erst der Bedarf muss gedeckt sein.`:`Rest: ${fmt(available/100)} m. Daraus ${r.count} volle Schleifen zu ${fmt(c.portion/100)} m; übrig: ${fmt(r.remainder/100)} m.`;
  controls=control('stock','Bandvorrat',s.stock,400,1500,10,100,'m');break;
 }
 default: throw new Error('Kein Schaubild für '+c.id);
 }
 return {art,out,detail,controls};
}
export function labHTML(id){
 if(!LABS[id])throw new Error('Unbekannte Wissenskarte: '+id);
 return `<section class="math-lab" data-lab="${esc(id)}" aria-label="Interaktives Schaubild"><header class="lab-head"><div><h3>${esc(FAMILY_LABELS[LABS[id].type])}</h3></div><button type="button" class="lab-reset" data-lab-action="reset" aria-label="Schaubild zurücksetzen">↺ <span>Zurücksetzen</span></button></header><p class="lab-prompt">${esc(LABS[id].prompt)}</p><div class="lab-stage"></div><div class="lab-output"></div><div class="lab-controls"></div></section>`;
}
export function attachLabs(root=document){
 const cleanups=[];
 root.querySelectorAll('[data-lab]').forEach(host=>{
  const id=host.dataset.lab,c=LABS[id];let s=memory.get(id)||initialLab(c),pointer=null,mode=null,paintValue=true;
  if(c.type==='halves'&&!memory.has(id))s.n=1;
  if(c.type==='share'&&!memory.has(id))s.n=c.n;
  memory.set(id,s);
  const stage=host.querySelector('.lab-stage'),out=host.querySelector('.lab-output'),controls=host.querySelector('.lab-controls');
  function paint(all=false){
   const m=model(c,s);stage.innerHTML=m.art;out.innerHTML=output(m.out,m.detail);
   host.dataset.revision=String(Number(host.dataset.revision||0)+1);
   // Same-state symbolic transfer; changing only the model's animation step
   // does not reset a written calculation when the operands stayed unchanged.
   host.writtenCalculations=linkedCalculations(c,s);
   host.dispatchEvent(new CustomEvent('written-model-change',{bubbles:true,detail:{id,calculations:host.writtenCalculations}}));
   if(all)controls.innerHTML=m.controls;
   // Sliders are intentionally not replaced while being dragged or focused.
   controls.querySelectorAll('[data-lab-field]').forEach(el=>{
    const k=el.dataset.labField,v=s[k];if(v!==undefined)el.value=v;
    const read=controls.querySelector(`[data-readout="${k}"]`);
    const display=fmt(v/Number(el.dataset.den||1))+(el.dataset.unit?' '+el.dataset.unit:'');if(read)read.textContent=display;
    if(el.type==='range')el.setAttribute('aria-valuetext',display);
   });
  }
  function updateField(key,value){
   if(!Number.isFinite(value))return;
   s[key]=value;
   if(key==='case')s.step=0;
   if(key==='parts')s.n=Math.min(s.n,value);
   if(c.type==='grid'&&key==='n')s.paint=null;
   if(c.type==='operations'&&key==='n')s.step=0;
   paint(key==='case'||key==='parts');
  }
  const onInput=e=>{const el=e.target.closest('[data-lab-field]');if(!el||!host.contains(el))return;updateField(el.dataset.labField,Number(el.value));};
  const onClick=e=>{
   const el=e.target.closest('[data-lab-action]');if(!el||!host.contains(el))return;
   const action=el.dataset.labAction,value=Number(el.dataset.value),raw=el.dataset.value;let all=true;
   if(action==='reset'){s=initialLab(c);if(c.type==='halves')s.n=1;memory.set(id,s);}
   if(action==='increase'||action==='decrease'){
    const field=controls.querySelector(`[data-lab-field="${raw}"]`);if(!field)return;
    const v=clamp(Number(field.value)+(action==='increase'?1:-1)*Number(field.step||1),Number(field.min),Number(field.max));updateField(raw,v);return;
   }
   if(action==='set-n')s.n=value;
   if(action==='grid-step'){s.n=clamp(s.n+value,0,100);s.paint=null;}
   if(action==='grid-organize')s.paint=null;
   if(action==='toggle-fine')s.fine=!s.fine;
   if(action==='select-digit')s.selected=value;
   if(action==='digit-change')s.digits[s.selected]=clamp(s.digits[s.selected]+value,0,9);
   if(action==='select-order')s.selected=value;
   if(action==='move-order'){const to=clamp(s.selected+value,0,s.order.length-1);[s.order[to],s.order[s.selected]]=[s.order[s.selected],s.order[to]];s.selected=to;}
   if(action==='comparison')s.comparison=value;
   if(action==='stage-back')s.step=Math.max(0,s.step-1);
   if(action==='stage-next')s.step=s.step<value-1?s.step+1:0;
   if(action==='set-stage')s.step=value;
   if(action==='operation-case'){s.comparison=value;s.step=0;}
   if(action==='operation-next')s.step=(s.step+1)%3;
   paint(all);
  };
  function coordinates(e){
   const el=stage.querySelector('svg'),matrix=el?.getScreenCTM();if(!matrix)return null;
   const p=el.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(matrix.inverse());
  }
  function move(e,first=false){
   const p=coordinates(e);if(!p)return;
   if(mode==='line'){
    const [min,max,step]=[c.min,c.max,c.type==='round'?1:c.step||1];
    const v=clamp(min+Math.round((p.x-40)/480*(max-min)/step)*step,min,max);updateField(c.type==='compare'?'a':'n',v);
   }else if(mode==='area'){
    s.a=clamp(Math.round((p.x-91)/15),1,20);s.b=clamp(Math.round((p.y-27)/15),1,20);paint();
   }else if(mode==='strip'){
    s.n=clamp(Math.floor((p.x-40)/480*(s.parts||c.parts))+1,0,s.parts||c.parts);paint();
   }else if(mode==='quarters'){
    const col=clamp(Math.floor((p.x-190)/90),0,1),row=clamp(Math.floor((p.y-18)/90),0,1);s.n=row*2+col+1;paint();
   }else if(mode==='grid'){
    if(p.x<190||p.x>=370||p.y<18||p.y>=198)return;
    const i=Math.floor((p.y-18)/18)*10+Math.floor((p.x-190)/18);
    if(!s.paint)s.paint=Array.from({length:100},(_,j)=>j<s.n);
    if(first)paintValue=!s.paint[i];s.paint[i]=paintValue;s.n=s.paint.filter(Boolean).length;paint();
   }
  }
  const onDown=e=>{
   const surface=e.target.closest('[data-surface]');if(!surface||e.button>0||pointer!==null)return;
   e.preventDefault();e.stopPropagation();pointer=e.pointerId;mode=surface.dataset.surface;stage.setPointerCapture(pointer);move(e,true);
  };
  const onMove=e=>{if(e.pointerId!==pointer)return;e.preventDefault();move(e);};
  const onUp=e=>{if(e.pointerId!==pointer)return;if(stage.hasPointerCapture(pointer))stage.releasePointerCapture(pointer);pointer=null;mode=null;};
  host.addEventListener('input',onInput);host.addEventListener('change',onInput);host.addEventListener('click',onClick);
  stage.addEventListener('pointerdown',onDown);stage.addEventListener('pointermove',onMove);stage.addEventListener('pointerup',onUp);stage.addEventListener('pointercancel',onUp);
  paint(true);
  cleanups.push(()=>{host.removeEventListener('input',onInput);host.removeEventListener('change',onInput);host.removeEventListener('click',onClick);stage.removeEventListener('pointerdown',onDown);stage.removeEventListener('pointermove',onMove);stage.removeEventListener('pointerup',onUp);stage.removeEventListener('pointercancel',onUp);if(pointer!==null&&stage.hasPointerCapture(pointer))stage.releasePointerCapture(pointer);});
 });
 return ()=>cleanups.forEach(fn=>fn());
}
// Public deterministic rendering hooks used by tests, never tied to game progress.
export const labSnapshot=(id,state=initialLab(LABS[id]))=>model(LABS[id],state);
export function clearLabMemory(){memory.clear();}

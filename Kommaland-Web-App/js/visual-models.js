import {LAB_ALIASES} from './curriculum-data.js';
/**
 * Pure, independently testable mathematics for the interactive concept cards.
 * All adjustable amounts are integer counts of fixed units. No eval, external libraries,
 * rounded comparisons or repeated floating-point additions are used.
 */
export const fmt=(n,d=3)=>Number(n).toLocaleString('de-DE',{maximumFractionDigits:d,useGrouping:false});
export const fixed=(n,d=2)=>Number(n).toLocaleString('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d,useGrouping:false});
export const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
export function roundTicks(value,unit){
 if(!Number.isSafeInteger(value)||!Number.isSafeInteger(unit)||unit<=0||value<0)throw new RangeError('Positive ganzzahlige Einheiten nötig.');
 return Math.floor((value*2+unit)/(2*unit))*unit;
}
export function digitsOf(ticks,places){
 const s=String(ticks).padStart(places+1,'0');return [...s].map(Number);
}
export function placeValue(digits){return digits.reduce((a,b)=>a*10+b,0);}
export function arithmeticStages(a,b,places,op){
 if(!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||a<0||b<0||(op==='-'&&b>a))throw new RangeError('Ungültige Mengen.');
 const count=Math.max(places+1,String(Math.max(a,b,op==='+'?a+b:a)).length);
 const da=String(a).padStart(count,'0').split('').map(Number), db=String(b).padStart(count,'0').split('').map(Number);
 const names=Array.from({length:count},(_,i)=>({3:'Tausender',2:'Hunderter',1:'Zehner',0:'Einer','-1':'Zehntel','-2':'Hundertstel','-3':'Tausendstel'})[count-i-1-places]);
 let current=op==='+'?da.map((v,i)=>v+db[i]):[...da];
 const stages=[{counts:[...current],text:op==='+'?'Gleiche Stellen zusammenlegen. Noch ist nichts gebündelt.':'Die Anfangsmenge liegt bereit. Tauschen verändert ihren Wert nicht.'}];
 if(op==='+'){
  for(let i=count-1;i>0;i--)if(current[i]>=10){const carry=Math.floor(current[i]/10);current[i]%=10;current[i-1]+=carry;
   stages.push({counts:[...current],text:`${carry*10} ${names[i]} werden zu ${carry} ${names[i-1]}. Der Gesamtwert bleibt gleich.`,from:i,to:i-1});}
 }else{
  for(let i=count-1;i>=0;i--){
   if(current[i]<db[i]){let j=i-1;while(j>=0&&current[j]===0)j--;if(j<0)throw new RangeError('Entbündeln unmöglich.');
    for(let k=j;k<i;k++){current[k]--;current[k+1]+=10;stages.push({counts:[...current],text:`1 ${names[k]} wird in 10 ${names[k+1]} getauscht. Die Anfangsmenge ist unverändert.`,from:k,to:k+1});}}
  }
  current=current.map((v,i)=>v-db[i]);
  stages.push({counts:[...current],text:`Nun ${fixed(b/10**places,places)} wegnehmen. Der Rest ist ${fixed((a-b)/10**places,places)}.`});
 }
 return {a:da,b:db,names,stages,result:op==='+'?a+b:a-b,places,op};
}
export function portionResult(total,portion){
 if(!Number.isSafeInteger(total)||!Number.isSafeInteger(portion)||total<0||portion<=0)throw new RangeError('Portion muss positiv sein.');
 return {count:Math.floor(total/portion),remainder:total%portion,total,portion};
}
export const LABS={};
const add=(id,type,props={})=>{LABS[id]={id,type,...props};};
add('between','halves',{whole:2,decimal:false,prompt:'Leere, halbe oder volle Kanne: Was liegt genau zwischen zwei und drei Ganzen?'});
add('half-name','halves',{whole:2,decimal:true,prompt:'Schiebe die Füllung auf die Hälfte. Welche Zahl passt dazu?'});
add('tenths','strip',{parts:10,n:3,wordsOnly:true,prompt:'Färbe Teile des 1-m-Bandes. Alle zehn Teile sind gleich lang.'});
add('half-tenths','strip',{parts:10,n:5,whole:2,prompt:'Stelle fünf Zehntel ein. Vergleiche die Füllung mit der Mitte.'});
for(const [id,digits] of [['write-tenths',[0,4]],['places-tenths',[1,7]],['zero-hundred',[0,0,6]],['places-hundred',[2,4,6]],['write-thousand',[0,0,0,7]]])add(id,'place',{digits,prompt:'Ändere genau eine Ziffer. Welcher Teil der Zahl verändert sich?'});
add('hundred-grid','grid',{n:10,intro:true,prompt:'Zehn Kästchen sind ein Zehntel. Färbe eine Reihe oder einzelne Kästchen.'});
add('write-hundred','grid',{n:24,prompt:'Färbe Kästchen. Wie viele volle Zehntel und einzelne Hundertstel sind es?'});
add('equal-zeros','equivalence',{n:4,prompt:'Teile denselben Anteil feiner ein. Die gefärbte Fläche bleibt gleich.'});
add('thousand','zoom',{n:1,intro:true,prompt:'Untersuche ein einzelnes Hundertstel unter der Lupe. Es hat zehn Tausendstel.'});
add('fraction-meaning','strip',{parts:2,n:1,fraction:true,wordsOnly:true,prompt:'Die untere Zahl teilt das Ganze; die obere zählt die gefärbten Teile.'});
add('fraction-tenths','strip',{parts:10,n:4,fraction:true,prompt:'Stelle Zehntel ein und vergleiche Bruch und Dezimalzahl.'});
add('fraction-hundred','grid',{n:28,fraction:true,prompt:'Zähle gefärbte Hundertstel und lies denselben Anteil als Bruch.'});
add('fraction-quarter','quarters',{n:1,prompt:'Tippe Viertel an. Jedes Viertel besteht aus einem 5-mal-5-Block.'});
add('fraction-threequarters','quarters',{n:3,prompt:'Wähle drei Viertel. Zähle die 25 Kästchen je Viertel zusammen.'});
add('fraction-thousand','zoom',{n:237,prompt:'Verändere die Tausendstel. Die Lupe zeigt den angebrochenen Hundertstelteil.'});
add('compare-tenths','compare',{a:32,b:36,den:10,min:30,max:40,step:1,prompt:'Beide Marker haben dieselbe Skala. Welche Zahl liegt weiter rechts?'});
add('compare-hundred','compare',{a:60,b:58,den:100,min:0,max:100,step:1,prompt:'Vergleiche auch 0,6 mit 0,58. Mehr Nachkommastellen bedeuten nicht mehr Wert.'});
add('order-thousand','order',{values:[2300,2035,2030],den:1000,prompt:'Wähle eine Karte und bewege sie nach links oder rechts: klein nach groß.'});
add('limits','limit',{n:1800,bound:1800,den:1000,min:1795,max:1805,prompt:'Prüfe die Grenze selbst und die benachbarten Tausendstel.'});
for(const [id,min,max,n,den,step] of [['line-tenths',0,10,4,10,1],['line-fives',200,250,215,100,5],['midpoint',310,330,320,100,1]])add(id,'line',{min,max,n,den,step,mid:id==='midpoint',prompt:id==='midpoint'?'Ziehe den Marker, bis beide Abstände gleich groß sind.':'Ziehe den Marker. Achte auf die Schrittweite der Skala.'});
for(const [id,min,max,n,den,unit] of [['round-near',420,430,423,100,10],['round-digit',5670,5680,5678,1000,10],['round-carry',490,500,497,100,10]])add(id,'round',{min,max,n,den,unit,prompt:'Ziehe die Zahl zwischen die Nachbarwerte. Genau in der Mitte wird hier aufgerundet.'});
add('estimate','estimate',{a:38,b:21,prompt:'Verändere die Angaben. Vergleiche genaue Summe und Überschlag auf ganze Zahlen.'});
for(const [id,unit,small,factor,n,shape] of [['metres-cm','m','cm',100,125,'length'],['cm-metres','m','cm',100,64,'length'],['kilometres','km','m',1000,1200,'length'],['kg-grams','kg','g',1000,750,'mass'],['grams-kg','kg','g',1000,1380,'mass'],['litres-ml','l','ml',1000,500,'volume'],['ml-litres','l','ml',1000,420,'volume'],['money','€','ct',100,307,'money']])add(id,'units',{unit,small,factor,n,shape,max:shape==='money'?500:factor*2,prompt:`Verändere die Menge. ${unit} und ${small} beschreiben immer dieselbe Größe.`});
add('time-half','time',{whole:1,n:30,step:15,prompt:'Verändere die Dauer. Ein voller Kreis ist eine Stunde mit 60 Minuten.'});
add('time-quarter','time',{whole:2,n:15,step:15,prompt:'Ein Viertelkreis sind 15 Minuten – nicht 25 Minuten.'});
add('square-units','square',{n:10,prompt:'Färbe Reihen: 10 dm in der Länge und 10 dm in der Breite ergeben 100 dm².'});
add('cube-units','cube',{n:10,prompt:'Baue den Würfel aus Schichten. Jede Schicht hat 10 · 10 kleine Würfel.'});
add('cube-litre','litrecubes',{n:1,prompt:'Jeder kleine Würfel hat drei Kantenlängen von je 1 dm und fasst genau 1 l.'});
const arithmetic=[
 ['add-tenths','+',1,[[21,13],[32,24],[15,23]]],['add-align','+',2,[[230,145],[140,236],[307,120]]],['add-carry','+',2,[[67,58],[85,37],[146,278]]],['add-thousand','+',3,[[248,352],[375,468],[1286,2379]]],
 ['subtract-basic','-',1,[[67,24],[86,32],[49,17]]],['subtract-exchange','-',2,[[460,128],[352,127],[521,238]]],['subtract-whole','-',2,[[300,168],[400,257],[200,85]]],['subtract-thousand','-',3,[[4000,1246],[3000,1875],[2000,736]]]
];
for(const [id,op,places,cases] of arithmetic)add(id,'arithmetic',{op,places,cases,prompt:op==='+'?'Lege gleiche Stellen zusammen und bündele in einzelnen Schritten.':'Tausche große Stellenwerte in kleine, bis du die Menge wegnehmen kannst.'});
add('add-group','group',{n:275,other:160,prompt:'Ergänze den ersten Teil zu 3 Ganzen. Beide Rechenwege ergeben dieselbe Summe.'});
add('add-units','addunits',{a:80,b:45,prompt:'Wähle Längen. Erst in dieselbe Einheit umrechnen, dann zusammenlegen.'});
add('missing','difference',{a:185,total:250,prompt:'Verschiebe den vorhandenen Teil. Die Lücke ergänzt immer bis zum festen Ziel.'});
add('subtract-proof','difference',{a:235,total:580,proof:true,prompt:'Weggenommener Teil und Rest ergeben wieder die Anfangsmenge.'});
add('two-subtractions','twoout',{a:240,b:170,total:900,prompt:'Verändere beide Entnahmen. Gemeinsam oder nacheinander abziehen ergibt denselben Rest.'});
add('multiply-repeat','repeat',{n:4,a:20,step:10,prompt:'Verändere die Anzahl der Beutel. Jeder Beutel enthält dieselbe Menge.'});
add('multiply-integer','repeat',{n:6,a:35,step:5,prompt:'Verändere die Beutelanzahl oder den Inhalt je Beutel. Addiere gleiche Mengen.'});
add('multiply-half','partof',{n:36,part:5,den:10,prompt:'Verschiebe die Menge. Genau die Hälfte bleibt markiert.'});
add('multiply-quarter','partof',{n:12,part:1,den:4,prompt:'Teile die Menge in vier gleich große Abschnitte. Einer ist ein Viertel.'});
add('multiply-smaller','partof',{n:50,part:3,den:10,adjustPart:true,prompt:'Wähle einen Anteil von 0 bis 1. Für eine positive Menge wird das Produkt höchstens so groß wie die Menge.'});
for(const [id,a,b,units] of [['multiply-decimal',14,3,false],['rectangle',16,5,true],['rectangle-decimal',14,13,true]])add(id,'area',{a,b,units,prompt:'Ziehe die Ecke des Rechtecks. Die Seiten sind in Zehnteln, die kleinen Flächen in Hundertsteln eingeteilt.'});
add('unit-price','price',{n:15,price:320,prompt:'Verändere die gekaufte Länge. Der Preis je Meter bleibt fest.'});
for(const [id,n,exponent] of [['times-ten',48,1],['times-hundred',320,2],['divide-ten',3700,-1],['divide-hundred',4500,-2]])add(id,'powers',{n,exponent,prompt:'Verschiebe die Ziffern um ganze Stellen. Das Komma bleibt an seinem Platz.'});
add('distribute','distribute',{n:4,a:23,prompt:'Zerlege jeden Beutel in Ganze und Zehntel. Beide Teile müssen vervielfacht werden.'});
add('product-then-double','devices',{n:2,rate:8,time:15,prompt:'Berechne erst die Menge je Gerät. Dann nimm alle gleichen Geräte zusammen.'});
add('divide-equal','share',{total:240,n:3,prompt:'Wähle die Anzahl der Empfänger. Jede Portion bleibt gleich groß.',cases:[240,360,480]});
add('divide-leftover','share',{total:500,n:4,prompt:'Auch ganze Liter lassen sich aufteilen. Vergleiche alle gleich großen Portionen.',cases:[500,300,700]});
add('divide-proof','share',{total:300,n:4,proof:true,prompt:'Nimm jede Portion gleich oft wie es Empfänger gibt: So erhältst du die Gesamtmenge.',cases:[300,600,900]});
for(const [id,total,portion,choices] of [['portion-tenths',180,30,[20,30,40,60]],['portion-hundred',350,25,[20,25,50,75]],['divide-small',300,50,[25,50,75,100]]])add(id,'portion',{total,portion,choices,prompt:'Wie viele volle Portionen passen hinein? Ein Rest wird getrennt angezeigt.'});
add('divide-scale','scale',{total:280,portion:7,prompt:'Vergrößere beide Maßzahlen mit demselben Faktor. Das Verhältnis bleibt gleich.'});
add('need-minus-stock','need',{n:4,per:125,stock:350,prompt:'Ändere die Anzahl der Bögen. Erst den Bedarf bestimmen, dann den Vorrat vergleichen.'});
add('model','model',{n:3,amount:150,prompt:'Wähle eine Geschichte. Das Modell zeigt, welche Größe gesucht ist.'});
add('one-discount','discount',{n:3,price:240,discount:120,prompt:'Verändere die Stückzahl. Der gemeinsame Rabatt wird nur ein einziges Mal abgezogen.'});
add('operations','operations',{n:3,step:0,prompt:'Decke die Rechenschritte auf. Die Klammer verändert, was zuerst berechnet wird.'});
add('plan-leftover','plan',{stock:1000,n:4,per:125,extra:80,portion:60,prompt:'Ändere den Vorrat. Bedarf, Rest und volle Schleifen müssen zusammenpassen.'});
export const FAMILY_LABELS={halves:'Ganze und Hälften',strip:'Gleich große Teile',place:'Stellenwert-Werkbank',grid:'Hundertstel-Feld',equivalence:'Gleiche Menge · andere Teilung',zoom:'Tausendstel-Lupe',quarters:'Viertel im Hundertfeld',compare:'Zwei Zahlen · eine Skala',order:'Zahlen ordnen',limit:'Eine genaue Grenze',line:'Zahlenweg',round:'Runden auf der Zahlengeraden',estimate:'Genau und ungefähr',units:'Eine Größe · zwei Einheiten',time:'Stunden und Minuten',square:'Quadratmeter zerlegen',cube:'Schicht für Schicht',litrecubes:'Kubikdezimeter und Liter',arithmetic:'Bündeln und Entbündeln',group:'Geschickt zusammenlegen',addunits:'Längen verbinden',difference:'Teil und Rest',twoout:'Zwei Entnahmen',repeat:'Gleiche Mengen',partof:'Ein Anteil der Menge',area:'Das wachsende Rechteck',price:'Länge und Preis',powers:'Stellenwert-Verschiebung',distribute:'Teile vervielfachen',devices:'Gleiche Geräte',share:'Gerecht verteilen',portion:'Portionen abzählen',scale:'Gleiches Verhältnis',need:'Bedarf und Vorrat',model:'Von der Geschichte zur Rechnung',discount:'Ein Rabatt für alles',operations:'Rechenbaum',plan:'Mit dem Rest planen'};
export function initialLab(c){
 return {divisor:3,steps:4,n:c.type==='halves'?1:(c.n??0),a:c.a??0,b:c.b??0,whole:c.whole??0,part:c.part??0,total:c.total??0,portion:c.portion??0,digits:c.digits?[...c.digits]:null,parts:c.parts??0,selected:0,step:0,case:0,fine:false,comparison:0,order:c.values?[...c.values]:null,paint:null,story:0,stock:c.stock??0};
}

// Core cards select the relevant existing model, without making its micro-card a compulsory step.
for(const [id,original] of Object.entries(LAB_ALIASES)){if(LABS[original])LABS[id]={...LABS[original],id};}
LABS['c6-periodic']={id:'c6-periodic',type:'periodic',prompt:'Wähle einen Teiler. Wann endet die Division, wann kehrt ein Rest wieder?'};

LABS['c6-time']={...LABS['time-quarter'],id:'c6-time'};
LABS['c6-inverse']={...LABS['missing'],id:'c6-inverse'};
LABS['c6-distribute']={...LABS['distribute'],id:'c6-distribute'};
FAMILY_LABELS.periodic='Reste verfolgen';

LABS['c6-place']={...LABS['write-thousand'],id:'c6-place',wholeDigits:2,digits:[1,2,3,0,4],prompt:'Wähle eine Stelle und ändere ihre Ziffer. Vergleiche die Zahl mit ihrem Stellenwert.'};

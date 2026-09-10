/** Bridge from manipulable quantities to the SAME numbers written symbolically.
 * Called when a concept model changes; never modifies a quest or its answer.
 */
import {decimalText} from './written-models.js';
const d=(n,p=2)=>decimalText(BigInt(n),p);
const c=(op,a,b,title='',context='')=>({op,a:String(a),b:String(b),title,context});
const remainderNote=(total,portion)=>`${Math.floor(total/portion)} volle Portionen; ${d(total%portion)} bleiben von der Ausgangsmenge übrig. Ein gebrochener Quotient ist nicht die Anzahl vollständig gefüllter Portionen.`;
export function linkedCalculations(cfg,s){
 const n=s.n;
 switch(cfg.type){
 case 'arithmetic':{const [a,b]=cfg.cases[s.case];return [c(cfg.op==='+'?'add':'sub',d(a,cfg.places),d(b,cfg.places))];}
 case 'group':return [c('add',d(n),d(300-n),'Passende Summanden zusammenfassen'),c('add','3',d(cfg.other),'Restlichen Summanden addieren')];
 case 'addunits':return [c('add',d(s.a),d(s.b),'In Metern addieren',`${s.b} cm = ${d(s.b)} m. Beide Längen haben jetzt dieselbe Einheit.`)];
 case 'difference':return cfg.proof?[c('sub',d(cfg.total),d(s.a),'Wegnehmen'),c('add',d(cfg.total-s.a),d(s.a),'Probe')]:[c('sub',d(cfg.total),d(s.a),'Die Lücke bestimmen')];
 case 'twoout':return [c('add',d(s.a),d(s.b),'Entnahmen zusammenfassen'),c('sub',d(cfg.total),d(s.a+s.b),'Vorrat minus Bedarf')];
 case 'repeat':return [c('mul',d(s.a),n,'Gleiche Mengen multiplizieren')];
 case 'partof':return [c('mul',d(n,1),d((cfg.adjustPart?s.part:cfg.part)*(100/cfg.den)),'Einen Anteil berechnen')];
 case 'area':return [c('mul',d(s.a,1),d(s.b,1),'Das Rechteck berechnen',cfg.units?'Seitenlänge in m mal Seitenlänge in m ergibt eine Fläche in m².':'Jedes kleine Quadrat ist ein Hundertstel des Einheitsquadrats.')];
 case 'price':return [c('mul',d(cfg.price),d(n,1),'Länge und Preis','Preis je Meter mal Länge ergibt den Gesamtpreis.')];
 case 'powers':return [c(cfg.exponent>0?'mul':'div',d(cfg.n,3),10**s.step,'Dieselbe Stellenwertveränderung schriftlich','Die Stellenwerttafel ist hier der kürzere Rechenweg. Auch das schriftliche Verfahren liefert denselben Wert.')];
 case 'distribute':{const whole=Math.floor(s.a/10),part=s.a%10;return [c('mul',n,whole,'Ganzen Anteil vervielfachen'),c('mul',n,d(part,1),'Zehntelanteil vervielfachen'),c('add',n*whole,d(n*part,1),'Die Teilprodukte addieren')];}
 case 'devices':return [c('mul',d(cfg.rate,1),d(cfg.time,1),'Menge eines Geräts'),c('mul',d(cfg.rate*cfg.time),n,'Alle gleichen Geräte')];
 case 'share':return [c('div',d(s.total),n,'Gerecht aufteilen')];
 case 'portion':return [c('div',d(cfg.total),d(s.portion),'Der Quotient der Mengen',remainderNote(cfg.total,s.portion))];
 case 'scale':{const factor=[1,10,100][s.step];return [c('div',d(cfg.total*factor),d(cfg.portion*factor),'Gleichwertige Division','Beide Maßzahlen werden gleich verändert. Das Verhältnis bleibt gleich.')];}
 case 'need':{const need=n*cfg.per;return [c('mul',n,d(cfg.per),'Bedarf berechnen'),c('sub',d(Math.max(need,cfg.stock)),d(Math.min(need,cfg.stock)),need>cfg.stock?'Fehlbetrag':'Übrigen Vorrat bestimmen')];}
 case 'model':return [[c('mul','3','1,5')],[c('add','1,5','2')],[c('sub','4,5','1,5')],[c('div','4,5','3')]][s.story];
 case 'discount':return [c('mul',d(cfg.price),n,'Zuerst alle Stücke'),c('sub',d(n*cfg.price),d(cfg.discount),'Einmal den Gesamtrabatt abziehen')];
 case 'operations':return s.comparison===1?[c('add','2',n,'Zuerst die Klammer'),c('mul',2+n,'1,5','Danach multiplizieren')]:[c('mul',n,'1,5','Punkt vor Strich'),c('add','2',d(n*15,1),'Danach addieren')];
 case 'plan':{const need=cfg.n*cfg.per+cfg.extra,rest=Math.max(0,s.stock-need),arr=[c('mul',cfg.n,d(cfg.per),'Bedarf für gleiche Teile'),c('add',d(cfg.n*cfg.per),d(cfg.extra),'Zusätzlichen Bedarf addieren'),c('sub',d(Math.max(s.stock,need)),d(Math.min(s.stock,need)),s.stock<need?'Noch fehlendes Material':'Rest berechnen')];if(s.stock>=need)arr.push(c('div',d(rest),d(cfg.portion),'Rest portionieren',remainderNote(rest,cfg.portion)));return arr;}
 case 'periodic':return [c('div','1',s.divisor,'Reste und Perioden')];
 case 'time':return [c('mul',s.whole,'60','Ganze Stunden in Minuten'),c('add',s.whole*60,n,'Minutenanteil hinzufügen')];
 default:return [];
 }
}

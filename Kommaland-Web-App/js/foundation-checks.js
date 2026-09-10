/** A short foundational sample, not a second exercise course.
 * Each key has one diagnostic purpose and an explicit learning destination.
 * Integer ticks author every decimal; no answer is derived from binary subtraction.
 */
export const SOURCE_CHECKS={village:['c6-place','c6-fractions','c6-zeros'],forest:['c6-compare','c6-line','c6-round'],harbor:['c6-units','c6-time','c6-volume'],market:['c6-add','c6-sum-smart','c6-estimate'],cliffs:['c6-sub','c6-inverse','c6-zeros'],mill:['c6-scale','c6-product','c6-distribute'],cave:['c6-divide-written','c6-divisor','c6-fractions'],castle:['c6-model','c6-operations','c6-estimate']};
export const PREREQUISITES={village:[],forest:['c6-place','c6-zeros'],harbor:['c6-place','c6-compare'],market:['c6-place','c6-zeros'],cliffs:['c6-add','c6-zeros'],mill:['c6-add','c6-fractions'],cave:['c6-product','c6-scale','c6-sub'],castle:['c6-add','c6-sub','c6-product','c6-divisor']};
export const CHECKS={
 'c6-place':{title:'Stellenwerte und Platzhalter',quest:'c6-v1'},'c6-fractions':{title:'Bruch und Dezimalzahl',quest:'c6-v3'},'c6-zeros':{title:'Gleichwertige Dezimalschreibweisen',quest:'c6-v1'},
 'c6-compare':{title:'Vergleichen und Ordnen',quest:'c6-f1'},'c6-line':{title:'Zahlengerade lesen',quest:'c6-f1'},'c6-round':{title:'Rundungsgenauigkeit',quest:'c6-f3'},
 'c6-units':{title:'Länge und Masse umrechnen',quest:'c6-h1'},'c6-time':{title:'Dezimalstunden und Minuten',quest:'c6-h5'},'c6-volume':{title:'Flächen- und Raumeinheiten',quest:'c6-h5',alsoLesson:'c6-area'},
 'c6-add':{title:'Stellenrichtig addieren',quest:'c6-a1'},'c6-sum-smart':{title:'Geschickt addieren',quest:'c6-a4'},'c6-estimate':{title:'Überschlag zur Ergebniskontrolle',quest:'c6-f3'},
 'c6-sub':{title:'Subtrahieren mit Entbündeln',quest:'c6-s1'},'c6-inverse':{title:'Unbekannte Anfangsmenge',quest:'c6-s4'},
 'c6-scale':{title:'Zehnerpotenzen',quest:'c6-m1'},'c6-product':{title:'Dezimalprodukt und Größenordnung',quest:'c6-m2'},'c6-distribute':{title:'Produkte vorteilhaft zerlegen',quest:'c6-m2'},
 'c6-divide-written':{title:'Durch eine natürliche Zahl teilen',quest:'c6-d1'},'c6-divisor':{title:'Dezimalteiler gleichsinnig umformen',quest:'c6-d2'},
 'c6-model':{title:'Passende Rechnung auswählen',quest:'c6-k1'},'c6-operations':{title:'Rechenreihenfolge',quest:'c6-k1'}
};
const dec=(ticks,den=100)=>{const p=Math.log10(den);return (ticks/den).toFixed(p).replace('.',',');};
const number=(text,answer)=>({type:'number',text,answer:String(answer)});
const choice=(text,options,answer)=>({type:'choice',text,options,answer});
const work=(text,fields,answers,rows)=>({type:'work',text,fields,answer:answers.map(String),rows});
export function makeCheck(key,seed=1){
 const n=(seed>>>0)%7+2;let t;
 switch(key){
 case 'c6-place':t=number(`Schreibe als Dezimalzahl: ${n} Einer, 0 Zehntel und ${n+1} Hundertstel.`,dec(n*100+n+1));break;
 case 'c6-fractions':t=number(`Schreibe ${n}/20 als Dezimalzahl.`,dec(n*5));break;
 case 'c6-zeros':t={type:'multi',text:`Welche Schreibweisen sind gleich ${n},040? Wähle alle passenden.`,options:[`${n},04`,`${n},400`,`${n},0400`,`${n},4`],answer:[0,2]};break;
 case 'c6-compare':t={type:'order',text:'Ordne die vier Dezimalzahlen aufsteigend.',items:[`${n},08`,`${n},008`,`${n},8`,`${n},18`],answer:[1,0,3,2]};break;
 case 'c6-line':t={type:'line',text:`Markiere ${n},0${n} auf dem Zahlenstrahl.`,start:n,end:n+.1,step:.01,answer:dec(n*100+n),sparse:true};break;
 case 'c6-round':t=number(`Runde ${n},${n}68 auf Hundertstel.`,`${n},${n}7`);break;
 case 'c6-units':t=work('Trage dieselben Größen in der verlangten Einheit ein.', ['Gramm','Meter'],[n*1000+65,dec(n*100+7)], [[`${n},065 kg =`,{field:0},'g'],[`${n*100+7} cm =`,{field:1},'m']]);break;
 case 'c6-time':t=number(`Wie viele Minuten dauert eine Fahrt von 1,${n} h?`,60+n*6);break;
 case 'c6-volume':t=work('Unterscheide Fläche und Volumen. Ergänze die Einheitenumrechnung.', ['Quadratdezimeter','Liter'],[n*10,n*10],[[`0,${n} m² =`,{field:0},'dm²'],[`0,0${n} m³ =`,{field:1},'l']]);break;
 case 'c6-add':t=work(`Richte ${n},47 + 2,8 schriftlich aus und berechne die Summe.`,['Hundertstelziffer des zweiten Summanden','Summe'],[0,dec(n*100+327)],[[`${n},47 + 2,8□: fehlende Ziffer`,{field:0}],['Summe',{field:1}]]);break;
 case 'c6-sum-smart':t=number(`Berechne geschickt: ${n},25 + 1,75 + 2,6.`,`${n+4},6`);break;
 case 'c6-estimate':t=choice(`Für ${n},8 · 4,2 ist ein Überschlag auf ganze Zahlen sinnvoll. Welches Ergebnis hat die passende Größenordnung?`,[String((n+1)*4),String((n+1)*40),dec((n+1)*4),String((n+1)*400)],0);break;
 case 'c6-sub':t=work(`Berechne ${n+3},04 − 2,67 mit Entbündeln.`,['Hundertstel nach dem Entbündeln','Differenz'],[14,dec((n+3)*100+4-267)],[[`${n+3},04 → nach dem Entbündeln: ${n+2} E, 9 z und`,{field:0},'h'],['Differenz',{field:1}]]);break;
 case 'c6-inverse':t=number(`Nach der Entnahme von 1,85 l bleiben ${n},4 l. Wie viel war vorher vorhanden?`,`${n+2},25`);break;
 case 'c6-scale':t=work('Ergänze beide Rechnungen mit Zehnerpotenzen.', ['Produkt','Quotient'],[`${n},7`,`0,${n}7`],[[`0,0${n}7 · 100 =`,{field:0}],[`${n*10+7} : 100 =`,{field:1}]]);break;
 case 'c6-product':t=work(`Berechne 1,${n} · 0,4. Prüfe zuerst die Anzahl der Nachkommastellen beider Faktoren zusammen.`,['Nachkommastellen zusammen','Produkt'],[2,dec((10+n)*4)],[['Anzahl',{field:0}],['Produkt',{field:1}]]);break;
 case 'c6-distribute':t=choice(`Welcher Rechenweg für ${n} · 2,3 ist korrekt?`,[`${n} · 2 + ${n} · 0,3`,`${n} · 2 + 0,3`,`${n} + 2 + 0,3`,`${n} · 2 · 0,3`],0);break;
 case 'c6-divide-written':t=work(`Teile ${dec(n*124)} : 4. Ergänze auch die Probe.`,['Quotient','Ergebnis der Probe'],[dec(n*31),dec(n*124)],[['Quotient',{field:0}],['Dein Quotient · 4 =',{field:1}]]);break;
 case 'c6-divisor':t=work(`Forme ${dec(n*36)} : 0,3 zu einem ganzzahligen Teiler um und rechne.`,['Neuer Dividend','Neuer Divisor','Quotient'],[dec(n*36,10),3,dec(n*12,10)],[['Gleichwertig',{field:0},':',{field:1}],['Quotient',{field:2}]]);break;
 case 'c6-model':t=choice(`${n} Personen bezahlen je 2,40 €. Dazu kommen einmal 1,50 € für die Gruppe. Welche Rechnung passt?`,[`${n} · 2,40 + 1,50`,`${n} · (2,40 + 1,50)`,`${n} + 2,40 + 1,50`,`(2,40 + 1,50) : ${n}`],0);break;
 case 'c6-operations':t=number(`Berechne ${n},5 + 1,2 · 3.`,`${n+4},1`);break;
 default:throw new Error('Unbekannte Kernkompetenz: '+key);
 }
 return {...t,key,lesson:key,stage:'exam',skill:CHECKS[key].title,introduce:false};
}

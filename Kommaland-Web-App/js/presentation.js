/** 7.2 presentation only. No task answers, quest state or recommendation policy is changed. */
import {esc, icon} from './ui.js';
import {describeAnswer} from './math.js';
export const QUEST_TOPICS=Object.freeze({
 'c6-v1':'Dezimalzahlen und Stellenwerte','c6-v3':'Brüche und Dezimalzahlen',
 'c6-f1':'Dezimalzahlen vergleichen und ordnen','c6-f3':'Runden und Überschlagen',
 'c6-h1':'Größen umrechnen','c6-h5':'Zeit, Fläche und Volumen',
 'c6-a1':'Schriftliche Addition','c6-a4':'Vorteilhaft addieren',
 'c6-s1':'Schriftliche Subtraktion','c6-s4':'Rückwärtsrechnen und Umkehraufgaben',
 'c6-m1':'Gleiche Mengen und Zehnerpotenzen','c6-m2':'Dezimalzahlen multiplizieren',
 'c6-d1':'Schriftliche Division','c6-d2':'Division durch Dezimalzahlen',
 'c6-k1':'Rechenwege auswählen','c6-k4':'Mit Dezimalzahlen planen',
 'c6-master-village':'Stellenwerte und Darstellungen','c6-master-forest':'Zahlengerade und Rundungsgrenzen',
 'c6-master-harbor':'Größen verknüpfen','c6-master-market':'Summen geschickt untersuchen',
 'c6-master-cliffs':'Zahlen rückwärts erschließen','c6-master-mill':'Produkte und Beziehungen',
 'c6-master-cave':'Division und Portionen','c6-master-castle':'Planen und begründen'
});
export function questTopic(q){if(q?.id==='encounter')return 'Dezimalzahlen wiederholen';return QUEST_TOPICS[q?.id]||q?.title?.replace(/^Kurz üben: /,'')||'Dezimalzahlen';}
export const KEY_IDEAS=Object.freeze({
 'c6-place':'Eine Stelle nach rechts bedeutet: Stellenwert ÷ 10.',
 'c6-zeros':'3,5 = 3,50 = 3,500; aber: 3,05 ≠ 3,5.',
 'c6-fractions':'7/100 = 0,07. Zähler und Nenner gleich erweitern: Der Wert bleibt gleich.',
 'c6-compare':'Vergleiche von links: Die erste unterschiedliche Stelle entscheidet.',
 'c6-line':'Zahlunterschied ÷ Anzahl der Zwischenräume = Schrittweite.',
 'c6-round':'Die nächste Ziffer entscheidet: 0–4 abrunden, 5–9 aufrunden.',
 'c6-estimate':'Überschlag: Näherung prüfen. Bei knappen Grenzen exakt rechnen.',
 'c6-units':'Gleiche Größe, andere Einheit: 1 m = 100 cm; 1 kg = 1000 g.',
 'c6-time':'1 h = 60 min; 0,1 h = 6 min; 0,5 h = 30 min.',
 'c6-area':'1 m² = 100 dm² = 10 000 cm².',
 'c6-volume':'1 dm³ = 1000 cm³ = 1 l.',
 'c6-add':'Komma unter Komma. Zehn Einheiten einer Stelle ergeben einen Übertrag.',
 'c6-sum-smart':'Summanden vertauschen und passend zusammenfassen.',
 'c6-sub':'Eine größere Einheit lässt sich in zehn kleinere Einheiten entbündeln.',
 'c6-inverse':'Rest + abgezogene Menge = Anfangsmenge.',
 'c6-scale':'× 10: jede Ziffer erhält den zehnfachen Stellenwert. ÷ 10: den zehnten Teil.',
 'c6-product':'Ein positiver Faktor kleiner als 1 nimmt nur einen Teil des anderen Faktors.',
 'c6-multiply-written':'Wie mit natürlichen Zahlen multiplizieren, dann die Nachkommastellen beider Faktoren berücksichtigen.',
 'c6-distribute':'a · (b + c) = a · b + a · c',
 'c6-divide-written':'Teilen → zurückmultiplizieren → abziehen → nächste Ziffer herunterholen.',
 'c6-divisor':'Dividend und Divisor mit derselben Zehnerpotenz multiplizieren: Der Quotient bleibt gleich.',
 'c6-periodic':'1 : 4 = 0,25; 1 : 3 = 0,333… ≠ 0,33',
 'c6-model':'Was ist gesucht? Welche Angaben und welche Rechenart passen?',
 'c6-operations':'Klammern → Punkt vor Strich. Gleichrangiges von links nach rechts.'
});
// Optional refresher cards also begin with mathematics, not a story setup.
export const REFRESHER_LEADS=Object.freeze({
 'between':'2 < 2,5 < 3. Die Abstände von 2,5 zu 2 und zu 3 sind gleich.',
 'half-name':'Zwei Ganze und eine Hälfte schreiben wir als 2,5.',
 'tenths':'1 m = 10 · 0,1 m. Jedes gleich lange Teilstück ist ein Zehntel Meter.',
 'line-tenths':'Zehn gleich große Schritte zwischen 0 und 1: Jeder Schritt ist 0,1.',
 'round-near':'Beim Runden auf Zehntel zählt der Abstand zu den benachbarten Zehnteln. Genau in der Mitte wird aufgerundet.',
 'metres-cm':'1 m = 100 cm. Ein Hundertstel Meter ist 1 cm.',
 'square-units':'1 m² = 10 dm · 10 dm = 100 dm².',
 'cube-units':'1 m³ = 10 dm · 10 dm · 10 dm = 1000 dm³.',
 'multiply-repeat':'Vier gleiche Mengen: a + a + a + a = 4 · a.',
 'product-then-double':'Zwei gleiche Ergebnisse: erst ein Produkt berechnen, dann verdoppeln.',
 'need-minus-stock':'Gesamtbedarf − vorhandener Vorrat = Fehlbetrag, wenn der Bedarf größer ist.',
 'model':'Gesuchte Größe → passende Angaben → Rechenweg → Ergebnis prüfen.'
});
const LESSON_HEADINGS=Object.freeze({
 'half-name':'Die Dezimalschreibweise 2,5','half-tenths':'Eine Hälfte sind fünf Zehntel',
 'write-hundred':'Hundertstel schreiben','zero-hundred':'Null als Platzhalter',
 'equal-zeros':'Angehängte Nullen','fraction-meaning':'Zähler und Nenner',
 'fraction-quarter':'Ein Viertel als Dezimalzahl','fraction-threequarters':'Drei Viertel als Dezimalzahl',
 'order-thousand':'Dezimalzahlen ordnen','line-tenths':'Zahlengerade mit Zehntelschritten',
 'round-near':'Auf Zehntel runden','estimate':'Überschlag',
 'add-carry':'Bündeln und Übertragen','add-group':'Summanden vorteilhaft zusammenfassen',
 'subtract-whole':'Entbündeln über Nullstellen','missing':'Fehlende Menge bestimmen',
 'rectangle-decimal':'Flächen mit Dezimalmaßen','product-then-double':'Zweistufige Multiplikation',
 'divide-equal':'Division als Verteilen','divide-leftover':'Division mit Dezimalergebnis',
 'portion-tenths':'Division als Portionieren','need-minus-stock':'Bedarf und Fehlbetrag',
 'model':'Sachaufgaben modellieren','one-discount':'Gesamtpreis mit Rabatt',
 'plan-leftover':'Mehrschrittige Planung mit Restmengen'
});
export function knowledgeTitle(l){return LESSON_HEADINGS[l.id]||l.title;}
export function progressDots(total,index=0,solved=false){
 const n=Math.max(0,Math.trunc(total)),i=Math.max(0,Math.min(n,index)),done=Math.min(n,i+(solved?1:0));
 return `<span class="step-dots" role="img" aria-label="${done} von ${n} Aufgaben bearbeitet${i<n?`; aktuelle Aufgabe ${i+1}`:''}">${Array.from({length:n},(_,j)=>`<i aria-hidden="true" class="${j<done?'done':j===i?'current':''}"></i>`).join('')}</span>`;
}
/** Full original explanation remains available. The short lead adds no new prerequisite. */
export function knowledgeContent(l,lab,written=''){
 const statement=KEY_IDEAS[l.id]||REFRESHER_LEADS[l.id]||l.text.match(/^.*?[.!?](?:\s|$)/u)?.[0]?.trim()||l.text;
 return `<div class="concept-layout"><p class="math-key">${esc(statement)}</p>${lab}${written}</div><details class="further-explanation"><summary>Weitere Erklärung</summary><p class="concept-text">${esc(l.text)}</p></details>`;
}
export function feedbackHTML(t,answer){
 // Use the actual accepted input for tasks with more than one valid solution.
 let heading='',explanation=t.why||'';
 if(['number','line'].includes(t.type)){
  const value=String(answer??'').replace('.',',');
  const expression=t.text?.match(/(?:Berechne|Schriftlich:)\s+([\d,]+(?:\s*[+−–:·*\-]\s*[\d,]+)+)\./u)?.[1];
  heading=expression?`${expression} = ${value}`:`${value}${t.unit?' '+t.unit:''}`;
 }else if(t.type==='choice')heading=t.options?.[answer]||describeAnswer(t);
 else if(t.type==='order')heading=answer.map(i=>t.items[i]).join(' → ');
 else if(t.type==='error')heading=`Zeile ${Number(answer)+1}: Fehler gefunden`;
 else if(t.type==='work'){
  // Read the unchanged task instead of hard-coding an answer for a level variant.
  const expression=t.text?.match(/(?:Addition|Subtraktion|Berechne|Schriftlich:)\s+([\d,]+\s*[+−–\-]\s*[\d,]+)[.\s]/u)?.[1];
  const field=t.fields.findIndex(f=>/^(Summe|Differenz|Ergebnis)$/iu.test(f));
  heading=expression&&field>=0?`${expression} = ${String(answer[field]).replace('.',',')}`:describeAnswer(t);
 }else heading=describeAnswer(t);
 if(!heading)heading=explanation||'Richtig';
 return `<div class="feedback correct" role="status"><strong>${esc(heading)} ${icon('check')}</strong>${explanation&&explanation!==heading?`<p>${esc(explanation)}</p>`:''}</div>`;
}
export function helpHTML(buttons){return `<div class="help-disclosure"><button type="button" id="taskHelpToggle" class="secondary-button" aria-expanded="false" aria-controls="taskHelpMenu">${icon('help')}Hilfe <span aria-hidden="true">▾</span></button><div id="taskHelpMenu" class="help-menu" hidden><div class="learning-actions">${buttons}</div></div></div>`;}
export function bindHelp(root){
 const toggle=root.querySelector('#taskHelpToggle'),menu=root.querySelector('#taskHelpMenu');if(!toggle||!menu)return;
 toggle.onclick=()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));};
 // Closing a disclosure must not dismiss the surrounding task or lose its answer.
 menu.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();}});
}

/** Didactic layer for transparent competence goals, low-stakes placement checks
 * and open mathematical workshops. These prompts are intentionally not auto-scored.
 */
export const REGION_GOALS=Object.freeze({
 village:'Ich kann Dezimalzahlen als Anteile und Stellenwerte verstehen, darstellen und zwischen Bruch- und Dezimalschreibweise wechseln.',
 forest:'Ich kann Dezimalzahlen vergleichen, ordnen, auf Zahlengeraden eintragen, runden und Ergebnisse überschlagen.',
 harbor:'Ich kann Größen mit Dezimalzahlen sicher in passende Einheiten umrechnen und in Sachzusammenhängen verwenden.',
 market:'Ich kann Dezimalzahlen passend zum Sachproblem addieren, Ergebnisse überschlagen und meinen Rechenweg prüfen.',
 cliffs:'Ich kann Dezimalzahlen subtrahieren, fehlende Größen bestimmen und meine Rechnung mit einer Umkehroperation prüfen.',
 mill:'Ich kann Dezimalzahlen multiplizieren, Produkte deuten und passende Modelle wie Flächen- oder Preisvorstellungen nutzen.',
 cave:'Ich kann Dezimalzahlen dividieren, Quotienten deuten und Multiplikation und Division als Umkehroperationen nutzen.',
 castle:'Ich kann Dezimalzahlen in mehrschrittigen Sachproblemen vernetzt einsetzen, Lösungswege auswählen und Ergebnisse begründen.'
});


/** Placement evidence only affects navigation. It never mutates completed quests. */
export function learningEvidence(state,quests){
 const evidence={...(state?.completed||{})};
 for(const [region,result] of Object.entries(state?.placement||{})){
  if(!result?.passed)continue;
  for(const q of quests||[])if(q.region===region&&!q.challenge&&!evidence[q.id])evidence[q.id]={placement:true};
 }
 return evidence;
}

export function questCompetencyGoal(q){
 const focus=String(q?.goal||q?.tasks?.[0]?.skill||'den mathematischen Gedanken dieser Quest').replace(/[.]+$/,'');
 return `Ich kann den Gedanken „${focus}“ an Beispielen erklären und anwenden.`;
}
export function questSuccessCriterion(q){
 return 'Ich erkenne passende Aufgaben selbstständig, kann meinen Rechen- oder Denkweg nachvollziehbar erklären und das Ergebnis auf Plausibilität prüfen.';
}

export const PLACEMENT_SKILLS=Object.freeze({
 village:['places-tenths','write-hundred','write-thousand','equal-zeros','fraction-quarter'],
 forest:['compare-tenths','compare-hundred','limits','round-near','estimate'],
 harbor:['metres-cm','kg-grams','ml-litres','time-quarter','money'],
 market:['add-tenths','add-align','add-carry','add-units','estimate'],
 cliffs:['subtract-basic','subtract-exchange','missing','subtract-thousand','two-subtractions'],
 mill:['multiply-integer','multiply-decimal','rectangle-decimal','unit-price','times-hundred'],
 cave:['divide-equal','divide-leftover','portion-hundred','divide-ten','divide-scale'],
 castle:['model','one-discount','operations','plan-leftover','unit-price']
});

/** Reuse already reviewed task material. A placement check deliberately uses only
 * closed response types and no hints; it is a screening, not a formal test.
 */
export function placementTasks(regionId,quests){
 const wanted=PLACEMENT_SKILLS[regionId]||[];
 return wanted.map(skill=>{
  const candidates=quests.filter(q=>q.region===regionId&&!q.challenge).flatMap(q=>q.tasks).filter(t=>t.lesson===skill&&['number','choice'].includes(t.type));
  const t=candidates.find(t=>t.stage==='transfer')||candidates.find(t=>t.stage==='near')||candidates[0];
  return t?{...t,options:t.options?[...t.options]:undefined,placementSkill:skill}:null;
 }).filter(Boolean);
}

export const OPEN_TASKS=Object.freeze({
 village:{
  title:'Dezimalzahl unter der Lupe',mode:'Allein denken → Partnercheck',
  prompt:'Stelle 0,375 auf mindestens zwei verschiedene Arten dar, zum Beispiel mit Stellenwerten, als Bruch/Anteil oder auf einer Zahlengeraden. Erkläre anschließend, warum beide Darstellungen dieselbe Zahl meinen.',
  product:'Skizze oder Notiz mit zwei Darstellungen und einer Begründung.',
  teacher:'Frage nach dem Wert der 3, 7 und 5. Achte darauf, ob Stellenwert und Ziffernwert unterschieden werden.'
 },
 forest:{
  title:'Wer ist wirklich größer?',mode:'Partnerarbeit · begründen statt raten',
  prompt:'Ordnet 0,4 · 0,39 · 0,405 · 0,399 vom kleinsten zum größten Wert. Findet zwei Begründungswege. Widerlegt anschließend den Satz: „Die Zahl mit mehr Nachkommastellen ist immer größer.“',
  product:'Geordnete Zahlenfolge, zwei Begründungen und ein Gegenbeispiel.',
  teacher:'Achte darauf, ob mit Stellenwerten bzw. gleichnamigen Dezimalstellen argumentiert wird und nicht mit der Ziffernanzahl.'
 },
 harbor:{
  title:'Gleiche Größe – andere Einheit',mode:'Zu zweit · Darstellung wechseln',
  prompt:'Ein Band ist 1,25 m lang. Ein zweites Band ist 85 cm lang. Wie lang sind beide zusammen? Löst die Aufgabe auf zwei Wegen: einmal vollständig in Metern und einmal vollständig in Zentimetern. Vergleicht die Ergebnisse.',
  product:'Zwei Rechnungen in verschiedenen Einheiten und eine Erklärung, warum die Ergebnisse gleichwertig sind.',
  teacher:'Prüfe, ob die Umrechnungsfaktoren verstanden werden oder nur ein Komma „verschoben“ wird.'
 },
 market:{
  title:'Genau 10 Euro',mode:'Offene Aufgabe · mehrere Lösungen möglich',
  prompt:'Erfindet einen kleinen Warenkorb mit mindestens drei Preisen mit Dezimalzahlen, der genau 10,00 € kostet. Findet danach eine zweite, deutlich andere Lösung. Beschreibt eine schnelle Überschlagskontrolle.',
  product:'Zwei verschiedene Warenkörbe, Rechnungen und ein Überschlag.',
  teacher:'Frage, wie die Summanden gewählt wurden. Achte auf Stellenwertausrichtung und sinnvollen Überschlag.'
 },
 cliffs:{
  title:'Fehlerdetektiv beim Subtrahieren',mode:'Partnercheck · Fehler erklären',
  prompt:'Jemand rechnet 5,20 − 2,85 = 3,65. Erklärt möglichst genau, warum das Ergebnis nicht stimmen kann. Findet die richtige Differenz und zeigt mindestens eine Kontrolle ohne dieselbe Subtraktion einfach zu wiederholen.',
  product:'Fehlererklärung, richtige Rechnung und eine unabhängige Kontrolle.',
  teacher:'Achte darauf, ob Entbündeln/Stellenwerte verstanden werden und ob die Addition als Umkehroperation genutzt wird.'
 },
 mill:{
  title:'Warum wird das Produkt kleiner?',mode:'Erklären · Modell verwenden',
  prompt:'Vergleicht 0,8 · 0,5 mit 0,8. Warum ist das Produkt kleiner als 0,8, obwohl multipliziert wird? Nutzt eine Skizze, eine Flächenvorstellung oder eine Alltagssituation. Findet zusätzlich ein Beispiel, bei dem ein Produkt größer als beide Faktoren ist.',
  product:'Begründung mit Modell plus Gegenbeispiel.',
  teacher:'Prüfe, ob Multiplikation nur als „größer machen“ verstanden wird oder auch als Anteil/Skalierung.'
 },
 cave:{
  title:'Teilen heißt nicht immer kleiner',mode:'Sachkontexte vergleichen',
  prompt:'Erfindet zwei passende Geschichten zu 4,8 : 0,6. Eine Geschichte soll „Wie viele Portionen?“ bedeuten, die andere „Wie groß ist eine Portion?“. Erklärt, was die 8 im Ergebnis jeweils bedeutet.',
  product:'Zwei Sachgeschichten, Rechnung und Bedeutung des Quotienten.',
  teacher:'Achte auf die Unterscheidung von Aufteilen und Verteilen sowie auf die Einheit des Quotienten.'
 },
 castle:{
  title:'Sternenfest planen',mode:'Mehrschrittige Modellierungsaufgabe',
  prompt:'Plant mit 25,00 € ein kleines Fest für vier Personen. Legt selbst mindestens drei Preise oder Mengen fest. Euer Plan muss eine Addition, eine Multiplikation und mindestens eine weitere passende Rechenoperation enthalten. Schätzt zuerst, rechnet dann genau und begründet, warum euer Ergebnis zur Situation passt.',
  product:'Eigener Plan mit Annahmen, Überschlag, Rechnung und Begründung.',
  teacher:'Frage nach Annahmen, Wahl der Operationen, Einheiten und Plausibilität. Mehrere sinnvolle Lösungen sind ausdrücklich möglich.'
 }
});

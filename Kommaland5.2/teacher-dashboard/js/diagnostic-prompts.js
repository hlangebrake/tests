/** Fachdiagnostische Gesprächsanlässe. Sie dienen der Rekonstruktion von
 * Vorstellungen und Fehlkonzepten; Kennzahlen allein sind keine Diagnose. */
const PROMPTS=Object.freeze({
 village:{
  question:'Zeige 0,47 in einer Stellenwerttafel und auf einer Zahlengeraden. Was bedeutet die 4 in 0,47? Ist 0,5 dasselbe wie 0,50? Begründe.',
  lookFor:'Stellenwert statt bloßer Ziffernfolge; Bedeutung von Zehnteln/Hundertsteln; Verständnis angehängter Nullen.'
 },
 forest:{
  question:'Welche Zahl ist größer: 0,8 oder 0,75? Begründe auf zwei Arten. Ordne danach 0,399 und 0,4 ein.',
  lookFor:'Vergleich über Stellenwerte oder gleichnamige Dezimalstellen; keine Regel „mehr Nachkommastellen = größer“.'
 },
 harbor:{
  question:'Ein Band ist 1,25 m lang. Wie viele Zentimeter sind das? Erkläre, warum dein Umrechnungsfaktor passt.',
  lookFor:'Größenvorstellung und Umrechnungsfaktor; nicht nur mechanisches „Komma verschieben“.'
 },
 market:{
  question:'Rechne 2,7 + 0,35 und schätze vorher das Ergebnis. Warum müssen beim schriftlichen Rechnen bestimmte Stellen untereinander stehen?',
  lookFor:'Stellenwertgerechtes Addieren, tragfähiger Überschlag und Erklärung der Komma-/Stellenausrichtung.'
 },
 cliffs:{
  question:'Jemand rechnet 5,20 − 2,85 = 3,65. Woran erkennst du, dass das nicht stimmen kann? Finde das richtige Ergebnis und kontrolliere es anders.',
  lookFor:'Entbündeln und Stellenwerte; Plausibilitätsprüfung; Addition als Umkehroperation.'
 },
 mill:{
  question:'Warum ist 0,8 · 0,5 kleiner als 0,8, obwohl multipliziert wird? Zeige eine passende Skizze oder Alltagssituation.',
  lookFor:'Multiplikation als Anteil/Skalierung statt ausschließlich als „größer machen“; tragfähiges Modell.'
 },
 cave:{
  question:'Erfinde zwei Geschichten zu 4,8 : 0,6: einmal „Wie viele Portionen?“, einmal „Wie groß ist eine Portion?“. Was bedeutet die 8 jeweils?',
  lookFor:'Unterscheidung von Aufteilen und Verteilen; Bedeutung und Einheit des Quotienten; inverse Beziehung zur Multiplikation.'
 },
 castle:{
  question:'Plane mit 25 € einen Einkauf mit mindestens drei Positionen. Schätze zuerst, rechne dann genau und erkläre, warum du diese Rechenoperationen gewählt hast.',
  lookFor:'Modellierung, Wahl und Verknüpfung von Operationen, Einheiten, Plausibilität und nachvollziehbare Begründung.'
 }
});
export const diagnosticPrompt=topicId=>PROMPTS[topicId]||null;

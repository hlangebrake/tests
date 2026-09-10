import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {QUESTS,REGIONS} from '../js/content.js';
import {LESSONS} from '../js/lessons.js';
import {shouldIntroduce} from '../js/learning-flow.js';
import {MODEL_STAGES} from '../js/quest-models.js';
const ROOT=fileURLToPath(new URL('../',import.meta.url));
let text=`# Kommaland 4.1 · Wissensfluss und sichtbare Questzustände

## Umfang

Alle **45 Questobjekte / 32 tatsächlich verwendeten Modelltypen** sind berücksichtigt. Alle 393 Aufgaben, ihre Antworten, Wissenskarten, Voraussetzungen und die Prüfungslogik bleiben gegenüber Version 4.0 unverändert. Dekorative Bauten ohne Questfunktion sind nicht Teil der Bauzustandslogik.

## Automatische Wissenseinblendung

Entscheidend ist der bereits eingeführte **Gedanke innerhalb der jeweiligen Quest**, nicht der Aufgaben- oder Gruppenindex. Eine identische Wissens-ID wird nur einmal automatisch eingeführt. Manuelles Wiederöffnen bleibt bei Lernaufgaben jederzeit möglich; bei Wegprüfungen bleibt Hilfe gesperrt. Für bereits abgeschlossene Quests beginnt ein Übungsdurchgang direkt mit Aufgaben.

Auch eine von der Quest-Einstiegsrolle gelesene Karte wird im unmittelbar anschließenden Aufgabenstart nicht noch einmal erzwungen. Während einer begonnenen Quest wird die Liste persistiert. Reines Vorab-Lesen ohne gestartete Quest wird nur für die laufende Sitzung gemerkt; es legt keinen künstlichen Aufgabenfortschritt an. Karten an einem allgemeinen Gebietsschild vergeben keine erledigten Aufgaben und werden nicht pauschal als weltweit verstanden behandelt.

Die Liste \`progress[questId].shownLessons\` ergänzt das bestehende Schema 3. Beim Laden alter Daten werden die Gedanken vor den bereits gelösten Schritten abgeleitet. Ein erster, noch ungelöster Schritt eines neuen Gedankens darf dadurch nicht übersprungen werden. Falsche oder fremde IDs werden als optionale UI-Metadaten verworfen. Import, neue Spielstände und Rücksicherung leeren vorübergehende Vorschauinformationen.

### Fachliche Abgrenzung statt blindem Textvergleich

Die Einführung der Hundertstel, der Tausendstel, einer neuen Operation, einer anderen Einheitenbeziehung oder der Wirkung eines Faktors bleibt eigenständig. Titelähnlichkeit, gleiche Bilder und ähnliche Zahlen sind kein ausreichender Grund, Einblendungen zusammenzulegen.

Ein fachlich geprüfter Sonderfall betrifft \`rectangle-decimal\`: Die Karte fasst Flächeninhalt = Länge · Breite (mit m²) und das Multiplizieren zweier Dezimalfaktoren zusammen. Nur wenn **beide** Teilgedanken \`rectangle\` und \`multiply-decimal\` bereits eingeführt wurden, entfällt diese automatische Zusammenfassung. Die manuelle Karte bleibt vollständig vorhanden. Beim direkten Einstieg ohne beide Einführungen wird sie gezeigt. Die spätere Aussage über Faktoren kleiner als 1 bleibt eine neue Einführung.

### Konkrete Einblendefolge

Die Tabelle zählt neue Einführungen für eine frische Quest ohne vorherige manuelle Vorschau. Die Aufgabenpositionen sind einsbasiert. Aufgaben mit bereits bekanntem Wissen erscheinen unmittelbar.

| Quest | Aufgaben | Automatische Einführungen vor Aufgabe | Gedankenzahl |
|---|---:|---|---:|
`;
let auto=0;let regular=0;
for(const q of QUESTS.filter(q=>!q.challenge)){
 const shown=new Set(),positions=[];
 q.tasks.forEach((t,i)=>{if(shouldIntroduce(t,shown)){positions.push(i+1);auto++;shown.add(t.lesson);}});
 regular+=q.tasks.length;
 text+=`| ${q.title} (${q.id}) | ${q.tasks.length} | ${positions.join(', ')} | ${positions.length} |\n`;
}
text+=`\nDie regulären Quests umfassen weiterhin **115 Dreiergruppen / ${regular} Aufgaben**. Bei einem vollständigen frischen Durchlauf ohne Vorschau ergeben sich **${auto} automatische Einführungen statt 115**. Sechs gruppenübergreifende identische Einführungen und eine bereits durch beide Teilgedanken abgedeckte Zusammenfassung entfallen. Die größere Wirkung entsteht beim Fortsetzen, beim erneuten Öffnen und beim Üben abgeschlossener Quests: bereits bekannte Gedanken werden nicht erneut vorgeschaltet.\n\nEs sind weiterhin **83 unterschiedliche Wissenskarten** erreichbar. Dass ${auto} größer als 83 ist, liegt an der bewussten questbezogenen, nicht globalen Einführung. Ein anderes Thema darf einen Gedanken in seinem neuen Kontext einführen.\n\n## Status aus vorhandenen Daten\n\n| Vorhandene Daten | Semantischer Status | Sichtbares Modell |\n|---|---|---|\n| Kein \`progress[id]\`, kein Abschluss | NOT_STARTED | Anfangsmodell (Stufe 0) |\n| Quest geöffnet, \`step=0\`, noch keine richtige Antwort | IN_PROGRESS, 0 Aufgaben gelöst | Weiterhin Anfangsmodell; Lesen repariert nichts |\n| Mindestens eine richtige Antwort | IN_PROGRESS | Arbeitsmodell (Stufe 1) |\n| \`ready=true\`, Bestätigung steht aus | IN_PROGRESS | Weiterhin Arbeitsmodell; „Bereit zum Abschluss“ |\n| \`completed[id]\` vorhanden | COMPLETED | Fertiges Modell (Stufe 2) |\n\nDie Zwischenform ist ein klarer symbolischer Teilaufbau, kein maßstabsgerechter Prozentsatz der gelösten Aufgaben. Sie wächst nicht nach jeder weiteren Aufgabe um ein einzelnes Bauteil. Der vorhandene Schrittzähler zeigt weiterhin den genauen Aufgabenfortschritt. Ein Wiederholungsdurchgang beschädigt keine bereits fertigen Bauten.\n\nDer bestätigte Abschluss bleibt der einzige Commit-Punkt. Nach dem Klick wird gespeichert und die bisherige Aufbauanimation zeigt das fertige Objekt. Diese Animation beginnt jetzt am tatsächlich sichtbaren Arbeitsmodell, nicht wieder am zerstörten Anfang. Bei App-Neustart während der Animation bleibt der gespeicherte Abschluss bestehen. „Weniger Bewegung“ bleibt berücksichtigt.\n\nDie neue Darstellung verändert keine Weg- oder Kollisionsflächen. Verborgene Meisterkristalle bleiben verborgen, bis die bisherigen fachlichen Voraussetzungen erfüllt sind. Die drei Modell-Meshes werden einmal angelegt; Aufgabenwechsel erzeugen keine weiteren.\n\n## Prüfung der Modelltypen\n\nDie folgende Tabelle beschreibt jeweils die dargestellte Geometrie, nicht nur Farbänderungen. Alle 32 Typen wurden mit derselben Kamera in drei Zuständen im lokalen Browser gerendert; ergänzend wurde das Dorf in normaler Spiel-Kameradistanz geprüft. Die fertigen Geometriedaten aller 45 Quests stimmen bytegenau mit Version 4.0 überein.\n\n| Modelltyp | Noch offen | In Arbeit | Abgeschlossen |\n|---|---|---|---|\n`;
for(const kind of [...new Set(QUESTS.map(q=>q.kind))])text+=`| ${kind} | ${MODEL_STAGES[kind].join(' | ')} |\n`;
text+=`\nBei Schleimling, Grottenhüter und Drachen bleiben die Lebewesen unversehrt. Große Schutzrunen werden weniger und verschwinden schließlich. Bei Lichtungen, Bäumen und Vorräten bedeutet die Zwischenform Erschließung, Wachstum oder Versorgung statt Hausbau.\n\n## Zuordnung sämtlicher Questobjekte\n\n`;
for(const region of REGIONS){
 text+=`### ${region.name}\n\n| Quest | Modell | Art |\n|---|---|---|\n`;
 for(const q of QUESTS.filter(q=>q.region===region.id))text+=`| ${q.title} (${q.id}) | ${q.kind} | ${q.challenge?'Meisterherausforderung, zunächst verborgen':'Reguläre Quest'} |\n`;
 text+='\n';
}
text+=`## Ausnahmen und Grenzen\n\nDie fünf zusätzlich in der Modellbibliothek erhaltenen Typen crates, gate, lift, mill und tower besitzen ebenfalls unfertige/teilfertige Varianten, sind aktuell aber keiner der 45 Quests zugeordnet. Die 32-Typen-Browserprüfung bezieht sich auf tatsächlich verwendete Questmodelle. Tore der Wegprüfungen nutzen weiterhin ihre eigene bestehende Öffnungslogik.\n\nDer visuelle Browservergleich prüft Darstellung und UI in Chromium/SwiftShader. Er ist kein Test der Geschwindigkeit oder des WebGL-Verhaltens auf einem physischen iPad. Siehe TESTS.md.\n`;
fs.writeFileSync(ROOT+'DARSTELLUNGEN.md',text);
console.log(JSON.stringify({quests:QUESTS.length,modelTypes:new Set(QUESTS.map(q=>q.kind)).size,automaticIntroductions:auto,lessons:Object.keys(LESSONS).length}));

# Kommaland 2.0 · Testprotokoll

**Stand: 9. September 2026. Getestet wurde lokal, nicht auf einem physischen iPad.**

## Ergebnis

33 automatisierte Node-Tests bestanden. Zwei automatisierte Browser-Durchläufe erreichten jeweils alle 37 Quests und 122 richtige Teilantworten. Der ausführliche Durchlauf enthält zusätzlich einen absichtlich falschen Versuch und einen Tipp. Der abschließende Durchlauf wurde nochmals mit den finalen Laufzeitdateien ausgeführt. Beide meldeten keine unbehandelten JavaScript-Fehler und `gl.getError() === 0`.

Die Tests prüfen Funktionsfähigkeit und Konsistenz. Sie beweisen weder die dauerhafte Speicherung auf Schulgeräten noch Unterrichtswirksamkeit oder eine vollständige mathematische Diagnose. Das automatisierte Einsetzen der vorgegebenen Antwortschlüssel ist insbesondere kein unabhängiger Beweis, dass jeder redaktionelle Antwortschlüssel sachlich richtig ist. Zusätzlich wurden ausgewählte neue Antworten unabhängig nachgerechnet; alle Aufgaben, Beispiele und Lösungen stehen zur fachlichen Durchsicht in `AUFGABEN.md`.

## 1. Rechenprüfung und Inhalte

`tests/math.test.js` prüft Dezimalkomma/Punkt, angehängte Nullen, Null vor dem Komma, exakte Gleichheit auch ohne Fließkomma-Toleranz sowie die Ablehnung unzulässiger Ausdrücke. Sechs Antwortformate werden mit richtigen und falschen Antworten geprüft. Alle 37 IDs sind eindeutig; alle 122 Aufgaben enthalten Text, Hilfe, Begründung und einen formal gültigen Antwortschlüssel.

`tests/learning.test.js` prüft die 83 Wissenskarten mit jeweils einem dreischrittigen Beispiel, die Zuordnung jeder Teilaufgabe, konkrete und zyklenfreie Voraufgaben, die kleinschrittige Dorfroute und das Erreichen des Finales ohne die beiden gekennzeichneten Zusatzwege. Ein gesonderter Test stellt sicher, dass Traglastvergleiche im Hafen die vorbereitende Vergleichsquest im Wald voraussetzen. Erinnerungsrätsel werden gegen die wirklich abgeschlossenen Aufgaben geprüft, nicht gegen besuchte Regionen.

## 2. Welt, Wege und Bauen

`tests/world.test.js` erzeugt die komplette Geometrie mit einem CPU-Testadapter ohne GPU. 45 interaktive Ziele entsprechen 37 Questobjekten und acht Infoschildern. Für jedes Ziel werden Wegsuche, begehbarer Endpunkt in Interaktionsreichweite und der vollständige simulierte Lauf vom Startdorf geprüft. Kein Ziel blieb im Test unerreichbar oder stecken.

Zusätzlich geprüft: alle Verbindungswege liegen auf derselben Landfläche; das Gelände hat keine sprunghaften Inselhöhen; Wald außerhalb der Wege ist gesperrt. Die Aufbauanimation beginnt mit verborgenem neuen Objekt, zeigt einen Zwischenstand und endet genau einmal mit dem vollständigen Objekt. Die reduzierte Bewegungsvariante wird getrennt geprüft.

Der ausführliche Browser-Test erreicht die erste Weglaterne durch einen echten Pointer-Klick auf ihr Weltzeichen und die laufende Figur. Weitere Quests werden im Test räumlich angesprungen, damit die gesamte Inhaltsprüfung nicht aus langen Laufzeiten besteht. Die flächendeckende Laufprüfung findet separat im Welt-Test statt.

## 3. Abschlusszeitpunkt und Hilfen im Browser

Geprüfter Ablauf: letzte richtige Antwort → `ready` im Spielstand, noch kein fertiges Bauwerk → Seiten-Neuaufbau im Testkontext → direkt fortsetzbarer Abschluss ohne zusätzlichen Antwortversuch → „Quest abschließen“ → verdeckte Schriftrolle, sichtbare Welt und Aufbauhinweis → vollständiges Objekt → Erfolgsrolle.

Die erste Aufbauanimation läuft im ausführlichen Browser-Test mit normaler Dauer von 2,65 Sekunden Spielzeit. Alle weiteren werden über die echte Einstellung „Weniger Bewegung“ mit 0,25 Sekunden Spielzeit ausgeführt. Im abschließenden Schnelltest laufen alle 37 Bauabschlüsse mit dieser reduzierten Variante und ihrem tatsächlichen Animationstimer; der Timer wird nicht manuell vorgespult.

Ein Beispiel zeigt zuerst einen Denkschritt und gibt zwei weitere einzeln frei. Getestet werden der direkte Beispielaufruf aus einer Aufgabe sowie der verschachtelte Weg Aufgabe → Wissen → Beispiel → Wissen → Aufgabe. Eine zuvor eingegebene Antwort `8,2` bleibt unverändert erhalten; der Hilferücksprung erzeugt keinen Antwortversuch. Fehlerfeedback und der aufgabenspezifische Tipp werden ebenfalls aufgerufen.

## 4. Tablet-Layouts

Wissenskarte, Beispiel, Aufgabe und Karte wurden bei 1180 × 820, 1024 × 768, 768 × 1024 und 820 × 1180 CSS-Pixeln geprüft, auch mit eingeschalteter größerer Schrift. Geprüft werden horizontales Überlaufen, Lage des Fensters innerhalb des Bildschirms und Erreichbarkeit der Fußleisten. Die durchlaufenen Kombinationen sind in `tests/browser-results.json` aufgeführt. Längerer Inhalt darf innerhalb einer Schriftrolle scrollen; die äußere Seite soll nicht scrollen.

Diese Viewports sind Tablet-Größen, keine Emulation von Safari. Sichtprüfung erfolgte an tatsächlichen Screenshots der Anwendung, einschließlich Dorf, Lernlandkarte, Einstieg, Beispiel, Aufgabe im Hochformat und Aufbauhinweis. Die Aufnahmen sind keine generierten Entwurfsbilder.

## 5. Speicherung und Migration

`tests/state.test.js` prüft Rundreise durch JSON, Einstellungen, Position, ungültige Daten, unbekannte IDs, Feldfilterung, Speicherfehler, Snapshot-Wiederherstellung, bewusstes Ersetzen und Rücksicherung. Schema 1 wird in Schema 2 umgewandelt: fertige Bauwerke bleiben, alte Teilaufgaben starten neu, die neue Weglaterne bleibt offen. Der installationsbezogene alte Speicherschlüssel wird weiterhin gefunden.

Der Browser-Test erzeugt einen echten JSON-Download und liest ihn wieder. Beschädigte JSON-Daten dürfen die 37 fertigen Quests nicht löschen. Ein gültiger Import verlangt erst eine Bestätigung; die Rücksicherung stellt den vorigen Stand wieder her. Ein Version-1-Import erklärt die Migration und erhält alte fertige Bauwerke. Anschließend wird wieder auf den vollständigen Version-2-Stand zurückgesichert.

**Wichtige Einschränkung:** Im Browser-Test ist localStorage durch einen In-Memory-Speicher ersetzt. Persistenzlogik, Export, Dateieinlesen und Import-UI werden ausgeführt; dauerhafte Speicherung über echte Safari-Neustarts, private Sitzungen oder Home-Bildschirm-Installationen wird dadurch nicht getestet.

## 6. Offline-Dateien und Auslieferung

`tests/offline.test.js` führt den Service Worker in einem Node-Testkontext mit Cache-/Fetch-Adaptern aus. Alle 16 vorab vorgesehenen Dateien existieren. Unterverzeichnis, Querystrings, Cache-Treffer sowie das Nicht-Abfangen fremder Domains und schreibender Requests werden geprüft. Alle JavaScript-Dateien bestehen zusätzlich `node --check`.

Das ist ein simulierter Service-Worker-Test. Nicht geprüft sind eine reale Installation unter HTTPS, Browser-Cache-Updates auf einem Schulserver oder ein Offline-Neustart auf iPadOS. Für diese Punkte bleibt die folgende Abnahme erforderlich.

## Testumgebung und Reproduzierbarkeit

Node.js 22; Chromium 144.0.7559.96 unter Xvfb; WebGL über SwiftShader; Playwright. Die verwaltete Browserumgebung blockiert normale Testnavigation auf den lokalen HTTP-Server. Daher lädt `tests/browser_harness.py` die lokalen Module, HTML und CSS in einen isolierten Testkontext. Browserrichtlinien wurden nicht verändert. Es wird die echte DOM-Oberfläche und WebGL-Geometrie ausgeführt, aber keine echte Server-Auslieferung oder Service-Worker-Registrierung.

```sh
npm test
xvfb-run -a python tests/browser_test.py
xvfb-run -a python tests/final_check.py
```

Für die Browser-Tests müssen Python, Playwright, Chromium und Xvfb installiert sein. Sie sind keine Laufzeit-Abhängigkeiten der Web-App. Test-Screenshots entstehen bei Bedarf im Ordner `test-artifacts/`.

Nachweise: `tests/node-results.txt`, `tests/browser-results.json`, `tests/final-source-results.json`.

## Noch erforderliche Abnahme auf einem echten Schul-iPad

1. Alle Laufzeitdateien unter der späteren HTTPS-Adresse bereitstellen. In Safari öffnen; im Rucksack muss „Kommaland 2.0“ stehen. Beim Update vorher einen JSON-Export anlegen.
2. Bewegung per Steuerkreis und Bodentippen prüfen, dann Waldgrenzen, Wegsuche, nahes Hervorheben und Öffnen eines Objekts testen. Auch Hochformat und größere Schrift ausprobieren.
3. Die erste Quest lösen. Vor dem Abschluss muss die Laterne noch unfertig sein; nach dem Knopfdruck muss die Welt sichtbar werden und die Laterne aufgebaut werden. Auch „Weniger Bewegung“ testen.
4. Eine Zahl eintippen, Wissen und Beispiel öffnen, zurückkehren. Die Eingabe muss erhalten bleiben. Eine teilweise gelöste und eine zum Bauen bereite Quest nach App-Neustart fortsetzen.
5. Export nach „Dateien“, bestätigten Import und Rücksicherung testen; danach den Browser beziehungsweise die installierte Web-App vollständig schließen und neu öffnen.
6. Zum Home-Bildschirm hinzufügen, einmal vollständig online laden, anschließend WLAN ausschalten und die App neu starten. Gerätespeicher und Stand vor/nach dem Wechsel zwischen Safari und Home-Bildschirm prüfen.
7. Auf dem tatsächlich verwendeten iPad längeres Spielen, Geräteleistung, Erwärmung und gegebenenfalls den Sparmodus prüfen. Abschließend mit einigen Lernenden prüfen, ob Texte und Beispiele ohne zusätzliche Erklärung verständlich sind.

**Nicht getestet:** echtes Safari/iPadOS, reale Touch-Hardware, Apple Pencil, Audio-/Vollbildberechtigungen auf iPadOS, Home-Bildschirm-Installation, reale Offline-Neustarts, dauerhafte Speicherbereinigung und Unterrichtseinsatz mit einer Lerngruppe.

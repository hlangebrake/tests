# Kommaland 4.1
## Weniger Wiederholungen · sichtbarer Baufortschritt

**Version 4.1.0.** Statisch hostbare 3D-Lernwelt für Dezimalzahlen: HTML, CSS, JavaScript und prozedurale WebGL-Grafik. Kein Backend, keine Anmeldung, kein CDN und keine Laufzeit-Bibliotheken. Das Paket enthält die vollständige App, nicht nur einen Patch.

Die fachlichen Inhalte aus Version 4.0 bleiben unverändert: **45 Quests mit 393 Teilaufgaben, 83 interaktive Wissenskarten**, acht Lernorte und Wegprüfungen an elf Verbindungen in 22 Richtungen. Die vorliegende Änderung betrifft die Präsentation, nicht Lernziele, Antwortschlüssel, Testanforderungen oder Belohnungen.

## Die beiden Änderungen

### Wissen einmal einführen, bei Bedarf wieder öffnen

Die App merkt sich pro Quest, welche Gedanken bereits angezeigt wurden. Ein neuer Aufgabenblock löst nicht mehr automatisch dieselbe Erklärung aus. Fachlich neue Teilgedanken werden weiterhin eingeführt. Die geprüfte Kombination zweier bekannter Gedanken kann ebenfalls ohne erneute Einblendung fortgesetzt werden; bloß ähnlich klingende Texte werden nicht automatisch gleichgesetzt.

In normalen Lernaufgaben bleiben **„Wissen anzeigen“**, **„Ein Beispiel lesen“** und **„Tipp“** verfügbar. Ein Hilferücksprung erhält die laufende Antwort. Bereits abgeschlossenes Wissen wird auch bei „Noch einmal üben“ nicht erneut automatisch vorgeschaltet. Wegprüfungen bleiben hilfefrei.

### Unfertig → in Arbeit → fertig

Alle 45 Questobjekte sind anhand ihrer 32 Modelltypen geprüft. Eigene Anfangs- und Zwischenmodelle zeigen Lücken, Grundmauern, lose Bauteile, offene Rahmen, leere Gefäße und teilweise versorgte Lichtungen. Bereits fertige Modelle bleiben unverändert.

| Lernstand | Sichtbare Darstellung |
|---|---|
| Nicht begonnen oder noch keine richtige Teilantwort | Deutlich beschädigtes oder unfertiges Anfangsmodell. Öffnen, Lesen und Fehlversuche bauen nichts auf. |
| Mindestens eine richtige Teilantwort | Teilaufbau: zum Beispiel offene Wände und Dachbalken, ein Becken ohne fertige Wassersäule oder eine einzelne Zelthälfte. |
| Alle Aufgaben richtig, Abschluss noch nicht bestätigt | Weiterhin das Arbeitsmodell; Beschriftung „Bereit zum Abschluss“. |
| „Quest abschließen“ bestätigt | Vollständiges Modell, mit der bestehenden Aufbauanimation vom sichtbaren Teilaufbau zum Endzustand. |

Nahe Questzeichen ergänzen „Noch offen“, „In Arbeit · …“ oder „Fertig“. Die gedämpften zukünftigen Zeichen bleiben gedämpft. Bei lebendigen Rätselgegnern zeigen Schutzrunen den Fortschritt; Tiere und Bewohner werden nicht als verletzt dargestellt. Landschaftsdekoration ohne Questfunktion bleibt unverändert.

Die vollständige Objektprüfung und die Regeln zur Wissenseinblendung stehen in **`DARSTELLUNGEN.md`**.

## Update von Version 4.0

1. Den aktuellen Spielstand vorsichtshalber über den Rucksack als JSON exportieren.
2. **Den gesamten Paketinhalt im bisherigen Hosting-Verzeichnis ersetzen**, nicht nur `index.html`. Neu sind insbesondere `js/learning-flow.js` und `js/quest-models.js`.
3. Alle alten Kommaland-Tabs und Home-Bildschirm-Fenster schließen, erneut öffnen und im Rucksack **„Kommaland 4.1“** prüfen. Alte und neue App nicht gleichzeitig unter derselben Installation betreiben.

Version-4-Spielstände behalten **genau dieselben Aufgabenpositionen, Questabschlüsse, Gebietssiegel, Vorwissensnachweise, pausierten Prüfungen und Einstellungen**. Es gibt kein Zurücksetzen und keine neue Zuordnung der Aufgabenfolge. Angebrochene Bauwerke sehen danach entsprechend ihrem schon erreichten Stand teilweise aufgebaut aus. Bereits fertige Bauwerke bleiben fertig. Ein noch ausstehender Bestätigungsklick bleibt ausstehend.

Speicherschema **3** und der pfadgebundene lokale Speicherschlüssel sind unverändert. Die einzige ergänzte Information ist die optionale Liste `progress[questId].shownLessons`. Sie steuert nur die Einblendung; sie verleiht keine gelöste Aufgabe und keinen Kompetenznachweis. Fehlt die Liste in einem älteren Spielstand, werden bereits eingeführte Gedanken aus den davor gelösten Aufgaben abgeleitet.

Die schon vorhandene Migration aus den älteren Versionen 1–3 bleibt bestehen; deren historische Regeln unterscheiden sich von diesem reinen 4.0→4.1-Update. Zur Rückkehr zu einer älteren App-Version die vorher exportierte Sicherung verwenden. Ein Rückwärtsupdate wird nicht als neuer Funktionsumfang zugesagt.

## Statisches Hosting

Für den Betrieb gehören zusammen:

```text
index.html
styles.css
manifest.webmanifest
sw.js
icons/                     drei lokale Icondateien
js/                        alle 19 JavaScript-Dateien
```

Dokumentation, Tests und Werkzeuge werden zur Laufzeit nicht gebraucht. Es gibt keinen Build-Schritt. Ein Unterverzeichnis ist möglich. Für den vorgesehenen Home-Bildschirm-/Offline-Betrieb HTTPS verwenden; JavaScript-Dateien müssen mit passendem MIME-Typ ausgeliefert werden. Die vorhandene Offline-Installation benötigt eine erfolgreiche erste Online-Auslieferung. Nicht direkt aus der ZIP oder über `file://` starten.

Lokal am Entwicklungsrechner:

```sh
python3 -m http.server 8080
```

An diesem Rechner anschließend `http://localhost:8080/` öffnen. Auf dem iPad bezeichnet `localhost` dagegen das iPad, nicht den Entwicklungsrechner. Auf dem iPad ist der vorgesehene Weg, die gehostete App in Safari zu öffnen und über Teilen zum Home-Bildschirm hinzuzufügen. Vollbild wird zusätzlich angeboten, soweit der Browser den Aufruf unterstützt.

## Bedienung und Sicherungen

Touch-Steuerkreis ziehen oder Boden antippen; nahe Objekte auswählen. Tastatur: WASD/Pfeile, E/Leertaste zur Interaktion, M für Karte, Esc zum Schließen. Das Zahlenfeld akzeptiert Dezimalkomma und über eine Tastatur auch den Dezimalpunkt. Größere Schrift, weniger Bewegung und Sparmodus befinden sich im Rucksack. Der äußere Bildschirm scrollt nicht; längere Rollen scrollen innerhalb ihres Fensters.

Gesichert werden bestätigte Teilschritte, Position, Quests, Wissenseinblendungen laufender Quests, Siegel, Testfortschritt und Einstellungen. Noch nicht abgegebene Antworten und vorübergehende Schaubildeinstellungen sind keine dauerhaften Teilschritte. Import prüft die Datei und verlangt eine Bestätigung. Eine Rücksicherung erhält den vorherigen Stand; die maximale Dateigröße beträgt 1 MB.

Es gibt keine automatische Synchronisation zwischen Geräten. Browserdaten können gelöscht werden; private Sitzungen sind kein verlässlicher dauerhafter Speicher. Regelmäßige JSON-Exporte bleiben erforderlich. Das lokale Lernspiel ist kein manipulationssicheres Notensystem; Aufgaben und Antwortschlüssel gehören zur statischen App.

## Dokumentation und Tests

`AENDERUNGEN.md` beschreibt dieses Update. `DARSTELLUNGEN.md` enthält die Prüfung aller Questmodelle und die Einblenderegeln. `TESTS.md` dokumentiert die tatsächlichen Tests und Grenzen. Lernkonzept, Voraussetzungen, Aufgaben/Lösungen, Wegprüfungen und Wissensmodelle stehen weiterhin in `DIDAKTIK.md`, `LERNWEG.md`, `AUFGABEN.md`, `PRUEFUNGEN.md`, `SCHAUBILDER.md` und `MATHEMATIK-PRUEFUNG.md`.

```sh
npm test
# Optionale Browser-Prüfungen mit installierten Testwerkzeugen:
xvfb-run -a python3 tests/browser_regression.py
xvfb-run -a python3 tests/visual_browser.py
xvfb-run -a python3 tests/browser_presentation.py
xvfb-run -a python3 tests/model_gallery.py
# Dokumentation aus den Daten neu erzeugen:
node tools/documentation.mjs
node tools/presentation-documentation.mjs
```

Die Browserprüfungen verwenden Chromium mit einem lokalen Quellcode-Harness und simuliertem `localStorage`. **Ein physisches iPad, echtes Safari, dauerhafter Browserspeicher und echter Offline-Neustart wurden nicht getestet.** Die konkrete Geräte-Abnahme steht in `TESTS.md`.

# Kommaland 2.0
## Eine zusammenhängende 3D-Lernlandschaft für Dezimalzahlen

**Version 2.0.0 · 9. September 2026**

8 Lernorte, 37 Quests, 122 feste Teilaufgaben, 83 kurze Wissensschritte und 83 zugeordnete Beispiele mit jeweils drei aufdeckbaren Denkschritten. Das Paket ist statisch hostbar: HTML, CSS und JavaScript, prozedurale WebGL-Grafik, keine Laufzeit-Bibliotheken, kein CDN, keine Anmeldung und kein Backend.

## Gegenüber Version 1

Das Gelände ist nun eine einzige zusammenhängende Landfläche mit unregelmäßigen Lichtungen, geschwungenen Waldpfaden, Küste und Felsgrenzen. Es gibt keine getrennten runden Lerninseln und keine Brücken als Verbindungen zwischen den Lernorten. Dichte Wälder und Berge begrenzen den begehbaren Bereich.

Der Einstieg umfasst jetzt acht statt vier Dorfprojekte. Zuerst wird die Mitte zwischen 2 und 3 entdeckt, dann die Schreibweise 2,5, danach zehn gleich große Teile und fünf Zehntel als Hälfte. Hundertstel, Null als Platzhalter, Tausendstel und die Erinnerung an Brüche kommen in eigenen Schritten. Jede Teilaufgabe hat eine passende Wissenskarte und ein separates Lösungsbeispiel. Die Übersicht in `LERNWEG.md` dokumentiert die Voraussetzungen.

Ein Bauwerk wird erst nach „Quest abschließen“ fertiggestellt. Die Schriftrolle schließt, die Kamera richtet sich auf das Objekt, das alte Objekt verschwindet und die tatsächliche fertige Geometrie wird von unten nach oben sichtbar. Danach öffnet sich die Erfolgsrolle. Unter „Weniger Bewegung“ dauert der Übergang nur kurz.

## Statisch hosten

Den gesamten Inhalt des Pakets zusammen auf einen statischen Webserver laden. Benötigt werden:

```
index.html
styles.css
manifest.webmanifest
sw.js
icons/
js/app.js          js/content.js       js/lessons.js
js/terrain.js      js/world.js         js/engine.js
js/ui.js           js/math.js          js/state.js
```

**Die neuen Dateien `js/lessons.js` und `js/terrain.js` mit hochladen.** Ein Unterverzeichnis ist möglich. Keine Installation von npm-Paketen und kein Build-Schritt sind zum Betrieb nötig. Der Host muss JavaScript mit einem passenden MIME-Typ ausliefern.

Für Unterricht und Home-Bildschirm-Installation eine HTTPS-Adresse verwenden. [2] HTML nicht direkt aus einer ZIP oder der Dateien-App öffnen. Lokal kann ein Webserver gestartet werden:

```sh
python3 -m http.server 8080
```

Dann am selben Rechner `http://localhost:8080/` öffnen. Auf einem iPad bezeichnet `localhost` dagegen das iPad selbst.

In Safari über Teilen → gegebenenfalls „Mehr“ → „Zum Home-Bildschirm“ hinzufügen; soweit angeboten „Als Web-App öffnen“ aktivieren. [1] Die App enthält außerdem eine Vollbild-Schaltfläche mit einem Hinweis, falls der Browser den direkten Vollbildaufruf nicht anbietet. Ein Service Worker speichert die App-Dateien für einen Offline-Start nach erfolgreicher Erstinstallation. Echte Installation und Offline-Neustart wurden in dieser Umgebung nicht auf einem iPad geprüft.

## Vorhandene Installation aktualisieren

**Zuerst auf jedem benutzten Gerät den Spielstand im Rucksack als JSON exportieren.** Danach alle Laufzeitdateien gemeinsam ersetzen, nicht nur die HTML-Datei. Die neue Cache-Version endet auf `v2.0.0` (mit installationsbezogenem Präfix). Bereits geöffnete Seiten können noch alten JavaScript-Code ausführen: nach dem Update alle noch geöffneten Kommaland-Tabs und Web-App-Fenster schließen und die neue Version öffnen. Alte und neue Version nicht gleichzeitig im selben Installationsordner benutzen.

Die lokale Speicherkennung bleibt absichtlich mit Version 1 kompatibel. Version-1-Dateien werden beim Lesen in Schema 2 umgewandelt. Abgeschlossene Quests und deren Bauwerke bleiben erhalten; die neu eingefügten Quests bleiben offen. **Angefangene, aber nicht abgeschlossene Aufgaben aus Version 1 starten neu**, weil Reihenfolge und Inhalte verändert wurden. Die App erklärt das bei automatischer Migration beziehungsweise vor dem Import. Der Einstieg wird auf die neue Weglaterne gesetzt. Alte Positionen werden auf begehbares Gelände versetzt, falls nötig.

Version-2-Dateien erhalten auch den Zustand „alle Antworten richtig, Bauabschluss noch nicht bestätigt“. Erst die ausdrückliche Bestätigung baut das Objekt. Bei einem Neustart während einer schon bestätigten Animation bleibt das Bauwerk fertig; die Animation muss nicht erneut abgespielt werden.

## Bedienung

Den Steuerkreis ziehen oder auf den Boden tippen. Die Figur sucht einen begehbaren Weg. Ein nahes Objekt wird hervorgehoben; direkt antippen oder die Interaktionsschaltfläche benutzen. Weiter entfernte sichtbare Questzeichen setzen zunächst ein Laufziel. Auf der Karte werden ausgewählte Orte ebenfalls angelaufen, nicht aus der Ferne bearbeitet.

Wissen ist an den Infoschildern erreichbar und erscheint vor jedem Aufgabenschritt in einer kleinen Karte. In der Aufgabe stehen **Wissen lesen**, **Ein Beispiel lesen** und **Tipp** zur Verfügung. Das Beispiel zeigt andere Zahlen oder eine parallele Situation. Seine Denkschritte werden nacheinander aufgedeckt. Beim Zurückgehen bleibt die bereits eingegebene Antwort stehen. Hilfe öffnet keine nächste Quest und zählt nicht als falscher Versuch.

Zahlen werden auf dem eigenen Bildschirm-Zahlenfeld eingegeben. Einheiten stehen neben dem Feld. 0,5, 0.5 und 0,50 werden exakt als gleichwertig geprüft; 0,05 ist ein anderer Wert. Rechenausdrücke werden nicht ausgewertet. Tastatur: WASD/Pfeile bewegen, E/Leertaste interagieren, M Karte, Esc schließen. Bei Aufgaben funktionieren Ziffern, Komma/Punkt, Rücktaste und Enter.

Der äußere Bildschirm scrollt nicht. Lange Schriftrollen scrollen nur innen. Die App unterdrückt Browser-Zoomgesten; betriebssystemseitige Bedienungshilfen bleiben außerhalb ihrer Kontrolle. Größere Schrift, weniger Bewegung und ein Eco-Modus sind im Rucksack verfügbar.

## Spielstand und Datenschutz

Position, abgeschlossene Quests, geprüfte Teilschritte, Einstellungen und einfache Hilfen-/Versuchszähler werden lokal gespeichert. Eine noch nicht geprüfte Eingabe bleibt beim Öffnen von Hilfen in der aktuellen Sitzung erhalten, wird aber nicht als dauerhafter Teilschritt gespeichert. Speicherung erfolgt nach wichtigen Aktionen, regelmäßig im Spiel und beim Hintergrundwechsel.

JSON-Export, Import mit Vorschau/Bestätigung und Rücksicherung befinden sich im Rucksack. Vor einer Übernahme wird die Datei geprüft; fremde Felder, HTML und unbekannte Quest-IDs werden nicht als Spielinhalt übernommen. Eine Importdatei darf höchstens 1 MB groß sein. Es gibt keine Gerätesynchronisation, Lernkonten, Analytics oder Serverübermittlung von Antworten.

Lokaler Browserspeicher ist kein dauerhafter Backup-Dienst. Das Löschen von Websitedaten, private Sitzungen oder Gerätewechsel können den Stand verlieren lassen. [3] Bei gemeinsam genutzten Geräten persönliche JSON-Sicherungen vorsehen. Browser und Home-Bildschirm-App können unterschiedliche Speicherumgebungen verwenden; vor einem Wechsel exportieren.

## Inhalt, Grenzen und Anpassung

Die fachliche Lernreise, die Voraussetzungen und die bewusst ausgelagerten Zusatzwege stehen in `DIDAKTIK.md` und `LERNWEG.md`. `AUFGABEN.md` enthält alle Aufgaben mit Lösungen sowie den zugeordneten Wissens- und Beispieltexten. Es ist eine Dokumentation für Lehrkräfte und wird nicht als Seite der Lernenden eingeblendet.

Die Spielwelt, Aufgaben und Beispiele sind eigenständig für dieses Paket gestaltet. Der curriculare Bezug ist im Lernkonzept belegt. Die App ist Lernmaterial, kein manipulationssicheres Prüfungs- oder Notensystem. Richtige Antworten allein beweisen kein dauerhaftes Verständnis. Es gibt noch keine Erprobung mit einer Lerngruppe und keine physische Safari-/iPad-Abnahme.

Inhalte ändern: `js/content.js` enthält Aufgaben, Antwortschlüssel und konkrete Voraufgaben; `js/lessons.js` die Wissens-/Beispielkarten. `js/terrain.js` bestimmt Landfläche, Lichtungen und Wege gemeinsam für Welt, Kollision und Karte. `js/world.js` enthält Modelle, Navigation und Aufbauanimation; `styles.css` gestaltet die Oberfläche. Nach Inhaltsänderungen mit anderer Aufgabenreihenfolge die Spielstand-Migration prüfen; nach Veröffentlichung den Cache-Namen in `sw.js` ändern.

## Tests

```sh
npm test
# Browser-Suite mit installiertem Playwright, Chromium und Xvfb:
xvfb-run -a python tests/browser_test.py
```

`TESTS.md` nennt die tatsächlich geprüften Fälle und Grenzen. Die Browser-Suite verwendet im verwalteten Testsystem einen Offline-Modul-Harness und einen In-Memory-Ersatz für localStorage, aber echte DOM-Interaktionen und WebGL-Darstellung. Sie testet keine reale HTTPS-Auslieferung, Safari-Installation oder dauerhafte Gerätespeicherung.

## Dateien zum Nachlesen

`DIDAKTIK.md` – Lernidee, Reihenfolge und curriculare Einordnung.  
`LERNWEG.md` – alle Quests und ihre konkreten Wissensvoraussetzungen.  
`AUFGABEN.md` – 122 Aufgaben, Lösungen, Wissenskarten und Beispiele.  
`AENDERUNGEN.md` – Änderungen und Migration.  
`TESTS.md` – Testprotokoll und Geräte-Abnahme.

## Technische Quellen

[1] Apple, iPad-Benutzerhandbuch: Website-Symbol zum Home-Bildschirm hinzufügen. https://support.apple.com/de-de/guide/ipad/ipadc602b75b/ipados

[2] MDN, Service Worker API: sichere Kontexte und Installation. https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

[3] MDN, Window.localStorage: Herkunftsbindung, private Sitzungen und mögliche Speicherfehler. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

Quellen am 9. September 2026 eingesehen. Die Hinweise ersetzen keine Geräte-Abnahme der konkreten App.

# Kommaland 4.0
## Lernwege, Wegprüfungen und Meisterherausforderungen

**Version 4.0.0.** Eine statisch hostbare 3D-Lernwelt für Dezimalzahlen: HTML, CSS und JavaScript, prozedurale WebGL-Grafik, keine Laufzeit-Bibliotheken, kein CDN, kein Backend, keine Anmeldung. Spielstände bleiben auf dem Gerät und können als JSON exportiert werden.

Die acht Lernorte enthalten **37 reguläre Quests mit 345 Teilaufgaben** und **acht besondere Herausforderungen mit jeweils sechs Aufgaben**: zusammen **45 Quests und 393 Teilaufgaben**. Hinzu kommen Wegprüfungen an elf Verbindungen in insgesamt 22 Laufrichtungen. Die **83 Wissenskarten mit interaktiven Schaubildern und eigenen Beispielen** bleiben erhalten.

## Was neu ist

Noch nicht empfohlene Questzeichen sind in der Welt stark gedämpft (13 % Deckkraft, solange nicht unmittelbar ausgewählt). Nahe Objekte bleiben antippbar. Reguläre Quests haben nun eine Vorwissenswarnung mit „Warnung ignorieren“ statt einer harten Sperre. Der nächste empfohlene Schritt führt weiterhin zu Fuß zum Infoschild.

Die Landschaft unterscheidet Dorf, Wildpfad, Küste, Marktgasse, Felslager, Weide, Kristallgarten und Burglager stärker. Pferdeunterstände, Rehe, Futterküche, Holzstapel, Frachtwagen, Bienenstöcke, Zelte, kleine Drachen und zusätzliche ansprechbare Bewohner ergänzen die Häuser. Wege innerhalb der Orte folgen unterschiedlichen Linien und Bögen statt überall demselben Sternschema.

Reguläre Denkgruppen folgen dem Ablauf **Wissen mit Schaubild → nachvollziehen → festigen → weiterdenken**. Wissen wird nur vor der ersten Aufgabe automatisch geöffnet, bleibt aber bei allen drei Aufgaben erreichbar. Neue Aufgaben verlangen Umkehrungen, Fehlersuche, Grenzfälle und Darstellungswechsel.

Stellenwertbezeichnungen werden aus einer gemischten Ablage auf die Ziffern gezogen. Alternativ funktionieren Antippen der Bezeichnung und Antippen des Ziels sowie Tastaturbedienung. Zahlengeraden haben gleichmäßige Teilstriche, aber nur beschriftete Endpunkte; die laufende Markierung verrät keinen Zahlenwert. Hinzu kommen markierbare Flächen, Fehlerzeilen sowie Begründungskarten mit unpassenden Alternativen.

## Die Wegprüfungen

Eine Wegblockade prüft das Wissen des **Ausgangsgebiets** und erforderliches, noch nicht nachgewiesenes **Vorwissen des Ziels**. Je nach Landschaft stehen dort Tore, Baumstämme, Felsen, Fracht, Wagen, kleine Monster oder Runen. Die Figur kann nicht einfach durchlaufen; die automatische Laufroute hält ebenfalls davor an.

Ein Test darf vor Abschluss aller Quests begonnen werden. Zuvor erscheint die Warnung, dass der Ort noch Hilfe braucht. Während der Prüfung gibt es **keine Wissensseiten, Beispiele, Tipps oder Lösungen**. Die Rückmeldung kommt erst am Rundenende. Alle erforderlichen Gedanken müssen richtig beantwortet sein. Richtige Nachweise bleiben erhalten; weitere Runden greifen nur noch nicht richtig gelöste Gedanken auf.

Beim ersten Aufbruch ohne frühere Siegel umfassen die Prüfungen je nach Route **6 bis 23 Aufgaben**. Zusatzprüfungen zu anderen Zielwegen starten mit mindestens drei Aufgaben; sie wiederholen nicht den ganzen Gebietstest. Prüfungen sind unterbrechbar, abgegebene Antworten bleiben gespeichert. Eine anschließende Fehler-Wiederholungsrunde darf kürzer sein.

Nach Erfolg öffnen und verblassen alle ausgehenden **Gebietsblockaden** dieses Ortes. Noch fehlendes Zielvorwissen wird an anderen Ausgängen durch eine eigene violette Vorwissensbarriere markiert. Beispiel: Das Dorf-Siegel nach dem Waldweg bescheinigt noch nicht automatisch das Vergleichs- und Grenzwissen für den Hafen. Diese Trennung verhindert, dass ungeprüfte Inhalte als beherrscht gelten. Einzelheiten und sämtliche initialen Prüfungsaufgaben stehen in `PRUEFUNGEN.md`.

## Die besonderen Herausforderungen

Erst wenn **alle regulären Quests eines Ortes** erledigt sind, erscheint dort ein auffälliger Meisterkristall mit einer neuen Quest. Zusatzwege des Ortes zählen dabei mit. Die jeweils sechs Aufgaben verbinden mehrere Gedanken, Rückwärtsrechnen und Begründungen. Diese Herausforderung ist optional; sie ist keine weitere Voraussetzung für einen Wegtest.

Nach dem bestätigten Abschluss wird nicht nur der Kristall fertiggestellt: Blumen, weitere Tiere und Bewohner sowie ein leuchtender Himmelsbogen werden sichtbar. Die Veränderung wird animiert und bleibt im Spielstand erhalten. Bei „Weniger Bewegung“ wird der Übergang verkürzt. Im Menü werden erledigte Quests und bestandene Gebietstests getrennt gezählt.

## Hosting

Den gesamten Paketinhalt zusammen auf einen statischen Webserver laden. Zum Betrieb werden benötigt:

```
index.html       styles.css       manifest.webmanifest       sw.js
icons/
js/              (alle 17 JavaScript-Dateien)
```

Die sechs neu hinzugekommenen Module heißen `practice.js`, `challenges.js`, `evolution.js`, `adventure.js`, `scenery.js` und `task-widgets.js`. Die übrigen Module wurden ebenfalls angepasst. **Nicht nur index.html austauschen.** Dokumentation, Werkzeuge und Tests müssen nicht öffentlich erreichbar sein und sind für den Spielbetrieb nicht erforderlich.

Ein Unterverzeichnis ist möglich. Es gibt keinen Build-Schritt und keine npm-Laufzeit-Abhängigkeiten. JavaScript muss mit passendem MIME-Typ ausgeliefert werden. Für das iPad eine **HTTPS-Adresse** benutzen: Service Worker benötigen einen sicheren Kontext. [1]

Lokal am Entwicklungsrechner:

```sh
python3 -m http.server 8080
```

Danach am selben Rechner `http://localhost:8080/` öffnen. `localhost` auf dem iPad bezeichnet dagegen das iPad, nicht den Entwicklungsrechner. Die HTML-Datei nicht direkt aus der ZIP oder aus der Dateien-App starten.

In Safari kann die Seite über Teilen zum Home-Bildschirm hinzugefügt werden. [2] Die App enthält außerdem eine Vollbild-Schaltfläche, soweit der Browser diesen Aufruf unterstützt. Der Service Worker hält die Spieldateien nach erfolgreicher Erstinstallation lokal vor. **Echte Safari-Installation und Offline-Neustart wurden hier nicht geprüft.**

## Update einer bestehenden Installation

Vor dem Austausch auf jedem Gerät den Spielstand im Rucksack als JSON exportieren. Den vollständigen Inhalt im bisherigen Hosting-Verzeichnis ersetzen; Cache-Version und sichtbare App-Version lauten jetzt `4.0.0` beziehungsweise **Kommaland 4.0**. Alle alten Kommaland-Tabs und Home-Bildschirm-Fenster schließen, danach neu öffnen. Alte und neue Version nicht gleichzeitig unter derselben Installation betreiben.

**Bereits abgeschlossene Quests aus Version 2 oder 3 bleiben abgeschlossen**, einschließlich ihrer Bauwerke. Angefangene Quests werden auf die neue, erweiterte Aufgabenfolge abgebildet. Früher schon bestätigte Teilschritte werden nicht pauschal verworfen; neu eingefügte Festigungs- und Transferaufgaben können aber noch offen sein. Ein alter, noch nicht bestätigter Bauabschluss wird nicht ohne die ergänzten Aufgaben zu einem fertigen Bauwerk gemacht.

Die neuen Gebietssiegel werden nicht aus alten Questabschlüssen erfunden: Wegtests beginnen ohne solche Zertifikate. Wo schon alle regulären Quests fertig waren, erscheint sofort die neue Meisterherausforderung. Version-1-Spielstände behalten abgeschlossene Quests, beginnen damals angefangene Quests wegen der seit Version 2 geänderten Inhalte erneut.

Die **Dateiformatversion ist Schema 3**, die **App-Version ist 4.0**. Das sind unterschiedliche Zählungen. Alte App-Versionen können neue Sicherungen nicht zuverlässig lesen. Die lokale Speicherkennung bleibt kompatibel; Herkunft und Installationsverzeichnis müssen gleich bleiben. Ein neuer Host oder ein anderer Pfad bedeutet einen anderen lokalen Speicherbereich. [3]

## Bedienung und Speicherstand

Steuerkreis ziehen oder Boden antippen; nahe Gegenstände auswählen. Tastatur: WASD/Pfeile, E/Leertaste für Interaktion, M für Karte, Esc zum Schließen. Das eigene Zahlenfeld akzeptiert Dezimalkomma; bei physischer Tastatur auch Dezimalpunkt. Wertgleiche Schreibweisen wie 0,5 und 0,50 gelten exakt als gleichwertig. Einheiten werden separat angezeigt; Rechenausdrücke werden nicht ausgewertet.

Der äußere Bildschirm scrollt nicht. Lange Rollen scrollen im Fenster. Größere Schrift, weniger Bewegung und Sparmodus sind im Rucksack verfügbar. Betriebssystemseitige Vergrößerungshilfen können nicht zuverlässig durch die App abgeschaltet werden.

Gespeichert werden Position, Quests, geprüfte Teilschritte, Gebietssiegel, nachgewiesene Gedanken, unterbrochene Wegprüfungen und Einstellungen. Noch nicht abgegebene Aufgabeneingaben bleiben bei einem Hilferücksprung in der Sitzung erhalten, sind aber keine dauerhaften Teilschritte. Vorübergehende Einstellungen eines interaktiven Wissensmodells werden nicht exportiert.

JSON-Import prüft Format und bekannte IDs; eine Vorschau und Bestätigung gehen der Übernahme voraus. Eine Rücksicherung erlaubt, den vorherigen Stand wiederherzustellen. Die Obergrenze für Sicherungen beträgt 1 MB. Keine Konten, keine automatische Gerätesynchronisation, keine Übertragung von Antworten an einen Server.

Browserdaten können gelöscht werden oder in privaten Sitzungen nur vorübergehend bestehen. [3] Regelmäßige JSON-Sicherungen sind deshalb notwendig. Das lokale Spiel ist **kein manipulationssicheres Prüfungs- oder Notensystem**; Antwortschlüssel liegen wie bei einer statischen Lern-App üblich im Programmcode.

## Dokumentation und Entwicklung

`DIDAKTIK.md`: Lernfolge, Differenzierung und curriculare Einordnung. `LERNWEG.md`: konkrete Questvoraussetzungen und Denkgruppen. `AUFGABEN.md`: alle 393 Questaufgaben, Lösungen sowie Wissens- und Beispielregister. `PRUEFUNGEN.md`: Prüfungssystem, Abdeckungsmatrix und initiale Wegtestaufgaben. `SCHAUBILDER.md`: alle 83 interaktiven Wissensmodelle. `MATHEMATIK-PRUEFUNG.md`: fachliche Prüfung und Grenzen. `TESTS.md`: tatsächliche Tests und Geräte-Abnahme. `AENDERUNGEN.md`: Änderungsübersicht.

Inhalte liegen in `content.js`, `lessons.js`, `practice.js`, `challenges.js` und `evolution.js`. Weganforderungen stehen in `adventure.js`. Gelände und Navigation sind in `terrain.js`/`world.js`, neue Modelle in `scenery.js`, neue Aufgabenbedienung in `task-widgets.js`. Zahlenprüfung: `math.js`; Speicherung/Migration: `state.js`. Wissensmodelle: `visual-models.js`/`visuals.js`.

```sh
npm test
# Optional: installierte Python-Browser-Testwerkzeuge verwenden
xvfb-run -a python3 tests/browser_v4.py
xvfb-run -a python3 tests/visual_browser.py
# Kataloge nach Inhaltsänderungen neu erzeugen
node tools/documentation.mjs
```

Die Browser-Tests verwenden im verwalteten Testsystem einen dokumentierten lokalen Modul-Harness mit einem In-Memory-Ersatz für localStorage. Das ist kein Test dauerhafter Gerätespeicherung, echter HTTPS-Auslieferung oder Safari. Details und Ergebnisse stehen in `TESTS.md`.

## Technische Quellen

[1] MDN, Service Worker API: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

[2] Apple, iPad-Benutzerhandbuch: https://support.apple.com/de-de/guide/ipad/ipadc602b75b/ipados

[3] MDN, localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

Technische Quellen am 10. September 2026 eingesehen.

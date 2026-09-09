# Kommaland 3.0 · Testprotokoll

**Testumgebung:** Node.js 22.16.0; Chromium 144.0.7559.96 unter Xvfb; WebGL mit SwiftShader; Playwright. Kein physisches iPad, kein echtes Safari.

## Aktuell nachgewiesen

**50 automatisierte Node-Tests bestanden.** Hinzu kommen die Browser-Prüfung aller 83 Schaubilder mit 230 Wertänderungen und zwei vollständige Durchläufe aller 37 Quests mit jeweils 122 richtigen Teilantworten. Der ausführliche Lauf enthält außerdem eine bewusst falsche Antwort und einen Tipp. Die Ergebnissätze stehen maschinenlesbar in `tests/node-results.txt`, `tests/visual-browser-results.json`, `tests/final-source-results.json` und `tests/browser-results.json`.

Die Browserprüfung der Schaubilder meldet keine unbehandelten JavaScript-Fehler. Der vollständige Questdurchlauf meldet zusätzlich `gl.getError() === 0`. Im Schnelllauf wurden alle Bauabschlüsse mit dem tatsächlichen Animationstimer und aktivierter Einstellung „Weniger Bewegung“ ausgeführt, nicht durch direktes Setzen des Fertig-Flags. Im ausführlichen Lauf lief der erste Aufbau mit normaler Dauer; die weiteren mit reduzierter Bewegung.

Das Einsetzen hinterlegter Lösungen prüft die Antwortverarbeitung, nicht unabhängig die redaktionellen Antwortschlüssel. Die fachliche Durchsicht der neuen Darstellungen und ihre Grenzen stehen in `MATHEMATIK-PRUEFUNG.md`. Es gibt keine empirische Erprobung der Lernwirksamkeit.

## 1. Schaubilder und Mathematik

`tests/visuals.test.js` ergänzt 17 Tests zu den bisherigen 33. Geprüft werden:

- Jede der 83 Wissens-IDs hat genau eine passende, renderbare Schaubildkonfiguration. Anfangszustände, Reglergrenzen und alternative Rechenfälle liefern keine nichtendlichen Zahlen oder fehlenden Werte.
- Beim Bündeln und Entbündeln bleibt der Wert jeder Tauschetappe erhalten. Vor dem Wegnehmen entspricht die Materialsumme der Anfangsmenge; danach stimmt sie mit der Differenz überein. Mehrere Nullstellen sind eingeschlossen.
- Ganzzahlige Rundungsberechnung einschließlich Halbwerten und Überträgen. Gemeinsame Skalen und eindeutige Bezugseinheiten.
- Viertel sind echte 25er-Blöcke, Tausendstel erhalten eine markierte Vergrößerung. Alle Brüche mit zulässigen Nennern 2, 4, 5, 10 und Zählern zwischen 0 und Nenner werden geprüft.
- Alle 400 einstellbaren Rechtecke haben genau die zum Produkt passende Zahl gefärbter Hundertstelkästchen. Verfeinerte Unterteilungen erhalten die Fläche.
- Ganze Portionen plus Rest ergeben die Ausgangsmenge. Gerechtes Verteilen verwendet exakt darstellbare Fälle; jede Portion passt in den dargestellten 5-l-Behälter. Stunden und Minuten werden korrekt umgerechnet.
- Stellenwertverschiebung, vollständige Flächeneinheiten, das Zwei-Pumpen-Beispiel, nichtnegative Fehlmengen und ganze gebaute Schleifen.

Im Browser öffnet `tests/visual_browser.py` anschließend alle 83 echten Wissensrollen. Regler werden verändert, Auswahlfelder durchlaufen und Tausch-/Umschaltknöpfe betätigt. Für jede Karte wird eine tatsächliche Änderung von Grafik oder Ergebnis sowie eine exakte Rückkehr durch „Zurücksetzen“ geprüft. Das Erkunden verändert keine Questabschlüsse, gespeicherten Teilschritte oder Versuchszähler.

## 2. Direkte Bedienung und Hilferücksprung

Die Browserprüfung verwendet Pointer-Bewegungen auf der Zahlengeraden und an der Rechteckecke. Ein simulierter Touch färbt ein Hundertstel-Kästchen; ein Streichen färbt eine Reihe. Tastatur-Pfeiltaste und die große Plus-Taste verändern denselben Wert. Ein Test prüft, dass das Pointer-Capture auch bei laufend neu gezeichnetem SVG bestehen bleibt.

Geprüft wird außerdem Wissen → Beispiel → Wissen mit erhaltenem Erkundungszustand sowie Aufgabe → Wissen → Aufgabe mit unveränderter ausgewählter Antwort. Auch die Themenauswahl des allgemeinen Dorf-Infoschilds öffnet die richtige interaktive Karte.

## 3. Tablet- und Telefon-Layouts

35 Kombinationen aus sieben verschiedenen Modellarten und fünf Viewports werden geprüft: **1180 × 820, 1024 × 768, 820 × 1180, 768 × 1024 und 390 × 844 CSS-Pixel**. Enthalten sind ein einfacher Einstieg, Viertel, Rechteck, Entbündeln, Verteilen, Rechenbaum und Tausendstel-Lupe.

Kein Schaubild oder Schriftrolleninhalt darf horizontal überlaufen. Die Fußleiste bleibt innerhalb des Viewports. Eingabetasten, Regler und Auswahlfelder haben mindestens etwa 44 × 44 CSS-Pixel. Kleine Kästchen und Ziehmarkierungen sind durch große alternative Eingaben ergänzt; sie erfüllen nicht selbst alle diese Mindestmaße. Längere Rollen dürfen innen vertikal scrollen, der äußere Spielbildschirm nicht.

Sichtprüfungen erfolgten an echten Screenshots der Vierteldarstellung, des Flächenmodells, des Entbündelns, der Tausendstel-Lupe und der Rundung. Die Screenshots stammen aus der laufenden Anwendung, nicht aus einer Bildgenerierung. Diese Tests simulieren Bildschirmmaße und Touch-Ereignisse; sie emulieren weder Safari noch einen iPad-Grafikchip.

## 4. Bestehende Lern- und Spielfunktionen

Die ursprünglichen Tests zu Antwortformaten, exakter Dezimalverifikation, 83 Wissenskarten/Beispielen, 122 Aufgabenzuordnungen und dem zyklenfreien Lernweg bleiben erhalten. Ebenso die Prüfungen der 45 interaktiven Weltziele, ihrer Erreichbarkeit, der zusammenhängenden Landschaft und der Aufbauanimation.

`tests/final_check.py` führt alle 37 Quests über die echte DOM-Oberfläche aus. Vor jeder Aufgabe erscheint ihre neue interaktive Wissenskarte. Alle sechs Antwortformate werden benutzt. Die letzte richtige Antwort darf noch kein fertiges Objekt erzeugen; erst „Quest abschließen“ löst den Bau und anschließend die Erfolgsrolle aus. Der Durchlauf verwendet zur Zeitersparnis räumliche Sprünge zu den Questobjekten; flächendeckende Wegsuche und simuliertes Gehen werden separat in `tests/world.test.js` geprüft.

`tests/browser_test.py` ist die zusätzliche ausführliche Suite mit normaler erster Aufbauanimation, absichtlicher Falschantwort, Tipp, Wiederaufnahme eines noch unbestätigten Bauabschlusses, verschachtelten Hilfen, größeren Schriftlayouts und Import/Export. Auch diese Suite ist mit dem aktuellen App-Code erfolgreich durchgelaufen: normaler erster Aufbau, Wiederaufnahme, Hilferücksprünge, 20 Layoutprüfungen einschließlich größerer Schrift, JSON-Download, bestätigter Import, beschädigte Datei ohne Fortschrittsverlust, Rücksicherung und ältere Schema-1-Migration. Ihr separat erzeugter Bericht heißt `tests/browser-results.json`; der Bericht enthält seine genaue Testmethode. Er ist nicht mit einem physischen Safari-Test gleichzusetzen.

## 5. Spielstände und Auslieferung

`js/state.js` und `js/content.js` sind bytegleich mit dem gelieferten Version-2-Paket. Schema 2 und die Aufgaben-IDs sind unverändert. Die Node-Tests prüfen Export-/Import-Rundreise, Feldfilterung, ungültige Daten, Ersetzen/Rücksicherung, Speicherfehler und die ältere Migration von Schema 1. Eine vollständige Version-2-Sicherung benötigt in Version 3 keine inhaltliche Migration.

Der Service-Worker-Test prüft **18 vorhandene Cache-Ziele**, einschließlich beider neuer Schaubildmodule. Geprüft werden Unterverzeichnis, Querystrings, Cache-Treffer und das Nicht-Abfangen fremder Domains bzw. schreibender Requests. Alle JavaScript-Dateien bestehen `node --check`.

**Grenze:** Die verwaltete Browserumgebung blockiert die normale Navigation zum lokalen HTTP-Testserver. Deshalb liest `tests/browser_harness.py` HTML, CSS und Module direkt in einen isolierten Chromium-Kontext. Der Harness führt denselben Anwendungscode mit echten DOM-/WebGL-Funktionen aus, ersetzt aber `localStorage` durch eine In-Memory-Map. Der Service Worker wird separat mit Cache-/Fetch-Adaptern getestet. Nicht nachgewiesen sind damit eine reale HTTPS-Auslieferung, Cache-Updates auf einem Schulserver, dauerhafte Safari-Speicherung oder ein Offline-Neustart nach Geräte-Neustart.

## Reproduzieren

Zum Betrieb der App ist keine Paketinstallation erforderlich. Nur für die Tests werden Node bzw. Playwright/Chromium/Xvfb benötigt.

```sh
npm test
xvfb-run -a python3 tests/visual_browser.py
xvfb-run -a python3 tests/final_check.py
xvfb-run -a python3 tests/browser_test.py
```

Die Browser-Skripte erzeugen Screenshots in `test-artifacts/`. Die erzeugten Bilder sind nicht erforderlich, um die App zu hosten.

## Abnahme auf einem Schul-iPad

Vor dem Unterricht das gesamte Paket unter der bisherigen HTTPS-Adresse veröffentlichen und die neue Version im Rucksack prüfen. Einen Version-2-Spielstand vorher exportieren; nach dem Update offene Aufgabe und fertiges Bauwerk vergleichen. Ein Infoschild öffnen und mindestens Hundertfeld, Rechteckecke, Rundung und mehrschrittiges Entbündeln mit dem Finger bedienen. Danach Beispiel öffnen, zurückgehen und eine bereits eingegebene Antwort prüfen. Hoch-/Querformat und größere Schrift ausprobieren. Schließlich JSON-Export/Import, Home-Bildschirm-Start und einen echten Offline-Neustart testen. Erst diese Geräte-Abnahme deckt die hier nicht verfügbare Umgebung ab.

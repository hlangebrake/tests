# Testprotokoll · Kommaland 7.2

## Abschlussläufe und Grenzen

| Prüfung | Erfolgreich | Fehlgeschlagen | Übersprungen | Timeout |
|---|---:|---:|---:|---:|
| Modultests | **310** | 0 | 0 | 0 |
| Browserprogramme | **10** | 0 | 0 | 0 |
| Darin gebündelte Browser-Prüffälle | **88** | 0 | 0 | 0 |
| Produktive Worker-Handler unter Node | **2** | 0 | 0 | 0 |

Die zehn Browserprogramme und 88 Prüffälle sind zwei Zählweisen derselben Ausführung, nicht zu addieren. Keine unbehandelten JavaScript-Seitenfehler in diesen Endläufen. ZIP-Integrität wird beim Paketbau für beide Auslieferungen separat geprüft; die zugehörigen SHA-256-Werte stehen in `Kommaland-7.2-Paketpruefung.json` neben den ZIPs. Rohberichte: `tests/final-summary.json`, `tests/node-results.txt` und die unten genannten Ergebnisdateien im Entwicklungspaket.

**Zwei native HTTP-Startprüfungen wurden tatsächlich versucht, aber von der Umgebung blockiert:** Schüler-App und Dashboard jeweils `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Dies sind keine erfolgreichen oder still übersprungenen Tests und keine Timeouts. Bericht: `tests/native-http-result.json`.

Browserumgebung: Chromium 144 unter Xvfb/SwiftShader, produktive Quellmodule in einen Test-Source-Bundle zusammengeführt und per `set_content` geladen, emulierter Touch und Tastatur. Lokaler Speicher und IndexedDB werden durch Testadapter im Speicher ersetzt. Einige ausführliche Tests verwenden vorhandene Debugzugänge zum Ansteuern von Questobjekten; der zusätzlich ausgeführte **bereinigte Schul-Smoke-Test hat diese Zugänge nicht**. 3D-Erreichbarkeit, Barrieren und Pfadfindung werden außerdem in den bestehenden Navigationstests geprüft.

Nicht abgenommen: physisches Schul-iPad, echtes Safari, native dauerhafte Browserspeicherung, Home-Bildschirm-Installation, tatsächlicher Offline-Neustart und Browser-Modulworker. Keine vollständige Screenreader-/WCAG-Prüfung, kein repräsentativer Geräte-Performancebenchmark, keine Unterrichtsstudie. Die mathematische Prüfung und das Bestehen bekannter Lösungen beweisen nicht den Lernerfolg von Schülerinnen und Schülern.

## Ausgangsbasis und Modultests

Die bereitgestellte 7.1-Entwicklungs-ZIP wurde unverändert als Ausgangsbasis extrahiert. Deren ursprüngliche 278 Modultests bestanden vor dem Umbau. In 7.2 kommen **32 Präsentations- und Migrationsprüfungen** hinzu. Der abschließende Lauf umfasst somit 310 bestandene Tests (rund 28 Sekunden in dieser Umgebung; kein Leistungsversprechen für Schulgeräte).

- Mathematische Primärüberschriften, sekundäre Questnamen, kompakte Niveaus und barrierefrei beschriftete Fortschrittspunkte.
- Alle **107** Wissenselemente behalten ihren vollständigen Originaltext und ihre interaktiven Darstellungen; Kerntext erscheint vor dem Modell, weitere Erklärung auf Nachfrage. Die schriftlichen Rechenmodelle bleiben erhalten.
- **231** Kernvarianten: korrekte Lösungen, Dezimalzeichen, Zahlintervalle, Rechentafeln, leere/falsche Eingaben, kompetenzgebundene Varianten und unveränderte Niveauentscheidungen. Hilfen-/Aufgabenwechsel erhalten bereits eingegebene Antworten.
- Sichtbare Mathematik im Feedback, einschließlich des tatsächlich abgegebenen gültigen Werts bei offenen numerischen Lösungsintervallen. Vorhandene mathematische Begründungen werden nicht abgeschnitten.
- Erfolgreiche Wegprobe öffnet ohne zusätzliche Erfolgsseite; beidseitige Freigabe, Fortschritt und formative Nachweise bleiben getrennt. Für Screenreader steht eine Statusmeldung außerhalb des inaktiven Weltbereichs bereit.
- Hilfe-Disclosure und Fokusführung; ein unsichtbares, zurückgelassenes Hilfeelement darf Escape in der Spielwelt nicht abfangen. Bewusstes Menüöffnen ist keine erfasste fachliche Hilfenutzung.
- Speicherfehler sichtbar, erfolgreiche Speicherung still. Ein erfolgreicher Spielstandschreibvorgang darf eine noch unbestätigte separate Lernhistorienwarnung nicht verbergen.
- Unveränderte Schemas 5/3/6; Versions-/Cachepfade, Niveaudaten und Migration. 17 fachliche/lernlogische Quelldateien wurden per SHA-256 mit der tatsächlichen 7.1-Basis verglichen.
- Fünf unterschiedlich weit bearbeitete synthetische Zustände sowie **zwei Prüfungen einer tatsächlich vom Originalcode 7.1 exportierten Datei**. Die Referenz enthält eine synthetische Identität, 116 Ereignisse, abgeschlossene Addition, Selbsteinschätzung, geöffnete Dorfverbindung, N1-Teilaufgabe mit Fehler/Hilfe, Zusatzübung und eine selbst kontrollierte Notiz. IDs, Geschichte, Aufgabe/Niveau und Notiz bleiben erhalten. Quelle und ZIP-Hash: `tests/fixtures/v7.2/provenance.json`.

## Browserprogramme

| Programm | Fälle | Geprüfte Abläufe |
|---|---:|---|
| `tests/presentation_browser.py` | 20 | Mathematische Hierarchie, Kriterien/Story, Hilfe/Strategie, erhaltene Eingabe, optionaler Wissenstext, Niveauwechsel, fünf Bildschirmgrößen, große Schrift, kompakter Abschluss, direktes Gate-Öffnen, Fehlbericht, beide Speicherwarnungen und echter Schema-5-Export |
| `tests/difficulty_browser.py` | 10 | Alle **231** auswählbaren Kernvarianten über ihre Eingabefelder, alle drei Niveaus, eingefrorene aktuelle Aufgabe, Empfehlungen annehmen/ablehnen, Import/Duplikate, Layouts |
| `tests/content_browser.py` | 4 | Vollständiger Durchlauf **24 Quests / 101 Aufgaben**, 24 automatische Kernwissenseinführungen, Bauabschlüsse, Hilfen und gezielte Prüfungswiederholung |
| `tests/integration6_browser.py` | 9 | Fehlerreflexion, gezielte Wegprobe, alle **107 Modelle mit 304 Änderungen**, Layouts und Dashboard |
| `tests/revision61_browser.py` | 10 | 56 Karten mit **88 festen Rechnungen / 556 angezeigten Schritten**, 190 Schaubildänderungen mit **322 verknüpften Rechnungen**, 22 Prüfrichtungen und freie Rückwege |
| `tests/version7_browser.py` | 14 | Alle **72** Zusatzaufgaben, 16 Zielkarten, acht offene Aufträge, Ablehnen/Später/Weiter, Reflexion und Lehrkräfte-Fachblick |
| `tests/version7_accessibility_browser.py` | 6 | Fokussierte Weltaktionen per Enter/Leertaste, Escape, Textentwurf und Reflexion, Export/Import auf einer zweiten Schülerseite |
| `tests/analytics/browser_smoke.py` | 7 | Klassen-, Aufgaben-, Zeit- und Hilfeansichten, Filter, Einstellungen und responsive Darstellung |
| `tests/analytics/browser_roundtrip.py` | 6 | Echter Dateiexport, Fortsetzung, Sitzungsabschluss, ältere/neuere/doppelte Importe, simulierter Reload und fehlender Name |
| `tests/school_package_browser.py` | 2 | Bereinigte Dateien ohne Debugobjekte: Weltstart, offener Text, Zusatzrunde/Unterbrechen, Rucksack, Export und Import ins bereinigte Dashboard |

Die Ergebnisse in historisch benannten Ordnern wie `test-artifacts/v7/` und `v7.1/` wurden für diese Programme **erneut mit 7.2 erzeugt**. Pfadnamen sind keine Aussage über die getestete Appversion. Zehn Resultate werden zusätzlich vom Releasecheck eingelesen.

### Abweichung zur bisherigen Dokumentation bereinigt

Die 7.1-Dokumentation nannte 929 feste Schritte und 603 verknüpfte Rechnungen. Ein zusätzlicher vollständiger Lauf des **tatsächlichen unveränderten 7.1-Testprogramms** ergab jedoch 556 beziehungsweise 322; der 7.2-Lauf liefert dieselben Werte. Deshalb berichtet 7.2 die tatsächlich gezählten Werte und übernimmt die älteren Angaben nicht. Die Modelle und die Zahl der 88 festen Rechnungen sind unverändert; es wurde kein Rechenverfahren entfernt.

## Visuelle Vergleiche und Barrierearmut

Zehn Vorher-/Nachher-Aufnahmen mit identischen 1024×768-Bedingungen wurden aus Original 7.1 und 7.2 erzeugt. Neun zusammengestellte Bildpaare, Rohaufnahmen und Layoutmessungen liegen unter `test-artifacts/v7.2/`. `VISUELLE-REGRESSION.md` enthält die Messwerte.

Der Aufgabenheader samt Fußleiste der Beispiel-Rechentafel beansprucht rund **159 statt 287px**. Vollständige Rechentafel und Zahlenfeld passen im aufgezeichneten Ausgangszustand in 499px Arbeitsfläche. Dies gilt nicht pauschal für Fehlerfeedback, größere Schrift oder jede lange Sachaufgabe. Diese dürfen intern scrollen.

Neue UI geprüft bei **1180×820, 1024×768, 820×1180, 768×1024 und 390×844**; keine äußere horizontale Überbreite im geprüften Ablauf, Fußleiste erreichbar. Die große Schrift wurde über die tatsächliche Rucksack-Einstellung aktiviert, nicht allein per CSS simuliert. Enter auf einem `summary` startet keine Aufgabe; Hilfezustand und Rückkehrfokus funktionieren. Eine ARIA-Statusprüfung ist keine praktische Screenreader-Abnahme.

## Unabhängige Mathematik, Worker und größerer Import

`python3 tests/check_arithmetic.py`: 53 ursprüngliche numerische Aufgaben/Rechentafeln mit exakter Decimal-/Fraction-Rechnung. `python3 tests/difficulty_arithmetic.py`: 83 numerische Niveauvarianten mit 188 Feldern und zwei Ordnungsfälle. Beide erneut ohne Fehler ausgeführt.

`node tests/worker-handlers.mjs`: zwei produktive ES-Modul-Handler unter Node, simulierter IndexedDB, **keine gestarteten Browser-Workerthreads**. Separater Stresslauf: 100 synthetische Personen und **36.974 Ereignisse**, 3,02 Sekunden Import, 3,22 Sekunden Berichtsbildung, etwa 386MiB Resident Memory in dieser Node-Umgebung. Diese Zeit-/Speicherwerte sind keine Zusage für iPad oder beliebig große Archive.

## Entwicklungsfehler sind keine bestandenen Tests

Frühe Läufe enthielten fehlgeschlagene Assertions auf die vorherige sichtbare Version/Cachezahl, einen Testpfad-Importkonflikt sowie fehlerhafte Testselektoren und eine Testannahme zur Reihenfolge. Diese wurden berichtigt und vollständig neu ausgeführt. Ein anfänglicher Speicherfehlertest hatte gleichzeitig Spiel- und Historienfehler injiziert; nun werden beide getrennt geprüft.

Ein **echter UI-Fehler** wurde im bereinigten Schul-Smoke-Test gefunden: Nach dem Pausieren einer Zusatzrunde fing ein unsichtbares Hilfeelement Escape ab. Dieser Lauf endete mit einem **30-Sekunden-Locator-Timeout**. Die Ursache ist in `closePanel` und der Escape-Zustandsprüfung behoben, ein Modultest ergänzt; der gesamte Schul-Smoke-Test wurde danach wiederholt und bestanden. Der Entwicklungs-Timeout wird nicht als bestandener Test gezählt. In den ausgewiesenen letzten Läufen: null Timeouts.

## Reproduktion

Nur für Entwicklung: Node 22+, Python/Playwright, Chromium und Xvfb. Keine dieser Werkzeuge ist zum statischen Schulbetrieb nötig.

```sh
node --test --test-concurrency=1 tests/*.test.js > tests/node-results.txt 2>&1
python3 tests/check_arithmetic.py
python3 tests/difficulty_arithmetic.py
xvfb-run -a python3 tests/presentation_browser.py
xvfb-run -a python3 tests/difficulty_browser.py
xvfb-run -a python3 tests/content_browser.py
xvfb-run -a python3 tests/integration6_browser.py
xvfb-run -a python3 tests/revision61_browser.py
xvfb-run -a python3 tests/version7_browser.py
xvfb-run -a python3 tests/version7_accessibility_browser.py
xvfb-run -a python3 tests/analytics/browser_smoke.py
xvfb-run -a python3 tests/analytics/browser_roundtrip.py
node tests/worker-handlers.mjs
node tests/analytics/stress.mjs
python3 tools/package-release.py
xvfb-run -a python3 tests/school_package_browser.py
python3 tools/final-report72.py
node tools/release-check.mjs
python3 tools/package-release.py
```

Releasecheck und Berichtsassembler lesen Ergebnisse; sie ersetzen keine Testausführung. Bilder, Fixtures, Skripte und Rohberichte sind nur im Entwicklungspaket. Beide ZIPs werden beim abschließenden Paketbau auf CRC-Integrität, eindeutige/sichere Pfade, Startdateien, JavaScript-Abhängigkeiten und Schulbereinigung geprüft.

## Geräte-Abnahme vor dem Unterricht

1. Spiel- und Lehrkräfte-Daten sichern; alle Dateien am bisherigen HTTPS-Ort ersetzen, Fenster schließen, neu starten. Vorhandene Abschlüsse, Niveaus, Teilaufgaben, Zusatzrunden, Partnernotizen und offene Wege prüfen.
2. Intro öffnen: Mathematiktitel zuerst, Ziel sichtbar, Kriterien und Geschichte aufklappbar. Rechentafel mit Fingern bearbeiten; Hilfe, Wissen, Beispiel und Niveau öffnen, zur erhaltenen Antwort zurückkehren. Große Schrift und Tastatur testen.
3. Einen korrekten Gate-Test abschließen: sichtbare Öffnung ohne Erfolgsdialog; Rückweg frei. Eine fehlerhafte Runde: gezielte fachliche Nacharbeit bleibt erreichbar. Reguläre Reflexion und Challenge-Verschönerung prüfen.
4. Speichern und neu starten; tatsächlichen Export in „Dateien“ ablegen und auf zweitem Gerät wiederherstellen. Dieselbe Datei zweimal ins Dashboard importieren. Keine doppelten Lernereignisse.
5. Beide Apps vollständig online laden, anschließend Netzwerk trennen und wirklich neu starten. Auch nach Browser-/Geräteneustart Daten erhalten? Home-Bildschirm-Start, VoiceOver, Fokus und Statusmeldung prüfen. Vor dem Löschen von Websitedaten exportieren.

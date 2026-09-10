# Kommaland 4.1 · Testprotokoll

## Ergebnis

**87 Node-Tests bestanden; keine fehlgeschlagen, abgebrochen oder übersprungen.** Die Browser-Regression hat alle **45 Quests mit 393 Teilaufgaben** über ihre tatsächlichen Antwortbedienelemente abgeschlossen. Zusätzlich wurden der neue Wissensfluss, alle 83 interaktiven Wissenskarten und alle 32 tatsächlich verwendeten Questmodelltypen in drei Zuständen geprüft. In diesen Browser-Suiten wurden keine JavaScript-Seitenfehler protokolliert.

Die vollständige aktuelle Node-Ausgabe steht in `tests/node-results.txt`. Der Lauf nach den letzten Geometriekorrekturen dauerte in dieser Umgebung rund 59 Sekunden. Das ist eine Testlaufzeit, keine Messung der Leistung der App auf einem Tablet.

## Umgebung und Grenzen

Node.js 22.16.0, Python 3.13.5, Playwright und Chromium 144.0.7559.96 auf Linux. WebGL verwendet SwiftShader im sichtbaren Browser unter Xvfb. **Kein physisches iPad, kein Safari.**

Reguläre HTTP-Navigation zum lokalen Testserver wird in der verwalteten Browserumgebung blockiert. Nach tatsächlichem Navigationsversuch wurde deshalb der vorhandene transparente lokale Harness verwendet: HTML/CSS aus dem Paket, tatsächliche ES-Modulquellen in aufgelöster Abhängigkeitsreihenfolge und ein In-Memory-Ersatz für `localStorage`. Die ausgelieferte Anwendung bleibt eine normale statische ES-Modul-App; der Harness wird nicht in die App eingebaut. Zugriffssperren wurden nicht umgangen.

**Nicht geprüft:** reale HTTPS-Auslieferung, Safari-WebGL, iPad-Geschwindigkeit, dauerhafter `localStorage` über einen echten Browserneustart, Home-Bildschirm-Installation und tatsächliche Service-Worker-Installation mit Offline-Neustart. Eine neu initialisierte Harness-Seite mit importiertem JSON prüft Wiederaufnahme-Logik, nicht dauerhaften Browserspeicher.

## Ergebnisdateien

| Datei | Inhalt |
|---|---|
| `tests/node-results.txt` | Alle 87 automatisierten Node-Tests |
| `tests/browser-regression-results.json` | Vollständiger Aufgabenlauf, Gate-Test, Antworttypen, Hilferücksprung, JSON und Tablet-Layouts |
| `tests/browser-presentation-results.json` | Einmalige Einführungen, neue Teilgedanken, manuelle Hilfen, alte Spielstände, drei Bauzustände und echte Abschlussanimation |
| `tests/visual-browser-results.json` | 83 Wissenskarten, 230 Wertänderungen, Pointer/Touch/Keyboard, 35 Layoutfälle |
| `tests/model-gallery-results.json` | 32 verwendete Modelltypen × 3 Zustände = 96 gerenderte Modellansichten |
| `tests/content-lock.json` | Referenz-Hashes unveränderter fachlicher Version-4-Module |
| `tests/completed-model-lock.json` | Referenz-Hashes aller 45 fertigen Version-4-Questgeometrien |
| `tests/release-check.json` | Zusätzliche Paket-, Syntax- und Importprüfung |

Screenshots werden beim Ausführen der Browserprüfungen in `test-artifacts/` erzeugt. Die Modellgalerie nutzt eine vergrößerte feste Kamera und isolierte Objekte; sie ist kein normaler Spielausschnitt. Ergänzend wurden Dorf-Aufnahmen bei normaler Kameradistanz in drei gezielt gesetzten Testzuständen geprüft. Diese Vergleichsaufnahmen sind kein zusätzlicher manueller Durchspielnachweis. Der vollständige 393-Aufgaben-Durchlauf wird gesondert protokolliert.

## Neue Node-Prüfungen: Präsentation und Kompatibilität

Die 17 neuen Prüfungen ergänzen die 70 bisherigen Tests. Eine tatsächliche frische Einführungskette liefert 108 automatische Wissenskarten über die 37 regulären Quests statt 115 gruppenabhängiger Einblendungen. Gezeigt wird jeder Gedanke innerhalb seiner Quest höchstens einmal automatisch. Unterschiedliche Dezimalstellen, Operationen und Einheiten werden nicht irrtümlich zusammengelegt. Die geprüfte Rechteck-Zusammenfassung entfällt nur mit beiden bereits eingeführten Teilgedanken, nicht mit nur einem.

Gespeicherte `shownLessons` verändern weder richtige Antworten noch Abschlussstatus. Ungültige optionale Metadaten verwerfen keine ansonsten gültigen Spielstände. Ohne neue Metadaten werden alte gelöste Aufgabenpräfixe richtig erkannt; an einer neuen Wissensgrenze wird nicht zu weit vorgegriffen. Abgeschlossene Wiederholungsquests, Meisterquests, Waldbegegnungen und Wegprüfungen erzeugen keine ungewollten neuen automatischen Einführungen.

Die fachlichen Inhalts-, Aufgabenvarianten-, Prüfungs-, Wissens-, Schaubild-, Antwortprüfungs- und Geländemodule stimmen mit den hinterlegten Version-4-Hashes überein. Zusätzlich stimmen alle **45 fertigen Modellgeometrien bytegenau** mit ihren Version-4-Referenzen überein. Das verhindert, dass das Präsentationsupdate bestehende Endzustände unbemerkt ersetzt.

Für alle 45 Questobjekte haben die drei Geometrien endliche Koordinaten und unterschiedliche Positionsdaten. Eine reine Farbänderung reicht nicht, um diesen Test zu bestehen. Haus und Brunnen werden zusätzlich auf wesentlich geringere Anfangshöhe und einen dazwischenliegenden Arbeitszustand geprüft.

Öffnen, Lesen und Fehlversuche behalten das Anfangsmodell. Erst eine richtige Teilantwort schaltet auf den Teilaufbau. Auch `ready=true` bleibt teilfertig. Erst `completed[id]` verwendet den Endzustand. Export/Import erhält gleichzeitig nicht begonnene, laufende, abschlussbereite und abgeschlossene Quests.

In der tatsächlichen Welt werden für alle 37 regulären Quests die Übergänge durchlaufen. Zu jedem Zeitpunkt ist genau das zugehörige Zustandsmodell sichtbar; Aufgabenwechsel erzeugen keine zusätzlichen Meshes. Die Abschlussanimation verwendet den sichtbaren Teilaufbau als Quelle, läuft bis zum Endzustand und ruft den Abschluss genau einmal auf.

## Bestehende Node-Prüfungen

Unverändert geprüft werden exakte Dezimalantworten, gültige Aufgaben- und Antwortformen, 115 Dreiergruppen, alle 83 Wissenszuordnungen sowie **7470 erzeugte Varianten** (83 Gedanken × 3 Modi × 30 Startwerte). Diese Struktur- und Antwortannahmeprüfung ist keine unabhängige Herleitung sämtlicher Lösungen. 18 Rechenaufgaben der Meisterherausforderungen werden zusätzlich aus den Sachangaben nachgerechnet.

Alle 22 initialen Wegtests prüfen Ausgangswissen plus Zielvoraussetzungen. Ausgangssiegel verleihen kein ungeprüftes Zielwissen. Erhaltene Nachweise, Fehlerrunden, frühe Versuche, Pausen und Wiederaufnahme bleiben geprüft. Navigation und Stopppunkte an allen 22 Blockaderichtungen, unsichtbare Meisterquests, spätere Gebietsdekoration und einmalige Öffnungs-Callbacks werden weiterhin kontrolliert.

Die vorhandenen Schema-1/2-Migrationen und die Schema-3-Spielstandprüfung bleiben aktiv. Die Service-Worker-Strukturprüfung umfasst jetzt **26 unterschiedliche Cache-Ziele**, darunter alle 19 JavaScript-Dateien. Sie kontrolliert Dateivorhandensein, Installationspfadbindung und lokale Abhängigkeiten, installiert aber keinen echten Service Worker.

## Browser: der neue Wissensfluss

In der Brunnenquest erscheint der erste Gedanke, nach mehreren Aufgaben ein tatsächlich neuer Gedanke und vor der späteren Wiederverwendung **keine** identische Einblendung. Falsche Antworten verändern das Anfangsmodell nicht; die erste richtige Antwort zeigt den Teilaufbau.

Der Ablauf Aufgabe → „Wissen anzeigen“ → Beispiel → Wissen → Aufgabe behält die eingegebene Antwort. Ein JSON-Rundlauf mitten in der Quest und eine komplett neu initialisierte Harness-Seite setzen ohne aufgezwungene Wiederholung fort. Eine auf der Quest-Einstiegsrolle geöffnete Erklärung wird beim anschließenden Beginnen nicht sofort wiederholt und zählt nicht als gelöste Aufgabe.

Ein alter Spielstand ohne `shownLessons` unterdrückt bekanntes Wissen bei Schritt 2, führt einen neuen Hundertstelgedanken bei Schritt 3 aber weiterhin ein. In der Rechteckquest werden neue Gedanken vor den Aufgaben 1, 4, 7 und 13 eingeführt; die bereits durch beide Teilgedanken abgedeckte Zusammenfassung vor Aufgabe 10 entfällt.

Nach allen richtigen Antworten bleibt das Arbeitsmodell sichtbar. Nach Import dieses abschlussbereiten Stands bestätigt der Browser ausdrücklich „Quest abschließen“ und wartet die **reale, nicht beschleunigte** Aufbauanimation bis zum fertigen Modell ab.

Die neue Fußleiste bleibt in acht Fällen erreichbar: 1180 × 820, 1024 × 768, 820 × 1180 und 768 × 1024, jeweils mit normaler und größerer Schrift. Kein horizontaler Überlauf wurde gefunden.

## Browser: vollständiger Regressionslauf

Alle 393 Antworten werden über die DOM-Bedienelemente abgegeben: 240 Zahleneingaben, 64 Einfachauswahlen, 18 Mehrfachauswahlen, 12 Zuordnungen, 28 Fehlerzeilen, elf Argumentfolgen, acht Zahlengeraden, sechs Markieraufgaben und sechs Reihenfolgen.

Der Gesamtlauf zählt **107 automatische Einführungen**. Die Abweichung von 108 im frischen Node-Durchlauf ist beabsichtigt: Eine Wissenskarte wurde im vorgeschalteten Hilfetest bereits manuell geöffnet und wird nicht erneut aufgezwungen.

Die früh gestartete Dorf-Wald-Prüfung umfasst 19 Aufgaben. Eine absichtlich falsche und 18 richtige Antworten führen erst am Rundenende zur Rückmeldung. Die 18 richtigen Gedanken bleiben erhalten; nach Pause wird der eine verbleibende Gedanke geprüft. Hilfen fehlen während der Prüfung; der Erfolg öffnet das Tor.

Maus-Drag, emulierte Touch-Ziehbewegung und Tastatur-Zuordnung, sparse Zahlengeraden, Markierung mit emuliertem Touch-Tap, stark gedämpfte zukünftige Questzeichen, Warnungsübergehen und Meisterdekoration bleiben geprüft. JSON erhält Quests, Siegel und Dekorationen. Drei komplexe Antwortformate passen weiterhin in drei Tablet-Layouts.

Der Durchlauf wählt Quests über die bestehende Debug-Schnittstelle und kennt die hinterlegten Lösungen. Bauanimationen werden im langen Gesamtdurchlauf nach ihrem Start beschleunigt. Er ist kein manuelles Erwandern aller Wege und kein unabhängiger mathematischer Beweis jeder Lösung. Die neue Präsentationssuite prüft eine Abschlussanimation gesondert unbeschleunigt.

## Modellprüfung und Wissensschaubilder

Alle 32 aktiven Modelltypen wurden bei gleichbleibender Kamera in ihren drei Zuständen gerendert und visuell geprüft. Grundmauern/offene Dachbalken, Brunnenlücken, offene Stallrahmen, zerlegte Zelte, fehlende Brückensegmente, zerlegte Bienenstöcke und die übrigen Varianten zeigen unterschiedliche Formen. Vor der Abnahme wurden schwebend wirkende Dach-/Markisenteile durch Stützen verbunden und die teilweise aufgespannte Zeltplane deutlicher sichtbar gemacht. Das Dorf wurde zusätzlich bei normaler Spielkamera betrachtet.

Unverändert bestehen die Browserprüfungen sämtlicher 83 interaktiver Wissenskarten mit 230 Veränderungen und 35 Layoutfällen. Die Wissensmodelle wurden nicht fachlich verändert.

## Geräte-Abnahme vor dem Unterricht

Auf einem tatsächlichen iPad zunächst den alten Spielstand exportieren. Alle Dateien unter derselben HTTPS-Adresse aktualisieren, alle alten App-Fenster schließen und „Kommaland 4.1“ im Rucksack prüfen.

Eine neue Quest öffnen und die Erklärung lesen. Nach der ersten richtigen Antwort auf die Karte zurückkehren: Das Objekt muss teilweise aufgebaut sein. Weiterlernen, bei bekanntem Wissen ohne automatische Rolle fortfahren, „Wissen anzeigen“ und Beispiel mit dem Finger öffnen und zurückkehren. Bei einem neuen Teilgedanken muss weiterhin die passende Einführung erscheinen.

Safari vollständig schließen und wieder öffnen. Aufgabenstand und Einblendeinformation müssen erhalten bleiben. Alle Aufgaben lösen, aber noch nicht abschließen: Das Objekt bleibt teilfertig. Diesen Zustand exportieren, neu laden oder importieren und danach ausdrücklich abschließen; die Animation muss zum fertigen Objekt führen. Eine früher fertige Quest darf durch Wiederholen nicht beschädigt werden.

Abschließend Gebietssiegel, pausierten Wegtest, Import auf einem zweiten Gerät, Hoch-/Querformat, größere Schrift, weniger Bewegung, Home-Bildschirm-Start und Offline-Neustart nach erfolgreicher Cache-Installation prüfen.

## Ausführen

```sh
npm test
xvfb-run -a python3 tests/browser_regression.py
xvfb-run -a python3 tests/visual_browser.py
xvfb-run -a python3 tests/browser_presentation.py
xvfb-run -a python3 tests/model_gallery.py
```

Node, Python, Playwright, Chromium und Xvfb sind Entwicklungs-/Testwerkzeuge. Die gehostete App benötigt sie nicht.

# Testprotokoll · Kommaland 6.0

Stand: 10.09.2026. Ausgangspunkt war das bereitgestellte Paket 5.1. Dieses Protokoll
beschreibt ausgeführte Prüfungen, nicht eine Zusicherung für ungetestete Geräte.

## Ergebnisüberblick

| Prüfung | Ergebnis |
| --- | --- |
| Aktuelle Node-Modultests | 169 bestanden, keine fehlgeschlagenen oder übersprungenen Fälle |
| Vollständige Spielbedienung im Browser | 24 Quests / 101 Aufgaben, 24 automatische Wissenseinführungen |
| Neue Antwortformate im Durchlauf | 22 zusammenhängende Rechentafeln, insgesamt 58 Zahlenfelder im Inhaltsbestand |
| Unabhängige mathematische Gegenrechnung | 53 Zahlen-/Rechentafel-/Zahlengeradenaufgaben aus ihren Operanden mit Python Decimal/Fraction geprüft |
| Interaktive Wissensdarstellungen | 107 Modelle mit 304 Wertänderungen und Rücksetzungen |
| Kurze Tests | Alle 22 gerichteten Routen haben 3–6 Erstaufgaben; sieben Zahlenvarianten je Vorlagenfamilie |
| Browser: Fehlrunde | 3 Kernaufgaben, 2 richtige Nachweise behalten, nur 1 offene Aufgabe erneut prüfen |
| Browser: Fehlerreflexion | Dritter regulärer Fehlversuch; zweite schwierige Prüfrunde; vorhandene Tipps berücksichtigt; gemeinsames Budget |
| Browser: Dashboard | Zwei synthetische Exporte über Dateiauswahl; Wiederimport ohne zusätzliche Ereignisse |
| JavaScript-Fehler in den zwei neuen Browserläufen | keine |

## Modultests und unabhängige Rechnungen

```sh
npm test
python3 tests/check_arithmetic.py
```

Die aktuelle Suite prüft Mathematik, Aufgabenformate, Aufgaben-/Wissensfluss,
Spielstandvalidierung und Migration, Index-/Merge-Logik, ZIP-Unterordner, historische
Projektionen, aktive Kennzahlen, Selbstregulationsregeln, interaktive Darstellungen,
62 begehbare Interaktionsziele, 22 Wegblockaden, Bauzwischenstände und Animationen.
Die vormaligen Anforderungen an 393 Aufgaben und alte Quest-IDs wurden nicht als
künstliche Mengenvorgabe beibehalten. Entsprechende historische Tests sind archiviert.

Die arithmetischen Erwartungswerte entstehen in `tests/check_arithmetic.py` unabhängig
von den hinterlegten Antwortfeldern. `Decimal` und `Fraction` berechnen Ergebnisse und
Zwischenschritte aus den tatsächlichen Operanden. Anschließend vergleichen Node-Tests
die Gegenrechnungen mit den aktiven Aufgaben. Das ist zusätzlich zur Prüfung, ob der
Antwortvalidator die hinterlegte Lösung akzeptiert. Nichtnumerische Begründungen und
Kontextannahmen wurden gesondert inhaltlich geprüft; siehe `MATHEMATIK-PRUEFUNG.md`.

Der volle Vorlagenbestand wird außerdem über unterschiedliche Seeds geprüft. Jede
aktive Aufgabe hat eine eindeutige ID, Lernziel-Zuordnung, einen didaktischen Zweck,
Anforderungsbereich und passende Wissensreferenz. Der Abhängigkeitsgraph ist zyklusfrei.

### Spezifische Übernahmeprüfung

Eine mit der ursprünglichen 5.1-Quelle erzeugte Lernstandsdatei mit 408 Ereignissen
liegt als synthetische Fixture bei. Import alter Datei, Inhaltswechsel, Neuimport,
chronologisch vertauschter Import und Wiederimport sind geprüft. Vor dem Wechsel
hat die historische Projektion 37 reguläre Quests, danach 16. Alte Versuche zählen
nicht als neue Aufgabenversuche. Der Zeitpunkt `curriculum_changed` wird auch dann
beachtet, wenn er vor dem ersten Export der neuen Fassung liegt. Vollständige Gruppen
werden angerechnet, Teilstände archiviert, ohne einen neuen richtigen Versuch zu erfinden.

## Browserlauf 1: vollständiger neuer Lernweg

```sh
xvfb-run -a python3 tests/content_browser.py
```

Alle 24 Quests wurden über die realen Aufgaben-Handler abgeschlossen: 24 Einfachauswahlen,
30 Zahleneingaben, 22 Rechentafeln, 5 Mehrfachauswahlen, 2 Zuordnungen, 1 Markierung,
9 Argumentationsketten, 1 Sortierung, 1 Zahlengerade und 6 Fehlersuchen. Bekannte Lösungen
werden eingesetzt; dies ist keine Untersuchung der Lernwirksamkeit.

Die drei Modellzustände, bestätigte Bauabschlüsse und alle acht Gebietsverschönerungen
bleiben funktional. Eine Ziffer in der schriftlichen Rechentafel wird per emuliertem
Fingertipp eingegeben; Wissen → Beispiel → Wissen → Aufgabe lässt sie unverändert.
Eine einzelne falsche Zwischenzelle verhindert den Gesamtabschluss. Richtige Felder
allein sind kein selbstständiger Aufgabenabschluss.

Ein früher Wegtest ist ohne Hilfen bedienbar. Nach einem Fehler bleiben zwei richtige
Nachweise erhalten. Eine variierte Einzelaufgabe genügt in der Wiederholungsrunde.
Die Passage öffnet danach. Der echte Exportpfad liefert Schema 3 und 101 aktive
Aufgabenmetadaten; archivierte Aufgaben sind gesondert markiert.

Bericht: `tests/content-browser-results.json`. Aufnahmeverzeichnis: `test-artifacts/v6/`.

## Browserlauf 2: Reflexion, Wissen, Layout, Lehrkräfte-Import

```sh
xvfb-run -a python3 tests/integration6_browser.py
```

Die Rückschau erscheint erst nach drei falschen regulären Antworten. Drei zuvor
bewusst geöffnete Tipps werden genannt; ein bereits verwendeter Tipp steht nicht
als erste automatische Empfehlung vor einer anderen Strategie. Rückschau und
Handlungsauswahl verbrauchen zusammen einen Impuls. „Rechenweg prüfen“ zeigt den
letzten abgegebenen Versuch aus dem Arbeitsspeicher, nicht erfundene Papierrechnungen.

Nach dem gemeinsamen Cooldown werden zwei kurze Prüfrunden falsch beantwortet.
Erst am Ende der zweiten Runde erscheint der zweite Impuls. Eine explizit gewählte
unsichere Bruchkompetenz öffnet die passende Erklärung; die Rückkehr stellt den
Prüfungsbericht wieder her. Während der Prüfung sind Hilfen weiterhin ausgeblendet.

Alle 107 Wissensmodelle werden tatsächlich gerendert, verändert und zurückgesetzt.
Prüfungen schließen undefinierte Zahlen-/Unendlichkeitsanzeigen aus. Die Stellenwerttafel
stellt den mehrstelligen Ganzteil von 12,304 richtig dar. Das periodische Modell
kennzeichnet die unendliche Fortsetzung und nicht nur einen gerundeten Endwert.

Die Rechentafel wurde in 1180×820, 1024×768, 820×1180, 768×1024 und 390×844 geprüft:
kein horizontaler Inhaltsüberlauf, erreichbare Fußleiste, Zahlenfelder mindestens
44 CSS-Pixel breit und 48 hoch. Das ist keine native iPad-Bedienungsabnahme.

Die Lehrkräfte-Dateiauswahl importiert zwei reale, synthetische Schüler-Exporte aus
den Browserläufen. Der wiederholte Import derselben Datei verändert die Ereigniszahl
nicht. Die Rückschau-Ereignisse in Schema 3 werden angenommen. Screenshot-Personen
sind Testpersonen, keine echten Schülerinnen oder Schüler.

Bericht: `tests/integration6-browser-results.json`.

## Tatsächlicher Testaufbau und Grenzen

Chromium mit SwiftShader unter Xvfb. Direkte Navigation zu lokalen Hosting-Adressen
ist in der verwalteten Testumgebung blockiert. Deshalb werden die lokalen Quellmodule
im Harness zusammengeführt und mit `set_content` gerendert. Alle produktiven Handler
und Rechen-/Importmodule bleiben darin aktiv. Lokaler Speicher und IndexedDB werden
jedoch durch In-Memory-Testadapter ersetzt; diese sind nicht Teil der produktiven App.

Die meisten Klicks erfolgen programmgesteuert über tatsächliche DOM-Handler; einzelne
Tafelaktionen verwenden emulierte Fingertipps. Die Welt wird für Screenshots gerendert
und während vieler DOM-Schritte angehalten. Geometrie, Pfade und Laufphysik werden
zusätzlich in den Node-Tests geprüft. Das ist kein FPS- oder Akkulaufzeittest.

**Nicht ausgeführt:** physisches iPad, echtes Safari, native dauerhafte IndexedDB,
tatsächlich gestartete Browser-Modulworker, HTTPS-/Home-Bildschirm-Installation,
Service-Worker-Update, tatsächlicher Offline-Neustart und nativer iPad-Dateidialog.
Worker-Einstiegspunkte werden als Module geprüft, nicht als gestartete Browserworker.
Die Offline-Dateiliste wird statisch auf Vollständigkeit geprüft; das ersetzt keinen
Offline-Gerätetest. Kein neuer 100-Personen-Lasttest wurde für diese Fassung ausgeführt.
Keine Unterrichtsstudie validiert Schwellenwerte, Aufgabenlänge oder pädagogische Wirkung.

## Geräte-Abnahme vor Unterrichtseinsatz

1. Alten Schülerstand und Lehrkräfte-Gesamtsicherung exportieren; beide Apps komplett
   aktualisieren. Name/ID, vorhandene Siegel und neue Versionsanzeige kontrollieren.
   Die Migration absichtlich begonnener sowie vollständig abgeschlossener Gruppen prüfen.
2. Schriftliche Addition/Entbündelung mit Finger im Hoch- und Querformat bearbeiten,
   Wissen öffnen und zurückgehen. Nicht alle Felder einzeln prüfen, sondern die ganze
   Tafel abgeben. Hintergrundwechsel und App-Neustart testen.
3. Frühen kurzen Test mit einem Fehler durchführen. Zielgerichtete Erklärung öffnen,
   zurückkehren, nur die offene Kernaufgabe prüfen und Toranimation kontrollieren.
4. Drei Fehler und bereits genutzten Tipp ausprobieren. Rückschau, echte Strategie,
   Budget und Cooldown prüfen. Nach wie vor keine Lernhilfe während einer Prüfrunde.
5. Sitzung beenden, Datei wirklich in „Dateien“ speichern, in aktualisiertem Dashboard
   importieren und doppelt importieren. Alte und neue Aufgaben getrennt kontrollieren.
6. Browser vollständig schließen/neu starten, dauerhafte Speicherung prüfen, Lehrkräfte-
   Sicherung wiederherstellen und einen echten Offline-Neustart der Schüler-App abnehmen.

Historische Skripte/Ergebnisdateien unter `tests/archive-v5.1/` sind als solche markiert.
Das Modul `tests/analytics/browser_harness.py` wird von den aktuellen Tests weiterverwendet;
ältere dort enthaltene Browser-Lasttestskripte sind keine aktuellen Ergebniszusagen.

Die genannten Tests und Fixtures liegen im vollständigen Kommaland-Web-App-Paket.
Das eigenständige Lehrkräfte-Paket enthält die produktive Anwendung und dieses Protokoll,
nicht den gesamten Schüler-Testaufbau.

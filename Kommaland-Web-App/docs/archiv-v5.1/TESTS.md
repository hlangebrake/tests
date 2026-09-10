# Testprotokoll · Kommaland 5.1

Stand: 10. September 2026. Grundlage: bereitgestelltes Kommaland-5.0-Paket.
Die Angaben unten beschreiben ausgeführte Prüfungen, keine Zusicherung für nicht
getestete Geräte oder Browser. Frühere 5.0-Releaseprotokolle sind in `docs/version-5.0/`
archiviert und nicht mit einer erneuten Geräteprüfung gleichzusetzen.

## Ergebnisüberblick

| Prüfung | Ergebnis |
|---|---|
| Node-Modultests | **170 bestanden, 0 fehlgeschlagen, 0 übersprungen** |
| Neue Regel-/SRL-Tests darin | **44 bestanden** |
| Vollständiger Browser-Spielablauf | **45 Quests, 393 Aufgaben**, keine JS-Fehler |
| Neue Browser-SRL-Prüfungen | **10 gebündelte Abläufe**, keine JS-Fehler |
| Syntaxprüfung produktiver JS-Module | **43 Module**, keine Syntaxfehler |
| Schüler-Modulabhängigkeiten | **28 ES-Module**, alle in der Offline-Dateiliste enthalten |
| Lehrkräfte-Modulabhängigkeiten | bleiben vollständig im eigenständigen Ordner |
| Fachliche Kern-Dateien | **13 Dateien bytegleich** gegenüber dem bereitgestellten 5.0-Paket |

## Modultests

```sh
npm test
# oder: node --test --test-concurrency=1 tests/*.test.js
```

Die 126 bisherigen Prüfungen bestehen weiterhin: Mathematik, Inhalte, Darstellungen,
Bauzustände, Wissensfluss, Aufgabenformate, Gate-Routen, Migrationen, Lernlog,
Validierung, Import/Merge/ZIP, Summen und Zeitfilter, Rücksicherung, Datenbank-
Transaktionen und produktive Worker-Nachrichteneinstiegspunkte. Zwei assertions wurden
an die beabsichtigte neue Austauschversion und zusätzliche Offline-Dateien angepasst.

44 ergänzende Tests in `tests/regulation.test.js` prüfen: unabhängige Supportdimensionen,
Budget und Fünf-Minuten-Cooldown, rollende Begrenzung über neue Sitzungen, drei versus
fünf Fehler, Prüfungs-/Begegnungsausschluss, unterschiedliche ausdrückliche Skips,
Lesen statt vermeintlicher Orientierungslosigkeit, Fading aus neuer regulärer Evidenz
und eigenen erfolgreichen Entscheidungen, kein Fading allein aus Challengeleistung,
keine automatische Hochstufung bei Fehlern, keine Wiederverwendung derselben Evidenz,
keine als unabhängig gewertete erste Antwort nach Lösungsanzeige, freiwillige Plan-
änderungen, ein einmaliger Rückblick, spätere Absicht aus der jüngsten Reflexion,
keine Wiederbelebung älterer Absichten nach „später entscheiden“, fehlende Daten und
Kalibrierungsgrenzen, Herausforderungstrennung, Rückkehr zu offenen Quests,
Zeitfilter, Format-1-/Format-2-Verträglichkeit und ungültige SRL-Felder, idempotenter
Ereignismerge, kein zusammengesetzter Score, keine erfundene Strategie und keine
Erfolgszuordnung über Aufgaben- oder Sitzungsgrenzen.

Die Datenbanktests verwenden eine asynchrone In-Memory-IndexedDB-Attrappe mit Schlüsseln,
Indizes, Transaktionen und Rollback. Die produktiven Import- und Berechnungsmodule
bleiben unverändert im Test. Dies ist **kein Nachweis nativer IndexedDB-Persistenz**.

Vollständiger Node-Lauf: `tests/node-results.txt`.

## Browser-Regressionslauf: bestehendes Spiel

`xvfb-run -a python3 tests/browser_regression.py`

Alle 45 Quests wurden über die tatsächlichen Antwortbedienelemente mit insgesamt
393 Teilaufgaben abgeschlossen. Antworttypen: 64 Einfachauswahlen, 240 Zahleneingaben,
6 Markierungen, 12 Zuordnungen, 28 Fehlersuchen, 18 Mehrfachauswahlen, 6 Reihenfolgen,
8 Zahlengeraden und 11 Argumentationsaufgaben. Der Test verwendet bekannte Lösungen;
er ist kein Schüler-Wirksamkeitstest.

Zusätzlich ausgeführt: blasse Zukunftszeichen, Vorwissenswarnung übergehen, Zuordnung
per Maus, emuliertem Finger und Tastatur, frühe Wegprüfung mit 19 Aufgaben ohne Hilfen,
18 richtige Antworten behalten/einen Gedanken wiederholen, Gateöffnung, Bauabschlüsse,
Gebietsschmuck, dünn beschriftete Zahlengerade, Rückimport von Spielständen. Komplexe
Aufgabenansichten wurden in 1024×768, 820×1180 und 768×1024 auf Überlauf und erreichbare
Fußleisten geprüft. Der gesamte Probelauf mit Zusatzprüfungen exportierte 413 Versuche;
dies ist mehr als die 393 Questaufgaben, weil Testaufgaben hinzukommen.

Maschinenlesbarer Bericht: `tests/browser-regression-results.json`.

## Browser-SRL-Integration

`xvfb-run -a python3 tests/regulation_browser.py`

Zehn gebündelte Prüfabläufe:

1. Startplan und Sicherheit, dritte statt erste falsche Antwort als Anlass, realer
   Beispielknopf, erhaltene Eingabe, einmalige Zuordnung eines folgenden Erfolgs.
2. Kleine Hilfe zuerst, ausdrücklich geöffneter Tipp korrekt gezählt, vollständiger
   Rechenweg erst nach bewusstem Durchlaufen der Unterstützungsstufen erreichbar.
3. Drei verschiedene Zurückstellungen, gemeinsames Zweierbudget, weder weitere
   Fehler noch ein Gebietsaustritt erzeugen einen dritten automatischen Impuls.
4. Wegprüfung bleibt ohne Strategieauswahl, fachliche Hilfen und Lösungsanzeige.
5. Genau zwei freiwillige Abschlussfragen, tatsächlicher Export-Blob in Format 2,
   Reflexion vor `session_finished`, Erinnerung beim nächsten Start, rollendes Budget.
6. Strukturangebot verändert freie Navigation erst nach Annahme; optionaler
   Austrittsgrund wird gespeichert und die Fortsetzungsaktion aufgerufen.
7. Navigationsstufe 0 bietet auf der Karte nur die selbst aufrufbare Auswahlhilfe.
8. Planung, Rückblick, Einstellungen und Auswahlhilfe in 1024×768, 820×1180,
   768×1024 und 390×844; erreichbare Fußleisten, kein horizontaler Inhaltsüberlauf.
9. Import auf frischem Testprofil übernimmt ID, mathematischen Stand, Rückblick und
   aus Ereignissen abgeleiteten Unterstützungsgrad.
10. Tatsächliche Lehrkräfte-Dateiauswahl: Klassen- und Personen-Lernentscheidungen
    erscheinen; dieselbe Exportdatei erneut importiert vergrößert den Eventbestand nicht.

Maschinenlesbarer Bericht: `tests/regulation-browser-results.json`.
Screenshots entstanden in der laufenden App mit synthetischen Testdaten. Für ruhige
Dokumentationsbilder wurden kurzlebige alte Toasts nur während der Aufnahme ausgeblendet.
Die Hauptoberfläche selbst wurde nicht aus Bildern zusammengesetzt.

## Integritätsprüfung

`tests/integrity-results.json` enthält SHA-256-Werte für 13 bytegleich gebliebene Dateien:
`content.js`, `lessons.js`, `practice.js`, `challenges.js`, `math.js`, `adventure.js`,
`quest-models.js`, `world.js`, `state.js`, `learning-flow.js`, `task-widgets.js`,
`visuals.js` und `visual-models.js`. Aufgaben, Korrekturregeln und Modelle wurden dort
nicht verändert. Die neue Präsentation ist an den vorhandenen App-Ereignispunkten
angebunden. Die statische Prüfung fand keine fehlenden relativen Modulimporte.

## Tatsächliche Browserumgebung und Grenzen

Chromium mit SwiftShader unter Xvfb. Die verwaltete Testumgebung blockiert Navigation
zu lokalen Hosting-Adressen (`ERR_BLOCKED_BY_ADMINISTRATOR`). Deshalb werden die
lokalen Quellmodule im vorhandenen Test-Harness zusammengeführt und mit `set_content`
gerendert. Tests ersetzen lokalen Speicher/IndexedDB durch In-Memory-Attrappen; diese
Attrappen werden **nicht** in die produktive App importiert.

Für Cooldown-/Sitzungstests wird die Testuhr gezielt weitergestellt. Im SRL-UI-Test
pausiert der Welt-Renderer nach einem gerenderten Hintergrund, um DOM-Abläufe schneller
zu prüfen. Das ist kein Leistungstest des iPads. Der komplette Spiel-Regressionslauf
führt die Spielwelt separat aus. Testaufrufe des Austrittsdialogs prüfen Entscheidung
und Fortsetzungs-Callback, nicht jede mögliche reale Laufroute durch die Landschaft.

**Nicht ausgeführt:** physisches iPad, echtes Safari, native dauerhafte IndexedDB,
tatsächliche Browser-Modulworker, Installation über HTTPS/Home-Bildschirm, Service-
Worker-Update/Offline-Neustart oder das Speichern im nativen iPad-Dateidialog. Die
Modul-Worker-Einstiegspunkte werden als Module geprüft, nicht als gestartete Browser-
Worker. Datei-Blob-Prüfung beweist nicht, dass ein Benutzer eine Datei wirklich speichert.
Keine Beobachtungsstudie belegt die pädagogische Wirksamkeit oder Eignung der Schwellen.

## Geräte-Abnahme vor der Lerneinheit

- Auf einem Schul-iPad alten Spielstand sichern, Schüler-App **und** Dashboard vollständig
  aktualisieren. Release 5.1 prüfen; alte Aufgabenposition, ID und Siegel kontrollieren.
- Ohne Planung starten, anschließend eigenen Plan ändern. In einer regulären Aufgabe
  mehrere Fehler machen und eine echte Hilfe öffnen. Danach normal weiterarbeiten;
  automatische Unterbrechungen mitzählen. Prüfungstor muss ohne Hilfen bleiben.
- Navigation 0 wählen, Auswahlhilfe selbst öffnen. Mehr Orientierung ablehnen und
  annehmen. Bei offenen Aufgaben ein Gebiet wechseln und automatische Laufziele prüfen.
- Rückblick überspringbare Angaben, echte Datei speichern, neue Sitzung mit optionalem
  Vorhaben starten. Export im aktualisierten Dashboard importieren und doppelt importieren.
- Browser vollständig schließen/neu starten. Schülerstand und Dashboarddaten prüfen,
  Lehrkräfte-Sicherung herstellen/wiederherstellen, neuen Schüler-Offlinestart testen.

Frühere Browser-Skripte/Lasttestdaten unter `tests/analytics` bleiben als Referenz im
Entwicklungspaket. Nicht jede frühere Browserprüfung oder ein alter großer Testbestand
wurde für 5.1 erneut ausgeführt; maßgeblich sind die hier genannten aktuellen Läufe.

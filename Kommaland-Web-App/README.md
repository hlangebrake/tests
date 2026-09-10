# Kommaland 6.0 – kompakter Dezimalzahlen-Lernweg

Statische HTML-/CSS-/JavaScript-Anwendung mit begehbarer 3D-Landschaft und separatem Lehrkräfte-Dashboard. Kein Build-Schritt, kein Backend, kein CDN erforderlich. Stand 10.09.2026.

## Was geändert wurde

16 reguläre Quests mit 77 Aufgaben, 8 freiwillige Challenges mit 24 Aufgaben. Insgesamt 24 Quests / 101 Aufgaben statt 45 / 393. 22 davon sind zusammenhängende Rechentafeln mit insgesamt 58 Zahlenfeldern. Ihre Zwischenwerte und Endergebnisse werden gemeinsam geprüft. Aufgabenmengen sind keine Schätzung der nötigen Arbeitszeit.

24 kompakte Kern-Wissenskarten plus 83 freiwillige Auffrischungskarten. Kurze Wegprüfungen mit 3–6 Aufgaben im vollständigen Erstversuch. Zwei kurze metakognitive Schritte bei relevanten Fehlermustern; das bestehende Unterbrechungsbudget bleibt bestehen. Alle Quellen, Bestandsanalyse und Soll-Entscheidungen sind dokumentiert.

## Bereitstellung

1. Vorhandene Schülerstände als JSON und Lehrkräfte-Daten als Gesamtsicherung exportieren.
2. Den gesamten Paketinhalt in das bisherige statische Hosting-Verzeichnis hochladen, Unterordner beibehalten. `index.html` muss dort direkt liegen. Auch `teacher-dashboard/shared/` wird von der Schüler-App benötigt und darf nicht entfernt werden.
3. Schüler-App und separat bereitgestelltes Dashboard vollständig aktualisieren. Alle alten Fenster schließen und neu öffnen. Im Rucksack steht „Kommaland 6.0“.
4. HTTPS verwenden. Für lokale Entwickler-Tests: `npm run serve`, dann `http://localhost:8080`. Nicht per Doppelklick als `file://` bereitstellen. Auf einem anderen Gerät bedeutet localhost dessen eigenes Gerät.
5. Auf dem iPad in Safari öffnen, einmal vollständig laden, dann zum Home-Bildschirm hinzufügen. Vollbildknopf und Offline-Dateicache bleiben vorhanden. Installation, Offline-Neustart und Speicherung vor dem Unterricht am tatsächlichen Gerät abnehmen.

Das Dashboard kann separat bereitgestellt werden: den gesamten Inhalt von `teacher-dashboard/` zusammen hochladen. Es benötigt keine Dateien oberhalb dieses Ordners. Die Schüler-App bleibt am bisherigen Ort; das vermeidet einen neuen Browser-Speicherbereich.

## Spielstände und Lernhistorie

Austauschformat 3, App-Version 6.0.0, eingebettetes Spielstandschema weiterhin 3, Inhaltsversion 6. Alte Lernstandsdateien der Austauschformate 1/2 bleiben importierbar. Alte reine Spielstände sind in der Schüler-App ladbar und können anschließend mit Name/ID exportiert werden.

**Inhaltliche Änderung bedeutet keine Eins-zu-eins-Fortsetzung der alten Aufgabennummer.** Vollständig erledigte Vorgängergruppen werden als Abschluss angerechnet. Noch offene oder nur teilweise erledigte Gruppen beginnen in der neuen Folge bei Aufgabe 1. Ihre alten Abschlüsse, Teilstände und vorhandenen Ereignisse bleiben im Archiv bzw. Verlauf erhalten. Pausierte alte Langtests werden archiviert; neue kurze Prüfrunden beginnen neu. Bestehende Gebietssiegel gelten weiter. Details: `MIGRATION.md`.

Neue Aufgaben haben neue IDs. Angerechnete Abschlüsse sind keine erfundenen korrekten Versuche auf neuen Aufgaben. Neue schriftliche Verfahren können über „Noch einmal üben“ nachgearbeitet werden. Historische Quoten vor und nach dem Curriculumwechsel haben unterschiedliche Nenner und dürfen nicht als unmittelbarer Leistungszuwachs interpretiert werden.

## Bedienung

Bewegen: Steuerkreis oder Boden antippen; Tastatur Pfeile/WASD. Nahe Objekte antippen/E. M: Karte. Esc: Schließen. Noch nicht empfohlene Quests sind blass und mit übergehbarer Warnung erreichbar. Wegbarrieren bleiben echte Nachweise. Ein Projekt wird erst bei bestätigtem Abschluss fertig aufgebaut. Herausforderungen sind freiwillig.

Rechentafeln: Feld antippen, eigenes Zahlenfeld verwenden. „Nächstes Feld“ prüft noch nichts. Erst „Antwort prüfen“ gibt die ganze Rechnung ab. Komma und Punkt werden bei Zahleneingaben gleichwertig akzeptiert. Hilferücksprünge behalten die begonnene Rechnung. Handschriftliche Rechenwege auf Papier ergänzen die digitale Bearbeitung; die App bewertet keine freien Notizen.

Rucksack: Plan, Unterstützung, Export, Import, Sitzungsabschluss und Rücksicherung. Name oder vereinbartes Kürzel wird stabil mit zufälliger ID verknüpft. Daten bleiben lokal; es gibt keinen automatischen Upload zur Lehrkraft. Lokaler Speicher ist keine Sicherung. Exporte tatsächlich in „Dateien“ speichern, nicht nur den Downloadknopf betätigen.

## Dokumentation

- `RECHERCHE.md`, `BESTANDSANALYSE.md`, `INHALTSPLAN.md`: Recherche und Analyse vor Umsetzung.
- `KOMPETENZABDECKUNG.md`, `LERNWEG.md`, `AUFGABEN.md`: fachliche Einordnung, Progression und vollständige Lösungen.
- `PRUEFUNGEN.md`, `SCHAUBILDER.md`, `SELBSTREGULATION.md`: Nachweise, Hilfen und Regulationsregeln.
- `MIGRATION.md`, `TESTS.md`: Übernahme und tatsächliche Testgrenzen.
- `teacher-dashboard/ANLEITUNG.md`: Lehrkräfte-Auswertung.
- `docs/archiv-v5.1/`: ausdrücklich historische Dokumente, nicht aktuelle Inhaltszusagen.

## Entwicklung und Prüfen

`js/curriculum-data.js` ist die zentrale aktive Inhaltsquelle. Keine automatische Dreier-Erweiterung. `js/foundation-checks.js` enthält die kurzen Testvorlagen. Nach Inhaltsänderungen `node tools/build-catalog.mjs` ausführen; der Lehrkräfte-Katalog enthält keine Lösungen. Die aktiven IDs dürfen nicht für inhaltlich andere Aufgaben wiederverwendet werden.

`npm test` führt die aktuellen Node-Tests aus. `python tests/check_arithmetic.py` prüft die unabhängigen Dezimal-/Bruchrechnungen. Aktuelle Browserprüfungen: `tests/content_browser.py` und `tests/integration6_browser.py` (Playwright, Chromium, Xvfb). Das mitgelieferte Browser-Harness ist ausdrücklich ein Testaufbau mit Speicherattrappen, keine Abnahme realer Safari-Speicherung oder Offline-Installation.

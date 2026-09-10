# Prüfungen · Kommaland 7.0 Lehrkräfte-Dashboard

> **Release 7.2:** Dashboardlogik und Austauschschema 5 bleiben gegenüber 7.1 unverändert. Schüleroberflächen sind neu priorisiert; tatsächliche Niveau-, Hilfe- und Aufgabenereignisse werden weiter identisch verarbeitet.


Die gemeinsame Endprüfung ist in der Schuldistribution zusätzlich unter `../TESTS.md` enthalten. Bei separatem Dashboardhosting ist diese Datei eine knappe Zusammenfassung.

Erfolgreich: 224 gemeinsame Node-Modultests (0 fehlgeschlagen/übersprungen/abgebrochen), acht Browser-Skripte mit 58 gebündelten Prüffällen ohne JavaScript-Seitenfehler. Darunter Dashboard-Smoke (7 Fälle), Export/Import-Roundtrip (6 Fälle), neue fachliche Ansicht/Diagnosekarten/Notizen und das bereinigte Schul-Dashboard. Fünf identische neue Importe bleiben idempotent; bestehende 6.1-Dateien werden ohne erfundene Zusatzleistungen übernommen. Zwei produktive Worker-Handler wurden separat als ES-Module ausgeführt. Synthetischer Bestand: 100 Personen / 36.974 Ereignisse.

**Grenzen:** Chromium-Source-Harness mit In-Memory-IDB/localStorage, keine native dauerhafte Datenbank über echten Browserneustart. Der lokale HTTP-Aufruf wurde administrativ blockiert. Kein reales Safari/iPad, keine echten Browser-Modulworker, keine tatsächliche Service-Worker-Installation und kein Offline-Neustart getestet. Kein diagnostisch validierter Algorithmus und keine Unterrichtswirksamkeitsstudie. Die oben genannten Endläufe enthalten keinen Timeout; ein fehlerhafter früherer Testklick verursachte einen Locator-Timeout und wurde nach Korrektur erfolgreich neu geprüft.

Vor Unterrichtsbeginn native Installation, Import, Reload, Sicherung/Wiederherstellung, identische Reimporte und Offline-Neustart auf dem tatsächlichen Gerät abnehmen. Keine produktiven Schülerdaten als Entwicklungsfixture verwenden.

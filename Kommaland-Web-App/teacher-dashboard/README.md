# Kommaland 6.0 · Lernblick für Lehrkräfte

Den **gesamten Inhalt dieses Ordners** zusammen auf einem statischen HTTPS-Webserver
bereitstellen und `index.html` über die Webadresse öffnen. Keine Installation, kein
Build, kein Backend erforderlich. Nicht durch Doppelklick als `file://` öffnen.

`ANLEITUNG.md` erklärt Import, Auswertung, Zeitfilter und Datensicherung.
`DATENFORMAT.md` dokumentiert das mit der Schüler-App geteilte Format.
`DATENSCHUTZ-TECHNIK.md` beschreibt lokale Verarbeitung und Betriebsgrenzen.

Die Anwendung erwartet Kommaland-Lernstandsdateien mit Name und stabiler ID;
Austauschformate 1 (5.0), 2 (5.1) und 3 (6.0) werden unterstützt.
Version 6 verwendet 16 reguläre Quests mit 77 Aufgaben und 8 optionale Challenges
mit 24 Aufgaben. Alte Quests bleiben als Archiv in der Detailansicht erhalten; ihre
Versuche werden nicht als Antworten auf neue Aufgaben umgedeutet.
Vor und nach dem Inhaltswechsel ändern sich die Bezugsgrößen des Fortschritts.
Die neue Ansicht „Lernentscheidungen“ ergänzt fachliche Daten um freiwillige Ziele,
Strategien und Unterstützungsverläufe. Keine Selbstregulationsnote, keine Diagnose.
Ältere reine Spielstände zuerst in der aktualisierten Schüler-App öffnen und neu
exportieren. Demodaten werden nur ausdrücklich und in einer getrennten Datenbank geladen.

Gemeinsame Module in `shared/` und die lokale ZIP-Bibliothek in `vendor/` nicht entfernen.
Die Hauptanwendung benötigt keine Dateien oberhalb dieses Ordners. Änderungen am
Schema müssen gleichzeitig in die separat bereitgestellte Schüler-App übernommen werden.

Lokaler Browser-Speicher ist kein Backup. Vor produktivem Einsatz Persistenz, Dateiimport,
Modul-Worker und Wiederherstellung auf dem vorgesehenen Browser/Gerät prüfen.

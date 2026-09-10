# Kommaland 7.2

Statische 3D-Lernlandkarte für Dezimalzahlen, Gymnasium Jahrgang 6. Technische und didaktische Basis ist die bereitgestellte **Version 7.1**. Version 7.2 ändert Informationsarchitektur und Präsentation, nicht Aufgaben, Niveauregeln oder Lernstandschema.

## Bereitstellung und Update

Zuerst Schülerstände und Lehrkräfte-Datenbank exportieren. Danach den **gesamten Inhalt von Kommaland-7.2-Schule.zip** am bisherigen HTTPS-Hostingort ersetzen; alte Appfenster schließen und neu öffnen. Im Rucksack und Lehrkräfte-Dashboard steht 7.2. Nicht nur HTML oder CSS austauschen: Das neue Modul `js/presentation.js` gehört auch in den aktualisierten Offlinecache.

Schüler-App: `index.html`. Lehrkräfte: `teacher-dashboard/index.html`. Zur getrennten Bereitstellung den vollständigen Ordner `teacher-dashboard/` verwenden. Der Ordner `teacher-dashboard/shared/` wird zugleich von der Schüler-App benötigt und darf dort nicht entfernt werden. Keine neue Bibliothek, kein Backend und kein Buildschritt. Entwicklungsserver: `python3 -m http.server 8080`.

## Die Arbeitsansicht

**Mathematisches Thema → Aufgabe → Darstellung/Eingabe → fachliche Rückmeldung.** Der Questname bleibt klein darunter. `N2 ▾` öffnet die unveränderte Niveauwahl. Punkte zeigen den Aufgabenfortschritt; die genaue Anzahl ist für Screenreader beschriftet, nicht zusätzlich sichtbar.

Vor dem Start ist das Ich-kann-Ziel sichtbar. Erfolgskriterien unter „Woran erkenne ich das?“, Geschichte unter „Questgeschichte anzeigen“. Zusatzübung und Partnerauftrag stehen ebenfalls auf Nachfrage zur Verfügung.

Während der Bearbeitung stehen im Fußbereich im Regelfall **Hilfe ▾** und **Antwort prüfen**. Hilfe enthält Wissen, Beispiel, Tipp, Strategie und den vorhandenen Zugang zur Zusatzübung. In Zusatzrunden sind Unterbrechen und Auslassen dort erreichbar. Das Öffnen des Menüs zählt nicht als fachliche Hilfenutzung; erst die angeforderte Hilfe wird wie bisher protokolliert.

Wissen beginnt mit einem mathematischen Kernsatz und der interaktiven Darstellung. Der vollständige bisherige Erklärungstext bleibt unter „Weitere Erklärung“ erreichbar. Schriftliche Rechenbeispiele, Überträge und veränderbare Werte bleiben vorhanden. Lernende können beim Nachlesen und Ändern des Niveaus zur begonnenen Eingabe zurückkehren.

## Weniger Unterbrechungen

Eine bestandene Wegprobe öffnet die Sperre sichtbar und setzt den Weg zur Zielregion fort. Es gibt keinen zusätzlichen Erfolgsdialog oder Bestätigungsklick. Die Öffnung wird für Screenreader angekündigt. Rückwege bleiben in beiden Richtungen frei; neue Gebiete erhalten dadurch keine ungeprüften Nachweise.

Ein regulärer Questabschluss enthält die kurze Ziel-Selbsteinschätzung und die bisherige adaptive Wahl des nächsten Schritts, nicht eine zusätzliche Belohnungsgeschichte. Challenges und Erinnerungsrätsel kehren nach Abschluss direkt zur Welt zurück. Bau- und Gebietsveränderungen bleiben sichtbar. Fehlerhafte Wegproben behalten ihren fachbezogenen Bericht und gezielte Nacharbeit.

Erfolgreicher Autosave arbeitet still. Speicherfehler bleiben als Warnung sichtbar. Importbestätigung, beschädigte Daten, Export-/Datenschutzhinweise und sicherheitsrelevante Entscheidungen werden nicht versteckt. Nach der einmaligen Einführung verschwinden dauernde Steuertexte; sie stehen im Rucksack unter „Steuerung nachlesen“.

## Unveränderte Lernfunktionen

16 Kernquests mit 77 Kompetenzpositionen in drei wählbaren Formen (231 Varianten, nicht 231 Pflichtaufgaben), acht Challenges mit 24 Aufgaben, 72 freiwillige Zusatzaufgaben und acht offene Partneraufträge. Die mathematischen Aufgabendateien und die Kernmodule für Speicherung, Regeln, Lernhistorie und 3D-Welt sind bytegleich zur 7.1-Basis geprüft. N1/N2/N3 gelten je Quest; nur noch nicht gezeigte Aufgaben ändern ihre Form. Kein automatischer Niveauwechsel, keine Note, keine automatische Bewertung freier Texte.

## Speicherstände und Datenschutz

Austauschschema **5**, eingebettetes Spielstandschema **3**, Kerncontent **6** bleiben gleich; Appversion ist **7.2.0**. Für 7.1 ist kein fachlicher Reset oder neues Einlesen erforderlich. Identität, Niveaus/Pins, Abschlüsse, offene Aufgaben, Hilfen, Zusatzrunden, Reflexionen, Wegprüfungen und Partnernotizen bleiben erhalten. Siehe `MIGRATION.md`.

Datenverarbeitung weiterhin lokal, keine Cloud oder Telemetrie. Exporte enthalten Namen/Kürzel, IDs, Lernhistorie und freiwillige mathematische Notizen; Dateien sind nicht durch die App verschlüsselt. Regelmäßig exportieren: gelöschte Websitedaten sind kein dauerhafter Datenspeicher.

## Dokumentation und Grenzen

`START-HIER.md`: Betrieb. `UI-DESIGN.md`: verbindliche Hierarchie und Popup-Regel. `VISUELLE-REGRESSION.md`: Vorher/Nachher. `AENDERUNGEN.md`: Dateien. `TESTS.md`: tatsächlich ausgeführte Prüfungen und Geräte-Abnahme. Bestehende fachliche Kataloge werden mit Hinweis auf unveränderte Gültigkeit mitgeliefert.

Browserprüfungen: Chromium-Quellcode-Harness mit Speicherattrappen. Physisches iPad, Safari, echte dauerhafte Speicherung und Offline-Neustart sind nicht abgenommen. Vor dem Unterricht Geräte-Test durchführen. Es gibt keinen separaten 2D-Lernmodus.

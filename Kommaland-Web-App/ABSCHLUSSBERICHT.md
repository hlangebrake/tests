# Abschlussbericht · Kommaland 7.2

## Ausgangsbasis

Verbindliche Grundlage: die bereitgestellte Version 7.1, nicht eine Neuentwicklung. Originalquellen, 278 Baseline-Modultests und die tatsächlichen Bildschirmansichten wurden vor Änderungen geprüft. `BESTANDSANALYSE-7.2.md` dokumentiert die Entscheidung pro Oberfläche. Die Erweiterung betrifft Informationsarchitektur, Sichtbarkeit, kurze Systemtexte und Fokusführung.

## Implementierte Änderungen

| Bereich | Änderung | Betroffene Quellen |
|---|---|---|
| Aufgabenheader | Mathematiktitel dominant, Questname klein, `N2 ▾`, zugänglich beschriftete Punkte statt Doppelzählung; kein permanenter NPC-/Regionsblock | `js/presentation.js`, `js/app.js`, `styles.css` |
| Intro und Ziel | Ziel sichtbar, Kriterien/Story/weitere Lernangebote auf Nachfrage | `js/enrichment.js`, `js/app.js` |
| Wissen und Beispiele | Mathematische Kernaussage, vorhandene Visualisierung, schriftliche Übertragung; ganzer Originaltext unter „Weitere Erklärung“ | `js/presentation.js`, `js/visuals.js`, `js/written.js` |
| Hilfen | Gemeinsamer kompakter Zugang, jede bisherige Hilfe erreichbar, korrekte Zustände und Rückkehrfokus | `js/presentation.js`, `js/app.js` |
| Rückmeldung | Tatsächlich richtige mathematische Aussage/Eintragung zuerst; notwendige Erklärungen unverändert | `js/presentation.js` |
| Niveauregelung | Kürzere Angebote, Begründung optional, bestehende Wahl-/Empfehlungslogik unverändert | `js/difficulty-ui.js` |
| Abschluss | Reguläre Zielreflexion bleibt, Belohnungs-/Speicherzähltexte entfallen; Gate und Challenge direkt zurück in die Welt | `js/app.js`, `js/regulation-ui.js` |
| Welt/HUD | Mathematischer nächster Schritt, ruhigerer Status, Steuerhilfe nach Einführung im Rucksack | `index.html`, `js/app.js`, `styles.css` |
| Speicherung | Erfolgreicher Autosave still, Fehler sichtbar; unabhängige Historienwarnung bleibt bis Bestätigung | `js/app.js` |
| Version/Offline | App 7.2.0, gemeinsames Schema unverändert, neues Präsentationsmodul im Cache | Manifeste, Service Worker, `shared/save-schema.js` |

## Erhaltene Funktionen und Mathematik

16 Kernquests mit 77 Kompetenzpositionen, je drei wählbare Formen; acht Challenges mit 24 Aufgaben; 72 freiwillige Zusatzaufgaben; acht offene Partneraufträge; sämtliche Lernziele, Hilfen, Selbstregulations-/Niveauregeln, Diagnosespuren und das Lehrkräfte-Dashboard bleiben erhalten. Kein Pflichtzuwachs und keine reduzierte mathematische Kompetenz.

17 fachliche, zustandsbezogene beziehungsweise lernlogische Dateien stimmen per SHA-256 mit der tatsächlichen Basis überein, darunter Aufgabenbanken, Rechenvalidatoren, Wegprüfung, Speicher-/Lernlogik, Niveauregeln, schriftliche Modelle, Wissensinhalte und 3D-Welt. Bestehende mathematische Sachtexte bleiben intakt. Nur Präsentation und ergänzende Systemtexte ändern sich. Offene Antworten werden weiterhin nicht automatisch bewertet.

## Sichtbarer Unterschied

Gleiche 1024×768-Testsituation, originale 7.1 gegen 7.2: Header plus Fußleiste der Rechentafel rund 287→159px. Die Aufgabe beginnt in der Aufnahme 58px höher; im festgehaltenen Ausgangszustand passen Tafel und Zahlenfeld ohne internes Scrollen. Das Wissen zeigt Kernaussage und Modelle vor der vollständigen optionalen Erklärung. Die ruhige Arbeitsfläche hebt sich von der weiterhin sichtbaren, dahinter gedämpften 3D-Welt ab.

Zehn Original/Vergleichsaufnahmen und neun Bildpaare liegen im Entwicklungspaket. `VISUELLE-REGRESSION.md` beschreibt auch verbleibendes Scrollen bei langen Aufgaben, Modellen, Feedback oder großer Schrift. Es wird nicht behauptet, dass jede Lernansicht ohne Scrollen auf jedes Gerät passt.

## Migration 7.1 → 7.2

Austauschschema5, Spielstandschema3 und Kernkennung6 unverändert. Kein fachlicher Reset, keine neu erfundenen Niveaus oder Leistungen. Eine mit tatsächlichem 7.1-Code erzeugte synthetische Sicherung und mehrere unterschiedlich weit fortgeschrittene Zustände werden übernommen. Lernhistorie, Pinning der begonnenen Aufgabe, Niveaureflexion, Zusatzübung, Notizen und beide Richtungen freier Wege bleiben erhalten.

Vor dem Update exportieren; vollständige Schul-ZIP am bisherigen Ort ersetzen. Schüler-Einstieg `index.html`, Lehrer-Einstieg `teacher-dashboard/index.html`. `teacher-dashboard/shared/` wird auch von der Schüler-App verwendet. Ein Wechsel der Domain oder das Löschen von Websitedaten ist keine automatische Migration: vorher Dateien sichern und anschließend importieren.

## Tests

Abschließend **310 Modultests** bestanden (32 neue Prüfungen gegenüber Basis). **Zehn Browserprogramme mit 88 gebündelten Fällen** bestanden; darunter alle 231 auswählbaren Kernvarianten, der ursprüngliche vollständige 24-Quest-/101-Aufgabenweg und alle72 Zusatzaufgaben. Null Fehler, übersprungene Fälle oder Timeouts in diesen Endläufen. Zwei produktive Worker-Handler unter Node bestanden. Separat unabhängige exakte Mathematikprüfungen und ein Import mit 100synthetischen Personen/36.974Ereignissen.

Zwei native HTTP-Startversuche wurden administrativ blockiert, nicht als Erfolg gezählt. Ein früher Entwicklungslauf hatte einen tatsächlichen Escape-/Hilfezustandsfehler mit 30Sekunden Locator-Timeout; Ursache behoben, Regression ergänzt, Endläufe wiederholt. Einzelheiten, reproduzierbare Befehle und Rohberichte: `TESTS.md`.

## Bekannte Grenzen

Kein physisches iPad/Safari, kein echter Offline-Neustart, keine native Persistenz-/Workerabnahme; Chromium-Tests verwenden Quellcode-Harness und Speichermocks. Keine vollständige Screenreader-/WCAG-Auditierung, kein repräsentativer Performancebenchmark oder empirischer Wirksamkeitsnachweis. Die festgelegte Informationshierarchie ist eine Gestaltungsentscheidung; die Aufnahmen zeigen reale Appausgaben, aber keine Unterrichtsbeobachtung.

Speicherung bleibt lokal und unverschlüsselt. Stiller Autosave ist kein Ersatz für Dateiexporte; Browserdaten können gelöscht werden. Sichtbare Speicherfehler werden nicht verborgen. Geräte-Abnahme vor dem Unterricht siehe `TESTS.md`.

## Auslieferung

`Kommaland-7.2-Schule.zip`: produktive App/Dashboard, notwendige Assets und Dokumentation; keine Tests, Bilder, Debugobjekte, temporären Dateien oder alten vollständigen Appversionen.

`Kommaland-7.2-Entwicklung.zip`: Quellcode, Tests, synthetische Migrationsreferenzen, Rohberichte, relevante historische Dokumente und aktuelle Vorher-/Nachherbilder. Keine eingebetteten alten vollständigen ZIPs oder Paketmanager-Abhängigkeiten.

Beide Pakete werden von `tools/package-release.py` geprüft. Integrität, sichere/eindeutige Pfade, Startdateien und SHA-256: `Kommaland-7.2-Paketpruefung.json`. Die Schuldateien wurden zusätzlich ohne Debugzugänge im Browser-Testaufbau gestartet.

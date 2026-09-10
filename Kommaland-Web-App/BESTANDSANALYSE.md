> Historische Bestandsanalyse zur Entwicklung von Version 7. Die tatsächliche Arbeitsgrundlage und Schnittstellen für 7.1 stehen in BESTANDSANALYSE-7.1.md.

# Bestandsanalyse vor den Änderungen an Version 7

Stand: 10.09.2026. Technische Arbeitsgrundlage: tatsächlich entpackte `Kommaland-6.1-Web-App.zip`. Die Inhaltsprogression ist diejenige von 6.0. Die neue Arbeit erfolgt in einer Kopie; das Original bleibt unverändert.

## Tatsächliche Architektur

- Eigene WebGL-Engine (`js/engine.js`), `world.js`, Terrain und Questmodelle. Kein Three.js, kein Framework oder Build nötig.
- `curriculum-data.js` enthält 16 reguläre Quests / 77 Aufgaben und acht Challenges / 24 Aufgaben. `content.js` exportiert den aktiven Lernweg. IDs und `contentVersion:6` identifizieren diesen unveränderten Kompetenzkern.
- `math.js` prüft zehn strukturierte Antworttypen mit Dezimalkomma. `task-widgets.js` stellt Zuordnen, Markieren und Argumentkarten dar.
- `lessons.js`, `visuals.js`, `visual-models.js` enthalten die Kernkarten und freiwilligen Wiederholungen. Die alten 5.x-Aufgaben sind als JSON/Dokumentation und Generator vorhanden, nicht mehr Pflichtprogression.
- `state.js`: Spielstandschema 3, stabile installationsabhängige localStorage-Schlüssel, Rücksicherung und Validierung. `learning-log.js`: IndexedDB-Ereignisse plus kurzer Write-ahead-Puffer, stabile Identität und Export.
- `adventure.js` / `foundation-checks.js`: 22 gerichtete Prüfungen auf elf Wegen. Kernnachweise und physischer Wegstatus getrennt. `openPaths` öffnet Hin- UND Rückweg dauerhaft.
- `written*.js`: vier in 6.1 hinzugekommene Dateien; exakte Überträge, Entbündeln, Teilprodukte, Divisionsschritte. 88 feste Beispielrechnungen auf 56 Karten plus dynamische Kopplung an Schaubilder.
- `regulation.js` / `regulation-ui.js` / gemeinsame Regulationsmodule: individuelles Fading, Cooldown und gemeinsames Unterbrechungsbudget, Planung und Rückblick. Intern sinnvolle Trennung, aber numerische Support-Stufen sind noch sichtbar.
- Lehrkräfte-Dashboard: getrennte IndexedDB, Import/ZIP/Merge, Rohdatenprojektion und Worker-Optimierung, Klassen-/Themen-/Detail-/Zeitansichten. Der tatsächliche HTML-Footer lautet fälschlich noch „Kommaland 5.1“; wird in 7 bereinigt.
- Offline: eigener versionierter Service Worker für Schüler-App. Dashboard bisher nicht eigenständig precached. Bibliotheken lokal (JSZip nur für Import).

## Übernahme aus 6.1

Binärvergleich mit dem tatsächlich vorhandenen 6.0-Paket: `styles.css`, `sw.js`, `js/adventure.js`, `js/state.js`, `js/app.js`, `js/visuals.js`, vier `written`-Module, gemeinsame App-Versionskonstante. Vollständige Liste: `docs/version-6.1/code-diff.json`.

Erhalten werden alle permanenten beidseitigen Wegfreigaben einschließlich defensiver Importprüfung sowie alle interaktiven schriftlichen Verfahren. Keine Neuinterpretation der 6.1-Änderungen als neuer Kompetenzkern.

## Was gut funktioniert

Kompakte Progression, Vorgriffe mit Warnung statt Pflichtsperre, echte 3D-Bewegung und Wegsuche, klare drei Bauzustände, kurze differenzierte Prüfungen, lokale Historie, getrennte Challenge-Auswertung. Ausgangsprüfung nach erneutem vollständigem Lauf: 186 bestanden, 0 fehlgeschlagen. Ein vorgeschalteter Start mit zu knappem Prozesslimit wurde abgebrochen; dieser ist kein bestandener Test.

## Didaktische Lücken / notwendige Änderungen

1. Lernziele liegen in `q.goal` und Dokumenten, nicht als Ich-kann-Kriterien im Questdialog.
2. Kein eigener kurzer freiwilliger Übungsweg mit getrenntem Verlauf; Wiederholen startet eine ganze Kernquest.
3. Alle 101 Aufgaben sind strukturiert automatisch geprüft. Vorgegebene Argumentkarten sind keine selbst erzeugten Begründungen. Manche AB-III-Labels sind deshalb zu hoch.
4. Kein systematischer offener Partnerauftrag je Gebiet.
5. Fachdiagnostische Gesprächsimpulse fehlen neben allgemeinen Kennzahlen.
6. Transparenz von Wegproben und Evidenzabstufung kann verbessert werden, ohne spielerische Freischaltungen zurückzunehmen.

## Abgeleiteter Soll-Plan (vor Implementierung)

- Unverändert: 16+8 Quests, 101 Kern-/Challengeaufgaben, mathematische Antworten, Weltobjekte, Voraussetzungen, Speicherstände.
- Ergänzt: 16 sichtbare Ich-kann-Ziele mit Erfolgskriterien; kurze freiwillige Bank über zentrale Kompetenzen; 2–5 Aufgaben je Runde mit begründetem Angebot statt Pop-up-Zwang; acht offene Partneraufträge mit Solo-/Später-Option.
- Kognitive Metadaten gesondert prüfen: Argumente nachvollziehen/prüfen/ergänzen/eigenständig entwickeln; Verfahren anwenden/auswählen/entwickeln/vergleichen. Nachweis der tatsächlichen Tätigkeit, nicht der Schlüsselwörter.
- Neue Lernspuren als versionierte Ereignisse im bestehenden Log, keine zweite Schülerdatenbank. Übung und offene Aufgaben verändern niemals Kernabschlüsse, Questsummen oder Siegel.
- Gemeinsame Metadaten und Diagnoseimpulse für Schüler-App und getrennt hostbares Dashboard. Neue Ereignisse streng validieren; Import älterer Formate erhalten.
- Vereinfachte Regulationsauswahl und kompetenzbezogene Planung, keine weiteren automatischen Reflexionsschleifen.
- Tastaturfokus, Textfelder, bewegungsarme Welt und Erreichbarkeit prüfen; kein zusätzlicher 2D-Modus.
- Schul-/Entwicklungspaket getrennt, Integrität und Versionskonsistenz automatisiert prüfen.

## Fachliche Quelle

Offizielles Kerncurriculum: https://cuvo.nibis.de/index.php?docid=1779&p=detail_view (gültig ab 01.08.2015, kein Enddatum; abgerufen 10.09.2026), PDF https://cuvo.nibis.de/index.php?p=download&upload=63. Besonders S. 13 (AB), 14 (Differenzierung), 17 (Argumentieren), 18 (Problemlösen), 22 (Kommunizieren), Kompetenzbereich Zahlen/Operationen. Dies begründet eigene Erklärungen und Zusammenarbeit, schreibt aber weder diese App-Architektur noch konkrete Übungs-/Diagnoseschwellen vor.

## Nach Umsetzung abgeglichener Stand

Der vorstehende Plan wurde umgesetzt. Tatsächliche Abweichung zwischen alter Dokumentation und Code: alter Dashboard-Footer, fehlender eigenständiger Dashboardcache und zu hohe AB-III-Zuordnung strukturierter Argumentkarten. Diese Punkte wurden berichtigt. Kernaufgaben, IDs und Lösungen sind gegenüber 6.1 exakt gleich geblieben. Der bisherige Aufgaben-Generator aus 5.x wurde nicht wieder als Progression aktiviert; der neue Pool ist ausdrücklich und fachlich separat formuliert.

Produktive 3D-Architektur bleibt eigene WebGL-Engine, nicht Three.js. Reales HTTP-/Offline- und Speicherverhalten konnte in der Testumgebung nicht abgenommen werden. Dateien/Versionen, reine Funktionen, modellbasierte Navigation und Source-Harness-UI wurden getrennt geprüft (TESTS.md).

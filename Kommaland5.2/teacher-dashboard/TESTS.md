# Testprotokoll · Kommaland 5.2

Stand: 10. September 2026. Dieses Protokoll beschreibt die Prüfungen der didaktischen Überarbeitung von Version 5.1 auf 5.2.

## Verifizierter Stand

- **176 Node-Tests bestanden, 0 fehlgeschlagen.** Die 161 nicht-weltbezogenen Tests wurden als gemeinsame Suite ausgeführt. Die 15 Welt-/Geometrietests wurden wegen ihrer hohen Laufzeit zusätzlich gruppiert bzw. einzeln ausgeführt; alle bestanden.
- Darin enthalten sind neue Prüfungen zu Kompetenzzielen, Standortchecks, freiwilligem Überspringen ohne künstliche Questabschlüsse, offenen Werkstätten sowie der Validierung dieser Daten im Schüler- und Lehrkräfteformat.
- **Syntaxprüfung:** 49 produktive JS/MJS-Module plus `sw.js` ohne Syntaxfehler.
- **Relative Modulimporte:** 114 relative Importe geprüft, keine fehlende Zieldatei.
- **Chromium/Xvfb Boot-Smoke Schüler-App:** App startet ohne `pageerror`, 83 interaktive Objekte und 45 Quests werden angelegt.
- **Chromium/Xvfb Boot-Smoke Lehrkräfte-Dashboard:** Dashboard startet ohne `pageerror`, Import- und Inhaltsoberfläche sind vorhanden.

## Welt- und Wegfindungsprüfung

Die vollständige `tests/world.test.js` ist in dieser Rechenumgebung als ein einziger Lauf sehr langsam. Deshalb wurden die vier besonders teuren Wegprüfungen separat ausgeführt. Verifiziert wurden insbesondere:

- alle 83 interaktiven Ziele besitzen einen Weg vom Dorf,
- Pfade enden in Interaktionsreichweite,
- die Laufphysik erreicht alle 83 Objekte ohne Hängenbleiben,
- alle 22 gerichteten Wege stoppen an der korrekten geschlossenen Blockade,
- Gelände-, Bau-, Gate-, Meisterkristall- und Questmodelltests bestehen ebenfalls.

Das Laufzeitproblem tritt auch im unveränderten bereitgestellten 5.1-Original auf und ist daher kein durch 5.2 eingeführter Fehler.

## Didaktische 5.2-Prüfungen

`tests/didactics.test.js` prüft:

1. Jedes Gebiet besitzt ein transparentes Kompetenzziel, einen Standortcheck und eine offene Werkstatt.
2. Ein bestandener Standortcheck erzeugt ausschließlich Navigationsevidenz und keine künstlichen Questabschlüsse.
3. Ein nicht bestandener Standortcheck verändert die Freischaltung nicht.

Zusätzliche Schema- und State-Tests prüfen, dass Standortchecks und Werkstätten exportierbar, importierbar und gegen manipulierte Werte validiert sind.

## Browsergrenzen

Die umfangreichen historischen Browser-Regressionsskripte liegen weiterhin unter `tests/`. Ein kompletter erneuter End-to-End-Lauf dieser langen Skripte wurde in der aktuellen Umgebung wegen Laufzeitbegrenzungen nicht abgeschlossen. Deshalb werden frühere JSON-Berichte **nicht** als neuer 5.2-Nachweis ausgegeben.

Nicht geprüft sind insbesondere ein physisches iPad, echtes Safari, native dauerhafte IndexedDB-Persistenz, Installation über HTTPS/Home-Bildschirm sowie ein realer Offline-Neustart. Vor Unterrichtseinsatz ist daher weiterhin eine kurze Geräteabnahme auf der tatsächlich verwendeten Schulhardware erforderlich.

## Reproduzierbare Kernbefehle

```sh
npm test
node --test --test-name-pattern='83 interaktive Objekte|Jeder Lernort|Zusammenhängendes Festland|Bauabschluss|Reduzierte Bewegung|blockierten Wegquerschnitte|Gebietssiegel|Gate animation|Meisterkristalle|Questmodelle|Abschlussanimation' tests/world.test.js
node --test --test-name-pattern='Alle 83 interaktiven Ziele haben einen Weg vom Dorf aus' tests/world.test.js
node --test --test-name-pattern='Pfade enden in Interaktionsreichweite, nicht mitten im Objekt' tests/world.test.js
node --test --test-name-pattern='Die Laufphysik erreicht alle Objekte ohne Hängenbleiben' tests/world.test.js
node --test --test-name-pattern='Alle 22 gerichteten Wege stoppen die Figur an der richtigen geschlossenen Blockade' tests/world.test.js
```

`npm test` kann auf langsameren Systemen beim Welt-Test sehr lange laufen; die separaten Befehle oben sind dann die verlässlichere Freigabeprüfung.

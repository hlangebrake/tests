# Testprotokoll · Kommaland 5.0

Stand: 10. September 2026. Geprüfte Grundlage: bereitgestelltes Kommaland-4.1-Paket.
Die folgenden Ergebnisse sind ausgeführte Prüfungen, keine Zusicherung für nicht
getestete Geräte oder Browser.

## Automatisierte Modultests

`node --test --test-concurrency=1 tests/*.test.js`: **126 Tests bestanden, 0 fehlgeschlagen**.

87 bestehende Prüfungen decken weiterhin unter anderem Dezimalarithmetik, Inhalte,
Aufgabentypen, Voraussetzungen, Prüfungsrouten, Spielstandmigrationen, Wissensfluss,
interaktive Modelle, Bauzustände, Kollisionen und Offline-Dateiliste ab. Die Liste wurde
um die benötigten gemeinsamen Module ergänzt; die fachlichen Aufgaben sind unverändert.

39 neue Tests prüfen Katalog/Identität/Versionen, Namensdateien, Altspielstände,
Ereignis- und Sitzungsreferenzen, echte UTC-Zeitstempel, manipulierte Aggregate,
Prototype-Schlüssel, fünf identische Importe, neuere und ältere Exportreihenfolge,
gleiche Namen mit getrennten IDs, Konflikt-Rollback, konkurrierende Importe, JSON-
Mehrfachauswahl, tiefe ZIP-Ordner, beschädigte/ungültige/leere Archive, Größenlimits,
CRC und ungültiges UTF-8, nicht lesbare Dateien, Kennzahlen/Hilfen/Zeiten,
Challenge-Trennung, Mindestdaten, historische unbekannte Stände, Intervallgrenzen,
Sitzungsabschluss, Sicherung/Wiederherstellung, Löschung, Berichte und die produktiven
Worker-Nachrichten-Einstiegspunkte.

**Testdatenbank:** Eine eigene asynchrone In-Memory-Testattrappe implementiert die
benötigten IndexedDB-Operationen mit serialisierten Transaktionen, Rollback, Schlüsseln
und Indizes. Dieselben produktiven Import-/Datenbank-/Projektionsmodule werden verwendet.
Die Attrappe ist kein IndexedDB-Konformitätstest und kein Nachweis echter Persistenz.
Sie wird nicht in die produktive Anwendung importiert.

## Browser: bisheriges Spiel

Chromium mit SwiftShader, unter Xvfb mit sichtbarem Browsermodus ausgeführt. Der
verwaltete Testbrowser kann hier nicht zu Hosting-Adressen navigieren. Deshalb werden
die lokalen Quellmodule im Test zusammengefügt und mit `set_content` gerendert.
Lokaler Speicher wird im Test simuliert.

Ein vollständiger Durchlauf beantwortete **45 Quests und 393 Teilaufgaben** über die
vorhandenen Antwortbedienelemente. Außerdem: Vorwissenswarnung umgehen, Maus-/Finger-
und Tastaturzuordnung, Erklärungsrücksprünge, frühe Wegprüfung ohne Hilfen, falsche
Prüfrunde und Wiederholung, Toröffnung, Bauabschluss, Verschönerungen, dünn beschriftete
Zahlengerade, Rastermarkierung und Spielstand-Rückübernahme. Tablet-Ansichten in
1024×768, 820×1180 und 768×1024 wurden auf überlaufende Bedienelemente geprüft.

Der gesamte Testlauf inklusive Prüfung und weiteren Probeaufrufen erzeugte einen
validierten vollständigen Lernexport mit 413 Antwortversuchen. Zusätzliche Prüfungs-
aufgaben erklären den Unterschied zu den 393 regulären/Challenge-Teilaufgaben.
Browserbericht ohne JavaScript-Fehler.

## Browser: neue Funktionen

`tests/analytics/browser_smoke.py`: Lehrkräfte-Start, isolierte Demoklasse mit 12
synthetischen Personen, Namensfilter, Aufgaben-/Hilfe-Details, persönliche Zeitleiste,
Klassenentwicklung, Stichtagsvergleich, Einstellungen und Tablet-Hochformat ohne
seitenweiten horizontalen Überlauf. Schüler-Start mit Pflichtname, falscher/richtiger
Versuch, Tipp, Beispiel, Beispielschrittanzeige und geschlossene Sitzung im Export.
Keine JavaScript-Fehler im ausgeführten Lauf.

`tests/analytics/browser_roundtrip.py`: tatsächlicher Exportknopf und Browser-Download,
richtiger Dateiname, laufender Zwischenexport, simuliertes Neuladen mit erhaltenem
Namen und identischer Aufgaben-Durchlauf-ID, nächster Versuch als Versuch 2,
„Lerneinheit abschließen“, Import über das reale Dateieingabefeld des Dashboards,
älterer/neuerer/wiederholter Export ohne doppelte Ereignisse, simuliertes Dashboard-
Neuladen. Import derselben Schülerdatei in ein anderes Spielprofil übernimmt ID und
Historie. Fehlt beim Export der Name, wird nach Eingabe tatsächlich weiterexportiert;
die ID bleibt dabei erhalten. Keine JavaScript-Fehler im ausgeführten Lauf.

Die simulierten Neustarts serialisieren und laden die **Testdatenbank**. Sie beweisen
keine Speicherung über einen echten Browser- oder Geräte-Neustart hinweg.
Browser-Worker sind in diesem gerenderten Testaufbau ausgeschaltet. Die produktiven
Worker-Einstiegspunkte wurden zusätzlich als Module mit Nachrichten in Node getestet,
nicht als tatsächlich gestartete Browser-Worker.

## Diagnostischer größerer Datenbestand

`tests/analytics/stress.mjs`: **100 synthetische Personen und 111.305 Ereignisse** mit
den produktiven Merge-/Berichtsmodulen und der In-Memory-Testdatenbank verarbeitet.
Gemessener Lauf: 5,68 Sekunden Import und 5,92 Sekunden Klassenbericht; Node-Prozess
am Ende ungefähr 802 MiB resident. Diese Werte hängen stark vom Testrechner und der
Testattrappe ab. **Kein iPad-, Speicherbedarfs- oder nativer IndexedDB-Benchmark.**
Sie zeigen die erfolgreiche Verarbeitung dieses konkreten größeren Testbestands,
nicht unbegrenzte Skalierbarkeit. Die Dateigrenzen sind in der Anleitung dokumentiert.

## Nicht geprüft / Geräte-Abnahme vor Unterricht

Kein physisches iPad, echtes Safari, native dauerhafte IndexedDB-Schreibvorgänge,
Service-Worker-Installation unter HTTPS, echter Offline-Neustart oder tatsächlich
laufender Browser-Modul-Worker wurde hier getestet. Ebenso keine schulische
Datenschutzfreigabe, Verschlüsselungsprüfung oder barrierefreie Vollprüfung.

Auf einem vorgesehenen Schüler-iPad und dem Lehrkräfte-Gerät durchführen:

1. Gesamtes Paket über HTTPS bereitstellen; Devtools/Netzwerk auf fehlende Module,
   CSP-/Worker-Fehler und JavaScript-Fehler prüfen. Unterrichtsversion ohne `?debug=1`.
2. Bestehenden 4.1-Spielstand laden, Namen eingeben, Aufgabe falsch/richtig bearbeiten,
   Wissen/Tipp/Beispiel öffnen und schließen, Aufgabe unterbrechen/fortsetzen.
3. Schüler-App vollständig schließen, Gerät/Browser neu öffnen: Identität, Spielstand,
   Versuchszahl und Historie müssen vorhanden sein. Name darf nicht erneut verlangt werden.
4. „Lerneinheit abschließen“, tatsächliches Speichern in „Dateien“ überprüfen. Datei auf
   ein zweites Schülergerät importieren: Name, ID, Fortschritt und Verlauf vergleichen.
5. Dashboard: Einzel-JSON, Mehrfachauswahl und ein ZIP mit mehreren Unterordnern
   importieren; identische Datei fünfmal, dann einen neueren und einen älteren Stand.
   Ereigniszahlen dürfen nicht wachsen, wenn nur dieselbe Datei wiederholt wird.
6. Dashboard vollständig schließen und nach Geräte-/Browser-Neustart wieder öffnen.
   Datenbestand, Klassenzuordnung, Zeiten und Importhistorie müssen erhalten bleiben.
7. Gesamtsicherung exportieren, in einem getrennten geschützten Testprofil importieren
   und Anzahl der Personen, Ereignisse und Sitzungen vergleichen. Dort Löschung testen.
8. Hintergrund, Gerätesperre und längere Pause prüfen: keine unbeschränkte Lernzeit.
   Offline-Neustart der Schüler-App prüfen. Dashboard-Neuladen benötigt erreichbare
   Programmdateien; dort wurde kein eigener Offline-Cache ergänzt.
9. Vor echten Schülerdaten schulische Vorgaben, geschützte Geräteprofile, Dateitransfer,
   Backup-Ort und Löschfristen klären.

## Reproduzierbarkeit

`npm test` für die Node-Prüfungen. Browser-Kommandos stehen im Haupt-README.
Testprogramme sind mitgeliefert; generierte Bilder, synthetische Speicherdateien und
umfangreiche Zwischenartefakte gehören nicht zur notwendigen App-Laufzeit.
Historische Berichte in `docs/version-4.1/` beschreiben nur die frühere Veröffentlichung.

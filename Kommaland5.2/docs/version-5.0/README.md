# Kommaland 5.0 · Lernwelt und Lernblick für Lehrkräfte

Statisch bereitstellbare HTML-/CSS-/JavaScript-Anwendungen. Kein Build, keine Anmeldung,
kein Backend, keine Cloud-Datenbank und kein CDN. Die mathematischen Inhalte und die
Spielmechanik aus Version 4.1 bleiben erhalten: 45 Quests, 393 Aufgaben, Wegprüfungen,
83 interaktive Wissenskarten und die drei Bauzustände.

## Bereitstellen und aktualisieren

1. Vor dem Update die bisherigen Schüler-Spielstände exportieren.
2. Den gesamten Inhalt dieses Pakets in das **bisherige Hosting-Verzeichnis** kopieren.
   Nicht nur `index.html` oder `js/app.js` ersetzen. `teacher-dashboard/shared/` wird
   auch von der Schüler-App benötigt und muss mit hochgeladen werden.
3. Alle alten Kommaland-Fenster schließen und die Adresse neu öffnen. Im Rucksack
   steht „Kommaland 5.0“. Beim ersten Start der neuen Fassung Name/Kürzel eintragen.
4. Auf einem Testgerät eine Aufgabe bearbeiten, „Lerneinheit abschließen“ verwenden,
   die gespeicherte JSON-Datei prüfen und in der Lehrkräfte-Seite importieren.

Die Schüler-App liegt weiterhin im Projekt-Hauptordner. Der bestehende lokale
Spielstand-Schlüssel und das Spielstandschema 3 sind unverändert. Das neue
Austauschformat hat unabhängig davon `schemaVersion: 1`.

Für Unterricht und Offline-Schüler-App HTTPS verwenden. Für Entwicklung genügt:

```sh
python3 -m http.server 8080
```

Die Schüler-App dann unter `http://localhost:8080/`, die Lehrkräfte-Seite unter
`http://localhost:8080/teacher-dashboard/` öffnen. Ein direktes Öffnen von `file://`
ist nicht der vorgesehene Startweg, da ES-Module und Browser-Speicher verwendet werden.

### Lehrkräfte-Seite separat bereitstellen

Der gesamte Ordner `teacher-dashboard/` ist eigenständig. Sein Inhalt darf unter
einer anderen Webadresse bereitgestellt werden; `index.html`, `css/`, `js/`,
`shared/`, `vendor/` und `icon.svg` zusammenlassen. Es gibt **keinen** Zugriff auf die
Schülergeräte: Daten kommen ausschließlich über ausdrücklich ausgewählte Dateien.

Der gemeinsame Quellvertrag liegt bewusst in `teacher-dashboard/shared/`, damit
keine zweite, auseinanderlaufende Schema-Kopie benötigt wird. Beim Schüler-Hosting
diesen Unterordner nicht entfernen, auch wenn das Dashboard separat betrieben wird.

## Eine Lerneinheit

Einmalig den vereinbarten Namen oder ein Kürzel eingeben. Die App legt zusätzlich
eine zufällige, stabile `studentId` an. Umbenennen ändert die ID nicht.

Am Ende: **Rucksack → Lerneinheit abschließen**. Die Sitzung wird geschlossen und
der vollständige Speicherstand als JSON zum Speichern bereitgestellt, zum Beispiel:

`Kommaland_Speicherstand_Max_Mustermann_2026-09-10.json`

Prüfen, dass die Datei wirklich in „Dateien“ gespeichert wurde. Die App kann nicht
feststellen, ob ein Browser-Speicherdialog abgebrochen wurde. „Spielstand exportieren“
ist daneben jederzeit als Zwischenexport möglich und beendet die Sitzung nicht.

Ein fehlender Name öffnet zuerst den Namensdialog; danach wird der Export fortgesetzt.
Beim Import einer neuen Lernstandsdatei übernimmt die Schüler-App Identität,
Spielstand und Ereignishistorie. Die vorhandene Rücksicherung bleibt nutzbar.

## Lehrkräfte: Arbeitsablauf

**Lernstände importieren**: Einzelne JSON-Datei, mehrere Dateien oder ZIP-Archiv wählen.
Ordner im ZIP werden beliebig tief durchsucht; es wird nichts auf einen Server geladen.
Wiederholte Ereignisse werden nicht doppelt gespeichert. Danach Namen einer Klasse
zuordnen, Themenstand und Gesprächsanlässe ansehen und bei Bedarf eine Person öffnen.

Die Ansicht **Daten & Einstellungen** bietet eine vollständige lokale Datensicherung,
eine Anfrage für dauerhaften Browser-Speicher, Löschmöglichkeiten und alle Kennzahlen-
Definitionen. Die ausdrücklich wählbare Demoklasse mit zwölf fiktiven Personen ist in
einer **anderen Datenbank** gespeichert. Sie wird nicht mit echten Lernständen vermischt.

## Bestehende Spielstände und wichtige Grenzen

- Alte Spielstände aus Version 1–4.1 bleiben in der Schüler-App ladbar. Vorhandene
  Aufgabenpositionen, fertige Projekte und Siegel werden weiterverwendet. Frühere
  Migrationen der Spielversionen bleiben unverändert.
- Historische Versuche und Hilfen können aus alten Summenzählern nicht rekonstruiert
  werden. Die neue Aufzeichnung beginnt beim Upgrade. Unbekannte Vergangenheit
  wird als unbekannt ausgewiesen, nicht als fehlerfreies oder nie erfolgtes Lernen.
- Alte **reine Spielstandsdateien** zuerst in der aktualisierten Schüler-App öffnen,
  Namen bestätigen und neu exportieren. Das Dashboard akzeptiert nur das eindeutig
  identifizierte neue Lernstandsformat und seine eigenen Sicherungen.
- Ein Browserprofil enthält jeweils einen aktiven Schüler-Spielstand. Auf gemeinsam
  genutzten Geräten vor dem Wechsel exportieren und die Datei der nächsten Person
  importieren. Nur ein aktives Schüler-App-Fenster pro Spielstand verwenden.
- Bei Geräte-/Browser-/Adresswechsel die Datei importieren. Gleiche Namen mit
  unterschiedlichen IDs werden aus Sicherheitsgründen **nicht** automatisch vereinigt.
- Daten sind lokal und unverschlüsselt. Gelöschte Websitedaten, privates Surfen oder
  Speicherbereinigung können Browser-Daten entfernen. Dateien regelmäßig sichern.
- Keine automatische Übertragung, Synchronisation, QR-Verbindung oder Netzwerk-
  Kopplung. Die Lehrkraft importiert die Dateien auf dem vereinbarten Übertragungsweg.
- Die Lehrkräfte-Seite hat keinen eigenen Offline-Service-Worker. Nach dem Laden
  rechnet sie lokal; für einen erneuten Seitenaufruf müssen ihre Programmdateien
  erreichbar sein. Die vorhandene Schüler-Offline-Funktion bleibt erhalten.

## Dokumentation und Tests

- `teacher-dashboard/ANLEITUNG.md`: Bedienung, Kennzahlen, Zeitfilter, Sicherungen.
- `teacher-dashboard/DATENFORMAT.md`: gemeinsamer Vertrag, IDs, Events, Merge.
- `teacher-dashboard/DATENSCHUTZ-TECHNIK.md`: lokale Verarbeitung und Betriebsgrenzen.
- `TESTS.md`: ausgeführte Prüfungen und verpflichtende Geräte-Abnahme.
- Bestehende Mathematik-Dokumente wie `AUFGABEN.md`, `LERNWEG.md`, `PRUEFUNGEN.md`,
  `SCHAUBILDER.md` und `DARSTELLUNGEN.md` beschreiben weiterhin die unveränderten Inhalte.
- `docs/version-4.1/`: archivierte frühere Release-Dokumente; nicht der aktuelle Teststand.

```sh
npm test
node tools/build-catalog.mjs
xvfb-run -a python3 tests/browser_regression.py
xvfb-run -a python3 tests/analytics/browser_smoke.py
xvfb-run -a python3 tests/analytics/browser_roundtrip.py
```

Die Python-Browsertests benötigen Playwright, Chromium und Xvfb. Die mitgelieferte
In-Memory-Datenbank ist **nur eine Testattrappe**; sie wird von keiner produktiven
App-Datei geladen. Tatsächliches IndexedDB, Browser-Worker, Safari/iPad, HTTPS-
Installation und Offline-Neustart müssen zusätzlich auf den Einsatzgeräten geprüft werden.

# Änderungen · Kommaland 5.0

## Schüler-App

Name/Kürzel beim ersten Start; getrennte dauerhafte Zufalls-ID. Bestehende Spielstände
bleiben ladbar. Der fachliche Aufgabenbestand und die Spielstandversion 3 bleiben
unverändert. Ergänzende Ereignis- und Sitzungsdaten in lokaler IndexedDB statt
wachsenden Datenmengen im bisherigen kleinen Spielstand.

Vollständiger JSON-Export mit Name, ID, Export-ID, UTC-Zeitstempel, Austauschversion,
Spielstand, Katalog, Sitzungen, Ereignissen und ableitbaren Quest-/Aufgabenprojektionen.
„Lerneinheit abschließen“ schließt die Sitzung und stellt eine benannte Datei bereit.
Fehlt der Name, wird er zuerst abgefragt; danach läuft der Export weiter.
Importierter Schülerstand übernimmt die stabile Identität und die Historie.

Aufgezeichnet werden Aufgaben-Durchläufe, Versuche und Ergebnisse, Hilfen,
Unterbrechungen, ausdrückliche Zurückstellungen, Vorwissenswarnungen, Gebietswechsel,
Prüfungen, Challenges und deren Freischaltungen. Vordergrundzeit wird in kurzen,
begrenzten Intervallen gemessen; automatische Wissenseinblendungen zählen nicht als
selbst gewählte Hilfen. Zurückgestellte Aufgaben werden nicht als erledigt markiert.

## Lehrkräfte-App

Eigenständiger Ordner `teacher-dashboard/`, ausschließlich lokale Browser-Verarbeitung.
Einzel-/Mehrfach-JSON-Import, rekursive ZIP-Ordner, validierter deduplizierender Merge,
atomare Dateiimporte und Importhistorie. Selbst gehostete JSZip-Bibliothek 3.10.1.
IndexedDB mit zusammengesetzten Schlüsseln und Indizes. Import und Auswertung können
in Modul-Workern laufen; keine Backend-Abhängigkeit.

Klassenübersicht, Themen und einzelne Wissensgedanken, sortier-/filterbare Personenliste,
transparente Gesprächsanlässe, Aufgaben-/Quest-/Challenge-Details, Sitzungen und
Ereigniszeitleiste. Historische Klassenstände aus Ereignissen, Stichtagsvergleich,
Datumsfilter und getrennte Challenge-/Prüfungskennzahlen. Keine automatischen Diagnosen.

Vollständige Datenbanksicherung, Wiederherstellung, Klassenbenennung, CSV-Übersicht,
Einzel-/Gesamtlöschung und ausdrücklich aktivierbare, getrennte synthetische Demoklasse.

## Kompatibilität und Grenzen

Das neue Austauschformat hat Version 1; das innere Spielstandschema bleibt Version 3.
Unbekannte frühere Verlaufsdaten werden nicht erfunden. Gleiche Namen mit verschiedenen
IDs bleiben getrennt. Kein Upload, keine automatische Synchronisation, keine Verschlüsselung
oder Anmeldung. Browserdaten sind kein Ersatz für sichere Exporte und Backups.

Aktueller Teststand und Geräte-Abnahme: `TESTS.md`.

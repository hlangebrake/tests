# Datenschutz und technische Grenzen · Kommaland 7.1

> **Release 7.2:** Dashboardlogik und Austauschschema 5 bleiben gegenüber 7.1 unverändert. Schüleroberflächen sind neu priorisiert; tatsächliche Niveau-, Hilfe- und Aufgabenereignisse werden weiter identisch verarbeitet.


Dies ist eine technische Beschreibung, keine Zusicherung rechtlicher Eignung für jede Schule. Die Schule legt organisatorische Regeln, zulässige Namen/Kürzel, Gerätezugriff, Sicherung und Löschfristen fest.

## Lokale Verarbeitung

Keine Cloudpflicht, externen Schülerkonten, Telemetrie, Werbe- oder Analysedienste. Alle erforderlichen Skripte und Assets liegen im Paket. Der Browser lädt statische Dateien vom selbst gewählten Host; Lernstandsdateien werden nicht dorthin hochgeladen. Ein Webserver kann unabhängig von der App gewöhnliche Zugriffsprotokolle führen; dies ist bei der Wahl des Hosts zu berücksichtigen.

Schüler: bestehender Spielstand in localStorage, Verlauf in IndexedDB mit Ausfallpuffer. Lehrkräfte: getrennte IndexedDB. Service Worker speichern statische App-Dateien, keine serverseitigen Schülerakten. Die App versucht eine Browserpersistenzanfrage, die nicht garantiert bewilligt wird. Keine synchrone Kopplung zwischen Geräten.

## Gespeicherte Daten

Vereinbarter Anzeigename und zufällige stabile Schüler-ID, Sitzungs-/Ereignis-IDs, Zeitstempel, Kern- und Aufgabenstatus, Richtigkeit und Zahl geprüfter Versuche, aktive Bildschirm-/Hilfedauer und selbst gewählte Regulationsentscheidungen. Neu sind konkrete Zielangaben und freiwillige Sicherheitseinschätzungen, getrennte Zusatzrunden sowie offene Aufträge.

**Ausdrückliche neue Ausnahme:** Für offene mathematische Aufträge kann die lernende Person eine eigene Notiz von maximal 1200 Zeichen eingeben. Diese wird bei Änderung/Verlassen lokal protokolliert und im Export mitgegeben. Der Dialog weist darauf hin. Keine Namen anderer Personen, Gesundheitsdaten oder sonstige privaten Informationen hineinschreiben. Papier/mündliche Bearbeitung ohne Textnotiz ist gleichwertig möglich.

Automatische Zahlenantworten werden weiterhin nicht als eingegebener Inhalt protokolliert; nur Zeitpunkt/Richtigkeit. Keine Tastaturaufzeichnung, keine Fingerabdrücke, Mikrofon-/Kameraaufnahmen, Handschriftanalyse oder KI-Bewertung. Offene Texte werden nur sicher als Text angezeigt. Checkboxen und Gesprächsstatus sind Selbstauskunft, kein bestätigter Lernerfolg. Es gibt keinen Partnernamen und keine Kopplung zweier Konten.

## Sicherheit und Grenzen

Keine App-Verschlüsselung, keine Anmeldung und keine Rechteverwaltung. JSON und ZIP sind lesbar. Wer Zugriff auf das entsperrte Browserprofil oder eine Exportdatei hat, kann Schülerdaten sehen. Lokale Daten können geändert werden; die App ist kein manipulationssicheres Prüfungs-/Notensystem. Geräteuhren liefern Zeitstempel; Abstände sind keine extern verifizierte Zeitmessung.

Browserdaten können durch Löschen, private Sitzungen oder Speicherbereinigung verloren gehen. Regelmäßige vertraulich verwahrte Exporte sind nötig. Browserpersistenz, Offline-Neustart und reales Safari wurden in dieser Testumgebung nicht geprüft. Der Geräte-Abnahmetest in TESTS.md bleibt erforderlich.

## Löschen

Schüler: neues Abenteuer/Profil beziehungsweise gezieltes Entfernen der Websitedaten; Sicherung vorher anbieten. Lehrkräfte: einzelne Person oder gesamten Datenbestand in „Daten & Einstellungen“ löschen. Bereits weitergegebene Exporte, Backups und Papierunterlagen müssen gesondert gelöscht werden. Das Entfernen einer Textnotiz aus der aktuellen Ansicht entfernt nicht automatisch frühere exportierte Ereignisse.

## Import

Struktur- und Versionsvalidierung, begrenzte Dateigrößen und sichere Textdarstellung. Gleiche IDs werden zusammengeführt, Widersprüche gemeldet. Irrelevante Dateien in ZIP werden ignoriert; verschlüsselte ZIP/ZIP64/verschachtelte ZIP-Archive sind nicht unterstützt. Aktuelle Grenzwerte sind in `teacher-dashboard/js/importer.js` und `zip-importer.js` zentral sichtbar. Exporte nur aus vertrauenswürdiger Quelle beziehen; Strukturvalidierung ersetzt keine Authentifizierung.

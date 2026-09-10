# Datenschutz und Technik · Kommaland 7.2

Version 7.1 behält die lokale Architektur: kein Lernstandupload, keine externe Telemetrie, keine Analytics, keine Cloudpflicht, keine KI-Bewertung. Schülerdaten liegen in browserlokalem Speicher und ausdrücklich exportierten Dateien. Hosting liefert nur Appdateien; Dateiaustausch zur Lehrkraft erfolgt außerhalb der App.

Zusätzlich gespeichert werden ausschließlich lernbezogene Metadaten: questbezogene Niveauwahl, tatsächliche Aufgabenvariante beim Beginn, begründete Angebote, Annahme/Ablehnung und freiwillige Passungsaussage. Ereignisse nutzen die bestehende Schüler-ID, Sitzungs-ID und Uhrzeit. Es gibt keinen globalen Fähigkeitswert und keine SRL-Punktzahl. Aktive Zeit bleibt Kontext, kein Auslöser für Niveauempfehlungen.

Bestehende Daten bleiben erhalten: Name/vereinbartes Kürzel, zufällige stabile ID, Aufgabenversuche ohne eingegebene Antworttexte, Hilfen, Ziele und freiwillige mathematische Notizen. Offene Notizen aus V7 werden weiterhin unbewertet gespeichert (höchstens 1200 Zeichen); vorherige Fassungen können in der Ereignishistorie verbleiben. Keine Partnernamen, Audio- oder Videoaufnahme.

Dateien und IndexedDB-Daten sind nicht durch die App verschlüsselt; es gibt keine Anmeldung oder Zugriffsrechteverwaltung. Geräte und Exporte entsprechend sichern. Die Lehrkräfteanwendung bietet Sicherung und Löschung. Browserdaten können durch Löschen/Privatmodus/Speicherpolitik verloren gehen; regelmäßig exportieren. Unterschiedliche Geräte und Hostingorte synchronisieren sich nicht automatisch.

Das Austauschschema 5 validiert neue Referenzen defensiv; es ist kein manipulationssicheres Prüfungsprotokoll. Untrusted Texte werden escaped, ungültige Dateien abgefangen. Deduplizierende Imports verhindern doppelte Lernereignisse.

Die Offenheit der individuellen Niveauwahl ist pädagogisch beabsichtigt. Sie darf nicht für Rankings oder automatisierte Benotung umgedeutet werden. Schulinterne Aufbewahrung, zulässige Namen/Kürzel und Berechtigungen muss die Schule bestimmen. Dieses Dokument ist eine technische Beschreibung, keine Rechtsberatung.

Technische Grenzen und tatsächliche Testumgebung: `TESTS.md`. Browserpersistenz, echter Offline-Neustart und Safari auf einem physischen iPad sind vor dem Einsatz abzunehmen.

## UI-Änderung 7.2

Erfolgreiches Speichern erfolgt weiterhin automatisch, aber ohne dauernde Erfolgsmeldung. Speicherfehler, beschädigte Daten, Export-/Importfehler und Entscheidungen über Datenersatz bleiben sichtbar. Das Öffnen des Help-Menüs selbst wird nicht als fachliche Hilfe gespeichert; die vorhandenen echten Hilfeereignisse bleiben unverändert. Keine neue Telemetrie oder Datenkategorie.

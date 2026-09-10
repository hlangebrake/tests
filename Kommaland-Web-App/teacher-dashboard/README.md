# Kommaland 7.0 · Lernblick

> **Release 7.2:** Dashboardlogik und Austauschschema 5 bleiben gegenüber 7.1 unverändert. Schüleroberflächen sind neu priorisiert; tatsächliche Niveau-, Hilfe- und Aufgabenereignisse werden weiter identisch verarbeitet.


Eigenständig statisch bereitstellbarer Ordner. Alle Dateien dieses Ordners einschließlich `shared/`, `vendor/` und `sw.js` gemeinsam hochladen. Start: `index.html` über HTTPS. Keine Server-Datenbank, kein Konto und kein automatischer Upload.

ANLEITUNG.md erklärt Import und Ansichten, DATENFORMAT.md das Schema/Merge, DATENSCHUTZ-TECHNIK.md die lokalen Sicherheitsgrenzen. Die Schüler-App benötigt bei gemeinsamer Bereitstellung ebenfalls `shared/`. Neue Lernstandsdateien verwenden Schema 4, ältere Schemata 1–3 werden weiterhin akzeptiert. Ohne Version-7-Ereignisse bleiben Übung, offene Arbeit und Zieleinschätzung unbekannt.

Die lokale IndexedDB benötigt regelmäßige Sicherungen. Ein eigener Service Worker ist für Offline-Dateien enthalten; echter Offline-Neustart, native Persistenz und Safari sind nicht in dieser Umgebung geprüft.

# Migration 7.1 → 7.2

Version 7.2 ändert Darstellung und UI-Routen, nicht das Speicherformat. **Kein fachlicher Neustart.**

| Feld | Wert in 7.2 |
|---|---|
| Appversion | 7.2.0 |
| Austauschschema | 5, unverändert |
| Eingebettetes Spielstandschema | 3, unverändert |
| Kerncontentkennung | 6, unverändert |
| Lokaler Save-Key und IndexedDB-Datenbanken | unverändert |
| Bestehende Ereignisnamen, Aufgaben- und Varianten-IDs | unverändert |

Abgeschlossene Kernquests und Challenges, begonnene Aufgaben, festgelegte Aufgabenvarianten, gewählte Questniveaus, Niveauempfehlungen/-antworten, aktuelle Zusatzrunden, Hilfen, Zieleinschätzungen, Partnernotizen, Sitzungen und Ereignisse werden wie bisher geladen. Bereits freigeschaltete Wege bleiben beidseitig offen. Teilweise absolvierte Wegprüfungen behalten ihre richtigen Nachweise.

Keine neuen Niveaus oder Leistungen werden aus fehlenden Daten abgeleitet. Die 7.1-Regel „Niveau 2 als aktuelle neutrale Voreinstellung, unbekanntes historisches Niveau bleibt unbekannt“ bleibt bestehen. Reiner UI-Text, geöffnetes Help-Menü und ausgeklappte Kriterien sind keine zusätzlichen Leistungsdaten.

Ein Tabwechsel in die Hilfe erhält die bestehende Eingabe und Tracking-Zuordnung. Das Öffnen des Help-Menüs selbst erzeugt keinen Hilfenevent. Ein echter Hilfeaufruf wird unverändert erfasst. Ausgeblendete Belohnungsmeldungen löschen keinen Abschluss und keine sichtbare Weltveränderung.

## Update

Schülerstände und die Lehrkräfte-Datenbank vorher exportieren. Gesamtes Schulpaket am selben URL-Pfad bereitstellen, alte Tabs/Home-Bildschirm-Fenster schließen, neu starten und 7.2 im Rucksack prüfen. Die App nutzt denselben lokalen Datenraum; ein anderer Host/URL-Pfad kann hingegen einen anderen Browser-Datenraum bedeuten. Beide Service Worker aktualisieren ihren jeweiligen Dateicache, nicht die Lerndatenbanken.

7.1-JSON-Dateien bleiben importierbar. Ein neuer 7.2-Export trägt die aktuelle Appversion, behält IDs und Historie. Die Lehrkraftseite weiterhin im selben Hostingpfad aktualisieren. Ein Datums- oder Versionseintrag allein erzeugt keine neuen richtigen Antworten.

Vor dem Unterricht auf einem echten Gerät eine Teilaufgabe, eine Niveauwahl, eine Zusatzrunde, eine freie Notiz und eine Wegprobe fortsetzen; exportieren/importieren und anschließend Browser/Offline-Neustart prüfen. Die Umgebungstests ersetzen diese Geräte-Abnahme nicht. Frühere Migrationen sind im Entwicklungsarchiv dokumentiert und bleiben im Code erhalten.

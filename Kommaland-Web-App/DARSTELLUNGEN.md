# Spielwelt und Darstellungen in 6.0

Die zusammenhängende Landschaft, unterschiedlichen Biome, Wege und natürlichen Grenzen sind erhalten. Anstelle der bisherigen 45 Questobjekte stehen nun 24 aktive Objekte; entfernte Mikroquests erzeugen keine zusätzliche Pflichtinteraktion mehr. Die übrigen Modelle der 5.1-Fassung bleiben als Quellcode verfügbar, werden aber nicht als neue Aufgaben aktiviert.

Das dreistufige Aufbauprinzip bleibt: keine richtige Teilantwort → deutlich unfertig; mindestens eine richtige Teilantwort → Teilaufbau; bestätigter Questabschluss → fertiges Objekt und Abschlussanimation. Bereits angerechnete Abschlüsse zeigen das fertige neue Projekt. Ein Zwischenstand auf einer inhaltlich geänderten Quest wird nicht als neue Teilantwort vorgetäuscht. `MIGRATION.md` erläutert den Zusammenhang.

Noch nicht empfohlene Questzeichen bleiben stark transparent (13 % bei Distanz). Die Warnung ist bei regulären Quests übergehbar. Herausforderungen entstehen erst nach allen regulären Quests des Gebiets und bleiben optional. Die Gebietsverschönerung, Tiere und Bewohner werden weiterhin beim bestätigten Challengeabschluss gespeichert.

Rechentafeln haben ein eigenes Zahlenfeld, eine aktive Feldmarkierung, mindestens 44 px breite Eingabetasten in kleinen Layouts und eine gemeinsame Antwortprüfung. Wissen-/Beispiel-Rücksprünge erhalten begonnene Eingaben. Es gibt keine zusätzliche automatische Prüfung nach jedem Feld.

Während offener Lernfenster wird die verdeckte 3D-Szene seltener neu gezeichnet. Aufgaben- und Eingabe-DOM bleiben unmittelbar bedienbar. Diese Reduktion verdeckter Renderarbeit ist keine gemessene Laufzeitgarantie für alle iPads. Geräte-Abnahme bleibt erforderlich.

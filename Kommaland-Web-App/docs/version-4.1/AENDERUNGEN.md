# Kommaland 4.1.0 · Änderungen

Dieses Update verändert ausschließlich Wissenspräsentation, sichtbare Questzustände und die dafür notwendigen UI-Metadaten. Die 45 Quests, 393 Aufgaben, 83 Wissenskarten, Antwortprüfer, Voraufgaben, Wegprüfungen und Belohnungen bleiben fachlich identisch mit Version 4.0.

## Erklärungen ohne unnötige Wiederholung

Einblendungen werden nach dem Wissensgedanken entschieden, nicht nach jedem Aufgaben- oder Gruppenwechsel. Gezeigte Gedanken bleiben innerhalb der Quest bekannt; neue Teilgedanken behalten ihre Einführung. Auch eine manuell auf der Quest-Einstiegsrolle geöffnete Karte wird beim anschließenden Beginn nicht direkt wiederholt. Bei abgeschlossenen Quests startet „Noch einmal üben“ direkt mit Aufgaben.

Für eine ausdrücklich geprüfte Zusammenfassung (Dezimalfaktoren im Rechteck) reichen beide bereits eingeführten Teilgedanken. Nur ein bekannter Teil reicht nicht. Es gibt keinen pauschalen Ähnlichkeitsfilter über Titel, Zahlen oder Texte.

Die Fußleiste bietet bei normalen Lernaufgaben weiterhin „Wissen anzeigen“, „Ein Beispiel lesen“ und „Tipp“. Bei Hilferücksprüngen bleiben Eingaben erhalten. In Wegprüfungen erscheinen weiterhin keine Hilfen. Die optionale Liste `shownLessons` im bestehenden laufenden Questdatensatz merkt sich eingeführtes Wissen; sie zählt nicht als gelöste Aufgabe oder bestandenes Vorwissen.

## Drei sichtbare Bauzustände

Alle 45 zugeordneten Questobjekte / 32 Modelltypen wurden geprüft. Eigene Anfangs- und Zwischenmodelle verwenden fehlende Teile, liegende Bauteile, Lücken, offene Rahmen, kahle Pflanzen oder leere Vorräte. Der Unterschied beruht auf Geometrie und Silhouette, nicht bloß einer anderen Farbe.

Erst mindestens eine richtige Teilantwort schaltet auf das Arbeitsmodell. Lesen, Hilfen und falsche Antworten reparieren noch nichts. Nach allen richtigen Antworten bleibt das Arbeitsmodell sichtbar, bis „Quest abschließen“ bestätigt wurde. Die Aufbauanimation beginnt an genau diesem sichtbaren Teilaufbau, nicht wieder am zerstörten Modell.

Lebendige Kreaturen bleiben unversehrt; dort verdeutlichen Schutzrunen den Rätselstand. Die Meisterquest bleibt bis zu ihrer bisherigen Freischaltung unsichtbar. Ihre bestehende Gebietsverschönerung und alle fertigen Modelle bleiben erhalten.

## Kompatibilität und Technik

Version 4.1.0; unverändert Schema 3 und derselbe lokale Speicherschlüssel. Version-4-Spielstände benötigen keine Aufgabenmigration: offene Schrittpositionen, fertige Quests, Gebietssiegel, Testnachweise, pausierte Tests und Einstellungen werden weiterverwendet. Nur bereits gezeigtes Wissen wird als optionale Präsentationsinformation ergänzt. Alte Spielstände ohne diese Information leiten es aus bereits gelösten Schritten ab. Ungültige optionale Listen werden verworfen, ohne gültige Questdaten zu verwerfen.

Neu: `js/learning-flow.js` und `js/quest-models.js`. Angepasst: `app.js`, `world.js`, `state.js`, `styles.css`, `sw.js`. Service-Worker-Cache v4.1.0; alle 19 JavaScript-Dateien werden lokal mitgeführt. Keine neue Laufzeit-Abhängigkeit.

Siehe `DARSTELLUNGEN.md` für alle Modelle und die geprüften Einblendefälle; `TESTS.md` für tatsächlich ausgeführte Prüfungen und Grenzen. Frühere Änderungen: `docs/AENDERUNGEN-4.0.md`.

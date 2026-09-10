# Inhalts- und Datenmigration 5.1 → 6.0

## Ein fachlicher Fortschritt, kein zweiter konkurrierender Stand

`completed`, `progress`, `mastery`, `competencies` und `exams` bleiben die autoritativen Spielstrukturen. Die Inhaltsfassung wird zusätzlich mit `contentVersion: 6` markiert. `contentArchive` bewahrt die alten Strukturen; es steuert keine neuen Freischaltungen. Ereignisse und Sitzungen behalten ihre IDs im bestehenden Lernlog.

`js/content-migration.js` prüft das alte Archiv, bevor es übernommen wird. Neue Aufgaben und Quests haben `c6-`- bzw. `c6:`-IDs. Die alten v5.1-IDs werden nie mit neuem Aufgabeninhalt überschrieben. `LEGACY_QUEST_MAP` und `legacySources` dokumentieren die Bündelung; die vollständige Tabelle steht in `LERNWEG.md`.

## Anrechnung

Nur wenn **alle** Vorgängerquests einer neuen regulären Quest abgeschlossen sind, wird deren neuer Abschluss angerechnet. Kennzeichnung `credit: "legacy"`. Zeitstempel ist der letzte zugehörige alte Abschluss, Fehler-/Hilfensummen sind historische Werte, keine neuen Antworten. Der Questdialog erklärt die Anrechnung und bietet das neue Material zum Nacharbeiten an. Vollständig abgeschlossene alte Herausforderungen bleiben angerechnet.

Sind Vorgänger nur teilweise fertig, startet die neue Quest bei Schritt 0. Alte Antwortpositionen werden nicht auf inhaltlich andere Aufgaben umgedeutet. Fertige alte Teilprojekte können deshalb auf der neuen Karte nicht mehr als eigenes fertiges Objekt erscheinen; ihr Erfolg bleibt archiviert. Wer alle 45 alten Quests erledigt hat, erhält alle 24 neuen Quests angerechnet.

## Prüfungen

Bereits erworbene Gebietssiegel werden respektiert und auf die neuen Ausgangsschlüssel übertragen. Sie sind Bestandsschutz, keine neue Leistungserhebung. Noch laufende alte Langtests verbleiben im Archiv; für den geänderten neuen Test beginnt eine kurze Runde neu. Es werden keine alten Antwortpositionen gegen neue Testfragen ausgewertet.

## Lehrkräfte

Austauschformat 3 enthält Inhaltsmigration und zusätzliche Regulationsereignisse. Ein neues Dashboard liest 1, 2 und 3; ein altes Dashboard kann neue Ereignisse nicht zuverlässig verstehen. Beide Anwendungen aktualisieren.

`curriculum_changed` protokolliert den Wechsel und die angerechneten IDs. Der Katalog enthält 24 aktive Quests/101 aktive Aufgaben und 45 inaktive alte Quests/393 alte Aufgaben als Metadaten. Die aktuellen regulären Quoten beziehen sich auf 16 Quests/77 Aufgaben. Frühere Ereignisse bleiben in Detailansicht und Zeitleiste lesbar, fließen aber nicht als erfolgreiche Versuche auf neue Aufgaben in die aktuellen Kompetenzmetriken ein.

Stichtagsansichten verwenden den damals gültigen Katalog. Ein Vergleich über den Wechsel ist ein Vergleich unterschiedlicher Lernwege, keine normierte Lernzuwachsmessung. Bei gemischten Versionen im Klassenbestand unterscheiden sich die Nenner; dies wird im Dashboard erläutert. Anrechnungen garantieren insbesondere keinen neuen Nachweis schriftlicher Verfahren.

Es entstehen keine neuen studentId-, eventId- oder sessionId-Werte für alte Datensätze. Mehrfachimporte bleiben über diese IDs dedupliziert. Bei neuen Ereignissen entstehen neue IDs wie bisher. Rohantworten werden weiterhin nicht exportiert. „Meinen Rechenweg prüfen“ zeigt nur den letzten abgegebenen Eingabewert der aktuellen RAM-Sitzung, nicht einen nachträglich rekonstruierbaren schriftlichen Denkweg.

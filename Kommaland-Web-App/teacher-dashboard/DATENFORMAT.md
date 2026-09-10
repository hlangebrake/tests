# Gemeinsames Datenschema · Kommaland 7.1

> **Release 7.2:** Dashboardlogik und Austauschschema 5 bleiben gegenüber 7.1 unverändert. Schüleroberflächen sind neu priorisiert; tatsächliche Niveau-, Hilfe- und Aufgabenereignisse werden weiter identisch verarbeitet.


Zentrale Definition: `shared/save-schema.js`. `APP_VERSION = "7.1.0"`, `SCHEMA_VERSION = 5`. Alte Austauschschemata 1–4 bleiben lesbar; eingebetteter Spielstand weiterhin Schema 3 / contentVersion 6. Alle Kern-IDs sind erhalten.

## Unveränderter Rahmen

```
{ format, schemaVersion, appVersion,
  studentId, studentName, exportId, exportTimestamp,
  currentState, catalog, sessions, events }
```

Ereignisse besitzen eventId, studentId, sessionId, timestamp, sequence, type, data und passende Referenzen wie questId, taskId, topicId, runId, taskRunId, skillId und kind. Reguläre Aufgabeninhalte/Antworten werden nicht als freier Schülertext protokolliert; es bleiben Richtigkeit und Versuche. Bestehende Hilfe- und aktive Zeitereignisse werden weiterverwendet.

## Zusätzliche Ereignisse

`v7_goal_selected`, `v7_goal_reflection`; `v7_practice_decision`, `v7_practice_started`, `v7_practice_task`, `v7_practice_attempt`, `v7_practice_skipped`, `v7_practice_finished`, `v7_practice_paused`, `v7_practice_reflection`; `v7_work_started`, `v7_work_changed`, `v7_work_model`.

Zusatzrunden besitzen eine stabile roundId, skillId und eine endliche Liste gültiger Taskkeys. Versuche speichern correct/attemptNumber, niemals eine Kernquest-Abschlussoperation. Hilfe- und Aktivitätsereignisse verwenden `kind: "practice"`. Ein Rundenschluss bedeutet nur beendet, nicht automatisch alles gelöst. Status und Verlauf werden aus den Rohereignissen projiziert, nicht aus einem zweiten gespeicherten Fortschrittszähler.

Offene Aufträge: stabile workId, zulässiger Bearbeitungsstatus, drei boolesche Kriterien und optional note bis 1200 Zeichen. Die Felder `correct`, `score` oder eine frei erfundene Bewertung sind hier unzulässig. Musteröffnung ist ein eigener Beobachtungstyp, keine Bestätigung der eigenen Lösung.

## Validierung und Merge

Typbezogene Feldprüfung in `shared/learning7.js` plus vollständige Referenzprüfung: kein unbekannter Taskkey, keine Runde mit mehr als fünf oder weniger als zwei Aufgaben, kein abhängiges Ereignis vor seinem Beginn, keine fremde Rundenzuordnung. Eine Exportdatei ist eine vollständige Geschichte, kein beliebiger Eventausschnitt.

Bestehendes deduplizierendes Merge über studentId/eventId/sessionId; identische Ereignisse überspringen, widersprüchliche gleiche IDs zurückweisen. Ältere Imports überschreiben keinen neueren Stand. Der Importbericht bleibt im eigenen Store und darf wiederholte Importversuche dokumentieren. IndexedDB-Stores und Indizes bleiben bestehen; kein neuer paralleler Schüler-Fortschrittsstore.

`shared/projection.js` schließt `kind:practice` und alle v7-Ereignisse aus dem regulären Quest-/Aufgabenzähler aus. `shared/learning7.js` liefert die zusätzliche separate Auswertung. Kernquoten und Challenges werden nicht durch eigene Texte, Übungsantworten oder Selbsteinschätzungen erfüllt.

## Datenschutzgrenze

Die optionale offene Notiz ist bewusst eingegebener mathematischer Text, keine Tastaturaufzeichnung. Sie wird lokal und in Exporten gespeichert und sicher escaped angezeigt, nicht bewertet. Kein Partnername, keine Audio-/Bildaufnahme, keine KI-Auswertung. Frühere Notizfassungen können als Ereignis erhalten bleiben; Entfernen eines Textes aus dem aktuellen Formular löscht frühere Exporte nicht.

## Schema 5: Niveauwahl innerhalb der Kernquests

Neue Rohereignisse (alle mit `questId`, `topicId`, `kind: "regular"`):

- `v71_level_selected`: `fromLevel`, `level`, `source: "manual" | "recommendation"`, `recommendationId` oder null.
- `v71_level_offered`: `recommendationId`, `fromLevel`, `targetLevel`, `reason`, `evidenceIds` (tatsächliche taskRunIds) und begründender `text`.
- `v71_level_response`: `recommendationId`, `decision: "accepted" | "declined" | "dismissed"`, `targetLevel`.
- `v71_level_reflection`: `level`, `fit: "fits" | "hard" | "easy"`, `changeId` einer tatsächlichen Wahl.

Neue reguläre `task_started`-Datensätze enthalten `difficultyLevel`, `variantId`, `slotId` neben dem tatsächlichen `taskType` und `taskTitle`. Die Aufgaben-ID bleibt die Kompetenzposition; Varianten gehören zu einzelnen Bearbeitungsdurchläufen, nicht zu zusätzlichen Kernaufgaben. `shared/difficulty-catalog.js` prüft Variantenreferenzen ohne Schülertexte oder Lösungsdaten.

`currentState.questLevels` speichert nur bewusste questbezogene Wahlen. `currentState.progress[id].taskVariants` speichert erstmals gezeigte Formen. Fehlende alte Daten bleiben unbekannt. Kein globales Schülerniveau. Neue Ereignisse werden im bestehenden Store anhand ihrer eindeutigen IDs zusammengeführt; für Niveauwahl entsteht keine zweite Fortschrittsdatenbank und kein eigener Fähigkeitsscore.

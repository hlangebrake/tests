# Gemeinsames Lernstandsformat · Version 2

## Verbindliche Quelle

`shared/save-schema.js` wird von Schüler-App und Lehrkräfte-App importiert.
`SCHEMA_VERSION = 2`, `APP_VERSION = "5.2.0"`,
`FORMAT = "kommaland.learning-save"`. Die bisherige Spielstandversion 3 bleibt
**innerhalb** von `currentState` unverändert. Es gibt keinen zweiten fachlichen
Questfortschritt neben `completed`, `progress`, `mastery`, `competencies`, `exams`.

```json
{
  "format": "kommaland.learning-save",
  "schemaVersion": 2,
  "studentId": "stabile-zufaellige-id",
  "studentName": "Max M.",
  "exportId": "eindeutige-id-dieses-exports",
  "exportTimestamp": "2026-09-10T09:45:00.000Z",
  "appVersion": "5.2.0",
  "currentState": {},
  "catalog": {},
  "coverage": {},
  "sessions": [],
  "events": [],
  "questProgress": [],
  "taskProgress": []
}
```

Diese Übersicht ist kein vollständiger importierbarer Beispielspeicherstand. Der
produktive Export liefert alle erforderlichen Inhalte. `studentId` und Anzeigename
werden zusätzlich in `currentState.learner` mitgeführt, damit die vorhandene
Spielstandsvalidierung die Identität beim Wiederherstellen nicht verliert.

## Identität und Zeit

IDs werden mit kryptografischer Browser-Zufallsquelle erzeugt und nicht aus Namen,
Gerätemerkmalen oder Adressen abgeleitet. Die ID bleibt bei Umbenennen und Dateiimport
erhalten. Gleiche Namen werden nicht automatisch zusammengeführt. Eine unabhängig
neu gestartete Identität auf einem anderen Gerät hat eine andere ID.

Alle Zeitstempel haben die kanonische Form `YYYY-MM-DDTHH:mm:ss.sssZ` in UTC.
Dauern sind **Millisekunden**. Im Browser wird nach lokaler Zeitzone angezeigt.
Innerhalb des laufenden Protokolls werden Zeitstempel monoton vergeben. Eine falsch
eingestellte Geräteuhr oder unterschiedliche Geräteuhren bleiben eine Messgrenze;
es findet kein Abgleich mit einem Zeitserver statt.

## Sitzungen und Ereignisse

Eine Sitzung enthält `sessionId`, `studentId`, `startedAt`, `finishedAt` (oder null),
`updatedAt`, aktive `duration` und `finishReason`. Ein Zwischenexport darf eine offene
Sitzung enthalten. Spätere Exporte aktualisieren diese Sitzung, legen sie nicht neu an.
Ein nach Absturz nur geschätztes Ende wird mit `finishReason: "interrupted"` markiert.

Jedes Ereignis enthält `eventId`, `studentId`, `sessionId`, `timestamp`, `type`, `data`
und optional eine lokale `sequence`. Fachlicher Kontext: `questId`, `taskId`, `topicId`,
`skillId`, `runId`, `taskRunId`, `kind`. Arten: `regular`, `challenge`, `exam`, `encounter`.

Wichtige Ereignisfamilien sind `session_*`, `quest_*`, `task_*`, `hint_*`, `example_*`,
`solutionStep_*`, `otherHelp_*`, `knowledge_*`, `challenge_*`, `exam_*`, `topic_*`,
`prerequisite_bypassed`, `state_restored` und `history_baseline`.
Die vollständige zulässige Liste steht in `EVENT_TYPES` der gemeinsamen Quelle.

Ein Antwortversuch (`task_attempt`) hat mindestens `data.correct` als Boolean und
`data.attemptNumber`. Eine richtige Antwort erzeugt `task_completed`; ein bestätigter
Questabschluss erzeugt separat `quest_completed` beziehungsweise `challenge_completed`.
Kein eingegebener Antwortwert, kein Tastendruckinhalt und kein Schülerfreitext wird
protokolliert. Aufgaben werden durch stabile IDs und Katalogmetadaten referenziert.

Eine Aufgabe hat über Wiederholungen dieselbe `taskId`, aber neue `taskRunId`-Werte.
Eine fortgesetzte offene Aufgabe behält ihren Durchlauf und zählt Versuche weiter.
Wegprüfungen verwenden Routen- und Gedanken-IDs; deren variierte Wiederholungsversuche
bleiben vom regulären Lernweg und seinen Kennzahlen getrennt.

Hilfeepisoden verwenden eine eindeutige `helpId`, Typ, Öffnungs- und Schließereignisse.
`automatic: true` kennzeichnet eingeführtes Wissen. `resumed: true` kennzeichnet
wieder sichtbare, vorher bereits angeforderte Hilfe, ohne einen zusätzlichen bewussten
Aufruf zu behaupten. Bei Wiederherstellung nach Absturz gibt es `recovered: true` und
ein geschätztes `closedAt` am letzten bekannten Sitzungszeitpunkt.

`activity_slice` speichert kurze Zeitintervalle mit `duration`, `from` und den gerade
sichtbaren `helpIds`. Ein Intervall gehört höchstens einer Aufgabe an. Hilfen können
überlappen. Die Summe aktiver Aufgabenzeit ist nicht die verstrichene Zeit zwischen
`startedAt` und `finishedAt`. Hintergrund- und lange unbeobachtete Timerlücken werden
nicht als Lernzeit ausgegeben. Die Messregel steht zusätzlich in `coverage`.

## Projektionen im Export

`questProgress` und `taskProgress` werden aus Ereignissen und dem tatsächlichen
Spielstand berechnet. Sie erleichtern externe Verarbeitung, sind aber **nicht** die
Quelle der Lehrkräfte-Kennzahlen. Der Dashboard-Import verwirft übergebene Aggregate
und berechnet sie erneut mit `shared/projection.js` und `js/analytics.js`.

Quests: Status (`not_started`, `started`, `completed`, `skipped`), erste/letzte Bearbeitung,
Abschluss, Skip-Zahl, Durchläufe und Ereignishistorie. Herausforderungen haben zusätzlich
Freischaltung, Beginn, Abschluss, Versuchs- und Hilfezahlen.

Aufgaben: Aufgabe/Quest/Thema/Gedanke, Start/Ende, aktive Dauer, Versuche, Richtigkeit,
Versuchsliste, Hilfeepisoden, Durchläufe, Tipp-/Beispielaufrufe und -zeiten. `correct: null`
heißt nicht beobachtet. Ein aus einem alten Spielstand fertiges Projekt kann Aufgaben
mit `status: "unobserved"` haben: Der Abschluss ist bekannt, frühere Versuche nicht.

## Lokale Speicherung

Schüler-App: bestehendes `localStorage` für aktuellen Spielstand; ergänzende IndexedDB
für die umfangreichen unveränderlichen Ereignisse und Sitzungen. Eine kleine kurzfristige
Write-ahead-Zwischensicherung hält noch nicht geschriebene Ereignisse. Sie ist keine
separate zweite Questlogik. Bei fehlendem Speicher erscheint eine Exportwarnung.

Lehrkräfte-App: Datenbankname getrennt nach Hosting-Pfad. Stores:

| Store | Schlüssel / Inhalt |
|---|---|
| students | `studentId`: Name, Klasse, neuester Export, Katalog |
| sessions | `[studentId, sessionId]`: fortschreibbare Sitzungen |
| events | `[studentId, eventId]`: unveränderliche Ereignisse |
| snapshots | `[studentId, exportId]`: exportierte aktuelle Zustände |
| questProgress | `[studentId, questId]`: erneuerbarer Projektionscache |
| taskProgress | `[studentId, taskId]`: erneuerbarer Projektionscache |
| imports | `importId`: Zeitpunkt, Dateiname, betroffene IDs, Ergänzungen, Duplikate, Fehler |

Die Datensatz-Stores haben Indizes auf `studentId`, `timestamp`, `questId`, `topicId`,
`type` und `sessionId`, soweit der jeweilige Datensatz das Feld führt. Indexname `type`
entspricht dem Ereignistyp. Die separate Demodatenbank trägt den Zusatz `:demo`.

## Validierung und Merge

Einzeldateien werden vor der Transaktion strukturell geprüft: Formatversion, Identität,
Katalog, vollständige Ereignis-/Sitzungslisten, eindeutige IDs innerhalb der Datei,
gültige Kontexte, Zeitstempel, Sitzungsreferenzen, Daten- und Größenbeschränkungen.
ZIP wird vorab anhand seines Inhaltsverzeichnisses geprüft; tatsächliche entpackte
Größe und CRC-Prüfsumme der JSON-Dateien werden zusätzlich kontrolliert.

Innerhalb einer atomaren Importtransaktion werden vorhandene Daten gelesen und der
Merge geplant. Neue Ereignis-IDs kommen hinzu. Identische vorhandene Ereignisse werden
ignoriert. Derselbe Schlüssel mit anderem Inhalt ist ein Konflikt und verwirft diese
Datei. Sitzungen können fortgeschrieben beziehungsweise geschlossen werden. Ältere
Dateien ersetzen keinen neueren Namen oder aktuellen Zustand. Ein identischer Export
fügt auch keinen zweiten Snapshot hinzu. Rückwärtsimport-Reihenfolge ist zulässig.

Auch parallele Importe benutzen dieselbe transaktionale Merge-Funktion und eindeutige
zusammengesetzte Schlüssel. Die Importhistorie zeichnet jede bewusste Importaktion auf;
ihre zusätzlichen Auditzeilen sind keine doppelten Lernereignisse.

## Module und Erweiterungen

`js/importer.js` verarbeitet Dateien unabhängig von der Oberfläche;
`js/zip-importer.js` entpackt; `js/database.js` und `planMerge` verwalten Transaktionen;
`shared/projection.js` spielt Ereignisse ab; `js/analytics.js` definiert Kennzahlen und
Hinweisschwellen; `js/timeline.js` rekonstruiert frühere Stände. Die Worker verwenden
exakt diese Module, keine eigene Import- oder Rechenlogik.

`shared/catalog.js` entsteht mit `node tools/build-catalog.mjs` aus dem bestehenden
Aufgabenbestand. Bei Änderungen stabiler Aufgaben-IDs ist eine explizite Migration
notwendig. Die neue Fassung validiert Austauschformat 1 und 2 ausdrücklich. Zukünftige
Austauschformat-Versionen werden nicht still als eine bekannte Fassung interpretiert.
Der Import lehnt unbekannte Versionen verständlich ab. Alte Dashboards müssen für neue
Format-2-Dateien aktualisiert werden.


## Neu ab Austauschformat 2: Selbstregulationsereignisse

`shared/regulation.js` ist der gemeinsame Regel- und Bezeichnungsvertrag,
`shared/regulation-validation.js` prüft die neuen Inhalte. Keine neuen Stores,
keine Änderung von `currentState.version = 3`, keine zweite Fortschrittslogik.

| Ereignis | Wichtige Felder in data |
|---|---|
| srl_plan_set | goal, topicId/null, targetCount/null, confidence/null, source, amended, support |
| srl_prompt_shown | promptId, reason, unsolicited |
| srl_prompt_answered | promptId, reason, choice |
| srl_strategy_selected | strategy, source; Aufgaben-Durchlauf im Ereigniskontext |
| srl_strategy_outcome | strategy, selectionEventId, solved, assisted, relation |
| srl_support_changed | dimension, previous, level, reason, evidence |
| srl_navigation_choice | source, questId, support |
| srl_reflection | confidence/null, startConfidence/null, nextGoal, topicId, support |
| srl_challenge_decision | choice, source; kind=challenge im Kontext |
| srl_area_decision | from, to, choice, reason |

`confidence` ist 1–5 oder null; null bedeutet keine Angabe, nicht fehlende Sicherheit.
`targetCount` ist 2, 3, 4, 5 (Anzeige 5+) oder null. Planziele, Vorhaben, Strategien,
Unterstützungsdimensionen, Gründe und Navigationsquellen sind kurze Codes. Reguläre
Benutzung erzeugt keine freien Schülertexte. Namen/Identitätsregeln bleiben unverändert.

`support` enthält unabhängig navigation, planning, strategy, content und challenge
mit Werten 0–3. Veränderungen werden zeitlich erhalten; die UI leitet den aktuellen
Zustand daraus ab. `evidence` dokumentiert bei automatischem Fading seine Kriterien.
Ein sehr niedriger Wert bedeutet nicht hohe mathematische Kompetenz.

`relation: "later_success_not_causation"` kennzeichnet nur eine zeitliche Folge bei
derselben Aufgabenbearbeitung in derselben Sitzung binnen 15 Minuten. `assisted`
markiert einen danach geöffneten Lösungsweg. Keine Kausalität wird daraus abgeleitet.

Der Merge verwendet unverändert `[studentId,eventId]`. Wiederholtes Importieren fügt
keine zweite Entscheidung hinzu. Eine Revision eines Plans erzeugt dagegen bewusst
**ein neues** Ereignis. Alte Format-1-Dateien behalten ihre Version und ihre Ereignisse;
es werden weder frühere Ziele noch Selbstregulationseinschätzungen rekonstruiert.

## Ablaufbeispiele (Ausschnitte, keine vollständigen Dateien)

```json
{"type":"srl_plan_set","data":{"goal":"open","topicId":"village","targetCount":3,"confidence":3,"source":"self","amended":false,"support":2}}
```

```json
{"type":"srl_strategy_outcome","data":{"strategy":"example","selectionEventId":"eindeutige-auswahl-id","solved":true,"assisted":false,"relation":"later_success_not_causation"}}
```

Der produktive Export ergänzt die eindeutigen Identitäts-, Sitzungs-, Zeit- und
Kontextfelder. Für vollständige Feldprüfungen ist der Validator verbindlich.

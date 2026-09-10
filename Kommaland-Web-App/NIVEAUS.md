# Selbst gewählte Schwierigkeit · Kommaland 7.1

> **Gültig in Kommaland 7.2:** Der folgende fachliche Bestand beziehungsweise die dokumentierten 7.1-Regeln bleiben unverändert. Neu ist die Darstellung: mathematischer Titel, kompakte Steuerung, Hilfen/Kriterien auf Nachfrage. Siehe `UI-DESIGN.md` und `AENDERUNGEN.md`.


## Grundprinzip

Die Wahl ist eine **aktuelle questbezogene Anforderungssituation**, keine Eigenschaft oder feste Leistungsgruppe einer Person. Alle drei Niveaus behalten die 77 Kompetenzpositionen und die 16 Lernziele. Ein Wechsel löscht keine richtige Aufgabe und ersetzt keine Voraussetzung.

N1: mehr Struktur, unmittelbar sichtbare Orientierung, teilweise konkret benannte Zwischenschritte. Nicht sämtliche Zahlen werden vereinfacht: innere Nullstellen, Bruchbezüge und schriftliche Verfahren bleiben fachlicher Kern.

N2: alle Aufgabenpayloads der gelieferten Version 7 unverändert. Bestehende Rechentafeln, mathematisch geprüfte Ergebnisse und IDs bleiben Grundlage.

N3: reduzierte Vorgaben, Rückwärtsdenken, Bedingungen, Darstellungswechsel und begrenzte Verknüpfung. Beispiele: fehlende Ziffern in einer Addition statt nur Vorwärtsrechnen; eine Zerlegung und ihr Fehler; ganzzahliges Portionieren mit Rest und Fehlmenge. Es ist keine Ersatz-Challenge und nicht automatisch AB III.

## Datenmodell und Aufgabenwahl

`js/difficulty-bank.js` leitet 77 Slots aus den realen Kernquests ab. `slotId` bleibt der bisherige `task.key`, `baseTaskId` die bisherige Aufgaben-ID. `variantId = v71:<slotId>:n<1|2|3>`. Die Laufzeitvariante besitzt `difficultyLevel` und didaktische Designannotationen für Struktur, Komplexität, Transfer und Abstraktion. Diese Ordinalwerte sind Autorenbeschreibungen, keine gemessenen Schwierigkeitsparameter und keine Schülerbewertung.

20 N1-Patches ergänzen veränderte strukturierte Aufgaben. Bei 57 N1-Positionen bleibt die bekannte Aufgabe mit zusätzlicher sichtbarer Orientierung erhalten. N2 wird nicht dupliziert. Für N3 gibt es 77 gezielte, pro Slot verfasste Änderungen, keinen Zufallszahlenvergrößerer. Die Patcharchitektur vermeidet drei getrennte Lernwege oder drei vollständige Contentkopien.

`state.questLevels[questId]` speichert die bewusste aktuelle Wahl. Fehlende Einträge liefern beim Anzeigen neutral 2. `progress[questId].taskVariants[slotId]` friert die erstmals geöffnete Form ein; sie bleibt beim Wiederöffnen und Import gleich. Aufgezeichnete `task_started`-Ereignisse halten das tatsächlich gezeigte Niveau und die Variante fest. Diese Metadaten ändern keine Zähler oder Aufgabenanzahl.

## Interaktion

Der kleine Kopfknopf bleibt in Aufgaben, Queststart, Abschluss, zugehörigem Wissen und Beispiel erreichbar. Größere Wahlflächen erscheinen nur im ausdrücklich geöffneten Auswahldialog. Die aktuelle Aufgabe wird nicht umgeschrieben: ein begonnener Versuch soll nicht rückwirkend ein anderes Niveau erhalten. „→ 1“ neben dem aktuellen Niveau bedeutet die Wahl für die nächste noch nicht gezeigte Aufgabe. Sind alle Aufgaben bereits geöffnet, gilt die Wahl für die nächste Wiederholung.

Das Nachlesen bleibt freiwillig. Ein Abstecher aus einer Erklärung in die Niveauwahl unterbricht deren aktive Zeit; der Rückweg wird als Fortsetzung der Hilfe markiert und nicht als zusätzlicher bewusster Hilfeaufruf gezählt.

## Empfehlungen: zentral konfigurierbare Startwerte

Quelle: `teacher-dashboard/shared/difficulty.js`, `DIFFICULTY_RULES`. Kein empirisch normiertes Diagnosemodell.

| Regel | Wert / Bedeutung |
|---|---|
| Datenhorizont | Letzte 30 Tage, höchstens 8 verschiedene Kompetenzpositionen derselben Quest |
| Wiederholungen | Nur die jüngste Bearbeitung je Position zählt für die Mindestbreite; wiederholtes Raten an einer Aufgabe erzeugt keine vier Aufgaben |
| Höher empfehlen | Mindestens 4 bearbeitete Positionen; alle erfolgreich beendet; Erstlösungsquote mindestens 85 %; höchstens 1 Fehlversuch und 1 bewusste Hilfe insgesamt; mindestens 2 Aufgabenformate |
| Unsichere Selbstauskunft | Letzte Zieleinschätzung 1 oder 2 blockiert ein Höherstufungsangebot; selbst höher wählen bleibt möglich |
| Mehr Struktur empfehlen | Mindestens 3 Positionen; mindestens 2 davon mit je 2 Fehlversuchen; zusätzlich insgesamt mindestens 6 Fehler **oder** mehrere Hilfen bei mindestens 2 Positionen **oder** unsichere Selbstauskunft / Rückblick „zu schwer“ |
| Schrittweite | Nur +1 oder −1, niemals automatisch |
| Nach einer Wahl oder Empfehlungsentscheidung | Frühestens nach 10 Minuten und 4 neuen relevanten Aufgaben wieder prüfen |
| Angebotsgrenzen | Höchstens 1 neu erzeugtes Angebot je Quest und Sitzung, 2 je Sitzung insgesamt; zwischen Angeboten mindestens 10 Minuten |
| Zeit | Aktive Bearbeitungszeit hat **Gewicht 0** in der Empfehlung und wird nur als Kontext dargestellt |

Hilfenutzung allein, Zeit allein, eine einzelne falsche Antwort oder eine unsichere Selbstauskunft allein führen nicht zur Herabstufungsempfehlung. Automatische Wissenseinführung und wieder sichtbare Hilfe zählen nicht als erneute bewusste Hilfe. Challenge-, Zusatzübungs- und Wegprobenergebnisse werden nicht als Kernniveau-Versuche umgedeutet. Die Wegprobe kann weiter passende Zusatzübung empfehlen, aber sie setzt kein Questniveau.

Das Angebot wird innerhalb einer ohnehin geöffneten Rolle angezeigt. Es ist kein zusätzlicher automatischer Reflexionsdialog. Die bestehenden SRL-Cooldowns und maximalen Unterbrechungen bleiben unangetastet. Ein unbeantwortetes Angebot kann beim bewussten Wiederöffnen derselben Rolle weiter sichtbar sein; es wird nicht als neues Angebot geloggt. Nach Ablehnung verschwindet es für diese Sitzung/Quest.

## Selbstregulation und Rückblick

Nach tatsächlichem freiwilligem Wechsel und mindestens zwei danach geöffneten Aufgaben auf dem neuen Niveau kann am Questabschluss ein eingeklappter freiwilliger Rückblick erscheinen: Gut passend / Etwas zu schwer / Noch zu leicht. Er wird gespeichert, aber nicht automatisch beantwortet. „Zu schwer“ kann eine höhere Empfehlung verhindern und bei bereits vorhandenen wiederholten Fehlern die Empfehlung für mehr Struktur stützen. Er ersetzt keine Aufgabenbeobachtung.

Mathematisch gleich gebliebenes V7-Material kann nur beratend als heutige N2-Ausgangsbasis herangezogen werden, wenn reale Aufgabenereignisse vorhanden sind. Im Dashboard bleibt das historische Niveau trotzdem unbekannt; abgeschlossene Bauwerke allein sind keine Evidenz für einen Wechsel.

## Grenzen

Die Regeln sind konservativ und questbezogen: Bei vier bis sechs Positionen können häufig keine ausreichenden neuen Daten für ein zweites Angebot entstehen. Das ist beabsichtigt; keine Empfehlung ist kein Fehler und keine Aussage über Können. Die freie Wahl funktioniert immer. Zahlreiche N3-Antworten sind Zahlenfelder oder vorgegebene Aussagen; sie beanspruchen keine automatische Bewertung einer frei entwickelten Argumentation. Papier, offene Partneraufträge und Lehrkraftgespräche bleiben ergänzend nötig. Unterrichtliche Erprobung und empirische Kalibrierung sind nicht erfolgt.

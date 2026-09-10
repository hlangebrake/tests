# Selbstreguliertes Lernen · Kommaland 5.1

## Zweck und Grenzen

Planen → Arbeiten → bei Bedarf eine Strategie wählen → zurückblicken → neu planen.
Die mathematischen Aufgaben, ihre Auswertung, Quest-Freischaltungen, Wegprüfungen und
Bauzustände bleiben unverändert. Das System bietet Unterstützung, keine Noten oder
Diagnosen. Seine Schwellenwerte sind **konfigurierbare Startheuristiken**, nicht
empirisch validierte Maße von Selbstregulation. Eine Wirksamkeitsstudie dieser App
wurde nicht durchgeführt.

## Kurzer Sitzungsstart

Nach Name/Willkommensseite bzw. beim Beginn einer neuen Sitzung erscheint eine einzige
Planungsseite: Ziel, optional Themenbereich, optionale Anzahl 2/3/4/5+ und freiwillige
Sicherheit 1–5. „Heute ohne Plan starten“ funktioniert ohne Eingabe. Nach dem Start
kommt direkt die Welt bzw. der bewusst gewählte Lernweg. „Mein Lernplan“ im Rucksack
ermöglicht spätere Änderungen; alte Planereignisse werden nicht überschrieben.

Ein ausdrückliches Vorhaben aus der letzten abgeschlossenen Sitzung wird als Erinnerung
mit „Damit starten“ angeboten. Wer im jüngsten Rückblick „Beim nächsten Mal entscheiden“
wählt, bekommt kein veraltetes Vorhaben aus einer früheren Sitzung wieder angeboten.

## Unterbrechungen: ein gemeinsames Budget

Die zentrale Konfiguration steht in `teacher-dashboard/shared/regulation.js`,
`SRL_RULES`. Alle automatischen Strategie-, Überspring-, Orientierungs-, Erstgebiets-
und Gebietswechselimpulse teilen sich:

| Regel | Startwert |
|---|---:|
| Ungeplante Impulse in einer Sitzung | höchstens 2 |
| Ungeplante Impulse im rollenden Zeitfenster | höchstens 2 in 30 Minuten |
| Abstand zwischen ungeplanten Impulsen | mindestens 5 Minuten |
| Reguläre Aufgabe: zusammenhängende Fehlversuche | mindestens 3 |
| Herausforderung: zusammenhängende Fehlversuche | mindestens 5 |
| Überspring-Impuls | 3 verschiedene ausdrücklich zurückgestellte reguläre Quests in 15 Minuten |
| Orientierungsangebot | 3 verschiedene reguläre Quests in 10 Minuten jeweils nach unter 45 Sekunden ohne Versuch oder Lesen wieder verlassen |

Ein Strategieimpuls zu Fehlern erscheint pro Aufgaben-Durchlauf und Sitzung höchstens
einmal. Das Lesen einer Erklärung gilt nicht als orientierungsloses Springen.
Ein positives Aufgabenereignis unterbricht eine Fehlerfolge. Fehler in Wegprüfungen
und seltenen Wegbegegnungen lösen keine Strategieimpulse aus.

Ein Seitenneustart oder schneller neuer Sitzungsstart setzt das rollende Budget nicht
zurück. Während normaler Aufgaben passiert ansonsten nichts Zusätzliches. Ohne
verfügbares Budget entfällt der automatische Impuls; manuell gewählte Hilfen bleiben
immer erreichbar. Ein unterdrückter Impuls wird nicht später als Warteschlange
abgespielt.

**Nicht zum ungeplanten Budget gehören** die kurze Planung und der bewusst ausgelöste
Abschlussrückblick, normale fachliche Wissenseinführungen, selbst aufgerufene Hilfen,
die bestehende Quest-Erfolgsseite, die darin eingebettete Challenge-Einladung und
notwendige Bedien-/Prüfungsdialoge. Vorwissenswarnungen und die vorhandenen Tore bleiben
bestehen; das System verspricht nicht höchstens zwei beliebige Fenster pro Sitzung.

## Fachliche Hilfe und Lernsteuerung getrennt

| Dimension | Standard | Wirkung |
|---|---:|---|
| navigation | 3 | Sichtbarkeit und Stärke des nächsten Schritts |
| planning | 2 | Kompakte oder ausführlichere Zielauswahl |
| strategy | 2 | Automatische Strategieimpulse zugelassen; 0 = nur auf Abruf |
| content | 0 | Welcher fachliche Hilfeknopf betont wird; keine automatische Lösung |
| challenge | 1 | Optional Bezug zur eigenen Sicherheit in der Transfer-Einladung |

Alle fünf Werte lassen sich unter „Meine Unterstützung“ unabhängig einstellen.
Die erste Version passt **nur navigation automatisch nach unten** an. Die übrigen
Dimensionen bleiben bewusst gewählte Einstellungen. Einige benachbarte Werte haben
in dieser ersten Fassung dieselbe Wirkung (z. B. Strategie 1–3: seltene Impulse
innerhalb desselben konservativen Budgets). Es gibt keine vorgetäuschte feingranulare
Diagnostik für jeden Wert.

Neue mathematische Gedanken erscheinen weiterhin. Inhaltssupport 0 bedeutet
nicht, dass Erklärungen oder Beispiele fehlen: Sie werden selbst geöffnet.

## Fading der Navigation

| Stufe | Nach einer regulären Quest |
|---|---|
| 3 | Konkreter nächster Vorschlag, Weg zum Infoschild; freie Wahl bleibt möglich |
| 2 | Eine Empfehlung plus Alternativen und freie Karte |
| 1 | Auswahlhilfe: weiterüben, wiederholen, Neues, offene Herausforderung, selbst wählen |
| 0 | Keine zusätzliche nächste Empfehlung; auf der Karte „Hilf mir bei der Auswahl“ |

Die normale Bestätigung eines Bauabschlusses bleibt auch bei Stufe 0 erhalten. Nur
die zusätzliche Navigationsempfehlung entfällt. Wiederholungs- und Challengeabschlüsse
bekommen keine verpflichtende nächste reguläre Quest.

Automatisch geht es höchstens **eine Stufe je Auswertung** abwärts und nur bei einer
Kombination sicherer regulärer Arbeit mit selbst gewählten, anschließend abgeschlossenen
regulären Quests. Alle Kriterien einer Zeile müssen erfüllt sein:

| Aktuelle Stufe | Aufgaben-Durchläufe | Verschiedene Quests | Unbeeinflusster erster Versuch richtig* | Schließlich gelöst | Selbst gewählte, anschließend abgeschlossene Quests |
|---|---:|---:|---:|---:|---:|
| 3 → 2 | ≥6 | ≥2 | ≥75 % | ≥85 % | ≥1 |
| 2 → 1 | ≥10 | ≥3 | ≥80 % | ≥90 % | ≥2 |
| 1 → 0 | ≥12 | ≥3 | ≥85 % | ≥90 % | ≥3 |

*Hier bedeutet „unbeeinflusst“ eng definiert: Vor der ersten Antwort wurde kein
vollständiger Lösungsweg geöffnet. Tipps und Beispiele sind kein Negativmerkmal.
Dies ist ausdrücklich kein kausaler Nachweis selbstständigen Verstehens.

Nach jeder Änderung des Navigationsgrads wird nur neu hinzukommende Evidenz ausgewertet.
Derselbe Erfolg kann deshalb nicht automatisch alle drei Stufen auf einmal auslösen.
Eine bloße Zahl fertiger Quests oder bloß kurze Bearbeitungszeit genügt nicht.
Herausforderungen sind **keine notwendige Fading-Voraussetzung**. Ihr Abschluss kann
als Zusatzinformation im Änderungsereignis stehen, ersetzt aber kein reguläres Kriterium.
Challengefehler erhöhen die Führung nicht automatisch.

In einem erstmals betretenen Gebiet oder nach mehreren kurzen Abbrüchen kann die App
mehr Struktur anbieten. „Ich suche selbst weiter“ bleibt möglich. Erst „Passende Quests
wieder empfehlen“ setzt den Navigationsgrad auf mindestens 2. Auch im Rucksack kann jederzeit
mehr Unterstützung gewählt werden; schwierige Antworten entziehen niemandem die Wahl.

## Strategien lösen tatsächliche Handlungen aus

- **Genau lesen:** zurück zur Aufgabe, Fokus auf den Aufgabentext.
- **Hinweis:** vorhandenen kleinen Tipp öffnen; bewusstes Öffnen und Sichtbarkeit protokollieren.
- **Beispiel:** vorhandenes paralleles Beispiel, ohne die Aufgabeneingabe zu verlieren.
- **Kleinere Schritte:** gesucht/gegeben klären → vorhandenen Tipp hinzunehmen →
  eigenen kleinen Schritt planen; erst dort optional Beispiel oder den vorhandenen
  vollständigen Lösungsweg bewusst öffnen.
- **Skizze/Darstellung:** passende Wissenskarte mit ihrem interaktiven Modell öffnen.
- **Hilfe holen:** kurze Aufforderung, die konkrete Frage einer Person vor Ort zu zeigen;
  keine vermeintliche Verbindung zu einem Chat oder einer Lehrkraft.
- **Später:** bisherigen Aufgabenstand behalten und in die Welt zurückkehren.

Auch nach mehreren Fehlern erscheint keine vollständige Lösung automatisch. Die
Regulationskarte ist freiwillig schließbar. Die Prüfungstore bleiben konsequent
**ohne mathematische Tipps, Beispiele, Strategieknopf oder Lösungsschritte**.

## Zurückstellen, Gebietswechsel und Herausforderungen

Einfaches Schließen bedeutet weiterhin nicht „übersprungen“. Nur ausdrückliches
„Für später merken“ zählt für das Skip-Muster. Die gebündelte Frage akzeptiert bekannte
Inhalte, Schwierigkeit, Themenwechsel, späteres Wiederkommen oder Erkunden, auch ohne
Angabe. Keine Auswahl bestraft oder ändert mathematische Voraussetzungen.

Beim Wechsel aus einem Gebiet mit offenen regulären Quests kann ein Dialog die Zahl
nennen und „Noch etwas bearbeiten“ / „Weitergehen“ anbieten. Eine Begründung bleibt
freiwillig und unterliegt dem gemeinsamen Budget. Das Weitergehen setzt gegebenenfalls
den unterbrochenen Laufweg mitsamt seinem Interaktionsziel fort. Bestehende Blockaden
und Vorwissensprüfungen werden dadurch **nicht umgangen**. Die vorhandene Torankündigung
speichert ebenfalls die bewusste Weitergeh-/Bleibentscheidung, ohne neue Reflexionsfrage.

Die Freischaltung einer Herausforderung wird in die vorhandene Erfolgsseite eingebettet:
„schwierigere Probleme erproben“, starten/später/weiter erkunden. Kein Bonusnachweis,
kein Zwang zum Beweisen. Eine hohe Start-Sicherheit kann als freiwillige Einladung
aufgegriffen werden. Bisherige Gebietsschmuck-/Bauanimationen bleiben unverändert.
Das Nichtwählen einer Herausforderung erzeugt keinen Meidungs- oder Defizitbefund.

## Rückblick und vorsichtige Kalibrierung

„Lerneinheit abschließen“ zeigt den zuletzt gültigen Plan, die tatsächlichen bearbeiteten,
abgeschlossenen und zurückgestellten Quests, Hilfen und die getrennten Challenge-Schritte.
Danach genau **zwei freiwillige Fragen**: aktuelle Sicherheit 1–5 und nächstes Vorhaben.
Es gibt keine zusätzliche verpflichtende Frage „Was hat geholfen?“. Beobachtete
Strategiewahlen werden stattdessen vorsichtig aus dem Verlauf gespiegelt.

Ein Strategieereignis wird nur dann mit anschließendem Weiterarbeiten verbunden,
wenn dieselbe Aufgabenbearbeitung in derselben Sitzung binnen 15 Minuten richtig
abgeschlossen wurde. Zugeordnet wird nur die jüngste passende Strategie, einmalig.
Ein danach geöffneter Lösungsweg wird zusätzlich markiert. Diese zeitliche Folge ist
kein Kausalnachweis und wird auch so erklärt. Es erscheint kein Erfolgs-Pop-up dazu.

Eine Einschätzungsrückmeldung benötigt mindestens drei bearbeitete Aufgaben-Durchläufe;
bei gewähltem Thema müssen dort genügend Daten vorliegen. Reguläre und anspruchsvolle
Aufgaben bleiben getrennt. „Zu wenige Antworten“ und „kein Nachweis für alle Aufgaben
des Themas“ begrenzen die Aussage. Niemand wird als über- oder unterschätzend etikettiert.

„Noch weiterlernen“ verwirft die nicht bestätigte Reflexion. „Abschließen und exportieren“
speichert sie, schließt die bestehende Sitzung und startet den bisherigen Dateiexport.
Die App kann weiterhin nicht erkennen, ob anschließend der native Dateidialog wirklich
erfolgreich gespeichert wird. Ein Zwischenexport öffnet keine Abschlussreflexion.

## Architektur und Persistenz

- `teacher-dashboard/shared/regulation.js`: deterministische Regeln und gemeinsame
  Zusammenfassungen, ohne UI oder eigene Speicherung.
- `teacher-dashboard/shared/regulation-validation.js`: neue Ereignisfelder validieren.
- `js/regulation.js`: bestehendes LearningLog beobachten, Entscheidungen protokollieren;
  nur flüchtiger UI-Zustand. Keine zweite Quest-/Kompetenzdatenbank.
- `js/regulation-ui.js`: kleine Dialoge und echte Aktionen über einen App-Adapter.
- `js/app.js`: Ereignispunkte; bestehende mathematische Auswertung weiterverwenden.
- `teacher-dashboard/js/regulation-view.js`: Klassen- und Personenansicht;
  `js/report.js` liefert kompakte Zusammenfassungen statt sämtliche Rohdaten pro Tabelle.

Alle Zusatzinformationen sind normale, unveränderliche Ereignisse mit den vorhandenen
`eventId`, `studentId`, `sessionId` und Kontextreferenzen. Supportwerte werden aus
Änderungsereignissen abgeleitet. Import/Export/Idempotenz benutzen die bestehenden Stores
und Merge-Regeln; unbekannte alte Selbstregulationsdaten werden nicht erfunden.

## Austauschformat und Betrieb

Neue Exporte: Austauschformat 2, App 5.1.0. Die neue Version liest auch Format 1 aus 5.0.
Das eingebettete Spielstandschema bleibt 3. Ältere Dashboards kennen neue Ereignistypen
nicht: **Schüler-App und Lehrkräfte-App gemeinsam vollständig aktualisieren**.
Eine Zurückmigration neuer Dateien in alte App-Versionen ist nicht vorgesehen.

Kürzel, Selbsteinschätzungen, gewählte Ziele und Gründe sind exportierte Lerndaten.
Sie sind freiwillige strukturierte Angaben, keine Freitexte. Hinweise sind Beobachtungen,
keine psychologische Diagnose. Schulische Freigabe, Datenübertragungsweg, Speicherfristen
und der Schutz der Geräte bleiben beim Betreiber. Siehe technische Datenschutznotizen.

## Lehrkräfte-Lernentscheidungen

Neue Klassenansicht und Personenregister „Lernentscheidungen“ zeigen getrennt:
Lernpläne, optionale Rückblicke, Unterstützungsgrade und deren Veränderungsgrund,
eigene Questwahlen, Strategien mit späterem Aufgabenabschluss, Gründe für gebündeltes
Zurückstellen, Rückkehr zu offenen Quests und freiwillige Vertiefungsentscheidungen.
Datumsfilter gelten auch hier. Ein kleiner Supportwert ist keine Leistungsnote und
wenige Reflexionen sind kein Defizit. Es gibt keinen zusammengesetzten Selbstregulations-
Score; die bisherige fachliche Priorisierung bleibt von diesen Angaben getrennt.

## Tests und Einsatzgrenzen

Siehe `TESTS.md` für tatsächlich ausgeführte Prüfungen und Geräte-Abnahme. Kein physisches
iPad/Safari, kein nativer Offline-Neustart und keine echte dauerhafte Browserdatenbank
wurden in dieser Umgebung getestet. Produktregeln sind keine nachgewiesene pädagogische
Wirksamkeit. Vor Unterrichtseinsatz mit wenigen Lernenden prüfen, ob fünf Minuten,
drei bzw. fünf Fehler und die Zielauswahl angemessen sind; alle Schwellen zentral ändern.

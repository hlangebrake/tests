# Änderungen · Kommaland 7.2

Arbeitsgrundlage: tatsächlich bereitgestellte 7.1-Entwicklungs-ZIP, unverändert entpackt und mit 278 bestandenen Basistests geprüft. Keine Neuentwicklung und keine neue Laufzeitabhängigkeit.

| Änderung | Betroffene Dateien | Unverändert |
|---|---|---|
| Mathematische Titel, Leitsätze, kompakte Punkte, Feedback und Help-Disclosure | `js/presentation.js` (neu) | Ursprüngliche Aufgaben/Erklärungen und Antworten |
| Intro, Aufgaben, Wissen, Gate-Rückkehr, Abschluss und HUD | `js/app.js`, `styles.css`, `index.html` | Questcommit, Modellzustände, Prüflogik, Weltengine |
| Lernziele und Erfolgskriterien auf Nachfrage | `js/enrichment.js` | Zusatzrunden, offene Notizen, Zielevents und Auswahlregeln |
| Kompaktes N2, kurze Empfehlung mit Begründung auf Nachfrage | `js/difficulty-ui.js` | `difficulty-bank.js`, `difficulty-data.js`, `shared/difficulty.js`, Pins und Ereignisse |
| Kürzere Reflexion/Nächster-Schritt-Texte | `js/regulation-ui.js` | `regulation.js`, Budgets/Cooldowns und Sitzungslogik |
| Ruhigere Schaubild-/Schriftrechenköpfe und Eingabehinweise | `js/visuals.js`, `js/written.js`, `js/task-widgets.js` | Rechenmodelle und Eingabeprüfung |
| Version 7.2.0; neues Präsentationsmodul im Schülercache | HTML, Manifeste, `package.json`, `shared/save-schema.js`, beide Service Worker | Austauschschema 5, Spielstandschema 3, Kerncontent 6 |
| Neue Präsentations-/Vergleichstests | `tests/presentation.test.js`, `tests/presentation_browser.py`, `tests/presentation_capture.py`, `tests/presentation_actions.py` | Bestehende fachliche Regressionen erhalten |

## Absichtlich geänderte Bedienwege

„Wissen/Beispiel/Tipp/Strategie“ liegen unter „Hilfe“. Kriterien und Geschichte werden erst geöffnet. Niveauangebote nennen erst kurz die Entscheidung, dann optional den Grund. Die aktuelle Aufgabe bleibt beim Niveauwechsel eingefroren wie in 7.1. Erfolgreiche Gate-Aufgaben führen nach Animation direkt in die Welt statt in `gate-success`. Challenges/Erinnerungsrätsel erhalten keinen weiteren Belohnungsdialog. Reguläre Quests behalten Zielreflexion und adaptive Weiterwahl.

Bestehende Browserprüfungen wurden nur an diese neuen Bedienwege beziehungsweise absichtlich entfernten Überschriften angepasst. `reveal_click` öffnet die tatsächliche Help-Schaltfläche/Disclosure und klickt dann den Zielknopf; es ersetzt keine fachliche Aktion. Die gezielten neuen Tests verwenden echte Pointer-/Tastaturbedienung. Reine Entwicklertest-Assertions zu alten Texten wurden nicht als Produktfehler behandelt.

## Bewahrter Bestand

16 Kernquests, 77 Positionen, 231 Niveauvarianten; acht Challenges/24 Aufgaben; 72 Zusatzaufgaben; acht offene Partneraufträge; 107 Wissensmodelle; schriftliche Beispiele, Weltobjekte und freie Rückwege aus 6.1. Ein Hashvergleich mit der gelieferten 7.1-Basis prüft die zentralen unberührten Inhalts-, Prüfungs-, Speicher-, Empfehlungs- und Weltmodule. Keine neue historische Beobachtung durch ein UI-Update.

## Releasepflege

Schulfassung ohne Testartefakte/Debugobjekte. Entwicklung enthält relevante Vorher/Nachher-Aufnahmen, Tests und Rohberichte. Historische Berichte sind als solche gekennzeichnet. `TESTS.md` beschreibt Endläufe, Entwicklungsfehler und nicht mögliche Native-Prüfungen; alte Erfolgszahlen werden nicht ungeprüft übernommen.

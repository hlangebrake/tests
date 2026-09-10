# Ereignisbasierte Selbstregulation · Ergänzung in 6.0

Planung, adaptive Navigationshilfe, eigener Weg, freiwillige Herausforderung und Sitzungsrückblick bleiben aus 5.1 erhalten. Mathematisches Scaffolding und Regulationshilfe bleiben getrennt einstellbar. Die automatische Reduktion der Navigation verwendet nach dem Inhaltswechsel nur neue Leistungs-/Entscheidungsevidenz; alte Mikroaufgaben werden nicht unmittelbar als Anlass für weiteres Fading verwendet.

## Zentrale Startwerte

`teacher-dashboard/shared/regulation.js` enthält `SRL_RULES`. Regeln sind anpassbare didaktische Startwerte, nicht validierte Diagnoseschwellen.

| Anlass | Aktueller Auslöser |
| --- | --- |
| Dieselbe reguläre Aufgabe | 3 aufeinanderfolgende Fehlversuche |
| Dieselbe Challenge-Aufgabe | 5 aufeinanderfolgende Fehlversuche |
| Fehlermuster innerhalb einer regulären Quest | 5 Fehler unter den letzten 7 Versuchen innerhalb von 8 Minuten, an mindestens 2 Aufgabenbearbeitungen |
| Wiederkehrende reguläre Kompetenz | mindestens 4 Fehlversuche und mindestens 60 % Fehler im betrachteten Fenster, an mindestens 2 Aufgabenbearbeitungen |
| Wiederholte Wegtest-Schwierigkeit | frühestens nach 2 fehlgeschlagenen Runden derselben Prüfung; erst außerhalb der Runde |
| Gemeinsames automatisches Budget | höchstens 2 pro Sitzung, zusätzlich höchstens 2 im rollenden 30-Minuten-Fenster, mindestens 5 Minuten Abstand |

Das Budget teilen sich Fehler-, Überspring-, Orientierungs- und Bereichswechselimpulse. Manuelle Hilfe bleibt verfügbar. Ein einzelner Fehler löst keine automatische Reflexion aus. Das gemeinsame Budget zählt beide Seiten der folgenden Reflexion als EINEN Impuls. Challenges erzeugen keine breite Diagnose eines regulären Kompetenzdefizits. Ihre Fehler lösen die questübergreifenden Grundkompetenztrigger nicht aus.

## Kurze Rückschau → Handlung

1. „Was hast du schon versucht?“ Freiwillige Mehrfachauswahl: lesen, Wissen, Tipp, Beispiel, Rechenweg prüfen, anderes oder bisher nur probiert/geraten. Angegebene Hilfeöffnungen werden aus echten, bewusst angeforderten Hilfenevents derselben Bearbeitung gezählt; automatische Wissenseinführung und bloßes Wiedererscheinen zählen nicht erneut.
2. „Was könnte dir zusätzlich helfen?“ Direkte Aktionen: Wissen öffnen, Hinweis, Beispiel, nochmal lesen, eigenen letzten abgegebenen Versuch ansehen, Schrittfolge, Darstellung, Hilfe vor Ort oder für später zurückstellen. Bereits mehrfach verwendeter Tipp bzw. bereits verwendetes Beispiel wird nach hinten sortiert statt automatisch erneut als beste Lösung angeboten.

Die Rückschau ist keine Pflichtauskunft und keine Prüfung. Ein Schließen kann zur Strategieauswahl oder zur Aufgabe zurückführen. Es wird kein Defizitlabel aus „geraten“ erzeugt. Das Ereignis `srl_strategy_review` speichert kontrollierte Aktionskürzel und aggregierte beobachtete Hilfezählungen, keine Freitexte und keine eingegebenen Rechenwerte.

„Rechenweg prüfen“ zeigt den letzten abgegebenen Eingabewert der aktuellen Aufgabe. Es kann keinen nicht eingegebenen handschriftlichen Rechenweg rekonstruieren. Der Wert bleibt im RAM und wird nicht exportiert. „Hilfe holen“ meint eine reale Person vor Ort; es existiert kein automatischer Lehrkräfte-Chat.

## Nach einem Wegtest

Die Prüfrunde wird zuerst beendet. Der Bericht nennt konkrete offene Schlüssel. Nach wiederholter Schwierigkeit und freiem Budget folgt derselbe kurze Rückblick. In der anschließenden Aktionsseite kann einer der tatsächlich offenen Gedanken ausgewählt werden. Die passende Quest, Wissensseite oder das Beispiel öffnet außerhalb des Tests. Beim Zurückgehen bleibt der Bericht erreichbar; bestandene Schlüssel bleiben bestehen.

## Bestehender Zyklus

Kurze freiwillige Planung → Arbeiten → bei relevantem Ereignis überwachen/Strategie ändern → gebündelter Plan-Ist-Rückblick und zwei freiwillige Fragen beim Sitzungsabschluss → nächstes Vorhaben optional wieder aufnehmen. Keine zusätzliche Reflexion nach jedem Aufgabenabschluss. Navigation kann schrittweise von 3 nach 0 zurückgenommen und auf Wunsch wieder verstärkt werden. Ein schwaches Challenge-Ergebnis setzt die Navigation nicht automatisch hoch.

# Bestandsanalyse und UI-Audit · 7.1 → 7.2

Verbindliche Quelle war der tatsächliche Code der gelieferten `Kommaland-7.1-Entwicklung.zip`, nicht frühere Antworttexte. Das Archiv wurde getrennt unverändert entpackt. Vor Änderungen bestanden 278 Modultests. Kernmodule wurden für einen Hashvergleich referenziert. Es gab keine abweichende Mathematik- oder Schemaanforderung.

| Produktive Fläche in 7.1 | Befund | Entscheidung in 7.2 |
|---|---|---|
| Questintro | Storymedaillon, NPC/Ort, Ziel und drei Kriterien gleichzeitig | Mathethema, Ziel; Kriterien/Geschichte/Zusatzwerkzeuge einklappen |
| Aufgabenheader | narrative Hauptüberschrift, Region/NPC, Phase, Punkte und ausgeschriebener Zähler | Mathethema, Questname klein, N2, Punkte mit ARIA-Zahl |
| Aufgabe/Rechentafel | hohe Kopf-/Fußfläche, mehrere Aktionen | Aufgabe sofort, volle mathematische Instruktion erhalten |
| Wissen | Anmoderation/Text vor Modell; große Kopfdekoration | mathematischer Leitsatz und Visualisierung; vollständiger Text optional |
| Schriftliche Beispiele | zusätzliche Metazeile und dauernde Zeichenlegende | kurzer Titel; mathematische Schritte unverändert; Legende optional |
| Hilfe | vier oder mehr gleichgewichtige Buttons | gemeinsames Help-Disclosure, Prüfung bleibt primär |
| Richtig/falsch | großer allgemeiner Erfolgsruf | tatsächliches Resultat/ausgewählte mathematische Aussage; alte Begründung erhalten |
| Questabschluss | Belohnung, Bau-/Speicherinformation, Gesamtzähler | kurze Zielreflexion/Weiterwahl; Welt zeigt Bauwerk |
| Challengeabschluss | reine Erfolgsrolle | direkte Weltrückkehr nach Animation |
| Wegprobe | narrative Kopfzeilen; erfolgreicher Test mit zusätzlichem Bestätigungsmodal | mathematische Kompetenz; erfolgreiche Öffnung ohne Modal; Fehlerbericht erhalten |
| Challengeeinladung | mehrere erklärende Absätze | kompakter freiwilliger Vertiefungsauftrag, drei Entscheidungen erhalten |
| Reflexion | lange Lernspuren vor den Fragen | Lernspuren aufklappen; Plan-Ist und Selbstauskunft bleiben |
| Niveauempfehlung | Begründung dauerhaft mehrzeilig | kurze Frage/Entscheidung; Begründung auf Nachfrage |
| Welt-HUD | Claim, Questschritt, Steuertext und Speicherroutine gleichzeitig | mathematisches nächstes Ziel; Geschichte sekundär; keine Save-Erfolgsmeldung |
| Karte/Reisebuch | narrative Questnamen zuerst | in Karte Matheschwerpunkt vor Questname; Weltgeografie bleibt |
| Rucksack | lange Steuerhinweise ständig im Dokumentfluss | Steuerung aufklappen; Datenverlust-/Exporthinweise sichtbar |
| Import/Export | notwendige Entscheidungen und Fehler | beibehalten; reine Importerfolgsmeldung nur ARIA |
| Tutorial/Bewohner | Weltgeschichte und Einführung | einmalige Einführung und bewusst geöffnete Figuren bleiben |
| Zusatzübung/offene Arbeit | wichtige mathematische Texte und freiwillige Statuswahl | erhalten; Startwerkzeuge und Pausenaktionen gebündelt |
| Lehrkräfte-Dashboard | fachliche Daten bereits strukturiert | kein Umbau; nur konsistente Releaseversion |

**Vorher/Nachher-Messung:** Unveränderte 7.1 und 7.2 wurden mit demselben 1024×768-Viewport, gleicher Quest und identischer Kamera aufgenommen. Die mathematische Aufgabe ist in beiden dieselbe. Ein längeres Wissen bleibt intern scrollbar, die Rechentafel passt jetzt vollständig. Siehe `VISUELLE-REGRESSION.md`.

Die Prüfung ergab keine Notwendigkeit, Engine, Questdaten, Niveaubank, Empfehlungsregeln, Speicherung oder Fachdiagnostik zu erneuern. Alle Änderungen sind an Präsentationsgrenzen angesetzt. Alte Referenzberichte im Entwicklungsarchiv sind ausdrücklich historisch.

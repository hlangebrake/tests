# Verbindliche Informationsarchitektur · Kommaland 7.2

**Die Welt erzählt die Geschichte. Die Arbeitsansicht zeigt die Mathematik.**

## Vier Ebenen

| Ebene | Sichtbarkeit während der Bearbeitung | Beispiele |
|---|---|---|
| 1 Mathematik | zuerst, dominant | fachliches Thema; unveränderter Arbeitsauftrag; Darstellung; Eingabe; Rechenresultat und Begründung |
| 2 Lernsteuerung | kompakt | Ziel; N2; Fortschrittspunkte; Antwort prüfen / Weiter |
| 3 Unterstützung | bewusst aufklappen | Wissen; Beispiel; Tipp; Strategie; Kriterien; Zusatzübung |
| 4 Spiel und System | klein, optional oder Welt | Questname; NPC/Geschichte; Belohnung; Bauzustand; normaler Autosave |

Aufgabenheader: Mathematik links, kompaktes Niveau und Schließen rechts; darunter Questname und Punkte. Keine NPC-/Regions-/Belohnungszeile, keine sichtbare zweite Fortschrittszählung, keine Lernphasenetiketten. Die Aufgabe beginnt unmittelbar im Body. Lange mathematische Aufträge werden nicht abgeschnitten.

## Wissensseiten

Mathematischer Titel, Kernsatz, unveränderte interaktive Modelle. Auf breiten Tablets stehen Anschauungsmodell und schriftliche Übertragung nebeneinander, auf schmaleren Displays untereinander. Die vollständige alte Erklärung steht unter „Weitere Erklärung“. Modellbeschriftungen, Definitionen, Einheiten und Rechenschritte bleiben erhalten. Kein bloßes Icon ersetzt Mathematik.

## Disclosures und Fokus

Help ist ein normales Button-Disclosure, kein ARIA-Menü mit künstlich erforderlicher Pfeiltastensteuerung. Es verwendet `aria-expanded`, `aria-controls`, ein tatsächlich verborgenes Panel und normale fokussierbare Buttons. Escape im offenen Help schließt zunächst nur Help; Fokus kehrt auf den Auslöser zurück. Enter/Space auf Buttons und Summary darf nicht zusätzlich eine Aufgabe abschicken oder die Welt bewegen.

Die übrigen optionalen Texte nutzen native `details`/`summary`. Der Fokuszyklus berücksichtigt nur sichtbare Elemente. Die Punktfolge trägt ein zugängliches Label mit erledigter und aktueller Position; optisch doppelte Zahlen entfallen. `#worldStatus` liegt außerhalb des beim Lernmodal inerten Spielbereichs und nutzt `role=status`, `aria-live=polite`, `aria-atomic=true`.

Orientierung: W3C WAI-ARIA APG, Disclosure Pattern (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/); WCAG 2.2 Understanding Status Messages (https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), abgerufen 10.09.2026. Die Verwendung dieser Muster ist keine vollständige WCAG-Konformitätsbescheinigung.

## Popup-Regel

Eine aktive Unterbrechung braucht mindestens einen Grund: (1) mathematische Information, (2) notwendige Entscheidung, (3) sonst nicht erkennbarer Fehler/Zustand, (4) Datenschutz, Sicherheit oder Datenverlust. Ohne Grund kein Modal/Toast.

| Situation | Behandlung |
|---|---|
| Torprobe bestanden | Abschluss wird gespeichert, Animation, Welt/Route läuft weiter; nur ARIA-Status, kein Erfolgsmodal |
| Normale Quest abgeschlossen | bestehende Zielreflexion und adaptive Weiterwahl; keine Extra-Belohnungsseite |
| Challenge/Rätsel abgeschlossen | Weltveränderung und ARIA-Status; keine reine Belohnungsrolle |
| Probe noch unsicher | mathematischer Bericht und passende Nacharbeit erhalten |
| Speicherung gelingt | still |
| Speicherung scheitert / Historie nicht speicherbar | sichtbare persistente Warnung plus einmaliger Hinweis |
| Import ersetzt Daten / Neustart | echte Bestätigung beibehalten |
| Exportdownload | Hinweis zur tatsächlichen Dateisicherung beibehalten |
| Fehlerhafter Export/Import, beschädigte Daten | sichtbarer Fehler bleibt |
| Weg nicht erreichbar | kurze Zustandsmeldung, da die Ursache sonst nicht eindeutig wäre |
| Hilfe vor Ort ausdrücklich gewählt | kurze Handlungsanweisung zulässig |
| Niveauempfehlung | eingebettete Wahl mit Details, kein zusätzlicher automatischer Dialog |
| Nach einmaliger Steuerungseinführung | Hinweise nur kontextsensitiv/auf Nachfrage |

## Layout und Verantwortung

`.math-surface` beschränkt die ruhige Gestaltung auf Lernansichten. Spielwelt, Karte und Bewohner dürfen weiterhin Atmosphäre tragen. 44px-Ziele für primäre Bedienelemente, sichtbare Fokuslinien, ausreichend große mathematische Schrift und vergrößerte Schriftoption bleiben. Die Karte zeigt zu Questobjekten zuerst das mathematische Thema und anschließend den Questnamen.

Das Help-Panel ist innerhalb der Fußleiste verankert und bei Bedarf selbst scrollbar. Lange Aufgaben/Wissen scrollen im Modal, nicht die ganze Seite. Auf 1024×768 gewinnt eine Rechentafel gegenüber 7.1 rund 128px durch Header-/Footerreduktion. Das ist eine Layoutmessung, keine Leistungs- oder Lernerfolgskennzahl.

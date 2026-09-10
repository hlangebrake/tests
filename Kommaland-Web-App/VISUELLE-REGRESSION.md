# Visuelle Regression · Kommaland 7.1 → 7.2

Tatsächliche Browseraufnahmen, keine Entwürfe. Gleicher 1024×768-Viewport, emulierter Touch, gleiche Quelle des mathematischen Kerns, gleiche Modellkamera. Die Figur wird im Source-Harness manuell gerendert; keine native Safari-Aufnahme. Aufnahmen: `test-artifacts/v7.2/before/` und `after/` (Entwicklungspaket). Zehn paarweise Screens: Intro, erste Zahlaufgabe, Rechentafel, Hilfe, Wissen, Niveauauswahl, Abschluss, Welt, Vergleichsaufgabe und Wegprobe.

| Fläche | Header 7.1 → 7.2 | Fußleiste 7.1 → 7.2 | Gesamter Body-Inhalt 7.1 → 7.2 |
|---|---:|---:|---:|
| Questintro | 150 → 94 px | 84 → 65 px | 538 → 246 px |
| Rechentafel | 150 → 94 px | 137 → 65 px | 536 → 499 px |
| Wissen | 128 → 72 px | 84 → 65 px | 1509 → 868 px |
| Niveauauswahl | 130 → 72 px | 82 → 65 px | 426 → 418 px |
| Questabschluss | 130 → 94 px | 84 → 65 px | 977 → 497 px |
| Wegprobe | 151 → 94 px | 84 → 65 px | 342 → 306 px |

## Auffällige Unterschiede

**Rechentafel:** Kopf und Fuß zusammen von rund 287 auf 159px, also ungefähr 128px beziehungsweise 45% weniger. Der Beginn der identischen Aufgabe liegt bei y=167 statt y=225. Rechentafel und Zahlenfeld sind in diesem Zustand vollständig sichtbar (499px Inhalt/499px Bereich statt 536px Inhalt/431px Bereich). Dies gilt für diese Aufnahme, nicht jede beliebig lange Aufgabe.

**Intro:** kein hoher NPC-/Storybereich; Ziel sofort lesbar. Kriterien, Geschichte und Zusatzwerkzeuge einzeln erreichbar. Kein Scrollen zum Beginn nötig.

**Wissen:** Leitsatz und Anschauung stehen vor Prosa. Schriftliche Übertragung direkt daneben auf breiten Tablets. Vollständige Originalerklärung bleibt unten aufklappbar. Lange Modelle brauchen weiterhin internes Scrollen; fachliche Inhalte wurden nicht zur Vermeidung jeder Scrollbewegung entfernt.

**Hilfe:** vorher mindestens vier gleichwertige Hilfeaktionen neben der Prüfung. Jetzt Help und Prüfung, fachliche Auswahl erst nach Öffnen. Offenes Panel überdeckt einen Teil der unteren Arbeitsfläche nur während der ausdrücklichen Hilfewahl.

**Abschluss:** mathematisches Thema und Zielselbstauskunft statt großer Belohnungsüberschrift, Gesamtzähler und Speichersatz. Kein eigener Gate-Erfolgsdialog mehr: deshalb zeigt der gezielte Gate-Test unmittelbar die Welt und den zugänglichen Status.

**HUD:** Story bleibt in 3D erkennbar, aber dauernde Steuer- und Save-Erfolgstexte entfallen nach Einführung. Nächster Lernschritt bezeichnet das mathematische Thema; Questname bleibt sekundär.

Die Rohmessungen enthalten Layoutwerte, keine pädagogischen Leistungsdaten. Der unterschiedlich hohe, zentrierte Dialog kann die absolute Bildschirmposition kurzer Aufgaben nur wenig verändern; maßgeblich ist die tatsächliche freigewordene Arbeitsfläche. Zusätzliche Regression prüft 1180×820, 1024×768, 820×1180, 768×1024 und 390×844. Größen-/Fokus-/Fehlergrenzen stehen im Testbericht.

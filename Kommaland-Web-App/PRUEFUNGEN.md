# Pruefungen · Kommaland 7.1

> Weitergeltender Bestand aus Version 7; in 7.1 fachlich unverändert. Niveau 2 nutzt die ursprünglichen Kernaufgaben. Die neuen Niveauvarianten und ihre Lösungen stehen in NIVEAU-AUFGABEN.md; Regeln und Grenzen in NIVEAUS.md.


Die nachstehend dokumentierte fachliche/technische Basis wurde aus 6.1 übernommen. Historische Versionsangaben kennzeichnen ihren Ursprung, nicht die aktuelle Appversion. Aktuelle Änderungen und Prüfungen: AENDERUNGEN.md, TESTS.md. Neue Lernformate: UEBUNGSBANK.md und OFFENE-AUFTRAEGE.md.

# Kurze Wegprüfungen und dauerhafte Wege · 6.1

## Einmal frei, in beide Richtungen frei

Die folgende mathematische Prüfungsstruktur aus 6.0 bleibt bestehen. Korrigiert wurde die physische Sperre: Ein bereits freigeschalteter Weg wird beim Betreten des Zielgebiets nicht auf der Rückseite erneut gesperrt.

Beispiel: Der Test vom Funkeldorf in den Flüsterwald öffnet die Verbindung für **Hin- und Rückweg**. Der Wald erhält dadurch kein eigenes Ausgangssiegel. Für einen anderen noch verschlossenen Weg, etwa zum Hafen, können weiterhin Wissensnachweise nötig sein. Auch alle anderen durch ein Gebietssiegel bereits nachweisbar freigeschalteten Verbindungen bleiben in beiden Richtungen frei.

`openPaths` speichert maximal elf kanonische Verbindungen. Die 22 Richtungsvarianten bleiben als mögliche Prüfungszugänge für einen noch gesperrten Weg vorhanden; sie sind **keine Pflicht, denselben Weg zweimal freizuschalten**. Kollisionen, Wegsuche, Kartenanzeige und Weltobjekte fragen dieselbe Funktion `gateStatus` ab. Eine Prüfung auf einer freien Verbindung wird nicht neu gestartet und vergibt kein unbegründetes Siegel.

Bisherige vollständig nachgewiesene Verbindungen werden beim Laden eines 6.0-Spielstands erkannt. Unvollständige oder fehlerhafte Prüfungen allein öffnen keinen Weg. Die Animation öffnet/verblasst die neu freien Barrieren wie bisher.

## Unveränderte Testinhalte aus 6.0

# Kurze Fundamentprüfungen · 6.0

Ein Test ist eine diagnostische Stichprobe, keine vollständige Kompetenzbescheinigung. Jede der 22 Richtungen hat beim ersten vollständigen Versuch drei bis sechs Aufgaben. Wiederholungs- oder Zusatzrunden dürfen kürzer sein: keine künstliche Auffüllung.

## Ablauf

Jedes Ausgangsgebiet hat drei ausgewählte Kernaufgaben. Benötigt das Ziel zusätzliche Grundlagen, kommen nur die noch nicht nachgewiesenen Schlüssel hinzu. Schlüssel werden dedupliziert. Manche einzelne Aufgaben enthalten zwei eng zusammengehörige Felder, etwa Fläche und Volumen oder Umformung und Quotient. Es gibt eine gemeinsame Abgabe pro Rechentafel.

Der Einstieg ist vor Abschluss aller Quests möglich, mit Hinweis. Während einer laufenden Prüfrunde gibt es keine Tipps, Beispiele, Wissensseiten oder Strategiefragen. Antworten werden am Ende ausgewertet. Richtige Schlüssel bleiben erhalten. Wiederholungen verwenden andere Zahlen (sieben Grundvarianten je Schlüssel; nach weiteren Wiederholungen können Varianten wiederkehren). Eine richtige Antwort ist ein Stichprobenerfolg, nicht der Beweis dauerhafter Beherrschung.

## Alle Erstprüfungen

| Von | Nach | Aufgaben | Geprüfte Schlüssel |
| --- | --- | --- | --- |
| Funkeldorf | Flüsterwald | 3 | c6-place, c6-fractions, c6-zeros |
| Flüsterwald | Funkeldorf | 3 | c6-compare, c6-line, c6-round |
| Funkeldorf | Maßhafen | 4 | c6-place, c6-fractions, c6-zeros, c6-compare |
| Maßhafen | Funkeldorf | 3 | c6-units, c6-time, c6-volume |
| Funkeldorf | Summenmarkt | 3 | c6-place, c6-fractions, c6-zeros |
| Summenmarkt | Funkeldorf | 3 | c6-add, c6-sum-smart, c6-estimate |
| Funkeldorf | Malmühle | 4 | c6-place, c6-fractions, c6-zeros, c6-add |
| Malmühle | Funkeldorf | 3 | c6-scale, c6-product, c6-distribute |
| Flüsterwald | Teilgrotten | 6 | c6-compare, c6-line, c6-round, c6-product, c6-scale, c6-sub |
| Teilgrotten | Flüsterwald | 5 | c6-divide-written, c6-divisor, c6-fractions, c6-place, c6-zeros |
| Flüsterwald | Maßhafen | 4 | c6-compare, c6-line, c6-round, c6-place |
| Maßhafen | Flüsterwald | 5 | c6-units, c6-time, c6-volume, c6-place, c6-zeros |
| Summenmarkt | Differenzklippen | 4 | c6-add, c6-sum-smart, c6-estimate, c6-zeros |
| Differenzklippen | Summenmarkt | 4 | c6-sub, c6-inverse, c6-zeros, c6-place |
| Summenmarkt | Malmühle | 4 | c6-add, c6-sum-smart, c6-estimate, c6-fractions |
| Malmühle | Summenmarkt | 5 | c6-scale, c6-product, c6-distribute, c6-place, c6-zeros |
| Malmühle | Teilgrotten | 4 | c6-scale, c6-product, c6-distribute, c6-sub |
| Teilgrotten | Malmühle | 4 | c6-divide-written, c6-divisor, c6-fractions, c6-add |
| Malmühle | Sternenburg | 6 | c6-scale, c6-product, c6-distribute, c6-add, c6-sub, c6-divisor |
| Sternenburg | Malmühle | 5 | c6-model, c6-operations, c6-estimate, c6-add, c6-fractions |
| Differenzklippen | Sternenburg | 6 | c6-sub, c6-inverse, c6-zeros, c6-add, c6-product, c6-divisor |
| Sternenburg | Differenzklippen | 5 | c6-model, c6-operations, c6-estimate, c6-add, c6-zeros |

## Rückmeldung und gezieltes Weiterlernen

Nach einer fehlerhaften Runde erscheinen „In dieser Stichprobe richtig“ und „Hier noch gezielt üben“ je Schlüssel. Ein Auswahlfeld bestimmt den nachzuarbeitenden Gedanken. Passende Quest, Wissensseite oder paralleles Beispiel öffnen außerhalb des Tests. Zurück zur Prüfung stellt den Bericht wieder her. Richtige Nachweise werden nicht gelöscht.

Nach zwei fehlgeschlagenen Runden kann zusätzlich die kurze Rückschau → Strategieauswahl erscheinen, aber nur innerhalb des gemeinsamen Sitzungsbudgets und Cooldowns. Die betreffende Kompetenz kann ausdrücklich gewählt werden. Ein solcher Impuls erscheint niemals mitten in der Testaufgabe.

## Konfiguration und Grenzen

`js/foundation-checks.js`: SOURCE_CHECKS, PREREQUISITES, CHECKS (mit Zielquest), makeCheck. `js/adventure.js`: Selektions- und Wiederholungslogik. Tests sind weder Challenges noch zusätzliche Übungsserien. Beispielausgaben aller 21 Schlüssel, einschließlich Lösungen, werden in `tests/fundament-beispiele.json` erzeugt.

Ein Ausgangssiegel entfernt die Gebietsblockaden; zusätzlich benötigte Zielgrundlagen können eine verbleibende Vorwissensbarriere rechtfertigen. Alte bereits erworbene Siegel werden bei der Inhaltsmigration beibehalten, nicht als neue Testversuche erfunden.

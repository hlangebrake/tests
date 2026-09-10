# Mathematik Pruefung · Kommaland 7.1

> **Gültig in Kommaland 7.2:** Der folgende fachliche Bestand beziehungsweise die dokumentierten 7.1-Regeln bleiben unverändert. Neu ist die Darstellung: mathematischer Titel, kompakte Steuerung, Hilfen/Kriterien auf Nachfrage. Siehe `UI-DESIGN.md` und `AENDERUNGEN.md`.


> Weitergeltender Bestand aus Version 7; in 7.1 fachlich unverändert. Niveau 2 nutzt die ursprünglichen Kernaufgaben. Die neuen Niveauvarianten und ihre Lösungen stehen in NIVEAU-AUFGABEN.md; Regeln und Grenzen in NIVEAUS.md.


Die nachstehend dokumentierte fachliche/technische Basis wurde aus 6.1 übernommen. Historische Versionsangaben kennzeichnen ihren Ursprung, nicht die aktuelle Appversion. Aktuelle Änderungen und Prüfungen: AENDERUNGEN.md, TESTS.md. Neue Lernformate: UEBUNGSBANK.md und OFFENE-AUFTRAEGE.md.

# Fachliche Prüfung der Fassung 6.0

## Durchgeführte Inhaltsprüfung

Alle 101 aktiven Aufgaben, ihre Aufgabenbedingungen, akzeptierten Antworten, Hinweise, Begründungen, 24 Kernkarten und 21 Kurztestvorlagen wurden gelesen und gegen den jeweiligen Lernzweck geprüft. `AUFGABEN.md` enthält die vollständige sichtbare Fassung mit Lösungen; `BESTANDSANALYSE.md` bewahrt die Vorher-Zuordnung. Die Prüfung ist keine externe Begutachtung oder Pilotstudie.

53 Zahlen-/Zahlengeraden-/Rechentafel-Aufgaben wurden zusätzlich unabhängig aus ihren Operanden mit Python `Decimal` und `Fraction` berechnet. Dazu gehören 58 Einträge in 22 Tafeln, soweit diese Tafeln Zahlenwerte enthalten. `tests/check_arithmetic.py` rechnet diese Fälle neu; `tests/exact-arithmetic-oracles.json` wird mit dem aktiven Antwortprüfer verglichen. Reine Antwortgleichheit mit dem Autorenwert wäre allein kein mathematischer Nachweis.

## Gezielt kontrollierte Punkte

- 12,304 und 103,207: Wert einer Ziffer ≠ Ziffer selbst. 15,060 = 15,06, aber nicht 15,600. Innere Nullstellen dürfen nicht beliebig entfallen.
- 1,406 = 1406/1000 = 703/500. Drei Achtel = 375/1000. Eine frei gewählte Zwischenzahl wird als offenes Intervall exakt geprüft, nicht nur gegen die Beispielantwort 0,7045.
- 4,999 auf Hundertstel wird 5,00. Die kaufmännische Rundung nichtnegativer Zahlen an der Mitte wird benutzt. Grenzen verwenden den genauen Wert, nicht einen gerundeten Freibrief.
- 14,307 + 2,86 = 17,167; 4,78 + 2,65 = 7,43 mit beiden Überträgen. 8,004 wird zum Abziehen von 0,975 wertgleich in 7 E, 9 z, 9 h und 14 t entbündelt; Differenz 7,029.
- 1,24 · 0,36: 744 und 3720 sind Teilprodukte; 4464 / 10000 = 0,4464. 7,056 : 7 = 1,008 mit zwei Nullstellen. 4,368 : 1,2 = 43,68 : 12 = 3,64.
- 1/3 ist nicht genau 0,33; 2/3 ist auf Hundertstel ungefähr 0,67. Das Periodenmodell unterscheidet Rest 0 und wiederkehrenden Rest.
- 1,35 h = 81 min. 0,025 m² = 250 cm². 0,037 m³ = 37 l. Faktor 100/1000 beim Einheitenwechsel wird nicht mit linearen Zentimetern verwechselt.
- Volle Portionen verwenden die größte passende ganze Anzahl; Einkaufseinheiten gegebenenfalls die nächste größere. Beim Sternenfest wird Band **am Stück** in 2,4-m-Bestelleinheiten geliefert. So sind die verlangten 1,25-m-Zuschnitte tatsächlich möglich; es wird nicht aus vier einzelnen 2,4-m-Stücken eine unmögliche Schnittplanung abgeleitet. Das verbleibende 1,3-m-Stück ist zusammenhängend; Schnittverlust wird dort ausdrücklich ausgeschlossen.
- Die Mühlen-Rückwärtsaufgabe ist über Hälften und Viertel mit Produktprobe lösbar. Die Challenge setzt nicht zwingend eine noch ungelehrte schriftliche Dezimaldivision voraus.

## Test- und Modellgrenzen

Geschlossene Argumentkarten haben einen erwarteten begründeten Ablauf; sie bewerten keine frei formulierte alternative Argumentation. Exakte Dezimalantworten nutzen Stellenwert-/Ganzzahlvergleich, keine binäre Gleitkomma-Gleichheit. Modelle verwenden zur Darstellung teilweise gerundete Pixel-/Grafikkoordinaten; mathematische Prüfansprüche stehen in den Aufgabenmodellen. Die 107 Schaubilder wurden im Browser mit insgesamt 304 Wertänderungen und Zurücksetzen geprüft. Dies prüft Funktionsfähigkeit, nicht automatisch jeden möglichen mathematischen Modellwert.

Die 21 Fundamentvorlagen wurden mit je 50 Seeds gegen Antwortprüfer, Schema und sinnvolle Felder geprüft; die begrenzten Zahlenvarianten sind gezielte Grundfälle, keine riesige neue Aufgabensammlung. Der vollständige Browserdurchlauf benutzt bekannte korrekte Antworten, ist daher eine Integrationsprüfung und keine Lernwirksamkeitsstudie.

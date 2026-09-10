# Rechenverfahren · Kommaland 7.1

> **Gültig in Kommaland 7.2:** Der folgende fachliche Bestand beziehungsweise die dokumentierten 7.1-Regeln bleiben unverändert. Neu ist die Darstellung: mathematischer Titel, kompakte Steuerung, Hilfen/Kriterien auf Nachfrage. Siehe `UI-DESIGN.md` und `AENDERUNGEN.md`.


> Weitergeltender Bestand aus Version 7; in 7.1 fachlich unverändert. Niveau 2 nutzt die ursprünglichen Kernaufgaben. Die neuen Niveauvarianten und ihre Lösungen stehen in NIVEAU-AUFGABEN.md; Regeln und Grenzen in NIVEAUS.md.


Die nachstehend dokumentierte fachliche/technische Basis wurde aus 6.1 übernommen. Historische Versionsangaben kennzeichnen ihren Ursprung, nicht die aktuelle Appversion. Aktuelle Änderungen und Prüfungen: AENDERUNGEN.md, TESTS.md. Neue Lernformate: UEBUNGSBANK.md und OFFENE-AUFTRAEGE.md.

# Schriftliche Rechenbeispiele · Kommaland 6.1

## Abdeckung

56 Wissens-/Beispielkarten: alle 53 Karten in Summenmarkt, Differenzklippen, Malmühle, Teilgrotten und Sternenburg sowie drei Zeitkarten. Dazu 88 fest zugeordnete Teilrechnungen. Die 107 bisherigen Wissensmodelle bleiben erhalten, und die Questmenge bleibt bei 101 Aufgaben. Ein Rechenschritt ist kein zusätzliches Aufgabenfeld und muss nicht einzeln bestätigt werden.

In „Wissen anzeigen“ und an Infoschildern verwendet die Tafel dieselben Zahlen wie das Schaubild darüber. „Andere Zahlen“, Menge, Preis, Seitenlänge, Teiler oder Schrittauswahl ändern auch die schriftliche Rechnung. In „Ein Beispiel lesen“ gehören die Zahlen dagegen genau zum festen Textbeispiel. Mehrteilige Beispiele bieten alle zugehörigen Teilrechnungen separat zur Auswahl an. Gleiche mathematische Operationen werden durch dieselben reinen Modellfunktionen erzeugt.

## Fachliche Darstellung

**Addition:** Gemeinsame Dezimalstellen, gleiche Stellen untereinander, ergänzte Endnullen gekennzeichnet. Von rechts nach links. Überträge stehen klein in der Zielspalte, getrennt von Summanden und Ergebnis. Die Übertragszeile ist keine eigenständige Dezimalzahl und trägt daher kein Komma.

**Subtraktion:** Gleiches Stellenraster; einzelne benachbarte Entbündelungen statt eines nicht erklärten Sprungs über Nullstellen. Beispielsweise 6 Einer und 2 Hundertstel → 5 Einer, 10 Zehntel, 2 Hundertstel → 5 Einer, 9 Zehntel, 12 Hundertstel. Alte Werte sind durchgestrichen und ersetzt. Die Wertsumme des Minuenden bleibt bei jedem Tausch erhalten. Erst dann wird spaltenweise subtrahiert. Kein paralleles Auffüllverfahren mit anderen Übertragsregeln.

**Multiplikation:** Natürliche Hilfsrechnung, ausdrücklich begründete gemeinsame Skalierung. Ziffernprodukte, Multiplikationsüberträge, Stellenwert-Endnullen, Teilprodukte und ihre Addition sind sichtbar. Übertragszeilen der Teilprodukte werden getrennt von Additionsüberträgen gehalten. Am Ende wird die Skalierung beider Faktoren rückgängig gemacht; dabei werden bei Bedarf auch führende Dezimalnullen sichtbar. Multiplikation mit 10/100 kann weiterhin kürzer über die Stellenwerttafel bearbeitet werden.

**Division:** Dezimalteiler zunächst durch Multiplikation **beider** Operanden mit derselben Zehnerpotenz ganzzahlig machen. Danach Teildividend, Quotientenziffer, Produkt, Abzug, Rest und Herunterholen. Ergänzte Endnullen sind begründet. Die Kommagrenze im Dividenden und im Quotienten stimmt überein; lokale Restzeilen werden als natürliche Zahlen ohne irreführendes Komma dargestellt. Ein wiederkehrender Rest führt zu einer Periodenmarkierung. Die periodische Zahl wird nicht mit ihrer endlichen Rundung gleichgesetzt. Eine Probe wird mit der passenden Multiplikation erklärt; bei festen Beispielen ist sie teilweise separat anwählbar.

**Sachzusammenhänge:** Gleichartige Größen werden vor der Addition in dieselbe Einheit gebracht. Bei Flächen werden m · m = m² erläutert. Beim Portionieren ist der exakte Quotient nicht automatisch die Anzahl voller Flaschen; Zahl ganzer Portionen und Rest werden ausdrücklich benannt. Stunden/Minuten verwenden Faktor 60, nicht 100. Kein unnötiger Zwang zum schriftlichen Rechnen, wenn eine Kopfrechnung sinnvoller ist.

## Bedienung, Speicher und Hilfen

„Nächster Schritt“, „Zurück“, Schrittregler, „Von vorn“ und „Ganze Rechnung zeigen“. Der gesamte Abschnitt ist eine selbst aufgerufene Hilfe. Er erzeugt keine neue Aufgabe, keine Antwortprüfung und keine zusätzlichen automatischen Reflexionsmomente. Bestehendes Öffnungs-/Dauerlogging von Wissen und Beispielen bleibt bestehen; einzelne Bewegungen des Schrittreglers werden nicht als separate Hilfenutzung erfunden. Die Ansicht wird beim Rücksprung im aktuellen App-Fenster behalten, nicht als Kompetenz gespeichert.

Die Tafel kann intern scrollen; die Aufgabenfußleiste bleibt erreichbar. Bedienelemente haben mindestens 44 px Höhe in den geprüften Layouts. Papier und eigenständige vollständige Rechnungen ergänzen die App; der freiwillige Schrittregler ist keine Leistungsprüfung eines frei verfassten schriftlichen Lösungswegs.

## Code und Robustheit

- `js/written-models.js`: reine, DOM-unabhängige Rechenschritte. Dezimalzeichenketten werden in BigInt-Ganzzahlen und Stellenanzahl zerlegt. Sämtliche Zwischenwerte entstehen ohne binäre Gleitkommarechnung. Division durch null und nicht unterstützte negative Differenzen werden abgewiesen.
- `js/written-examples.js`: überprüfte Zuordnung zu den bestehenden Textbeispielen, einschließlich voneinander unabhängiger Erwartungswerte für Tests.
- `js/written-link.js`: fachbezogene Übertragung der konkreten Schaubild-Einstellungen in Rechnungen. Keine unsichere Interpretation freien Beispieltextes per regulärem Ausdruck.
- `js/written.js`: Darstellung, lokale Ansichtsmerker und Bedienung. Modelländerungen werden explizit als Ereignis weitergegeben. Tabellen aktualisieren sich, ohne den Fokus auf Tasten und Reglern zu verlieren.

Die Modelle sind für die bereitgestellten nichtnegativen Zahlen und Schaubildbereiche ausgelegt, nicht als universeller Taschenrechner. Dezimale Eingaben: bis zu neun Vorkommastellen und sechs Nachkommastellen. Der Divisionslauf hat eine defensive Darstellungsgrenze; ein dort abgebrochener Ausschnitt wird als Näherung gekennzeichnet. Alle angebotenen Beispiele schließen in den Tests exakt oder als explizite Periode ab. Kein neuer Lehrplaninhalt, kein erneuter Lernnachweis.

## Vollständige Zuordnung der festen Beispiele

„Erwartungswert“ bezeichnet den genauen Zahlenwert einschließlich sinnvoll mitgeführter Endnullen. `(6)` in dieser Quell-Dokumentation steht für die periodische 6; die Oberfläche verwendet einen Periodenstrich.

| Gebiet | Karte / ID | Schriftliche Teilrechnungen |
| --- | --- | --- |
| Summenmarkt | Ganze zu Ganzen, Zehntel zu Zehnteln (`add-tenths`) | 2,1 + 1,3 = 3,4 |
| Summenmarkt | Beim Addieren die Stellen ausrichten (`add-align`) | 2,3 + 1,45 = 3,75 |
| Summenmarkt | Zehn kleine Teile werden ein größeres (`add-carry`) | 0,67 + 0,58 = 1,25 |
| Summenmarkt | Dasselbe Bündeln bei Tausendsteln (`add-thousand`) | 0,248 + 0,352 = 0,600 |
| Summenmarkt | Passende Teile zuerst zusammennehmen (`add-group`) | 2,75 + 0,25 = 3,00 · 3 + 1,6 = 4,6 |
| Summenmarkt | Erst eine gemeinsame Einheit wählen (`add-units`) | 0,8 + 0,45 = 1,25 |
| Summenmarkt | Schriftlich addieren: Stellen auf Stellen (`c6-add`) | 2,75 + 0,486 = 3,236 |
| Summenmarkt | Geschickt addieren und ergänzen (`c6-sum-smart`) | 2,38 + 0,62 = 3,00 · 3 + 4,7 = 7,7 |
| Differenzklippen | Eine Menge wegnehmen (`subtract-basic`) | 6,7 − 2,4 = 4,3 |
| Differenzklippen | Ein Zehntel in Hundertstel tauschen (`subtract-exchange`) | 4,6 − 1,28 = 3,32 |
| Differenzklippen | Aus einem Ganzen kleinere Teile machen (`subtract-whole`) | 3,00 − 1,68 = 1,32 |
| Differenzklippen | Bis zu Tausendsteln entbündeln (`subtract-thousand`) | 4 − 1,246 = 2,754 |
| Differenzklippen | Welche Menge fehlt zum Ziel? (`missing`) | 2,50 − 1,85 = 0,65 · 0,15 + 0,50 = 0,65 |
| Differenzklippen | Mit Addition die Probe machen (`subtract-proof`) | 7,2 − 2,65 = 4,55 · 4,55 + 2,65 = 7,20 |
| Differenzklippen | Zwei Entnahmen: beide abziehen (`two-subtractions`) | 2,4 + 1,7 = 4,1 · 9 − 4,1 = 4,9 |
| Differenzklippen | Schriftlich subtrahieren und entbündeln (`c6-sub`) | 6,02 − 0,58 = 5,44 |
| Differenzklippen | Rückwärts denken und mit der Umkehrung prüfen (`c6-inverse`) | 3,075 + 1,85 = 4,925 · 4,925 − 1,85 = 3,075 |
| Malmühle | Malnehmen fasst gleiche Mengen zusammen (`multiply-repeat`) | 4 · 0,2 = 0,8 |
| Malmühle | Ganze Anzahl mal Dezimalmenge (`multiply-integer`) | 0,35 · 6 = 2,10 |
| Malmühle | Mal 0,5 heißt: die Hälfte nehmen (`multiply-half`) | 3,6 · 0,5 = 1,80 |
| Malmühle | Zwei Dezimalfaktoren (`multiply-decimal`) | 1,6 · 1,2 = 1,92 |
| Malmühle | Die Fläche eines Rechtecks (`rectangle`) | 1,6 · 0,5 = 0,80 |
| Malmühle | Dezimalprodukte als Flächen nutzen (`rectangle-decimal`) | 1,4 · 1,3 = 1,82 |
| Malmühle | Mehrfach oder nur ein Anteil? (`multiply-smaller`) | 5 · 0,3 = 1,5 |
| Malmühle | Preis je Meter mal gekaufte Länge (`unit-price`) | 3,20 · 1,5 = 4,800 · 3,20 + 1,60 = 4,80 |
| Malmühle | Zehnmal so viel: jede Stelle wird mehr wert (`times-ten`) | 0,048 · 10 = 0,480 |
| Malmühle | Hundertmal so viel: zwei Stellen (`times-hundred`) | 0,32 · 100 = 32,00 |
| Malmühle | Mal 0,25: ein Viertel (`multiply-quarter`) | 1,2 · 0,25 = 0,300 · 1,2 : 2 = 0,6 · 0,6 : 2 = 0,3 |
| Malmühle | Eine Menge in passende Teile zerlegen (`distribute`) | 4 · 2 = 8 · 4 · 0,3 = 1,2 · 8 + 1,2 = 9,2 |
| Malmühle | Erst ein Gerät, dann beide (`product-then-double`) | 0,8 · 1,5 = 1,20 · 1,2 · 2 = 2,4 |
| Malmühle | Zehnerpotenzen und gleiche Portionen (`c6-scale`) | 0,406 · 100 = 40,600 · 40,6 : 10 = 4,06 |
| Malmühle | Dezimalfaktoren verstehen (`c6-product`) | 1,5 · 0,4 = 0,60 · 0,4 + 0,2 = 0,6 |
| Malmühle | Schriftlich multiplizieren und das Komma begründen (`c6-multiply-written`) | 1,26 · 0,24 = 0,3024 |
| Malmühle | Ein Produkt zerlegen (`c6-distribute`) | 7 · 2 = 14 · 7 · 0,02 = 0,14 · 14 − 0,14 = 13,86 |
| Teilgrotten | Gerecht verteilen (`divide-equal`) | 2,4 : 3 = 0,8 |
| Teilgrotten | Wenn ganze Liter nicht gleich aufgehen (`divide-leftover`) | 5 : 4 = 1,25 · 1,25 · 4 = 5,00 |
| Teilgrotten | Portion mal Anzahl: die Probe (`divide-proof`) | 5,4 : 6 = 0,9 · 0,9 · 6 = 5,4 |
| Teilgrotten | Wie viele Flaschen werden voll? (`portion-tenths`) | 1,8 : 0,3 = 6 |
| Teilgrotten | Kleinere Portionen: beide in Hundertsteln (`portion-hundred`) | 3,5 : 0,25 = 14 · 0,25 · 14 = 3,50 |
| Teilgrotten | Kleine Portionen ergeben mehr Stücke (`divide-small`) | 3 : 0,5 = 6 |
| Teilgrotten | Durch 10: jede Stelle wird kleiner (`divide-ten`) | 3,7 : 10 = 0,37 |
| Teilgrotten | Durch 100: zweimal durch 10 (`divide-hundred`) | 4,5 : 100 = 0,045 |
| Teilgrotten | Beide Zahlen gleich verändern (`divide-scale`) | 2,8 : 0,07 = 40 |
| Teilgrotten | Erst den Bedarf, dann den Fehlbetrag (`need-minus-stock`) | 6 · 0,4 = 2,4 · 2,4 − 1,5 = 0,9 |
| Teilgrotten | Schriftlich dividieren (`c6-divide-written`) | 12,48 : 4 = 3,12 · 3,12 · 4 = 12,48 |
| Teilgrotten | Durch eine Dezimalzahl teilen (`c6-divisor`) | 5,46 : 0,6 = 9,1 · 9,1 · 0,6 = 5,46 |
| Teilgrotten | Manche Dezimalbrüche enden nicht (`c6-periodic`) | 2 : 3 = 0,(6) |
| Sternenburg | Was wird in der Geschichte gesucht? (`model`) | 5 · 0,2 = 1,0 |
| Sternenburg | Ein Rabatt für alles zusammen (`one-discount`) | 1,80 · 4 = 7,20 · 7,20 − 0,50 = 6,70 |
| Sternenburg | Klammern, dann Punkt, dann Strich (`operations`) | 2 · 1,8 = 3,6 · 3,6 + 0,7 = 4,3 |
| Sternenburg | Mit dem Rest weiterplanen (`plan-leftover`) | 7 − 4,2 = 2,8 · 2,8 : 0,7 = 4 · 0,7 · 4 = 2,8 |
| Sternenburg | Erst die Beziehung, dann die Rechnung (`c6-model`) | 2,85 · 6 = 17,10 · 17,10 + 4,20 = 21,30 |
| Sternenburg | Rechenreihenfolge und Ergebnis prüfen (`c6-operations`) | 9,6 − 1,2 = 8,4 · 8,4 : 4 = 2,1 · 2,1 + 0,35 = 2,45 |
| Maßhafen | Eine Stunde ist nicht hundert Minuten (`time-half`) | 2 · 60 = 120 · 0,5 · 60 = 30,0 · 120 + 30 = 150 |
| Maßhafen | Viertelstunden wiedererkennen (`time-quarter`) | 60 : 4 = 15 |
| Maßhafen | Dezimalstunden sind keine Minutenstellen (`c6-time`) | 0,35 · 60 = 21,00 · 60 + 21 = 81 |

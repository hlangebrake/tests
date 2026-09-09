# Kommaland 4.0 · fachliche Prüfung der Darstellungen

## Umfang

Die 83 Wissenskarten, ihre Beispiele und die interaktiven Schaubilder bleiben gegenüber Version 3 fachlich erhalten. Neu durchgesehen wurden die Aufgabenvarianten für alle 83 Gedanken, die 48 Meisteraufgaben, die geänderten Antwortformate und die Anforderungen sämtlicher 22 Wegprüfungsrichtungen. Die Questfolge umfasst nun 393 Aufgaben. Der vollständige Katalog und die initialen Wegtests stehen in AUFGABEN.md und PRUEFUNGEN.md.

Ein automatisierter Durchlauf mit den hinterlegten Lösungen ist kein unabhängiger Beweis für alle Antwortschlüssel. Die Auswertung unterscheidet deshalb Bedien- und Strukturtests von zusätzlich unabhängig berechneten Referenzfällen.

Die Modelle sind in `js/visual-models.js` und `js/visuals.js` getrennt von Spielstand und Aufgabenauswertung implementiert. Jede Wissens-ID besitzt genau eine Konfiguration; unbekannte IDs lösen einen Fehler aus statt eine fachlich unpassende Standardgrafik zu zeigen. Alle Schaubilder sind eigene SVG-/HTML-Grafiken und werden zur Laufzeit gezeichnet.

## Konkrete Berichtigungen

**1. Ein Ganzes und gleich große Teile.** Ein Bruch bezieht sich immer auf das beschriftete ganze Band oder das unveränderte Quadrat. Beim Wechsel von Zehnteln zu Hundertsteln ändert sich das Raster, nicht die gefärbte Fläche. Ein Viertel ist ein geometrisch zusammenhängender 5-mal-5-Block mit 25 von 100 Kästchen. Das alte zeilenweise Füllen von 25 Kästchen war flächengleich, ließ die vier Viertel aber nicht erkennen.

**2. Bruchschreibweise.** Zähler und Nenner stehen übereinander. In der Erinnerungsseite kann der Nenner 2, 4, 5 oder 10 gewählt werden. Alle Teilflächen bleiben gleich groß. Diese Seite verlangt noch keine allgemeine Dezimalumwandlung. Beim Nennerwechsel bleibt die Anzahl markierter Teile soweit möglich bestehen; wird der Nenner kleiner als der Zähler, wird auf ein Ganzes begrenzt. Es werden hier nur Anteile zwischen 0 und 1 untersucht.

**3. Tausendstel.** Ein angefangener Hundertstelteil erscheint im Überblick anteilig gefärbt. Die Lupe zeigt ausdrücklich nur diesen vergrößerten Teil, kein zusätzliches Ganzes. Zehn Tausendstel sind ein Hundertstel; 1000 Tausendstel sind ein Ganzes. Grenzfälle 0, 0,999 und 1,000 werden getrennt berücksichtigt. In der Einführung ist der Zahlenraum bewusst auf das erste Hundertstel begrenzt.

**4. Stellenwerte.** Ziffer, Stelle und Zahlenwert werden gemeinsam, aber unterscheidbar dargestellt. Bei Multiplikation/Division mit Zehnerpotenzen bleibt die Kommastelle fest; Ziffern wechseln Spalten. Die Tafeln enthalten keine unvorbereiteten Zehn- oder Hunderttausendstelspalten. Kleine runde Plättchen im Rechenmodell sind ausdrücklich Zählzeichen: Ihr Wert hängt von der Spaltenüberschrift ab; sie behaupten keine flächenproportionale Größe.

**5. Vergleich und Runden.** Zwei Zahlen verwenden dieselbe feste Skala. Nachkommastellenlänge ersetzt keinen Größenvergleich. Runden arbeitet mit ganzzahligen Tausendstel-/Hundertsteleinheiten; Halbwerte werden nicht durch binäre Gleitkomma-Rundungsfehler entschieden. Die Ausgangszahl bleibt neben dem mit ≈ gekennzeichneten Rundungsergebnis sichtbar. Die hier verwendete Aufrundung bei exakter Mitte gilt für die untersuchten nichtnegativen Zahlen.

**6. Größen.** Meter und Zentimeter, Kilogramm und Gramm sowie Liter und Milliliter bezeichnen dieselbe Größe. Zwei Beschriftungen teilen dieselbe geometrische Skala. Ein Messbehälter ist geradwandig; Füllhöhe und Menge sind deshalb im Modell proportional. Geld wird als ganze Euro plus übrige Cent dargestellt. Zeit ist ein Dauermodell mit 60 Minuten je Kreis, keine Dezimaluhr. 0,25 h = 15 min; 0,5 h = 30 min. Die veränderbaren Minutenanteile sind Viertelstunden, damit keine unendlichen Dezimalentwicklungen unbemerkt gerundet werden.

**7. Flächen und Rauminhalte.** Flächenmodelle tragen Längeneinheiten an beiden Seiten und Flächeneinheiten am Ergebnis: `1,6 m · 0,5 m = 0,8 m²`, nicht `1,6 · 0,5 = 0,8 m²`. Ein kleines Flächenkästchen ist `0,1 m · 0,1 m = 0,01 m²`. Die gesamte graue Zeichenfläche bleibt 2 m × 2 m; ein Einheitsquadrat ist durch stärkere Rasterlinien erkennbar. Der Rauminhalt entsteht aus zehn Schichten mit je 100 Würfeln von 1 dm Kantenlänge. Die auseinandergezogene Ansicht wird benannt, ebenso die Draufsicht einer einzelnen Schicht.

**8. Addition und Subtraktion.** Beim Bündeln werden zehn kleine Stellenwerte gegen einen größeren getauscht. Beim Entbündeln bleibt die gesamte Anfangsmenge bis zum ausdrücklich ausgelösten Wegnehmen erhalten. Ein Beispiel über Nullstellen verläuft `3 Einer → 2 Einer + 10 Zehntel → 2 Einer + 9 Zehntel + 10 Hundertstel`. Erst danach werden `1 Einer + 6 Zehntel + 8 Hundertstel` entfernt. Die Zwischenschritte sind rechnerisch geprüft, auch für mehrere Nullstellen hintereinander.

**9. Multiplikation.** Natürliche Faktoren werden als gleiche Gruppen gezeigt, Faktoren zwischen 0 und 1 als Anteile, zwei Dezimalfaktoren als Rechteckprodukt. Die graphische Kästchenzahl stimmt für alle 400 einstellbaren Rechtecke (0,1 bis 2 in beiden Richtungen) mit dem Produkt überein. Das Verdopplungsbeispiel zeigt jetzt tatsächlich zwei gleiche Pumpen; Einheiten `l/min · min = l` führen zu einer Menge und anschließend zur Verdopplung.

**10. Division.** Gerechtes Verteilen sucht die Menge pro Person. Portionieren sucht dagegen eine Anzahl. Die Gesamtmenge bleibt jeweils erhalten. Bei nicht passender Portionsgröße werden nur ganze volle Portionen gezählt und der Rest separat angezeigt, etwa vier Portionen und 0,5 l Rest. Eine Einheit wird nicht unzulässig in die Ergebnisanzahl übernommen. Beim gleichsinnigen Verändern werden Dividend und Divisor mit demselben positiven Faktor multipliziert; Division durch null ist ausgeschlossen.

**11. Sachmodelle.** Bedarf, Vorrat, Fehlmenge und Überschuss werden getrennt bezeichnet. Ein ausreichender Vorrat erzeugt keine negative Fehlmenge. Aus Restmaterial entstehen nur ganze Schleifen, keine aufgerundeten Teil-Schleifen. Ein Gesamtrabatt wird einmal abgezogen. Ergänzende Beispiele mit gemischter dimensionsloser/benannter Gleichung wurden auf vollständige Einheiten oder eine klar als Maßzahlenrechnung erkennbare Schreibweise umgestellt.

## Zusätzliche Durchsicht in Version 4

**Aufgabenvariation:** Jede Wissens-ID hat ein nahes Aufgabenmodell, einen Transferfall und eine Prüfungsvariante. Für 83 IDs, drei Modi und 30 Startwerte werden 7470 erzeugte Aufgaben auf prüfbare Lösungen, gültige Auswahlindizes, eindeutige Antwortoptionen und zulässige Zahlenräume getestet. Das ist eine Strukturprüfung, keine vollständige unabhängige Herleitung aller 7470 Lösungen.

**Keine Übungskopie im Ersttest:** Alle initialen Aufgaben der 22 gerichteten Wege wurden auf Identität mit regulären Questaufgaben geprüft. Zahlenbereiche der Prüfungen sind getrennt; feste Konzepte wie ein Viertel, Bedeutung des Nenners oder ein Halb erhalten andere Fragen beziehungsweise Darstellungen. Bei späteren Wiederholungen bleibt der endliche Variantenraum zu beachten.

**Grenzfälle:** Höchstens schließt Gleichheit ein. Bei vollen Bechern wird abgerundet, bei zusätzlich zu öffnenden ganzen Flaschen aufgerundet. Exakt ausreichende Farbe lässt 0 m² ungestrichen. Gerundete Einzelmengen können die zulässige Traglast scheinbar einhalten, obwohl die exakte Summe darüber liegt. Aussagen zu Faktoren kleiner als 1 benennen eine positive Ausgangszahl.

**Umkehren und Einheiten:** Rückwärtsrechnen fragt beispielsweise nach dem Preis vor dem Rabatt, der Anfangsmenge oder der unskalierten Ration. Die fehlende normale Ration bei 0,18 kg als 0,4-facher Menge ist 0,45 kg. Die Division einer Futtermenge auf Tiere ergibt Kilogramm pro Tier, keine Tieranzahl. Flächen und Rauminhalte verwenden andere Umrechnungsfaktoren als Längen.

**Begründung und Fehlersuche:** Erstfehleraufgaben trennen korrekte Anfangsschritte vom ersten unzulässigen Übergang. Beim Entbündeln von 5,02 werden aus 5 Einern, 0 Zehnteln und 2 Hundertsteln zunächst 4 Einer, 10 Zehntel und 2 Hundertstel, danach 4 Einer, 9 Zehntel und 12 Hundertstel. Die Behauptung mit weiterhin 10 Zehnteln ist falsch. Argumentketten nennen Reihenfolge und benötigte Kartenanzahl ausdrücklich; freie alternative Texte werden nicht automatisch ausgewertet.

**Zeichnungen:** Bei Anteil-Markierungen ist das ganze Raster eindeutig ein Ganzes. Jede flächengleiche Markierung mit richtiger Kästchenzahl wird angenommen; kein bestimmtes dekoratives Muster ist als Lösung vorgeschrieben. Bei Zahlengeraden bleiben Teilstriche gleichabständig und Endpunkte beschriftet. Zielwerte liegen auf dem einstellbaren Raster, werden aber vor richtiger Lernantwort nicht numerisch am Marker angezeigt; im Test gibt es diese Lösungsanzeige überhaupt nicht.

**Zusätzliche unabhängige Referenzrechnungen:** 18 Rechenfälle der Meisterquests werden im Test aus den Sachangaben neu berechnet, darunter 10 − 3,875 − 2,68 = 3,445; 1,25 · 0,48 = 0,6; 1,575 : 7 = 0,225; elf volle Becher aus 4,1 l bei 0,35 l und drei zusätzlich nötige 0,5-l-Flaschen bei 1,45 l Fehlmenge. Die übrigen Schlüssel sind redaktionell durchgesehen und werden strukturell geprüft, nicht als unabhängig formal bewiesen bezeichnet.

## Rechenweise und Testgrenzen

Veränderbare Größen sind ganze Anzahlen einer festen kleinsten Einheit. Zehntel, Hundertstel und Tausendstel werden nicht durch wiederholtes Addieren binärer Näherungen erzeugt. Divisionen sind auf geeignete exakte Fälle beschränkt oder weisen ihren Rest separat aus. Die Oberfläche formatiert Ergebnisse mit deutschem Dezimalkomma.

70 Node-Tests prüfen unter anderem 83 eindeutige Zuordnungen, Anfangs-/Randzustände der Regler, Zähler-/Nennerwechsel, Flächengleichheit, Kästchenprodukte, wertgleiche Tauschschritte, Rundung, Einheiten und Mengenerhaltung. Browser-Tests ergänzen echte DOM-/Pointer-Eingaben, alle Wissensseiten und einen vollständigen Questdurchlauf. Details in `TESTS.md`.

Es handelt sich um eine redaktionelle fachliche Durchsicht und automatisierte Konsistenzprüfung, nicht um ein unabhängiges fachdidaktisches Gutachten. Es gibt keine Garantie, dass jede denkbare Fehlvorstellung individuell erkannt wird. Vor Unterrichtseinsatz bleiben eine kurze fachliche Sichtung durch die Lehrkraft und ein Test auf den tatsächlichen iPads sinnvoll.

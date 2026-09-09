# Kommaland 3.0 · fachliche Prüfung der Darstellungen

## Umfang

Geprüft und überarbeitet wurden die 83 Wissenskarten, ihre dreischrittigen Beispiele und die neuen interaktiven Schaubilder. Die vorhandenen 122 Aufgaben und Antwortschlüssel wurden nicht umgestellt. Ihre formale Konsistenz und Erreichbarkeit werden weiterhin getestet; die Aufgaben stehen unverändert zur fachlichen Durchsicht im Katalog. Ein automatisierter Durchlauf mit hinterlegten Lösungen ist kein unabhängiger Beweis für sämtliche Antwortschlüssel.

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

## Rechenweise und Testgrenzen

Veränderbare Größen sind ganze Anzahlen einer festen kleinsten Einheit. Zehntel, Hundertstel und Tausendstel werden nicht durch wiederholtes Addieren binärer Näherungen erzeugt. Divisionen sind auf geeignete exakte Fälle beschränkt oder weisen ihren Rest separat aus. Die Oberfläche formatiert Ergebnisse mit deutschem Dezimalkomma.

50 Node-Tests prüfen unter anderem 83 eindeutige Zuordnungen, Anfangs-/Randzustände der Regler, Zähler-/Nennerwechsel, Flächengleichheit, Kästchenprodukte, wertgleiche Tauschschritte, Rundung, Einheiten und Mengenerhaltung. Browser-Tests ergänzen echte DOM-/Pointer-Eingaben, alle Wissensseiten und einen vollständigen Questdurchlauf. Details in `TESTS.md`.

Es handelt sich um eine redaktionelle fachliche Durchsicht und automatisierte Konsistenzprüfung, nicht um ein unabhängiges fachdidaktisches Gutachten. Es gibt keine Garantie, dass jede denkbare Fehlvorstellung individuell erkannt wird. Vor Unterrichtseinsatz bleiben eine kurze fachliche Sichtung durch die Lehrkraft und ein Test auf den tatsächlichen iPads sinnvoll.

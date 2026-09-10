# Schaubilder · Kommaland 7.1

> **Gültig in Kommaland 7.2:** Der folgende fachliche Bestand beziehungsweise die dokumentierten 7.1-Regeln bleiben unverändert. Neu ist die Darstellung: mathematischer Titel, kompakte Steuerung, Hilfen/Kriterien auf Nachfrage. Siehe `UI-DESIGN.md` und `AENDERUNGEN.md`.


> Weitergeltender Bestand aus Version 7; in 7.1 fachlich unverändert. Niveau 2 nutzt die ursprünglichen Kernaufgaben. Die neuen Niveauvarianten und ihre Lösungen stehen in NIVEAU-AUFGABEN.md; Regeln und Grenzen in NIVEAUS.md.


Die nachstehend dokumentierte fachliche/technische Basis wurde aus 6.1 übernommen. Historische Versionsangaben kennzeichnen ihren Ursprung, nicht die aktuelle Appversion. Aktuelle Änderungen und Prüfungen: AENDERUNGEN.md, TESTS.md. Neue Lernformate: UEBUNGSBANK.md und OFFENE-AUFTRAEGE.md.

# Wissensseiten und interaktive Schaubilder · 6.0

24 neue, zusammenhängende Kernkarten passen zur gestrafften Folge. 83 ältere kleinschrittige Modelle bleiben freiwillig als Auffrischung erreichbar. Es sind also 107 verfügbare Wissenskarten, nicht 107 automatische Unterbrechungen. Im vollständigen frischen Durchlauf wurden 24 Kernkarten automatisch eingeführt.

Ein bereits gezeigter Gedanke wird innerhalb der Quest nicht nochmals automatisch eingeführt. In späteren Quests wird bekanntes Wissen mit `introduce:false` bewusst nur auf Nachfrage verwendet. Die gespeicherten „gesehen“-Informationen dürfen kein fachliches Bestehen vortäuschen.

## `c6-place` · Dezimalzahlen: ein Stellenwertsystem

Zwischen 2 und 3 liegt zum Beispiel 2,5: zwei Ganze und fünf Zehntel. Fünf von zehn gleich großen Teilen sind eine Hälfte. Jede Stelle nach rechts ist ein Zehntel so viel wert: Einer | Zehntel | Hundertstel | Tausendstel. So bedeutet 12,304: 1 Zehner, 2 Einer, 3 Zehntel, 0 Hundertstel und 4 Tausendstel. Eine Null hält eine Stelle frei.

**Schaubild:** place · Wähle eine Stelle und ändere ihre Ziffer. Vergleiche die Zahl mit ihrem Stellenwert.

**Paralleles Beispiel:** Zerlege 4,206 in Stellenwerte.

1. Die 4 steht für vier Einer.
2. Die 2 bedeutet zwei Zehntel; es gibt keine Hundertstel.
3. 4,206 = 4 + 0,2 + 0,006.

**Freiwillige Grundgedanken:** between, tenths, hundred-grid, thousand

## `c6-zeros` · Welche Nullen darf man weglassen?

Am Ende der Nachkommastellen darfst du Nullen ergänzen oder weglassen: 3,5 = 3,50 = 3,500. Die Stelle der anderen Ziffern bleibt gleich. Eine Null innerhalb der Zahl darfst du nicht einfach streichen: 3,05 und 3,5 sind verschieden.

**Schaubild:** equivalence · Teile denselben Anteil feiner ein. Die gefärbte Fläche bleibt gleich.

**Paralleles Beispiel:** Prüfe: Sind 8,040 und 8,04 gleich?

1. 8,040 enthält vier Hundertstel und null Tausendstel.
2. Die letzte Null trägt nichts hinzu.
3. 8,040 = 8,04; dagegen ist 8,4 eine andere Zahl.

**Freiwillige Grundgedanken:** zero-hundred, equal-zeros

## `c6-fractions` · Bruch und Dezimalzahl verbinden

Ein Bruch beschreibt gleich große Teile: Der Nenner nennt die Teilung des Ganzen, der Zähler die genommenen Teile. Bei 7/100 sind es sieben Hundertstel, also 0,07. Erweitere oder kürze Zähler und Nenner mit derselben Zahl, um Zehntel, Hundertstel oder Tausendstel zu erhalten. Der Wert bleibt dabei gleich.

**Schaubild:** quarters · Tippe Viertel an. Jedes Viertel besteht aus einem 5-mal-5-Block.

**Paralleles Beispiel:** Schreibe 9/25 als Dezimalzahl.

1. Erweitere Zähler und Nenner mit 4.
2. 9/25 = 36/100.
3. 36 Hundertstel sind 0,36.

**Freiwillige Grundgedanken:** fraction-meaning, fraction-tenths, fraction-quarter

## `c6-compare` · Ordnen mit Stellenwerten

Vergleiche zuerst die ganzen Zahlen, danach Zehntel, Hundertstel und so weiter. Die erste unterschiedliche Stelle entscheidet. Angehängte Nullen können helfen: 0,409 < 0,490. Mehr Nachkommastellen bedeuten nicht automatisch einen größeren Wert.

**Schaubild:** compare · Vergleiche auch 0,6 mit 0,58. Mehr Nachkommastellen bedeuten nicht mehr Wert.

**Paralleles Beispiel:** Vergleiche 6,08 und 6,079.

1. Schreibe 6,08 als 6,080.
2. Einer und Zehntel sind gleich; bei den Hundertsteln gilt 8 > 7.
3. Also ist 6,08 > 6,079.

**Freiwillige Grundgedanken:** compare-tenths, compare-hundred

## `c6-line` · Unbeschriftete Teilstriche lesen

Auf einer Zahlengeraden entsprechen gleiche Abstände gleichen Zahlunterschieden. Bestimme den Abstand der beschrifteten Zahlen und zähle die Zwischenräume, nicht die Striche. Teile dann den Zahlunterschied durch die Anzahl der Zwischenräume.

**Schaubild:** line · Ziehe den Marker. Achte auf die Schrittweite der Skala.

**Paralleles Beispiel:** Zwischen 1,2 und 1,3 liegen zehn gleich lange Abschnitte. Welcher Wert liegt drei Abschnitte nach 1,2?

1. Der ganze Abstand beträgt 0,1.
2. Jeder Abschnitt steht für 0,01.
3. Drei Abschnitte führen zu 1,23.

**Freiwillige Grundgedanken:** line-tenths, line-fives

## `c6-round` · Runden: Nachbarn und Genauigkeit

Wähle zuerst die gewünschte Stelle. Vergleiche die Zahl mit den beiden benachbarten Rundungswerten. Ab der Mitte wird bei nichtnegativen Zahlen aufgerundet. Die nächste Ziffer entscheidet: 0 bis 4 ab-, 5 bis 9 aufrunden. Ein Übertrag kann auch mehrere Neunen betreffen.

**Schaubild:** round · Ziehe die Zahl zwischen die Nachbarwerte. Genau in der Mitte wird hier aufgerundet.

**Paralleles Beispiel:** Runde 6,995 auf Hundertstel.

1. Die Nachbarn sind 6,99 und 7,00.
2. 6,995 liegt genau in der Mitte.
3. Auf Hundertstel gerundet: 7,00.

**Freiwillige Grundgedanken:** round-near, round-carry

## `c6-estimate` · Überschlagen und Grenzen beachten

Ein Überschlag ist eine schnelle Näherung. Runde die Eingaben passend zur Frage und rechne damit. Zum Prüfen eines Ergebnisses reicht oft die Größenordnung. Liegt ein Budget oder eine Traglast nahe am Ergebnis, brauchst du eine genaue Rechnung: Ein gerundeter Wert entscheidet keine knappe Grenze.

**Schaubild:** estimate · Verändere die Angaben. Vergleiche genaue Summe und Überschlag auf ganze Zahlen.

**Paralleles Beispiel:** Reichen 10 € für 4,86 € und 5,27 €?

1. Der Überschlag 5 + 5 ergibt ungefähr 10 €.
2. Das ist zu nah an der Grenze für eine sichere Entscheidung.
3. Genau sind es 10,13 €: 10 € reichen nicht.

**Freiwillige Grundgedanken:** estimate, limits

## `c6-units` · Gleiche Größe, andere Einheit

Die Größe bleibt gleich, nur Maßzahl und Einheit ändern sich. 1 m = 100 cm, 1 kg = 1000 g, 1 l = 1000 ml, 1 € = 100 ct. In der kleineren Einheit ist die Maßzahl größer. Schreibe bei Vergleichen und Rechnungen zuerst passende gemeinsame Einheiten.

**Schaubild:** units · Verändere die Menge. kg und g beschreiben immer dieselbe Größe.

**Paralleles Beispiel:** Wandle 2,065 kg in Gramm um.

1. 1 kg sind 1000 g.
2. 2 kg sind 2000 g, 0,065 kg sind 65 g.
3. 2,065 kg = 2065 g.

**Freiwillige Grundgedanken:** metres-cm, kg-grams, ml-litres, money

## `c6-time` · Dezimalstunden sind keine Minutenstellen

Eine Stunde hat 60 Minuten, nicht 100. Die Nachkommastellen einer Dezimalstunde sind Bruchteile einer Stunde: 0,1 h = 6 min und 0,5 h = 30 min. Eine Uhrzeit wie 9:30 ist eine andere Schreibweise als eine Zeitdauer von 9,30 h.

**Schaubild:** time · Ein Viertelkreis sind 15 Minuten – nicht 25 Minuten.

**Paralleles Beispiel:** Wie viele Minuten sind 1,35 h?

1. Eine ganze Stunde sind 60 Minuten.
2. 0,35 · 60 min = 21 min.
3. Zusammen sind es 81 min.

**Freiwillige Grundgedanken:** time-half, time-quarter

## `c6-area` · Flächeneinheiten: in zwei Richtungen

Eine Fläche wird in Quadraten gemessen. Ein Quadrat von 1 m × 1 m enthält 100 × 100 Quadrate von 1 cm × 1 cm. Deshalb ist 1 m² = 10 000 cm². Zwischen benachbarten Einheiten wie m² und dm² liegt der Faktor 100, nicht 10.

**Schaubild:** square · Färbe Reihen: 10 dm in der Länge und 10 dm in der Breite ergeben 100 dm².

**Paralleles Beispiel:** Wandle 0,32 m² in dm² um.

1. 1 m = 10 dm in jeder der beiden Richtungen.
2. Daher 1 m² = 100 dm².
3. 0,32 m² = 32 dm².

**Freiwillige Grundgedanken:** square-units

## `c6-volume` · Raumeinheiten: in drei Richtungen

Ein Würfel von 1 dm Kantenlänge enthält 10 · 10 · 10 = 1000 Würfel von 1 cm Kantenlänge. Deshalb 1 dm³ = 1000 cm³ = 1 l. Ebenso gilt 1 m³ = 1000 dm³ = 1000 l. Unterscheide Volumen von Länge und Fläche.

**Schaubild:** cube · Baue den Würfel aus Schichten. Jede Schicht hat 10 · 10 kleine Würfel.

**Paralleles Beispiel:** Wie viele Liter sind 0,045 m³?

1. 1 m³ fasst 1000 l.
2. 0,045 · 1000 = 45.
3. 0,045 m³ = 45 l.

**Freiwillige Grundgedanken:** cube-units, cube-litre

## `c6-add` · Schriftlich addieren: Stellen auf Stellen

Schreibe Einer unter Einer, Zehntel unter Zehntel und so weiter; die Kommas stehen untereinander. Ergänze rechts nötigenfalls Nullen. Addiere von rechts nach links. Zehn Einheiten einer Stelle werden zu einer Einheit der nächstgrößeren Stelle gebündelt.

**Schaubild:** arithmetic · Lege gleiche Stellen zusammen und bündele in einzelnen Schritten.

**Paralleles Beispiel:** Berechne 2,75 + 0,486.

1. Richte die Zahlen als 2,750 und 0,486 aus.
2. Tausendstel: 0 + 6 = 6. Hundertstel: 5 + 8 = 13; schreibe 3, übertrage 1.
3. Zehntel: 7 + 4 + 1 = 12; Einer: 2 + 0 + 1 = 3. Ergebnis: 3,236.

**Freiwillige Grundgedanken:** add-align, add-carry

## `c6-sum-smart` · Geschickt addieren und ergänzen

Bei einer Summe darfst du Summanden vertauschen und anders zusammenfassen. Suche passende Paare, zum Beispiel 1,75 + 0,25 = 2. Eine fehlende Zahl erhältst du durch Ergänzen oder die Umkehraufgabe. Bei einer Differenz darfst du die Zahlen nicht beliebig vertauschen.

**Schaubild:** group · Ergänze den ersten Teil zu 3 Ganzen. Beide Rechenwege ergeben dieselbe Summe.

**Paralleles Beispiel:** Berechne 2,38 + 4,7 + 0,62.

1. Fasse zuerst 2,38 und 0,62 zusammen.
2. Das ergibt 3; der Summand 4,7 bleibt erhalten.
3. 3 + 4,7 = 7,7.

**Freiwillige Grundgedanken:** add-group

## `c6-sub` · Schriftlich subtrahieren und entbündeln

Richte gleiche Stellen untereinander aus. Reicht eine Stelle beim Abziehen nicht, tausche eine Einheit der nächstgrößeren Stelle in zehn kleinere Einheiten. Über Nullen hinweg sind mehrere solche Tausche nötig. Hier verwenden wir die Entbündelungsmethode; andere korrekt ausgeführte Schulverfahren sind ebenfalls möglich.

**Schaubild:** arithmetic · Tausche große Stellenwerte in kleine, bis du die Menge wegnehmen kannst.

**Paralleles Beispiel:** Berechne 6,02 − 0,58 durch Entbündeln.

1. 6 Einer, 0 Zehntel, 2 Hundertstel werden zu 5 Einern, 10 Zehnteln, 2 Hundertsteln.
2. Tausche noch ein Zehntel: 5 Einer, 9 Zehntel, 12 Hundertstel.
3. 12 − 8 = 4; 9 − 5 = 4; 5 − 0 = 5. Ergebnis 5,44.

**Freiwillige Grundgedanken:** subtract-exchange, subtract-whole

## `c6-inverse` · Rückwärts denken und mit der Umkehrung prüfen

Unterscheide Anfang, Änderung und Rest. Ist der Anfang unbekannt, rechne vom Rest zurück. Eine Subtraktion prüfst du durch Addition: Rest + abgezogene Menge muss die Anfangsmenge ergeben. Eine passende Gleichung kann die Beziehung kurz festhalten.

**Schaubild:** difference · Verschiebe den vorhandenen Teil. Die Lücke ergänzt immer bis zum festen Ziel.

**Paralleles Beispiel:** Nach dem Verbrauch von 1,85 l bleiben 3,075 l. Wie viel war vorher da?

1. Gesucht ist der Anfang x: x − 1,85 = 3,075.
2. Rechne zurück: 3,075 + 1,85 = 4,925.
3. Probe: 4,925 − 1,85 = 3,075.

**Freiwillige Grundgedanken:** missing, subtract-proof

## `c6-scale` · Zehnerpotenzen und gleiche Portionen

Mehrere gleich große Mengen kannst du multiplizieren: vier Portionen von 0,35 kg sind 4 · 0,35 kg. Beim Multiplizieren mit 10, 100 oder 1000 wird jede Ziffer entsprechend mehr wert; beim Dividieren entsprechend weniger. Die Stellen ändern sich, nicht die Reihenfolge der Ziffern.

**Schaubild:** powers · Verschiebe die Ziffern um ganze Stellen. Das Komma bleibt an seinem Platz.

**Paralleles Beispiel:** Berechne 0,406 · 100 und 40,6 : 10.

1. Hundertstel werden beim Multiplizieren mit 100 zu Einern.
2. 0,406 · 100 = 40,6.
3. Beim Dividieren durch 10 wird daraus 4,06.

**Freiwillige Grundgedanken:** multiply-repeat, times-ten, divide-hundred

## `c6-product` · Dezimalfaktoren verstehen

Eine natürliche Zahl als Faktor kann die Zahl gleicher Gruppen beschreiben. Ein Faktor zwischen 0 und 1 nimmt nur einen Teil: 0,4 · 3 bedeutet vier Zehntel von 3. Bei positiven Faktoren kleiner als 1 wird der andere Faktor dadurch verkleinert. Ein Rechteckmodell erklärt Produkte; bei Längen mal Längen entsteht eine Fläche.

**Schaubild:** area · Ziehe die Ecke des Rechtecks. Die Seiten sind in Zehnteln, die kleinen Flächen in Hundertsteln eingeteilt.

**Paralleles Beispiel:** Eine Fläche ist 1,5 m lang und 0,4 m breit.

1. Zerlege die Länge: 1 m und 0,5 m.
2. Die Teilflächen sind 0,4 m² und 0,2 m².
3. Zusammen: 1,5 m · 0,4 m = 0,6 m².

**Freiwillige Grundgedanken:** multiply-half, rectangle

## `c6-multiply-written` · Schriftlich multiplizieren und das Komma begründen

Multipliziere zunächst wie mit natürlichen Zahlen und notiere die Teilprodukte stellenrichtig. Das Ergebnis erhält insgesamt so viele Nachkommastellen wie beide Faktoren zusammen. Begründung: Wer etwa beide Faktoren mit 100 vergrößert, vergrößert das Produkt mit 10 000. Rückgängig wird das durch Division durch 10 000.

**Schaubild:** area · Ziehe die Ecke des Rechtecks. Die Seiten sind in Zehnteln, die kleinen Flächen in Hundertsteln eingeteilt.

**Paralleles Beispiel:** Berechne 1,26 · 0,24.

1. 126 · 4 = 504 und 126 · 20 = 2520; addiert: 3024.
2. Beide Faktoren wurden je mit 100 vergrößert.
3. 3024 : 10 000 = 0,3024. Ein Überschlag 1,3 · 0,2 ≈ 0,26 passt zur Größenordnung.

**Freiwillige Grundgedanken:** multiply-decimal

## `c6-distribute` · Ein Produkt zerlegen

Ein Faktor darf als Summe oder Differenz zerlegt werden: a · (b + c) = a · b + a · c. Der andere Faktor gehört zu beiden Teilen. Das kann einfacher sein als schriftliches Rechnen. Bei positiven Zahlen verdoppelt sich das Produkt, wenn genau ein Faktor verdoppelt wird.

**Schaubild:** distribute · Zerlege jeden Beutel in Ganze und Zehntel. Beide Teile müssen vervielfacht werden.

**Paralleles Beispiel:** Berechne 7 · 1,98 geschickt.

1. Schreibe 1,98 als 2 − 0,02.
2. 7 · 2 − 7 · 0,02 = 14 − 0,14.
3. Ergebnis: 13,86.

**Freiwillige Grundgedanken:** distribute

## `c6-divide-written` · Schriftlich dividieren

Teile von links nach rechts. Jeder Quotientenziffer gehört die passende Stelle. Multipliziere zurück, ziehe ab und hole die nächste Ziffer herunter. Sobald im Dividend das Komma überschritten wird, setzt du es im Ergebnis. Reicht die Menge nicht, kann eine Null im Ergebnis nötig sein.

**Schaubild:** share · Wähle die Anzahl der Empfänger. Jede Portion bleibt gleich groß.

**Paralleles Beispiel:** Berechne 12,48 : 4.

1. 12 : 4 = 3; Rest 0. Setze danach das Komma.
2. 4 Zehntel : 4 = 1 Zehntel, Rest 0; dann 8 Hundertstel : 4 = 2 Hundertstel.
3. 12,48 : 4 = 3,12. Probe: 3,12 · 4 = 12,48.

**Freiwillige Grundgedanken:** divide-equal, divide-proof

## `c6-divisor` · Durch eine Dezimalzahl teilen

Vergrößere Dividend und Divisor mit derselben Zehnerpotenz, bis der Divisor ganzzahlig ist. Der Quotient bleibt gleich. Beim Portionieren fragt die Division: Wie oft passt eine Portion in den Vorrat? Ein positiver Divisor kleiner als 1 kann zu einer größeren Maßzahl führen.

**Schaubild:** scale · Vergrößere beide Maßzahlen mit demselben Faktor. Das Verhältnis bleibt gleich.

**Paralleles Beispiel:** Berechne 5,46 : 0,6.

1. Multipliziere beide Zahlen mit 10: 54,6 : 6.
2. 54,6 : 6 = 9,1.
3. Prüfe: 9,1 · 0,6 = 5,46.

**Freiwillige Grundgedanken:** portion-hundred, divide-scale

## `c6-periodic` · Manche Dezimalbrüche enden nicht

Bei 1 : 4 endet die schriftliche Division: 0,25. Bei 1 : 3 kehrt derselbe Rest immer wieder; die Ziffer 3 wiederholt sich unbegrenzt: 0,333… . Das ist ein periodischer Dezimalbruch. 0,33 ist nur ein gerundeter Näherungswert, nicht genau 1/3. Weitere Periodentheorie ist hier nicht nötig.

**Schaubild:** periodic · Wähle einen Teiler. Wann endet die Division, wann kehrt ein Rest wieder?

**Paralleles Beispiel:** Vergleiche 2/3 und 0,67.

1. 2 : 3 ergibt 0,666…; die 6 wiederholt sich.
2. Auf Hundertstel gerundet ergibt das 0,67.
3. Also 2/3 ≈ 0,67, aber nicht 2/3 = 0,67.

**Freiwillige Grundgedanken:** fraction-meaning

## `c6-model` · Erst die Beziehung, dann die Rechnung

Kläre: Was ist gesucht? Welche Angaben brauche ich? Gleiche Gruppen sprechen für Multiplikation, Portionen oder gerechtes Verteilen für Division. Anfang, Verbrauch und Rest hängen durch Addition und Subtraktion zusammen. Nicht jede Zahl einer Geschichte muss verwendet werden.

**Schaubild:** model · Wähle eine Geschichte. Das Modell zeigt, welche Größe gesucht ist.

**Paralleles Beispiel:** Sechs Personen zahlen je 2,85 € Eintritt. Dazu kommen 4,20 € für die ganze Gruppe.

1. Der Eintritt sind sechs gleiche Beträge: 6 · 2,85 €.
2. Die Gruppenpauschale wird einmal addiert.
3. 6 · 2,85 + 4,20 = 21,30 €.

**Freiwillige Grundgedanken:** model

## `c6-operations` · Rechenreihenfolge und Ergebnis prüfen

Klammern zuerst, dann Multiplikation und Division vor Addition und Subtraktion. Gleichrangige Rechnungen werden von links nach rechts ausgeführt. Plane vor dem Rechnen einen Überschlag und prüfe danach Einheit, Größenordnung und Sachbedeutung.

**Schaubild:** operations · Decke die Rechenschritte auf. Die Klammer verändert, was zuerst berechnet wird.

**Paralleles Beispiel:** Berechne (9,6 − 1,2) : 4 + 0,35.

1. Zuerst die Klammer: 8,4.
2. Dann teilen: 8,4 : 4 = 2,1.
3. Zuletzt addieren: 2,1 + 0,35 = 2,45.

**Freiwillige Grundgedanken:** operations

## Mathematische Grenzen der Modelle

Alle Anteile beziehen sich auf ein explizites Ganzes. Stellenwertkarten nennen die Werte der Stellen, nicht bloß ihre Reihenfolge. Beim Runden werden Nachbarwerte und Mitte getrennt. Flächen- und Volumeneinheiten benutzen unterschiedliche Faktoren. Das neue Periodenmodell verfolgt ganzzahlige Reste: bei Rest 0 endet die Division; ein wiederkehrender Rest erklärt wiederkehrende Ziffern. Die angezeigte endliche Vorschau ist bei verbleibendem Rest keine exakte endliche Dezimalzahl.

Die Schaubild-Zahlengeraden dürfen zum Erkunden beschriftet sein; Antwort-Zahlengeraden haben dagegen nur beschriftete Endpunkte. Modellwerte sind begrenzt, um Fingerbedienung und Übersicht zu erhalten; die mathematischen Regeln gelten darüber hinaus.

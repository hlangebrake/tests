# Freiwillige Übungsbank · Kommaland 7.1

> **Gültig in Kommaland 7.2:** Der folgende fachliche Bestand beziehungsweise die dokumentierten 7.1-Regeln bleiben unverändert. Neu ist die Darstellung: mathematischer Titel, kompakte Steuerung, Hilfen/Kriterien auf Nachfrage. Siehe `UI-DESIGN.md` und `AENDERUNGEN.md`.


> Weitergeltender Bestand aus Version 7; in 7.1 fachlich unverändert. Niveau 2 nutzt die ursprünglichen Kernaufgaben. Die neuen Niveauvarianten und ihre Lösungen stehen in NIVEAU-AUFGABEN.md; Regeln und Grenzen in NIVEAUS.md.


72 ausdrücklich formulierte Aufgaben; 17 Bereiche. Diese Bank ersetzt oder verlängert keine Kernquest. IDs beginnen mit `v7:`. Antworten werden mathematisch geprüft, als Lernereignis aber nur Richtigkeit/Versuchsnummer erfasst; hier stehen die Musterantworten zur fachlichen Prüfung. Acht Schriftrechnungen verlangen zusammengehörige Zwischenfelder.

Die Rundenwahl steht in `js/enrichment.js` (`selectPractice`), die Angebotsregeln in `teacher-dashboard/shared/learning7.js`. Begrenzung 2–5; Ablehnen, später und einzelne Aufgabe auslassen sind möglich. Kein automatischer Wiederholungszwang. 5.x-Mikroaufgaben wurden nicht pauschal reaktiviert.

| ID | Format / AB | Aufgabe | Musterantwort | Didaktischer Zweck |
|---|---|---|---|---|
| v7:place:01 | number / I | Welchen Wert hat die Ziffer 6 in 4,62? | "0,6" | Ziffernwert statt bloßem Ziffernnamen bestimmen. |
| v7:place:02 | number / I | Welchen Wert hat die Ziffer 8 in 12,084? | "0,08" | Eine innere Null bei der Positionsdeutung berücksichtigen. |
| v7:place:03 | work / I | Zerlege 24,306 in die fehlenden Stellenwerte. | ["0,3", "0,006"] | Zahl additiv mit ausgelassenem Hundertstelwert zerlegen. |
| v7:place:04 | choice / II | Die 7 wandert von der Hundertstel- an die Zehntelstelle. Was passiert mit ihrem Wert? | 0 | Zehnfache Wertänderung bei einem Stellenwechsel deuten. |
| v7:reading:01 | number / I | Schreibe als Dezimalzahl: drei Ganze und vier Zehntel. | "3,4" | Sprachliche Zehntelangabe in Dezimalschreibweise übertragen. |
| v7:reading:02 | number / I | Schreibe: zwei Ganze und sieben Tausendstel. | "2,007" | Nicht genannte Zwischenstellen als Platzhalternullen schreiben. |
| v7:reading:03 | choice / I | Welche Beschreibung passt zu 10,045? | 2 | Zweistellige Ganzzahl und führende Nachkommanull gemeinsam lesen. |
| v7:reading:04 | number / I | Ein Etikett nennt 103 Ganze, 2 Zehntel und 9 Tausendstel. Schreibe die Zahl. | "103,209" | Eine dreistellige Ganzzahl mit nicht benachbarten Dezimalstellen verbinden. |
| v7:zeros:01 | multi / I | Welche Zahlen sind genauso groß wie 0,6? | [0, 2] | Angehängte Nullen als wertgleich erkennen, innere nicht. |
| v7:zeros:02 | choice / I | Welche Null darf in 4,070 gestrichen werden, ohne den Wert zu ändern? | 1 | Wertneutrale Endnull von Platzhalternullen unterscheiden. |
| v7:zeros:03 | number / I | Ergänze: 0,009 · 100 = □. | "0,9" | Führende Nachkommanullen beim Verhundertfachen richtig behandeln. |
| v7:zeros:04 | multi / I | Welche Zahlen sind gleich 12,040? | [0, 2] | Wertgleiche Schreibweisen mit innerer und äußerer Null vergleichen. |
| v7:fractions:01 | number / I | Schreibe 7/10 als Dezimalzahl. | "0,7" | Direkt zwischen Zehntelbruch und Dezimalzahl wechseln. |
| v7:fractions:02 | number / I | Schreibe 9/20 als Dezimalzahl. | "0,45" | Auf einen passenden Zehnerpotenznenner erweitern. |
| v7:fractions:03 | choice / I | Welcher gekürzte Bruch ist gleich 0,125? | 1 | Einen gekürzten Bruch einer endlichen Dezimalzahl zuordnen. |
| v7:fractions:04 | work / II | Ergänze die Darstellungen derselben Zahl. | ["0,875", "875"] | Bruch, Dezimalzahl und Tausendstelzählung verknüpfen. |
| v7:compare:01 | choice / I | Welche Zahl ist größer? | 0 | Ungleiche Dezimalstellenanzahl beim Vergleich ignorieren lernen. |
| v7:compare:02 | choice / I | Welche Zahl ist kleiner? | 0 | Nahe Zahlen mit verschiedenen Platzhalternullen vergleichen. |
| v7:compare:03 | error / II | Finde die erste falsche Zeile des Vergleichs. | 1 | Die erste unzulässige Ganzzahlargumentation identifizieren. |
| v7:compare:04 | multi / II | Welche Zahlen sind echt größer als 2,095? | [1, 2] | Mehrere enge Zahlen und strikte Ungleichheit gleichzeitig prüfen. |
| v7:order:01 | order / I | Ordne aufsteigend. | [2, 1, 0, 3] | Vier unterschiedliche Stellenwerte in eine Ordnung bringen. |
| v7:order:02 | order / I | Ordne diese Messwerte aufsteigend. | [3, 1, 0, 2] | Große Messwerte mit nahen Nachkommastellen ordnen. |
| v7:order:03 | choice / II | Welche Zahl passt in 2,07 < □ < 2,071? | 1 | Die Dichte der Zahlen in einem engen offenen Intervall nutzen. |
| v7:order:04 | order / I | Ordne aufsteigend; beginne mit der kleinsten Zahl. | [0, 2, 1, 3] | Ganze Anteile und nahe Dezimalanteile gemeinsam ordnen. |
| v7:line:01 | line / I | Markiere 1,7 auf dem Zahlenstrahl. | "1.7" | Unbeschriftete gleichmäßige Teilstriche von den Endwerten erschließen. |
| v7:line:02 | line / I | Markiere 2,04 auf dem Zahlenstrahl. | "2.04" | Auf einer verschobenen Skala Hundertstel lokalisieren. |
| v7:line:03 | number / I | Eine Strecke auf der Zahlengeraden beginnt bei 4,20 und endet bei 4,30. Zehn gleiche Abschnitte teilen sie. Wie groß ist ein Abschnitt? | "0,01" | Schrittweite aus Gesamtlänge und Teilanzahl berechnen. |
| v7:line:04 | number / I | Welche Zahl liegt genau in der Mitte zwischen 1,204 und 1,210? | "1,207" | Mittelpunkt zweier Tausendstelzahlen ermitteln. |
| v7:round:01 | number / I | Runde 3,47 auf Zehntel. | "3,5" | Direktes Runden auf die verlangte Stelle anwenden. |
| v7:round:02 | number / I | Runde 7,995 auf Hundertstel. | "8" | Einen Rundungsübertrag bis in die Einerstelle verarbeiten. |
| v7:round:03 | choice / II | Welche Zahl wird beim direkten Runden auf Zehntel zu 2,4? | 2 | Eine mögliche Ausgangszahl zu einem gerundeten Wert finden. |
| v7:round:04 | error / II | Wo ist der erste Fehler beim direkten Runden von 4,949 auf Zehntel? | 1 | Fehler durch mehrfaches statt direktes Runden unterscheiden. |
| v7:estimate:01 | number / I | Überschlage 6,8 + 12,2, indem du beide Summanden zuerst auf ganze Zahlen rundest. | "19" | Einen vorgegebenen Überschlag kontrolliert durchführen. |
| v7:estimate:02 | choice / I | Welche grobe Größenordnung passt zu 19,8 · 0,51? | 1 | Produktgröße bei Faktor knapp über einer Hälfte abschätzen. |
| v7:estimate:03 | choice / II | Ein Überschlag ergibt genau 15 kg bei einer Grenze von 15 kg. Was folgt? | 2 | Die Aussagegrenze eines Überschlags an einer exakten Grenze prüfen. |
| v7:estimate:04 | work / II | Prüfe 9,86 + 5,24: zuerst Überschlag auf ganze Zahlen, danach genau. | ["15", "15,10"] | Näherung und genaue Summe ausdrücklich nebeneinander bestimmen. |
| v7:units:01 | number / I | Wie viele Zentimeter sind 2,45 m? | "245" | Eine Länge bei gleicher Größe in kleinerer Einheit schreiben. |
| v7:units:02 | choice / I | Welche Masse ist gleich 0,037 kg? | 1 | Führende Nachkommanullen bei Kilogramm-Gramm berücksichtigen. |
| v7:units:03 | work / I | Wandle um. | ["75", "400"] | Zeitfaktor 60 und Flächenfaktor 10000 unterscheiden. |
| v7:units:04 | number / I | Wie viele Liter sind 0,006 m³? | "6" | Kubikmeter mit Liter statt einer bloßen Zehnerstufe verknüpfen. |
| v7:add:01 | number / I | Berechne 2,7 + 0,46. | "3,16" | Unterschiedliche Nachkommastellen korrekt ausrichten. |
| v7:add:02 | number / I | Berechne 14,008 + 2,97. | "16,978" | Innere Nullen und Tausendstel beim Addieren behandeln. |
| v7:add:03 | error / II | Finde die erste falsche Zeile. | 2 | Fehlerhafte Stellenwertaddition im Rechenweg erkennen. |
| v7:add:04 | number / II | Rechne geschickt: 2,65 + 4,08 + 0,35. | "7,08" | Geeignete Summanden gezielt zu einem Ganzen bündeln. |
| v7:sub:01 | number / I | Berechne 4,8 − 0,65. | "4,15" | Endnull ergänzen und über eine Dezimalstelle entbündeln. |
| v7:sub:02 | number / I | Berechne 7,003 − 0,968. | "6,035" | Entbündeln über mehrere Nullstellen durchführen. |
| v7:sub:03 | choice / II | Welche Probe prüft 6,02 − 0,78 = 5,24? | 1 | Die passende Umkehroperation als Probe auswählen. |
| v7:sub:04 | number / I | Ein Seil ist 12,004 m lang. Nach dem Abschneiden von 2,86 m bleiben wie viele Meter? | "9,144" | Eine Längendifferenz mit ungleicher Stellenanzahl modellieren. |
| v7:mul:01 | number / I | Berechne 6 · 0,45. | "2,7" | Wiederholte gleiche Dezimalmengen bestimmen. |
| v7:mul:02 | number / I | Berechne 2,05 · 0,6. | "1,23" | Zwei Dezimalfaktoren einschließlich innerer Null multiplizieren. |
| v7:mul:03 | choice / II | Für a > 0: Wie verändert sich a bei a · 0,75? | 1 | Die Wirkung eines Faktors zwischen null und eins begrifflich deuten. |
| v7:mul:04 | number / II | Rechne geschickt: 8 · 1,98. | "15,84" | Eine nahe ganze Zahl zum vorteilhaften Rechnen verwenden. |
| v7:div:01 | number / I | Berechne 3,6 : 4. | "0,9" | Eine Dezimalmenge auf eine natürliche Zahl verteilen. |
| v7:div:02 | number / I | Berechne 0,96 : 0,08. | "12" | Beide Operanden so verändern, dass ein natürlicher Teiler entsteht. |
| v7:div:03 | error / II | Finde die erste falsche Zeile. | 1 | Einseitiges Komma-Verschieben als unzulässig erkennen. |
| v7:div:04 | work / II | 2,7 l werden in 0,22-l-Flaschen gefüllt. | ["12", "0,06"] | Quotient im Sachkontext als volle Portionen und Rest interpretieren. |
| v7:written:01 | work / I | Schriftliche Addition: 5,86 + 2,79. Trage die Überträge an ihrer Zielstelle ein. | ["1", "1", "8,65"] | Überträge an den Zielstellen und das Ergebnis gemeinsam ergänzen. |
| v7:written:02 | work / I | Addiere 12,406 + 3,78 schriftlich: Ergänze zuerst den zweiten Summanden. | ["7", "8", "0", "16,186"] | Den zweiten Summanden stellenrichtig mit Endnull schreiben. |
| v7:written:03 | work / I | Entbündele 6,003 für die Rechnung 6,003 − 0,875. | ["5", "9", "9", "13", "5,128"] | Entbündeln über zwei Nullstellen als Tauschwerte darstellen. |
| v7:written:04 | work / I | Schriftlich: 4,02 − 0,67. Ergänze die Tauschwerte und das Ergebnis. | ["3", "9", "12", "3,35"] | Tauschwerte und Differenz einer schriftlichen Subtraktion verknüpfen. |
| v7:written:05 | work / I | Multipliziere 1,36 · 0,24 mithilfe von 136 · 24. | ["544", "2720", "3264", "0,3264"] | Versetzte natürliche Teilprodukte und Dezimalergebnis unterscheiden. |
| v7:written:06 | work / I | Multipliziere 2,07 · 0,3 mithilfe von 207 · 3. | ["2", "621", "0,621"] | Multiplikationsübertrag und zwei verschiedene Kommastellenzahlen beachten. |
| v7:written:07 | work / I | Vervollständige 14,28 : 7. | ["2", "0", "2", "2,04"] | Eine Null im Quotienten nicht unterschlagen und Reste beachten. |
| v7:written:08 | work / I | Rechne 5,616 : 1,2 mit ganzzahligem Teiler. | ["56,16", "12", "4,68"] | Äquivalente Division und Endergebnis mit Dezimalteiler bestimmen. |
| v7:inverse:01 | number / I | Ergänze: 1,85 + □ = 4,20. | "2,35" | Eine additive Lücke mit der Umkehroperation bestimmen. |
| v7:inverse:02 | number / II | Nach einer Entnahme von 2,675 l bleiben 6,4 l. Wie viel war zuvor da? | "9,075" | Eine Anfangsmenge aus Rest und Entnahme rekonstruieren. |
| v7:inverse:03 | number / II | Ergänze: □ · 0,8 = 3,6. | "4,5" | Einen unbekannten Faktor bei einem Faktor kleiner eins berechnen. |
| v7:inverse:04 | number / II | Eine Zahl wird durch 0,5 geteilt, danach werden 1,2 addiert. Das Ergebnis ist 6. Welche Zahl war es? | "2,4" | Eine zweistufige Rechenkette in umgekehrter Reihenfolge auflösen. |
| v7:plausible:01 | choice / I | Kann 12,4 · 0,5 = 62 stimmen? | 1 | Ein unmögliches Produkt ohne komplette Rechnung erkennen. |
| v7:plausible:02 | choice / II | Du brauchst 6,3 l und kaufst nur 1,5-l-Flaschen. Wie viele reichen mindestens? | 2 | Flaschenanzahl aufrunden, damit der Bedarf wirklich gedeckt wird. |
| v7:plausible:03 | multi / II | Welche Ergebnisse sind schon an ihrer Größenordnung erkennbar falsch? | [0, 2] | Mehrere Ergebnisse anhand der Operationswirkung prüfen. |
| v7:plausible:04 | work / II | Ein 5-m-Band wird in Abschnitte zu je 0,65 m ohne Verschnitt geteilt. | ["7", "0,45"] | Maximal volle Längenstücke und verbleibende Länge gemeinsam bestimmen. |

Bei Auswahl-/Ordnungsaufgaben sind die Musterantworten nullbasierte Indizes. Die vollständigen Antwortoptionen, Hinweise, Lösungsbegründungen und schriftlichen Zwischenfelder stehen in `js/adaptive-bank.js`. Zu jeder Aufgabe ist dort ein bereits bestehendes, passendes interaktives Wissenselement verknüpft. Es wurden keine freien Textantworten zur automatischen Kontrolle hinzugefügt.

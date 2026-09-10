# Kommaland 4.1 · Wissensfluss und sichtbare Questzustände

## Umfang

Alle **45 Questobjekte / 32 tatsächlich verwendeten Modelltypen** sind berücksichtigt. Alle 393 Aufgaben, ihre Antworten, Wissenskarten, Voraussetzungen und die Prüfungslogik bleiben gegenüber Version 4.0 unverändert. Dekorative Bauten ohne Questfunktion sind nicht Teil der Bauzustandslogik.

## Automatische Wissenseinblendung

Entscheidend ist der bereits eingeführte **Gedanke innerhalb der jeweiligen Quest**, nicht der Aufgaben- oder Gruppenindex. Eine identische Wissens-ID wird nur einmal automatisch eingeführt. Manuelles Wiederöffnen bleibt bei Lernaufgaben jederzeit möglich; bei Wegprüfungen bleibt Hilfe gesperrt. Für bereits abgeschlossene Quests beginnt ein Übungsdurchgang direkt mit Aufgaben.

Auch eine von der Quest-Einstiegsrolle gelesene Karte wird im unmittelbar anschließenden Aufgabenstart nicht noch einmal erzwungen. Während einer begonnenen Quest wird die Liste persistiert. Reines Vorab-Lesen ohne gestartete Quest wird nur für die laufende Sitzung gemerkt; es legt keinen künstlichen Aufgabenfortschritt an. Karten an einem allgemeinen Gebietsschild vergeben keine erledigten Aufgaben und werden nicht pauschal als weltweit verstanden behandelt.

Die Liste `progress[questId].shownLessons` ergänzt das bestehende Schema 3. Beim Laden alter Daten werden die Gedanken vor den bereits gelösten Schritten abgeleitet. Ein erster, noch ungelöster Schritt eines neuen Gedankens darf dadurch nicht übersprungen werden. Falsche oder fremde IDs werden als optionale UI-Metadaten verworfen. Import, neue Spielstände und Rücksicherung leeren vorübergehende Vorschauinformationen.

### Fachliche Abgrenzung statt blindem Textvergleich

Die Einführung der Hundertstel, der Tausendstel, einer neuen Operation, einer anderen Einheitenbeziehung oder der Wirkung eines Faktors bleibt eigenständig. Titelähnlichkeit, gleiche Bilder und ähnliche Zahlen sind kein ausreichender Grund, Einblendungen zusammenzulegen.

Ein fachlich geprüfter Sonderfall betrifft `rectangle-decimal`: Die Karte fasst Flächeninhalt = Länge · Breite (mit m²) und das Multiplizieren zweier Dezimalfaktoren zusammen. Nur wenn **beide** Teilgedanken `rectangle` und `multiply-decimal` bereits eingeführt wurden, entfällt diese automatische Zusammenfassung. Die manuelle Karte bleibt vollständig vorhanden. Beim direkten Einstieg ohne beide Einführungen wird sie gezeigt. Die spätere Aussage über Faktoren kleiner als 1 bleibt eine neue Einführung.

### Konkrete Einblendefolge

Die Tabelle zählt neue Einführungen für eine frische Quest ohne vorherige manuelle Vorschau. Die Aufgabenpositionen sind einsbasiert. Aufgaben mit bereits bekanntem Wissen erscheinen unmittelbar.

| Quest | Aufgaben | Automatische Einführungen vor Aufgabe | Gedankenzahl |
|---|---:|---|---:|
| Eine Laterne in der Mitte (v0a) | 6 | 1, 4 | 2 |
| Zehn Steine bis zum Ganzen (v0b) | 9 | 1, 4, 7 | 3 |
| Der verstummte Brunnen (v1) | 9 | 1, 4 | 2 |
| Das Beet der Hundertstel (v0c) | 9 | 1, 4, 7 | 3 |
| Ein Dach für Jori (v2) | 9 | 1, 4, 7 | 3 |
| Der kleine Messkristall (v0d) | 6 | 1, 4 | 2 |
| Futter für die Dorfponys (v3) | 15 | 1, 4, 7, 10, 13 | 5 |
| Das Licht des Dorfes (v4) | 9 | 1, 4, 7 | 3 |
| Ein Pfad für die Rehe (f1) | 12 | 1, 4, 7, 10 | 4 |
| Die Spuren der Waldtiere (f2) | 9 | 1, 4, 7 | 3 |
| Laternen im Nebel (f3) | 9 | 1, 4, 7 | 3 |
| Der Rat der alten Eiche (f4) | 6 | 1, 4 | 2 |
| Leinen los! (h1) | 9 | 1, 4, 7 | 3 |
| Fracht für die Küstenponys (h2) | 9 | 1, 4, 7 | 3 |
| Wasser für die Reise (h3) | 9 | 1, 4, 7 | 3 |
| Der Fahrplan der Fähre (h4) | 9 | 1, 4, 7 | 3 |
| Der neue Lagerraum (h5) | 9 | 1, 4, 7 | 3 |
| Ein Korb für das Dorf (a1) | 12 | 1, 4, 7 | 3 |
| Die Futterküche (a2) | 9 | 1, 4, 7 | 3 |
| Die Lichtergirlande (a3) | 9 | 1, 4 | 2 |
| Das kleine Lichterfest (a4) | 9 | 1, 4, 7 | 3 |
| Hilf beim Holzhacken (s1) | 12 | 1, 4, 7, 10 | 4 |
| Die Statue am Pass (s2) | 9 | 1, 4 | 2 |
| Das Lager der Bergführer (s3) | 9 | 1, 4, 7 | 3 |
| Der sichere Bergsteig (s4) | 9 | 1, 4 | 2 |
| Hafer für die Himmelsponys (m1) | 9 | 1, 4 | 2 |
| Der Kräutergarten am Hang (m2) | 15 | 1, 4, 7, 13 | 4 |
| Die Bienen der Malmühle (m3) | 9 | 1, 4, 7 | 3 |
| Der Kristallverstärker (m4) | 9 | 1, 4, 7 | 3 |
| Der hungrige Schleimling (d1) | 9 | 1, 4, 7 | 3 |
| Die Trankwerkstatt (d2) | 9 | 1, 4, 7 | 3 |
| Die singenden Kristalle (d3) | 9 | 1, 4, 7 | 3 |
| Der Hüter der Teilgrotten (d4) | 9 | 1, 4, 7 | 3 |
| Die Gäste der Sternenburg (k1) | 9 | 1, 4, 7 | 3 |
| Die Schatzkammer (k2) | 9 | 1, 4, 7 | 3 |
| Der kleine Sternendrache (k3) | 9 | 1, 4, 7 | 3 |
| Das große Sternenlicht (k4) | 9 | 1, 4, 7 | 3 |

Die regulären Quests umfassen weiterhin **115 Dreiergruppen / 345 Aufgaben**. Bei einem vollständigen frischen Durchlauf ohne Vorschau ergeben sich **108 automatische Einführungen statt 115**. Sechs gruppenübergreifende identische Einführungen und eine bereits durch beide Teilgedanken abgedeckte Zusammenfassung entfallen. Die größere Wirkung entsteht beim Fortsetzen, beim erneuten Öffnen und beim Üben abgeschlossener Quests: bereits bekannte Gedanken werden nicht erneut vorgeschaltet.

Es sind weiterhin **83 unterschiedliche Wissenskarten** erreichbar. Dass 108 größer als 83 ist, liegt an der bewussten questbezogenen, nicht globalen Einführung. Ein anderes Thema darf einen Gedanken in seinem neuen Kontext einführen.

## Status aus vorhandenen Daten

| Vorhandene Daten | Semantischer Status | Sichtbares Modell |
|---|---|---|
| Kein `progress[id]`, kein Abschluss | NOT_STARTED | Anfangsmodell (Stufe 0) |
| Quest geöffnet, `step=0`, noch keine richtige Antwort | IN_PROGRESS, 0 Aufgaben gelöst | Weiterhin Anfangsmodell; Lesen repariert nichts |
| Mindestens eine richtige Antwort | IN_PROGRESS | Arbeitsmodell (Stufe 1) |
| `ready=true`, Bestätigung steht aus | IN_PROGRESS | Weiterhin Arbeitsmodell; „Bereit zum Abschluss“ |
| `completed[id]` vorhanden | COMPLETED | Fertiges Modell (Stufe 2) |

Die Zwischenform ist ein klarer symbolischer Teilaufbau, kein maßstabsgerechter Prozentsatz der gelösten Aufgaben. Sie wächst nicht nach jeder weiteren Aufgabe um ein einzelnes Bauteil. Der vorhandene Schrittzähler zeigt weiterhin den genauen Aufgabenfortschritt. Ein Wiederholungsdurchgang beschädigt keine bereits fertigen Bauten.

Der bestätigte Abschluss bleibt der einzige Commit-Punkt. Nach dem Klick wird gespeichert und die bisherige Aufbauanimation zeigt das fertige Objekt. Diese Animation beginnt jetzt am tatsächlich sichtbaren Arbeitsmodell, nicht wieder am zerstörten Anfang. Bei App-Neustart während der Animation bleibt der gespeicherte Abschluss bestehen. „Weniger Bewegung“ bleibt berücksichtigt.

Die neue Darstellung verändert keine Weg- oder Kollisionsflächen. Verborgene Meisterkristalle bleiben verborgen, bis die bisherigen fachlichen Voraussetzungen erfüllt sind. Die drei Modell-Meshes werden einmal angelegt; Aufgabenwechsel erzeugen keine weiteren.

## Prüfung der Modelltypen

Die folgende Tabelle beschreibt jeweils die dargestellte Geometrie, nicht nur Farbänderungen. Alle 32 Typen wurden mit derselben Kamera in drei Zuständen im lokalen Browser gerendert; ergänzend wurde das Dorf in normaler Spiel-Kameradistanz geprüft. Die fertigen Geometriedaten aller 45 Quests stimmen bytegenau mit Version 4.0 überein.

| Modelltyp | Noch offen | In Arbeit | Abgeschlossen |
|---|---|---|---|
| lantern | Kurzer Pfostenrest; Laternengehäuse liegt am Boden. | Aufgerichteter Pfosten, offenes Laternenkreuz ohne Dach und Licht. | Vollständige, leuchtende Laterne. |
| stones | Wenige lose, schief liegende Messsteine; breite Lücken. | Mehrere gesetzte Messsteine, andere liegen noch lose. | Vollständiger heller Messweg. |
| fountain | Lücken im niedrigen Becken; Wassersäule und Schale liegen zerbrochen daneben. | Becken weitgehend geschlossen, Säule teilweise aufgerichtet; noch keine Schale und kein Wasser. | Geschlossenes Becken, hohe Schale und sichtbarer Wasserstrahl. |
| garden | Lückenhafte Beeteinfassung und ungepflanzte Erde. | Geschlossene Einfassung, einzelne kleine Keimlinge. | Viele ausgewachsene Pflanzen. |
| house | Nur Grundmauern mit großen Lücken; Dachbretter liegen neben der Baustelle. | Teilweise hohe Wände und offene Dachbalken; halbe Vorderwand, kein geschlossenes Dach. | Geschlossenes Haus mit rotem Dach, Kamin und Fenstern. |
| crystal | Niedriger unvollständiger Sockel mit liegenden Kristallstücken. | Sockel und kurzer aufrechter Kristallkern. | Hoher Kristall mit seitlichen Kristallen. |
| stable | Niedrige Pfosten, unverbundene Latten und zusammengelegtes Dachholz. | Stehender Rahmen und Rückwandstreben; kein Dach und leere Futterstelle. | Überdachter Stall mit Futtertrögen und zwei Ponys. |
| statue | Lückenhafte Sockelsteine, Statue in liegenden Einzelteilen. | Sockel teilweise aufgebaut, erst der Rumpf ist aufgerichtet. | Hoher vollständiger Sockel mit ganzer Statue. |
| deer | Umgestürzte Wegtafel und einzelne ungelegte Trittsteine. | Wegtafel aufgerichtet, Trittsteine gelegt; Lichtung noch leer. | Rehfamilie auf der erschlossenen Lichtung. |
| trail | Nur zwei Trittsteine; lose Steine und störendes Aststück. | Halb verlegter Weg mit sichtbaren Lücken. | Vollständiger geschwungener Trittsteinweg mit Blumen. |
| tree | Astgerippe mit nur wenigen Blättern. | Kleine Blattbüschel wachsen an mehreren Ästen. | Große belaubte Krone mit goldenen Früchten. |
| boat | Offene Bootsrippen, lose Planken und liegender Mast. | Geschlossener niedriger Rumpf, ein Teil des Masts aufgerichtet; noch kein Segel. | Hoch aufgerichteter Mast und zwei Segel. |
| cart | Schiefe gebrochene Ladefläche; ein Rad abseits, keine Fracht. | Repariertes Untergestell, einzelne Bordwand und eine Kiste. | Vollständiger beladener Wagen mit Pony. |
| tank | Nur wenige Fassdauben; offene große Lücke und gebrochener Reifen. | Mehr Dauben und Stützen, obere Wand noch lückenhaft; leer. | Geschlossener hoher Wassertank mit sichtbarem Wasser. |
| clock | Niedriger Sockel, zerlegte Uhr und liegende Gehäuseteile. | Gehäuserahmen ohne Dach; leeres Zifferblatt wird montiert. | Hohe fertige Hafenuhr mit Dach, Zeigern und Fahrplan. |
| pavilion | Bodenplatten, wenige niedrige Pfosten und lose Dachbalken. | Aufgestellter offener Rahmen, erste Rückwand; noch kein Dach. | Überdachter Lagerpavillon. |
| stall | Einzelne Beine und zerlegte Ladentheke; Markise zusammengelegt. | Theke und zwei Pfosten, halbe Markise und leere Auslage. | Ganze gestreifte Markise und reich gefüllter Marktstand. |
| feeding | Abgebaute Tischplatte, fehlende Beine und leere Näpfe am Boden. | Aufgerichtete halbe Ausgabetheke mit einem Napf. | Lange Futtertheke mit vollen Näpfen und Tier. |
| banner | Niedrige Pfostenreste und eingerollte Wimpel am Boden. | Ein hoher Pfosten, zweiter teilweise aufgerichtet; einige Wimpel erst am Pfosten. | Hohe gespannte Girlande mit allen Wimpeln. |
| table | Lose Tischplatte, umgekippte Bank, fehlende Beine. | Ein aufgebauter halber Tisch, eine Bank; noch nicht gedeckt. | Vollständige lange Festtafel mit Bänken und Geschirr. |
| lumber | Ein langer ungeschnittener Stamm und Arbeitsbock. | Erste zugeschnittene Holzstücke; ein Stamm noch auf dem Bock. | Hoher Stapel geschnittener Stämme. |
| camp | Zeltplane liegt flach; lose Stangen und unfertige Feuerstelle. | Eine Zelthälfte aufgespannt; andere Hälfte noch offen, Feuerstelle unentzündet. | Ganzes hohes Zelt, Feuer und Bewohner. |
| bridge | Große mittlere Lücke im Steg und umgefallene Geländerpfosten. | Mittlere Lücke geschlossen; nur ein Teil des Geländers steht. | Durchgehender Steg mit vollständigem Geländer. |
| apiary | Drei niedrige Bodenrahmen; lose Seitenbretter und abgenommene Dächer. | Ein Stock aufgerichtet, zwei noch offene Kästen. | Drei geschlossene Bienenstöcke mit Dächern, Blumen und Bienen. |
| slime | Gesunder Schleimling mit drei großen Schutzrunen. | Gesunder Schleimling mit nur noch einer Schutzrune. | Befreundeter Schleimling ohne Schutzrunen. |
| mushroom | Abgeknickte Werkstatthalter, liegende Pilzdächer und leere Fläschchen. | Ein Pilzdach aufgestellt, zweites erst halbhoch. | Drei große Pilzdächer und gefüllte Werkstatt. |
| crystals | Liegende Kristallsplitter und kaum aufragende Spitzen. | Drei kleinere stehende Kristalle. | Sieben hohe farbige Kristalle. |
| boss | Gesunder Grottenhüter mit drei großen Schutzrunen. | Gesunder Grottenhüter mit nur noch einer Schutzrune. | Befreundeter Grottenhüter ohne Schutzrunen. |
| chest | Geschlossene Truhe mit großem Schloss und Querbändern. | Ein Schloss gelöst; Deckel einen Spalt angehoben. | Weit geöffnete Truhe mit sichtbaren Goldmünzen. |
| dragon | Gesunder Drache mit drei großen Schutzrunen. | Gesunder Drache mit nur noch einer Schutzrune. | Befreundeter Drache ohne Schutzrunen. |
| beacon | Zerlegter niedriger Sockel und liegende Leuchtsteine. | Aufgebauter Sockel mit kurzem Kristallkern. | Großes hohes Sternenlicht. |
| masterstone | Niedriger ruhender Kristallkreis mit liegenden Splittern. | Kleiner aufrechter Meisterkristall im offenen Runenkreis. | Hoher Meisterkristall und dauerhaft geschmücktes Gebiet. |

Bei Schleimling, Grottenhüter und Drachen bleiben die Lebewesen unversehrt. Große Schutzrunen werden weniger und verschwinden schließlich. Bei Lichtungen, Bäumen und Vorräten bedeutet die Zwischenform Erschließung, Wachstum oder Versorgung statt Hausbau.

## Zuordnung sämtlicher Questobjekte

### Funkeldorf

| Quest | Modell | Art |
|---|---|---|
| Eine Laterne in der Mitte (v0a) | lantern | Reguläre Quest |
| Zehn Steine bis zum Ganzen (v0b) | stones | Reguläre Quest |
| Der verstummte Brunnen (v1) | fountain | Reguläre Quest |
| Das Beet der Hundertstel (v0c) | garden | Reguläre Quest |
| Ein Dach für Jori (v2) | house | Reguläre Quest |
| Der kleine Messkristall (v0d) | crystal | Reguläre Quest |
| Futter für die Dorfponys (v3) | stable | Reguläre Quest |
| Das Licht des Dorfes (v4) | statue | Reguläre Quest |
| Die Sternensaat (master-village) | masterstone | Meisterherausforderung, zunächst verborgen |

### Flüsterwald

| Quest | Modell | Art |
|---|---|---|
| Ein Pfad für die Rehe (f1) | deer | Reguläre Quest |
| Die Spuren der Waldtiere (f2) | trail | Reguläre Quest |
| Laternen im Nebel (f3) | lantern | Reguläre Quest |
| Der Rat der alten Eiche (f4) | tree | Reguläre Quest |
| Das Herz des Flüsterwalds (master-forest) | masterstone | Meisterherausforderung, zunächst verborgen |

### Maßhafen

| Quest | Modell | Art |
|---|---|---|
| Leinen los! (h1) | boat | Reguläre Quest |
| Fracht für die Küstenponys (h2) | cart | Reguläre Quest |
| Wasser für die Reise (h3) | tank | Reguläre Quest |
| Der Fahrplan der Fähre (h4) | clock | Reguläre Quest |
| Der neue Lagerraum (h5) | pavilion | Reguläre Quest |
| Die Reise der Wasserpferde (master-harbor) | masterstone | Meisterherausforderung, zunächst verborgen |

### Summenmarkt

| Quest | Modell | Art |
|---|---|---|
| Ein Korb für das Dorf (a1) | stall | Reguläre Quest |
| Die Futterküche (a2) | feeding | Reguläre Quest |
| Die Lichtergirlande (a3) | banner | Reguläre Quest |
| Das kleine Lichterfest (a4) | table | Reguläre Quest |
| Der Markt der tausend Lichter (master-market) | masterstone | Meisterherausforderung, zunächst verborgen |

### Differenzklippen

| Quest | Modell | Art |
|---|---|---|
| Hilf beim Holzhacken (s1) | lumber | Reguläre Quest |
| Die Statue am Pass (s2) | statue | Reguläre Quest |
| Das Lager der Bergführer (s3) | camp | Reguläre Quest |
| Der sichere Bergsteig (s4) | bridge | Reguläre Quest |
| Der Sternenpfad am Abgrund (master-cliffs) | masterstone | Meisterherausforderung, zunächst verborgen |

### Malmühle

| Quest | Modell | Art |
|---|---|---|
| Hafer für die Himmelsponys (m1) | stable | Reguläre Quest |
| Der Kräutergarten am Hang (m2) | garden | Reguläre Quest |
| Die Bienen der Malmühle (m3) | apiary | Reguläre Quest |
| Der Kristallverstärker (m4) | crystal | Reguläre Quest |
| Das Fest der Himmelsponys (master-mill) | masterstone | Meisterherausforderung, zunächst verborgen |

### Teilgrotten

| Quest | Modell | Art |
|---|---|---|
| Der hungrige Schleimling (d1) | slime | Reguläre Quest |
| Die Trankwerkstatt (d2) | mushroom | Reguläre Quest |
| Die singenden Kristalle (d3) | crystals | Reguläre Quest |
| Der Hüter der Teilgrotten (d4) | boss | Reguläre Quest |
| Der Kristall der Freundschaft (master-cave) | masterstone | Meisterherausforderung, zunächst verborgen |

### Sternenburg

| Quest | Modell | Art |
|---|---|---|
| Die Gäste der Sternenburg (k1) | camp | Reguläre Quest |
| Die Schatzkammer (k2) | chest | Reguläre Quest |
| Der kleine Sternendrache (k3) | dragon | Reguläre Quest |
| Das große Sternenlicht (k4) | beacon | Reguläre Quest |
| Die Krone von Kommaland (master-castle) | masterstone | Meisterherausforderung, zunächst verborgen |

## Ausnahmen und Grenzen

Die fünf zusätzlich in der Modellbibliothek erhaltenen Typen crates, gate, lift, mill und tower besitzen ebenfalls unfertige/teilfertige Varianten, sind aktuell aber keiner der 45 Quests zugeordnet. Die 32-Typen-Browserprüfung bezieht sich auf tatsächlich verwendete Questmodelle. Tore der Wegprüfungen nutzen weiterhin ihre eigene bestehende Öffnungslogik.

Der visuelle Browservergleich prüft Darstellung und UI in Chromium/SwiftShader. Er ist kein Test der Geschwindigkeit oder des WebGL-Verhaltens auf einem physischen iPad. Siehe TESTS.md.

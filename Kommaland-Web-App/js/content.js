/** Original learning content. Curriculum mapping and sources: DIDAKTIK.md. */
const N = (text, answer, unit, hint, why, visual) => ({type:'number',text,answer:String(answer),unit,hint,why,visual});
const C = (text, options, answer, hint, why, visual) => ({type:'choice',text,options,answer,hint,why,visual});
const M = (text, options, answer, hint, why) => ({type:'multi',text,options,answer,hint,why});
const O = (text, items, answer, hint, why) => ({type:'order',text,items,answer,hint,why});
const K = (text, items, categories, answer, hint, why) => ({type:'classify',text,items,categories,answer,hint,why});
const L = (text, start, end, step, answer, hint, why) => ({type:'line',text,start,end,step,answer:String(answer),hint,why});
const Q = (id,region,title,npc,story,reward,kind,x,z,tasks,advanced=false) => ({id,region,title,npc,story,reward,kind,x,z,tasks,advanced});
export const REGIONS = [
 {id:'village',name:'Funkeldorf',topic:'Dezimalzahlen verstehen',tag:'DEIN ZUHAUSE',icon:'home',color:'#65996d',x:0,z:24,r:20,h:1.3,unlock:[],hint:'Beginne am Brunnen. Jede Stelle hat ihren Wert.'},
 {id:'forest',name:'Flüsterwald',topic:'Vergleichen & runden',tag:'DER PFAD DER ZAHLEN',icon:'leaf',color:'#468979',x:-37,z:-2,r:18,h:1.8,unlock:['v1'],hint:'Der Waldhüter zeigt dir, wie du Zahlen vergleichst.'},
 {id:'harbor',name:'Maßhafen',topic:'Größen & Einheiten',tag:'ALLES HAT EIN MASS',icon:'anchor',color:'#629faf',x:-38,z:40,r:17,h:1.1,unlock:['v1'],hint:'Am Hafen werden Ladungen gewogen und Wege gemessen.'},
 {id:'market',name:'Summenmarkt',topic:'Dezimalzahlen addieren',tag:'ZUSAMMEN WIRD ES MEHR',icon:'bag',color:'#d6a052',x:37,z:28,r:18,h:1.4,unlock:['v1'],hint:'Hilf beim Einkaufen und beim großen Marktessen.'},
 {id:'cliffs',name:'Differenzklippen',topic:'Dezimalzahlen subtrahieren',tag:'WAS NOCH FEHLT',icon:'mountain',color:'#b28b7e',x:57,z:-12,r:17,h:5.4,unlock:['a1'],hint:'Berechne Vorräte und fehlende Stücke für den Aufstieg.'},
 {id:'mill',name:'Malmühle',topic:'Dezimalzahlen multiplizieren',tag:'KLEINE MENGEN, GROSSE WIRKUNG',icon:'wind',color:'#a1a763',x:13,z:-14,r:18,h:3.2,unlock:['a1'],hint:'Die Mühle braucht Mehl, Stoff und einen neuen Garten.'},
 {id:'cave',name:'Teilgrotten',topic:'Dezimalzahlen dividieren',tag:'TEILEN VERBINDET',icon:'gem',color:'#9a88bb',x:-27,z:-39,r:18,h:3.9,unlock:['m1'],hint:'Besänftige die Grottenwesen mit fair geteilten Vorräten.'},
 {id:'castle',name:'Sternenburg',topic:'Vernetzen & anwenden',tag:'DAS GROSSE FINALE',icon:'star',color:'#b1a36d',x:16,z:-57,r:19,h:5.1,unlock:['seals'],hint:'Zwei Quests je Lernort öffnen die vier Prüfungen.'}
];
export const PATHS = [['village','forest'],['village','harbor'],['village','market'],['village','mill'],['forest','cave'],['forest','harbor'],['market','cliffs'],['market','mill'],['mill','cliffs'],['mill','cave'],['mill','castle'],['cave','castle'],['cliffs','castle']];
export const QUESTS = [
 Q('v1','village','Der verstummte Brunnen','Mila · Brunnenhüterin','Die Wassersteuerung ist durcheinander. Lies die Stellen richtig, damit unser Brunnen wieder sprudelt.','Der Dorfbrunnen sprudelt wieder.','fountain',0,0,[
 C('Der Pegel zeigt 2,47 m. Wie heißt die Stelle, an der die 4 steht?',['Einer','Zehntel','Hundertstel'],1,'Direkt rechts vom Komma stehen die Zehntel.','2,47 bedeutet 2 Einer, 4 Zehntel und 7 Hundertstel.','place'),
 N('Das kleine Ventil braucht 6 Hundertstel Liter Öl. Welche Dezimalzahl stellst du ein?','0.06','l','Hundertstel sind die zweite Stelle rechts vom Komma.','6/100 l = 0,06 l. Die Null hält die Zehntelstelle frei.','hundred'),
 C('Die Pumpe soll 0,5 l abgeben. Welches Ersatzschild passt ebenfalls?',['0,05 l','0,50 l','5,0 l'],1,'Eine angehängte Null nach der letzten Nachkommastelle ändert den Wert nicht.','0,5 l = 0,50 l. Fünf Zehntel sind fünfzig Hundertstel.')
 ]),
 Q('v2','village','Ein Dach für Jori','Jori · Tüftler','Mein neues Dach braucht genau beschriftete Bretter. Hilfst du mir, die Maßschilder zu lesen?','Joris Haus bekommt sein rotes Dach.','house',-9,-5,[
 K('Sortiere die Stellenwerte der drei Ziffern auf dem Brettschild 3,58 m.',['3','5','8'],['Einer','Zehntel','Hundertstel'],[0,1,2],'Lies von links nach rechts: Einer, Komma, Zehntel, Hundertstel.','3 Einer + 5 Zehntel + 8 Hundertstel = 3,58.'),
 N('Ein kurzes Brett misst 7 Zehntel Meter. Schreibe das Maß als Dezimalzahl.','0.7','m','7 Zehntel sind 7/10.','7/10 m = 0,7 m.'),
 N('Das schmale Zierband ist 4 Tausendstel Meter dick. Wie lautet die Dezimalzahl?','0.004','m','Tausendstel stehen an der dritten Stelle rechts vom Komma.','4/1000 m = 0,004 m. Zwei Nullen halten die Stellen frei.')
 ]),
 Q('v3','village','Die Vorratskammer','Pip · Sammler','Die Etiketten sind verblasst. Verbinde Brüche und Dezimalzahlen, bevor wir die Vorräte einräumen.','Die Vorratskammer ist gefüllt und beleuchtet.','crates',8,-6,[
 C('Ein Krug ist zu 3/4 gefüllt. Welches Dezimaletikett passt?',['0,34','0,75','0,3'],1,'Erweitere 3/4 mit 25 auf Hundertstel.','3/4 = 75/100 = 0,75.','quarters'),
 N('Eine Schale enthält 35/100 kg Beeren. Welche Dezimalzahl gehört auf das Etikett?','0.35','kg','35 Hundertstel bestehen aus 3 Zehnteln und 5 Hundertsteln.','35/100 kg = 0,35 kg.'),
 M('Alle Gläser mit genau einem halben Liter kommen ins obere Regal. Wähle alle passenden Etiketten.',['0,5 l','0,05 l','0,50 l','5/10 l'],[0,2,3],'Ein halber Liter entspricht fünf Zehnteln oder fünfzig Hundertsteln.','0,5 l = 0,50 l = 5/10 l. 0,05 l ist nur ein Zwanzigstel Liter.')
 ]),
 Q('v4','village','Das Licht des Dorfes','Mila · Brunnenhüterin','Die Dorfstatue leuchtet nur mit drei passenden Zahlenrunen. Setze dein Stellenwertwissen ein.','Eine leuchtende Kristallstatue wacht über Funkeldorf.','statue',6,6,[
 N('Die erste Rune besteht aus 4 Einern, 0 Zehnteln und 8 Hundertsteln. Welche Zahl ist das?','4.08','','Lass die Zehntelstelle nicht leer: Sie braucht eine Null.','4 + 0/10 + 8/100 = 4,08.'),
 C('Die nächste Rune trägt 0,125. Welcher Bruch passt?',['125/100','125/1000','12/1000'],1,'Drei Nachkommastellen führen zu Tausendsteln.','0,125 = 125/1000 = 1/8.'),
 C('Pip behauptet: „0,40 ist größer als 0,4, weil es mehr Ziffern hat.“ Welche Erklärung hilft ihm?',['Er hat recht: 40 ist größer als 4.','Beide sind gleich: 4 Zehntel sind 40 Hundertstel.','0,4 ist größer, weil es weniger Ziffern hat.'],1,'Vergleiche die Werte der Stellen, nicht nur die Ziffernfolge.','Eine Null am Ende des Nachkommateils verändert den Wert nicht.')
 ],true),
 Q('f1','forest','Der freundliche Waldhüter','Fenn · Waldhüter','Mein Wurzeltor öffnet sich für die stärkeren Schutzamulette. Prüfe ihre Leuchtkraft.','Das Wurzeltor trägt wieder ein grünes Schutzlicht.','gate',-6,2,[
 C('Welches Amulett hat die größere Leuchtkraft?',['0,8','0,75'],0,'Schreibe 0,8 als 0,80.','0,80 > 0,75. Acht Zehntel sind mehr als sieben Zehntel und fünf Hundertstel.'),
 O('Lege die Amulette von der kleinsten zur größten Leuchtkraft.',['1,09','1,9','1,19','1,099'],[0,3,2,1],'Ergänze auf drei Nachkommastellen: 1,090; 1,900; 1,190; 1,099.','1,090 < 1,099 < 1,190 < 1,900.'),
 C('Das Tor verlangt mehr als 2,35 Kraftpunkte. Welcher Stein erfüllt das?',['2,305','2,350','2,36'],2,'Gleich viel reicht nicht; der Wert muss größer sein.','2,36 > 2,35. 2,350 ist gleich 2,35; 2,305 ist kleiner.')
 ]),
 Q('f2','forest','Die verschwundenen Wegsteine','Fenn · Waldhüter','Die Wegsteine liegen auf einer Zahlenstrecke. Setze die Markierungen zurück an ihren Platz.','Drei helle Wegsteine weisen durch den Wald.','stones',4,5,[
 L('Setze den ersten Wegstein bei 0,6 km.',0,1,0.1,'0.6','Ein großer Abschnitt von 0 bis 1 ist in zehn gleiche Schritte geteilt.','0,6 liegt sechs Zehntelschritte rechts von 0.'),
 L('Die zweite Laterne steht bei 1,25 km. Wähle ihre Position.',1,1.5,0.05,'1.25','Jeder Schritt auf dieser Strecke ist 0,05 km.','1,25 liegt genau in der Mitte zwischen 1,0 und 1,5.'),
 C('Welcher Rastplatz liegt genau zwischen 2,4 km und 2,6 km?',['2,45 km','2,5 km','2,55 km'],1,'Der Mittelwert liegt von beiden Zahlen gleich weit entfernt.','2,5 liegt jeweils 0,1 von 2,4 und 2,6 entfernt.')
 ]),
 Q('f3','forest','Laternen im Nebel','Nori · Lichtsammlerin','Die Nebelschilder haben nur wenig Platz. Runde die Entfernungen auf die verlangte Stelle.','Die Nebellaterne leuchtet wieder.','lantern',6,-6,[
 N('Der Wasserfall ist 3,46 km entfernt. Runde für das Schild auf eine Nachkommastelle.','3.5','km','Sieh auf die Hundertstelstelle: 6. Ab 5 wird aufgerundet.','3,46 km ≈ 3,5 km. Die 6 erhöht die Zehntelstelle.'),
 N('Die Brücke misst 7,243 m. Runde auf Hundertstel.','7.24','m','Die Tausendstelziffer 3 entscheidet.','7,243 m ≈ 7,24 m. Bei 0 bis 4 bleibt die Rundungsstelle gleich.'),
 N('Der Gipfelpfad ist 9,96 km lang. Runde auf Zehntel.','10.0','km','Beim Aufrunden von 9,9 gibt es einen Übertrag.','9,96 km ≈ 10,0 km. Auch 10 ist derselbe Zahlenwert.')
 ]),
 Q('f4','forest','Der Rat der alten Eiche','Edda · Waldweise','Die Eiche prüft, ob du passenden Schätzungen vertraust – und ob du bei genauen Grenzen vorsichtig bleibst.','Die alte Eiche trägt goldene Früchte.','tree',-7,-6,[
 C('Drei Pfade sind 2,9 km, 4,1 km und 1,8 km lang. Welcher Überschlag passt zur Gesamtlänge?',['etwa 5 km','etwa 9 km','etwa 15 km'],1,'Runde auf ganze Kilometer und rechne 3 + 4 + 2.','Der Überschlag ergibt 9 km. Genau sind es 8,8 km.'),
 K('Das Baumhaus trägt höchstens 2,5 kg. Ordne die Pakete zu.',['2,49 kg','2,50 kg','2,501 kg'],['passt','zu schwer'],[0,0,1],'„Höchstens“ erlaubt den Grenzwert selbst. Ergänze Nullen zum Vergleichen.','2,49 und 2,50 sind höchstens 2,5. 2,501 ist größer.'),
 C('Darfst du ein 2,54-kg-Paket auf die 2,5-kg-Brücke tragen, nur weil 2,54 auf Zehntel gerundet 2,5 ergibt?',['Ja, Runden macht es leichter.','Nein, die tatsächliche Masse liegt über der Grenze.'],1,'Ein gerundeter Wert verändert die echte Masse nicht.','Bei einer Belastungsgrenze musst du den genauen Wert vergleichen.')
 ],true),
 Q('h1','harbor','Leinen los!','Käpt’n Lio','Das kleine Segelboot braucht eine passende Leine. Auf den Rollen stehen verschiedene Längeneinheiten.','Das Segelboot bekommt eine neue Leine und ein Segel.','boat',-6,1,[
 N('Die Leine soll 2,35 m lang sein. Wie viele Zentimeter sind das?','235','cm','1 m = 100 cm. Multipliziere mit 100.','2,35 m = 235 cm.'),
 N('Ein Brett ist 85 cm lang. Trage seine Länge in Metern ein.','0.85','m','Teile die Zentimeterzahl durch 100.','85 cm = 0,85 m.'),
 C('Bis zur Insel sind es 1,2 km. Welche Entfernung zeigt der Schiffsmesser in Metern?',['12 m','120 m','1200 m'],2,'1 km = 1000 m.','1,2 km = 1200 m.')
 ]),
 Q('h2','harbor','Die Ladung der Wolkenfähre','Tami · Hafenmeisterin','Die Fähre muss richtig beladen werden. Bringe die Angaben zuerst in dieselbe Einheit.','Die Fährenladung steht ordentlich gestapelt bereit.','crates',5,4,[
 N('Ein Sack wiegt 0,75 kg. Wie viele Gramm zeigt die Waage?','750','g','1 kg = 1000 g.','0,75 kg = 750 g.'),
 N('Die kleine Kiste wiegt 1250 g. Wie viele Kilogramm sind das?','1.25','kg','Teile durch 1000; 1000 g sind 1 kg.','1250 g = 1,25 kg.'),
 K('Eine Trage darf höchstens 1,5 kg aufnehmen. Ordne die einzelnen Pakete zu.',['1400 g','1,6 kg','1500 g'],['passt','zu schwer'],[0,1,0],'Schreibe 1,5 kg als 1500 g.','1400 g und 1500 g passen. 1,6 kg = 1600 g ist zu schwer.')
 ]),
 Q('h3','harbor','Wasser für die Reise','Tami · Hafenmeisterin','Fülle die Reisegefäße. Achte auf Liter und Milliliter, damit nichts überläuft.','Der Wassertank ist wieder gefüllt.','tank',6,-6,[
 N('Der Krug fasst 1,25 l. Wie viele Milliliter sind das?','1250','ml','1 l = 1000 ml.','1,25 l = 1250 ml.'),
 N('Die Feldflasche enthält 350 ml. Schreibe die Menge in Litern.','0.35','l','350/1000 l ergibt die Dezimalzahl.','350 ml = 0,35 l.'),
 M('Gesucht sind alle Gefäße mit genau 0,5 l Inhalt.',['500 ml','50 ml','0,50 l','5 l'],[0,2],'Ein halber Liter sind 500 Milliliter.','0,5 l = 500 ml = 0,50 l.')
 ]),
 Q('h4','harbor','Der Fahrplan der Fähre','Käpt’n Lio','Fahrzeit und Fahrpreis stehen fest. Aber Achtung: Eine Stunde hat keine hundert Minuten!','Die Hafenuhr geht wieder und der Fahrplan hängt.','clock',-6,-6,[
 N('Die Fahrt dauert 1,5 h. Wie viele Minuten sind das?','90','min','1 h sind 60 min; 0,5 h sind 30 min.','1,5 · 60 min = 90 min.'),
 C('Was bedeutet eine Fahrzeit von 1,25 h?',['1 h 25 min','1 h 15 min','1 h 50 min'],1,'0,25 h ist eine Viertelstunde.','0,25 · 60 min = 15 min. Also 1 h 15 min.'),
 N('Ein Fahrschein kostet 2,35 €. Wie viele Cent musst du bezahlen?','235','ct','1 € = 100 ct.','2,35 € = 235 ct. Anders als Zeit lässt sich Geld hier in Hundertstel umrechnen.')
 ]),
 Q('h5','harbor','Der neue Lagerraum','Tami · Hafenmeisterin','Für den Hafenanbau vergleichen wir Flächen und Rauminhalte. Die Umrechnungsfaktoren sind nicht dieselben wie bei Längen.','Der Hafen erhält einen kleinen Lagerpavillon.','pavilion',0,7,[
 N('Die Bodenplatte hat 1,5 m² Fläche. Wie viele dm² sind das?','150','dm²','1 m² = 100 dm²: 10 Reihen mit je 10 Quadraten.','1,5 m² = 150 dm². Bei Flächen zählt der Faktor 100 pro Einheitenschritt.','area'),
 N('Eine Kiste fasst 0,25 m³. Wie viele dm³ sind das?','250','dm³','1 m³ = 1000 dm³: 10 · 10 · 10 kleine Würfel.','0,25 m³ = 250 dm³. Bei Rauminhalten zählt der Faktor 1000 pro Einheitenschritt.'),
 C('Ein Tank fasst 8 dm³. Welche Inhaltsangabe passt?',['0,8 l','8 l','800 l'],1,'Ein Würfel mit 1 dm Kantenlänge fasst genau 1 l.','1 dm³ = 1 l. Deshalb sind 8 dm³ genau 8 l.')
 ],true),
 Q('a1','market','Ein Korb für das Dorf','Bela · Markthändlerin','Packe den Versorgungskorb und berechne den Gesamtpreis. Unsere Taler lassen sich in hundert kleine Kupfer teilen.','Der Marktstand ist geöffnet und der Dorfkorb gefüllt.','stall',-6,-4,[
 N('Brot kostet 1,25 Taler, Äpfel kosten 2,40 Taler. Wie viel zahlst du zusammen?','3.65','Taler','Schreibe die Kommas untereinander: 1,25 + 2,40.','1,25 + 2,40 = 3,65. Addiere gleiche Stellenwerte.','addition'),
 N('Ein Käse kostet 0,85 Taler, dazu kommt Saft für 0,75 Taler. Wie viel kostet beides?','1.6','Taler','85 Hundertstel + 75 Hundertstel = 160 Hundertstel.','0,85 + 0,75 = 1,60. Zehn Hundertstel werden zu einem Zehntel.'),
 C('Bela rechnet 2,5 + 0,75 = 0,100. Welcher Ansatz ist richtig?',['2,50 + 0,75 = 3,25','0,25 + 0,75 = 1,00','2,5 + 7,5 = 10,0'],0,'Ganze Zahlen und Nachkommastellen behalten ihren Stellenwert.','Schreibe 2,5 als 2,50. Dann stehen die Stellen passend untereinander.')
 ]),
 Q('a2','market','Mehl für die Mondbäckerei','Bela · Markthändlerin','Drei Lieferungen kommen an. Berechne die Gesamtmenge, damit die Bäckerei planen kann.','In der Mondbäckerei duftet es wieder nach Brot.','house',6,-5,[
 N('Die erste Lieferung enthält 2,35 kg Mehl, die zweite 1,8 kg. Wie viel ist das zusammen?','4.15','kg','Ergänze die Null: 2,35 + 1,80.','2,35 kg + 1,80 kg = 4,15 kg.'),
 N('Ein Kräuterteig braucht 0,375 kg Roggen und 0,625 kg Weizen. Wie viel Mehl ist das?','1','kg','375 Tausendstel + 625 Tausendstel = 1000 Tausendstel.','0,375 + 0,625 = 1,000 = 1.'),
 C('Für 1,75 + 2,60 + 0,25 suchst du einen geschickten Rechenweg. Welcher nutzt ein glattes Zwischenergebnis?',['(1,75 + 0,25) + 2,60','1,75 + (2,60 + 0,25)'],0,'Welche beiden Zahlen ergänzen sich zu 2?','1,75 + 0,25 = 2. Danach 2 + 2,60 = 4,60. Bei Addition darfst du vertauschen und zusammenfassen.')
 ]),
 Q('a3','market','Die Lichtergirlande','Olli · Festplaner','Verbinde die vorhandenen Bänder zu einer langen Girlande. Rechne erst in derselben Einheit.','Eine bunte Girlande schmückt den Marktplatz.','banner',-6,5,[
 N('Zwei Bänder sind 1,2 m und 85 cm lang. Wie lang sind sie zusammen in Metern?','2.05','m','85 cm = 0,85 m.','1,20 m + 0,85 m = 2,05 m.'),
 N('Dazu kommen weitere 0,95 m. Wie lang ist die gesamte Girlande jetzt?','3','m','Rechne mit der bisherigen Länge 2,05 m weiter.','2,05 m + 0,95 m = 3,00 m.'),
 C('Warum darf man 1,2 m und 85 cm nicht als 1,2 + 85 = 86,2 m addieren?',['Die Einheiten müssen zuerst übereinstimmen.','Man darf keine Längen addieren.','Eine Zahl darf keine Null enthalten.'],0,'Die Zahlen zählen hier unterschiedlich große Einheiten.','Meter und Zentimeter sind unterschiedlich groß. Erst umrechnen, dann die Maßzahlen addieren.')
 ]),
 Q('a4','market','Das kleine Lichterfest','Olli · Festplaner','Plane den Einkauf für das Lichterfest. Prüfe zuerst die Größenordnung, dann die genaue Summe.','Der Festtisch ist gedeckt, die Lichter sind an.','table',6,6,[
 C('Drei Einkäufe kosten 3,95, 2,10 und 4,85 Taler. Welcher Überschlag passt?',['etwa 6 Taler','etwa 11 Taler','etwa 20 Taler'],1,'Runde auf ganze Taler: 4 + 2 + 5.','Der Überschlag ist 11 Taler.'),
 N('Wie hoch ist der genaue Gesamtpreis: 3,95 + 2,10 + 4,85 Taler?','10.9','Taler','3,95 + 4,85 = 8,80. Dazu kommen 2,10.','3,95 + 2,10 + 4,85 = 10,90 Taler.'),
 C('Du hast genau 11 Taler. Reicht das Geld für den Einkauf für 10,90 Taler?',['Ja, 0,10 Taler bleiben übrig.','Nein, 0,90 Taler fehlen.','Ja, genau ohne Rest.'],0,'Vergleiche 11,00 mit 10,90.','11,00 − 10,90 = 0,10 Taler. Der Überschlag war sinnvoll, die genaue Rechnung entscheidet.')
 ],true),
 Q('s1','cliffs','Das Seil der Bergbahn','Runa · Bergbaumeisterin','Die Bergbahn braucht ein passendes Seilstück. Bestimme, was übrig bleibt und was noch fehlt.','Die kleine Bergbahn ist wieder betriebsbereit.','lift',-6,2,[
 N('Ein Seil ist 5,8 m lang. Davon schneidest du 2,35 m ab. Wie viel bleibt übrig?','3.45','m','Schreibe 5,80 − 2,35; die Kommas stehen untereinander.','5,80 − 2,35 = 3,45 m.','subtraction'),
 N('Für ein Geländer brauchst du 4 m. Ein Stück ist schon 2,75 m lang. Wie viel fehlt?','1.25','m','Schreibe 4 als 4,00.','4,00 − 2,75 = 1,25 m.'),
 C('Welche Probe prüft 5,80 − 2,35 = 3,45?',['3,45 + 2,35 = 5,80','3,45 − 2,35 = 5,80','5,80 + 2,35 = 3,45'],0,'Addition macht die Subtraktion rückgängig.','Rest + abgeschnittenes Stück = ursprüngliche Länge.')
 ]),
 Q('s2','cliffs','Die Statue am Pass','Runa · Bergbaumeisterin','Unsere Statue bekommt einen Sockel. Fehlende Höhen kannst du auch rückwärts berechnen.','Die Gipfelstatue steht auf ihrem vollständigen Sockel.','statue',5,5,[
 N('Die fertige Statue soll 3,2 m hoch sein. Die Figur selbst ist 2,47 m hoch. Wie hoch muss der Sockel sein?','0.73','m','Gesamthöhe minus Figurenhöhe ergibt die Sockelhöhe.','3,20 − 2,47 = 0,73 m.'),
 N('Vom 0,73-m-Sockel steht bereits ein 0,28-m-Stück. Welche Höhe fehlt noch?','0.45','m','Rechne 0,73 − 0,28.','0,73 − 0,28 = 0,45 m.'),
 N('Ein anderes Bauteil erfüllt x + 1,85 m = 3 m. Wie lang ist x?','1.15','m','Die Umkehraufgabe lautet 3,00 − 1,85.','x = 1,15 m, denn 1,15 + 1,85 = 3,00.')
 ]),
 Q('s3','cliffs','Der Bergsee braucht Hilfe','Nori · Lichtsammlerin','Aus dem Vorratstank wurde Wasser entnommen. Behalte Rest und Verbrauch auseinander.','Der reparierte Vorratstank versorgt die Berggärten.','tank',6,-6,[
 N('Im Tank sind 10 l. Die Gärtner entnehmen 3,675 l. Wie viel bleibt?','6.325','l','Schreibe 10,000 − 3,675.','10,000 − 3,675 = 6,325 l.'),
 N('Von den 6,325 l werden noch 1,2 l gebraucht. Wie viel bleibt danach?','5.125','l','Schreibe 1,2 als 1,200.','6,325 − 1,200 = 5,125 l.'),
 C('Wie berechnest du den gesamten Rest direkt aus dem Anfangsvorrat?',['10 − (3,675 + 1,2)','10 − (3,675 − 1,2)','10 + 3,675 − 1,2'],0,'Beide entnommenen Mengen werden vom Anfangsvorrat abgezogen.','10 − 3,675 − 1,2 = 10 − (3,675 + 1,2).')
 ]),
 Q('s4','cliffs','Die letzte Brücke','Runa · Bergbaumeisterin','Plane die fehlenden Brückenteile und prüfe den Materialvorrat.','Die Aussichtsbrücke erhält ein vollständiges Geländer.','bridge',-6,-6,[
 N('Die Brücke soll 8,5 m lang werden. Ein Teil misst 3,75 m, ein zweiter 2,8 m. Welche Länge fehlt?','1.95','m','Erst die vorhandenen Längen addieren, dann von 8,50 abziehen.','3,75 + 2,80 = 6,55; 8,50 − 6,55 = 1,95 m.'),
 N('Für das fehlende Stück liegt ein 2,4-m-Brett bereit. Wie viel Verschnitt bleibt?','0.45','m','Du brauchst 1,95 m vom 2,40-m-Brett.','2,40 − 1,95 = 0,45 m.'),
 C('Ein Helfer rechnet 8,5 − 3,75 − 2,8 als 8,5 − (3,75 − 2,8). Ist das richtig?',['Ja, Klammern kann man immer frei setzen.','Nein, in der Klammer müssten die beiden abzuziehenden Längen addiert werden.'],1,'Vergleiche die Bedeutung: Zwei Stücke sind bereits vorhanden.','Richtig ist 8,5 − (3,75 + 2,8). Subtraktion erlaubt nicht beliebiges Umklammern.')
 ],true),
 Q('m1','mill','Die Mühle dreht sich wieder','Momo · Müller','Gleiche Mengen werden vervielfacht. Rechne aus, wie viel die Mühle für mehrere Säcke mahlen soll.','Die Flügel der Malmühle drehen sich wieder.','mill',-6,-5,[
 N('Ein Beutel enthält 0,75 kg Mehl. Wie viel Mehl steckt in 4 solchen Beuteln?','3','kg','Vier gleiche Mengen: 0,75 + 0,75 + 0,75 + 0,75.','4 · 0,75 kg = 3,00 kg.'),
 N('Ein kleiner Sack enthält 1,25 kg. Wie viel sind 6 Säcke?','7.5','kg','125 · 6 = 750. Beachte zwei Nachkommastellen.','6 · 1,25 kg = 7,50 kg.'),
 C('Welche Rechnung beschreibt 5 Flaschen mit je 0,4 l?',['5 + 0,4','5 · 0,4','5 : 0,4'],1,'Die gleiche Menge kommt fünfmal vor.','5 · 0,4 l = 2 l. Multiplikation fasst gleiche Summanden zusammen.')
 ]),
 Q('m2','mill','Der schwebende Kräutergarten','Momo · Müller','Das neue Beet wird rechteckig. Seine Fläche entsteht aus Länge mal Breite.','Im Kräutergarten sprießen neue Pflanzen.','garden',6,-5,[
 N('Ein Beet ist 1,2 m lang und 0,5 m breit. Wie groß ist seine Fläche?','0.6','m²','12 · 5 = 60. Beide Faktoren haben zusammen zwei Nachkommastellen.','1,2 · 0,5 = 0,60 m². Die halbe Breite ergibt die halbe Fläche.','area'),
 N('Ein zweites Beet ist 2,4 m lang und 1,5 m breit. Berechne die Fläche.','3.6','m²','2,4 · (1 + 0,5) = 2,4 + 1,2.','2,4 · 1,5 = 3,60 m².'),
 C('Warum ist 3 · 0,4 kleiner als 3?',['Multiplizieren macht immer größer.','0,4 ist kleiner als 1; es werden nur vier Zehntel von 3 genommen.','Das Komma wird immer gestrichen.'],1,'Vergleiche mit 3 · 1 = 3.','3 · 0,4 = 1,2. Ein positiver Faktor unter 1 verkleinert.')
 ]),
 Q('m3','mill','Stoff für die Windsegel','Tessa · Weberin','Berechne Stoffpreise und vergrößere Muster um Zehnerfaktoren.','Die Weberei zeigt neue bunte Windsegel.','banner',6,5,[
 N('Stoff kostet 2,40 Taler je Meter. Du kaufst 1,5 m. Wie viel kostet das?','3.6','Taler','Ein Meter kostet 2,40; ein halber Meter 1,20.','2,40 · 1,5 = 3,60 Taler.'),
 N('Ein 0,037 m langes Muster wird auf das Zehnfache vergrößert. Wie lang ist es dann?','0.37','m','Beim Verzehnfachen wird jede Ziffer eine Stelle wertvoller.','0,037 · 10 = 0,37 m.'),
 N('Ein Fadenstück misst 0,46 m. Wie lang sind 100 solcher Stücke zusammen?','46','m','Beim Malnehmen mit 100 wird jede Ziffer zwei Stellen wertvoller.','0,46 · 100 = 46 m.')
 ]),
 Q('m4','mill','Der Kristallverstärker','Tessa · Weberin','Verstärke das Mühlenlicht. Nutze passende Rechenwege und prüfe die Größe des Ergebnisses.','Ein goldener Kristall versorgt die Mühle mit Licht.','crystal',-6,5,[
 N('Ein Kristall liefert 0,8 Lichtpunkte. Der Verstärker vervielfacht sie mit 0,25. Wie viele Lichtpunkte entstehen?','0.2','','0,25 bedeutet ein Viertel.','0,8 · 0,25 = 0,20. Ein Viertel von 0,8 ist 0,2.'),
 C('Welcher Rechenweg berechnet 4 · 2,75 geschickt?',['4 · 2 + 4 · 0,75','4 · 2 + 0,75','4 + 2 + 0,75'],0,'Verteile den Faktor 4 auf beide Teile der Summe.','4 · (2 + 0,75) = 8 + 3 = 11. Das ist das Verteilungsgesetz.'),
 N('Zwei Verstärker liefern je 1,25 · 2,4 Lichtpunkte. Wie viele Lichtpunkte liefern beide zusammen?','6','','Zuerst 1,25 · 2,4 = 3; dann verdoppeln.','2 · (1,25 · 2,4) = 2 · 3 = 6.')
 ],true),
 Q('d1','cave','Der hungrige Schleimling','Bloop · Grottenbewohner','Bloop ist nicht böse, nur hungrig. Teile den Beerensaft fair, dann lässt er dich zum Grottenfeuer.','Bloop ist satt und wird dein Freund.','slime',-6,3,[
 N('Vier Schleimlinge teilen 3 l Beerensaft gerecht. Wie viel bekommt jeder?','0.75','l','3 : 4 entspricht drei Vierteln.','3 l : 4 = 0,75 l pro Schleimling.'),
 N('6 kg Beeren werden in 8 gleiche Portionen geteilt. Wie schwer ist eine Portion?','0.75','kg','60 Zehntel : 8 = 7 Zehntel, Rest 4 Zehntel; teile weiter.','6 : 8 = 0,75. Prüfe: 8 · 0,75 = 6.'),
 C('Welche Probe passt zu 4,8 : 6 = 0,8?',['0,8 · 6 = 4,8','4,8 · 6 = 0,8','6 : 0,8 = 4,8'],0,'Multiplikation macht das Teilen rückgängig.','Portionsgröße · Anzahl = Gesamtmenge.')
 ]),
 Q('d2','cave','Die Trankwerkstatt','Fips · Pilzalchemist','Fülle Tränke in gleich große Fläschchen. Diesmal suchst du die Anzahl der Portionen.','Die Trankwerkstatt ist mit leuchtenden Flaschen gefüllt.','mushroom',6,4,[
 N('Du hast 2,4 l Trank. Jede Flasche fasst 0,3 l. Wie viele volle Flaschen erhältst du?','8','Flaschen','Rechne in Zehntellitern: 24 : 3.','2,4 : 0,3 = 24 : 3 = 8.'),
 N('In einem Kessel sind 4,5 l. Wie viele Becher zu je 0,75 l lassen sich füllen?','6','Becher','Erweitere beide Zahlen mit 100: 450 : 75.','4,5 : 0,75 = 450 : 75 = 6.'),
 C('Was passiert bei 2 : 0,5?',['Das Ergebnis ist 1.','Das Ergebnis ist 4, weil vier Hälften in 2 passen.','Das Ergebnis ist immer kleiner als 2.'],1,'Wie viele halbe Liter passen in zwei Liter?','2 : 0,5 = 4. Teilen durch eine positive Zahl unter 1 vergrößert die Maßzahl.')
 ]),
 Q('d3','cave','Die Tür der Zehner','Fips · Pilzalchemist','Die Runentür prüft, wie sich Zahlen beim Teilen verändern. Verschiebe die Stellenwerte sicher.','Die alte Runentür leuchtet und steht offen.','gate',5,-6,[
 N('Ein Kristall von 4,8 kg wird in 10 gleiche Stücke geteilt. Wie schwer ist ein Stück?','0.48','kg','Beim Teilen durch 10 wird jede Ziffer eine Stelle weniger wert.','4,8 : 10 = 0,48 kg.'),
 N('2,5 l werden auf 100 gleich große Fläschchen verteilt. Wie viel enthält jedes?','0.025','l','Teile erst durch 10, dann noch einmal durch 10.','2,5 : 100 = 0,025 l = 25 ml.'),
 C('Welche Umformung lässt 3,6 : 0,12 unverändert?',['36 : 0,12','360 : 12','3,6 : 12'],1,'Du musst Dividend und Divisor mit derselben Zahl multiplizieren.','3,6 : 0,12 = 360 : 12 = 30. Beide Zahlen wurden mit 100 multipliziert.')
 ]),
 Q('d4','cave','Der Hüter der Teilgrotten','Glubsch · Grottenhüter','Der große Hüter möchte ein gerechtes Grottenfest. Löse seine drei Versorgungsrätsel.','Der Grottenhüter ist besänftigt. Ein Sternenlicht erwacht.','boss',-6,-6,[
 N('5,25 kg Pilze werden auf 7 Körbe verteilt. Wie viele Kilogramm kommen in jeden Korb?','0.75','kg','Prüfe, welche Zahl mit 7 multipliziert 5,25 ergibt.','5,25 : 7 = 0,75 kg.'),
 N('3,6 m Band werden in Stücke von je 0,45 m geteilt. Wie viele Stücke erhältst du?','8','Stücke','Multipliziere beide Maßzahlen mit 100: 360 : 45.','3,6 : 0,45 = 8 Stücke.'),
 N('Du brauchst 8 Becher mit je 0,3 l. Im Krug sind 1,8 l. Wie viel Trank fehlt noch?','0.6','l','Gesamtbedarf: 8 · 0,3 l. Ziehe dann den Vorrat ab.','8 · 0,3 − 1,8 = 2,4 − 1,8 = 0,6 l.')
 ],true),
 Q('k1','castle','Die Versorgung der Sternenburg','Ari · Sternenhüter','Die Burg bereitet sich auf das Sternenfest vor. Plane Vorräte, Kosten und die letzte Lieferung.','Der Burghof erhält Vorräte und bunte Wimpel.','tower',-6,3,[
 N('12 Gäste trinken je 0,25 l Saft. Wie viele Liter braucht ihr?','3','l','Vier Viertelliter ergeben einen Liter.','12 · 0,25 = 3 l.'),
 N('Saft kostet 1,40 Taler je Liter. Wie viel kosten die benötigten 3 l?','4.2','Taler','Multipliziere die benötigte Menge mit dem Preis je Liter.','3 · 1,40 = 4,20 Taler.'),
 N('Im Burgtank sind schon 750 ml. Wie viele Liter fehlen bis zu den benötigten 3 l?','2.25','l','750 ml = 0,75 l.','3 − 0,75 = 2,25 l.')
 ],true),
 Q('k2','castle','Die Schatzkammer','Ari · Sternenhüter','Nicht jede glänzende Rechnung passt zur Geschichte. Wähle ein Modell und rechne mit ihm.','Die Schatzkammer öffnet sich.','chest',6,4,[
 C('Drei Lampen kosten je 2,50 Taler. Für alles zusammen gibt es 1,20 Taler Rabatt. Welche Rechnung passt?',['3 · (2,50 − 1,20)','3 · 2,50 − 1,20','3 + 2,50 − 1,20'],1,'Der Rabatt wird nur einmal vom gesamten Preis abgezogen.','Erst die drei Lampen bezahlen, dann den einmaligen Rabatt abziehen.'),
 N('Wie viel kosten die drei Lampen nach dem einmaligen Rabatt von 1,20 Talern?','6.3','Taler','Punkt vor Strich: zuerst 3 · 2,50.','3 · 2,50 − 1,20 = 7,50 − 1,20 = 6,30 Taler.'),
 N('Drei Freunde teilen diese 6,30 Taler gerecht. Wie viel zahlt jeder?','2.1','Taler','Teile den Gesamtpreis durch 3.','6,30 : 3 = 2,10 Taler pro Person.')
 ],true),
 Q('k3','castle','Der kleine Sternendrache','Yumi · Sternendrache','Yumi bewacht das Licht. Sie möchte keine Kämpfe, sondern passende Schutzsteine und einen gut geplanten Flug.','Yumi schließt Freundschaft mit dir.','dragon',-6,-6,[
 O('Ordne die Schutzsteine von der kleinsten zur größten Kraft.',['2,05','2,5','2,005','2,15'],[2,0,3,1],'Ergänze auf Tausendstel: 2,050; 2,500; 2,005; 2,150.','2,005 < 2,050 < 2,150 < 2,500.'),
 N('Yumi braucht 0,45 kg Sternenfutter je Flugrunde. Wie viel braucht sie für 6 Runden?','2.7','kg','Rechne 45 · 6 und setze zwei Nachkommastellen.','0,45 · 6 = 2,70 kg.'),
 N('3 kg Futter liegen bereit. Wie viel bleibt nach den 6 Runden übrig?','0.3','kg','Ziehe den Bedarf 2,70 kg vom Vorrat ab.','3,00 − 2,70 = 0,30 kg.')
 ],true),
 Q('k4','castle','Das große Sternenlicht','Ari · Sternenhüter','Bring das Sternenlicht zurück. Erst mit den drei anderen Burgquests und diesem letzten Bauplan ist das Fest vollständig.','Das Sternenlicht strahlt über ganz Kommaland.','beacon',6,-6,[
 N('Für vier Lichtbögen brauchst du je 1,25 m Band. Weitere 0,8 m schmücken die Spitze. Wie viel Band brauchst du insgesamt?','5.8','m','Erst 4 · 1,25; danach 0,8 addieren.','4 · 1,25 + 0,8 = 5 + 0,8 = 5,8 m.'),
 N('Eine Rolle hat 8 m Band. Wie viel bleibt nach dem Bau übrig?','2.2','m','Ziehe den Gesamtbedarf 5,8 m ab.','8,0 − 5,8 = 2,2 m.'),
 N('Aus den restlichen 2,2 m werden Schleifen mit je 0,55 m Band. Wie viele Schleifen entstehen?','4','Schleifen','Rechne 2,2 : 0,55 als 220 : 55.','2,2 : 0,55 = 4. Dein Bauplan geht genau auf!')
 ],true)
];
export const INFO = {
 village:[
  {title:'Was ist eine Dezimalzahl?',text:'Zwischen ganzen Zahlen liegen weitere Zahlen. Das Komma trennt die Einer von den kleineren Stellen.',examples:['2,47 = 2 + 0,4 + 0,07','0,6 = 6 Zehntel = 6/10'],visual:'place'},
  {title:'Jede Stelle hat einen Namen',text:'Nach dem Komma kommen Zehntel, Hundertstel und Tausendstel. Eine Null kann eine freie Stelle festhalten.',examples:['0,04 = 4 Hundertstel','0,004 = 4 Tausendstel'],visual:'places'},
  {title:'Gleicher Wert, anderes Kleid',text:'Nullen am Ende des Nachkommateils ändern den Wert nicht. Brüche lassen sich oft in Zehntel oder Hundertstel verwandeln.',examples:['0,5 = 0,50 = 5/10 = 1/2','3/4 = 75/100 = 0,75'],visual:'quarters'}
 ],
 forest:[
  {title:'Von links nach rechts vergleichen',text:'Vergleiche zuerst die ganzen Zahlen, dann Zehntel, Hundertstel … Die erste unterschiedliche Stelle entscheidet.',examples:['0,8 = 0,80 > 0,75','2,305 < 2,350 = 2,35'],visual:'compare'},
  {title:'Zahlen haben einen Platz',text:'Auf der Zahlengeraden liegen größere Zahlen weiter rechts. Achte immer auf die Schrittweite der Skala.',examples:['0 → 0,1 → 0,2 → … → 1','Zwischen 1,2 und 1,3 liegt 1,25.'],visual:'line'},
  {title:'Runden & überschlagen',text:'Die nächste Ziffer entscheidet: 0–4 bleibt, 5–9 rundet auf. Ein Überschlag prüft die Größenordnung; genaue Grenzen prüfst du exakt.',examples:['3,46 ≈ 3,5 (auf Zehntel)','2,9 + 4,1 ≈ 3 + 4 = 7'],visual:'round'}
 ],
 harbor:[
  {title:'Erst dieselbe Einheit',text:'Die Menge bleibt gleich, nur die Einheit und die Maßzahl ändern sich. Kleinere Einheit → größere Maßzahl.',examples:['1,25 m = 125 cm; 0,75 kg = 750 g','0,5 l = 500 ml; 2,35 € = 235 ct'],visual:'units'},
  {title:'Zeit tickt anders',text:'Eine Stunde hat 60 Minuten, keine 100. Dezimalstunden sind Anteile einer Stunde.',examples:['1,5 h = 1 h 30 min = 90 min','0,25 h = 15 min'],visual:'clock'},
  {title:'Fläche & Rauminhalt',text:'Bei Flächen ist der Faktor je benachbarter metrischer Einheit 100, bei Rauminhalten 1000. Ein dm³ fasst einen Liter.',examples:['1 m² = 100 dm²; 1 m³ = 1000 dm³','1 dm³ = 1 l; 0,25 m³ = 250 l'],visual:'area'}
 ],
 market:[
  {title:'Gleiche Stellen addieren',text:'Komma unter Komma. Ergänze Nullen und addiere Einer zu Einern, Zehntel zu Zehnteln und so weiter.',examples:['1,25 + 2,40 = 3,65','2,5 + 0,75 = 2,50 + 0,75 = 3,25'],visual:'addition'},
  {title:'Bündeln & übertragen',text:'10 Hundertstel sind 1 Zehntel. 10 Zehntel sind 1 Einer. Übertrage die volle Einheit auf die nächste Stelle.',examples:['0,85 + 0,75 = 1,60','0,375 + 0,625 = 1,000'],visual:'hundred'},
  {title:'Geschickt zusammenfassen',text:'Bei Addition darfst du die Reihenfolge ändern und passende Summanden zusammenfassen. Größen vorher gleichnamig machen.',examples:['1,75 + 2,6 + 0,25 = 2 + 2,6 = 4,6','1,2 m + 85 cm = 1,20 m + 0,85 m'],visual:'group'}
 ],
 cliffs:[
  {title:'Was übrig bleibt',text:'Schreibe die Kommas untereinander. Ergänze Nullen und entbündele bei Bedarf eine größere Einheit.',examples:['5,80 − 2,35 = 3,45','4,00 − 2,75 = 1,25'],visual:'subtraction'},
  {title:'Ergänzen & rückwärts rechnen',text:'Eine fehlende Menge findest du als Differenz. Mit Addition prüfst du dein Ergebnis.',examples:['x + 1,85 = 3 → x = 1,15','Probe: 1,15 + 1,85 = 3'],visual:'inverse'},
  {title:'Zwei Abzüge',text:'Ziehst du zwei Mengen ab, kannst du ihre Summe abziehen. Vertauschen oder beliebiges Umklammern geht hier nicht.',examples:['8,5 − 3,75 − 2,8 = 8,5 − (3,75 + 2,8)','10 − 3,675 − 1,2 = 5,125'],visual:'group'}
 ],
 mill:[
  {title:'Gleiche Mengen vervielfachen',text:'Multiplizieren fasst gleiche Summanden zusammen. Rechne zunächst ohne Komma; das Ergebnis erhält zusammen so viele Nachkommastellen wie die Faktoren.',examples:['4 · 0,75 = 3,00','1,2 · 0,5 = 0,60'],visual:'multiply'},
  {title:'Nicht immer größer!',text:'Mal 0,5 bedeutet die Hälfte. Mal 0,25 bedeutet ein Viertel. Ein positiver Faktor unter 1 verkleinert.',examples:['3 · 0,4 = 1,2','0,8 · 0,25 = 0,2'],visual:'quarters'},
  {title:'Zehnerfaktoren & Rechentricks',text:'Mal 10 macht jede Ziffer eine Stelle wertvoller. Du darfst einen Faktor auf die Teile einer Summe verteilen.',examples:['0,037 · 10 = 0,37; 0,46 · 100 = 46','4 · (2 + 0,75) = 8 + 3 = 11'],visual:'powers'}
 ],
 cave:[
  {title:'Verteilen oder Portionen zählen',text:'Beim Verteilen suchst du die Größe einer Portion. Beim Aufteilen suchst du die Anzahl gleich großer Portionen.',examples:['3 l : 4 = 0,75 l je Portion','2,4 l : 0,3 l = 8 Portionen'],visual:'divide'},
  {title:'Ein Divisor ohne Komma',text:'Multipliziere beide Zahlen mit demselben Zehnerfaktor, bis der Divisor ganzzahlig ist. Der Quotient bleibt gleich.',examples:['2,4 : 0,3 = 24 : 3 = 8','4,5 : 0,75 = 450 : 75 = 6'],visual:'powers'},
  {title:'Probe & Größenordnung',text:'Prüfe mit Multiplikation. Durch 10 teilen macht jede Ziffer eine Stelle weniger wert. Durch eine positive Zahl unter 1 teilen vergrößert die Maßzahl.',examples:['4,8 : 10 = 0,48; Probe: 0,48 · 10 = 4,8','2 : 0,5 = 4; Probe: 4 · 0,5 = 2'],visual:'inverse'}
 ],
 castle:[
  {title:'Von der Geschichte zur Rechnung',text:'Was ist gesucht? Welche Angaben brauchst du? Gleiche Mengen → mal. Gesamtmenge verteilen → geteilt. Dazu → plus. Rest → minus.',examples:['12 Becher zu 0,25 l → 12 · 0,25 = 3 l','3 l Bedarf − 0,75 l Vorrat = 2,25 l'],visual:'group'},
  {title:'Klammern, Punkt, Strich',text:'Rechne zuerst in Klammern, dann Multiplikation und Division, danach Addition und Subtraktion. Gleichrangige Operationen von links nach rechts.',examples:['3 · 2,50 − 1,20 = 6,30','3 · (2,50 − 1,20) = 3,90'],visual:'operations'},
  {title:'Passt das Ergebnis zur Welt?',text:'Nutze Überschlag oder Umkehraufgabe. Prüfe die Einheit und entscheide, ob die Zahl in der Geschichte sinnvoll ist.',examples:['2,2 m : 0,55 m = 4 Schleifen','Probe: 4 · 0,55 m = 2,2 m'],visual:'inverse'}
 ]};
export const regionById = id => REGIONS.find(r => r.id === id);
export const questById = id => QUESTS.find(q => q.id === id);
export const questsIn = id => QUESTS.filter(q => q.region === id);
export function regionUnlocked(id, completed) {
 const r = regionById(id); if(!r) return false;
 return r.unlock.every(key => key === 'seals' ? REGIONS.filter(x=>x.id!=='castle').every(x=>questsIn(x.id).filter(q=>completed[q.id]).length>=2) : !!completed[key]);
}
export function questUnlocked(q, completed) {
 return regionUnlocked(q.region, completed) && (q.id !== 'k4' || ['k1','k2','k3'].every(id=>completed[id]));
}
export function requirementText(id, completed) {
 if (id==='castle') {
  const missing=REGIONS.filter(r=>r.id!=='castle'&&questsIn(r.id).filter(q=>completed[q.id]).length<2);
  return 'Je 2 Quests abschließen in: '+missing.map(r=>r.name).join(', ')+'.';
 }
 return regionById(id).unlock.filter(q=>!completed[q]).map(q=>'Erst „'+questById(q).title+'“ abschließen.').join(' ');
}
/** Short retrieval encounters only use regions where the player has completed quests. */
export function makeEncounter(completed, count) {
 const known=REGIONS.filter(r=>r.id!=='castle'&&questsIn(r.id).some(q=>completed[q.id]));
 const region=known[count % Math.max(known.length,1)]?.id || 'village';
 const n=1+(count%5);
 const pools={
 village:N(`Ein Irrlicht sammelt ${n} Zehntel Liter Tau. Schreibe seine Menge als Dezimalzahl.`,(n/10).toFixed(1),'l','Ein Zehntel ist 0,1.','Zehntel stehen direkt rechts vom Komma.'),
 forest:C(`Welcher Weg ist kürzer: ${n},8 km oder ${n},75 km?`,[`${n},8 km`,`${n},75 km`],1,'Ergänze eine Null: ,80 und ,75.','75 Hundertstel sind weniger als 80 Hundertstel.'),
 harbor:N(`Der Waldkobold hat ${n},5 m Seil. Wie viele Zentimeter sind das?`,n*100+50,'cm','1 m = 100 cm.','Die Maßzahl wird mit 100 multipliziert.'),
 market:N(`Zwei Pilze kosten ${n},25 und 0,75 Taler. Was kosten sie zusammen?`,n+1,'Taler','0,25 + 0,75 = 1.','Fasse die Nachkommateile zu einem ganzen Taler zusammen.'),
 cliffs:N(`Ein Beutel enthält ${n+2},5 kg. Du gibst 1,25 kg ab. Wie viel bleibt?`,(n+1.25).toFixed(2),'kg','Schreibe beide Zahlen mit zwei Nachkommastellen.','Subtrahiere mit Komma unter Komma.'),
 mill:N(`Zwei Mooswesen brauchen je ${n},25 l Wasser. Wie viel brauchen beide?`,(2*n+0.5).toFixed(1),'l','Verdopple die Menge.','Zwei gleiche Mengen werden mit 2 multipliziert.'),
 cave:N(`Du verteilst ${n} l Saft auf Flaschen zu 0,5 l. Wie viele Flaschen füllst du?`,n*2,'Flaschen','In einen Liter passen zwei halbe Liter.','Teilen durch 0,5 zählt die Hälften.')
 };
 return {id:'encounter',region,title:'Halt, ein kleines Rätsel!',npc:'Miko · Waldkobold',story:'Ich sammle kluge Gedanken, keine Taler. Löse mein Rätsel – oder geh in Ruhe weiter.',reward:'Miko hüpft zufrieden zurück in den Wald.',tasks:[pools[region]],kind:'slime'};
}

import {evolveContent} from './evolution.js';
/** Kommaland 2.0: original, explicitly scaffolded learning content. */
export const REGIONS = [
 {
  "id": "village",
  "name": "Funkeldorf",
  "topic": "Dezimalzahlen verstehen",
  "tag": "DEIN ZUHAUSE",
  "icon": "home",
  "color": "#65996d",
  "x": 0,
  "z": 24,
  "r": 20,
  "h": 1.3,
  "unlock": [],
  "hint": "Beginne bei der Weglaterne: Was liegt zwischen 2 und 3?"
 },
 {
  "id": "forest",
  "name": "Flüsterwald",
  "topic": "Vergleichen & runden",
  "tag": "DER PFAD DER ZAHLEN",
  "icon": "leaf",
  "color": "#468979",
  "x": -37,
  "z": -2,
  "r": 18,
  "h": 1.8,
  "unlock": [
   "v0d"
  ],
  "hint": "Der Waldhüter zeigt dir, wie du Zahlen vergleichst."
 },
 {
  "id": "harbor",
  "name": "Maßhafen",
  "topic": "Größen & Einheiten",
  "tag": "ALLES HAT EIN MASS",
  "icon": "anchor",
  "color": "#629faf",
  "x": -38,
  "z": 40,
  "r": 17,
  "h": 1.1,
  "unlock": [
   "v2"
  ],
  "hint": "Am Hafen werden Ladungen gewogen und Wege gemessen."
 },
 {
  "id": "market",
  "name": "Summenmarkt",
  "topic": "Dezimalzahlen addieren",
  "tag": "ZUSAMMEN WIRD ES MEHR",
  "icon": "bag",
  "color": "#d6a052",
  "x": 37,
  "z": 28,
  "r": 18,
  "h": 1.4,
  "unlock": [
   "v2"
  ],
  "hint": "Hilf beim Einkaufen und beim großen Marktessen."
 },
 {
  "id": "cliffs",
  "name": "Differenzklippen",
  "topic": "Dezimalzahlen subtrahieren",
  "tag": "WAS NOCH FEHLT",
  "icon": "mountain",
  "color": "#b28b7e",
  "x": 57,
  "z": -12,
  "r": 17,
  "h": 5.4,
  "unlock": [
   "a1"
  ],
  "hint": "Berechne Vorräte und fehlende Stücke für den Aufstieg."
 },
 {
  "id": "mill",
  "name": "Malmühle",
  "topic": "Dezimalzahlen multiplizieren",
  "tag": "KLEINE MENGEN, GROSSE WIRKUNG",
  "icon": "wind",
  "color": "#a1a763",
  "x": 13,
  "z": -14,
  "r": 18,
  "h": 3.2,
  "unlock": [
   "a2"
  ],
  "hint": "Die Mühle braucht Mehl, Stoff und einen neuen Garten."
 },
 {
  "id": "cave",
  "name": "Teilgrotten",
  "topic": "Dezimalzahlen dividieren",
  "tag": "TEILEN VERBINDET",
  "icon": "gem",
  "color": "#9a88bb",
  "x": -27,
  "z": -39,
  "r": 18,
  "h": 3.9,
  "unlock": [
   "m3"
  ],
  "hint": "Besänftige die Grottenwesen mit fair geteilten Vorräten."
 },
 {
  "id": "castle",
  "name": "Sternenburg",
  "topic": "Vernetzen & anwenden",
  "tag": "DAS GROSSE FINALE",
  "icon": "star",
  "color": "#b1a36d",
  "x": 16,
  "z": -57,
  "r": 19,
  "h": 5.1,
  "unlock": [
   "v4",
   "f4",
   "h3",
   "a4",
   "s4",
   "m4",
   "d4"
  ],
  "hint": "Die vorbereitenden Bauprojekte führen Schritt für Schritt zum Sternenfest."
 }
];
export const PATHS = [
 [
  "village",
  "forest"
 ],
 [
  "village",
  "harbor"
 ],
 [
  "village",
  "market"
 ],
 [
  "village",
  "mill"
 ],
 [
  "forest",
  "cave"
 ],
 [
  "forest",
  "harbor"
 ],
 [
  "market",
  "cliffs"
 ],
 [
  "market",
  "mill"
 ],
 [
  "mill",
  "cave"
 ],
 [
  "mill",
  "castle"
 ],
 [
  "cliffs",
  "castle"
 ]
];
export const QUESTS = [
 {
  "id": "v0a",
  "region": "village",
  "title": "Eine Laterne in der Mitte",
  "npc": "Mila · Brunnenhüterin",
  "story": "Am Dorfweg fehlt eine Laterne. Sie soll genau zwischen die Schilder „2 m“ und „3 m“. Wir beginnen mit ganzen und halben Metern.",
  "reward": "Die kleine Weglaterne wird aufgebaut und leuchtet.",
  "kind": "lantern",
  "x": -6,
  "z": 10,
  "tasks": [
   {
    "type": "choice",
    "text": "Zwischen dem Schild bei 2 m und dem Schild bei 3 m liegt die Hälfte des Wegstücks. Wie weit ist diese Stelle vom Weganfang entfernt?",
    "options": [
     "2 m",
     "2 und ein halber Meter",
     "3 m"
    ],
    "answer": 1,
    "hint": "Nimm zwei ganze Meter und vom nächsten Meter die Hälfte.",
    "why": "Zwei ganze Meter plus ein halber Meter liegen genau zwischen 2 m und 3 m.",
    "lesson": "between",
    "skill": "Was liegt zwischen 2 und 3?"
   },
   {
    "type": "choice",
    "text": "Die Laterne steht bei zwei und einem halben Meter. Welches kurze Schild passt dazu?",
    "options": [
     "2,5 m",
     "2 m",
     "3,5 m"
    ],
    "answer": 0,
    "hint": "Zweieinhalb schreiben wir auch 2,5.",
    "why": "Das passende Schild heißt 2,5 m. Gleich erfährst du, warum die 5 für die Hälfte steht.",
    "lesson": "half-name",
    "skill": "Ein neuer Name für „zweieinhalb“"
   },
   {
    "type": "choice",
    "text": "Ein zweites Schild zeigt 1,5 m. Wie viel Seil brauchst du bis dorthin?",
    "options": [
     "Einen ganzen und einen halben Meter",
     "Eineinhalb Zentimeter",
     "Fünf ganze Meter"
    ],
    "answer": 0,
    "hint": "Links vom Komma steht hier ein ganzer Meter.",
    "why": "1,5 m heißt ein und ein halber Meter.",
    "lesson": "half-name",
    "skill": "Ein neuer Name für „zweieinhalb“"
   }
  ],
  "requires": [],
  "advanced": false,
  "goal": "Was liegt zwischen 2 und 3?",
  "extension": false
 },
 {
  "id": "v0b",
  "region": "village",
  "title": "Zehn Steine bis zum Ganzen",
  "npc": "Pip · Wegfinder",
  "story": "Wir markieren den nächsten Meter mit zehn gleich großen Abschnitten. So sehen wir, was die erste Stelle nach dem Komma bedeutet.",
  "reward": "Zehn kleine Messsteine bilden einen hellen Zahlenweg.",
  "kind": "stones",
  "x": 2,
  "z": 12,
  "tasks": [
   {
    "type": "choice",
    "text": "Ein Meter wird in zehn gleich lange Stücke geteilt. Wie heißt ein Stück?",
    "options": [
     "Ein Zehntel Meter",
     "Ein halber Meter",
     "Zehn Meter"
    ],
    "answer": 0,
    "hint": "Der Name kommt von den zehn gleichen Teilen.",
    "why": "Ein Stück ist ein Zehntel Meter. Zehn Stücke ergeben wieder 1 m.",
    "lesson": "tenths",
    "skill": "Ein Ganzes in zehn gleiche Teile"
   },
   {
    "type": "number",
    "text": "Wie viele der zehn gleich großen Stücke brauchst du für einen halben Meter?",
    "answer": "5",
    "unit": "Stücke",
    "hint": "Die Hälfte von zehn Stücken sind fünf Stücke.",
    "why": "Fünf Zehntel sind ein halb. Daher steht die 5 in 0,5 für fünf Zehntel.",
    "lesson": "half-tenths",
    "skill": "Darum passt die 5 zur Hälfte"
   },
   {
    "type": "number",
    "text": "Drei Zehntel Meter bekommen einen blauen Stein. Welche Dezimalzahl steht auf seinem Schild?",
    "answer": "0.3",
    "unit": "m",
    "hint": "Kein ganzer Meter: 0 vor dem Komma. Drei Zehntel: 3 danach.",
    "why": "Drei Zehntel Meter schreiben wir 0,3 m.",
    "lesson": "write-tenths",
    "skill": "Zehntel bekommen die erste Stelle"
   }
  ],
  "requires": [
   "v0a"
  ],
  "advanced": false,
  "goal": "Ein Ganzes in zehn gleiche Teile",
  "extension": false
 },
 {
  "id": "v1",
  "region": "village",
  "title": "Der verstummte Brunnen",
  "npc": "Mila · Brunnenhüterin",
  "story": "Der Brunnen misst zunächst nur in ganzen Litern und Zehntellitern. Lies diese beiden Stellen, damit sein Wasser wieder fließt.",
  "reward": "Der Dorfbrunnen sprudelt wieder.",
  "kind": "fountain",
  "x": 0,
  "z": 0,
  "tasks": [
   {
    "type": "choice",
    "text": "Der Brunnen soll 2,5 l abgeben. Welche Menge ist das?",
    "options": [
     "2 ganze Liter und 5 Zehntel Liter",
     "2 ganze Liter und 5 ganze Liter",
     "5 ganze Liter"
    ],
    "answer": 0,
    "hint": "Lies die Einer links und die Zehntel rechts vom Komma.",
    "why": "2,5 l sind zwei ganze und fünf Zehntel Liter: zweieinhalb Liter.",
    "lesson": "places-tenths",
    "skill": "Einer und Zehntel unterscheiden"
   },
   {
    "type": "number",
    "text": "Das Ventil braucht sieben Zehntel Liter Wasser. Welche Dezimalzahl stellst du ein?",
    "answer": "0.7",
    "unit": "l",
    "hint": "Die sieben gehört direkt rechts vom Komma.",
    "why": "Sieben Zehntel sind 0,7 l.",
    "lesson": "write-tenths",
    "skill": "Zehntel bekommen die erste Stelle"
   },
   {
    "type": "classify",
    "text": "Auf dem Messschild steht 3,6 l. Ordne die beiden Ziffern ihren Stellen zu.",
    "items": [
     "3",
     "6"
    ],
    "categories": [
     "Einer",
     "Zehntel"
    ],
    "answer": [
     0,
     1
    ],
    "hint": "Die Einer stehen links vom Komma; danach folgen die Zehntel.",
    "why": "Die 3 steht für drei Einer, die 6 für sechs Zehntel.",
    "lesson": "places-tenths",
    "skill": "Einer und Zehntel unterscheiden"
   }
  ],
  "requires": [
   "v0b"
  ],
  "advanced": false,
  "goal": "Einer und Zehntel unterscheiden",
  "extension": false
 },
 {
  "id": "v0c",
  "region": "village",
  "title": "Das Beet der Hundertstel",
  "npc": "Nori · Gärtnerin",
  "story": "Unser Beet bekommt ein feineres Raster. Erst teilen wir in Zehntel, dann jedes Zehntel noch einmal.",
  "reward": "Im fein eingeteilten Beet wachsen junge Pflanzen.",
  "kind": "garden",
  "x": 12,
  "z": 8,
  "tasks": [
   {
    "type": "choice",
    "text": "Das ganze Beet hat zehn Reihen mit je zehn gleichen Kästchen. Welcher Anteil des Beets ist ein Kästchen?",
    "options": [
     "Ein Zehntel",
     "Ein Hundertstel",
     "Ein Ganzes"
    ],
    "answer": 1,
    "hint": "Zehn Reihen mit je zehn Kästchen sind 100 Kästchen.",
    "why": "Ein Kästchen ist eines von 100 gleichen Teilen: ein Hundertstel.",
    "lesson": "hundred-grid",
    "skill": "Noch genauer: ein Hundertstel"
   },
   {
    "type": "number",
    "text": "35 Hundertstel der Beetfläche sind für Blumen gedacht. Schreibe den Anteil als Dezimalzahl.",
    "answer": "0.35",
    "unit": "",
    "hint": "30 Hundertstel sind drei Zehntel; fünf Hundertstel bleiben.",
    "why": "35 Hundertstel sind 0,35 der ganzen Beetfläche.",
    "lesson": "write-hundred",
    "skill": "Hundertstel in die Zahl einbauen"
   },
   {
    "type": "number",
    "text": "Der Tropfer soll sechs Hundertstel Liter abgeben. Welche Dezimalzahl stellst du ein?",
    "answer": "0.06",
    "unit": "l",
    "hint": "Es gibt keine vollen Zehntel. Halte ihre Stelle mit einer Null frei.",
    "why": "0,06 l: 0 Einer, 0 Zehntel, 6 Hundertstel.",
    "lesson": "zero-hundred",
    "skill": "Eine freie Stelle braucht eine Null"
   }
  ],
  "requires": [
   "v1"
  ],
  "advanced": false,
  "goal": "Noch genauer: ein Hundertstel",
  "extension": false
 },
 {
  "id": "v2",
  "region": "village",
  "title": "Ein Dach für Jori",
  "npc": "Jori · Tüftler",
  "story": "Für das Dach lesen wir Maßschilder mit Einern, Zehnteln und Hundertsteln. Tausendstel brauchst du hier noch nicht.",
  "reward": "Joris Haus bekommt sein rotes Dach.",
  "kind": "house",
  "x": -9,
  "z": -5,
  "tasks": [
   {
    "type": "classify",
    "text": "Sortiere die Ziffern auf dem Brettschild 3,58 m nach ihren Stellen.",
    "items": [
     "3",
     "5",
     "8"
    ],
    "categories": [
     "Einer",
     "Zehntel",
     "Hundertstel"
    ],
    "answer": [
     0,
     1,
     2
    ],
    "hint": "Lies von links: Einer, Komma, Zehntel, Hundertstel.",
    "why": "Das sind 3 Einer, 5 Zehntel und 8 Hundertstel.",
    "lesson": "places-hundred",
    "skill": "Eine kleine Stellenwerttafel"
   },
   {
    "type": "number",
    "text": "Ein Balken ist vier ganze Meter und acht Hundertstel Meter lang. Wie lautet sein Maßschild?",
    "answer": "4.08",
    "unit": "m",
    "hint": "Es gibt keine Zehntel: Zwischen Komma und 8 steht eine 0.",
    "why": "4,08 m: vier Einer, keine Zehntel, acht Hundertstel.",
    "lesson": "zero-hundred",
    "skill": "Eine freie Stelle braucht eine Null"
   },
   {
    "type": "choice",
    "text": "Ein Bauteil braucht 0,5 m Band. Welches andere Schild nennt dieselbe Länge?",
    "options": [
     "0,05 m",
     "0,50 m",
     "5,0 m"
    ],
    "answer": 1,
    "hint": "Fünf Zehntel sind fünfzig Hundertstel.",
    "why": "0,5 m = 0,50 m. Das Band wird durch die angehängte Null nicht länger.",
    "lesson": "equal-zeros",
    "skill": "Gleiche Menge, feiner eingeteilt"
   }
  ],
  "requires": [
   "v0c"
  ],
  "advanced": false,
  "goal": "Eine kleine Stellenwerttafel",
  "extension": false
 },
 {
  "id": "v0d",
  "region": "village",
  "title": "Der kleine Messkristall",
  "npc": "Jori · Tüftler",
  "story": "Für feinen Zierdraht müssen wir noch genauer messen. Der Messkristall zeigt die Tausendstel.",
  "reward": "Ein kleiner Messkristall wächst aus seinem Sockel.",
  "kind": "crystal",
  "x": -12,
  "z": 5,
  "tasks": [
   {
    "type": "choice",
    "text": "Jedes der 100 Hundertstelstücke wird in zehn gleiche Teile geteilt. Wie heißt eines dieser neuen Teile?",
    "options": [
     "Ein Zehntel",
     "Ein Hundertstel",
     "Ein Tausendstel"
    ],
    "answer": 2,
    "hint": "100 mal 10 ergibt 1000 gleich große Teile.",
    "why": "Eines der 1000 gleichen Teile heißt ein Tausendstel.",
    "lesson": "thousand",
    "skill": "Ein Hundertstel noch einmal teilen"
   },
   {
    "type": "number",
    "text": "Der Zierdraht ist vier Tausendstel Meter dick. Schreibe diese Länge als Dezimalzahl.",
    "answer": "0.004",
    "unit": "m",
    "hint": "Die 4 steht an dritter Stelle nach dem Komma.",
    "why": "0,004 m: die beiden Nullen halten die Zehntel und Hundertstel frei.",
    "lesson": "write-thousand",
    "skill": "Tausendstel stehen an dritter Stelle"
   },
   {
    "type": "classify",
    "text": "Das Messschild zeigt 1,236. Ordne die Nachkommaziffern zu.",
    "items": [
     "2",
     "3",
     "6"
    ],
    "categories": [
     "Zehntel",
     "Hundertstel",
     "Tausendstel"
    ],
    "answer": [
     0,
     1,
     2
    ],
    "hint": "Direkt am Komma beginnen die Zehntel.",
    "why": "1,236 besteht aus 1 Einer, 2 Zehnteln, 3 Hundertsteln und 6 Tausendsteln.",
    "lesson": "write-thousand",
    "skill": "Tausendstel stehen an dritter Stelle"
   }
  ],
  "requires": [
   "v2"
  ],
  "advanced": false,
  "goal": "Ein Hundertstel noch einmal teilen",
  "extension": false
 },
 {
  "id": "v3",
  "region": "village",
  "title": "Die Vorratskammer",
  "npc": "Pip · Sammler",
  "story": "Auf den Vorräten stehen noch Brüche. Wir erinnern zuerst, was oben und unten bedeutet. Danach wechseln wir in kleinen Schritten zur Kommaschreibweise.",
  "reward": "Die Vorratskammer wird eingeräumt und beleuchtet.",
  "kind": "crates",
  "x": 8,
  "z": -6,
  "tasks": [
   {
    "type": "choice",
    "text": "Ein Glas ist zu 1/2 gefüllt. Was sagt die 2 unten?",
    "options": [
     "Das Ganze ist in zwei gleich große Teile geteilt.",
     "Es sind zwei volle Gläser.",
     "Es werden zwei Liter eingefüllt."
    ],
    "answer": 0,
    "hint": "Die untere Zahl beschreibt die Teilung des Ganzen.",
    "why": "Bei 1/2 ist das Ganze in zwei gleiche Teile geteilt. Eines davon ist gemeint.",
    "lesson": "fraction-meaning",
    "skill": "Brüche erinnern: unten teilen, oben zählen"
   },
   {
    "type": "number",
    "text": "Ein Etikett nennt 7/10 kg Beeren. Welche Dezimalzahl bedeutet dasselbe?",
    "answer": "0.7",
    "unit": "kg",
    "hint": "Lies 7/10 als sieben Zehntel.",
    "why": "7/10 kg = 0,7 kg.",
    "lesson": "fraction-tenths",
    "skill": "Zehntel als Bruch und Kommazahl"
   },
   {
    "type": "choice",
    "text": "Auf einer Schale steht 0,35 kg. Welches Bruch-Etikett passt?",
    "options": [
     "35/10 kg",
     "35/100 kg",
     "3/5 kg"
    ],
    "answer": 1,
    "hint": "0,35 sind 35 Hundertstel.",
    "why": "0,35 kg = 35/100 kg. Die 100 steht für Hundertstel.",
    "lesson": "fraction-hundred",
    "skill": "Hundertstel auch als Bruch schreiben"
   },
   {
    "type": "number",
    "text": "Ein Vorratsfeld ist zu einem Viertel belegt. Wie lautet dieser Anteil als Dezimalzahl?",
    "answer": "0.25",
    "unit": "",
    "hint": "Ein Viertel des Hunderterfelds enthält 25 Kästchen.",
    "why": "1/4 = 25/100 = 0,25.",
    "lesson": "fraction-quarter",
    "skill": "Ein Viertel ohne Bruchrechen-Trick"
   },
   {
    "type": "choice",
    "text": "Ein Krug ist zu 3/4 gefüllt. Welches Dezimaletikett bekommt er?",
    "options": [
     "0,34",
     "0,75",
     "0,3"
    ],
    "answer": 1,
    "hint": "Drei Viertel sind dreimal 25 Hundertstel.",
    "why": "25 + 25 + 25 = 75: 3/4 = 75/100 = 0,75.",
    "lesson": "fraction-threequarters",
    "skill": "Drei Viertel zusammensetzen"
   }
  ],
  "requires": [
   "v2"
  ],
  "advanced": false,
  "goal": "Brüche erinnern: unten teilen, oben zählen",
  "extension": false
 },
 {
  "id": "v4",
  "region": "village",
  "title": "Das Licht des Dorfes",
  "npc": "Mila · Brunnenhüterin",
  "story": "Für die Dorfstatue verbinden wir bekannte Darstellungen. Jede Rune nutzt etwas, das du im Dorf schon kennengelernt hast.",
  "reward": "Die Dorfstatue wird aufgebaut und trägt ein warmes Licht.",
  "kind": "statue",
  "x": 5,
  "z": 4,
  "tasks": [
   {
    "type": "number",
    "text": "Der Sockel braucht 4 Einer, 0 Zehntel und 8 Hundertstel Meter Lichtband. Welche Zahl gehört auf den Plan?",
    "answer": "4.08",
    "unit": "m",
    "hint": "Die Zehntelstelle braucht eine Null.",
    "why": "4 Einer, 0 Zehntel und 8 Hundertstel ergeben 4,08 m.",
    "lesson": "zero-hundred",
    "skill": "Eine freie Stelle braucht eine Null"
   },
   {
    "type": "choice",
    "text": "Eine Rune trägt 0,125. Welcher Tausendstelbruch nennt denselben Wert?",
    "options": [
     "125/100",
     "125/1000",
     "12/1000"
    ],
    "answer": 1,
    "hint": "Die dritte Nachkommastelle sind Tausendstel.",
    "why": "0,125 = 125/1000. Ein Kürzen ist hier nicht nötig.",
    "lesson": "fraction-thousand",
    "skill": "Tausendstel in zwei Schreibweisen"
   },
   {
    "type": "choice",
    "text": "Pip fragt, ob 0,40 mehr ist als 0,4. Welche Erklärung stimmt?",
    "options": [
     "Ja, 40 ist immer mehr als 4.",
     "Nein: 4 Zehntel sind genau 40 Hundertstel.",
     "Nein: 0,4 ist größer."
    ],
    "answer": 1,
    "hint": "Denke an die Einteilung in Zehntel und Hundertstel.",
    "why": "0,4 = 0,40. Die Menge bleibt gleich.",
    "lesson": "equal-zeros",
    "skill": "Gleiche Menge, feiner eingeteilt"
   }
  ],
  "requires": [
   "v0d",
   "v3"
  ],
  "advanced": true,
  "goal": "Eine freie Stelle braucht eine Null",
  "extension": false
 },
 {
  "id": "f1",
  "region": "forest",
  "title": "Der freundliche Waldhüter",
  "npc": "Fenn · Waldhüter",
  "story": "Mein Wurzeltor öffnet sich für die stärkeren Schutzamulette. Prüfe ihre Leuchtkraft.",
  "reward": "Das Wurzeltor trägt wieder ein grünes Schutzlicht.",
  "kind": "gate",
  "x": -6,
  "z": 2,
  "tasks": [
   {
    "type": "choice",
    "text": "Zwei Schutzsteine haben 2,4 und 2,7 Kraftpunkte. Welcher ist stärker?",
    "options": [
     "2,4",
     "2,7"
    ],
    "answer": 1,
    "hint": "Die Einer sind gleich. Vergleiche die Zehntel.",
    "why": "Sieben Zehntel sind mehr als vier Zehntel: 2,7 ist stärker.",
    "lesson": "compare-tenths",
    "skill": "Erst Ganze, dann Zehntel vergleichen"
   },
   {
    "type": "choice",
    "text": "Welches Amulett hat die größere Leuchtkraft?",
    "options": [
     "0,8",
     "0,75"
    ],
    "answer": 0,
    "hint": "Schreibe 0,8 als 0,80.",
    "why": "0,80 > 0,75. Acht Zehntel sind mehr als sieben Zehntel und fünf Hundertstel.",
    "lesson": "compare-hundred",
    "skill": "Gleich fein einteilen hilft"
   },
   {
    "type": "order",
    "text": "Lege die Amulette von der kleinsten zur größten Leuchtkraft.",
    "items": [
     "1,09",
     "1,9",
     "1,19",
     "1,099"
    ],
    "answer": [
     0,
     3,
     2,
     1
    ],
    "hint": "Ergänze auf drei Nachkommastellen: 1,090; 1,900; 1,190; 1,099.",
    "why": "1,090 < 1,099 < 1,190 < 1,900.",
    "lesson": "order-thousand",
    "skill": "Mehrere Zahlen der Reihe nach"
   },
   {
    "type": "choice",
    "text": "Das Tor verlangt mehr als 2,35 Kraftpunkte. Welcher Stein erfüllt das?",
    "options": [
     "2,305",
     "2,350",
     "2,36"
    ],
    "answer": 2,
    "hint": "Gleich viel reicht nicht; der Wert muss größer sein.",
    "why": "2,36 > 2,35. 2,350 ist gleich 2,35; 2,305 ist kleiner.",
    "lesson": "limits",
    "skill": "„Mehr als“ und „höchstens“"
   }
  ],
  "advanced": false,
  "requires": [
   "v0d"
  ],
  "goal": "Erst Ganze, dann Zehntel vergleichen",
  "extension": false
 },
 {
  "id": "f2",
  "region": "forest",
  "title": "Die verschwundenen Wegsteine",
  "npc": "Fenn · Waldhüter",
  "story": "Die Wegsteine liegen auf einer Zahlenstrecke. Setze die Markierungen zurück an ihren Platz.",
  "reward": "Drei helle Wegsteine weisen durch den Wald.",
  "kind": "stones",
  "x": 4,
  "z": 5,
  "tasks": [
   {
    "type": "line",
    "text": "Setze den ersten Wegstein bei 0,6 km.",
    "start": 0,
    "end": 1,
    "step": 0.1,
    "answer": "0.6",
    "hint": "Ein großer Abschnitt von 0 bis 1 ist in zehn gleiche Schritte geteilt.",
    "why": "0,6 liegt sechs Zehntelschritte rechts von 0.",
    "lesson": "line-tenths",
    "skill": "Die Schritte auf dem Zahlenweg"
   },
   {
    "type": "line",
    "text": "Die zweite Laterne steht bei 1,25 km. Wähle ihre Position.",
    "start": 1,
    "end": 1.5,
    "step": 0.05,
    "answer": "1.25",
    "hint": "Jeder Schritt auf dieser Strecke ist 0,05 km.",
    "why": "1,25 liegt genau in der Mitte zwischen 1,0 und 1,5.",
    "lesson": "line-fives",
    "skill": "Eine andere Skala: Schritte von 0,05"
   },
   {
    "type": "choice",
    "text": "Welcher Rastplatz liegt genau zwischen 2,4 km und 2,6 km?",
    "options": [
     "2,45 km",
     "2,5 km",
     "2,55 km"
    ],
    "answer": 1,
    "hint": "Der Mittelwert liegt von beiden Zahlen gleich weit entfernt.",
    "why": "2,5 liegt jeweils 0,1 von 2,4 und 2,6 entfernt.",
    "lesson": "midpoint",
    "skill": "Die Mitte hat gleiche Abstände"
   }
  ],
  "advanced": false,
  "requires": [
   "f1"
  ],
  "goal": "Die Schritte auf dem Zahlenweg",
  "extension": false
 },
 {
  "id": "f3",
  "region": "forest",
  "title": "Laternen im Nebel",
  "npc": "Nori · Lichtsammlerin",
  "story": "Die Nebelschilder haben nur wenig Platz. Runde die Entfernungen auf die verlangte Stelle.",
  "reward": "Die Nebellaterne leuchtet wieder.",
  "kind": "lantern",
  "x": 6,
  "z": -6,
  "tasks": [
   {
    "type": "choice",
    "text": "Für ein Nebelschild soll 2,32 km auf den näheren Zehntelwert gerundet werden. Welcher ist näher?",
    "options": [
     "2,3 km",
     "2,4 km"
    ],
    "answer": 0,
    "hint": "2,32 liegt zwei Hundertstel von 2,30 und acht von 2,40 entfernt.",
    "why": "2,3 km ist der nähere Zehntelwert.",
    "lesson": "round-near",
    "skill": "Runden heißt: einen nahen Wert nehmen"
   },
   {
    "type": "number",
    "text": "Der Wasserfall ist 3,46 km entfernt. Runde für das Schild auf eine Nachkommastelle.",
    "answer": "3.5",
    "unit": "km",
    "hint": "Sieh auf die Hundertstelstelle: 6. Ab 5 wird aufgerundet.",
    "why": "3,46 km ≈ 3,5 km. Die 6 erhöht die Zehntelstelle.",
    "lesson": "round-digit",
    "skill": "Welche Ziffer entscheidet beim Runden?"
   },
   {
    "type": "number",
    "text": "Ein Geländer misst 7,243 m. Runde auf Hundertstel.",
    "answer": "7.24",
    "unit": "m",
    "hint": "Die Tausendstelziffer 3 entscheidet.",
    "why": "7,243 m ≈ 7,24 m. Bei 0 bis 4 bleibt die Rundungsstelle gleich.",
    "lesson": "round-digit",
    "skill": "Welche Ziffer entscheidet beim Runden?"
   },
   {
    "type": "number",
    "text": "Der Gipfelpfad ist 9,96 km lang. Runde auf Zehntel.",
    "answer": "10.0",
    "unit": "km",
    "hint": "Beim Aufrunden von 9,9 gibt es einen Übertrag.",
    "why": "9,96 km ≈ 10,0 km. Auch 10 ist derselbe Zahlenwert.",
    "lesson": "round-carry",
    "skill": "Beim Runden kann ein Ganzes entstehen"
   }
  ],
  "advanced": false,
  "requires": [
   "f2"
  ],
  "goal": "Runden heißt: einen nahen Wert nehmen",
  "extension": false
 },
 {
  "id": "f4",
  "region": "forest",
  "title": "Der Rat der alten Eiche",
  "npc": "Edda · Waldweise",
  "story": "Die Eiche prüft, ob du passenden Schätzungen vertraust – und ob du bei genauen Grenzen vorsichtig bleibst.",
  "reward": "Die alte Eiche trägt goldene Früchte.",
  "kind": "tree",
  "x": -7,
  "z": -6,
  "tasks": [
   {
    "type": "choice",
    "text": "Drei Pfade sind 2,9 km, 4,1 km und 1,8 km lang. Welcher Überschlag passt zur Gesamtlänge?",
    "options": [
     "etwa 5 km",
     "etwa 9 km",
     "etwa 15 km"
    ],
    "answer": 1,
    "hint": "Runde auf ganze Kilometer und rechne 3 + 4 + 2.",
    "why": "Der Überschlag ergibt 9 km. Genau sind es 8,8 km.",
    "lesson": "estimate",
    "skill": "Erst grob prüfen"
   },
   {
    "type": "classify",
    "text": "Das Baumhaus trägt höchstens 2,5 kg. Ordne die Pakete zu.",
    "items": [
     "2,49 kg",
     "2,50 kg",
     "2,501 kg"
    ],
    "categories": [
     "passt",
     "zu schwer"
    ],
    "answer": [
     0,
     0,
     1
    ],
    "hint": "„Höchstens“ erlaubt den Grenzwert selbst. Ergänze Nullen zum Vergleichen.",
    "why": "2,49 und 2,50 sind höchstens 2,5. 2,501 ist größer.",
    "lesson": "limits",
    "skill": "„Mehr als“ und „höchstens“"
   },
   {
    "type": "choice",
    "text": "Darfst du ein 2,54-kg-Paket auf einen Steg mit 2,5 kg Traglast legen, nur weil 2,54 auf Zehntel gerundet 2,5 ergibt?",
    "options": [
     "Ja, Runden macht es leichter.",
     "Nein, die tatsächliche Masse liegt über der Grenze."
    ],
    "answer": 1,
    "hint": "Ein gerundeter Wert verändert die echte Masse nicht.",
    "why": "Bei einer Belastungsgrenze musst du den genauen Wert vergleichen.",
    "lesson": "limits",
    "skill": "„Mehr als“ und „höchstens“"
   }
  ],
  "advanced": true,
  "requires": [
   "f3"
  ],
  "goal": "Erst grob prüfen",
  "extension": false
 },
 {
  "id": "h1",
  "region": "harbor",
  "title": "Leinen los!",
  "npc": "Käpt’n Lio",
  "story": "Das kleine Segelboot braucht eine passende Leine. Auf den Rollen stehen verschiedene Längeneinheiten.",
  "reward": "Das Segelboot bekommt eine neue Leine und ein Segel.",
  "kind": "boat",
  "x": -6,
  "z": 1,
  "tasks": [
   {
    "type": "number",
    "text": "Eine Übungsleine misst 1,2 m. Wie viele Zentimeter sind das?",
    "answer": "120",
    "unit": "cm",
    "hint": "Ein Meter sind 100 cm, zwei Zehntel Meter sind 20 cm.",
    "why": "1,2 m = 100 cm + 20 cm = 120 cm.",
    "lesson": "metres-cm",
    "skill": "Ein Meter hat 100 Zentimeter"
   },
   {
    "type": "number",
    "text": "Die Leine soll 2,35 m lang sein. Wie viele Zentimeter sind das?",
    "answer": "235",
    "unit": "cm",
    "hint": "1 m = 100 cm. Multipliziere mit 100.",
    "why": "2,35 m = 235 cm.",
    "lesson": "metres-cm",
    "skill": "Ein Meter hat 100 Zentimeter"
   },
   {
    "type": "number",
    "text": "Ein Brett ist 85 cm lang. Trage seine Länge in Metern ein.",
    "answer": "0.85",
    "unit": "m",
    "hint": "Teile die Zentimeterzahl durch 100.",
    "why": "85 cm = 0,85 m.",
    "lesson": "cm-metres",
    "skill": "Von Zentimetern zurück zu Metern"
   },
   {
    "type": "choice",
    "text": "Bis zur Küstenbucht sind es 1,2 km. Welche Entfernung zeigt der Schiffsmesser in Metern?",
    "options": [
     "12 m",
     "120 m",
     "1200 m"
    ],
    "answer": 2,
    "hint": "1 km = 1000 m.",
    "why": "1,2 km = 1200 m.",
    "lesson": "kilometres",
    "skill": "Ein Kilometer hat 1000 Meter"
   }
  ],
  "advanced": false,
  "requires": [
   "v2"
  ],
  "goal": "Ein Meter hat 100 Zentimeter",
  "extension": false
 },
 {
  "id": "h2",
  "region": "harbor",
  "title": "Die Ladung der Wolkenfähre",
  "npc": "Tami · Hafenmeisterin",
  "story": "Die Fähre muss richtig beladen werden. Bringe die Angaben zuerst in dieselbe Einheit.",
  "reward": "Die Fährenladung steht ordentlich gestapelt bereit.",
  "kind": "crates",
  "x": 5,
  "z": 4,
  "tasks": [
   {
    "type": "number",
    "text": "Ein Sack wiegt 0,75 kg. Wie viele Gramm zeigt die Waage?",
    "answer": "750",
    "unit": "g",
    "hint": "1 kg = 1000 g.",
    "why": "0,75 kg = 750 g.",
    "lesson": "kg-grams",
    "skill": "Ein Kilogramm hat 1000 Gramm"
   },
   {
    "type": "number",
    "text": "Die kleine Kiste wiegt 1250 g. Wie viele Kilogramm sind das?",
    "answer": "1.25",
    "unit": "kg",
    "hint": "Teile durch 1000; 1000 g sind 1 kg.",
    "why": "1250 g = 1,25 kg.",
    "lesson": "grams-kg",
    "skill": "Gramm in Kilogramm ausdrücken"
   },
   {
    "type": "classify",
    "text": "Eine Trage darf höchstens 1,5 kg aufnehmen. Ordne die einzelnen Pakete zu.",
    "items": [
     "1400 g",
     "1,6 kg",
     "1500 g"
    ],
    "categories": [
     "passt",
     "zu schwer"
    ],
    "answer": [
     0,
     1,
     0
    ],
    "hint": "Schreibe 1,5 kg als 1500 g.",
    "why": "1400 g und 1500 g passen. 1,6 kg = 1600 g ist zu schwer.",
    "lesson": "limits",
    "skill": "„Mehr als“ und „höchstens“"
   }
  ],
  "advanced": false,
  "requires": [
   "h1",
   "v0d",
   "f1"
  ],
  "goal": "Ein Kilogramm hat 1000 Gramm",
  "extension": false
 },
 {
  "id": "h3",
  "region": "harbor",
  "title": "Wasser für die Reise",
  "npc": "Tami · Hafenmeisterin",
  "story": "Fülle die Reisegefäße. Achte auf Liter und Milliliter, damit nichts überläuft.",
  "reward": "Der Wassertank ist wieder gefüllt.",
  "kind": "tank",
  "x": 6,
  "z": -6,
  "tasks": [
   {
    "type": "number",
    "text": "Der Krug fasst 1,25 l. Wie viele Milliliter sind das?",
    "answer": "1250",
    "unit": "ml",
    "hint": "1 l = 1000 ml.",
    "why": "1,25 l = 1250 ml.",
    "lesson": "litres-ml",
    "skill": "Ein Liter hat 1000 Milliliter"
   },
   {
    "type": "number",
    "text": "Die Feldflasche enthält 350 ml. Schreibe die Menge in Litern.",
    "answer": "0.35",
    "unit": "l",
    "hint": "350/1000 l ergibt die Dezimalzahl.",
    "why": "350 ml = 0,35 l.",
    "lesson": "ml-litres",
    "skill": "Milliliter als Tausendstel lesen"
   },
   {
    "type": "multi",
    "text": "Gesucht sind alle Gefäße mit genau 0,5 l Inhalt.",
    "options": [
     "500 ml",
     "50 ml",
     "0,50 l",
     "5 l"
    ],
    "answer": [
     0,
     2
    ],
    "hint": "Ein halber Liter sind 500 Milliliter.",
    "why": "0,5 l = 500 ml = 0,50 l.",
    "lesson": "equal-zeros",
    "skill": "Gleiche Menge, feiner eingeteilt"
   }
  ],
  "advanced": false,
  "requires": [
   "h2"
  ],
  "goal": "Ein Liter hat 1000 Milliliter",
  "extension": false
 },
 {
  "id": "h4",
  "region": "harbor",
  "title": "Der Fahrplan der Fähre",
  "npc": "Käpt’n Lio",
  "story": "Fahrzeit und Fahrpreis stehen fest. Aber Achtung: Eine Stunde hat keine hundert Minuten!",
  "reward": "Die Hafenuhr geht wieder und der Fahrplan hängt.",
  "kind": "clock",
  "x": -6,
  "z": -6,
  "tasks": [
   {
    "type": "number",
    "text": "Die Fahrt dauert 1,5 h. Wie viele Minuten sind das?",
    "answer": "90",
    "unit": "min",
    "hint": "1 h sind 60 min; 0,5 h sind 30 min.",
    "why": "1,5 · 60 min = 90 min.",
    "lesson": "time-half",
    "skill": "Eine Stunde ist nicht hundert Minuten"
   },
   {
    "type": "choice",
    "text": "Was bedeutet eine Fahrzeit von 1,25 h?",
    "options": [
     "1 h 25 min",
     "1 h 15 min",
     "1 h 50 min"
    ],
    "answer": 1,
    "hint": "0,25 h ist eine Viertelstunde.",
    "why": "0,25 · 60 min = 15 min. Also 1 h 15 min.",
    "lesson": "time-quarter",
    "skill": "Viertelstunden wiedererkennen"
   },
   {
    "type": "number",
    "text": "Ein Fahrschein kostet 2,35 €. Wie viele Cent musst du bezahlen?",
    "answer": "235",
    "unit": "ct",
    "hint": "1 € = 100 ct.",
    "why": "2,35 € = 235 ct. Anders als Zeit lässt sich Geld hier in Hundertstel umrechnen.",
    "lesson": "money",
    "skill": "Euro und Cent"
   }
  ],
  "advanced": false,
  "requires": [
   "h3",
   "v3"
  ],
  "goal": "Eine Stunde ist nicht hundert Minuten",
  "extension": true
 },
 {
  "id": "h5",
  "region": "harbor",
  "title": "Der neue Lagerraum",
  "npc": "Tami · Hafenmeisterin",
  "story": "Für den Hafenanbau vergleichen wir Flächen und Rauminhalte. Die Umrechnungsfaktoren sind nicht dieselben wie bei Längen.",
  "reward": "Der Hafen erhält einen kleinen Lagerpavillon.",
  "kind": "pavilion",
  "x": 0,
  "z": 7,
  "tasks": [
   {
    "type": "number",
    "text": "Die Bodenplatte hat 1,5 m² Fläche. Wie viele dm² sind das?",
    "answer": "150",
    "unit": "dm²",
    "hint": "1 m² = 100 dm²: 10 Reihen mit je 10 Quadraten.",
    "why": "1,5 m² = 150 dm². Bei Flächen zählt der Faktor 100 pro Einheitenschritt.",
    "lesson": "square-units",
    "skill": "Flächen: in zwei Richtungen teilen"
   },
   {
    "type": "number",
    "text": "Eine Kiste fasst 0,25 m³. Wie viele dm³ sind das?",
    "answer": "250",
    "unit": "dm³",
    "hint": "1 m³ = 1000 dm³: 10 · 10 · 10 kleine Würfel.",
    "why": "0,25 m³ = 250 dm³. Bei Rauminhalten zählt der Faktor 1000 pro Einheitenschritt.",
    "lesson": "cube-units",
    "skill": "Rauminhalt: auch die Höhe zählt"
   },
   {
    "type": "choice",
    "text": "Ein Tank fasst 8 dm³. Welche Inhaltsangabe passt?",
    "options": [
     "0,8 l",
     "8 l",
     "800 l"
    ],
    "answer": 1,
    "hint": "Ein Würfel mit 1 dm Kantenlänge fasst genau 1 l.",
    "why": "1 dm³ = 1 l. Deshalb sind 8 dm³ genau 8 l.",
    "lesson": "cube-litre",
    "skill": "Ein Kubikdezimeter fasst einen Liter"
   }
  ],
  "advanced": true,
  "requires": [
   "h3",
   "m2"
  ],
  "goal": "Flächen: in zwei Richtungen teilen",
  "extension": true
 },
 {
  "id": "a1",
  "region": "market",
  "title": "Ein Korb für das Dorf",
  "npc": "Bela · Markthändlerin",
  "story": "Packe den Versorgungskorb und berechne den Gesamtpreis. Unsere Taler lassen sich in hundert kleine Kupfer teilen.",
  "reward": "Der Marktstand ist geöffnet und der Dorfkorb gefüllt.",
  "kind": "stall",
  "x": -6,
  "z": -4,
  "tasks": [
   {
    "type": "number",
    "text": "Ein Brot kostet 1,2 Taler, Obst kostet 2,3 Taler. Was kostet beides zusammen?",
    "answer": "3.5",
    "unit": "Taler",
    "hint": "Addiere Einer zu Einern und Zehntel zu Zehnteln.",
    "why": "1,2 + 2,3 = 3,5 Taler.",
    "lesson": "add-tenths",
    "skill": "Ganze zu Ganzen, Zehntel zu Zehnteln"
   },
   {
    "type": "number",
    "text": "Brot kostet 1,25 Taler, Äpfel kosten 2,40 Taler. Wie viel zahlst du zusammen?",
    "answer": "3.65",
    "unit": "Taler",
    "hint": "Schreibe die Kommas untereinander: 1,25 + 2,40.",
    "why": "1,25 + 2,40 = 3,65. Addiere gleiche Stellenwerte.",
    "lesson": "add-align",
    "skill": "Beim Addieren die Stellen ausrichten"
   },
   {
    "type": "number",
    "text": "Ein Käse kostet 0,85 Taler, dazu kommt Saft für 0,75 Taler. Wie viel kostet beides?",
    "answer": "1.6",
    "unit": "Taler",
    "hint": "85 Hundertstel + 75 Hundertstel = 160 Hundertstel.",
    "why": "0,85 + 0,75 = 1,60. Zehn Hundertstel werden zu einem Zehntel.",
    "lesson": "add-carry",
    "skill": "Zehn kleine Teile werden ein größeres"
   },
   {
    "type": "choice",
    "text": "Bela rechnet 2,5 + 0,75 = 0,100. Welcher Ansatz ist richtig?",
    "options": [
     "2,50 + 0,75 = 3,25",
     "0,25 + 0,75 = 1,00",
     "2,5 + 7,5 = 10,0"
    ],
    "answer": 0,
    "hint": "Ganze Zahlen und Nachkommastellen behalten ihren Stellenwert.",
    "why": "Schreibe 2,5 als 2,50. Dann stehen die Stellen passend untereinander.",
    "lesson": "add-align",
    "skill": "Beim Addieren die Stellen ausrichten"
   }
  ],
  "advanced": false,
  "requires": [
   "v2"
  ],
  "goal": "Ganze zu Ganzen, Zehntel zu Zehnteln",
  "extension": false
 },
 {
  "id": "a2",
  "region": "market",
  "title": "Mehl für die Mondbäckerei",
  "npc": "Bela · Markthändlerin",
  "story": "Drei Lieferungen kommen an. Berechne die Gesamtmenge, damit die Bäckerei planen kann.",
  "reward": "In der Mondbäckerei duftet es wieder nach Brot.",
  "kind": "house",
  "x": 6,
  "z": -5,
  "tasks": [
   {
    "type": "number",
    "text": "Die erste Lieferung enthält 2,35 kg Mehl, die zweite 1,8 kg. Wie viel ist das zusammen?",
    "answer": "4.15",
    "unit": "kg",
    "hint": "Ergänze die Null: 2,35 + 1,80.",
    "why": "2,35 kg + 1,80 kg = 4,15 kg.",
    "lesson": "add-align",
    "skill": "Beim Addieren die Stellen ausrichten"
   },
   {
    "type": "number",
    "text": "Ein Kräuterteig braucht 0,375 kg Roggen und 0,625 kg Weizen. Wie viel Mehl ist das?",
    "answer": "1",
    "unit": "kg",
    "hint": "375 Tausendstel + 625 Tausendstel = 1000 Tausendstel.",
    "why": "0,375 + 0,625 = 1,000 = 1.",
    "lesson": "add-thousand",
    "skill": "Dasselbe Bündeln bei Tausendsteln"
   },
   {
    "type": "choice",
    "text": "Für 1,75 + 2,60 + 0,25 suchst du einen geschickten Rechenweg. Welcher nutzt ein glattes Zwischenergebnis?",
    "options": [
     "(1,75 + 0,25) + 2,60",
     "1,75 + (2,60 + 0,25)"
    ],
    "answer": 0,
    "hint": "Welche beiden Zahlen ergänzen sich zu 2?",
    "why": "1,75 + 0,25 = 2. Danach 2 + 2,60 = 4,60. Bei Addition darfst du vertauschen und zusammenfassen.",
    "lesson": "add-group",
    "skill": "Passende Teile zuerst zusammennehmen"
   }
  ],
  "advanced": false,
  "requires": [
   "a1",
   "v0d"
  ],
  "goal": "Beim Addieren die Stellen ausrichten",
  "extension": false
 },
 {
  "id": "a3",
  "region": "market",
  "title": "Die Lichtergirlande",
  "npc": "Olli · Festplaner",
  "story": "Verbinde die vorhandenen Bänder zu einer langen Girlande. Rechne erst in derselben Einheit.",
  "reward": "Eine bunte Girlande schmückt den Marktplatz.",
  "kind": "banner",
  "x": -6,
  "z": 5,
  "tasks": [
   {
    "type": "number",
    "text": "Zwei Bänder sind 1,2 m und 85 cm lang. Wie lang sind sie zusammen in Metern?",
    "answer": "2.05",
    "unit": "m",
    "hint": "85 cm = 0,85 m.",
    "why": "1,20 m + 0,85 m = 2,05 m.",
    "lesson": "add-units",
    "skill": "Erst eine gemeinsame Einheit wählen"
   },
   {
    "type": "number",
    "text": "Dazu kommen weitere 0,95 m. Wie lang ist die gesamte Girlande jetzt?",
    "answer": "3",
    "unit": "m",
    "hint": "Rechne mit der bisherigen Länge 2,05 m weiter.",
    "why": "2,05 m + 0,95 m = 3,00 m.",
    "lesson": "add-carry",
    "skill": "Zehn kleine Teile werden ein größeres"
   },
   {
    "type": "choice",
    "text": "Warum darf man 1,2 m und 85 cm nicht als 1,2 + 85 = 86,2 m addieren?",
    "options": [
     "Die Einheiten müssen zuerst übereinstimmen.",
     "Man darf keine Längen addieren.",
     "Eine Zahl darf keine Null enthalten."
    ],
    "answer": 0,
    "hint": "Die Zahlen zählen hier unterschiedlich große Einheiten.",
    "why": "Meter und Zentimeter sind unterschiedlich groß. Erst umrechnen, dann die Maßzahlen addieren.",
    "lesson": "add-units",
    "skill": "Erst eine gemeinsame Einheit wählen"
   }
  ],
  "advanced": false,
  "requires": [
   "a2",
   "h1"
  ],
  "goal": "Erst eine gemeinsame Einheit wählen",
  "extension": false
 },
 {
  "id": "a4",
  "region": "market",
  "title": "Das kleine Lichterfest",
  "npc": "Olli · Festplaner",
  "story": "Plane den Einkauf für das Lichterfest. Prüfe zuerst die Größenordnung, dann die genaue Summe.",
  "reward": "Der Festtisch ist gedeckt, die Lichter sind an.",
  "kind": "table",
  "x": 6,
  "z": 6,
  "tasks": [
   {
    "type": "choice",
    "text": "Drei Einkäufe kosten 3,95, 2,10 und 4,85 Taler. Welcher Überschlag passt?",
    "options": [
     "etwa 6 Taler",
     "etwa 11 Taler",
     "etwa 20 Taler"
    ],
    "answer": 1,
    "hint": "Runde auf ganze Taler: 4 + 2 + 5.",
    "why": "Der Überschlag ist 11 Taler.",
    "lesson": "estimate",
    "skill": "Erst grob prüfen"
   },
   {
    "type": "number",
    "text": "Wie hoch ist der genaue Gesamtpreis: 3,95 + 2,10 + 4,85 Taler?",
    "answer": "10.9",
    "unit": "Taler",
    "hint": "3,95 + 4,85 = 8,80. Dazu kommen 2,10.",
    "why": "3,95 + 2,10 + 4,85 = 10,90 Taler.",
    "lesson": "add-carry",
    "skill": "Zehn kleine Teile werden ein größeres"
   },
   {
    "type": "choice",
    "text": "Du hast genau 11 Taler. Reicht das Geld für den Einkauf für 10,90 Taler?",
    "options": [
     "Ja, 0,10 Taler bleiben übrig.",
     "Nein, 0,90 Taler fehlen.",
     "Ja, genau ohne Rest."
    ],
    "answer": 0,
    "hint": "Vergleiche 11,00 mit 10,90.",
    "why": "11,00 − 10,90 = 0,10 Taler. Der Überschlag war sinnvoll, die genaue Rechnung entscheidet.",
    "lesson": "limits",
    "skill": "„Mehr als“ und „höchstens“"
   }
  ],
  "advanced": true,
  "requires": [
   "a3",
   "f3"
  ],
  "goal": "Erst grob prüfen",
  "extension": false
 },
 {
  "id": "s1",
  "region": "cliffs",
  "title": "Das Seil der Bergbahn",
  "npc": "Runa · Bergbaumeisterin",
  "story": "Die Bergbahn braucht ein passendes Seilstück. Bestimme, was übrig bleibt und was noch fehlt.",
  "reward": "Die kleine Bergbahn ist wieder betriebsbereit.",
  "kind": "lift",
  "x": -6,
  "z": 2,
  "tasks": [
   {
    "type": "number",
    "text": "Von einem 5,8-m-Seil werden zuerst 2,3 m abgeschnitten. Wie viel bleibt?",
    "answer": "3.5",
    "unit": "m",
    "hint": "5 − 2 Einer und 8 − 3 Zehntel.",
    "why": "5,8 − 2,3 = 3,5 m.",
    "lesson": "subtract-basic",
    "skill": "Eine Menge wegnehmen"
   },
   {
    "type": "number",
    "text": "Ein anderes Seil ist 5,8 m lang. Davon schneidest du 2,35 m ab. Wie viel bleibt übrig?",
    "answer": "3.45",
    "unit": "m",
    "hint": "Schreibe 5,80 − 2,35; die Kommas stehen untereinander.",
    "why": "5,80 − 2,35 = 3,45 m.",
    "lesson": "subtract-exchange",
    "skill": "Ein Zehntel in Hundertstel tauschen"
   },
   {
    "type": "number",
    "text": "Für ein Geländer brauchst du 4 m. Ein Stück ist schon 2,75 m lang. Wie viel fehlt?",
    "answer": "1.25",
    "unit": "m",
    "hint": "Schreibe 4 als 4,00.",
    "why": "4,00 − 2,75 = 1,25 m.",
    "lesson": "subtract-whole",
    "skill": "Aus einem Ganzen kleinere Teile machen"
   },
   {
    "type": "choice",
    "text": "Welche Probe prüft 5,80 − 2,35 = 3,45?",
    "options": [
     "3,45 + 2,35 = 5,80",
     "3,45 − 2,35 = 5,80",
     "5,80 + 2,35 = 3,45"
    ],
    "answer": 0,
    "hint": "Addition macht die Subtraktion rückgängig.",
    "why": "Rest + abgeschnittenes Stück = ursprüngliche Länge.",
    "lesson": "subtract-proof",
    "skill": "Mit Addition die Probe machen"
   }
  ],
  "advanced": false,
  "requires": [
   "a1"
  ],
  "goal": "Eine Menge wegnehmen",
  "extension": false
 },
 {
  "id": "s2",
  "region": "cliffs",
  "title": "Die Statue am Pass",
  "npc": "Runa · Bergbaumeisterin",
  "story": "Unsere Statue bekommt einen Sockel. Fehlende Höhen kannst du auch rückwärts berechnen.",
  "reward": "Die Gipfelstatue steht auf ihrem vollständigen Sockel.",
  "kind": "statue",
  "x": 5,
  "z": 5,
  "tasks": [
   {
    "type": "number",
    "text": "Die fertige Statue soll 3,2 m hoch sein. Die Figur selbst ist 2,47 m hoch. Wie hoch muss der Sockel sein?",
    "answer": "0.73",
    "unit": "m",
    "hint": "Gesamthöhe minus Figurenhöhe ergibt die Sockelhöhe.",
    "why": "3,20 − 2,47 = 0,73 m.",
    "lesson": "missing",
    "skill": "Welche Menge fehlt zum Ziel?"
   },
   {
    "type": "number",
    "text": "Vom 0,73-m-Sockel steht bereits ein 0,28-m-Stück. Welche Höhe fehlt noch?",
    "answer": "0.45",
    "unit": "m",
    "hint": "Rechne 0,73 − 0,28.",
    "why": "0,73 − 0,28 = 0,45 m.",
    "lesson": "subtract-exchange",
    "skill": "Ein Zehntel in Hundertstel tauschen"
   },
   {
    "type": "number",
    "text": "Ein anderes Bauteil erfüllt x + 1,85 m = 3 m. Wie lang ist x?",
    "answer": "1.15",
    "unit": "m",
    "hint": "Die Umkehraufgabe lautet 3,00 − 1,85.",
    "why": "x = 1,15 m, denn 1,15 + 1,85 = 3,00.",
    "lesson": "missing",
    "skill": "Welche Menge fehlt zum Ziel?"
   }
  ],
  "advanced": false,
  "requires": [
   "s1"
  ],
  "goal": "Welche Menge fehlt zum Ziel?",
  "extension": false
 },
 {
  "id": "s3",
  "region": "cliffs",
  "title": "Der Bergsee braucht Hilfe",
  "npc": "Nori · Lichtsammlerin",
  "story": "Aus dem Vorratstank wurde Wasser entnommen. Behalte Rest und Verbrauch auseinander.",
  "reward": "Der reparierte Vorratstank versorgt die Berggärten.",
  "kind": "tank",
  "x": 6,
  "z": -6,
  "tasks": [
   {
    "type": "number",
    "text": "Im Tank sind 10 l. Die Gärtner entnehmen 3,675 l. Wie viel bleibt?",
    "answer": "6.325",
    "unit": "l",
    "hint": "Schreibe 10,000 − 3,675.",
    "why": "10,000 − 3,675 = 6,325 l.",
    "lesson": "subtract-thousand",
    "skill": "Bis zu Tausendsteln entbündeln"
   },
   {
    "type": "number",
    "text": "Von den 6,325 l werden noch 1,2 l gebraucht. Wie viel bleibt danach?",
    "answer": "5.125",
    "unit": "l",
    "hint": "Schreibe 1,2 als 1,200.",
    "why": "6,325 − 1,200 = 5,125 l.",
    "lesson": "subtract-exchange",
    "skill": "Ein Zehntel in Hundertstel tauschen"
   },
   {
    "type": "choice",
    "text": "Wie berechnest du den gesamten Rest direkt aus dem Anfangsvorrat?",
    "options": [
     "10 − (3,675 + 1,2)",
     "10 − (3,675 − 1,2)",
     "10 + 3,675 − 1,2"
    ],
    "answer": 0,
    "hint": "Beide entnommenen Mengen werden vom Anfangsvorrat abgezogen.",
    "why": "10 − 3,675 − 1,2 = 10 − (3,675 + 1,2).",
    "lesson": "two-subtractions",
    "skill": "Zwei Entnahmen: beide abziehen"
   }
  ],
  "advanced": false,
  "requires": [
   "s2",
   "a2"
  ],
  "goal": "Bis zu Tausendsteln entbündeln",
  "extension": false
 },
 {
  "id": "s4",
  "region": "cliffs",
  "title": "Der sichere Bergsteig",
  "npc": "Runa · Bergbaumeisterin",
  "story": "Am Berghang fehlt ein Stück Geländer. Plane die fehlende Länge und den Verschnitt für den sicheren Bergsteig.",
  "reward": "Der Bergsteig erhält sein vollständiges Geländer.",
  "kind": "bridge",
  "x": -6,
  "z": -6,
  "tasks": [
   {
    "type": "number",
    "text": "Das Geländer soll 8,5 m lang werden. Ein Teil misst 3,75 m, ein zweiter 2,8 m. Welche Länge fehlt?",
    "answer": "1.95",
    "unit": "m",
    "hint": "Erst die vorhandenen Längen addieren, dann von 8,50 abziehen.",
    "why": "3,75 + 2,80 = 6,55; 8,50 − 6,55 = 1,95 m.",
    "lesson": "two-subtractions",
    "skill": "Zwei Entnahmen: beide abziehen"
   },
   {
    "type": "number",
    "text": "Für das fehlende Stück liegt ein 2,4-m-Brett bereit. Wie viel Verschnitt bleibt?",
    "answer": "0.45",
    "unit": "m",
    "hint": "Du brauchst 1,95 m vom 2,40-m-Brett.",
    "why": "2,40 − 1,95 = 0,45 m.",
    "lesson": "subtract-exchange",
    "skill": "Ein Zehntel in Hundertstel tauschen"
   },
   {
    "type": "choice",
    "text": "Ein Helfer rechnet 8,5 − 3,75 − 2,8 als 8,5 − (3,75 − 2,8). Ist das richtig?",
    "options": [
     "Ja, Klammern kann man immer frei setzen.",
     "Nein, in der Klammer müssten die beiden abzuziehenden Längen addiert werden."
    ],
    "answer": 1,
    "hint": "Vergleiche die Bedeutung: Zwei Stücke sind bereits vorhanden.",
    "why": "Richtig ist 8,5 − (3,75 + 2,8). Subtraktion erlaubt nicht beliebiges Umklammern.",
    "lesson": "two-subtractions",
    "skill": "Zwei Entnahmen: beide abziehen"
   }
  ],
  "advanced": true,
  "requires": [
   "s3"
  ],
  "goal": "Zwei Entnahmen: beide abziehen",
  "extension": false
 },
 {
  "id": "m1",
  "region": "mill",
  "title": "Die Mühle dreht sich wieder",
  "npc": "Momo · Müller",
  "story": "Gleiche Mengen werden vervielfacht. Rechne aus, wie viel die Mühle für mehrere Säcke mahlen soll.",
  "reward": "Die Flügel der Malmühle drehen sich wieder.",
  "kind": "mill",
  "x": -6,
  "z": -5,
  "tasks": [
   {
    "type": "number",
    "text": "Drei Beutel enthalten je 0,2 kg Saatgut. Wie viel ist das zusammen?",
    "answer": "0.6",
    "unit": "kg",
    "hint": "Addiere die gleiche Menge dreimal: 0,2 + 0,2 + 0,2.",
    "why": "3 · 0,2 = 0,6 kg.",
    "lesson": "multiply-repeat",
    "skill": "Malnehmen fasst gleiche Mengen zusammen"
   },
   {
    "type": "number",
    "text": "Ein Beutel enthält 0,75 kg Mehl. Wie viel Mehl steckt in 4 solchen Beuteln?",
    "answer": "3",
    "unit": "kg",
    "hint": "Vier gleiche Mengen: 0,75 + 0,75 + 0,75 + 0,75.",
    "why": "4 · 0,75 kg = 3,00 kg.",
    "lesson": "multiply-integer",
    "skill": "Ganze Anzahl mal Dezimalmenge"
   },
   {
    "type": "number",
    "text": "Ein kleiner Sack enthält 1,25 kg. Wie viel sind 6 Säcke?",
    "answer": "7.5",
    "unit": "kg",
    "hint": "125 · 6 = 750. Beachte zwei Nachkommastellen.",
    "why": "6 · 1,25 kg = 7,50 kg.",
    "lesson": "multiply-integer",
    "skill": "Ganze Anzahl mal Dezimalmenge"
   },
   {
    "type": "choice",
    "text": "Welche Rechnung beschreibt 5 Flaschen mit je 0,4 l?",
    "options": [
     "5 + 0,4",
     "5 · 0,4",
     "5 : 0,4"
    ],
    "answer": 1,
    "hint": "Die gleiche Menge kommt fünfmal vor.",
    "why": "5 · 0,4 l = 2 l. Multiplikation fasst gleiche Summanden zusammen.",
    "lesson": "multiply-repeat",
    "skill": "Malnehmen fasst gleiche Mengen zusammen"
   }
  ],
  "advanced": false,
  "requires": [
   "a2"
  ],
  "goal": "Malnehmen fasst gleiche Mengen zusammen",
  "extension": false
 },
 {
  "id": "m2",
  "region": "mill",
  "title": "Der Kräutergarten am Hang",
  "npc": "Momo · Müller",
  "story": "Das neue Beet wird rechteckig. Seine Fläche entsteht aus Länge mal Breite.",
  "reward": "Im Kräutergarten sprießen neue Pflanzen.",
  "kind": "garden",
  "x": 6,
  "z": -5,
  "tasks": [
   {
    "type": "number",
    "text": "Ein Streifen von 2,4 m wird nur zur Hälfte bepflanzt. Wie lang ist der bepflanzte Teil?",
    "answer": "1.2",
    "unit": "m",
    "hint": "Mal 0,5 bedeutet: die Hälfte nehmen.",
    "why": "2,4 · 0,5 = 1,2 m.",
    "lesson": "multiply-half",
    "skill": "Mal 0,5 heißt: die Hälfte nehmen"
   },
   {
    "type": "number",
    "text": "Ein Beet ist 1,2 m lang und 0,5 m breit. Wie groß ist seine Fläche?",
    "answer": "0.6",
    "unit": "m²",
    "hint": "12 · 5 = 60. Beide Faktoren haben zusammen zwei Nachkommastellen.",
    "why": "1,2 · 0,5 = 0,60 m². Die halbe Breite ergibt die halbe Fläche.",
    "lesson": "rectangle",
    "skill": "Die Fläche eines Rechtecks"
   },
   {
    "type": "number",
    "text": "Eine Rankpflanze wächst von 1,2 m auf das 1,5-Fache. Wie lang ist sie dann?",
    "answer": "1.8",
    "unit": "m",
    "hint": "Rechne 12 · 15 = 180 und setze insgesamt zwei Nachkommastellen.",
    "why": "1,2 · 1,5 = 1,80 m.",
    "lesson": "multiply-decimal",
    "skill": "Zwei Dezimalfaktoren"
   },
   {
    "type": "number",
    "text": "Ein zweites Beet ist 2,4 m lang und 1,5 m breit. Berechne die Fläche.",
    "answer": "3.6",
    "unit": "m²",
    "hint": "2,4 · (1 + 0,5) = 2,4 + 1,2.",
    "why": "2,4 · 1,5 = 3,60 m².",
    "lesson": "rectangle-decimal",
    "skill": "Dezimalprodukte als Flächen nutzen"
   },
   {
    "type": "choice",
    "text": "Warum ist 3 · 0,4 kleiner als 3?",
    "options": [
     "Multiplizieren macht immer größer.",
     "0,4 ist kleiner als 1; es werden nur vier Zehntel von 3 genommen.",
     "Das Komma wird immer gestrichen."
    ],
    "answer": 1,
    "hint": "Vergleiche mit 3 · 1 = 3.",
    "why": "3 · 0,4 = 1,2. Ein positiver Faktor unter 1 verkleinert.",
    "lesson": "multiply-smaller",
    "skill": "Mehrfach oder nur ein Anteil?"
   }
  ],
  "advanced": false,
  "requires": [
   "m1"
  ],
  "goal": "Mal 0,5 heißt: die Hälfte nehmen",
  "extension": false
 },
 {
  "id": "m3",
  "region": "mill",
  "title": "Stoff für die Windsegel",
  "npc": "Tessa · Weberin",
  "story": "Berechne Stoffpreise und vergrößere Muster um Zehnerfaktoren.",
  "reward": "Die Weberei zeigt neue bunte Windsegel.",
  "kind": "banner",
  "x": 6,
  "z": 5,
  "tasks": [
   {
    "type": "number",
    "text": "Stoff kostet 2,40 Taler je Meter. Du kaufst 1,5 m. Wie viel kostet das?",
    "answer": "3.6",
    "unit": "Taler",
    "hint": "Ein Meter kostet 2,40; ein halber Meter 1,20.",
    "why": "2,40 · 1,5 = 3,60 Taler.",
    "lesson": "unit-price",
    "skill": "Preis je Meter mal gekaufte Länge"
   },
   {
    "type": "number",
    "text": "Ein 0,037 m langes Muster wird auf das Zehnfache vergrößert. Wie lang ist es dann?",
    "answer": "0.37",
    "unit": "m",
    "hint": "Beim Verzehnfachen wird jede Ziffer eine Stelle wertvoller.",
    "why": "0,037 · 10 = 0,37 m.",
    "lesson": "times-ten",
    "skill": "Zehnmal so viel: jede Stelle wird mehr wert"
   },
   {
    "type": "number",
    "text": "Ein Fadenstück misst 0,46 m. Wie lang sind 100 solcher Stücke zusammen?",
    "answer": "46",
    "unit": "m",
    "hint": "Beim Malnehmen mit 100 wird jede Ziffer zwei Stellen wertvoller.",
    "why": "0,46 · 100 = 46 m.",
    "lesson": "times-hundred",
    "skill": "Hundertmal so viel: zwei Stellen"
   }
  ],
  "advanced": false,
  "requires": [
   "m2"
  ],
  "goal": "Preis je Meter mal gekaufte Länge",
  "extension": false
 },
 {
  "id": "m4",
  "region": "mill",
  "title": "Der Kristallverstärker",
  "npc": "Tessa · Weberin",
  "story": "Verstärke das Mühlenlicht. Nutze passende Rechenwege und prüfe die Größe des Ergebnisses.",
  "reward": "Ein goldener Kristall versorgt die Mühle mit Licht.",
  "kind": "crystal",
  "x": -6,
  "z": 5,
  "tasks": [
   {
    "type": "number",
    "text": "Ein Kristall liefert 0,8 Lichtpunkte. Der Verstärker vervielfacht sie mit 0,25. Wie viele Lichtpunkte entstehen?",
    "answer": "0.2",
    "unit": "",
    "hint": "0,25 bedeutet ein Viertel.",
    "why": "0,8 · 0,25 = 0,20. Ein Viertel von 0,8 ist 0,2.",
    "lesson": "multiply-quarter",
    "skill": "Mal 0,25: ein Viertel"
   },
   {
    "type": "choice",
    "text": "Welcher Rechenweg berechnet 4 · 2,75 geschickt?",
    "options": [
     "4 · 2 + 4 · 0,75",
     "4 · 2 + 0,75",
     "4 + 2 + 0,75"
    ],
    "answer": 0,
    "hint": "Verteile den Faktor 4 auf beide Teile der Summe.",
    "why": "4 · (2 + 0,75) = 8 + 3 = 11. Das ist das Verteilungsgesetz.",
    "lesson": "distribute",
    "skill": "Eine Menge in passende Teile zerlegen"
   },
   {
    "type": "number",
    "text": "Zwei Verstärker liefern je 1,25 · 2,4 Lichtpunkte. Wie viele Lichtpunkte liefern beide zusammen?",
    "answer": "6",
    "unit": "",
    "hint": "Zuerst 1,25 · 2,4 = 3; dann verdoppeln.",
    "why": "2 · (1,25 · 2,4) = 2 · 3 = 6.",
    "lesson": "product-then-double",
    "skill": "Erst ein Gerät, dann beide"
   }
  ],
  "advanced": true,
  "requires": [
   "m3",
   "v3"
  ],
  "goal": "Mal 0,25: ein Viertel",
  "extension": false
 },
 {
  "id": "d1",
  "region": "cave",
  "title": "Der hungrige Schleimling",
  "npc": "Bloop · Grottenbewohner",
  "story": "Bloop ist nicht böse, nur hungrig. Teile den Beerensaft fair, dann lässt er dich zum Grottenfeuer.",
  "reward": "Bloop ist satt und wird dein Freund.",
  "kind": "slime",
  "x": -6,
  "z": 3,
  "tasks": [
   {
    "type": "number",
    "text": "Drei Schleimlinge teilen 3,6 l Saft gerecht. Wie viel bekommt jeder?",
    "answer": "1.2",
    "unit": "l",
    "hint": "36 Zehntel werden auf drei Schleimlinge verteilt.",
    "why": "3,6 : 3 = 1,2 l je Schleimling.",
    "lesson": "divide-equal",
    "skill": "Gerecht verteilen"
   },
   {
    "type": "number",
    "text": "Vier Schleimlinge teilen 3 l Beerensaft gerecht. Wie viel bekommt jeder?",
    "answer": "0.75",
    "unit": "l",
    "hint": "3 : 4 entspricht drei Vierteln.",
    "why": "3 l : 4 = 0,75 l pro Schleimling.",
    "lesson": "divide-leftover",
    "skill": "Wenn ganze Liter nicht gleich aufgehen"
   },
   {
    "type": "number",
    "text": "6 kg Beeren werden in 8 gleiche Portionen geteilt. Wie schwer ist eine Portion?",
    "answer": "0.75",
    "unit": "kg",
    "hint": "60 Zehntel : 8 = 7 Zehntel, Rest 4 Zehntel; teile weiter.",
    "why": "6 : 8 = 0,75. Prüfe: 8 · 0,75 = 6.",
    "lesson": "divide-leftover",
    "skill": "Wenn ganze Liter nicht gleich aufgehen"
   },
   {
    "type": "choice",
    "text": "Welche Probe passt zu 4,8 : 6 = 0,8?",
    "options": [
     "0,8 · 6 = 4,8",
     "4,8 · 6 = 0,8",
     "6 : 0,8 = 4,8"
    ],
    "answer": 0,
    "hint": "Multiplikation macht das Teilen rückgängig.",
    "why": "Portionsgröße · Anzahl = Gesamtmenge.",
    "lesson": "divide-proof",
    "skill": "Portion mal Anzahl: die Probe"
   }
  ],
  "advanced": false,
  "requires": [
   "m3"
  ],
  "goal": "Gerecht verteilen",
  "extension": false
 },
 {
  "id": "d2",
  "region": "cave",
  "title": "Die Trankwerkstatt",
  "npc": "Fips · Pilzalchemist",
  "story": "Fülle Tränke in gleich große Fläschchen. Diesmal suchst du die Anzahl der Portionen.",
  "reward": "Die Trankwerkstatt ist mit leuchtenden Flaschen gefüllt.",
  "kind": "mushroom",
  "x": 6,
  "z": 4,
  "tasks": [
   {
    "type": "number",
    "text": "Du hast 2,4 l Trank. Jede Flasche fasst 0,3 l. Wie viele volle Flaschen erhältst du?",
    "answer": "8",
    "unit": "Flaschen",
    "hint": "Rechne in Zehntellitern: 24 : 3.",
    "why": "2,4 : 0,3 = 24 : 3 = 8.",
    "lesson": "portion-tenths",
    "skill": "Wie viele Flaschen werden voll?"
   },
   {
    "type": "number",
    "text": "In einem Kessel sind 4,5 l. Wie viele Becher zu je 0,75 l lassen sich füllen?",
    "answer": "6",
    "unit": "Becher",
    "hint": "Erweitere beide Zahlen mit 100: 450 : 75.",
    "why": "4,5 : 0,75 = 450 : 75 = 6.",
    "lesson": "portion-hundred",
    "skill": "Kleinere Portionen: beide in Hundertsteln"
   },
   {
    "type": "choice",
    "text": "Was passiert bei 2 : 0,5?",
    "options": [
     "Das Ergebnis ist 1.",
     "Das Ergebnis ist 4, weil vier Hälften in 2 passen.",
     "Das Ergebnis ist immer kleiner als 2."
    ],
    "answer": 1,
    "hint": "Wie viele halbe Liter passen in zwei Liter?",
    "why": "2 : 0,5 = 4. Teilen durch eine positive Zahl unter 1 vergrößert die Maßzahl.",
    "lesson": "divide-small",
    "skill": "Kleine Portionen ergeben mehr Stücke"
   }
  ],
  "advanced": false,
  "requires": [
   "d1",
   "v3"
  ],
  "goal": "Wie viele Flaschen werden voll?",
  "extension": false
 },
 {
  "id": "d3",
  "region": "cave",
  "title": "Die Tür der Zehner",
  "npc": "Fips · Pilzalchemist",
  "story": "Die Runentür prüft, wie sich Zahlen beim Teilen verändern. Verschiebe die Stellenwerte sicher.",
  "reward": "Die alte Runentür leuchtet und steht offen.",
  "kind": "gate",
  "x": 5,
  "z": -6,
  "tasks": [
   {
    "type": "number",
    "text": "Ein Kristall von 4,8 kg wird in 10 gleiche Stücke geteilt. Wie schwer ist ein Stück?",
    "answer": "0.48",
    "unit": "kg",
    "hint": "Beim Teilen durch 10 wird jede Ziffer eine Stelle weniger wert.",
    "why": "4,8 : 10 = 0,48 kg.",
    "lesson": "divide-ten",
    "skill": "Durch 10: jede Stelle wird kleiner"
   },
   {
    "type": "number",
    "text": "2,5 l werden auf 100 gleich große Fläschchen verteilt. Wie viel enthält jedes?",
    "answer": "0.025",
    "unit": "l",
    "hint": "Teile erst durch 10, dann noch einmal durch 10.",
    "why": "2,5 : 100 = 0,025 l = 25 ml.",
    "lesson": "divide-hundred",
    "skill": "Durch 100: zweimal durch 10"
   },
   {
    "type": "choice",
    "text": "Welche Umformung lässt 3,6 : 0,12 unverändert?",
    "options": [
     "36 : 0,12",
     "360 : 12",
     "3,6 : 12"
    ],
    "answer": 1,
    "hint": "Du musst Dividend und Divisor mit derselben Zahl multiplizieren.",
    "why": "3,6 : 0,12 = 360 : 12 = 30. Beide Zahlen wurden mit 100 multipliziert.",
    "lesson": "divide-scale",
    "skill": "Beide Zahlen gleich verändern"
   }
  ],
  "advanced": false,
  "requires": [
   "d2"
  ],
  "goal": "Durch 10: jede Stelle wird kleiner",
  "extension": false
 },
 {
  "id": "d4",
  "region": "cave",
  "title": "Der Hüter der Teilgrotten",
  "npc": "Glubsch · Grottenhüter",
  "story": "Der große Hüter möchte ein gerechtes Grottenfest. Löse seine drei Versorgungsrätsel.",
  "reward": "Der Grottenhüter ist besänftigt. Ein Sternenlicht erwacht.",
  "kind": "boss",
  "x": -6,
  "z": -6,
  "tasks": [
   {
    "type": "number",
    "text": "5,25 kg Pilze werden auf 7 Körbe verteilt. Wie viele Kilogramm kommen in jeden Korb?",
    "answer": "0.75",
    "unit": "kg",
    "hint": "Prüfe, welche Zahl mit 7 multipliziert 5,25 ergibt.",
    "why": "5,25 : 7 = 0,75 kg.",
    "lesson": "divide-equal",
    "skill": "Gerecht verteilen"
   },
   {
    "type": "number",
    "text": "3,6 m Band werden in Stücke von je 0,45 m geteilt. Wie viele Stücke erhältst du?",
    "answer": "8",
    "unit": "Stücke",
    "hint": "Multipliziere beide Maßzahlen mit 100: 360 : 45.",
    "why": "3,6 : 0,45 = 8 Stücke.",
    "lesson": "portion-hundred",
    "skill": "Kleinere Portionen: beide in Hundertsteln"
   },
   {
    "type": "number",
    "text": "Du brauchst 8 Becher mit je 0,3 l. Im Krug sind 1,8 l. Wie viel Trank fehlt noch?",
    "answer": "0.6",
    "unit": "l",
    "hint": "Gesamtbedarf: 8 · 0,3 l. Ziehe dann den Vorrat ab.",
    "why": "8 · 0,3 − 1,8 = 2,4 − 1,8 = 0,6 l.",
    "lesson": "need-minus-stock",
    "skill": "Erst den Bedarf, dann den Fehlbetrag"
   }
  ],
  "advanced": true,
  "requires": [
   "d3",
   "s1"
  ],
  "goal": "Gerecht verteilen",
  "extension": false
 },
 {
  "id": "k1",
  "region": "castle",
  "title": "Die Versorgung der Sternenburg",
  "npc": "Ari · Sternenhüter",
  "story": "Die Burg bereitet sich auf das Sternenfest vor. Plane Vorräte, Kosten und die letzte Lieferung.",
  "reward": "Der Burghof erhält Vorräte und bunte Wimpel.",
  "kind": "tower",
  "x": -6,
  "z": 3,
  "tasks": [
   {
    "type": "number",
    "text": "12 Gäste trinken je 0,25 l Saft. Wie viele Liter braucht ihr?",
    "answer": "3",
    "unit": "l",
    "hint": "Vier Viertelliter ergeben einen Liter.",
    "why": "12 · 0,25 = 3 l.",
    "lesson": "model",
    "skill": "Was wird in der Geschichte gesucht?"
   },
   {
    "type": "number",
    "text": "Saft kostet 1,40 Taler je Liter. Wie viel kosten die benötigten 3 l?",
    "answer": "4.2",
    "unit": "Taler",
    "hint": "Multipliziere die benötigte Menge mit dem Preis je Liter.",
    "why": "3 · 1,40 = 4,20 Taler.",
    "lesson": "unit-price",
    "skill": "Preis je Meter mal gekaufte Länge"
   },
   {
    "type": "number",
    "text": "Im Burgtank sind schon 750 ml. Wie viele Liter fehlen bis zu den benötigten 3 l?",
    "answer": "2.25",
    "unit": "l",
    "hint": "750 ml = 0,75 l.",
    "why": "3 − 0,75 = 2,25 l.",
    "lesson": "need-minus-stock",
    "skill": "Erst den Bedarf, dann den Fehlbetrag"
   }
  ],
  "advanced": true,
  "requires": [
   "h3",
   "a4",
   "s4",
   "m4",
   "d4",
   "f4",
   "v4"
  ],
  "goal": "Was wird in der Geschichte gesucht?",
  "extension": false
 },
 {
  "id": "k2",
  "region": "castle",
  "title": "Die Schatzkammer",
  "npc": "Ari · Sternenhüter",
  "story": "Nicht jede glänzende Rechnung passt zur Geschichte. Wähle ein Modell und rechne mit ihm.",
  "reward": "Die Schatzkammer öffnet sich.",
  "kind": "chest",
  "x": 6,
  "z": 4,
  "tasks": [
   {
    "type": "choice",
    "text": "Drei Lampen kosten je 2,50 Taler. Für alles zusammen gibt es 1,20 Taler Rabatt. Welche Rechnung passt?",
    "options": [
     "3 · (2,50 − 1,20)",
     "3 · 2,50 − 1,20",
     "3 + 2,50 − 1,20"
    ],
    "answer": 1,
    "hint": "Der Rabatt wird nur einmal vom gesamten Preis abgezogen.",
    "why": "Erst die drei Lampen bezahlen, dann den einmaligen Rabatt abziehen.",
    "lesson": "one-discount",
    "skill": "Ein Rabatt für alles zusammen"
   },
   {
    "type": "number",
    "text": "Wie viel kosten die drei Lampen nach dem einmaligen Rabatt von 1,20 Talern?",
    "answer": "6.3",
    "unit": "Taler",
    "hint": "Punkt vor Strich: zuerst 3 · 2,50.",
    "why": "3 · 2,50 − 1,20 = 7,50 − 1,20 = 6,30 Taler.",
    "lesson": "operations",
    "skill": "Klammern, dann Punkt, dann Strich"
   },
   {
    "type": "number",
    "text": "Drei Freunde teilen diese 6,30 Taler gerecht. Wie viel zahlt jeder?",
    "answer": "2.1",
    "unit": "Taler",
    "hint": "Teile den Gesamtpreis durch 3.",
    "why": "6,30 : 3 = 2,10 Taler pro Person.",
    "lesson": "divide-equal",
    "skill": "Gerecht verteilen"
   }
  ],
  "advanced": true,
  "requires": [
   "k1"
  ],
  "goal": "Ein Rabatt für alles zusammen",
  "extension": false
 },
 {
  "id": "k3",
  "region": "castle",
  "title": "Der kleine Sternendrache",
  "npc": "Yumi · Sternendrache",
  "story": "Yumi bewacht das Licht. Sie möchte keine Kämpfe, sondern passende Schutzsteine und einen gut geplanten Flug.",
  "reward": "Yumi schließt Freundschaft mit dir.",
  "kind": "dragon",
  "x": -6,
  "z": -6,
  "tasks": [
   {
    "type": "order",
    "text": "Ordne die Schutzsteine von der kleinsten zur größten Kraft.",
    "items": [
     "2,05",
     "2,5",
     "2,005",
     "2,15"
    ],
    "answer": [
     2,
     0,
     3,
     1
    ],
    "hint": "Ergänze auf Tausendstel: 2,050; 2,500; 2,005; 2,150.",
    "why": "2,005 < 2,050 < 2,150 < 2,500.",
    "lesson": "order-thousand",
    "skill": "Mehrere Zahlen der Reihe nach"
   },
   {
    "type": "number",
    "text": "Yumi braucht 0,45 kg Sternenfutter je Flugrunde. Wie viel braucht sie für 6 Runden?",
    "answer": "2.7",
    "unit": "kg",
    "hint": "Rechne 45 · 6 und setze zwei Nachkommastellen.",
    "why": "0,45 · 6 = 2,70 kg.",
    "lesson": "multiply-integer",
    "skill": "Ganze Anzahl mal Dezimalmenge"
   },
   {
    "type": "number",
    "text": "3 kg Futter liegen bereit. Wie viel bleibt nach den 6 Runden übrig?",
    "answer": "0.3",
    "unit": "kg",
    "hint": "Ziehe den Bedarf 2,70 kg vom Vorrat ab.",
    "why": "3,00 − 2,70 = 0,30 kg.",
    "lesson": "subtract-exchange",
    "skill": "Ein Zehntel in Hundertstel tauschen"
   }
  ],
  "advanced": true,
  "requires": [
   "k2"
  ],
  "goal": "Mehrere Zahlen der Reihe nach",
  "extension": false
 },
 {
  "id": "k4",
  "region": "castle",
  "title": "Das große Sternenlicht",
  "npc": "Ari · Sternenhüter",
  "story": "Bring das Sternenlicht zurück. Erst mit den drei anderen Burgquests und diesem letzten Bauplan ist das Fest vollständig.",
  "reward": "Das Sternenlicht strahlt über ganz Kommaland.",
  "kind": "beacon",
  "x": 6,
  "z": -6,
  "tasks": [
   {
    "type": "number",
    "text": "Für vier Lichtbögen brauchst du je 1,25 m Band. Weitere 0,8 m schmücken die Spitze. Wie viel Band brauchst du insgesamt?",
    "answer": "5.8",
    "unit": "m",
    "hint": "Erst 4 · 1,25; danach 0,8 addieren.",
    "why": "4 · 1,25 + 0,8 = 5 + 0,8 = 5,8 m.",
    "lesson": "operations",
    "skill": "Klammern, dann Punkt, dann Strich"
   },
   {
    "type": "number",
    "text": "Eine Rolle hat 8 m Band. Wie viel bleibt nach dem Bau übrig?",
    "answer": "2.2",
    "unit": "m",
    "hint": "Ziehe den Gesamtbedarf 5,8 m ab.",
    "why": "8,0 − 5,8 = 2,2 m.",
    "lesson": "subtract-basic",
    "skill": "Eine Menge wegnehmen"
   },
   {
    "type": "number",
    "text": "Aus den restlichen 2,2 m werden Schleifen mit je 0,55 m Band. Wie viele Schleifen entstehen?",
    "answer": "4",
    "unit": "Schleifen",
    "hint": "Rechne 2,2 : 0,55 als 220 : 55.",
    "why": "2,2 : 0,55 = 4. Dein Bauplan geht genau auf!",
    "lesson": "plan-leftover",
    "skill": "Mit dem Rest weiterplanen"
   }
  ],
  "advanced": true,
  "requires": [
   "k3"
  ],
  "goal": "Klammern, dann Punkt, dann Strich",
  "extension": false
 }
];
export const INFO = {
 "village": [
  {
   "id": "between"
  },
  {
   "id": "half-name"
  },
  {
   "id": "tenths"
  },
  {
   "id": "half-tenths"
  },
  {
   "id": "write-tenths"
  },
  {
   "id": "places-tenths"
  },
  {
   "id": "hundred-grid"
  },
  {
   "id": "write-hundred"
  },
  {
   "id": "zero-hundred"
  },
  {
   "id": "places-hundred"
  },
  {
   "id": "equal-zeros"
  },
  {
   "id": "thousand"
  },
  {
   "id": "write-thousand"
  },
  {
   "id": "fraction-meaning"
  },
  {
   "id": "fraction-tenths"
  },
  {
   "id": "fraction-hundred"
  },
  {
   "id": "fraction-quarter"
  },
  {
   "id": "fraction-threequarters"
  },
  {
   "id": "fraction-thousand"
  }
 ],
 "forest": [
  {
   "id": "compare-tenths"
  },
  {
   "id": "compare-hundred"
  },
  {
   "id": "order-thousand"
  },
  {
   "id": "limits"
  },
  {
   "id": "line-tenths"
  },
  {
   "id": "line-fives"
  },
  {
   "id": "midpoint"
  },
  {
   "id": "round-near"
  },
  {
   "id": "round-digit"
  },
  {
   "id": "round-carry"
  },
  {
   "id": "estimate"
  }
 ],
 "harbor": [
  {
   "id": "metres-cm"
  },
  {
   "id": "cm-metres"
  },
  {
   "id": "kilometres"
  },
  {
   "id": "kg-grams"
  },
  {
   "id": "grams-kg"
  },
  {
   "id": "litres-ml"
  },
  {
   "id": "ml-litres"
  },
  {
   "id": "time-half"
  },
  {
   "id": "time-quarter"
  },
  {
   "id": "money"
  },
  {
   "id": "square-units"
  },
  {
   "id": "cube-units"
  },
  {
   "id": "cube-litre"
  }
 ],
 "market": [
  {
   "id": "add-tenths"
  },
  {
   "id": "add-align"
  },
  {
   "id": "add-carry"
  },
  {
   "id": "add-thousand"
  },
  {
   "id": "add-group"
  },
  {
   "id": "add-units"
  }
 ],
 "cliffs": [
  {
   "id": "subtract-basic"
  },
  {
   "id": "subtract-exchange"
  },
  {
   "id": "subtract-whole"
  },
  {
   "id": "subtract-thousand"
  },
  {
   "id": "missing"
  },
  {
   "id": "subtract-proof"
  },
  {
   "id": "two-subtractions"
  }
 ],
 "mill": [
  {
   "id": "multiply-repeat"
  },
  {
   "id": "multiply-integer"
  },
  {
   "id": "multiply-half"
  },
  {
   "id": "multiply-decimal"
  },
  {
   "id": "rectangle"
  },
  {
   "id": "rectangle-decimal"
  },
  {
   "id": "multiply-smaller"
  },
  {
   "id": "unit-price"
  },
  {
   "id": "times-ten"
  },
  {
   "id": "times-hundred"
  },
  {
   "id": "multiply-quarter"
  },
  {
   "id": "distribute"
  },
  {
   "id": "product-then-double"
  }
 ],
 "cave": [
  {
   "id": "divide-equal"
  },
  {
   "id": "divide-leftover"
  },
  {
   "id": "divide-proof"
  },
  {
   "id": "portion-tenths"
  },
  {
   "id": "portion-hundred"
  },
  {
   "id": "divide-small"
  },
  {
   "id": "divide-ten"
  },
  {
   "id": "divide-hundred"
  },
  {
   "id": "divide-scale"
  },
  {
   "id": "need-minus-stock"
  }
 ],
 "castle": [
  {
   "id": "model"
  },
  {
   "id": "one-discount"
  },
  {
   "id": "operations"
  },
  {
   "id": "plan-leftover"
  }
 ]
};

evolveContent(QUESTS);

export const regionById=id=>REGIONS.find(r=>r.id===id);
export const questById=id=>QUESTS.find(q=>q.id===id);
export const questsIn=id=>QUESTS.filter(q=>q.region===id);
export function regionUnlocked(id,completed){const r=regionById(id);return !!r&&r.unlock.every(key=>!!completed[key]);}
export function questUnlocked(q,completed){return !!q&&(q.challenge ? (q.requires||[]).every(id=>!!completed[id]) : regionUnlocked(q.region,completed)&&(q.requires||[]).every(id=>!!completed[id]));}
export function missingRequirements(q,completed){return [...new Set([...regionById(q.region).unlock,...(q.requires||[])])].filter(id=>!completed[id]);}
export function requirementText(id,completed){const q=questById(id),ids=q?missingRequirements(q,completed):regionById(id).unlock.filter(key=>!completed[key]);return ids.length?'Zuerst: '+ids.map(key=>'„'+questById(key).title+'“').join(', ')+'.':'Du kannst hier beginnen.';}
export const BADGES={village:'v4',forest:'f4',harbor:'h3',market:'a4',cliffs:'s4',mill:'m4',cave:'d4'};
export function badgeEarned(region,completed){return !!completed[BADGES[region]];}
/** Retrieval uses only actual completed tasks, never merely a visited region. */
export function makeEncounter(completed,count){
 const known=QUESTS.filter(q=>completed[q.id]&&q.region!=='castle');
 const q=known[count%Math.max(known.length,1)]||QUESTS[0];
 const task=q.tasks[Math.floor(count/Math.max(known.length,1))%q.tasks.length];
 return {id:'encounter',region:q.region,title:'Mikos Erinnerungsrätsel',npc:'Miko · Waldkobold',story:'Erinnerst du dich an dieses kleine Problem aus „'+q.title+'“? Hilf mir beim Nachdenken – oder reise in Ruhe weiter.',reward:'Miko hat sich wieder erinnert und hüpft zurück in den Wald.',tasks:[{...task}],kind:'slime'};
}

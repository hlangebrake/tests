/** Each task points to one short concept card and a separate worked example. */
export const LESSONS = {
 "between": {
  "id": "between",
  "region": "village",
  "title": "Was liegt zwischen 2 und 3?",
  "text": "Wir nehmen gleich große Kannen. Zwei volle Kannen enthalten weniger als drei volle Kannen. Zwei volle Kannen und eine halbe Kanne liegen genau dazwischen. „Ein halb“ bedeutet: eines von zwei gleich großen Teilen.",
  "example": {
   "prompt": "Die Länge eines Seils liegt genau in der Mitte zwischen 4 m und 5 m. Wie beschreibst du seine Länge?",
   "steps": [
    "Stelle dir vier ganze Meter vor.",
    "Vom nächsten Meter kommt genau die Hälfte dazu.",
    "Das Seil ist vier und ein halber Meter lang."
   ]
  },
  "visual": {
   "kind": "halves",
   "whole": 2
  }
 },
 "half-name": {
  "id": "half-name",
  "region": "village",
  "title": "Ein neuer Name für „zweieinhalb“",
  "text": "Zwei und ein halb schreiben wir auch 2,5. Gesprochen: „zwei Komma fünf“. Die Zahl liegt genau in der Mitte zwischen 2 und 3. Warum die 5 zur Hälfte passt, entdeckst du gleich mit zehn gleich großen Teilen.",
  "example": {
   "prompt": "Auf einem Wegschild steht 4,5 km. Was bedeutet das?",
   "steps": [
    "Die 4 steht für vier ganze Kilometer.",
    "Die Schreibweise „Komma fünf“ beschreibt hier einen weiteren halben Kilometer.",
    "4,5 km sind vier und ein halber Kilometer."
   ]
  },
  "visual": {
   "kind": "halfline",
   "start": 2,
   "end": 3,
   "mark": 2.5
  }
 },
 "tenths": {
  "id": "tenths",
  "region": "village",
  "title": "Ein Ganzes in zehn gleiche Teile",
  "text": "Teile einen ganzen Meter in zehn gleich lange Stücke. Jedes Stück heißt ein Zehntel Meter. Zehn dieser Stücke ergeben zusammen wieder den ganzen Meter.",
  "example": {
   "prompt": "Ein Band von 1 m wird in zehn gleich lange Stücke geteilt. Drei Stücke werden blau gefärbt.",
   "steps": [
    "Es sind zehn gleich große Teile des ganzen Bandes.",
    "Jedes Teil ist ein Zehntel Meter lang.",
    "Die drei blauen Teile sind zusammen drei Zehntel Meter lang."
   ]
  },
  "visual": {
   "kind": "strip",
   "parts": 10,
   "filled": 3,
   "label": "3 von 10 gleichen Teilen"
  }
 },
 "half-tenths": {
  "id": "half-tenths",
  "region": "village",
  "title": "Darum passt die 5 zur Hälfte",
  "text": "Fünf von zehn gleich großen Teilen füllen genau die Hälfte. Deshalb sind fünf Zehntel ein halb. 2,5 bedeutet also: zwei Ganze und fünf Zehntel – oder zwei und ein halb.",
  "example": {
   "prompt": "Ein Messband zeigt 4,5 m. Warum sind das vier und ein halber Meter?",
   "steps": [
    "Vier Meter sind ganz vorhanden.",
    "Vom nächsten Meter kommen fünf der zehn gleichen Teile hinzu.",
    "Fünf Zehntel sind ein halb: 4,5 m sind vier und ein halber Meter."
   ]
  },
  "visual": {
   "kind": "strip",
   "parts": 10,
   "filled": 5,
   "label": "5 Zehntel = ein halb"
  }
 },
 "write-tenths": {
  "id": "write-tenths",
  "region": "village",
  "title": "Zehntel bekommen die erste Stelle",
  "text": "Direkt rechts vom Komma schreiben wir die Anzahl der Zehntel. Links stehen die ganzen Einer. Ohne ganzes Stück steht dort eine 0.",
  "example": {
   "prompt": "Eine kleine Kanne enthält vier Zehntel Liter. Schreibe die Menge mit Komma.",
   "steps": [
    "Es ist kein ganzer Liter: links steht 0.",
    "Es sind vier Zehntel: direkt rechts vom Komma steht 4.",
    "Vier Zehntel Liter schreiben wir 0,4 l."
   ]
  },
  "visual": {
   "kind": "place",
   "number": "0,4",
   "digits": [
    "0",
    "4"
   ],
   "names": [
    "Einer",
    "Zehntel"
   ]
  }
 },
 "places-tenths": {
  "id": "places-tenths",
  "region": "village",
  "title": "Einer und Zehntel unterscheiden",
  "text": "Die Stelle sagt, wie viel eine Ziffer wert ist. Bei 1,7 steht die 1 für einen Einer. Die 7 rechts vom Komma steht für sieben Zehntel, nicht für sieben Ganze.",
  "example": {
   "prompt": "Welche Stellen haben die Ziffern auf einem Schild mit 4,3 m?",
   "steps": [
    "Links vom Komma steht 4: vier Einer.",
    "Direkt rechts steht 3: drei Zehntel.",
    "4,3 m bestehen aus 4 m und drei Zehnteln eines Meters."
   ]
  },
  "visual": {
   "kind": "place",
   "number": "1,7",
   "digits": [
    "1",
    "7"
   ],
   "names": [
    "Einer",
    "Zehntel"
   ]
  }
 },
 "hundred-grid": {
  "id": "hundred-grid",
  "region": "village",
  "title": "Noch genauer: ein Hundertstel",
  "text": "Ein Ganzes hat zehn Zehntel. Teile jetzt jedes Zehntel noch einmal in zehn gleiche Teile. Es entstehen zehn Reihen mit je zehn Kästchen: 100 gleiche Teile. Ein Kästchen heißt ein Hundertstel.",
  "example": {
   "prompt": "Eine Beetfläche wird in zehn Reihen mit je zehn Kästchen eingeteilt. Was ist ein Kästchen?",
   "steps": [
    "Zehn Reihen mit je zehn Kästchen ergeben 100 Kästchen.",
    "Alle Kästchen sind gleich groß.",
    "Jedes Kästchen ist ein Hundertstel der ganzen Beetfläche."
   ]
  },
  "visual": {
   "kind": "grid",
   "filled": 10,
   "label": "1 Zehntel = 10 Hundertstel"
  }
 },
 "write-hundred": {
  "id": "write-hundred",
  "region": "village",
  "title": "Hundertstel in die Zahl einbauen",
  "text": "Zehn Hundertstel ergeben ein Zehntel. Bei 24 Hundertsteln sind das zwei Zehntel und vier Hundertstel. Wir schreiben 0,24: die Hundertstel stehen an der zweiten Stelle nach dem Komma.",
  "example": {
   "prompt": "Ein Beutel enthält 47 Hundertstel Kilogramm. Wie lautet das Etikett?",
   "steps": [
    "40 Hundertstel sind vier Zehntel.",
    "Sieben Hundertstel bleiben übrig.",
    "0 Einer, 4 Zehntel, 7 Hundertstel: 0,47 kg."
   ]
  },
  "visual": {
   "kind": "grid",
   "filled": 24,
   "label": "24 Hundertstel = 2 Zehntel und 4 Hundertstel"
  }
 },
 "zero-hundred": {
  "id": "zero-hundred",
  "region": "village",
  "title": "Eine freie Stelle braucht eine Null",
  "text": "Sechs Hundertstel sind noch kein Zehntel. Deshalb bleibt die Zehntelstelle mit einer 0 besetzt: 0,06. Ohne diese Null wäre 0,6 sechs Zehntel – eine andere Menge.",
  "example": {
   "prompt": "Der Tropfer braucht acht Hundertstel Liter. Wie stellst du ihn ein?",
   "steps": [
    "Kein ganzer Liter: 0 vor dem Komma.",
    "Keine vollen Zehntel: 0 direkt nach dem Komma.",
    "Acht Hundertstel an der zweiten Stelle: 0,08 l."
   ]
  },
  "visual": {
   "kind": "place",
   "number": "0,06",
   "digits": [
    "0",
    "0",
    "6"
   ],
   "names": [
    "Einer",
    "Zehntel",
    "Hundertstel"
   ]
  }
 },
 "places-hundred": {
  "id": "places-hundred",
  "region": "village",
  "title": "Eine kleine Stellenwerttafel",
  "text": "Lies die Stellen einzeln: Einer, Komma, Zehntel, Hundertstel. Die Namen beziehen sich auf gleich große Teile eines Ganzen. Du musst nicht alle Ziffern als eine einzige ganze Zahl lesen.",
  "example": {
   "prompt": "Auf einem Brett steht 2,46 m. Was bedeuten die Ziffern?",
   "steps": [
    "2 bedeutet zwei ganze Meter.",
    "4 bedeutet vier Zehntel Meter.",
    "6 bedeutet sechs Hundertstel Meter."
   ]
  },
  "visual": {
   "kind": "place",
   "number": "2,46",
   "digits": [
    "2",
    "4",
    "6"
   ],
   "names": [
    "Einer",
    "Zehntel",
    "Hundertstel"
   ]
  }
 },
 "equal-zeros": {
  "id": "equal-zeros",
  "region": "village",
  "title": "Gleiche Menge, feiner eingeteilt",
  "text": "Ein Zehntel besteht aus zehn Hundertsteln. Vier Zehntel sind daher 40 Hundertstel: 0,4 = 0,40. Eine angehängte Null am Ende des Nachkommateils verändert die Menge nicht.",
  "example": {
   "prompt": "Passen die Schilder 0,7 l und 0,70 l auf dieselbe Kanne?",
   "steps": [
    "0,7 l sind sieben Zehntel Liter.",
    "Jedes Zehntel sind zehn Hundertstel: sieben Zehntel sind 70 Hundertstel.",
    "Ja: 0,7 l und 0,70 l beschreiben dieselbe Menge."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "4 Zehntel = 40 Hundertstel",
    "0,4 = 0,40"
   ]
  }
 },
 "thousand": {
  "id": "thousand",
  "region": "village",
  "title": "Ein Hundertstel noch einmal teilen",
  "text": "Teile jedes der 100 Hundertstel noch einmal in zehn gleiche Teile. Das Ganze hat dann 1000 gleiche Teile. Eines davon heißt ein Tausendstel. Diese Stelle steht nach den Hundertsteln.",
  "example": {
   "prompt": "Ein ganzer Kristallstab wird in 1000 gleich große Teile zerlegt. Wie heißen die Teile?",
   "steps": [
    "Zuerst entstehen 100 Hundertstel.",
    "Jedes Hundertstel wird in zehn Teile zerlegt: 100 · 10 = 1000.",
    "Ein Teil ist ein Tausendstel des ganzen Stabes."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1 Ganzes → 100 Hundertstel",
    "1 Hundertstel → 10 Tausendstel"
   ]
  }
 },
 "write-thousand": {
  "id": "write-thousand",
  "region": "village",
  "title": "Tausendstel stehen an dritter Stelle",
  "text": "Nach dem Komma kommen Zehntel, Hundertstel, Tausendstel. Für sieben Tausendstel brauchen die ersten beiden Stellen eine Null: 0,007. Angehängte Nullen funktionieren auch hier: 0,3 = 0,300.",
  "example": {
   "prompt": "Ein Zierdraht ist neun Tausendstel Meter dick. Wie schreibst du das?",
   "steps": [
    "Einer, Zehntel und Hundertstel sind jeweils 0.",
    "Die 9 gehört an die dritte Stelle nach dem Komma.",
    "Der Draht ist 0,009 m dick."
   ]
  },
  "visual": {
   "kind": "place",
   "number": "0,007",
   "digits": [
    "0",
    "0",
    "0",
    "7"
   ],
   "names": [
    "Einer",
    "Zehntel",
    "Hundertstel",
    "Tausendstel"
   ]
  }
 },
 "fraction-meaning": {
  "id": "fraction-meaning",
  "region": "village",
  "title": "Brüche erinnern: unten teilen, oben zählen",
  "text": "Bei einem Bruch nennt die untere Zahl, in wie viele gleich große Teile das Ganze geteilt ist. Die obere Zahl zählt die gemeinten Teile. 1/2 heißt: eines von zwei gleich großen Teilen, also ein halb.",
  "example": {
   "prompt": "Was bedeutet 2/5 einer Vorratskiste?",
   "steps": [
    "Die 5 unten sagt: Das Ganze ist in fünf gleiche Teile geteilt.",
    "Die 2 oben sagt: Zwei dieser Teile sind gemeint.",
    "2/5 bedeutet zwei von fünf gleich großen Teilen."
   ]
  },
  "visual": {
   "kind": "fraction",
   "top": 1,
   "bottom": 2
  }
 },
 "fraction-tenths": {
  "id": "fraction-tenths",
  "region": "village",
  "title": "Zehntel als Bruch und Kommazahl",
  "text": "Bei 4/10 sagt die 10 unten: zehn gleich große Teile. Die 4 oben zählt vier Teile. Das sind vier Zehntel. Deshalb schreiben wir 4/10 auch als 0,4. Es wird nichts gerechnet oder gekürzt.",
  "example": {
   "prompt": "Auf einer Kiste steht 9/10 kg. Welches Dezimaletikett passt?",
   "steps": [
    "Die 10 unten nennt die Zehntel.",
    "Die 9 oben zählt neun Zehntel.",
    "Neun Zehntel sind 0,9 kg."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "4/10 = vier Zehntel",
    "vier Zehntel = 0,4"
   ]
  }
 },
 "fraction-hundred": {
  "id": "fraction-hundred",
  "region": "village",
  "title": "Hundertstel auch als Bruch schreiben",
  "text": "Zwei Stellen nach dem Komma passen zu Hundertsteln. 0,28 sind 28 Hundertstel, also 28/100. Andersherum sind 43/100 genau 0,43. Die 100 sagt, wie fein das Ganze geteilt ist.",
  "example": {
   "prompt": "Ein Glas enthält 0,62 l. Welcher Hundertstelbruch beschreibt die Menge?",
   "steps": [
    "Sechs Zehntel sind 60 Hundertstel.",
    "Zwei Hundertstel kommen dazu: 62 Hundertstel.",
    "Das Etikett kann auch 62/100 l heißen."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "0,28 = 28 Hundertstel",
    "28 Hundertstel = 28/100"
   ]
  }
 },
 "fraction-quarter": {
  "id": "fraction-quarter",
  "region": "village",
  "title": "Ein Viertel ohne Bruchrechen-Trick",
  "text": "Ein Viertel ist eines von vier gleich großen Teilen. Im Hunderterfeld gehören zu jedem Viertel 25 Kästchen, denn viermal 25 sind 100. Ein Viertel sind also 25 Hundertstel: 1/4 = 0,25.",
  "example": {
   "prompt": "Eine Vorratsfläche ist zu zwei Vierteln belegt. Welche Dezimalzahl beschreibt das?",
   "steps": [
    "Ein Viertel sind 25 von 100 Kästchen.",
    "Zwei Viertel sind 25 + 25 = 50 Kästchen.",
    "2/4 = 50/100 = 0,50. Das ist die Hälfte."
   ]
  },
  "visual": {
   "kind": "grid",
   "filled": 25,
   "label": "1 Viertel = 25 Hundertstel = 0,25"
  }
 },
 "fraction-threequarters": {
  "id": "fraction-threequarters",
  "region": "village",
  "title": "Drei Viertel zusammensetzen",
  "text": "Ein Viertel entspricht 25 Hundertsteln. Für drei Viertel nimmst du drei solche Teile: 25 + 25 + 25 = 75 Hundertstel. Also gilt 3/4 = 0,75. Du musst dafür keine Bruchregel auswendig wissen.",
  "example": {
   "prompt": "Zwei Viertel eines Kuchens werden eingepackt. Welcher Anteil ist das als Dezimalzahl?",
   "steps": [
    "Ein Viertel sind 25 Hundertstel.",
    "Zwei gleiche Viertel sind 25 + 25 = 50 Hundertstel.",
    "Der eingepackte Anteil ist 0,50 = 0,5."
   ]
  },
  "visual": {
   "kind": "grid",
   "filled": 75,
   "label": "3 Viertel = 75 Hundertstel"
  }
 },
 "fraction-thousand": {
  "id": "fraction-thousand",
  "region": "village",
  "title": "Tausendstel in zwei Schreibweisen",
  "text": "Bei drei Stellen nach dem Komma kannst du die Zahl in Tausendsteln lesen. 0,237 bedeutet 237 Tausendstel, also 237/1000. Ein Kürzen des Bruchs ist dafür nicht nötig.",
  "example": {
   "prompt": "Ein Messwert lautet 0,346. Schreibe ihn als Tausendstelbruch.",
   "steps": [
    "Die letzte Stelle ist die Tausendstelstelle.",
    "0,346 enthält 346 Tausendstel.",
    "Die Bruchschreibweise ist 346/1000."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "0,237 = 237 Tausendstel",
    "237 Tausendstel = 237/1000"
   ]
  }
 },
 "compare-tenths": {
  "id": "compare-tenths",
  "region": "forest",
  "title": "Erst Ganze, dann Zehntel vergleichen",
  "text": "Vergleiche zuerst die Einer. Sind sie gleich, vergleichst du die Zehntel. Die größere Anzahl gleich großer Teile bedeutet die größere Zahl.",
  "example": {
   "prompt": "Welcher Stein ist stärker: 3,2 oder 3,6?",
   "steps": [
    "Beide haben drei Ganze.",
    "Zwei Zehntel sind weniger als sechs Zehntel.",
    "3,2 < 3,6: Der zweite Stein ist stärker."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "3,2 < 3,6",
    "2 Zehntel < 6 Zehntel"
   ]
  }
 },
 "compare-hundred": {
  "id": "compare-hundred",
  "region": "forest",
  "title": "Gleich fein einteilen hilft",
  "text": "Ergänze bei Bedarf Nullen am Ende. Dann kannst du die gleichen Stellen vergleichen. Die erste unterschiedliche Stelle von links entscheidet. Mehr Ziffern allein bedeuten nicht mehr Wert.",
  "example": {
   "prompt": "Welcher Messwert ist größer: 0,6 oder 0,58?",
   "steps": [
    "Schreibe 0,6 als 0,60.",
    "Vergleiche die Zehntel: 6 sind mehr als 5.",
    "0,60 > 0,58, also 0,6 > 0,58."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "0,6 = 0,60",
    "0,60 > 0,58"
   ]
  }
 },
 "order-thousand": {
  "id": "order-thousand",
  "region": "forest",
  "title": "Mehrere Zahlen der Reihe nach",
  "text": "Ergänze bis zur gleichen Anzahl an Nachkommastellen. Suche die kleinste Zahl, dann die nächste. Vergleiche Einer, Zehntel, Hundertstel und erst danach Tausendstel.",
  "example": {
   "prompt": "Ordne 2,3; 2,03; 2,035 von klein nach groß.",
   "steps": [
    "Schreibe 2,300; 2,030; 2,035.",
    "2,030 und 2,035 sind kleiner als 2,300. Zwischen ihnen entscheidet die Tausendstelstelle.",
    "2,03 < 2,035 < 2,3."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "2,030 < 2,035 < 2,300"
   ]
  }
 },
 "limits": {
  "id": "limits",
  "region": "forest",
  "title": "„Mehr als“ und „höchstens“",
  "text": "„Mehr als“ schließt die Grenze selbst aus. „Höchstens“ erlaubt die Grenze noch. Vergleiche mit dem genauen Wert, nicht mit einem gerundeten Ersatz.",
  "example": {
   "prompt": "Eine Kiste darf höchstens 1,8 kg wiegen. Passen 1,80 kg und 1,801 kg?",
   "steps": [
    "Schreibe die Grenze als 1,800 kg.",
    "1,80 kg ist genau die Grenze: erlaubt.",
    "1,801 kg ist größer als 1,800 kg: nicht erlaubt."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "höchstens 1,8: 1,80 passt",
    "1,801 ist schon zu viel"
   ]
  }
 },
 "line-tenths": {
  "id": "line-tenths",
  "region": "forest",
  "title": "Die Schritte auf dem Zahlenweg",
  "text": "Schau zuerst auf Anfang, Ende und Teilung. Zwischen 0 und 1 liegen hier zehn gleich große Schritte. Jeder Schritt ist ein Zehntel, also 0,1.",
  "example": {
   "prompt": "Wo liegt 0,4 auf einer Zehntelskala von 0 bis 1?",
   "steps": [
    "Starte bei 0.",
    "Gehe vier Schritte von je 0,1 nach rechts.",
    "Nach 0,1; 0,2; 0,3 kommst du bei 0,4 an."
   ]
  },
  "visual": {
   "kind": "line",
   "start": 0,
   "end": 1,
   "step": 0.1,
   "mark": 0.4
  }
 },
 "line-fives": {
  "id": "line-fives",
  "region": "forest",
  "title": "Eine andere Skala: Schritte von 0,05",
  "text": "Nicht jeder kleine Strich bedeutet 0,1. Auf dieser Skala wächst die Zahl je Strich um fünf Hundertstel: 0,05. Lies die beschrifteten Nachbarstriche, bevor du zählst.",
  "example": {
   "prompt": "Gehe von 2,00 drei Schritte mit je 0,05 weiter.",
   "steps": [
    "Der erste Schritt führt zu 2,05.",
    "Der zweite führt zu 2,10.",
    "Der dritte führt zu 2,15."
   ]
  },
  "visual": {
   "kind": "line",
   "start": 2,
   "end": 2.5,
   "step": 0.05,
   "mark": 2.15
  }
 },
 "midpoint": {
  "id": "midpoint",
  "region": "forest",
  "title": "Die Mitte hat gleiche Abstände",
  "text": "Ein Punkt in der Mitte ist von beiden Enden gleich weit entfernt. Bei zwei Zehnteln Abstand liegt die Mitte einen Zehntelschritt von jedem Ende entfernt.",
  "example": {
   "prompt": "Wo ist die Mitte zwischen 3,1 und 3,3?",
   "steps": [
    "Von 3,1 nach 3,3 sind es zwei Zehntelschritte.",
    "Ein Schritt nach rechts von 3,1 führt zu 3,2.",
    "Von 3,2 nach 3,3 ist es ebenfalls ein Schritt."
   ]
  },
  "visual": {
   "kind": "line",
   "start": 3.1,
   "end": 3.3,
   "step": 0.1,
   "mark": 3.2
  }
 },
 "round-near": {
  "id": "round-near",
  "region": "forest",
  "title": "Runden heißt: einen nahen Wert nehmen",
  "text": "Ein Schild braucht manchmal nur eine ungefähre Entfernung. Beim Runden auf Zehntel wählst du den näheren der beiden benachbarten Zehntelwerte. Die wirkliche Strecke verändert sich dabei nicht.",
  "example": {
   "prompt": "Welcher Zehntelwert liegt näher bei 4,23: 4,2 oder 4,3?",
   "steps": [
    "Die Nachbarn sind 4,20 und 4,30.",
    "Von 4,23 zu 4,20 sind es 3 Hundertstel; zu 4,30 sind es 7.",
    "4,23 wird auf Zehntel zu 4,2 gerundet."
   ]
  },
  "visual": {
   "kind": "line",
   "start": 4.2,
   "end": 4.3,
   "step": 0.01,
   "mark": 4.23
  }
 },
 "round-digit": {
  "id": "round-digit",
  "region": "forest",
  "title": "Welche Ziffer entscheidet beim Runden?",
  "text": "Markiere die Stelle, auf die du runden sollst. Nur die direkt folgende Ziffer entscheidet: bei 0 bis 4 bleibt die Rundungsziffer; bei 5 bis 9 wird sie um eins erhöht. Die späteren Stellen entfallen.",
  "example": {
   "prompt": "Runde 5,678 auf Hundertstel.",
   "steps": [
    "Die zweite Stelle nach dem Komma ist die Hundertstelstelle: 7.",
    "Die nächste Ziffer ist 8. Daher wird die 7 erhöht.",
    "5,678 wird zu 5,68."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "auf Hundertstel: 5,678 ≈ 5,68",
    "Die Tausendstelziffer 8 entscheidet."
   ]
  }
 },
 "round-carry": {
  "id": "round-carry",
  "region": "forest",
  "title": "Beim Runden kann ein Ganzes entstehen",
  "text": "Soll eine 9 erhöht werden, entstehen zehn Teile dieser Stelle. Bündele sie zur nächstgrößeren Stelle. Das kann auch die Einerzahl verändern.",
  "example": {
   "prompt": "Runde 4,97 auf Zehntel.",
   "steps": [
    "Die 7 an der Hundertstelstelle verlangt Aufrunden.",
    "Neun Zehntel plus ein Zehntel sind ein Ganzes.",
    "4,97 wird zu 5,0."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "4,9 + 0,1 = 5,0",
    "4,97 ≈ 5,0"
   ]
  }
 },
 "estimate": {
  "id": "estimate",
  "region": "forest",
  "title": "Erst grob prüfen",
  "text": "Für einen Überschlag ersetzt du die Angaben durch nahe, leicht rechenbare Zahlen. Das Ergebnis ist ungefähr. Es hilft, einen groben Rechenfehler zu bemerken.",
  "example": {
   "prompt": "Zwei Wege sind 3,8 km und 2,1 km lang. Wie lang sind sie ungefähr zusammen?",
   "steps": [
    "3,8 liegt nahe bei 4.",
    "2,1 liegt nahe bei 2.",
    "4 + 2 = 6: zusammen ungefähr 6 km."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "3,8 + 2,1 ≈ 4 + 2 = 6"
   ]
  }
 },
 "metres-cm": {
  "id": "metres-cm",
  "region": "harbor",
  "title": "Ein Meter hat 100 Zentimeter",
  "text": "Stell dir einen Meterstab vor: Er hat 100 Zentimeter. Ein Zehntel Meter hat zehn Zentimeter. Ein Hundertstel Meter ist genau ein Zentimeter.",
  "example": {
   "prompt": "Wie viele Zentimeter sind 1,46 m?",
   "steps": [
    "Ein ganzer Meter sind 100 cm.",
    "46 Hundertstel Meter sind 46 cm.",
    "100 cm + 46 cm = 146 cm."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1 m = 100 cm",
    "0,01 m = 1 cm"
   ]
  }
 },
 "cm-metres": {
  "id": "cm-metres",
  "region": "harbor",
  "title": "Von Zentimetern zurück zu Metern",
  "text": "Ein Zentimeter ist ein Hundertstel Meter. Lies die Zentimeterzahl deshalb als Hundertstel. Bei weniger als 100 cm steht vor dem Komma eine 0.",
  "example": {
   "prompt": "Ein Brett ist 64 cm lang. Wie viele Meter sind das?",
   "steps": [
    "1 cm ist 0,01 m.",
    "64 cm sind 64 Hundertstel Meter.",
    "64 cm = 0,64 m."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "64 cm = 64 Hundertstel m",
    "64 cm = 0,64 m"
   ]
  }
 },
 "kilometres": {
  "id": "kilometres",
  "region": "harbor",
  "title": "Ein Kilometer hat 1000 Meter",
  "text": "Ein Kilometer sind 1000 Meter. Ein Zehntel Kilometer sind 100 Meter. Zerlege die Angabe in ganze Kilometer und den Rest.",
  "example": {
   "prompt": "Ein Küstenweg ist 2,4 km lang. Wie viele Meter sind das?",
   "steps": [
    "2 ganze Kilometer sind 2000 m.",
    "Vier Zehntel Kilometer sind 400 m.",
    "2000 m + 400 m = 2400 m."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1 km = 1000 m",
    "0,1 km = 100 m"
   ]
  }
 },
 "kg-grams": {
  "id": "kg-grams",
  "region": "harbor",
  "title": "Ein Kilogramm hat 1000 Gramm",
  "text": "1 kg entspricht 1000 g. Ein Gramm ist ein Tausendstel Kilogramm. Ergänze bei Bedarf auf drei Nachkommastellen, um die Gramm abzulesen.",
  "example": {
   "prompt": "Wie viele Gramm sind 0,48 kg?",
   "steps": [
    "Schreibe 0,48 kg als 0,480 kg.",
    "Das sind 480 Tausendstel Kilogramm.",
    "0,48 kg = 480 g."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1 kg = 1000 g",
    "0,001 kg = 1 g"
   ]
  }
 },
 "grams-kg": {
  "id": "grams-kg",
  "region": "harbor",
  "title": "Gramm in Kilogramm ausdrücken",
  "text": "1000 Gramm bilden ein ganzes Kilogramm. Der Rest wird als Tausendstel Kilogramm geschrieben. Die Menge bleibt gleich; nur die Einheit ändert sich.",
  "example": {
   "prompt": "Eine Kiste wiegt 1380 g. Wie viele Kilogramm sind das?",
   "steps": [
    "1000 g sind 1 kg. Es bleiben 380 g.",
    "380 g sind 380 Tausendstel Kilogramm: 0,380 kg.",
    "1380 g = 1,380 kg = 1,38 kg."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1380 g = 1000 g + 380 g",
    "1380 g = 1,380 kg"
   ]
  }
 },
 "litres-ml": {
  "id": "litres-ml",
  "region": "harbor",
  "title": "Ein Liter hat 1000 Milliliter",
  "text": "Ein Liter besteht aus 1000 Millilitern. Ein Milliliter ist ein Tausendstel Liter. Ein halber Liter entspricht 500 Millilitern.",
  "example": {
   "prompt": "Wie viele Milliliter sind 1,6 l?",
   "steps": [
    "Ein ganzer Liter sind 1000 ml.",
    "Sechs Zehntel Liter sind 600 ml.",
    "1,6 l = 1600 ml."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1 l = 1000 ml",
    "0,5 l = 500 ml"
   ]
  }
 },
 "ml-litres": {
  "id": "ml-litres",
  "region": "harbor",
  "title": "Milliliter als Tausendstel lesen",
  "text": "Die Milliliterzahl zählt Tausendstel eines Liters. Schreibe deshalb zunächst drei Stellen nach dem Komma. Eine Null ganz am Ende darfst du anschließend weglassen.",
  "example": {
   "prompt": "Wie viele Liter sind 420 ml?",
   "steps": [
    "420 ml sind 420 Tausendstel Liter.",
    "Schreibe 0,420 l.",
    "Die letzte Null darf entfallen: 0,42 l."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "420 ml = 0,420 l = 0,42 l"
   ]
  }
 },
 "time-half": {
  "id": "time-half",
  "region": "harbor",
  "title": "Eine Stunde ist nicht hundert Minuten",
  "text": "Eine Stunde hat 60 Minuten. Eine halbe Stunde hat die Hälfte davon: 30 Minuten. Deshalb bedeutet 1,5 h nicht 1 Stunde 50 Minuten.",
  "example": {
   "prompt": "Wie viele Minuten dauert eine Reise von 2,5 h?",
   "steps": [
    "Zwei ganze Stunden sind 2 · 60 = 120 Minuten.",
    "0,5 h ist eine halbe Stunde: 30 Minuten.",
    "120 + 30 = 150 Minuten."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1 h = 60 min",
    "0,5 h = 30 min"
   ]
  }
 },
 "time-quarter": {
  "id": "time-quarter",
  "region": "harbor",
  "title": "Viertelstunden wiedererkennen",
  "text": "0,25 ist ein Viertel. Eine Viertelstunde ist ein Viertel von 60 Minuten: 15 Minuten. Ganze Stunden und Viertelstunden kannst du getrennt lesen.",
  "example": {
   "prompt": "Was bedeutet 2,25 h?",
   "steps": [
    "Die 2 beschreibt zwei ganze Stunden.",
    "0,25 h ist eine Viertelstunde: 60 : 4 = 15 Minuten.",
    "2,25 h bedeutet 2 Stunden und 15 Minuten."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "0,25 h = 1/4 h = 15 min"
   ]
  }
 },
 "money": {
  "id": "money",
  "region": "harbor",
  "title": "Euro und Cent",
  "text": "Ein Euro hat 100 Cent. Cent sind also Hundertstel eines Euros. Die zwei Stellen nach dem Komma geben die Cent an.",
  "example": {
   "prompt": "Ein Ticket kostet 3,07 €. Wie viele Cent sind das?",
   "steps": [
    "3 € entsprechen 300 ct.",
    "0,07 € entsprechen 7 ct.",
    "Das Ticket kostet 307 ct."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1 € = 100 ct",
    "0,01 € = 1 ct"
   ]
  }
 },
 "square-units": {
  "id": "square-units",
  "region": "harbor",
  "title": "Flächen: in zwei Richtungen teilen",
  "text": "Eine Fläche ist nicht nur eine Länge. Ein Quadrat von 1 m mal 1 m ist 10 dm breit und 10 dm lang. Darin liegen 10 · 10 = 100 Quadrate von je 1 dm².",
  "example": {
   "prompt": "Wie viele dm² sind 2,5 m²?",
   "steps": [
    "Ein Quadratmeter sind 100 dm².",
    "2 m² sind 200 dm²; ein halber m² sind 50 dm².",
    "2,5 m² = 250 dm²."
   ]
  },
  "visual": {
   "kind": "grid",
   "filled": 100,
   "label": "1 m² = 10 dm · 10 dm = 100 dm²"
  }
 },
 "cube-units": {
  "id": "cube-units",
  "region": "harbor",
  "title": "Rauminhalt: auch die Höhe zählt",
  "text": "Ein Würfel von 1 m Kantenlänge hat zehn kleine Würfel in jeder Richtung. Zehn Schichten mit je 100 Würfeln ergeben 1000 dm³. Die Umrechnung ist hier nicht dieselbe wie bei Längen.",
  "example": {
   "prompt": "Wie viele dm³ sind 0,4 m³?",
   "steps": [
    "Ein Kubikmeter enthält 1000 dm³.",
    "Ein Zehntel davon enthält 100 dm³.",
    "Vier Zehntel sind 400 dm³."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1 m³ = 10 · 10 · 10 dm³",
    "1 m³ = 1000 dm³"
   ]
  }
 },
 "cube-litre": {
  "id": "cube-litre",
  "region": "harbor",
  "title": "Ein Kubikdezimeter fasst einen Liter",
  "text": "Ein Würfel mit 1 dm Länge, Breite und Höhe hat den Rauminhalt 1 dm³. Genau dieser Rauminhalt entspricht einem Liter.",
  "example": {
   "prompt": "Ein Behälter hat einen Rauminhalt von 6 dm³. Wie viele Liter fasst er?",
   "steps": [
    "1 dm³ entspricht 1 l.",
    "Sechs solche Einheiten entsprechen sechs Litern.",
    "6 dm³ = 6 l."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1 dm³ = 1 l"
   ]
  }
 },
 "add-tenths": {
  "id": "add-tenths",
  "region": "market",
  "title": "Ganze zu Ganzen, Zehntel zu Zehnteln",
  "text": "Addition heißt hier: zwei Mengen zusammennehmen. Addiere zuerst die Einer und die Zehntel jeweils für sich. Die Stellen bezeichnen dabei gleich große Teile.",
  "example": {
   "prompt": "Zwei Vorräte sind 2,1 kg und 1,3 kg. Wie viel ist das zusammen?",
   "steps": [
    "Die Einer: 2 + 1 = 3.",
    "Die Zehntel: 1 + 3 = 4.",
    "Zusammen sind es 3,4 kg."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "2,1 + 1,3 = 3,4"
   ]
  }
 },
 "add-align": {
  "id": "add-align",
  "region": "market",
  "title": "Beim Addieren die Stellen ausrichten",
  "text": "Schreibe Komma unter Komma. Fehlende Nachkommastellen darfst du mit Nullen ergänzen. So stehen Einer unter Einern, Zehntel unter Zehnteln und Hundertstel unter Hundertsteln.",
  "example": {
   "prompt": "Addiere 2,3 l und 1,45 l.",
   "steps": [
    "Ergänze 2,3 zu 2,30.",
    "Hundertstel: 0 + 5 = 5. Zehntel: 3 + 4 = 7. Einer: 2 + 1 = 3.",
    "2,30 + 1,45 = 3,75 l."
   ]
  },
  "visual": {
   "kind": "arithmetic",
   "rows": [
    "  2,30",
    "+ 1,45",
    "  3,75"
   ]
  }
 },
 "add-carry": {
  "id": "add-carry",
  "region": "market",
  "title": "Zehn kleine Teile werden ein größeres",
  "text": "Zehn Hundertstel sind ein Zehntel. Zehn Zehntel sind ein Einer. Werden es beim Addieren zehn oder mehr Teile, bündelst du und überträgst nach links.",
  "example": {
   "prompt": "Eine Bäckerei mischt 0,67 kg und 0,58 kg.",
   "steps": [
    "7 + 8 = 15 Hundertstel: 5 bleiben, 1 Zehntel wird übertragen.",
    "6 + 5 + 1 = 12 Zehntel: 2 bleiben, 1 Einer wird übertragen.",
    "Die Gesamtmenge ist 1,25 kg."
   ]
  },
  "visual": {
   "kind": "arithmetic",
   "rows": [
    "  0,67",
    "+ 0,58",
    "  1,25"
   ]
  }
 },
 "add-thousand": {
  "id": "add-thousand",
  "region": "market",
  "title": "Dasselbe Bündeln bei Tausendsteln",
  "text": "Auch zehn Tausendstel sind eine größere Einheit: ein Hundertstel. Beginne beim schriftlichen Addieren ganz rechts und nimm jeden Übertrag in die nächste Spalte mit.",
  "example": {
   "prompt": "Addiere 0,248 kg und 0,352 kg.",
   "steps": [
    "Tausendstel: 8 + 2 = 10, also 0 schreiben und 1 übertragen.",
    "Hundertstel: 4 + 5 + 1 = 10, also wieder 0 schreiben und 1 übertragen.",
    "Zehntel: 2 + 3 + 1 = 6. Ergebnis: 0,600 kg = 0,6 kg."
   ]
  },
  "visual": {
   "kind": "arithmetic",
   "rows": [
    "  0,248",
    "+ 0,352",
    "  0,600"
   ]
  }
 },
 "add-group": {
  "id": "add-group",
  "region": "market",
  "title": "Passende Teile zuerst zusammennehmen",
  "text": "Beim Addieren darfst du die Summanden umordnen. Suche zwei Teile, die ein Ganzes ergeben. Das macht die Rechnung übersichtlicher, verändert aber nicht die Summe.",
  "example": {
   "prompt": "Rechne 2,75 + 1,6 + 0,25 geschickt.",
   "steps": [
    "2,75 und 0,25 ergänzen sich zu 3.",
    "Fasse diese beiden zuerst zusammen.",
    "3 + 1,6 = 4,6."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "(2,75 + 0,25) + 1,6",
    "3 + 1,6 = 4,6"
   ]
  }
 },
 "add-units": {
  "id": "add-units",
  "region": "market",
  "title": "Erst eine gemeinsame Einheit wählen",
  "text": "Bevor du zwei Längen addierst, müssen ihre Maßzahlen zu derselben Einheit gehören. Wandle beispielsweise Zentimeter in Meter um. Danach addierst du wie gewohnt.",
  "example": {
   "prompt": "Ein Band ist 0,8 m lang, ein zweites 45 cm. Wie lang sind sie zusammen in Metern?",
   "steps": [
    "45 cm sind 0,45 m.",
    "Schreibe 0,8 m als 0,80 m.",
    "0,80 m + 0,45 m = 1,25 m."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "45 cm = 0,45 m",
    "0,80 m + 0,45 m = 1,25 m"
   ]
  }
 },
 "subtract-basic": {
  "id": "subtract-basic",
  "region": "cliffs",
  "title": "Eine Menge wegnehmen",
  "text": "Subtraktion beschreibt, was übrig bleibt. Schreibe gleiche Stellen untereinander. Wenn jede Stelle reicht, kannst du ihre Teile direkt abziehen.",
  "example": {
   "prompt": "Von 6,7 m Seil werden 2,4 m abgeschnitten.",
   "steps": [
    "Einer: 6 − 2 = 4.",
    "Zehntel: 7 − 4 = 3.",
    "Es bleiben 4,3 m."
   ]
  },
  "visual": {
   "kind": "arithmetic",
   "rows": [
    "  6,7",
    "− 2,4",
    "  4,3"
   ]
  }
 },
 "subtract-exchange": {
  "id": "subtract-exchange",
  "region": "cliffs",
  "title": "Ein Zehntel in Hundertstel tauschen",
  "text": "Reichen die Hundertstel nicht, tausche ein Zehntel in zehn Hundertstel. Die Gesamtmenge bleibt gleich. Schreibe die Kommas untereinander und rechne von rechts nach links.",
  "example": {
   "prompt": "Von 4,6 m schneidest du 1,28 m ab.",
   "steps": [
    "Schreibe 4,60. Tausche eines der sechs Zehntel: 5 Zehntel und 10 Hundertstel bleiben.",
    "Hundertstel: 10 − 8 = 2. Zehntel: 5 − 2 = 3.",
    "Einer: 4 − 1 = 3. Es bleiben 3,32 m."
   ]
  },
  "visual": {
   "kind": "arithmetic",
   "rows": [
    "  4,60",
    "− 1,28",
    "  3,32"
   ]
  }
 },
 "subtract-whole": {
  "id": "subtract-whole",
  "region": "cliffs",
  "title": "Aus einem Ganzen kleinere Teile machen",
  "text": "Auch bei einer ganzen Zahl darfst du Nullen anhängen: 3 = 3,00. Zum Abziehen tauschst du ein Ganzes in zehn Zehntel und davon ein Zehntel in zehn Hundertstel.",
  "example": {
   "prompt": "Berechne 3,00 − 1,68.",
   "steps": [
    "3,00 wird zu 2 Einern, 9 Zehnteln und 10 Hundertsteln.",
    "Hundertstel: 10 − 8 = 2. Zehntel: 9 − 6 = 3.",
    "Einer: 2 − 1 = 1. Ergebnis: 1,32."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "3,00 = 2 E + 9 z + 10 h",
    "3,00 − 1,68 = 1,32"
   ]
  }
 },
 "subtract-thousand": {
  "id": "subtract-thousand",
  "region": "cliffs",
  "title": "Bis zu Tausendsteln entbündeln",
  "text": "Für drei Nachkommastellen ergänzt du bis zu Tausendsteln. Beim Tauschen gilt immer: Eine Einheit links entspricht zehn Einheiten rechts. Rechne anschließend von rechts nach links.",
  "example": {
   "prompt": "Ein Tank enthält 4 l. 1,246 l werden entnommen.",
   "steps": [
    "4,000 = 3 Einer + 9 Zehntel + 9 Hundertstel + 10 Tausendstel.",
    "10 − 6 = 4; 9 − 4 = 5; 9 − 2 = 7; 3 − 1 = 2.",
    "4,000 − 1,246 = 2,754 l."
   ]
  },
  "visual": {
   "kind": "arithmetic",
   "rows": [
    "  4,000",
    "− 1,246",
    "  2,754"
   ]
  }
 },
 "missing": {
  "id": "missing",
  "region": "cliffs",
  "title": "Welche Menge fehlt zum Ziel?",
  "text": "Du kennst das Ziel und den vorhandenen Teil. Der fehlende Teil ist Ziel minus vorhandener Teil. Du kannst auch vom vorhandenen Wert bis zum Ziel ergänzen.",
  "example": {
   "prompt": "Ein Pfosten soll 2,5 m hoch sein. 1,85 m sind schon gebaut.",
   "steps": [
    "Bis 2,00 m fehlen 0,15 m.",
    "Von 2,00 m bis 2,50 m fehlen 0,50 m.",
    "Insgesamt fehlen 0,65 m. Auch 2,50 − 1,85 = 0,65."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1,85 + 0,65 = 2,50"
   ]
  }
 },
 "subtract-proof": {
  "id": "subtract-proof",
  "region": "cliffs",
  "title": "Mit Addition die Probe machen",
  "text": "Was weggenommen wurde, muss zusammen mit dem Rest wieder den Anfang ergeben. So prüfst du eine Subtraktion, ohne sie bloß zu wiederholen.",
  "example": {
   "prompt": "Stimmt 7,2 − 2,65 = 4,55?",
   "steps": [
    "Nimm den berechneten Rest: 4,55.",
    "Addiere die weggenommene Menge: 4,55 + 2,65.",
    "Das ergibt 7,20. Der Anfangswert stimmt: Die Probe passt."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "Rest + weggenommen = Anfang"
   ]
  }
 },
 "two-subtractions": {
  "id": "two-subtractions",
  "region": "cliffs",
  "title": "Zwei Entnahmen: beide abziehen",
  "text": "Du kannst zwei Mengen nacheinander abziehen oder zuerst beide Entnahmen addieren. Ziehe dann ihre gemeinsame Summe ab. Eine Differenz in der Klammer würde die Geschichte verändern.",
  "example": {
   "prompt": "Von 9 m Band werden 2,4 m und 1,7 m gebraucht.",
   "steps": [
    "Zusammen werden 2,4 + 1,7 = 4,1 m gebraucht.",
    "Ziehe den gesamten Bedarf ab: 9 − 4,1.",
    "Es bleiben 4,9 m. Das ist 9 − (2,4 + 1,7)."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "9 − 2,4 − 1,7",
    "= 9 − (2,4 + 1,7)"
   ]
  }
 },
 "multiply-repeat": {
  "id": "multiply-repeat",
  "region": "mill",
  "title": "Malnehmen fasst gleiche Mengen zusammen",
  "text": "Drei gleiche Beutel bedeuten: dieselbe Menge dreimal addieren. Dafür schreiben wir kurz 3 · Menge. Die Anzahl der Beutel ist ein ganzer Faktor.",
  "example": {
   "prompt": "Vier Fläschchen enthalten je 0,2 l.",
   "steps": [
    "Schreibe 0,2 + 0,2 + 0,2 + 0,2.",
    "Viermal zwei Zehntel sind acht Zehntel.",
    "4 · 0,2 l = 0,8 l."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "0,2 + 0,2 + 0,2 + 0,2",
    "4 · 0,2 = 0,8"
   ]
  }
 },
 "multiply-integer": {
  "id": "multiply-integer",
  "region": "mill",
  "title": "Ganze Anzahl mal Dezimalmenge",
  "text": "Lies die Menge in kleinen Einheiten. Multipliziere ihre Anzahl und schreibe danach zurück. 0,35 kg sind zum Beispiel 35 Hundertstel Kilogramm.",
  "example": {
   "prompt": "Sechs Beutel enthalten je 0,35 kg. Wie viel ist das zusammen?",
   "steps": [
    "Ein Beutel enthält 35 Hundertstel Kilogramm.",
    "6 · 35 = 210 Hundertstel.",
    "210 Hundertstel sind 2,10 kg. Also 6 · 0,35 = 2,1."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "6 · 35 Hundertstel = 210 Hundertstel",
    "6 · 0,35 = 2,10"
   ]
  }
 },
 "multiply-half": {
  "id": "multiply-half",
  "region": "mill",
  "title": "Mal 0,5 heißt: die Hälfte nehmen",
  "text": "0,5 ist die Hälfte von 1. Mal 0,5 nimmt daher die Hälfte der anderen Menge. Ein Faktor zwischen 0 und 1 kann eine Menge verkleinern.",
  "example": {
   "prompt": "Wie viel ist 3,6 · 0,5?",
   "steps": [
    "0,5 bedeutet eine Hälfte.",
    "Die Hälfte von 36 Zehnteln sind 18 Zehntel.",
    "3,6 · 0,5 = 1,8."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "3,6 · 0,5 = 3,6 : 2 = 1,8"
   ]
  }
 },
 "multiply-decimal": {
  "id": "multiply-decimal",
  "region": "mill",
  "title": "Zwei Dezimalfaktoren",
  "text": "Bei 1,4 · 0,3 multiplizierst du Zehntel mit Zehnteln. Dabei entstehen Hundertstel: 14 · 3 = 42 Hundertstel, also 0,42. Allgemein addierst du die Nachkommastellen beider Faktoren für das Ergebnis.",
  "example": {
   "prompt": "Berechne 1,6 · 1,2.",
   "steps": [
    "Rechne zuerst 16 · 12 = 192.",
    "Beide Faktoren haben je eine Nachkommastelle: zusammen zwei.",
    "192 Hundertstel sind 1,92. Probe: etwas mehr als 1,6 ist plausibel."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1,6 · 1,2",
    "16 · 12 = 192 → 1,92"
   ]
  }
 },
 "rectangle": {
  "id": "rectangle",
  "region": "mill",
  "title": "Die Fläche eines Rechtecks",
  "text": "Ein Rechteck wird in gleich große Flächenstücke eingeteilt. Seine Fläche ist Länge mal Breite. Bei Metern erhältst du Quadratmeter, nicht Meter. Ein halber Meter Breite nimmt die Hälfte eines 1-m-breiten Streifens.",
  "example": {
   "prompt": "Ein Beet ist 1,6 m lang und 0,5 m breit.",
   "steps": [
    "Ein 1 m breiter Streifen hätte 1,6 m² Fläche.",
    "Das Beet ist nur halb so breit: Nimm die Hälfte.",
    "1,6 · 0,5 = 0,8 m²."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "Fläche = Länge · Breite",
    "1,6 m · 0,5 m = 0,8 m²"
   ]
  }
 },
 "rectangle-decimal": {
  "id": "rectangle-decimal",
  "region": "mill",
  "title": "Dezimalprodukte als Flächen nutzen",
  "text": "Länge mal Breite gilt auch, wenn beide Maße Dezimalzahlen sind. Rechne zuerst das Produkt aus. Die Flächeneinheit ist m².",
  "example": {
   "prompt": "Ein Beet misst 1,4 m mal 1,3 m.",
   "steps": [
    "Ohne Kommas: 14 · 13 = 182.",
    "Insgesamt zwei Nachkommastellen: 1,82.",
    "Die Fläche ist 1,82 m²."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1,4 · 1,3 = 1,82 m²"
   ]
  }
 },
 "multiply-smaller": {
  "id": "multiply-smaller",
  "region": "mill",
  "title": "Mehrfach oder nur ein Anteil?",
  "text": "Mal 3 nimmt eine Menge dreimal. Mal 0,4 nimmt dagegen nur vier Zehntel der Menge. Bei einer positiven Ausgangsmenge ist das weniger als das Ganze.",
  "example": {
   "prompt": "Warum ist 5 · 0,3 kleiner als 5?",
   "steps": [
    "0,3 bedeutet drei Zehntel, nicht drei Ganze.",
    "Ein Zehntel von 5 ist 0,5. Drei davon sind 1,5.",
    "5 · 0,3 = 1,5 ist deshalb kleiner als 5."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "5 · 0,3 = 1,5",
    "Drei Zehntel sind weniger als ein Ganzes."
   ]
  }
 },
 "unit-price": {
  "id": "unit-price",
  "region": "mill",
  "title": "Preis je Meter mal gekaufte Länge",
  "text": "Der Preis für 1 m ist der Einheitspreis. Für 1,5 m bezahlst du einen ganzen Meter und zusätzlich einen halben Meter. Du kannst die Kosten zusammensetzen oder multiplizieren.",
  "example": {
   "prompt": "Stoff kostet 3,20 Taler je Meter. Was kosten 1,5 m?",
   "steps": [
    "Ein ganzer Meter kostet 3,20 Taler.",
    "Ein halber Meter kostet die Hälfte: 1,60 Taler.",
    "Zusammen 4,80 Taler. Auch 3,20 · 1,5 = 4,80."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "3,20 + 1,60 = 4,80",
    "3,20 · 1,5 = 4,80"
   ]
  }
 },
 "times-ten": {
  "id": "times-ten",
  "region": "mill",
  "title": "Zehnmal so viel: jede Stelle wird mehr wert",
  "text": "Beim Multiplizieren mit 10 wird jedes Tausendstel ein Hundertstel, jedes Hundertstel ein Zehntel und jedes Zehntel ein Einer. Der Wert jeder Ziffer wird zehnmal so groß.",
  "example": {
   "prompt": "Vergrößere 0,048 m auf das Zehnfache.",
   "steps": [
    "4 Hundertstel werden 4 Zehntel.",
    "8 Tausendstel werden 8 Hundertstel.",
    "0,048 · 10 = 0,48 m."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "0,048 · 10 = 0,48"
   ]
  }
 },
 "times-hundred": {
  "id": "times-hundred",
  "region": "mill",
  "title": "Hundertmal so viel: zwei Stellen",
  "text": "Mal 100 ist zweimal hintereinander mal 10. Jede Ziffer wird zwei Stellen wertvoller. Fehlende Plätze werden mit Nullen gefüllt.",
  "example": {
   "prompt": "Wie viel sind 100 Stücke von je 0,32 m?",
   "steps": [
    "Erst mal 10: 0,32 wird 3,2.",
    "Noch einmal mal 10: 3,2 wird 32.",
    "100 · 0,32 m = 32 m."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "0,32 → 3,2 → 32",
    "× 10, dann nochmals × 10"
   ]
  }
 },
 "multiply-quarter": {
  "id": "multiply-quarter",
  "region": "mill",
  "title": "Mal 0,25: ein Viertel",
  "text": "0,25 ist ein Viertel. Mal 0,25 nimmt deshalb ein Viertel der Menge. Du kannst durch 4 teilen oder zweimal halbieren.",
  "example": {
   "prompt": "Berechne 1,2 · 0,25.",
   "steps": [
    "Nimm die Hälfte von 1,2: 0,6.",
    "Halbiere noch einmal: 0,3.",
    "Ein Viertel von 1,2 ist 0,3."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1,2 → Hälfte 0,6 → Hälfte 0,3"
   ]
  }
 },
 "distribute": {
  "id": "distribute",
  "region": "mill",
  "title": "Eine Menge in passende Teile zerlegen",
  "text": "Vier Beutel mit je 2,3 kg enthalten jeweils 2 kg und 0,3 kg. Du darfst beide Teile vervielfachen und die Ergebnisse addieren. Beide Teile brauchen denselben Faktor.",
  "example": {
   "prompt": "Rechne 4 · 2,3 geschickt.",
   "steps": [
    "Zerlege 2,3 in 2 + 0,3.",
    "4 · 2 = 8 und 4 · 0,3 = 1,2.",
    "8 + 1,2 = 9,2."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "4 · (2 + 0,3)",
    "= 4 · 2 + 4 · 0,3"
   ]
  }
 },
 "product-then-double": {
  "id": "product-then-double",
  "region": "mill",
  "title": "Erst ein Gerät, dann beide",
  "text": "Bei zwei gleichen Geräten berechnest du zunächst, was ein Gerät liefert. Danach verdoppelst du dieses Ergebnis. So vermischst du nicht die verschiedenen Angaben.",
  "example": {
   "prompt": "Drei Geräte liefern jeweils 0,8 · 1,5 Lichtpunkte.",
   "steps": [
    "Ein Gerät: 0,8 · 1,5 = 1,2.",
    "Drei gleiche Geräte: 3 · 1,2.",
    "Zusammen sind es 3,6 Lichtpunkte."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "ein Gerät: 0,8 · 1,5 = 1,2",
    "drei Geräte: 3 · 1,2 = 3,6"
   ]
  }
 },
 "divide-equal": {
  "id": "divide-equal",
  "region": "cave",
  "title": "Gerecht verteilen",
  "text": "Beim gerechten Verteilen suchst du die Menge für eine Person. Schreibe die Gesamtmenge bei Bedarf in Zehnteln oder Hundertsteln. Verteile dann diese kleinen Teile.",
  "example": {
   "prompt": "2,4 l Saft werden auf drei Kinder verteilt.",
   "steps": [
    "2,4 l sind 24 Zehntel Liter.",
    "24 Zehntel : 3 = 8 Zehntel pro Kind.",
    "Jedes Kind bekommt 0,8 l."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "24 Zehntel : 3 = 8 Zehntel",
    "2,4 l : 3 = 0,8 l"
   ]
  }
 },
 "divide-leftover": {
  "id": "divide-leftover",
  "region": "cave",
  "title": "Wenn ganze Liter nicht gleich aufgehen",
  "text": "Auch ein ganzer Liter lässt sich in kleinere Teile aufteilen. Wandle für die Rechnung in Hundertstel um. Teile deren Anzahl gerecht und schreibe zurück in Liter.",
  "example": {
   "prompt": "Fünf Liter werden auf vier Krüge verteilt.",
   "steps": [
    "5 l sind 500 Hundertstel Liter.",
    "500 : 4 = 125 Hundertstel je Krug.",
    "125 Hundertstel sind 1,25 l. Probe: 4 · 1,25 = 5."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "5 l : 4 = 500 Hundertstel : 4",
    "= 125 Hundertstel = 1,25 l"
   ]
  }
 },
 "divide-proof": {
  "id": "divide-proof",
  "region": "cave",
  "title": "Portion mal Anzahl: die Probe",
  "text": "Wenn du gerecht geteilt hast, müssen alle Portionen zusammen die ursprüngliche Menge ergeben. Multipliziere die Portion mit der Anzahl der Empfänger.",
  "example": {
   "prompt": "Stimmt 5,4 : 6 = 0,9?",
   "steps": [
    "Sechs Portionen hätten je 0,9.",
    "Rechne 6 · 0,9 = 5,4.",
    "Das ist die Ausgangsmenge. Die Probe passt."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "Anzahl · Portion = Gesamtmenge"
   ]
  }
 },
 "portion-tenths": {
  "id": "portion-tenths",
  "region": "cave",
  "title": "Wie viele Flaschen werden voll?",
  "text": "Hier ist die Größe einer Portion schon bekannt. Gesucht ist die Anzahl. Lies beide Mengen in derselben kleinen Einheit; dann zählst du, wie oft eine Portion hineinpasst.",
  "example": {
   "prompt": "1,8 l werden in Flaschen mit je 0,3 l gefüllt.",
   "steps": [
    "1,8 l sind 18 Zehntel; 0,3 l sind 3 Zehntel.",
    "Wie oft passen 3 Zehntel in 18 Zehntel? 18 : 3 = 6.",
    "Es werden sechs Flaschen voll."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "1,8 l : 0,3 l = 18 : 3",
    "= 6 Flaschen"
   ]
  }
 },
 "portion-hundred": {
  "id": "portion-hundred",
  "region": "cave",
  "title": "Kleinere Portionen: beide in Hundertsteln",
  "text": "Hat eine Portion zwei Nachkommastellen, kannst du beide Mengen in Hundertstel umrechnen. Die Anzahl der Portionen bleibt gleich, weil beide Mengen dieselbe Einheit bekommen.",
  "example": {
   "prompt": "3,5 l werden in Flaschen mit je 0,25 l gefüllt.",
   "steps": [
    "3,5 l sind 350 Hundertstel; 0,25 l sind 25 Hundertstel.",
    "350 : 25 = 14.",
    "Es passen 14 Flaschenportionen hinein. Probe: 14 · 0,25 = 3,5."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "3,5 : 0,25 = 350 : 25 = 14"
   ]
  }
 },
 "divide-small": {
  "id": "divide-small",
  "region": "cave",
  "title": "Kleine Portionen ergeben mehr Stücke",
  "text": "In einen Liter passen zwei halbe Liter. Beim Teilen durch 0,5 zählst du also die Hälften. Die Anzahl kann größer sein als die Maßzahl der Gesamtmenge.",
  "example": {
   "prompt": "Wie viele Halbliterflaschen füllst du mit 3 l?",
   "steps": [
    "In jeden Liter passen zwei Halbliterflaschen.",
    "Bei drei Litern sind es 3 · 2 Flaschen.",
    "3 : 0,5 = 6 Flaschen."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "3 l → 6 halbe Liter",
    "3 : 0,5 = 6"
   ]
  }
 },
 "divide-ten": {
  "id": "divide-ten",
  "region": "cave",
  "title": "Durch 10: jede Stelle wird kleiner",
  "text": "Beim Teilen durch 10 wird aus einem Einer ein Zehntel, aus einem Zehntel ein Hundertstel und aus einem Hundertstel ein Tausendstel. Jede Ziffer bekommt ein Zehntel ihres bisherigen Werts.",
  "example": {
   "prompt": "Verteile 3,7 kg auf zehn gleiche Beutel.",
   "steps": [
    "Drei Einer werden drei Zehntel.",
    "Sieben Zehntel werden sieben Hundertstel.",
    "3,7 : 10 = 0,37 kg je Beutel."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "3,7 : 10 = 0,37"
   ]
  }
 },
 "divide-hundred": {
  "id": "divide-hundred",
  "region": "cave",
  "title": "Durch 100: zweimal durch 10",
  "text": "Teilen durch 100 bedeutet zweimal hintereinander durch 10 teilen. Die Stellen werden zweimal kleiner. Nullen halten dabei leere Stellen frei.",
  "example": {
   "prompt": "Verteile 4,5 l auf 100 gleiche Fläschchen.",
   "steps": [
    "4,5 : 10 = 0,45.",
    "0,45 : 10 = 0,045.",
    "Jedes Fläschchen erhält 0,045 l."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "4,5 → 0,45 → 0,045",
    ": 10, dann nochmals : 10"
   ]
  }
 },
 "divide-scale": {
  "id": "divide-scale",
  "region": "cave",
  "title": "Beide Zahlen gleich verändern",
  "text": "Bei einer Division darfst du beide Zahlen mit derselben Zahl multiplizieren. So bleibt das Verhältnis gleich. Wähle 10 oder 100, damit der Teiler keine Nachkommastellen mehr hat.",
  "example": {
   "prompt": "Berechne 2,8 : 0,07.",
   "steps": [
    "Der Teiler 0,07 soll ganzzahlig werden: mal 100 ergibt 7.",
    "Auch 2,8 wird mit 100 multipliziert: 280.",
    "2,8 : 0,07 = 280 : 7 = 40."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "2,8 : 0,07",
    "= 280 : 7 = 40"
   ]
  }
 },
 "need-minus-stock": {
  "id": "need-minus-stock",
  "region": "cave",
  "title": "Erst den Bedarf, dann den Fehlbetrag",
  "text": "Rechne zuerst aus, wie viel insgesamt gebraucht wird. Ziehe erst danach den vorhandenen Vorrat ab. Die Reihenfolge kommt aus der Geschichte.",
  "example": {
   "prompt": "Sechs Gäste brauchen je 0,4 l. 1,5 l sind schon vorhanden.",
   "steps": [
    "Gesamtbedarf: 6 · 0,4 = 2,4 l.",
    "Vorrat abziehen: 2,4 − 1,5.",
    "Es fehlen 0,9 l."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "Bedarf − Vorrat = Fehlbetrag"
   ]
  }
 },
 "model": {
  "id": "model",
  "region": "castle",
  "title": "Was wird in der Geschichte gesucht?",
  "text": "Markiere gedanklich die gesuchte Menge. Gleiche Mengen mehrfach brauchen mal. Zusammennehmen braucht plus. Ein Rest braucht minus. Gerechtes Verteilen braucht geteilt.",
  "example": {
   "prompt": "Fünf Gäste bekommen je 0,2 l Saft. Welcher Rechenweg passt?",
   "steps": [
    "Gesucht ist die Menge für alle Gäste.",
    "Dieselbe Menge wird fünfmal gebraucht.",
    "Die passende Rechnung ist 5 · 0,2 = 1 l."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "gleich oft → mal",
    "zusammen → plus · Rest → minus"
   ]
  }
 },
 "one-discount": {
  "id": "one-discount",
  "region": "castle",
  "title": "Ein Rabatt für alles zusammen",
  "text": "Lies genau: Ein gemeinsamer Rabatt wird nur einmal vom Gesamtpreis abgezogen. Ein Rabatt auf jedes Stück müsste dagegen bei jedem Stück berücksichtigt werden.",
  "example": {
   "prompt": "Vier Lampen kosten je 1,80 Taler. Auf alles zusammen gibt es 0,50 Taler Rabatt.",
   "steps": [
    "Zuerst alle Lampen: 4 · 1,80 = 7,20 Taler.",
    "Dann einmal den Rabatt abziehen: 7,20 − 0,50.",
    "Der Preis ist 6,70 Taler. Passend ist 4 · 1,80 − 0,50."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "Gesamtpreis − einmaliger Rabatt"
   ]
  }
 },
 "operations": {
  "id": "operations",
  "region": "castle",
  "title": "Klammern, dann Punkt, dann Strich",
  "text": "Klammern werden zuerst berechnet. Danach folgen Multiplikation und Division, zuletzt Addition und Subtraktion. Gleichrangige Operationen rechnest du von links nach rechts.",
  "example": {
   "prompt": "Berechne 2 · 1,8 + 0,7.",
   "steps": [
    "Es gibt keine Klammern.",
    "Zuerst die Multiplikation: 2 · 1,8 = 3,6.",
    "Danach die Addition: 3,6 + 0,7 = 4,3."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "( ) → · und : → + und −"
   ]
  }
 },
 "plan-leftover": {
  "id": "plan-leftover",
  "region": "castle",
  "title": "Mit dem Rest weiterplanen",
  "text": "Eine mehrschrittige Aufgabe hat mehrere Zwischenziele. Schreibe den bisherigen Bedarf oder Rest auf. In der nächsten Teilaufgabe verwendest du diesen Wert weiter, nicht erneut den Anfangsvorrat.",
  "example": {
   "prompt": "Du hast 7 m Band. 4,2 m werden verbaut. Der Rest wird in Stücke von 0,7 m geteilt.",
   "steps": [
    "Rest bestimmen: 7 − 4,2 = 2,8 m.",
    "Anzahl der Stücke: 2,8 : 0,7 = 4.",
    "Probe: 4 · 0,7 m = 2,8 m. Der Rest reicht genau."
   ]
  },
  "visual": {
   "kind": "equation",
   "lines": [
    "Anfang → Bedarf abziehen → Rest aufteilen"
   ]
  }
 }
};
export const lessonById=id=>LESSONS[id];

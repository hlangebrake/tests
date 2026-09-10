/** Compact curriculum authored after the documented official-curriculum review. */
export const CURRICULUM_VERSION=6;
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
  "hint": "Beginne am Brunnen: Dezimalzahlen als zusammenhängendes Stellenwertsystem."
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
  "unlock": [],
  "hint": "Vergleiche Wegmarken und entscheide, wie genau eine Zahl sein muss."
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
  "unlock": [],
  "hint": "Prüfe Fracht, Fahrplan und Lagerraum in passenden Einheiten."
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
  "unlock": [],
  "hint": "Rechne stellenrichtig und wähle geschickte Summen."
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
  "unlock": [],
  "hint": "Entbündle genau und rekonstruiere verlorene Anfangsmengen."
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
  "unlock": [],
  "hint": "Verbinde Produkte, Flächen und Rechenwege."
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
  "unlock": [],
  "hint": "Verteile, portioniere und prüfe deine Quotienten."
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
  "unlock": [],
  "hint": "Wähle selbst passende Rechenarten und überprüfe deinen Plan."
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
  "id": "c6-v1",
  "region": "village",
  "title": "Der Brunnen der Stellenwerte",
  "npc": "Mila · Brunnenhüterin",
  "story": "Der Brunnen ist zerbrochen. Seine Messsteine tragen Zahlen in verschiedenen Schreibweisen. Ordne sie richtig zu und stelle das Messwerk wieder her.",
  "reward": "Das Projekt ist fertig. Der Dorfbrunnen sprudelt wieder.",
  "kind": "fountain",
  "x": 0,
  "z": 0,
  "tasks": [
   {
    "type": "choice",
    "text": "Die Wassermenge liegt genau zwischen 2 l und 3 l. Welche Aussage erklärt 2,5 l?",
    "answer": 1,
    "lesson": "c6-place",
    "purpose": "Vorstellung und Dezimalnotation verbinden, ohne getrennte Mikroquests.",
    "level": "I",
    "options": [
     "2 Ganze und 5 Hundertstel",
     "2 Ganze und 5 Zehntel, also zweieinhalb",
     "25 ganze Liter",
     "2 Ganze und 5 weitere Ganze"
    ],
    "key": "c6:v1:01",
    "stage": "guided",
    "group": "c6-place",
    "hint": "Schreibe die Ziffern in eine Stellenwerttafel. Nullen halten Stellen frei.",
    "introduce": true,
    "skillId": "c6-place",
    "why": "2 Ganze und 5 Zehntel, also zweieinhalb"
   },
   {
    "type": "match",
    "text": "Ordne die Stellenwerte der Zahl 12,304 zu.",
    "answer": [
     0,
     1,
     2,
     3,
     4
    ],
    "lesson": "c6-place",
    "purpose": "Mehrstelliger Ganzteil, innere Null und Tausendstel in einer Darstellung.",
    "level": "II",
    "number": "12,304",
    "items": [
     "1",
     "2",
     "3",
     "0",
     "4"
    ],
    "categories": [
     "Zehner",
     "Einer",
     "Zehntel",
     "Hundertstel",
     "Tausendstel"
    ],
    "unique": true,
    "key": "c6:v1:02",
    "stage": "practice",
    "group": "c6-place",
    "hint": "Schreibe die Ziffern in eine Stellenwerttafel. Nullen halten Stellen frei.",
    "introduce": true,
    "skillId": "c6-place",
    "why": "Schreibe die Ziffern in eine Stellenwerttafel. Nullen halten Stellen frei."
   },
   {
    "type": "number",
    "text": "Der Messstein zeigt 7 Einer und 8 Tausendstel, sonst keine Teile. Welche Dezimalzahl ist das?",
    "answer": "7,008",
    "lesson": "c6-place",
    "purpose": "Nullen als notwendige Platzhalter selbst erzeugen.",
    "level": "II",
    "key": "c6:v1:03",
    "stage": "practice",
    "group": "c6-place",
    "hint": "Schreibe die Ziffern in eine Stellenwerttafel. Nullen halten Stellen frei.",
    "introduce": true,
    "skillId": "c6-place",
    "why": "Eine passende Antwort ist 7,008. Schreibe die Ziffern in eine Stellenwerttafel. Nullen halten Stellen frei."
   },
   {
    "type": "work",
    "text": "Vervollständige die Zerlegung von 103,207. Trage die WERTE der beiden markierten Ziffern ein, nicht nur die Ziffern.",
    "answer": [
     "0,2",
     "0,007"
    ],
    "lesson": "c6-place",
    "purpose": "Stellenwert von Ziffern vom Ziffernwert unterscheiden.",
    "level": "II",
    "fields": [
     "Wert der 2",
     "Wert der 7"
    ],
    "rows": [
     [
      "103,207 = 100 + 3 +",
      {
       "field": 0
      },
      "+",
      {
       "field": 1
      }
     ]
    ],
    "key": "c6:v1:04",
    "stage": "practice",
    "group": "c6-place",
    "hint": "Schreibe die Ziffern in eine Stellenwerttafel. Nullen halten Stellen frei.",
    "introduce": true,
    "skillId": "c6-place",
    "why": "Wert der 2: 0,2 · Wert der 7: 0,007"
   },
   {
    "type": "multi",
    "text": "Welche Zahlen haben denselben Wert wie 15,060? Wähle alle passenden.",
    "answer": [
     0,
     2
    ],
    "lesson": "c6-zeros",
    "purpose": "Angehängte von inneren Nullen unterscheiden.",
    "level": "II",
    "options": [
     "15,06",
     "15,600",
     "15,0600",
     "15,6"
    ],
    "key": "c6:v1:05",
    "stage": "practice",
    "group": "c6-zeros",
    "hint": "Nur Nullen am Ende der Nachkommastellen lassen die übrigen Ziffern an ihrem Platz.",
    "introduce": true,
    "skillId": "c6-zeros",
    "why": "Passend: 15,06 · 15,0600"
   },
   {
    "type": "choice",
    "text": "Jori behauptet: „Wenn ich in 0,037 die Null direkt nach dem Komma streiche, bleibt der Wert gleich.“ Welche Begründung passt?",
    "answer": 1,
    "lesson": "c6-zeros",
    "purpose": "Eine Regel an einem Gegenbeispiel begründet begrenzen.",
    "level": "III",
    "options": [
     "Richtig: Jede Null trägt nichts bei.",
     "Falsch: Aus 3 Hundertsteln werden 3 Zehntel; die Zahl wird zehnmal so groß.",
     "Falsch: Die Zahl wird zehnmal kleiner.",
     "Richtig: Beide Zahlen haben eine 3 und eine 7."
    ],
    "key": "c6:v1:06",
    "stage": "transfer",
    "group": "c6-zeros",
    "hint": "Nur Nullen am Ende der Nachkommastellen lassen die übrigen Ziffern an ihrem Platz.",
    "introduce": true,
    "skillId": "c6-zeros",
    "why": "Falsch: Aus 3 Hundertsteln werden 3 Zehntel; die Zahl wird zehnmal so groß."
   }
  ],
  "requires": [],
  "advanced": false,
  "goal": "Dezimaldarstellung, Stellenwerte, innere und angehängte Nullen",
  "why": "Ein kohärentes Stellenwertkonzept statt sechs Mikroprojekte",
  "legacySources": [
   "v0a",
   "v0b",
   "v1",
   "v0c",
   "v2",
   "v0d"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-v3",
  "region": "village",
  "title": "Vorräte in zwei Schreibweisen",
  "npc": "Jori · Tierpfleger",
  "story": "Die Dorfponys brauchen ihr Futter. Auf dem Vorratsplan stehen Brüche, auf den Messbechern Dezimalzahlen. Verbinde beide Darstellungen.",
  "reward": "Das Projekt ist fertig. Der Pferdeunterstand bekommt Futtertröge und zwei neugierige Ponys.",
  "kind": "stable",
  "x": 8,
  "z": -6,
  "tasks": [
   {
    "type": "mark",
    "text": "Markiere 3/5 des ganzen Futterplans.",
    "answer": 60,
    "lesson": "c6-fractions",
    "purpose": "Bruchanteil als gleich große Fläche darstellen.",
    "level": "I",
    "parts": 100,
    "key": "c6:v3:01",
    "stage": "guided",
    "group": "c6-fractions",
    "hint": "Suche einen gleichwertigen Bruch mit Nenner 10, 100 oder 1000.",
    "introduce": true,
    "skillId": "c6-fractions",
    "why": "Suche einen gleichwertigen Bruch mit Nenner 10, 100 oder 1000."
   },
   {
    "type": "work",
    "text": "Ergänze die gleichwertigen Darstellungen für 7/20 kg Futter.",
    "answer": [
     "35",
     "0,35"
    ],
    "lesson": "c6-fractions",
    "purpose": "Erweitern sichtbar machen statt nur die Dezimalzahl raten.",
    "level": "II",
    "fields": [
     "Zähler bei Nenner 100",
     "Dezimalzahl"
    ],
    "rows": [
     [
      "7/20 =",
      {
       "field": 0
      },
      "/100 =",
      {
       "field": 1
      }
     ]
    ],
    "key": "c6:v3:02",
    "stage": "practice",
    "group": "c6-fractions",
    "hint": "Suche einen gleichwertigen Bruch mit Nenner 10, 100 oder 1000.",
    "introduce": true,
    "skillId": "c6-fractions",
    "why": "Zähler bei Nenner 100: 35 · Dezimalzahl: 0,35"
   },
   {
    "type": "number",
    "text": "Im Messbecher sind 37/1000 l. Schreibe die Menge als Dezimalzahl.",
    "answer": "0,037",
    "lesson": "c6-fractions",
    "purpose": "Tausendstel mit führender Null nach dem Komma.",
    "level": "II",
    "key": "c6:v3:03",
    "stage": "practice",
    "group": "c6-fractions",
    "hint": "Suche einen gleichwertigen Bruch mit Nenner 10, 100 oder 1000.",
    "introduce": true,
    "skillId": "c6-fractions",
    "why": "Eine passende Antwort ist 0,037. Suche einen gleichwertigen Bruch mit Nenner 10, 100 oder 1000."
   },
   {
    "type": "choice",
    "text": "Welcher vollständig gekürzte Bruch entspricht 1,406?",
    "answer": 1,
    "lesson": "c6-fractions",
    "purpose": "Unechter Bruch und Kürzen, nicht bloß Standardviertel.",
    "level": "II",
    "options": [
     "1406/100",
     "703/500",
     "1406/10",
     "703/50"
    ],
    "key": "c6:v3:04",
    "stage": "practice",
    "group": "c6-fractions",
    "hint": "Suche einen gleichwertigen Bruch mit Nenner 10, 100 oder 1000.",
    "introduce": true,
    "skillId": "c6-fractions",
    "why": "703/500"
   },
   {
    "type": "argument",
    "text": "Begründe, warum 3/8 kg und 0,375 kg dieselbe Futtermenge sind.",
    "answer": [
     0,
     1,
     2
    ],
    "lesson": "c6-fractions",
    "purpose": "Äquivalenz begründen und einen ungültigen Darstellungswechsel ausschließen.",
    "level": "III",
    "items": [
     "Erweitere Zähler und Nenner von 3/8 mit 125.",
     "So entsteht 375/1000.",
     "375 Tausendstel sind 0,375.",
     "Multipliziere nur den Nenner mit 125.",
     "Drei Achtel sind 0,38, weil man Zähler und Nenner hintereinander schreibt."
    ],
    "key": "c6:v3:05",
    "stage": "transfer",
    "group": "c6-fractions",
    "hint": "Suche einen gleichwertigen Bruch mit Nenner 10, 100 oder 1000.",
    "introduce": true,
    "skillId": "c6-fractions",
    "why": "Erweitere Zähler und Nenner von 3/8 mit 125. → So entsteht 375/1000. → 375 Tausendstel sind 0,375."
   }
  ],
  "requires": [
   "c6-v1"
  ],
  "advanced": false,
  "goal": "Bruch ↔ endliche Dezimalzahl; Erweitern und Kürzen als Darstellungswechsel",
  "why": "Der Darstellungswechsel benötigt eine eigene Verbindung zum Bruchwissen",
  "legacySources": [
   "v3",
   "v4"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-f1",
  "region": "forest",
  "title": "Wegmarken im Flüsterwald",
  "npc": "Fenn · Waldhüter",
  "story": "Hilf der Waldhüterin, Wegmarken nach Entfernung zu ordnen und fehlende Positionen auf dem Pfad einzutragen.",
  "reward": "Das Projekt ist fertig. Eine Rehfamilie kommt zur ruhigen Lichtung.",
  "kind": "deer",
  "x": -8,
  "z": -5,
  "tasks": [
   {
    "type": "order",
    "text": "Ordne die Weglängen aufsteigend: kleinste Zahl zuerst.",
    "answer": [
     0,
     1,
     2,
     3
    ],
    "lesson": "c6-compare",
    "purpose": "Nahe Zahlen mit inneren Nullen vergleichen.",
    "level": "I",
    "items": [
     "2,005",
     "2,05",
     "2,5",
     "2,505"
    ],
    "key": "c6:f1:01",
    "stage": "guided",
    "group": "c6-compare",
    "hint": "Ergänze hinten Nullen und prüfe die erste unterschiedliche Stelle.",
    "introduce": true,
    "skillId": "c6-compare",
    "why": "2,005 → 2,05 → 2,5 → 2,505"
   },
   {
    "type": "line",
    "text": "Markiere 3,07 auf dem Zahlenstrahl. Die Endpunkte sind 3,0 und 3,1.",
    "answer": 3.07,
    "lesson": "c6-line",
    "purpose": "Skala selbst erschließen; die gesuchte Zahl ist nicht beschriftet.",
    "level": "II",
    "step": 0.01,
    "sparse": true,
    "key": "c6:f1:02",
    "stage": "practice",
    "group": "c6-line",
    "hint": "Zähle die gleich großen Zwischenräume zwischen den beschrifteten Endpunkten.",
    "introduce": true,
    "skillId": "c6-line",
    "start": 3,
    "end": 3.1,
    "why": "Zähle die gleich großen Zwischenräume zwischen den beschrifteten Endpunkten."
   },
   {
    "type": "choice",
    "text": "Welche Entfernung ist größer: 0,409 km oder 0,49 km?",
    "answer": 1,
    "lesson": "c6-compare",
    "purpose": "Typische Ganzzahl-Fehlvorstellung als Distraktor.",
    "level": "II",
    "options": [
     "0,409 km, weil 409 größer als 49 ist",
     "0,49 km, weil 9 Hundertstel mehr als 0 Hundertstel sind",
     "Beide sind gleich, weil die Einer und Zehntel gleich sind",
     "0,409 km, weil mehr Nachkommastellen genauer und deshalb größer sind"
    ],
    "key": "c6:f1:03",
    "stage": "practice",
    "group": "c6-compare",
    "hint": "Ergänze hinten Nullen und prüfe die erste unterschiedliche Stelle.",
    "introduce": true,
    "skillId": "c6-compare",
    "why": "0,49 km, weil 9 Hundertstel mehr als 0 Hundertstel sind"
   },
   {
    "type": "argument",
    "text": "Begründe die Reihenfolge 3,07 < 3,071 < 3,17 < 3,7.",
    "answer": [
     0,
     1,
     2
    ],
    "lesson": "c6-compare",
    "purpose": "Mehrere Stellenwertvergleiche in einer Argumentationskette verbinden.",
    "level": "III",
    "items": [
     "Schreibe alle Zahlen mit drei Nachkommastellen: 3,070; 3,071; 3,170; 3,700.",
     "Vergleiche nach den Einern zuerst Zehntel, dann Hundertstel und Tausendstel.",
     "Die ersten unterschiedlichen Stellen ergeben 070 < 071 < 170 < 700 bei gleichem Ganzteil.",
     "Ordne zuerst nach der Anzahl der Nachkommastellen.",
     "Eine angehängte Null macht eine Zahl zehnmal größer."
    ],
    "key": "c6:f1:04",
    "stage": "transfer",
    "group": "c6-compare",
    "hint": "Ergänze hinten Nullen und prüfe die erste unterschiedliche Stelle.",
    "introduce": true,
    "skillId": "c6-compare",
    "why": "Schreibe alle Zahlen mit drei Nachkommastellen: 3,070; 3,071; 3,170; 3,700. → Vergleiche nach den Einern zuerst Zehntel, dann Hundertstel und Tausendstel. → Die ersten unterschiedlichen Stellen ergeben 070 < 071 < 170 < 700 bei gleichem Ganzteil."
   },
   {
    "type": "number",
    "text": "Eine Wegmarke soll genau in die Mitte zwischen 1,406 km und 1,408 km. Welche Zahl gehört darauf?",
    "answer": "1,407",
    "lesson": "c6-line",
    "purpose": "Zahlengeradenvorstellung auf einen nicht dargestellten Ausschnitt übertragen.",
    "level": "II",
    "introduce": false,
    "key": "c6:f1:05",
    "stage": "practice",
    "group": "c6-line",
    "hint": "Zähle die gleich großen Zwischenräume zwischen den beschrifteten Endpunkten.",
    "skillId": "c6-line",
    "why": "Eine passende Antwort ist 1,407. Zähle die gleich großen Zwischenräume zwischen den beschrifteten Endpunkten."
   }
  ],
  "advanced": false,
  "requires": [
   "c6-v1"
  ],
  "goal": "Ordnen, Zahlengerade und Stellenwertargument",
  "why": "Ordnung wird räumlich und symbolisch verbunden",
  "legacySources": [
   "f1",
   "f2"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-f3",
  "region": "forest",
  "title": "Sicht im Nebel",
  "npc": "Nori · Lichtsammlerin",
  "story": "Im Nebel braucht der Waldtrupp sinnvolle Näherungswerte. Entscheide, wann Runden genügt und wann eine genaue Zahl nötig ist.",
  "reward": "Das Projekt ist fertig. Die Nebellaterne leuchtet wieder.",
  "kind": "lantern",
  "x": 7,
  "z": 4,
  "tasks": [
   {
    "type": "number",
    "text": "Runde 12,304 km auf Zehntelkilometer.",
    "answer": "12,3",
    "lesson": "c6-round",
    "purpose": "Kurzer Einstieg: Rundungsstelle selbst beachten.",
    "level": "I",
    "key": "c6:f3:01",
    "stage": "guided",
    "group": "c6-round",
    "hint": "Bestimme die beiden benachbarten Rundungswerte und ihre Mitte.",
    "introduce": true,
    "skillId": "c6-round",
    "why": "Eine passende Antwort ist 12,3. Bestimme die beiden benachbarten Rundungswerte und ihre Mitte."
   },
   {
    "type": "number",
    "text": "Runde 4,999 auf Hundertstel.",
    "answer": "5",
    "lesson": "c6-round",
    "purpose": "Rundungsübertrag über mehrere Neunen.",
    "level": "II",
    "key": "c6:f3:02",
    "stage": "practice",
    "group": "c6-round",
    "hint": "Bestimme die beiden benachbarten Rundungswerte und ihre Mitte.",
    "introduce": true,
    "skillId": "c6-round",
    "why": "Eine passende Antwort ist 5. Bestimme die beiden benachbarten Rundungswerte und ihre Mitte."
   },
   {
    "type": "choice",
    "text": "Zwei Wege sind 7,86 km und 12,24 km lang. Runde beide auf ganze Kilometer. Welche Beurteilung passt zu diesem Überschlag?",
    "answer": 0,
    "lesson": "c6-estimate",
    "purpose": "Mit einem Überschlag die Größenordnung prüfen; keine ungelehrte Dezimaladdition voraussetzen.",
    "level": "II",
    "key": "c6:f3:03",
    "stage": "practice",
    "group": "c6-estimate",
    "hint": "Ein Überschlag liefert eine Näherung, keine exakte Grenzentscheidung.",
    "introduce": true,
    "skillId": "c6-estimate",
    "why": "8 + 12 = 20. Der Überschlag stützt die Größenordnung 20,10 km, beweist aber nicht die exakte Summe.",
    "options": [
     "Ungefähr 20 km: 20,10 km als genaue Gesamtlänge ist plausibel, 201 km nicht.",
     "Ungefähr 21 km, weil beide Zahlen immer aufgerundet werden.",
     "Ungefähr 2 km: 2,010 km ist plausibel.",
     "Genau 20 km: Eine andere genaue Gesamtlänge ist unmöglich."
    ]
   },
   {
    "type": "choice",
    "text": "Eine Brücke trägt höchstens 20 kg. Eine Fracht wiegt 20,015 kg. Auf eine Nachkommastelle gerundet sind das 20,0 kg. Darf sie darüber?",
    "answer": 1,
    "lesson": "c6-estimate",
    "purpose": "Sicherheitsgrenze nicht durch Rundung aufheben.",
    "level": "III",
    "options": [
     "Ja, weil der gerundete Wert genau 20,0 ist.",
     "Nein: Der genaue Wert ist um 0,015 kg zu groß.",
     "Ja, weil drei Nachkommastellen nicht berücksichtigt werden.",
     "Nein, weil man bei Traglasten jede Fracht unter 20 kg ablehnen muss."
    ],
    "key": "c6:f3:04",
    "stage": "transfer",
    "group": "c6-estimate",
    "hint": "Ein Überschlag liefert eine Näherung, keine exakte Grenzentscheidung.",
    "introduce": true,
    "skillId": "c6-estimate",
    "why": "Nein: Der genaue Wert ist um 0,015 kg zu groß."
   }
  ],
  "advanced": false,
  "requires": [
   "c6-f1"
  ],
  "goal": "Runden, Überschlagen und Grenzen der Näherung",
  "why": "Näherungswerte sind eine andere Entscheidung als exaktes Ordnen",
  "legacySources": [
   "f3",
   "f4"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-h1",
  "region": "harbor",
  "title": "Fracht richtig beschriften",
  "npc": "Käpt’n Lio",
  "story": "Im Hafen warten unterschiedlich beschriftete Frachtstücke. Prüfe ihre Maße, bevor der Wagen beladen wird.",
  "reward": "Das Projekt ist fertig. Das Segelboot bekommt eine neue Leine und ein Segel.",
  "kind": "boat",
  "x": -8,
  "z": -6,
  "tasks": [
   {
    "type": "match",
    "text": "Ordne jedem Frachtetikett die gleich große Menge zu.",
    "answer": [
     0,
     1,
     2,
     3
    ],
    "lesson": "c6-units",
    "purpose": "Vier Größen in einer kompakten gemeinsamen Aufgabe.",
    "level": "I",
    "items": [
     "1,406 kg",
     "2,095 m",
     "0,375 l",
     "3,07 €"
    ],
    "categories": [
     "1406 g",
     "209,5 cm",
     "375 ml",
     "307 ct"
    ],
    "unique": true,
    "key": "c6:h1:01",
    "stage": "guided",
    "group": "c6-units",
    "hint": "Schreibe zuerst auf, wie viele kleine Einheiten eine große Einheit ergeben.",
    "introduce": true,
    "skillId": "c6-units",
    "why": "Schreibe zuerst auf, wie viele kleine Einheiten eine große Einheit ergeben."
   },
   {
    "type": "work",
    "text": "Beschrifte beide Seiten des Messbretts in der verlangten Einheit.",
    "answer": [
     "37",
     "7,045"
    ],
    "lesson": "c6-units",
    "purpose": "Beide Umrechnungsrichtungen mit anspruchsvollen Nullen.",
    "level": "II",
    "fields": [
     "0,037 m in mm",
     "7045 g in kg"
    ],
    "rows": [
     [
      "0,037 m =",
      {
       "field": 0
      },
      "mm"
     ],
     [
      "7045 g =",
      {
       "field": 1
      },
      "kg"
     ]
    ],
    "key": "c6:h1:02",
    "stage": "practice",
    "group": "c6-units",
    "hint": "Schreibe zuerst auf, wie viele kleine Einheiten eine große Einheit ergeben.",
    "introduce": true,
    "skillId": "c6-units",
    "why": "0,037 m in mm: 37 · 7045 g in kg: 7,045"
   },
   {
    "type": "choice",
    "text": "Ein Seil ist 103,207 m lang. Welches Etikett in Zentimetern stimmt?",
    "answer": 1,
    "lesson": "c6-units",
    "purpose": "Maßzahlveränderung bei größerem Ganzteil prüfen.",
    "level": "II",
    "options": [
     "1032,07 cm",
     "10 320,7 cm",
     "1 032 070 cm",
     "103,207 cm"
    ],
    "key": "c6:h1:03",
    "stage": "practice",
    "group": "c6-units",
    "hint": "Schreibe zuerst auf, wie viele kleine Einheiten eine große Einheit ergeben.",
    "introduce": true,
    "skillId": "c6-units",
    "why": "10 320,7 cm"
   },
   {
    "type": "number",
    "text": "Eine Flasche fasst 1,5 l. Es sind schon 875 ml darin. Wie viele Milliliter fehlen?",
    "answer": "625",
    "lesson": "c6-units",
    "purpose": "Umrechnen als Teil einer realen Restaufgabe.",
    "level": "II",
    "key": "c6:h1:04",
    "stage": "practice",
    "group": "c6-units",
    "hint": "Schreibe zuerst auf, wie viele kleine Einheiten eine große Einheit ergeben.",
    "introduce": true,
    "skillId": "c6-units",
    "why": "Eine passende Antwort ist 625. Schreibe zuerst auf, wie viele kleine Einheiten eine große Einheit ergeben."
   },
   {
    "type": "choice",
    "text": "Ein Händler sagt: „1,6 kg sind weniger als 950 g, denn 1,6 ist kleiner als 950.“ Was ist die passende Korrektur?",
    "answer": 1,
    "lesson": "c6-units",
    "purpose": "Maßzahlvergleich ohne gemeinsame Einheit diagnostizieren.",
    "level": "III",
    "options": [
     "1,6 kg = 160 g; also stimmt es.",
     "1,6 kg = 1600 g; deshalb ist 1,6 kg mehr.",
     "Man darf Größen mit verschiedenen Einheiten niemals vergleichen.",
     "950 g = 9,5 kg; deshalb stimmt es."
    ],
    "key": "c6:h1:05",
    "stage": "transfer",
    "group": "c6-units",
    "hint": "Schreibe zuerst auf, wie viele kleine Einheiten eine große Einheit ergeben.",
    "introduce": true,
    "skillId": "c6-units",
    "why": "1,6 kg = 1600 g; deshalb ist 1,6 kg mehr."
   }
  ],
  "advanced": false,
  "requires": [
   "c6-v1"
  ],
  "goal": "Länge, Masse, Geld und Volumen in passenden Einheiten",
  "why": "Gleiche Größe, verschiedene Maßzahlen; keine eigenen Quests pro Einheit",
  "legacySources": [
   "h1",
   "h2",
   "h3"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-h5",
  "region": "harbor",
  "title": "Fahrplan und Lagerraum",
  "npc": "Tami · Hafenmeisterin",
  "story": "Plane Abfahrt und Lagerraum. Zeit, Fläche und Rauminhalt lassen sich nicht alle mit demselben Faktor umrechnen.",
  "reward": "Das Projekt ist fertig. Der Hafen erhält einen kleinen Lagerpavillon.",
  "kind": "pavilion",
  "x": -7,
  "z": 5,
  "tasks": [
   {
    "type": "number",
    "text": "Die Bootsfahrt dauert 1,35 h. Wie viele Minuten sind das?",
    "answer": "81",
    "lesson": "c6-time",
    "purpose": "Dezimalstunden in Minuten, nicht Ziffern als Minuten lesen.",
    "level": "II",
    "key": "c6:h5:01",
    "stage": "guided",
    "group": "c6-time",
    "hint": "Eine Stunde entspricht 60 Minuten.",
    "introduce": true,
    "skillId": "c6-time",
    "why": "Eine passende Antwort ist 81. Eine Stunde entspricht 60 Minuten."
   },
   {
    "type": "error",
    "text": "Eine Bewohnerin rechnet eine Fläche um. Tippe die erste falsche Zeile an.",
    "answer": 1,
    "lesson": "c6-area",
    "purpose": "Dimensionsfehler statt bloßen Rechenfehler erkennen.",
    "level": "II",
    "steps": [
     "1 m = 100 cm",
     "1 m² = 100 cm²",
     "0,12 m² = 12 cm²"
    ],
    "key": "c6:h5:02",
    "stage": "practice",
    "group": "c6-area",
    "hint": "Bei Flächen wirkt ein Längenfaktor zweimal.",
    "introduce": true,
    "skillId": "c6-area",
    "why": "Zeile 2 ist falsch: 1 m² = 10 000 cm². Deshalb 0,12 m² = 1200 cm²."
   },
   {
    "type": "work",
    "text": "Vervollständige die Lageretiketten. Achte auf Fläche beziehungsweise Rauminhalt.",
    "answer": [
     "250",
     "37"
    ],
    "lesson": "c6-volume",
    "purpose": "Faktoren 10 000 und 1000 bewusst unterscheiden.",
    "level": "II",
    "fields": [
     "0,025 m² in cm²",
     "0,037 m³ in l"
    ],
    "rows": [
     [
      "0,025 m² =",
      {
       "field": 0
      },
      "cm²"
     ],
     [
      "0,037 m³ =",
      {
       "field": 1
      },
      "l"
     ]
    ],
    "key": "c6:h5:03",
    "stage": "practice",
    "group": "c6-volume",
    "hint": "Bei Würfeln wirkt ein Längenfaktor dreimal.",
    "introduce": true,
    "skillId": "c6-volume",
    "why": "0,025 m² in cm²: 250 · 0,037 m³ in l: 37"
   },
   {
    "type": "choice",
    "text": "Die Fähre fährt um 9:40 Uhr ab. Die Überfahrt dauert 0,75 h. Wann kommt sie an?",
    "answer": 1,
    "lesson": "c6-time",
    "purpose": "Zeitdauer in einer Uhrzeitrechnung anwenden.",
    "level": "III",
    "options": [
     "10:15 Uhr",
     "10:25 Uhr",
     "10:55 Uhr",
     "10:75 Uhr"
    ],
    "introduce": false,
    "key": "c6:h5:04",
    "stage": "transfer",
    "group": "c6-time",
    "hint": "Eine Stunde entspricht 60 Minuten.",
    "skillId": "c6-time",
    "why": "10:25 Uhr"
   }
  ],
  "advanced": true,
  "requires": [
   "c6-h1"
  ],
  "goal": "Zeitumrechnung sowie Flächen- und Raumeinheiten",
  "why": "Die Faktoren 60, 100 und 1000 verlangen dimensionsbezogenes Denken",
  "legacySources": [
   "h4",
   "h5"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-a1",
  "region": "market",
  "title": "Die Marktrechnung",
  "npc": "Bela · Markthändlerin",
  "story": "Der Marktstand benötigt eine lesbare Abrechnung. Rechne stellenrichtig und untersuche fehlerhafte Rechnungen.",
  "reward": "Das Projekt ist fertig. Der Marktstand ist geöffnet und der Dorfkorb gefüllt.",
  "kind": "stall",
  "x": -8,
  "z": -5,
  "tasks": [
   {
    "type": "number",
    "text": "Berechne 3,4 + 0,56.",
    "answer": "3,96",
    "lesson": "c6-add",
    "purpose": "Verschiedene Nachkommastellen statt glatter Paralleladdition.",
    "level": "I",
    "key": "c6:a1:01",
    "stage": "guided",
    "group": "c6-add",
    "hint": "Richte die Kommas aus. Rechne von rechts und beachte Überträge.",
    "introduce": true,
    "skillId": "c6-add",
    "why": "Eine passende Antwort ist 3,96. Richte die Kommas aus. Rechne von rechts und beachte Überträge."
   },
   {
    "type": "work",
    "text": "Vervollständige die schriftliche Addition 14,307 + 2,86. Zeile 2 zeigt die fehlenden Nachkommastellen des zweiten Summanden; rechne danach.",
    "answer": [
     "8",
     "6",
     "0",
     "17,167"
    ],
    "lesson": "c6-add",
    "purpose": "Stellenrichtig anordnen und fehlende Null im Verfahren sichtbar machen.",
    "level": "II",
    "fields": [
     "Zehntel von 2,86",
     "Hundertstel von 2,86",
     "Tausendstel von 2,86",
     "Summe"
    ],
    "rows": [
     [
      "",
      "Z",
      "E",
      ",",
      "z",
      "h",
      "t"
     ],
     [
      "",
      1,
      4,
      ",",
      3,
      0,
      7
     ],
     [
      "+",
      0,
      2,
      ",",
      {
       "field": 0
      },
      {
       "field": 1
      },
      {
       "field": 2
      }
     ],
     [
      "Ergebnis",
      {
       "field": 3
      }
     ]
    ],
    "key": "c6:a1:02",
    "stage": "practice",
    "group": "c6-add",
    "hint": "Richte die Kommas aus. Rechne von rechts und beachte Überträge.",
    "introduce": true,
    "skillId": "c6-add",
    "why": "Zehntel von 2,86: 8 · Hundertstel von 2,86: 6 · Tausendstel von 2,86: 0 · Summe: 17,167"
   },
   {
    "type": "work",
    "text": "Schriftlich: 4,78 + 2,65. Notiere die beiden Überträge und das Ergebnis.",
    "answer": [
     "1",
     "1",
     "7,43"
    ],
    "lesson": "c6-add",
    "purpose": "Bündeln an zwei Stellen diagnostisch prüfen, nicht nur Endergebnis.",
    "level": "II",
    "fields": [
     "Übertrag von h nach z",
     "Übertrag von z nach E",
     "Summe"
    ],
    "rows": [
     [
      "Hundertstel: 8 + 5 → Übertrag",
      {
       "field": 0
      }
     ],
     [
      "Zehntel: 7 + 6 + Übertrag → Übertrag",
      {
       "field": 1
      }
     ],
     [
      "4,78 + 2,65 =",
      {
       "field": 2
      }
     ]
    ],
    "key": "c6:a1:03",
    "stage": "practice",
    "group": "c6-add",
    "hint": "Richte die Kommas aus. Rechne von rechts und beachte Überträge.",
    "introduce": true,
    "skillId": "c6-add",
    "why": "Übertrag von h nach z: 1 · Übertrag von z nach E: 1 · Summe: 7,43"
   },
   {
    "type": "error",
    "text": "Finde die erste falsche Zeile dieser Marktrechnung.",
    "answer": 2,
    "lesson": "c6-add",
    "purpose": "Korrektes Stellenwertmodell von falscher Rechnung unterscheiden.",
    "level": "II",
    "steps": [
     "3,4 = 3,40",
     "3,40 + 0,56 = (340 + 56) Hundertstel",
     "340 + 56 = 90",
     "Ergebnis: 0,90"
    ],
    "key": "c6:a1:04",
    "stage": "practice",
    "group": "c6-add",
    "hint": "Richte die Kommas aus. Rechne von rechts und beachte Überträge.",
    "introduce": true,
    "skillId": "c6-add",
    "why": "Zeile 3 ist falsch: 340 + 56 = 396. 396 Hundertstel sind 3,96."
   },
   {
    "type": "number",
    "text": "Drei Holzleisten sind 12,304 m, 2,86 m und 0,095 m lang. Wie lang sind sie zusammen?",
    "answer": "15,259",
    "lesson": "c6-add",
    "purpose": "Drei Summanden und innere Nullen in einem sinnvollen Längenkontext.",
    "level": "II",
    "key": "c6:a1:05",
    "stage": "practice",
    "group": "c6-add",
    "hint": "Richte die Kommas aus. Rechne von rechts und beachte Überträge.",
    "introduce": true,
    "skillId": "c6-add",
    "why": "Eine passende Antwort ist 15,259. Richte die Kommas aus. Rechne von rechts und beachte Überträge."
   }
  ],
  "advanced": false,
  "requires": [
   "c6-v1"
  ],
  "goal": "Addition mit Stellenwertausrichtung, Überträgen und schriftlicher Dokumentation",
  "why": "Rechenverfahren nicht bloß Endergebnis",
  "legacySources": [
   "a1",
   "a2",
   "a3"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-a4",
  "region": "market",
  "title": "Geschickt zusammenlegen",
  "npc": "Olli · Festplaner",
  "story": "Beim Festaufbau lässt sich manches im Kopf günstiger rechnen. Finde passende Paare und prüfe den Vorrat.",
  "reward": "Das Projekt ist fertig. Der Festtisch ist gedeckt, die Lichter sind an.",
  "kind": "table",
  "x": 7,
  "z": 6,
  "tasks": [
   {
    "type": "argument",
    "text": "Berechne 6,38 + 1,75 + 3,62 + 0,25 möglichst geschickt. Ordne einen passenden Rechenweg.",
    "answer": [
     0,
     1,
     2
    ],
    "lesson": "c6-sum-smart",
    "purpose": "Rechengesetze als begründete Strategie.",
    "level": "III",
    "items": [
     "Vertausche und gruppiere zu (6,38 + 3,62) + (1,75 + 0,25).",
     "Die Klammern ergeben 10 und 2.",
     "Zusammen sind es 12.",
     "Streiche zuerst alle Nachkommastellen.",
     "Vertauschen darf man nur, wenn alle Summanden dieselben Nachkommastellen haben."
    ],
    "key": "c6:a4:01",
    "stage": "guided",
    "group": "c6-sum-smart",
    "hint": "Suche Summanden, die zusammen eine ganze Zahl ergeben.",
    "introduce": true,
    "skillId": "c6-sum-smart",
    "why": "Vertausche und gruppiere zu (6,38 + 3,62) + (1,75 + 0,25). → Die Klammern ergeben 10 und 2. → Zusammen sind es 12."
   },
   {
    "type": "number",
    "text": "Ergänze die fehlende Zahl: 2,095 + □ = 5,04.",
    "answer": "2,945",
    "lesson": "c6-sum-smart",
    "purpose": "Addition als Beziehung statt ausschließlich Vorwärtsrechnung.",
    "level": "II",
    "key": "c6:a4:02",
    "stage": "practice",
    "group": "c6-sum-smart",
    "hint": "Suche Summanden, die zusammen eine ganze Zahl ergeben.",
    "introduce": true,
    "skillId": "c6-sum-smart",
    "why": "Eine passende Antwort ist 2,945. Suche Summanden, die zusammen eine ganze Zahl ergeben."
   },
   {
    "type": "work",
    "text": "Es stehen 15 € zur Verfügung. Berechne die Kosten von 4,85 €, 6,75 € und 3,60 € und den Betrag, der zum Bezahlen noch fehlt.",
    "answer": [
     "15,20",
     "0,20"
    ],
    "lesson": "c6-sum-smart",
    "purpose": "Ergebnis in eine Budgetentscheidung überführen.",
    "level": "II",
    "fields": [
     "Gesamtkosten in €",
     "Fehlender Betrag in €"
    ],
    "rows": [
     [
      "Gesamt",
      {
       "field": 0
      },
      "€"
     ],
     [
      "Es fehlen",
      {
       "field": 1
      },
      "€"
     ]
    ],
    "key": "c6:a4:03",
    "stage": "practice",
    "group": "c6-sum-smart",
    "hint": "Suche Summanden, die zusammen eine ganze Zahl ergeben.",
    "introduce": true,
    "skillId": "c6-sum-smart",
    "why": "Gesamtkosten in €: 15,20 · Fehlender Betrag in €: 0,20"
   },
   {
    "type": "choice",
    "text": "Welcher Ausdruck ist für beliebige Dezimalzahlen a, b und c immer gleich a + b + c?",
    "answer": 1,
    "lesson": "c6-sum-smart",
    "purpose": "Rechengesetz von zufälliger Zahlenübereinstimmung unterscheiden.",
    "level": "III",
    "options": [
     "a + (b − c)",
     "(c + a) + b",
     "a · (b + c)",
     "a + b · c"
    ],
    "key": "c6:a4:04",
    "stage": "transfer",
    "group": "c6-sum-smart",
    "hint": "Suche Summanden, die zusammen eine ganze Zahl ergeben.",
    "introduce": true,
    "skillId": "c6-sum-smart",
    "why": "(c + a) + b"
   }
  ],
  "advanced": true,
  "requires": [
   "c6-a1"
  ],
  "goal": "Assoziieren, Kommutieren, fehlende Summanden und Budgetkontrolle",
  "why": "Rechenwege wählen statt lediglich weitere Additionen",
  "legacySources": [
   "a4"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-s1",
  "region": "cliffs",
  "title": "Holz für den Bergpfad",
  "npc": "Taro · Holzhelfer",
  "story": "Die Holzsammlerin benötigt genaue Restlängen. Repariere den Bergpfad und dokumentiere schwierige Subtraktionen.",
  "reward": "Das Projekt ist fertig. Geschnittene Stämme werden gestapelt; Taro kann seine Arbeit fortsetzen.",
  "kind": "lumber",
  "x": -8,
  "z": 3,
  "tasks": [
   {
    "type": "number",
    "text": "Berechne die Restlänge: 6,4 m − 2,075 m.",
    "answer": "4,325",
    "lesson": "c6-sub",
    "purpose": "Verschiedene Nachkommastellen und Übertrag.",
    "level": "I",
    "key": "c6:s1:01",
    "stage": "guided",
    "group": "c6-sub",
    "hint": "Tausche nötigenfalls eine größere Einheit in zehn kleinere.",
    "introduce": true,
    "skillId": "c6-sub",
    "why": "Eine passende Antwort ist 4,325. Tausche nötigenfalls eine größere Einheit in zehn kleinere."
   },
   {
    "type": "work",
    "text": "Rechne 8,004 − 0,975 mit Entbündeln. Vervollständige die obere Tafel NACH allen nötigen Tauschen und anschließend das Ergebnis.",
    "answer": [
     "7",
     "9",
     "9",
     "14",
     "7,029"
    ],
    "lesson": "c6-sub",
    "purpose": "Entbündeln über zwei Nullstellen als vollständige verknüpfte Rechnung.",
    "level": "II",
    "fields": [
     "Einer nach dem Tauschen",
     "Zehntel nach dem Tauschen",
     "Hundertstel nach dem Tauschen",
     "Tausendstel nach dem Tauschen",
     "Differenz"
    ],
    "rows": [
     [
      "",
      "E",
      ",",
      "z",
      "h",
      "t"
     ],
     [
      "Nach dem Tauschen",
      {
       "field": 0
      },
      ",",
      {
       "field": 1
      },
      {
       "field": 2
      },
      {
       "field": 3
      }
     ],
     [
      "Abziehen",
      0,
      ",",
      9,
      7,
      5
     ],
     [
      "Ergebnis",
      {
       "field": 4
      }
     ]
    ],
    "key": "c6:s1:02",
    "stage": "practice",
    "group": "c6-sub",
    "hint": "Tausche nötigenfalls eine größere Einheit in zehn kleinere.",
    "introduce": true,
    "skillId": "c6-sub",
    "why": "Einer nach dem Tauschen: 7 · Zehntel nach dem Tauschen: 9 · Hundertstel nach dem Tauschen: 9 · Tausendstel nach dem Tauschen: 14 · Differenz: 7,029"
   },
   {
    "type": "error",
    "text": "Tippe die erste falsche Zeile an. Es wird 5,02 − 0,78 mit Entbündeln gerechnet.",
    "answer": 1,
    "lesson": "c6-sub",
    "purpose": "Beim Weiterentbündeln muss die abgebende Stelle kleiner werden.",
    "level": "II",
    "steps": [
     "5 E, 0 z, 2 h = 4 E, 10 z, 2 h",
     "4 E, 10 z, 2 h = 4 E, 10 z, 12 h",
     "12 − 8 = 4; 10 − 7 = 3; 4 − 0 = 4",
     "Ergebnis: 4,34"
    ],
    "key": "c6:s1:03",
    "stage": "practice",
    "group": "c6-sub",
    "hint": "Tausche nötigenfalls eine größere Einheit in zehn kleinere.",
    "introduce": true,
    "skillId": "c6-sub",
    "why": "Zeile 2 ist falsch: Ein Zehntel wurde abgegeben, also sind es 4 E, 9 z, 12 h. Die Differenz ist 4,24."
   },
   {
    "type": "work",
    "text": "Ein Rechenblatt enthält 20,015 − 3,87 = 16,145. Prüfe die Rechnung durch die Umkehraufgabe.",
    "answer": [
     "20,015"
    ],
    "lesson": "c6-inverse",
    "purpose": "Eine unabhängige Probe statt wiederholter Subtraktion.",
    "level": "II",
    "fields": [
     "Rest + Entnahme"
    ],
    "rows": [
     [
      "16,145 + 3,87 =",
      {
       "field": 0
      }
     ]
    ],
    "key": "c6:s1:04",
    "stage": "practice",
    "group": "c6-inverse",
    "hint": "Welche Zahl ist gesucht: Anfang, Entnahme oder Rest? Rechne dann rückwärts.",
    "introduce": true,
    "skillId": "c6-inverse",
    "why": "Rest + Entnahme: 20,015"
   },
   {
    "type": "choice",
    "text": "Bei 10 − 0,008 behauptet jemand, die Antwort sei 9,2. Welcher korrigierte Wert passt auch zur Größenordnung?",
    "answer": 0,
    "lesson": "c6-sub",
    "purpose": "Sehr kleiner Abzug und Nullen: Plausibilität mit Stellenwert verbinden.",
    "level": "II",
    "options": [
     "9,992",
     "9,92",
     "0,992",
     "10,008"
    ],
    "introduce": false,
    "key": "c6:s1:05",
    "stage": "practice",
    "group": "c6-sub",
    "hint": "Tausche nötigenfalls eine größere Einheit in zehn kleinere.",
    "skillId": "c6-sub",
    "why": "9,992"
   }
  ],
  "advanced": false,
  "requires": [
   "c6-a1"
  ],
  "goal": "Subtraktion, Entbündeln über Nullstellen, Ergänzen und Probe",
  "why": "Eigenes Rechenverfahren mit diagnostischer Nullstellenstruktur",
  "legacySources": [
   "s1",
   "s2",
   "s3"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-s4",
  "region": "cliffs",
  "title": "Vorräte rückwärts planen",
  "npc": "Runa · Bergbaumeisterin",
  "story": "Einige Vorratsangaben sind verloren gegangen. Rekonstruiere Anfangsmengen und Entnahmen statt immer nur nach vorne zu rechnen.",
  "reward": "Das Projekt ist fertig. Der Bergsteig erhält sein vollständiges Geländer.",
  "kind": "bridge",
  "x": 8,
  "z": 2,
  "tasks": [
   {
    "type": "number",
    "text": "Nach dem Verbrauch von 3,075 kg Holz bleiben 8,4 kg. Wie viel Holz war vorher da?",
    "answer": "11,475",
    "lesson": "c6-inverse",
    "purpose": "Unbekannter Anfang als Umkehraufgabe.",
    "level": "I",
    "key": "c6:s4:01",
    "stage": "guided",
    "group": "c6-inverse",
    "hint": "Welche Zahl ist gesucht: Anfang, Entnahme oder Rest? Rechne dann rückwärts.",
    "introduce": false,
    "skillId": "c6-inverse",
    "why": "Eine passende Antwort ist 11,475. Welche Zahl ist gesucht: Anfang, Entnahme oder Rest? Rechne dann rückwärts."
   },
   {
    "type": "argument",
    "text": "Ein Vorrat war 14,2 l groß; jetzt sind 9,875 l übrig. Begründe, wie du die verbrauchte Menge x findest.",
    "answer": [
     0,
     1,
     2
    ],
    "lesson": "c6-inverse",
    "purpose": "Gleichung und Bedeutung der Unbekannten verbinden.",
    "level": "III",
    "items": [
     "Die Beziehung lautet 14,2 − x = 9,875.",
     "Also ist x = 14,2 − 9,875.",
     "Probe: 9,875 + 4,325 = 14,2; verbraucht wurden 4,325 l.",
     "Rechne 14,2 + 9,875, weil x gesucht ist.",
     "Für jede unbekannte Zahl muss man multiplizieren."
    ],
    "key": "c6:s4:02",
    "stage": "transfer",
    "group": "c6-inverse",
    "hint": "Welche Zahl ist gesucht: Anfang, Entnahme oder Rest? Rechne dann rückwärts.",
    "introduce": false,
    "skillId": "c6-inverse",
    "why": "Die Beziehung lautet 14,2 − x = 9,875. → Also ist x = 14,2 − 9,875. → Probe: 9,875 + 4,325 = 14,2; verbraucht wurden 4,325 l."
   },
   {
    "type": "work",
    "text": "Von einer Seilrolle werden zuerst 2,86 m und dann 0,975 m abgeschnitten. Am Ende bleiben 5,4 m. Bestimme die gesamte Entnahme und die ursprüngliche Länge.",
    "answer": [
     "3,835",
     "9,235"
    ],
    "lesson": "c6-inverse",
    "purpose": "Zwei Änderungen rückwärts zu einem Anfang verknüpfen.",
    "level": "II",
    "fields": [
     "Entnahme in m",
     "Anfangslänge in m"
    ],
    "rows": [
     [
      "Zusammen abgeschnitten",
      {
       "field": 0
      },
      "m"
     ],
     [
      "Ursprünglich",
      {
       "field": 1
      },
      "m"
     ]
    ],
    "key": "c6:s4:03",
    "stage": "practice",
    "group": "c6-inverse",
    "hint": "Welche Zahl ist gesucht: Anfang, Entnahme oder Rest? Rechne dann rückwärts.",
    "introduce": false,
    "skillId": "c6-inverse",
    "why": "Entnahme in m: 3,835 · Anfangslänge in m: 9,235"
   },
   {
    "type": "choice",
    "text": "Welche Rechnung ergibt denselben Wert wie 8,4 − 2,6 − 0,4?",
    "answer": 1,
    "lesson": "c6-inverse",
    "purpose": "Abziehen einer Summe von falschem Klammern unterscheiden.",
    "level": "III",
    "options": [
     "8,4 − (2,6 − 0,4)",
     "8,4 − (2,6 + 0,4)",
     "(8,4 − 0,4) + 2,6",
     "2,6 + 0,4 − 8,4"
    ],
    "key": "c6:s4:04",
    "stage": "transfer",
    "group": "c6-inverse",
    "hint": "Welche Zahl ist gesucht: Anfang, Entnahme oder Rest? Rechne dann rückwärts.",
    "introduce": false,
    "skillId": "c6-inverse",
    "why": "8,4 − (2,6 + 0,4)"
   }
  ],
  "advanced": true,
  "requires": [
   "c6-s1"
  ],
  "goal": "Unbekannter Anfang oder Abzug, verknüpfte Entnahmen, Umkehrung",
  "why": "Problemstruktur entscheidet über Rechenart",
  "legacySources": [
   "s4"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-m1",
  "region": "mill",
  "title": "Futter in gleichen Portionen",
  "npc": "Alva · Tierpflegerin",
  "story": "Im Futterhaus werden gleiche Portionen vorbereitet. Bestimme Gesamtmengen und wandle Maßzahlen mit Zehnerpotenzen um.",
  "reward": "Das Projekt ist fertig. Ein Pferdestall mit offener Weide und Futtertrögen wird fertig.",
  "kind": "stable",
  "x": -8,
  "z": 3,
  "tasks": [
   {
    "type": "number",
    "text": "Für sieben Tiere werden je 0,35 kg Futter vorbereitet. Wie viel Futter ist das insgesamt?",
    "answer": "2,45",
    "lesson": "c6-scale",
    "purpose": "Gruppenvorstellung mit natürlichem Faktor.",
    "level": "I",
    "key": "c6:m1:01",
    "stage": "guided",
    "group": "c6-scale",
    "hint": "Beim Faktor 100 wird jede Ziffer hundertmal so viel wert.",
    "introduce": true,
    "skillId": "c6-scale",
    "why": "Eine passende Antwort ist 2,45. Beim Faktor 100 wird jede Ziffer hundertmal so viel wert."
   },
   {
    "type": "work",
    "text": "Vervollständige beide Rechnungen mit Zehnerpotenzen.",
    "answer": [
     "3,7",
     "1,03207"
    ],
    "lesson": "c6-scale",
    "purpose": "Vergrößern und Verkleinern mit Stellenwerten; nicht starr höchstens drei Dezimalen.",
    "level": "II",
    "fields": [
     "0,037 · 100",
     "103,207 : 100"
    ],
    "rows": [
     [
      "0,037 · 100 =",
      {
       "field": 0
      }
     ],
     [
      "103,207 : 100 =",
      {
       "field": 1
      }
     ]
    ],
    "key": "c6:m1:02",
    "stage": "practice",
    "group": "c6-scale",
    "hint": "Beim Faktor 100 wird jede Ziffer hundertmal so viel wert.",
    "introduce": true,
    "skillId": "c6-scale",
    "why": "0,037 · 100: 3,7 · 103,207 : 100: 1,03207"
   },
   {
    "type": "number",
    "text": "Ein Tier bekommt 1,406 kg Futter pro Tag. Wie viel braucht es für 5 Tage?",
    "answer": "7,03",
    "lesson": "c6-scale",
    "purpose": "Innere Null bei einer verknüpften Multiplikation.",
    "level": "II",
    "key": "c6:m1:03",
    "stage": "practice",
    "group": "c6-scale",
    "hint": "Beim Faktor 100 wird jede Ziffer hundertmal so viel wert.",
    "introduce": true,
    "skillId": "c6-scale",
    "why": "Eine passende Antwort ist 7,03. Beim Faktor 100 wird jede Ziffer hundertmal so viel wert."
   },
   {
    "type": "choice",
    "text": "Welche Änderung erhält die Gesamtmenge von 8 Portionen zu je 0,375 kg?",
    "answer": 0,
    "lesson": "c6-scale",
    "purpose": "Kompensierende Faktoren an einem bekannten Gruppenkontext.",
    "level": "III",
    "options": [
     "4 Portionen zu je 0,75 kg",
     "8 Portionen zu je 0,75 kg",
     "4 Portionen zu je 0,375 kg",
     "16 Portionen zu je 0,375 kg"
    ],
    "key": "c6:m1:04",
    "stage": "transfer",
    "group": "c6-scale",
    "hint": "Beim Faktor 100 wird jede Ziffer hundertmal so viel wert.",
    "introduce": true,
    "skillId": "c6-scale",
    "why": "4 Portionen zu je 0,75 kg"
   }
  ],
  "advanced": false,
  "requires": [
   "c6-v3",
   "c6-a1"
  ],
  "goal": "Gleiche Gruppen, Zehnerpotenzen und Sachbedeutung der Multiplikation",
  "why": "Skalieren als Grundlage vor zwei Dezimalfaktoren",
  "legacySources": [
   "m1",
   "m3"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-m2",
  "region": "mill",
  "title": "Die Werkstatt der Produkte",
  "npc": "Momo · Müller",
  "story": "An der Mühle werden Produkte für Beete und Vorräte berechnet. Begründe das Komma, vervollständige schriftliche Rechnungen und rechne auch geschickt.",
  "reward": "Das Projekt ist fertig. Im Kräutergarten sprießen neue Pflanzen.",
  "kind": "garden",
  "x": 1,
  "z": -7,
  "tasks": [
   {
    "type": "number",
    "text": "Ein Beet misst 1,6 m mal 0,5 m. Wie groß ist seine Fläche in m²?",
    "answer": "0,8",
    "lesson": "c6-product",
    "purpose": "Flächenmodell verbindet Dezimalfaktor und Einheit.",
    "level": "I",
    "key": "c6:m2:01",
    "stage": "guided",
    "group": "c6-product",
    "hint": "Ein Faktor kleiner als 1 beschreibt einen Teil der anderen Menge.",
    "introduce": true,
    "skillId": "c6-product",
    "why": "Eine passende Antwort ist 0,8. Ein Faktor kleiner als 1 beschreibt einen Teil der anderen Menge."
   },
   {
    "type": "work",
    "text": "Berechne 1,24 · 0,36 schriftlich. Rechne zunächst 124 · 36, notiere beide stellenrichtigen Teilprodukte und setze dann das Komma.",
    "answer": [
     "744",
     "3720",
     "4464",
     "4",
     "0,4464"
    ],
    "lesson": "c6-multiply-written",
    "purpose": "Teilprodukte und Kommabegründung statt reiner Resultateingabe.",
    "level": "II",
    "fields": [
     "124 · 6",
     "124 · 30",
     "Summe der Teilprodukte",
     "Nachkommastellen beider Faktoren zusammen",
     "Produkt"
    ],
    "rows": [
     [
      "124 · 6 =",
      {
       "field": 0
      }
     ],
     [
      "124 · 30 =",
      {
       "field": 1
      }
     ],
     [
      "Zusammen",
      {
       "field": 2
      }
     ],
     [
      "Nachkommastellen",
      {
       "field": 3
      }
     ],
     [
      "1,24 · 0,36 =",
      {
       "field": 4
      }
     ]
    ],
    "key": "c6:m2:02",
    "stage": "practice",
    "group": "c6-multiply-written",
    "hint": "Prüfe beide Teilprodukte und begründe erst danach die Nachkommastellen.",
    "introduce": true,
    "skillId": "c6-multiply-written",
    "why": "124 · 6: 744 · 124 · 30: 3720 · Summe der Teilprodukte: 4464 · Nachkommastellen beider Faktoren zusammen: 4 · Produkt: 0,4464"
   },
   {
    "type": "error",
    "text": "Finde die erste falsche Zeile der Rechnung 2,05 · 0,4.",
    "answer": 2,
    "lesson": "c6-multiply-written",
    "purpose": "Kommaregel in einen Skalierungsfehler übersetzen.",
    "level": "II",
    "steps": [
     "205 · 4 = 820",
     "Die Faktoren haben zusammen drei Nachkommastellen.",
     "820 : 100 = 8,2",
     "2,05 · 0,4 = 8,2"
    ],
    "key": "c6:m2:03",
    "stage": "practice",
    "group": "c6-multiply-written",
    "hint": "Prüfe beide Teilprodukte und begründe erst danach die Nachkommastellen.",
    "introduce": true,
    "skillId": "c6-multiply-written",
    "why": "Zeile 3 ist falsch: Bei drei Nachkommastellen muss 820 durch 1000 geteilt werden. 2,05 · 0,4 = 0,82."
   },
   {
    "type": "choice",
    "text": "Für welche positive Zahl a wird a · 0,8 größer als a?",
    "answer": 2,
    "lesson": "c6-product",
    "purpose": "Faktorwirkung verallgemeinern, nicht nur ein Produkt rechnen.",
    "level": "III",
    "options": [
     "Für jede Zahl a > 1",
     "Nur für a < 1",
     "Für keine positive Zahl a",
     "Nur wenn a mindestens drei Nachkommastellen hat"
    ],
    "introduce": false,
    "key": "c6:m2:04",
    "stage": "transfer",
    "group": "c6-product",
    "hint": "Ein Faktor kleiner als 1 beschreibt einen Teil der anderen Menge.",
    "skillId": "c6-product",
    "why": "Für keine positive Zahl a"
   },
   {
    "type": "number",
    "text": "Berechne 12 · 1,99 geschickt.",
    "answer": "23,88",
    "lesson": "c6-distribute",
    "purpose": "Distributivgesetz als effizienter Rechenweg.",
    "level": "II",
    "key": "c6:m2:05",
    "stage": "practice",
    "group": "c6-distribute",
    "hint": "Multipliziere beim Zerlegen jeden Teil mit dem anderen Faktor.",
    "introduce": true,
    "skillId": "c6-distribute",
    "why": "Eine passende Antwort ist 23,88. Multipliziere beim Zerlegen jeden Teil mit dem anderen Faktor."
   },
   {
    "type": "choice",
    "text": "Welche Rechnung zeigt das Distributivgesetz korrekt?",
    "answer": 0,
    "lesson": "c6-distribute",
    "purpose": "Beide Teile müssen multipliziert werden; plausible Standardfehler.",
    "level": "II",
    "options": [
     "0,6 · (2 + 0,3) = 1,2 + 0,18",
     "0,6 · (2 + 0,3) = 1,2 + 0,3",
     "0,6 · (2 + 0,3) = 0,6 · 2 · 0,3",
     "0,6 · (2 + 0,3) = 0,6 + 2 + 0,3"
    ],
    "key": "c6:m2:06",
    "stage": "practice",
    "group": "c6-distribute",
    "hint": "Multipliziere beim Zerlegen jeden Teil mit dem anderen Faktor.",
    "introduce": true,
    "skillId": "c6-distribute",
    "why": "0,6 · (2 + 0,3) = 1,2 + 0,18"
   }
  ],
  "advanced": false,
  "requires": [
   "c6-m1"
  ],
  "goal": "Zwei Dezimalfaktoren, schriftliche Multiplikation, Faktorwirkung und Distributivität",
  "why": "Produktvorstellung und Algorithmus werden verknüpft",
  "legacySources": [
   "m2",
   "m4"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-d1",
  "region": "cave",
  "title": "Gerecht teilen und prüfen",
  "npc": "Bloop · Grottenbewohner",
  "story": "Die kleinen Höhlenbewohner wollen Vorräte gerecht verteilen. Zeige auch die wichtigen Zwischenschritte der schriftlichen Division.",
  "reward": "Das Projekt ist fertig. Bloop ist satt und wird dein Freund.",
  "kind": "slime",
  "x": -8,
  "z": 4,
  "tasks": [
   {
    "type": "number",
    "text": "2,8 l Saft werden gerecht auf 4 Kannen verteilt. Wie viel ist in jeder Kanne?",
    "answer": "0,7",
    "lesson": "c6-divide-written",
    "purpose": "Verteilung als kurzer Einstieg.",
    "level": "I",
    "key": "c6:d1:01",
    "stage": "guided",
    "group": "c6-divide-written",
    "hint": "Multipliziere zurück, ziehe ab, hole die nächste Ziffer herunter.",
    "introduce": true,
    "skillId": "c6-divide-written",
    "why": "Eine passende Antwort ist 0,7. Multipliziere zurück, ziehe ab, hole die nächste Ziffer herunter."
   },
   {
    "type": "work",
    "text": "Vervollständige die schriftliche Division 18,72 : 6. Die Zeilen folgen dem Herunterholen der Ziffern.",
    "answer": [
     "3",
     "1",
     "0",
     "3,12"
    ],
    "lesson": "c6-divide-written",
    "purpose": "Quotient, Rest und Überführung zur nächsten Stelle gemeinsam prüfen.",
    "level": "II",
    "fields": [
     "Ganzzahlige Quotientenziffer",
     "Rest bei 7 Zehnteln nach 1 · 6",
     "Rest nach 12 Hundertsteln − 2 · 6",
     "Quotient"
    ],
    "rows": [
     [
      "18 : 6 →",
      {
       "field": 0
      }
     ],
     [
      "7 − 6 =",
      {
       "field": 1
      }
     ],
     [
      "12 − 12 =",
      {
       "field": 2
      }
     ],
     [
      "18,72 : 6 =",
      {
       "field": 3
      }
     ]
    ],
    "key": "c6:d1:02",
    "stage": "practice",
    "group": "c6-divide-written",
    "hint": "Multipliziere zurück, ziehe ab, hole die nächste Ziffer herunter.",
    "introduce": true,
    "skillId": "c6-divide-written",
    "why": "Ganzzahlige Quotientenziffer: 3 · Rest bei 7 Zehnteln nach 1 · 6: 1 · Rest nach 12 Hundertsteln − 2 · 6: 0 · Quotient: 3,12"
   },
   {
    "type": "work",
    "text": "Rechne 7,056 : 7. Ergänze die Nullstelle im Quotienten und den nächsten Rest.",
    "answer": [
     "0",
     "5",
     "1,008"
    ],
    "lesson": "c6-divide-written",
    "purpose": "Nötige Nullen im Quotienten nicht überspringen.",
    "level": "II",
    "fields": [
     "Zehntelziffer des Quotienten",
     "Rest bei 5 Hundertsteln",
     "Quotient"
    ],
    "rows": [
     [
      "7 Ganze : 7 = 1; 0 Zehntel : 7 =",
      {
       "field": 0
      }
     ],
     [
      "5 Hundertstel : 7 → 0 Hundertstel, Rest",
      {
       "field": 1
      }
     ],
     [
      "7,056 : 7 =",
      {
       "field": 2
      }
     ]
    ],
    "key": "c6:d1:03",
    "stage": "practice",
    "group": "c6-divide-written",
    "hint": "Multipliziere zurück, ziehe ab, hole die nächste Ziffer herunter.",
    "introduce": true,
    "skillId": "c6-divide-written",
    "why": "Zehntelziffer des Quotienten: 0 · Rest bei 5 Hundertsteln: 5 · Quotient: 1,008"
   },
   {
    "type": "choice",
    "text": "Ein Ergebnis lautet 9,36 : 8 = 1,17. Welche Rechnung ist eine geeignete Probe?",
    "answer": 0,
    "lesson": "c6-divide-written",
    "purpose": "Umkehroperation der Division erkennen.",
    "level": "II",
    "options": [
     "1,17 · 8 = 9,36",
     "1,17 : 8 = 9,36",
     "9,36 + 8 = 17,36",
     "9,36 − 1,17 = 8"
    ],
    "key": "c6:d1:04",
    "stage": "practice",
    "group": "c6-divide-written",
    "hint": "Multipliziere zurück, ziehe ab, hole die nächste Ziffer herunter.",
    "introduce": true,
    "skillId": "c6-divide-written",
    "why": "1,17 · 8 = 9,36"
   },
   {
    "type": "number",
    "text": "Ein 12,5 m langes Band wird in 8 gleich lange Stücke ohne Verschnitt geteilt. Wie lang ist ein Stück in Metern?",
    "answer": "1,5625",
    "lesson": "c6-divide-written",
    "purpose": "Division fortsetzen statt bei der bisherigen Nachkommastellenzahl abbrechen.",
    "level": "II",
    "key": "c6:d1:05",
    "stage": "practice",
    "group": "c6-divide-written",
    "hint": "Multipliziere zurück, ziehe ab, hole die nächste Ziffer herunter.",
    "introduce": true,
    "skillId": "c6-divide-written",
    "why": "Eine passende Antwort ist 1,5625. Multipliziere zurück, ziehe ab, hole die nächste Ziffer herunter."
   }
  ],
  "advanced": false,
  "requires": [
   "c6-m1"
  ],
  "goal": "Division durch natürliche Zahlen, schriftliche Division, Rest und Probe",
  "why": "Verteilen samt dokumentiertem Rechenweg",
  "legacySources": [
   "d1",
   "d3"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-d2",
  "region": "cave",
  "title": "Die Trankwerkstatt",
  "npc": "Fips · Pilzalchemist",
  "story": "In der Trankwerkstatt geht es um Portionen, Dezimalteiler und Ergebnisse, deren Dezimaldarstellung nicht endet.",
  "reward": "Das Projekt ist fertig. Die Trankwerkstatt ist mit leuchtenden Flaschen gefüllt.",
  "kind": "mushroom",
  "x": -6,
  "z": -5,
  "tasks": [
   {
    "type": "work",
    "text": "Rechne 4,368 : 1,2. Forme zu einem ganzzahligen Teiler um und vervollständige die schriftliche Rechnung.",
    "answer": [
     "43,68",
     "12",
     "7",
     "4",
     "3,64"
    ],
    "lesson": "c6-divisor",
    "purpose": "Gleichsinniges Skalieren und schriftliche Division durch zweistelligen Teiler.",
    "level": "II",
    "fields": [
     "Neuer Dividend",
     "Neuer Divisor",
     "Rest von 43 − 3 · 12",
     "Rest von 76 − 6 · 12",
     "Quotient"
    ],
    "rows": [
     [
      "4,368 : 1,2 =",
      {
       "field": 0
      },
      ":",
      {
       "field": 1
      }
     ],
     [
      "43 − 36 =",
      {
       "field": 2
      }
     ],
     [
      "76 − 72 =",
      {
       "field": 3
      }
     ],
     [
      "48 − 48 = 0; Quotient",
      {
       "field": 4
      }
     ]
    ],
    "key": "c6:d2:01",
    "stage": "guided",
    "group": "c6-divisor",
    "hint": "Dividend und Divisor müssen mit derselben Zahl multipliziert werden.",
    "introduce": true,
    "skillId": "c6-divisor",
    "why": "Neuer Dividend: 43,68 · Neuer Divisor: 12 · Rest von 43 − 3 · 12: 7 · Rest von 76 − 6 · 12: 4 · Quotient: 3,64"
   },
   {
    "type": "error",
    "text": "Finde die erste falsche Zeile: 0,84 : 0,07.",
    "answer": 1,
    "lesson": "c6-divisor",
    "purpose": "Beide Operanden verändern, nicht nur den Teiler.",
    "level": "II",
    "steps": [
     "Der Divisor 0,07 soll zu 7 werden.",
     "Nur der Divisor wird mit 100 multipliziert: 0,84 : 7.",
     "Das Ergebnis ist 0,12."
    ],
    "key": "c6:d2:02",
    "stage": "practice",
    "group": "c6-divisor",
    "hint": "Dividend und Divisor müssen mit derselben Zahl multipliziert werden.",
    "introduce": true,
    "skillId": "c6-divisor",
    "why": "Zeile 2 ist falsch: Auch 0,84 muss mit 100 multipliziert werden. 84 : 7 = 12."
   },
   {
    "type": "number",
    "text": "Aus 2,3 l Trank werden Flaschen zu je 0,18 l ganz gefüllt. Wie viele VOLLE Flaschen sind möglich?",
    "answer": "12",
    "lesson": "c6-divisor",
    "purpose": "Portionieren mit Rest; Quotient nicht als Flaschenbruch übernehmen.",
    "level": "II",
    "key": "c6:d2:03",
    "stage": "practice",
    "group": "c6-divisor",
    "hint": "Dividend und Divisor müssen mit derselben Zahl multipliziert werden.",
    "introduce": true,
    "skillId": "c6-divisor",
    "why": "Eine passende Antwort ist 12. Dividend und Divisor müssen mit derselben Zahl multipliziert werden."
   },
   {
    "type": "choice",
    "text": "Welche Aussage ist richtig?",
    "answer": 1,
    "lesson": "c6-divisor",
    "purpose": "Kleiner Divisor und Bedeutung der Umkehrprobe.",
    "level": "II",
    "options": [
     "6 : 0,3 = 2, denn Teilen macht kleiner.",
     "6 : 0,3 = 20, denn zwanzig Portionen zu 0,3 ergeben 6.",
     "6 : 0,3 = 0,2, denn der Divisor hat eine Nachkommastelle.",
     "6 : 0,3 = 18, denn man rechnet 6 · 3."
    ],
    "key": "c6:d2:04",
    "stage": "practice",
    "group": "c6-divisor",
    "hint": "Dividend und Divisor müssen mit derselben Zahl multipliziert werden.",
    "introduce": true,
    "skillId": "c6-divisor",
    "why": "6 : 0,3 = 20, denn zwanzig Portionen zu 0,3 ergeben 6."
   },
   {
    "type": "choice",
    "text": "Welche Aussage beschreibt 1/3 korrekt?",
    "answer": 1,
    "lesson": "c6-periodic",
    "purpose": "Kurze typische Unterrichtskonkretisierung: periodisch vs. endlich.",
    "level": "II",
    "options": [
     "1/3 = 0,33 genau",
     "1/3 = 0,333…; die 3 wiederholt sich unbegrenzt",
     "1/3 = 0,13",
     "1/3 = 0,3 genau"
    ],
    "key": "c6:d2:05",
    "stage": "practice",
    "group": "c6-periodic",
    "hint": "Ein wiederkehrender Rest erzeugt eine wiederkehrende Ziffernfolge.",
    "introduce": true,
    "skillId": "c6-periodic",
    "why": "1/3 = 0,333…; die 3 wiederholt sich unbegrenzt"
   },
   {
    "type": "multi",
    "text": "Welche Aussagen sind richtig? Wähle alle passenden.",
    "answer": [
     0,
     2,
     3
    ],
    "lesson": "c6-periodic",
    "purpose": "Exakte Gleichheit und Näherung unterscheiden, ohne allgemeine Periodentheorie.",
    "level": "II",
    "options": [
     "3/8 = 0,375 genau",
     "2/3 = 0,67 genau",
     "2/3 ≈ 0,67 auf Hundertstel gerundet",
     "1/6 = 0,1666…"
    ],
    "key": "c6:d2:06",
    "stage": "practice",
    "group": "c6-periodic",
    "hint": "Ein wiederkehrender Rest erzeugt eine wiederkehrende Ziffernfolge.",
    "introduce": true,
    "skillId": "c6-periodic",
    "why": "Passend: 3/8 = 0,375 genau · 2/3 ≈ 0,67 auf Hundertstel gerundet · 1/6 = 0,1666…"
   }
  ],
  "advanced": false,
  "requires": [
   "c6-d1",
   "c6-m2"
  ],
  "goal": "Dezimaldivisor, gleichsinnige Skalierung, Portionieren und periodisches Ergebnis",
  "why": "Neuer Divisortyp; Division nicht mit Verkleinern verwechseln",
  "legacySources": [
   "d2",
   "d4"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-k1",
  "region": "castle",
  "title": "Die Reisegesellschaft",
  "npc": "Ari · Sternenhüter",
  "story": "Für eine Reise musst du selbst entscheiden, welche Angaben und Rechenarten gebraucht werden.",
  "reward": "Das Projekt ist fertig. Die Gäste beziehen ihr Lager; an den Tischen kommt Leben auf.",
  "kind": "camp",
  "x": -6,
  "z": 3,
  "tasks": [
   {
    "type": "choice",
    "text": "Acht Reisende zahlen je 3,45 € Eintritt. Die Gruppe bekommt insgesamt 2 € Rabatt. Die Fahrt dauert 35 Minuten. Welche Rechnung bestimmt den Gesamtpreis?",
    "answer": 0,
    "lesson": "c6-model",
    "purpose": "Relevante Angaben und einmaligen Rabatt selbst erkennen.",
    "level": "II",
    "options": [
     "8 · 3,45 − 2",
     "8 · (3,45 − 2)",
     "8 · 3,45 + 35 − 2",
     "(3,45 − 2) : 8"
    ],
    "key": "c6:k1:01",
    "stage": "guided",
    "group": "c6-model",
    "hint": "Was ist gesucht? Welche Angaben gehören dazu?",
    "introduce": true,
    "skillId": "c6-model",
    "why": "8 · 3,45 − 2"
   },
   {
    "type": "number",
    "text": "Für 6 Reisende stehen zusammen 4,5 l Wasser bereit. Jeder bekommt gleich viel. Unterwegs trinkt jede Person 0,28 l. Wie viel hat dann jede Person noch?",
    "answer": "0,47",
    "lesson": "c6-model",
    "purpose": "Division und Subtraktion in richtiger Sachreihenfolge.",
    "level": "II",
    "key": "c6:k1:02",
    "stage": "practice",
    "group": "c6-model",
    "hint": "Was ist gesucht? Welche Angaben gehören dazu?",
    "introduce": true,
    "skillId": "c6-model",
    "why": "Eine passende Antwort ist 0,47. Was ist gesucht? Welche Angaben gehören dazu?"
   },
   {
    "type": "error",
    "text": "Jori rechnet 3,2 + 1,5 · 4. Wo liegt der erste Fehler?",
    "answer": 1,
    "lesson": "c6-operations",
    "purpose": "Verfahrenswahl nicht aus der Questüberschrift ablesen.",
    "level": "II",
    "steps": [
     "Multiplikation und Addition kommen vor.",
     "Zuerst addieren: 3,2 + 1,5 = 4,7.",
     "Dann 4,7 · 4 = 18,8."
    ],
    "key": "c6:k1:03",
    "stage": "practice",
    "group": "c6-operations",
    "hint": "Erst Klammern, dann Punktrechnung, dann Strichrechnung.",
    "introduce": true,
    "skillId": "c6-operations",
    "why": "Zeile 2 ist falsch: Zuerst 1,5 · 4 = 6, dann 3,2 + 6 = 9,2."
   },
   {
    "type": "work",
    "text": "Berechne beide Ausdrücke. Die Klammern ändern die Bedeutung.",
    "answer": [
     "4,4",
     "1,2"
    ],
    "lesson": "c6-operations",
    "purpose": "Rechenreihenfolge kontrastieren und Teilrechnungen verbinden.",
    "level": "II",
    "fields": [
     "Ohne Klammer",
     "Mit Klammer"
    ],
    "rows": [
     [
      "4,8 − 1,2 : 3 =",
      {
       "field": 0
      }
     ],
     [
      "(4,8 − 1,2) : 3 =",
      {
       "field": 1
      }
     ]
    ],
    "key": "c6:k1:04",
    "stage": "practice",
    "group": "c6-operations",
    "hint": "Erst Klammern, dann Punktrechnung, dann Strichrechnung.",
    "introduce": true,
    "skillId": "c6-operations",
    "why": "Ohne Klammer: 4,4 · Mit Klammer: 1,2"
   },
   {
    "type": "number",
    "text": "Ein Pferd benötigt 0,85 kg Futter am Tag. Für drei Pferde und vier Tage sind 8,4 kg vorhanden. Wie viele Kilogramm müssen noch beschafft werden?",
    "answer": "1,8",
    "lesson": "c6-model",
    "purpose": "Mehrere gleiche Gruppen und vorhandenen Vorrat kombinieren.",
    "level": "III",
    "introduce": false,
    "key": "c6:k1:05",
    "stage": "transfer",
    "group": "c6-model",
    "hint": "Was ist gesucht? Welche Angaben gehören dazu?",
    "skillId": "c6-model",
    "why": "Eine passende Antwort ist 1,8. Was ist gesucht? Welche Angaben gehören dazu?"
   }
  ],
  "advanced": true,
  "requires": [
   "c6-a4",
   "c6-s4",
   "c6-m2",
   "c6-d2"
  ],
  "goal": "Vermischte Sachprobleme, relevante Daten, Rechenreihenfolge",
  "why": "Verfahrenswahl ist hier ausdrücklich offen",
  "legacySources": [
   "k1",
   "k2",
   "k3"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-k4",
  "region": "castle",
  "title": "Das Sternenfest",
  "npc": "Ari · Sternenhüter",
  "story": "Plane das Sternenfest: Mengen, Preise, Reste und Grenzen gehören zusammen. Ein Überschlag allein reicht nicht für jede Entscheidung.",
  "reward": "Das Projekt ist fertig. Das Sternenlicht strahlt über ganz Kommaland.",
  "kind": "beacon",
  "x": 6,
  "z": -6,
  "tasks": [
   {
    "type": "work",
    "text": "Für das Sternenfest werden 6 Bänder zu je 1,25 m und zusätzlich 0,8 m benötigt. Überschlage auf ganze Meter, indem du 1,25 und 0,8 jeweils rundest. Berechne dann den genauen Bedarf.",
    "answer": [
     "7",
     "8,3"
    ],
    "lesson": "c6-operations",
    "purpose": "Überschlag und genaue mehrgliedrige Rechnung vergleichen.",
    "level": "II",
    "fields": [
     "Überschlag in m",
     "Genauer Bedarf in m"
    ],
    "rows": [
     [
      "6 · gerundete Bandlänge + gerundete Zugabe ≈",
      {
       "field": 0
      }
     ],
     [
      "Genauer Bedarf =",
      {
       "field": 1
      }
     ]
    ],
    "introduce": false,
    "key": "c6:k4:01",
    "stage": "guided",
    "group": "c6-operations",
    "hint": "Erst Klammern, dann Punktrechnung, dann Strichrechnung.",
    "skillId": "c6-operations",
    "why": "Überschlag in m: 7 · Genauer Bedarf in m: 8,3"
   },
   {
    "type": "number",
    "text": "Für die Festbänder brauchst du 8,3 m. Der Händler verkauft das Band am Stück, aber nur in ganzen Längeneinheiten zu 2,4 m. Wie viele dieser Einheiten musst du mindestens bestellen?",
    "answer": "4",
    "lesson": "c6-model",
    "purpose": "Aufrunden im Sachkontext im Gegensatz zu vollen Portionen.",
    "level": "II",
    "key": "c6:k4:02",
    "stage": "practice",
    "group": "c6-model",
    "hint": "Was ist gesucht? Welche Angaben gehören dazu?",
    "introduce": false,
    "skillId": "c6-model",
    "why": "Eine passende Antwort ist 4. Was ist gesucht? Welche Angaben gehören dazu?"
   },
   {
    "type": "choice",
    "text": "Vier Längeneinheiten Band kosten je 1,85 €. Dazu kommen einmal 2,65 € Versand. Das Budget beträgt 10 €. Welche Entscheidung stimmt?",
    "answer": 1,
    "lesson": "c6-model",
    "purpose": "Knappe Grenze mit genauer Rechnung entscheiden.",
    "level": "II",
    "options": [
     "Es reicht, weil der Überschlag 4 · 2 + 2 = 10 ergibt.",
     "Es fehlen 0,05 €, denn die genauen Kosten betragen 10,05 €.",
     "Es fehlen 0,50 €, denn die genauen Kosten betragen 10,50 €.",
     "Es bleiben 0,05 € übrig."
    ],
    "key": "c6:k4:03",
    "stage": "practice",
    "group": "c6-model",
    "hint": "Was ist gesucht? Welche Angaben gehören dazu?",
    "introduce": false,
    "skillId": "c6-model",
    "why": "Es fehlen 0,05 €, denn die genauen Kosten betragen 10,05 €."
   },
   {
    "type": "argument",
    "text": "Von dem 9,6 m langen Band werden nacheinander 8,3 m ohne Schnittverlust abgetrennt. Das verbleibende Stück ist 1,3 m lang. Schleifen benötigen je 0,18 m. Begründe die Zahl zusätzlicher vollständiger Schleifen.",
    "answer": [
     0,
     1,
     2
    ],
    "lesson": "c6-model",
    "purpose": "Ganzzahliges Ergebnis mit zwei begrenzenden Produkten begründen.",
    "level": "III",
    "items": [
     "Vergleiche ganze Vielfache von 0,18 m mit 1,3 m.",
     "7 · 0,18 m = 1,26 m, aber 8 · 0,18 m = 1,44 m.",
     "Also sind 7 vollständige Schleifen möglich; 0,04 m bleiben übrig.",
     "1,3 : 0,18 ergibt mehr als 7; deshalb sind 8 volle Schleifen möglich.",
     "Runde zuerst 0,18 auf 0,2; das liefert immer die exakte Stückzahl."
    ],
    "key": "c6:k4:04",
    "stage": "transfer",
    "group": "c6-model",
    "hint": "Was ist gesucht? Welche Angaben gehören dazu?",
    "introduce": false,
    "skillId": "c6-model",
    "why": "Vergleiche ganze Vielfache von 0,18 m mit 1,3 m. → 7 · 0,18 m = 1,26 m, aber 8 · 0,18 m = 1,44 m. → Also sind 7 vollständige Schleifen möglich; 0,04 m bleiben übrig."
   }
  ],
  "advanced": true,
  "requires": [
   "c6-k1"
  ],
  "goal": "Planen, überschlagen, exakt rechnen und Kontextentscheidung",
  "why": "Abschließende selbstständige Verknüpfung statt Rechenart-Serie",
  "legacySources": [
   "k4"
  ],
  "contentVersion": 6
 },
 {
  "id": "c6-master-village",
  "region": "village",
  "title": "Der Zahlenkristall",
  "npc": "Liora · Hüterin der Sternensaat",
  "story": "Drei verschiedene Denkprobleme erwarten dich. Hier geht es um Begründen, Verknüpfen und eigene Lösungswege. Die Herausforderung ist freiwillig; du kannst jederzeit später zurückkommen.",
  "x": -2,
  "z": -7,
  "kind": "masterstone",
  "advanced": true,
  "challenge": true,
  "requires": [
   "c6-v1",
   "c6-v3"
  ],
  "reward": "Der ganze Ort blüht auf: Blumen, Tiere, Bewohner und ein leuchtender Himmelsbogen bleiben in der Landschaft.",
  "tasks": [
   {
    "type": "number",
    "text": "Erfinde eine Dezimalzahl, die ECHT zwischen 0,704 und 0,705 liegt. Nutze mindestens vier Nachkommastellen. Eine mögliche Zahl genügt.",
    "answer": "0,7045",
    "lesson": "c6-place",
    "purpose": "Dichte der Dezimalzahlen durch eigene Konstruktion; mehrere richtige Antworten.",
    "level": "III",
    "accept": {
     "min": "0,704",
     "max": "0,705",
     "minPlaces": 4
    },
    "key": "c6:master:village:1",
    "stage": "transfer",
    "group": "c6-place",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-place",
    "why": "Eine passende Antwort ist 0,7045. Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel."
   },
   {
    "type": "choice",
    "text": "Hinter dem Komma sollen die Ziffern 0, 2, 5 und 7 jeweils genau einmal vorkommen. Vor dem Komma steht 0. Welche so gebildete Zahl ist die größte?",
    "answer": 0,
    "lesson": "c6-place",
    "purpose": "Stellenwertwissen unter einer Bedingung zur Zahlkonstruktion nutzen.",
    "level": "III",
    "options": [
     "0,7520",
     "0,7250",
     "0,7502",
     "0,2570"
    ],
    "key": "c6:master:village:2",
    "stage": "transfer",
    "group": "c6-place",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-place",
    "why": "0,7520"
   },
   {
    "type": "argument",
    "text": "Begründe, warum 0,35 = 7/20 gilt, aber 0,305 nicht gleich 7/20 ist.",
    "answer": [
     0,
     1,
     2
    ],
    "lesson": "c6-fractions",
    "purpose": "Äquivalenz und Stellenwert-Gegenbeispiel verbinden.",
    "level": "III",
    "items": [
     "0,35 = 35/100; Kürzen mit 5 ergibt 7/20.",
     "0,305 = 305/1000, während 7/20 = 350/1000 ist.",
     "305/1000 und 350/1000 sind verschieden.",
     "Alle Zahlen mit den Ziffern 3 und 5 haben denselben Wert.",
     "Eine Null direkt nach dem Komma darf immer gestrichen werden."
    ],
    "key": "c6:master:village:3",
    "stage": "transfer",
    "group": "c6-fractions",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-fractions",
    "why": "0,35 = 35/100; Kürzen mit 5 ergibt 7/20. → 0,305 = 305/1000, während 7/20 = 350/1000 ist. → 305/1000 und 350/1000 sind verschieden."
   }
  ],
  "contentVersion": 6,
  "legacySources": [
   "master-village"
  ]
 },
 {
  "id": "c6-master-forest",
  "region": "forest",
  "title": "Die Nebelgrenzen",
  "npc": "Fenn · Hüter der uralten Eiche",
  "story": "Drei verschiedene Denkprobleme erwarten dich. Hier geht es um Begründen, Verknüpfen und eigene Lösungswege. Die Herausforderung ist freiwillig; du kannst jederzeit später zurückkommen.",
  "x": 3,
  "z": -7,
  "kind": "masterstone",
  "advanced": true,
  "challenge": true,
  "requires": [
   "c6-f1",
   "c6-f3"
  ],
  "reward": "Der ganze Ort blüht auf: Blumen, Tiere, Bewohner und ein leuchtender Himmelsbogen bleiben in der Landschaft.",
  "tasks": [
   {
    "type": "number",
    "text": "Eine Zahl mit genau drei Nachkommastellen wird auf Hundertstel zu 2,35 gerundet. Wie lautet die kleinste solche nichtnegative Zahl?",
    "answer": "2,345",
    "lesson": "c6-round",
    "purpose": "Rundung rückwärts als Intervallbedingung.",
    "level": "III",
    "key": "c6:master:forest:1",
    "stage": "transfer",
    "group": "c6-round",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-round",
    "why": "Eine passende Antwort ist 2,345. Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel."
   },
   {
    "type": "multi",
    "text": "Die genaue Weglänge wurde auf Zehntel zu 4,7 km gerundet. Welche Werte sind möglich?",
    "answer": [
     1,
     2
    ],
    "lesson": "c6-round",
    "purpose": "Untere inklusive und obere exklusive Rundungsgrenze.",
    "level": "III",
    "options": [
     "4,649 km",
     "4,65 km",
     "4,749 km",
     "4,75 km"
    ],
    "key": "c6:master:forest:2",
    "stage": "transfer",
    "group": "c6-round",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-round",
    "why": "Passend: 4,65 km · 4,749 km"
   },
   {
    "type": "argument",
    "text": "Lea sagt: „Zwischen 1,406 und 1,407 gibt es keine Zahl.“ Widerlege sie.",
    "answer": [
     0,
     1,
     2
    ],
    "lesson": "c6-line",
    "purpose": "Zahlengerade nicht als endliche Liste von Strichen missverstehen.",
    "level": "III",
    "items": [
     "Man darf beide Zahlen auch 1,4060 und 1,4070 schreiben.",
     "Die Zahl 1,4065 liegt dazwischen.",
     "Mehr Stellen ermöglichen eine feinere Unterteilung; die beiden ursprünglichen Zahlen waren nicht benachbart unter allen Dezimalzahlen.",
     "Auf jedem Zahlenstrahl gibt es nur beschriftete Zahlen.",
     "1,4065 liegt außerhalb, weil die Zahl mehr Nachkommastellen hat."
    ],
    "key": "c6:master:forest:3",
    "stage": "transfer",
    "group": "c6-line",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-line",
    "why": "Man darf beide Zahlen auch 1,4060 und 1,4070 schreiben. → Die Zahl 1,4065 liegt dazwischen. → Mehr Stellen ermöglichen eine feinere Unterteilung; die beiden ursprünglichen Zahlen waren nicht benachbart unter allen Dezimalzahlen."
   }
  ],
  "contentVersion": 6,
  "legacySources": [
   "master-forest"
  ]
 },
 {
  "id": "c6-master-harbor",
  "region": "harbor",
  "title": "Die Hafenmeisterprüfung",
  "npc": "Nela · Hafenmeisterin",
  "story": "Drei verschiedene Denkprobleme erwarten dich. Hier geht es um Begründen, Verknüpfen und eigene Lösungswege. Die Herausforderung ist freiwillig; du kannst jederzeit später zurückkommen.",
  "x": 1,
  "z": 9,
  "kind": "masterstone",
  "advanced": true,
  "challenge": true,
  "requires": [
   "c6-h1",
   "c6-h5"
  ],
  "reward": "Der ganze Ort blüht auf: Blumen, Tiere, Bewohner und ein leuchtender Himmelsbogen bleiben in der Landschaft.",
  "tasks": [
   {
    "type": "work",
    "text": "Ein Behälter fasst 0,012 m³ und ist mit 8,4 l gefüllt. Es werden Becher zu 150 ml gefüllt. Wie viele zusätzliche Liter passen noch hinein, und wie viele volle Becher ergeben die vorhandenen 8,4 l?",
    "answer": [
     "3,6",
     "56"
    ],
    "lesson": "c6-volume",
    "purpose": "Raumeinheiten und Portionieren in zwei verschiedenen Fragen trennen.",
    "level": "III",
    "fields": [
     "Freier Raum in l",
     "Volle Becher"
    ],
    "rows": [
     [
      "Noch frei",
      {
       "field": 0
      },
      "l"
     ],
     [
      "Vorhandener Inhalt reicht für",
      {
       "field": 1
      },
      "Becher"
     ]
    ],
    "key": "c6:master:harbor:1",
    "stage": "transfer",
    "group": "c6-volume",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-volume",
    "why": "Freier Raum in l: 3,6 · Volle Becher: 56"
   },
   {
    "type": "number",
    "text": "Eine Fahrt dauert 1,4 h. Danach dauert das Umladen 18 min. Um 12:05 Uhr muss alles fertig sein. Der späteste Start liegt zwischen 10:00 und 11:00 Uhr. Wie viele Minuten NACH 10:00 Uhr ist dieser Start?",
    "answer": "23",
    "lesson": "c6-time",
    "purpose": "Zeitpunkte und Dezimalstunden verknüpfen.",
    "level": "III",
    "key": "c6:master:harbor:2",
    "stage": "transfer",
    "group": "c6-time",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-time",
    "why": "Eine passende Antwort ist 23. Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel."
   },
   {
    "type": "choice",
    "text": "Ein quadratisches Tuch hat 0,4 m Seitenlänge. Welche Begründung für seine Fläche in cm² stimmt?",
    "answer": 0,
    "lesson": "c6-area",
    "purpose": "Zwei korrekte Umrechnungswege müssen denselben Flächenwert liefern.",
    "level": "III",
    "options": [
     "0,4 m = 40 cm; 40 · 40 = 1600 cm².",
     "0,4 · 0,4 = 0,16 m²; mal 100 = 16 cm².",
     "0,4 m = 4 cm; 4 · 4 = 16 cm².",
     "0,4 m = 40 cm; 40 + 40 = 80 cm²."
    ],
    "key": "c6:master:harbor:3",
    "stage": "transfer",
    "group": "c6-area",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-area",
    "why": "0,4 m = 40 cm; 40 · 40 = 1600 cm²."
   }
  ],
  "contentVersion": 6,
  "legacySources": [
   "master-harbor"
  ]
 },
 {
  "id": "c6-master-market",
  "region": "market",
  "title": "Der kluge Handel",
  "npc": "Ravi · Festkoch",
  "story": "Drei verschiedene Denkprobleme erwarten dich. Hier geht es um Begründen, Verknüpfen und eigene Lösungswege. Die Herausforderung ist freiwillig; du kannst jederzeit später zurückkommen.",
  "x": 1,
  "z": 8,
  "kind": "masterstone",
  "advanced": true,
  "challenge": true,
  "requires": [
   "c6-a1",
   "c6-a4"
  ],
  "reward": "Der ganze Ort blüht auf: Blumen, Tiere, Bewohner und ein leuchtender Himmelsbogen bleiben in der Landschaft.",
  "tasks": [
   {
    "type": "number",
    "text": "Zwei Geldbeträge ergeben zusammen 18,40 €. Der zweite Betrag ist 2,70 € größer als der erste. Wie groß ist der erste Betrag?",
    "answer": "7,85",
    "lesson": "c6-sum-smart",
    "purpose": "Fehlende Summanden unter zusätzlicher Bedingung, ohne formale Gleichungssysteme.",
    "level": "III",
    "key": "c6:master:market:1",
    "stage": "transfer",
    "group": "c6-sum-smart",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-sum-smart",
    "why": "Eine passende Antwort ist 7,85. Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel."
   },
   {
    "type": "multi",
    "text": "Welche Veränderungen lassen eine Summe a + b unverändert?",
    "answer": [
     0,
     2
    ],
    "lesson": "c6-sum-smart",
    "purpose": "Invarianten beurteilen statt Zahlen nur addieren.",
    "level": "III",
    "options": [
     "a um 0,4 erhöhen und b um 0,4 verringern",
     "Beide Summanden um 0,4 erhöhen",
     "Die beiden Summanden vertauschen",
     "a verdoppeln und b halbieren: immer"
    ],
    "key": "c6:master:market:2",
    "stage": "transfer",
    "group": "c6-sum-smart",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-sum-smart",
    "why": "Passend: a um 0,4 erhöhen und b um 0,4 verringern · Die beiden Summanden vertauschen"
   },
   {
    "type": "work",
    "text": "Vier Waren kosten 2,85 €, 3,65 €, 4,20 € und 1,95 €. Du hast 10 €. Genau eine Ware muss entfallen. Welche ist die billigste Ware, deren Weglassen ausreicht? Nenne ihren Preis und den Restbetrag nach dem Kauf der anderen drei.",
    "answer": [
     "2,85",
     "0,20"
    ],
    "lesson": "c6-sum-smart",
    "purpose": "Einfaches Optimieren unter Budgetbedingung.",
    "level": "III",
    "fields": [
     "Wegzulassender Preis in €",
     "Rest in €"
    ],
    "rows": [
     [
      "Weglassen",
      {
       "field": 0
      },
      "€"
     ],
     [
      "Danach übrig",
      {
       "field": 1
      },
      "€"
     ]
    ],
    "key": "c6:master:market:3",
    "stage": "transfer",
    "group": "c6-sum-smart",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-sum-smart",
    "why": "Wegzulassender Preis in €: 2,85 · Rest in €: 0,20"
   }
  ],
  "contentVersion": 6,
  "legacySources": [
   "master-market"
  ]
 },
 {
  "id": "c6-master-cliffs",
  "region": "cliffs",
  "title": "Spuren rückwärts",
  "npc": "Taro · Bergführer",
  "story": "Drei verschiedene Denkprobleme erwarten dich. Hier geht es um Begründen, Verknüpfen und eigene Lösungswege. Die Herausforderung ist freiwillig; du kannst jederzeit später zurückkommen.",
  "x": 1,
  "z": 8,
  "kind": "masterstone",
  "advanced": true,
  "challenge": true,
  "requires": [
   "c6-s1",
   "c6-s4"
  ],
  "reward": "Der ganze Ort blüht auf: Blumen, Tiere, Bewohner und ein leuchtender Himmelsbogen bleiben in der Landschaft.",
  "tasks": [
   {
    "type": "number",
    "text": "Ein Fass wurde erst um 2,85 l geleert. Danach wurde die Hälfte des verbleibenden Inhalts entnommen. Jetzt sind 4,075 l darin. Wie viel war ganz am Anfang im Fass?",
    "answer": "11",
    "lesson": "c6-inverse",
    "purpose": "Zwei unterschiedliche Änderungen in umgekehrter Reihenfolge zurückrechnen.",
    "level": "III",
    "key": "c6:master:cliffs:1",
    "stage": "transfer",
    "group": "c6-inverse",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-inverse",
    "why": "Eine passende Antwort ist 11. Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel."
   },
   {
    "type": "choice",
    "text": "Die Differenz a − b ist 3,75. Nun wird a um 0,8 und b um 1,05 erhöht. Wie groß ist die neue Differenz?",
    "answer": 1,
    "lesson": "c6-inverse",
    "purpose": "Wirkung zweier Änderungen auf eine Differenz begründen.",
    "level": "III",
    "options": [
     "4,00",
     "3,50",
     "5,60",
     "3,75"
    ],
    "key": "c6:master:cliffs:2",
    "stage": "transfer",
    "group": "c6-inverse",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-inverse",
    "why": "3,50"
   },
   {
    "type": "argument",
    "text": "Bei 9,003 − 0,785 entstehen nach dem Entbündeln 8 Einer, 9 Zehntel, 9 Hundertstel und 13 Tausendstel. Begründe, dass der Wert 9,003 erhalten bleibt.",
    "answer": [
     0,
     1,
     2
    ],
    "lesson": "c6-sub",
    "purpose": "Werterhaltung des Algorithmus statt Auswendigregel nachweisen.",
    "level": "III",
    "items": [
     "Ein Einer wird in 10 Zehntel getauscht; anschließend ein Zehntel in 10 Hundertstel und ein Hundertstel in 10 Tausendstel.",
     "8 + 0,9 + 0,09 + 0,013 = 9,003.",
     "Erst das anschließende Abziehen verändert den Zahlenwert.",
     "Jeder Tausch erhöht den Wert um 10.",
     "Die 13 Tausendstel dürfen beim Prüfen als 0,13 geschrieben werden."
    ],
    "key": "c6:master:cliffs:3",
    "stage": "transfer",
    "group": "c6-sub",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-sub",
    "why": "Ein Einer wird in 10 Zehntel getauscht; anschließend ein Zehntel in 10 Hundertstel und ein Hundertstel in 10 Tausendstel. → 8 + 0,9 + 0,09 + 0,013 = 9,003. → Erst das anschließende Abziehen verändert den Zahlenwert."
   }
  ],
  "contentVersion": 6,
  "legacySources": [
   "master-cliffs"
  ]
 },
 {
  "id": "c6-master-mill",
  "region": "mill",
  "title": "Die Werkstatt der Beziehungen",
  "npc": "Alva · Tierpflegerin",
  "story": "Drei verschiedene Denkprobleme erwarten dich. Hier geht es um Begründen, Verknüpfen und eigene Lösungswege. Die Herausforderung ist freiwillig; du kannst jederzeit später zurückkommen.",
  "x": 0,
  "z": 9,
  "kind": "masterstone",
  "advanced": true,
  "challenge": true,
  "requires": [
   "c6-m1",
   "c6-m2"
  ],
  "reward": "Der ganze Ort blüht auf: Blumen, Tiere, Bewohner und ein leuchtender Himmelsbogen bleiben in der Landschaft.",
  "tasks": [
   {
    "type": "work",
    "text": "Ein Rechteck hat 2,4 m Länge und 1,5 m Breite. Die Länge wird halbiert, die Breite verdreifacht. Bestimme die alte und neue Fläche.",
    "answer": [
     "3,6",
     "5,4"
    ],
    "lesson": "c6-product",
    "purpose": "Änderungsfaktoren verknüpfen statt nur größere Zahlen verwenden.",
    "level": "III",
    "fields": [
     "Alte Fläche in m²",
     "Neue Fläche in m²"
    ],
    "rows": [
     [
      "Vorher",
      {
       "field": 0
      },
      "m²"
     ],
     [
      "Danach",
      {
       "field": 1
      },
      "m²"
     ]
    ],
    "key": "c6:master:mill:1",
    "stage": "transfer",
    "group": "c6-product",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-product",
    "why": "Alte Fläche in m²: 3,6 · Neue Fläche in m²: 5,4"
   },
   {
    "type": "number",
    "text": "Ein Rechteck ist 12,5 m lang und hat eine Fläche von 9,375 m². Wie breit ist es in Metern?",
    "answer": "0,75",
    "lesson": "c6-product",
    "purpose": "Rückwärtsfrage zum Produkt; Hilfe vorhanden, kein neues Pflichtverfahren.",
    "level": "III",
    "key": "c6:master:mill:2",
    "stage": "transfer",
    "group": "c6-product",
    "hint": "Welchen Anteil von 12,5 macht 9,375 aus? Probiere eine Hälfte oder Viertel von 12,5 und prüfe dein Produkt.",
    "introduce": false,
    "skillId": "c6-product",
    "why": "Drei Viertel von 12,5 sind 9,375: 6,25 + 3,125. Also ist die Breite 0,75 m; Probe: 12,5 · 0,75 = 9,375."
   },
   {
    "type": "argument",
    "text": "Begründe ohne langes Multiplizieren: 3,6 · 0,75 ist genauso groß wie 2,7.",
    "answer": [
     0,
     1,
     2
    ],
    "lesson": "c6-product",
    "purpose": "Dezimalprodukt über Bruchvorstellung und geschicktes Rechnen begründen.",
    "level": "III",
    "items": [
     "0,75 ist 3/4.",
     "Ein Viertel von 3,6 ist 0,9; drei Viertel sind 3 · 0,9.",
     "3 · 0,9 = 2,7.",
     "0,75 bedeutet drei Ganze und ein Viertel.",
     "Ein Faktor kleiner als 1 darf kein nichtganzzahliges Ergebnis erzeugen."
    ],
    "key": "c6:master:mill:3",
    "stage": "transfer",
    "group": "c6-product",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-product",
    "why": "0,75 ist 3/4. → Ein Viertel von 3,6 ist 0,9; drei Viertel sind 3 · 0,9. → 3 · 0,9 = 2,7."
   }
  ],
  "contentVersion": 6,
  "legacySources": [
   "master-mill"
  ]
 },
 {
  "id": "c6-master-cave",
  "region": "cave",
  "title": "Das Rätsel der Portionen",
  "npc": "Miko · Freund der Grottenwesen",
  "story": "Drei verschiedene Denkprobleme erwarten dich. Hier geht es um Begründen, Verknüpfen und eigene Lösungswege. Die Herausforderung ist freiwillig; du kannst jederzeit später zurückkommen.",
  "x": 0,
  "z": 8,
  "kind": "masterstone",
  "advanced": true,
  "challenge": true,
  "requires": [
   "c6-d1",
   "c6-d2"
  ],
  "reward": "Der ganze Ort blüht auf: Blumen, Tiere, Bewohner und ein leuchtender Himmelsbogen bleiben in der Landschaft.",
  "tasks": [
   {
    "type": "work",
    "text": "Für 3,4 l Trank stehen Flaschen zu 0,28 l bereit. Fülle möglichst viele ganz. Wie viele volle Flaschen entstehen, und wie viel Liter bleiben übrig?",
    "answer": [
     "12",
     "0,04"
    ],
    "lesson": "c6-divisor",
    "purpose": "Quotient und sachgerechten Rest gemeinsam bestimmen.",
    "level": "III",
    "fields": [
     "Volle Flaschen",
     "Rest in l"
    ],
    "rows": [
     [
      "Volle Flaschen",
      {
       "field": 0
      }
     ],
     [
      "Rest",
      {
       "field": 1
      },
      "l"
     ]
    ],
    "key": "c6:master:cave:1",
    "stage": "transfer",
    "group": "c6-divisor",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-divisor",
    "why": "Volle Flaschen: 12 · Rest in l: 0,04"
   },
   {
    "type": "number",
    "text": "Eine Zahl wird durch 0,4 geteilt; anschließend werden 1,75 abgezogen. Das Ergebnis ist 6,5. Welche Zahl war es?",
    "answer": "3,3",
    "lesson": "c6-divisor",
    "purpose": "Division und Subtraktion in einer Umkehrkette verbinden.",
    "level": "III",
    "key": "c6:master:cave:2",
    "stage": "transfer",
    "group": "c6-divisor",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-divisor",
    "why": "Eine passende Antwort ist 3,3. Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel."
   },
   {
    "type": "multi",
    "text": "Welche Aussagen gelten? Wähle alle richtigen.",
    "answer": [
     0,
     2,
     3
    ],
    "lesson": "c6-divisor",
    "purpose": "Quotientengesetze und Näherung an Grenzfällen beurteilen.",
    "level": "III",
    "options": [
     "Wenn Dividend und Divisor beide halbiert werden, bleibt der Quotient gleich (Divisor ≠ 0).",
     "Bei 1 : 3 ist 0,333 genau das Ergebnis.",
     "8 : 0,4 und 80 : 4 haben denselben Wert.",
     "Wird nur ein positiver Divisor halbiert, verdoppelt sich der Quotient."
    ],
    "key": "c6:master:cave:3",
    "stage": "transfer",
    "group": "c6-divisor",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-divisor",
    "why": "Passend: Wenn Dividend und Divisor beide halbiert werden, bleibt der Quotient gleich (Divisor ≠ 0). · 8 : 0,4 und 80 : 4 haben denselben Wert. · Wird nur ein positiver Divisor halbiert, verdoppelt sich der Quotient."
   }
  ],
  "contentVersion": 6,
  "legacySources": [
   "master-cave"
  ]
 },
 {
  "id": "c6-master-castle",
  "region": "castle",
  "title": "Das Fest der Möglichkeiten",
  "npc": "Yumi · Sternendrache",
  "story": "Drei verschiedene Denkprobleme erwarten dich. Hier geht es um Begründen, Verknüpfen und eigene Lösungswege. Die Herausforderung ist freiwillig; du kannst jederzeit später zurückkommen.",
  "x": 0,
  "z": 6,
  "kind": "masterstone",
  "advanced": true,
  "challenge": true,
  "requires": [
   "c6-k1",
   "c6-k4"
  ],
  "reward": "Der ganze Ort blüht auf: Blumen, Tiere, Bewohner und ein leuchtender Himmelsbogen bleiben in der Landschaft.",
  "tasks": [
   {
    "type": "work",
    "text": "Für ein Fest brauchen 18 Gäste je 0,35 l Saft. Gekauft werden Flaschen zu 1,5 l für je 1,85 €. Wie viele Flaschen sind mindestens nötig, und wie viel kostet der Einkauf?",
    "answer": [
     "5",
     "9,25"
    ],
    "lesson": "c6-model",
    "purpose": "Mehrstufiges Beschaffen mit ganzzahliger Verpackungsbedingung.",
    "level": "III",
    "fields": [
     "Flaschenzahl",
     "Kosten in €"
    ],
    "rows": [
     [
      "Mindestens",
      {
       "field": 0
      },
      "Flaschen"
     ],
     [
      "Kosten",
      {
       "field": 1
      },
      "€"
     ]
    ],
    "key": "c6:master:castle:1",
    "stage": "transfer",
    "group": "c6-model",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-model",
    "why": "Flaschenzahl: 5 · Kosten in €: 9,25"
   },
   {
    "type": "choice",
    "text": "Ein Seil muss in sechs Stücke zu je 1,25 m geschnitten werden. Zwischen aufeinanderfolgenden Stücken gehen bei fünf Schnitten je 0,004 m verloren. Welche Anfangslänge reicht genau?",
    "answer": 1,
    "lesson": "c6-model",
    "purpose": "Modellannahmen und Anzahl der Zwischenräume statt Zahlenroutine.",
    "level": "III",
    "options": [
     "7,500 m",
     "7,520 m",
     "7,524 m",
     "7,496 m"
    ],
    "key": "c6:master:castle:2",
    "stage": "transfer",
    "group": "c6-model",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-model",
    "why": "7,520 m"
   },
   {
    "type": "number",
    "text": "Ein Markt bietet Hefte einzeln für 1,85 € oder im Dreierpack für 5,10 € an. Du brauchst genau acht Hefte und darfst beide Angebote kombinieren. Wie gering können die Kosten sein?",
    "answer": "13,9",
    "lesson": "c6-model",
    "purpose": "Kleine endliche Optimierung durch systematisches Vergleichen.",
    "level": "III",
    "key": "c6:master:castle:3",
    "stage": "transfer",
    "group": "c6-model",
    "hint": "Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel.",
    "introduce": false,
    "skillId": "c6-model",
    "why": "Eine passende Antwort ist 13,9. Notiere die Bedingungen. Prüfe einen möglichen Lösungsweg und nutze bei Bedarf das Beispiel."
   }
  ],
  "contentVersion": 6,
  "legacySources": [
   "master-castle"
  ]
 }
];

export const INFO = {
 "village": [
  {
   "id": "c6-place"
  },
  {
   "id": "c6-zeros"
  },
  {
   "id": "c6-fractions"
  }
 ],
 "forest": [
  {
   "id": "c6-compare"
  },
  {
   "id": "c6-line"
  },
  {
   "id": "c6-round"
  },
  {
   "id": "c6-estimate"
  }
 ],
 "harbor": [
  {
   "id": "c6-units"
  },
  {
   "id": "c6-time"
  },
  {
   "id": "c6-area"
  },
  {
   "id": "c6-volume"
  }
 ],
 "market": [
  {
   "id": "c6-add"
  },
  {
   "id": "c6-sum-smart"
  }
 ],
 "cliffs": [
  {
   "id": "c6-sub"
  },
  {
   "id": "c6-inverse"
  }
 ],
 "mill": [
  {
   "id": "c6-scale"
  },
  {
   "id": "c6-product"
  },
  {
   "id": "c6-multiply-written"
  },
  {
   "id": "c6-distribute"
  }
 ],
 "cave": [
  {
   "id": "c6-divide-written"
  },
  {
   "id": "c6-divisor"
  },
  {
   "id": "c6-periodic"
  }
 ],
 "castle": [
  {
   "id": "c6-model"
  },
  {
   "id": "c6-operations"
  }
 ]
};
export const CORE_LESSONS = {
 "c6-place": {
  "id": "c6-place",
  "region": "village",
  "title": "Dezimalzahlen: ein Stellenwertsystem",
  "text": "Zwischen 2 und 3 liegt zum Beispiel 2,5: zwei Ganze und fünf Zehntel. Fünf von zehn gleich großen Teilen sind eine Hälfte. Jede Stelle nach rechts ist ein Zehntel so viel wert: Einer | Zehntel | Hundertstel | Tausendstel. So bedeutet 12,304: 1 Zehner, 2 Einer, 3 Zehntel, 0 Hundertstel und 4 Tausendstel. Eine Null hält eine Stelle frei.",
  "example": {
   "prompt": "Zerlege 4,206 in Stellenwerte.",
   "steps": [
    "Die 4 steht für vier Einer.",
    "Die 2 bedeutet zwei Zehntel; es gibt keine Hundertstel.",
    "4,206 = 4 + 0,2 + 0,006."
   ]
  },
  "core": true,
  "support": [
   "between",
   "tenths",
   "hundred-grid",
   "thousand"
  ]
 },
 "c6-zeros": {
  "id": "c6-zeros",
  "region": "village",
  "title": "Welche Nullen darf man weglassen?",
  "text": "Am Ende der Nachkommastellen darfst du Nullen ergänzen oder weglassen: 3,5 = 3,50 = 3,500. Die Stelle der anderen Ziffern bleibt gleich. Eine Null innerhalb der Zahl darfst du nicht einfach streichen: 3,05 und 3,5 sind verschieden.",
  "example": {
   "prompt": "Prüfe: Sind 8,040 und 8,04 gleich?",
   "steps": [
    "8,040 enthält vier Hundertstel und null Tausendstel.",
    "Die letzte Null trägt nichts hinzu.",
    "8,040 = 8,04; dagegen ist 8,4 eine andere Zahl."
   ]
  },
  "core": true,
  "support": [
   "zero-hundred",
   "equal-zeros"
  ]
 },
 "c6-fractions": {
  "id": "c6-fractions",
  "region": "village",
  "title": "Bruch und Dezimalzahl verbinden",
  "text": "Ein Bruch beschreibt gleich große Teile: Der Nenner nennt die Teilung des Ganzen, der Zähler die genommenen Teile. Bei 7/100 sind es sieben Hundertstel, also 0,07. Erweitere oder kürze Zähler und Nenner mit derselben Zahl, um Zehntel, Hundertstel oder Tausendstel zu erhalten. Der Wert bleibt dabei gleich.",
  "example": {
   "prompt": "Schreibe 9/25 als Dezimalzahl.",
   "steps": [
    "Erweitere Zähler und Nenner mit 4.",
    "9/25 = 36/100.",
    "36 Hundertstel sind 0,36."
   ]
  },
  "core": true,
  "support": [
   "fraction-meaning",
   "fraction-tenths",
   "fraction-quarter"
  ]
 },
 "c6-compare": {
  "id": "c6-compare",
  "region": "forest",
  "title": "Ordnen mit Stellenwerten",
  "text": "Vergleiche zuerst die ganzen Zahlen, danach Zehntel, Hundertstel und so weiter. Die erste unterschiedliche Stelle entscheidet. Angehängte Nullen können helfen: 0,409 < 0,490. Mehr Nachkommastellen bedeuten nicht automatisch einen größeren Wert.",
  "example": {
   "prompt": "Vergleiche 6,08 und 6,079.",
   "steps": [
    "Schreibe 6,08 als 6,080.",
    "Einer und Zehntel sind gleich; bei den Hundertsteln gilt 8 > 7.",
    "Also ist 6,08 > 6,079."
   ]
  },
  "core": true,
  "support": [
   "compare-tenths",
   "compare-hundred"
  ]
 },
 "c6-line": {
  "id": "c6-line",
  "region": "forest",
  "title": "Unbeschriftete Teilstriche lesen",
  "text": "Auf einer Zahlengeraden entsprechen gleiche Abstände gleichen Zahlunterschieden. Bestimme den Abstand der beschrifteten Zahlen und zähle die Zwischenräume, nicht die Striche. Teile dann den Zahlunterschied durch die Anzahl der Zwischenräume.",
  "example": {
   "prompt": "Zwischen 1,2 und 1,3 liegen zehn gleich lange Abschnitte. Welcher Wert liegt drei Abschnitte nach 1,2?",
   "steps": [
    "Der ganze Abstand beträgt 0,1.",
    "Jeder Abschnitt steht für 0,01.",
    "Drei Abschnitte führen zu 1,23."
   ]
  },
  "core": true,
  "support": [
   "line-tenths",
   "line-fives"
  ]
 },
 "c6-round": {
  "id": "c6-round",
  "region": "forest",
  "title": "Runden: Nachbarn und Genauigkeit",
  "text": "Wähle zuerst die gewünschte Stelle. Vergleiche die Zahl mit den beiden benachbarten Rundungswerten. Ab der Mitte wird bei nichtnegativen Zahlen aufgerundet. Die nächste Ziffer entscheidet: 0 bis 4 ab-, 5 bis 9 aufrunden. Ein Übertrag kann auch mehrere Neunen betreffen.",
  "example": {
   "prompt": "Runde 6,995 auf Hundertstel.",
   "steps": [
    "Die Nachbarn sind 6,99 und 7,00.",
    "6,995 liegt genau in der Mitte.",
    "Auf Hundertstel gerundet: 7,00."
   ]
  },
  "core": true,
  "support": [
   "round-near",
   "round-carry"
  ]
 },
 "c6-estimate": {
  "id": "c6-estimate",
  "region": "forest",
  "title": "Überschlagen und Grenzen beachten",
  "text": "Ein Überschlag ist eine schnelle Näherung. Runde die Eingaben passend zur Frage und rechne damit. Zum Prüfen eines Ergebnisses reicht oft die Größenordnung. Liegt ein Budget oder eine Traglast nahe am Ergebnis, brauchst du eine genaue Rechnung: Ein gerundeter Wert entscheidet keine knappe Grenze.",
  "example": {
   "prompt": "Reichen 10 € für 4,86 € und 5,27 €?",
   "steps": [
    "Der Überschlag 5 + 5 ergibt ungefähr 10 €.",
    "Das ist zu nah an der Grenze für eine sichere Entscheidung.",
    "Genau sind es 10,13 €: 10 € reichen nicht."
   ]
  },
  "core": true,
  "support": [
   "estimate",
   "limits"
  ]
 },
 "c6-units": {
  "id": "c6-units",
  "region": "harbor",
  "title": "Gleiche Größe, andere Einheit",
  "text": "Die Größe bleibt gleich, nur Maßzahl und Einheit ändern sich. 1 m = 100 cm, 1 kg = 1000 g, 1 l = 1000 ml, 1 € = 100 ct. In der kleineren Einheit ist die Maßzahl größer. Schreibe bei Vergleichen und Rechnungen zuerst passende gemeinsame Einheiten.",
  "example": {
   "prompt": "Wandle 2,065 kg in Gramm um.",
   "steps": [
    "1 kg sind 1000 g.",
    "2 kg sind 2000 g, 0,065 kg sind 65 g.",
    "2,065 kg = 2065 g."
   ]
  },
  "core": true,
  "support": [
   "metres-cm",
   "kg-grams",
   "ml-litres",
   "money"
  ]
 },
 "c6-time": {
  "id": "c6-time",
  "region": "harbor",
  "title": "Dezimalstunden sind keine Minutenstellen",
  "text": "Eine Stunde hat 60 Minuten, nicht 100. Die Nachkommastellen einer Dezimalstunde sind Bruchteile einer Stunde: 0,1 h = 6 min und 0,5 h = 30 min. Eine Uhrzeit wie 9:30 ist eine andere Schreibweise als eine Zeitdauer von 9,30 h.",
  "example": {
   "prompt": "Wie viele Minuten sind 1,35 h?",
   "steps": [
    "Eine ganze Stunde sind 60 Minuten.",
    "0,35 · 60 min = 21 min.",
    "Zusammen sind es 81 min."
   ]
  },
  "core": true,
  "support": [
   "time-half",
   "time-quarter"
  ]
 },
 "c6-area": {
  "id": "c6-area",
  "region": "harbor",
  "title": "Flächeneinheiten: in zwei Richtungen",
  "text": "Eine Fläche wird in Quadraten gemessen. Ein Quadrat von 1 m × 1 m enthält 100 × 100 Quadrate von 1 cm × 1 cm. Deshalb ist 1 m² = 10 000 cm². Zwischen benachbarten Einheiten wie m² und dm² liegt der Faktor 100, nicht 10.",
  "example": {
   "prompt": "Wandle 0,32 m² in dm² um.",
   "steps": [
    "1 m = 10 dm in jeder der beiden Richtungen.",
    "Daher 1 m² = 100 dm².",
    "0,32 m² = 32 dm²."
   ]
  },
  "core": true,
  "support": [
   "square-units"
  ]
 },
 "c6-volume": {
  "id": "c6-volume",
  "region": "harbor",
  "title": "Raumeinheiten: in drei Richtungen",
  "text": "Ein Würfel von 1 dm Kantenlänge enthält 10 · 10 · 10 = 1000 Würfel von 1 cm Kantenlänge. Deshalb 1 dm³ = 1000 cm³ = 1 l. Ebenso gilt 1 m³ = 1000 dm³ = 1000 l. Unterscheide Volumen von Länge und Fläche.",
  "example": {
   "prompt": "Wie viele Liter sind 0,045 m³?",
   "steps": [
    "1 m³ fasst 1000 l.",
    "0,045 · 1000 = 45.",
    "0,045 m³ = 45 l."
   ]
  },
  "core": true,
  "support": [
   "cube-units",
   "cube-litre"
  ]
 },
 "c6-add": {
  "id": "c6-add",
  "region": "market",
  "title": "Schriftlich addieren: Stellen auf Stellen",
  "text": "Schreibe Einer unter Einer, Zehntel unter Zehntel und so weiter; die Kommas stehen untereinander. Ergänze rechts nötigenfalls Nullen. Addiere von rechts nach links. Zehn Einheiten einer Stelle werden zu einer Einheit der nächstgrößeren Stelle gebündelt.",
  "example": {
   "prompt": "Berechne 2,75 + 0,486.",
   "steps": [
    "Richte die Zahlen als 2,750 und 0,486 aus.",
    "Tausendstel: 0 + 6 = 6. Hundertstel: 5 + 8 = 13; schreibe 3, übertrage 1.",
    "Zehntel: 7 + 4 + 1 = 12; Einer: 2 + 0 + 1 = 3. Ergebnis: 3,236."
   ]
  },
  "core": true,
  "support": [
   "add-align",
   "add-carry"
  ]
 },
 "c6-sum-smart": {
  "id": "c6-sum-smart",
  "region": "market",
  "title": "Geschickt addieren und ergänzen",
  "text": "Bei einer Summe darfst du Summanden vertauschen und anders zusammenfassen. Suche passende Paare, zum Beispiel 1,75 + 0,25 = 2. Eine fehlende Zahl erhältst du durch Ergänzen oder die Umkehraufgabe. Bei einer Differenz darfst du die Zahlen nicht beliebig vertauschen.",
  "example": {
   "prompt": "Berechne 2,38 + 4,7 + 0,62.",
   "steps": [
    "Fasse zuerst 2,38 und 0,62 zusammen.",
    "Das ergibt 3; der Summand 4,7 bleibt erhalten.",
    "3 + 4,7 = 7,7."
   ]
  },
  "core": true,
  "support": [
   "add-group"
  ]
 },
 "c6-sub": {
  "id": "c6-sub",
  "region": "cliffs",
  "title": "Schriftlich subtrahieren und entbündeln",
  "text": "Richte gleiche Stellen untereinander aus. Reicht eine Stelle beim Abziehen nicht, tausche eine Einheit der nächstgrößeren Stelle in zehn kleinere Einheiten. Über Nullen hinweg sind mehrere solche Tausche nötig. Hier verwenden wir die Entbündelungsmethode; andere korrekt ausgeführte Schulverfahren sind ebenfalls möglich.",
  "example": {
   "prompt": "Berechne 6,02 − 0,58 durch Entbündeln.",
   "steps": [
    "6 Einer, 0 Zehntel, 2 Hundertstel werden zu 5 Einern, 10 Zehnteln, 2 Hundertsteln.",
    "Tausche noch ein Zehntel: 5 Einer, 9 Zehntel, 12 Hundertstel.",
    "12 − 8 = 4; 9 − 5 = 4; 5 − 0 = 5. Ergebnis 5,44."
   ]
  },
  "core": true,
  "support": [
   "subtract-exchange",
   "subtract-whole"
  ]
 },
 "c6-inverse": {
  "id": "c6-inverse",
  "region": "cliffs",
  "title": "Rückwärts denken und mit der Umkehrung prüfen",
  "text": "Unterscheide Anfang, Änderung und Rest. Ist der Anfang unbekannt, rechne vom Rest zurück. Eine Subtraktion prüfst du durch Addition: Rest + abgezogene Menge muss die Anfangsmenge ergeben. Eine passende Gleichung kann die Beziehung kurz festhalten.",
  "example": {
   "prompt": "Nach dem Verbrauch von 1,85 l bleiben 3,075 l. Wie viel war vorher da?",
   "steps": [
    "Gesucht ist der Anfang x: x − 1,85 = 3,075.",
    "Rechne zurück: 3,075 + 1,85 = 4,925.",
    "Probe: 4,925 − 1,85 = 3,075."
   ]
  },
  "core": true,
  "support": [
   "missing",
   "subtract-proof"
  ]
 },
 "c6-scale": {
  "id": "c6-scale",
  "region": "mill",
  "title": "Zehnerpotenzen und gleiche Portionen",
  "text": "Mehrere gleich große Mengen kannst du multiplizieren: vier Portionen von 0,35 kg sind 4 · 0,35 kg. Beim Multiplizieren mit 10, 100 oder 1000 wird jede Ziffer entsprechend mehr wert; beim Dividieren entsprechend weniger. Die Stellen ändern sich, nicht die Reihenfolge der Ziffern.",
  "example": {
   "prompt": "Berechne 0,406 · 100 und 40,6 : 10.",
   "steps": [
    "Hundertstel werden beim Multiplizieren mit 100 zu Einern.",
    "0,406 · 100 = 40,6.",
    "Beim Dividieren durch 10 wird daraus 4,06."
   ]
  },
  "core": true,
  "support": [
   "multiply-repeat",
   "times-ten",
   "divide-hundred"
  ]
 },
 "c6-product": {
  "id": "c6-product",
  "region": "mill",
  "title": "Dezimalfaktoren verstehen",
  "text": "Eine natürliche Zahl als Faktor kann die Zahl gleicher Gruppen beschreiben. Ein Faktor zwischen 0 und 1 nimmt nur einen Teil: 0,4 · 3 bedeutet vier Zehntel von 3. Bei positiven Faktoren kleiner als 1 wird der andere Faktor dadurch verkleinert. Ein Rechteckmodell erklärt Produkte; bei Längen mal Längen entsteht eine Fläche.",
  "example": {
   "prompt": "Eine Fläche ist 1,5 m lang und 0,4 m breit.",
   "steps": [
    "Zerlege die Länge: 1 m und 0,5 m.",
    "Die Teilflächen sind 0,4 m² und 0,2 m².",
    "Zusammen: 1,5 m · 0,4 m = 0,6 m²."
   ]
  },
  "core": true,
  "support": [
   "multiply-half",
   "rectangle"
  ]
 },
 "c6-multiply-written": {
  "id": "c6-multiply-written",
  "region": "mill",
  "title": "Schriftlich multiplizieren und das Komma begründen",
  "text": "Multipliziere zunächst wie mit natürlichen Zahlen und notiere die Teilprodukte stellenrichtig. Das Ergebnis erhält insgesamt so viele Nachkommastellen wie beide Faktoren zusammen. Begründung: Wer etwa beide Faktoren mit 100 vergrößert, vergrößert das Produkt mit 10 000. Rückgängig wird das durch Division durch 10 000.",
  "example": {
   "prompt": "Berechne 1,26 · 0,24.",
   "steps": [
    "126 · 4 = 504 und 126 · 20 = 2520; addiert: 3024.",
    "Beide Faktoren wurden je mit 100 vergrößert.",
    "3024 : 10 000 = 0,3024. Ein Überschlag 1,3 · 0,2 ≈ 0,26 passt zur Größenordnung."
   ]
  },
  "core": true,
  "support": [
   "multiply-decimal"
  ]
 },
 "c6-distribute": {
  "id": "c6-distribute",
  "region": "mill",
  "title": "Ein Produkt zerlegen",
  "text": "Ein Faktor darf als Summe oder Differenz zerlegt werden: a · (b + c) = a · b + a · c. Der andere Faktor gehört zu beiden Teilen. Das kann einfacher sein als schriftliches Rechnen. Bei positiven Zahlen verdoppelt sich das Produkt, wenn genau ein Faktor verdoppelt wird.",
  "example": {
   "prompt": "Berechne 7 · 1,98 geschickt.",
   "steps": [
    "Schreibe 1,98 als 2 − 0,02.",
    "7 · 2 − 7 · 0,02 = 14 − 0,14.",
    "Ergebnis: 13,86."
   ]
  },
  "core": true,
  "support": [
   "distribute"
  ]
 },
 "c6-divide-written": {
  "id": "c6-divide-written",
  "region": "cave",
  "title": "Schriftlich dividieren",
  "text": "Teile von links nach rechts. Jeder Quotientenziffer gehört die passende Stelle. Multipliziere zurück, ziehe ab und hole die nächste Ziffer herunter. Sobald im Dividend das Komma überschritten wird, setzt du es im Ergebnis. Reicht die Menge nicht, kann eine Null im Ergebnis nötig sein.",
  "example": {
   "prompt": "Berechne 12,48 : 4.",
   "steps": [
    "12 : 4 = 3; Rest 0. Setze danach das Komma.",
    "4 Zehntel : 4 = 1 Zehntel, Rest 0; dann 8 Hundertstel : 4 = 2 Hundertstel.",
    "12,48 : 4 = 3,12. Probe: 3,12 · 4 = 12,48."
   ]
  },
  "core": true,
  "support": [
   "divide-equal",
   "divide-proof"
  ]
 },
 "c6-divisor": {
  "id": "c6-divisor",
  "region": "cave",
  "title": "Durch eine Dezimalzahl teilen",
  "text": "Vergrößere Dividend und Divisor mit derselben Zehnerpotenz, bis der Divisor ganzzahlig ist. Der Quotient bleibt gleich. Beim Portionieren fragt die Division: Wie oft passt eine Portion in den Vorrat? Ein positiver Divisor kleiner als 1 kann zu einer größeren Maßzahl führen.",
  "example": {
   "prompt": "Berechne 5,46 : 0,6.",
   "steps": [
    "Multipliziere beide Zahlen mit 10: 54,6 : 6.",
    "54,6 : 6 = 9,1.",
    "Prüfe: 9,1 · 0,6 = 5,46."
   ]
  },
  "core": true,
  "support": [
   "portion-hundred",
   "divide-scale"
  ]
 },
 "c6-periodic": {
  "id": "c6-periodic",
  "region": "cave",
  "title": "Manche Dezimalbrüche enden nicht",
  "text": "Bei 1 : 4 endet die schriftliche Division: 0,25. Bei 1 : 3 kehrt derselbe Rest immer wieder; die Ziffer 3 wiederholt sich unbegrenzt: 0,333… . Das ist ein periodischer Dezimalbruch. 0,33 ist nur ein gerundeter Näherungswert, nicht genau 1/3. Weitere Periodentheorie ist hier nicht nötig.",
  "example": {
   "prompt": "Vergleiche 2/3 und 0,67.",
   "steps": [
    "2 : 3 ergibt 0,666…; die 6 wiederholt sich.",
    "Auf Hundertstel gerundet ergibt das 0,67.",
    "Also 2/3 ≈ 0,67, aber nicht 2/3 = 0,67."
   ]
  },
  "core": true,
  "support": [
   "fraction-meaning"
  ]
 },
 "c6-model": {
  "id": "c6-model",
  "region": "castle",
  "title": "Erst die Beziehung, dann die Rechnung",
  "text": "Kläre: Was ist gesucht? Welche Angaben brauche ich? Gleiche Gruppen sprechen für Multiplikation, Portionen oder gerechtes Verteilen für Division. Anfang, Verbrauch und Rest hängen durch Addition und Subtraktion zusammen. Nicht jede Zahl einer Geschichte muss verwendet werden.",
  "example": {
   "prompt": "Sechs Personen zahlen je 2,85 € Eintritt. Dazu kommen 4,20 € für die ganze Gruppe.",
   "steps": [
    "Der Eintritt sind sechs gleiche Beträge: 6 · 2,85 €.",
    "Die Gruppenpauschale wird einmal addiert.",
    "6 · 2,85 + 4,20 = 21,30 €."
   ]
  },
  "core": true,
  "support": [
   "model"
  ]
 },
 "c6-operations": {
  "id": "c6-operations",
  "region": "castle",
  "title": "Rechenreihenfolge und Ergebnis prüfen",
  "text": "Klammern zuerst, dann Multiplikation und Division vor Addition und Subtraktion. Gleichrangige Rechnungen werden von links nach rechts ausgeführt. Plane vor dem Rechnen einen Überschlag und prüfe danach Einheit, Größenordnung und Sachbedeutung.",
  "example": {
   "prompt": "Berechne (9,6 − 1,2) : 4 + 0,35.",
   "steps": [
    "Zuerst die Klammer: 8,4.",
    "Dann teilen: 8,4 : 4 = 2,1.",
    "Zuletzt addieren: 2,1 + 0,35 = 2,45."
   ]
  },
  "core": true,
  "support": [
   "operations"
  ]
 }
};
export const LAB_ALIASES = {
 "c6-place": "write-thousand",
 "c6-zeros": "equal-zeros",
 "c6-fractions": "fraction-quarter",
 "c6-compare": "compare-hundred",
 "c6-line": "line-fives",
 "c6-round": "round-carry",
 "c6-estimate": "estimate",
 "c6-units": "kg-grams",
 "c6-time": "time-hours",
 "c6-area": "square-units",
 "c6-volume": "cube-units",
 "c6-add": "add-carry",
 "c6-sum-smart": "add-group",
 "c6-sub": "subtract-whole",
 "c6-inverse": "missing-amount",
 "c6-scale": "times-hundred",
 "c6-product": "rectangle-decimal",
 "c6-multiply-written": "multiply-decimal",
 "c6-distribute": "multiply-distribute",
 "c6-divide-written": "divide-equal",
 "c6-divisor": "divide-scale",
 "c6-periodic": "fraction-third",
 "c6-model": "model",
 "c6-operations": "operations"
};
export const LEGACY_QUEST_MAP = {
 "v0a": "c6-v1",
 "v0b": "c6-v1",
 "v1": "c6-v1",
 "v0c": "c6-v1",
 "v2": "c6-v1",
 "v0d": "c6-v1",
 "v3": "c6-v3",
 "v4": "c6-v3",
 "f1": "c6-f1",
 "f2": "c6-f1",
 "f3": "c6-f3",
 "f4": "c6-f3",
 "h1": "c6-h1",
 "h2": "c6-h1",
 "h3": "c6-h1",
 "h4": "c6-h5",
 "h5": "c6-h5",
 "a1": "c6-a1",
 "a2": "c6-a1",
 "a3": "c6-a1",
 "a4": "c6-a4",
 "s1": "c6-s1",
 "s2": "c6-s1",
 "s3": "c6-s1",
 "s4": "c6-s4",
 "m1": "c6-m1",
 "m3": "c6-m1",
 "m2": "c6-m2",
 "m4": "c6-m2",
 "d1": "c6-d1",
 "d3": "c6-d1",
 "d2": "c6-d2",
 "d4": "c6-d2",
 "k1": "c6-k1",
 "k2": "c6-k1",
 "k3": "c6-k1",
 "k4": "c6-k4",
 "master-village": "c6-master-village",
 "master-forest": "c6-master-forest",
 "master-harbor": "c6-master-harbor",
 "master-market": "c6-master-market",
 "master-cliffs": "c6-master-cliffs",
 "master-mill": "c6-master-mill",
 "master-cave": "c6-master-cave",
 "master-castle": "c6-master-castle"
};

// Optional enrichment has its own justification; no new compulsory prerequisite.
for(const q of QUESTS.filter(q=>q.challenge)){q.goal='Transfer und Problemlösen: '+q.tasks.map(t=>t.purpose).join(' / ');q.why='Freiwillige Verknüpfung bekannter Kompetenzen: konstruieren, rückwärts denken, Grenzen oder Begründungen prüfen. Keine weitere Routine-Serie.';}

/** Finite, reviewed supplementary bank. No task here is a prerequisite or a core-quest completion. */
export const PRACTICE_BANK = Object.freeze([
  {
    "type": "number",
    "text": "Welchen Wert hat die Ziffer 6 in 4,62?",
    "answer": "0,6",
    "hint": "Die 6 steht unmittelbar rechts vom Komma.",
    "why": "Die 6 steht für sechs Zehntel.",
    "key": "v7:place:01",
    "practiceSkill": "place",
    "lesson": "c6-place",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Ziffernwert statt bloßem Ziffernnamen bestimmen.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Welchen Wert hat die Ziffer 8 in 12,084?",
    "answer": "0,08",
    "hint": "Unterscheide Ziffer und ihren Wert.",
    "why": "Die 8 steht an der Hundertstelstelle.",
    "key": "v7:place:02",
    "practiceSkill": "place",
    "lesson": "c6-place",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine innere Null bei der Positionsdeutung berücksichtigen.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Zerlege 24,306 in die fehlenden Stellenwerte.",
    "fields": [
      "Wert der 3",
      "Wert der 6"
    ],
    "answer": [
      "0,3",
      "0,006"
    ],
    "rows": [
      [
        "Wert der 3",
        {
          "field": 0
        }
      ],
      [
        "Wert der 6",
        {
          "field": 1
        }
      ]
    ],
    "hint": "Zehntel und Tausendstel sind unterschiedlich große Einheiten.",
    "why": "24,306 = 24 + 0,3 + 0,006.",
    "key": "v7:place:03",
    "practiceSkill": "place",
    "lesson": "c6-place",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Zahl additiv mit ausgelassenem Hundertstelwert zerlegen.",
    "level": "I"
  },
  {
    "type": "choice",
    "text": "Die 7 wandert von der Hundertstel- an die Zehntelstelle. Was passiert mit ihrem Wert?",
    "options": [
      "Er wird zehnmal so groß.",
      "Er wird zehnmal kleiner.",
      "Er bleibt 7.",
      "Er wird um 0,1 größer."
    ],
    "answer": 0,
    "hint": "Vergleiche 0,07 und 0,7.",
    "why": "0,7 = 10 · 0,07.",
    "key": "v7:place:04",
    "practiceSkill": "place",
    "lesson": "c6-place",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Zehnfache Wertänderung bei einem Stellenwechsel deuten.",
    "level": "II"
  },
  {
    "type": "number",
    "text": "Schreibe als Dezimalzahl: drei Ganze und vier Zehntel.",
    "answer": "3,4",
    "hint": "Die Zehntel sind die erste Stelle rechts vom Komma.",
    "why": "Drei Einer und vier Zehntel sind 3,4.",
    "key": "v7:reading:01",
    "practiceSkill": "reading",
    "lesson": "c6-place",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Sprachliche Zehntelangabe in Dezimalschreibweise übertragen.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Schreibe: zwei Ganze und sieben Tausendstel.",
    "answer": "2,007",
    "hint": "Welche Stellen bleiben zwischen Einern und Tausendsteln frei?",
    "why": "Zehntel und Hundertstel werden mit Nullen besetzt: 2,007.",
    "key": "v7:reading:02",
    "practiceSkill": "reading",
    "lesson": "c6-place",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Nicht genannte Zwischenstellen als Platzhalternullen schreiben.",
    "level": "I"
  },
  {
    "type": "choice",
    "text": "Welche Beschreibung passt zu 10,045?",
    "options": [
      "10 Ganze und 45 Zehntel",
      "10 Ganze und 45 Hundertstel",
      "10 Ganze und 45 Tausendstel",
      "1 Ganzes und 45 Tausendstel"
    ],
    "answer": 2,
    "hint": "Die letzte Ziffer steht an der Tausendstelstelle.",
    "why": "0,045 = 45/1000.",
    "key": "v7:reading:03",
    "practiceSkill": "reading",
    "lesson": "c6-place",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Zweistellige Ganzzahl und führende Nachkommanull gemeinsam lesen.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Ein Etikett nennt 103 Ganze, 2 Zehntel und 9 Tausendstel. Schreibe die Zahl.",
    "answer": "103,209",
    "hint": "Die Hundertstelstelle bleibt frei.",
    "why": "103 + 0,2 + 0,009 = 103,209.",
    "key": "v7:reading:04",
    "practiceSkill": "reading",
    "lesson": "c6-place",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine dreistellige Ganzzahl mit nicht benachbarten Dezimalstellen verbinden.",
    "level": "I"
  },
  {
    "type": "multi",
    "text": "Welche Zahlen sind genauso groß wie 0,6?",
    "options": [
      "0,60",
      "0,06",
      "0,600",
      "6,0"
    ],
    "answer": [
      0,
      2
    ],
    "hint": "Endnullen rechts verändern den Wert nicht.",
    "why": "0,6 = 0,60 = 0,600.",
    "key": "v7:zeros:01",
    "practiceSkill": "zeros",
    "lesson": "c6-zeros",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Angehängte Nullen als wertgleich erkennen, innere nicht.",
    "level": "I"
  },
  {
    "type": "choice",
    "text": "Welche Null darf in 4,070 gestrichen werden, ohne den Wert zu ändern?",
    "options": [
      "Die Null direkt nach dem Komma",
      "Nur die letzte Null",
      "Beide Nullen",
      "Keine Null"
    ],
    "answer": 1,
    "hint": "Beobachte, ob andere Ziffern ihren Platz wechseln.",
    "why": "4,070 = 4,07. Dagegen ist 4,70 zehnmal so viel im Nachkommateil.",
    "key": "v7:zeros:02",
    "practiceSkill": "zeros",
    "lesson": "c6-zeros",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Wertneutrale Endnull von Platzhalternullen unterscheiden.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Ergänze: 0,009 · 100 = □.",
    "answer": "0,9",
    "hint": "Die 9 erhält einen um zwei Stellen größeren Stellenwert.",
    "why": "Neun Tausendstel werden zu neun Zehnteln.",
    "key": "v7:zeros:03",
    "practiceSkill": "zeros",
    "lesson": "c6-zeros",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Führende Nachkommanullen beim Verhundertfachen richtig behandeln.",
    "level": "I",
    "oracle": {
      "op": "mul",
      "a": "0.009",
      "b": "100"
    }
  },
  {
    "type": "multi",
    "text": "Welche Zahlen sind gleich 12,040?",
    "options": [
      "12,04",
      "12,400",
      "12,0400",
      "12,004"
    ],
    "answer": [
      0,
      2
    ],
    "hint": "Innere Nullen halten Stellen frei.",
    "why": "12,04 und 12,0400 behalten die 4 als Hundertstel.",
    "key": "v7:zeros:04",
    "practiceSkill": "zeros",
    "lesson": "c6-zeros",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Wertgleiche Schreibweisen mit innerer und äußerer Null vergleichen.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Schreibe 7/10 als Dezimalzahl.",
    "answer": "0,7",
    "hint": "Der Nenner beschreibt zehn gleich große Teile.",
    "why": "7/10 sind sieben Zehntel.",
    "key": "v7:fractions:01",
    "practiceSkill": "fractions",
    "lesson": "c6-fractions",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Direkt zwischen Zehntelbruch und Dezimalzahl wechseln.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Schreibe 9/20 als Dezimalzahl.",
    "answer": "0,45",
    "hint": "Erweitere auf Hundertstel.",
    "why": "9/20 = 45/100 = 0,45.",
    "key": "v7:fractions:02",
    "practiceSkill": "fractions",
    "lesson": "c6-fractions",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Auf einen passenden Zehnerpotenznenner erweitern.",
    "level": "I",
    "oracle": {
      "op": "div",
      "a": "9",
      "b": "20"
    }
  },
  {
    "type": "choice",
    "text": "Welcher gekürzte Bruch ist gleich 0,125?",
    "options": [
      "1/125",
      "1/8",
      "1/4",
      "125/100"
    ],
    "answer": 1,
    "hint": "Kürze 125/1000.",
    "why": "125/1000 = 1/8.",
    "key": "v7:fractions:03",
    "practiceSkill": "fractions",
    "lesson": "c6-fractions",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Einen gekürzten Bruch einer endlichen Dezimalzahl zuordnen.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Ergänze die Darstellungen derselben Zahl.",
    "fields": [
      "Dezimalzahl zu 7/8",
      "Zähler von □/1000"
    ],
    "answer": [
      "0,875",
      "875"
    ],
    "rows": [
      [
        "Dezimalzahl zu 7/8",
        {
          "field": 0
        }
      ],
      [
        "Zähler von □/1000",
        {
          "field": 1
        }
      ]
    ],
    "hint": "Du kannst auf Tausendstel erweitern.",
    "why": "7/8 = 875/1000 = 0,875.",
    "key": "v7:fractions:04",
    "practiceSkill": "fractions",
    "lesson": "c6-fractions",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Bruch, Dezimalzahl und Tausendstelzählung verknüpfen.",
    "level": "II"
  },
  {
    "type": "choice",
    "text": "Welche Zahl ist größer?",
    "options": [
      "0,7",
      "0,65",
      "Beide gleich"
    ],
    "answer": 0,
    "hint": "Schreibe beide in Hundertsteln.",
    "why": "70 Hundertstel sind mehr als 65.",
    "key": "v7:compare:01",
    "practiceSkill": "compare",
    "lesson": "c6-compare",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Ungleiche Dezimalstellenanzahl beim Vergleich ignorieren lernen.",
    "level": "I"
  },
  {
    "type": "choice",
    "text": "Welche Zahl ist kleiner?",
    "options": [
      "3,081",
      "3,18",
      "Beide gleich"
    ],
    "answer": 0,
    "hint": "Vergleiche die erste unterschiedliche Stelle.",
    "why": "0 Zehntel sind weniger als 1 Zehntel.",
    "key": "v7:compare:02",
    "practiceSkill": "compare",
    "lesson": "c6-compare",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Nahe Zahlen mit verschiedenen Platzhalternullen vergleichen.",
    "level": "I"
  },
  {
    "type": "error",
    "text": "Finde die erste falsche Zeile des Vergleichs.",
    "steps": [
      "0,406 und 0,46 haben beide 4 Zehntel.",
      "406 > 46, deshalb ist 0,406 > 0,46.",
      "Die längere Ziffernfolge gewinnt."
    ],
    "answer": 1,
    "hint": "Die Nachkommaziffern sind keine abgetrennten ganzen Zahlen.",
    "why": "0,46 = 0,460; 406 Tausendstel sind weniger als 460.",
    "key": "v7:compare:03",
    "practiceSkill": "compare",
    "lesson": "c6-compare",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Die erste unzulässige Ganzzahlargumentation identifizieren.",
    "level": "II"
  },
  {
    "type": "multi",
    "text": "Welche Zahlen sind echt größer als 2,095?",
    "options": [
      "2,0950",
      "2,105",
      "2,1",
      "2,059"
    ],
    "answer": [
      1,
      2
    ],
    "hint": "Angehängte Nullen erzeugen keine größere Zahl.",
    "why": "2,105 und 2,100 sind größer als 2,095.",
    "key": "v7:compare:04",
    "practiceSkill": "compare",
    "lesson": "c6-compare",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Mehrere enge Zahlen und strikte Ungleichheit gleichzeitig prüfen.",
    "level": "II"
  },
  {
    "type": "order",
    "text": "Ordne aufsteigend.",
    "items": [
      "1,4",
      "1,04",
      "1,004",
      "1,44"
    ],
    "answer": [
      2,
      1,
      0,
      3
    ],
    "hint": "Ergänze bei Bedarf Endnullen.",
    "why": "1,004 < 1,04 < 1,4 < 1,44.",
    "key": "v7:order:01",
    "practiceSkill": "order",
    "lesson": "c6-compare",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Vier unterschiedliche Stellenwerte in eine Ordnung bringen.",
    "level": "I"
  },
  {
    "type": "order",
    "text": "Ordne diese Messwerte aufsteigend.",
    "items": [
      "12,304",
      "12,034",
      "12,34",
      "12,004"
    ],
    "answer": [
      3,
      1,
      0,
      2
    ],
    "hint": "Vergleiche Zehntel, dann Hundertstel.",
    "why": "12,004 < 12,034 < 12,304 < 12,34.",
    "key": "v7:order:02",
    "practiceSkill": "order",
    "lesson": "c6-compare",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Große Messwerte mit nahen Nachkommastellen ordnen.",
    "level": "I"
  },
  {
    "type": "choice",
    "text": "Welche Zahl passt in 2,07 < □ < 2,071?",
    "options": [
      "2,07",
      "2,0705",
      "2,075",
      "2,7"
    ],
    "answer": 1,
    "hint": "Die Lücke lässt sich in weitere Dezimalstellen unterteilen.",
    "why": "2,0700 < 2,0705 < 2,0710.",
    "key": "v7:order:03",
    "practiceSkill": "order",
    "lesson": "c6-compare",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Die Dichte der Zahlen in einem engen offenen Intervall nutzen.",
    "level": "II"
  },
  {
    "type": "order",
    "text": "Ordne aufsteigend; beginne mit der kleinsten Zahl.",
    "items": [
      "0,99",
      "1,001",
      "0,999",
      "1,01"
    ],
    "answer": [
      0,
      2,
      1,
      3
    ],
    "hint": "Vergleiche zuerst die Einer.",
    "why": "0,99 < 0,999 < 1,001 < 1,01.",
    "key": "v7:order:04",
    "practiceSkill": "order",
    "lesson": "c6-compare",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Ganze Anteile und nahe Dezimalanteile gemeinsam ordnen.",
    "level": "I"
  },
  {
    "type": "line",
    "text": "Markiere 1,7 auf dem Zahlenstrahl.",
    "start": 1,
    "end": 2,
    "step": 0.1,
    "answer": "1.7",
    "hint": "Bestimme zuerst, wie groß ein Abstand zwischen zwei Strichen ist.",
    "why": "Die passende Position ist 1,7. Die Teilintervalle sind gleich groß.",
    "key": "v7:line:01",
    "practiceSkill": "line",
    "lesson": "c6-line",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Unbeschriftete gleichmäßige Teilstriche von den Endwerten erschließen.",
    "level": "I"
  },
  {
    "type": "line",
    "text": "Markiere 2,04 auf dem Zahlenstrahl.",
    "start": 2,
    "end": 2.1,
    "step": 0.01,
    "answer": "2.04",
    "hint": "Bestimme zuerst, wie groß ein Abstand zwischen zwei Strichen ist.",
    "why": "Die passende Position ist 2,04. Die Teilintervalle sind gleich groß.",
    "key": "v7:line:02",
    "practiceSkill": "line",
    "lesson": "c6-line",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Auf einer verschobenen Skala Hundertstel lokalisieren.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Eine Strecke auf der Zahlengeraden beginnt bei 4,20 und endet bei 4,30. Zehn gleiche Abschnitte teilen sie. Wie groß ist ein Abschnitt?",
    "answer": "0,01",
    "hint": "Teile die Differenz der Endpunkte durch zehn.",
    "why": "(4,30 − 4,20) : 10 = 0,01.",
    "key": "v7:line:03",
    "practiceSkill": "line",
    "lesson": "c6-line",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Schrittweite aus Gesamtlänge und Teilanzahl berechnen.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Welche Zahl liegt genau in der Mitte zwischen 1,204 und 1,210?",
    "answer": "1,207",
    "hint": "Die Hälfte des Abstands ist 0,003.",
    "why": "1,204 + 0,003 = 1,207.",
    "key": "v7:line:04",
    "practiceSkill": "line",
    "lesson": "c6-line",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Mittelpunkt zweier Tausendstelzahlen ermitteln.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Runde 3,47 auf Zehntel.",
    "answer": "3,5",
    "hint": "Die Hundertstel entscheiden.",
    "why": "Die 7 ist mindestens 5; die Zehntel werden erhöht.",
    "key": "v7:round:01",
    "practiceSkill": "round",
    "lesson": "c6-round",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Direktes Runden auf die verlangte Stelle anwenden.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Runde 7,995 auf Hundertstel.",
    "answer": "8",
    "hint": "Vergiss den Übertrag über die 9 nicht.",
    "why": "7,995 wird zu 8,00.",
    "key": "v7:round:02",
    "practiceSkill": "round",
    "lesson": "c6-round",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Einen Rundungsübertrag bis in die Einerstelle verarbeiten.",
    "level": "I"
  },
  {
    "type": "choice",
    "text": "Welche Zahl wird beim direkten Runden auf Zehntel zu 2,4?",
    "options": [
      "2,349",
      "2,45",
      "2,405",
      "2,499"
    ],
    "answer": 2,
    "hint": "Der Bereich reicht von 2,35 bis unter 2,45.",
    "why": "2,405 liegt zwischen den Rundungsgrenzen.",
    "key": "v7:round:03",
    "practiceSkill": "round",
    "lesson": "c6-round",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine mögliche Ausgangszahl zu einem gerundeten Wert finden.",
    "level": "II"
  },
  {
    "type": "error",
    "text": "Wo ist der erste Fehler beim direkten Runden von 4,949 auf Zehntel?",
    "steps": [
      "Die Hundertstelziffer ist 4.",
      "Zuerst runde ich auf Hundertstel: 4,95.",
      "Dann auf Zehntel: 5,0."
    ],
    "answer": 1,
    "hint": "Direkt auf die verlangte Stelle runden, nicht mehrfach.",
    "why": "Die Hundertstelziffer 4 bleibt unter 5; direkt ergibt sich 4,9.",
    "key": "v7:round:04",
    "practiceSkill": "round",
    "lesson": "c6-round",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Fehler durch mehrfaches statt direktes Runden unterscheiden.",
    "level": "II"
  },
  {
    "type": "number",
    "text": "Überschlage 6,8 + 12,2, indem du beide Summanden zuerst auf ganze Zahlen rundest.",
    "answer": "19",
    "hint": "Runde beide Zahlen getrennt.",
    "why": "7 + 12 = 19.",
    "key": "v7:estimate:01",
    "practiceSkill": "estimate",
    "lesson": "c6-estimate",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Einen vorgegebenen Überschlag kontrolliert durchführen.",
    "level": "I"
  },
  {
    "type": "choice",
    "text": "Welche grobe Größenordnung passt zu 19,8 · 0,51?",
    "options": [
      "Etwa 1",
      "Etwa 10",
      "Etwa 100",
      "Etwa 1000"
    ],
    "answer": 1,
    "hint": "Denke an 20 · 0,5.",
    "why": "Die Hälfte von ungefähr 20 ist ungefähr 10.",
    "key": "v7:estimate:02",
    "practiceSkill": "estimate",
    "lesson": "c6-estimate",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Produktgröße bei Faktor knapp über einer Hälfte abschätzen.",
    "level": "I"
  },
  {
    "type": "choice",
    "text": "Ein Überschlag ergibt genau 15 kg bei einer Grenze von 15 kg. Was folgt?",
    "options": [
      "Die Last ist sicher erlaubt.",
      "Die Last ist sicher zu schwer.",
      "Die genaue Last muss geprüft werden."
    ],
    "answer": 2,
    "hint": "Ein Überschlag ist keine exakte Rechnung.",
    "why": "Die genaue Last kann knapp unter oder über 15 kg liegen.",
    "key": "v7:estimate:03",
    "practiceSkill": "estimate",
    "lesson": "c6-estimate",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Die Aussagegrenze eines Überschlags an einer exakten Grenze prüfen.",
    "level": "II"
  },
  {
    "type": "work",
    "text": "Prüfe 9,86 + 5,24: zuerst Überschlag auf ganze Zahlen, danach genau.",
    "fields": [
      "Überschlag",
      "Genaues Ergebnis"
    ],
    "answer": [
      "15",
      "15,10"
    ],
    "rows": [
      [
        "Überschlag",
        {
          "field": 0
        }
      ],
      [
        "Genaues Ergebnis",
        {
          "field": 1
        }
      ]
    ],
    "hint": "Runde erst beide Summanden, nicht das genaue Ergebnis.",
    "why": "10 + 5 = 15; genau 9,86 + 5,24 = 15,10.",
    "key": "v7:estimate:04",
    "practiceSkill": "estimate",
    "lesson": "c6-estimate",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Näherung und genaue Summe ausdrücklich nebeneinander bestimmen.",
    "level": "II"
  },
  {
    "type": "number",
    "text": "Wie viele Zentimeter sind 2,45 m?",
    "answer": "245",
    "hint": "1 m entspricht 100 cm.",
    "why": "2,45 · 100 = 245.",
    "key": "v7:units:01",
    "practiceSkill": "units",
    "lesson": "c6-units",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine Länge bei gleicher Größe in kleinerer Einheit schreiben.",
    "level": "I",
    "oracle": {
      "op": "mul",
      "a": "2.45",
      "b": "100"
    }
  },
  {
    "type": "choice",
    "text": "Welche Masse ist gleich 0,037 kg?",
    "options": [
      "3,7 g",
      "37 g",
      "370 g",
      "0,37 g"
    ],
    "answer": 1,
    "hint": "1 kg entspricht 1000 g.",
    "why": "0,037 · 1000 = 37 g.",
    "key": "v7:units:02",
    "practiceSkill": "units",
    "lesson": "c6-units",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Führende Nachkommanullen bei Kilogramm-Gramm berücksichtigen.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Wandle um.",
    "fields": [
      "Minuten in 1,25 h",
      "Quadratzentimeter in 0,04 m²"
    ],
    "answer": [
      "75",
      "400"
    ],
    "rows": [
      [
        "Minuten in 1,25 h",
        {
          "field": 0
        }
      ],
      [
        "Quadratzentimeter in 0,04 m²",
        {
          "field": 1
        }
      ]
    ],
    "hint": "Für Stunden ist der Faktor 60; für m² nach cm² ist er 10 000.",
    "why": "1,25 · 60 = 75 min; 0,04 · 10 000 = 400 cm².",
    "lesson": "c6-time",
    "key": "v7:units:03",
    "practiceSkill": "units",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Zeitfaktor 60 und Flächenfaktor 10000 unterscheiden.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Wie viele Liter sind 0,006 m³?",
    "answer": "6",
    "hint": "1 m³ entspricht 1000 l.",
    "why": "0,006 · 1000 = 6 l.",
    "key": "v7:units:04",
    "practiceSkill": "units",
    "lesson": "c6-units",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Kubikmeter mit Liter statt einer bloßen Zehnerstufe verknüpfen.",
    "level": "I",
    "oracle": {
      "op": "mul",
      "a": "0.006",
      "b": "1000"
    }
  },
  {
    "type": "number",
    "text": "Berechne 2,7 + 0,46.",
    "answer": "3,16",
    "hint": "Gleiche Stellen werden addiert.",
    "why": "2,70 + 0,46 = 3,16.",
    "key": "v7:add:01",
    "practiceSkill": "add",
    "lesson": "c6-add",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Unterschiedliche Nachkommastellen korrekt ausrichten.",
    "level": "I",
    "oracle": {
      "op": "add",
      "a": "2.7",
      "b": "0.46"
    }
  },
  {
    "type": "number",
    "text": "Berechne 14,008 + 2,97.",
    "answer": "16,978",
    "hint": "Ergänze Endnullen am kürzeren Summanden.",
    "why": "14,008 + 2,970 = 16,978.",
    "key": "v7:add:02",
    "practiceSkill": "add",
    "lesson": "c6-add",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Innere Nullen und Tausendstel beim Addieren behandeln.",
    "level": "I",
    "oracle": {
      "op": "add",
      "a": "14.008",
      "b": "2.97"
    }
  },
  {
    "type": "error",
    "text": "Finde die erste falsche Zeile.",
    "steps": [
      "3,7 + 0,48 = 3,70 + 0,48",
      "70 Hundertstel + 48 Hundertstel = 118 Hundertstel",
      "Also ist das Ergebnis 3,118."
    ],
    "answer": 2,
    "hint": "118 Hundertstel enthalten einen ganzen Einer.",
    "why": "3 + 1,18 = 4,18.",
    "key": "v7:add:03",
    "practiceSkill": "add",
    "lesson": "c6-add",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Fehlerhafte Stellenwertaddition im Rechenweg erkennen.",
    "level": "II"
  },
  {
    "type": "number",
    "text": "Rechne geschickt: 2,65 + 4,08 + 0,35.",
    "answer": "7,08",
    "hint": "Welche zwei Summanden ergeben eine ganze Zahl?",
    "why": "(2,65 + 0,35) + 4,08 = 7,08.",
    "key": "v7:add:04",
    "practiceSkill": "add",
    "lesson": "c6-add",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Geeignete Summanden gezielt zu einem Ganzen bündeln.",
    "level": "II"
  },
  {
    "type": "number",
    "text": "Berechne 4,8 − 0,65.",
    "answer": "4,15",
    "hint": "Schreibe 4,80.",
    "why": "4,80 − 0,65 = 4,15.",
    "key": "v7:sub:01",
    "practiceSkill": "sub",
    "lesson": "c6-sub",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Endnull ergänzen und über eine Dezimalstelle entbündeln.",
    "level": "I",
    "oracle": {
      "op": "sub",
      "a": "4.8",
      "b": "0.65"
    }
  },
  {
    "type": "number",
    "text": "Berechne 7,003 − 0,968.",
    "answer": "6,035",
    "hint": "Beim Entbündeln über Nullstellen den Gesamtwert erhalten.",
    "why": "7,003 − 0,968 = 6,035.",
    "key": "v7:sub:02",
    "practiceSkill": "sub",
    "lesson": "c6-sub",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Entbündeln über mehrere Nullstellen durchführen.",
    "level": "I",
    "oracle": {
      "op": "sub",
      "a": "7.003",
      "b": "0.968"
    }
  },
  {
    "type": "choice",
    "text": "Welche Probe prüft 6,02 − 0,78 = 5,24?",
    "options": [
      "5,24 − 0,78 = 6,02",
      "5,24 + 0,78 = 6,02",
      "6,02 + 0,78 = 5,24"
    ],
    "answer": 1,
    "hint": "Die Umkehrung der Subtraktion ist die Addition.",
    "why": "Rest plus Abzug ergibt wieder den Anfang.",
    "key": "v7:sub:03",
    "practiceSkill": "sub",
    "lesson": "c6-sub",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Die passende Umkehroperation als Probe auswählen.",
    "level": "II"
  },
  {
    "type": "number",
    "text": "Ein Seil ist 12,004 m lang. Nach dem Abschneiden von 2,86 m bleiben wie viele Meter?",
    "answer": "9,144",
    "hint": "Richte die Einheiten und Nachkommastellen aus.",
    "why": "12,004 − 2,860 = 9,144.",
    "key": "v7:sub:04",
    "practiceSkill": "sub",
    "lesson": "c6-sub",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine Längendifferenz mit ungleicher Stellenanzahl modellieren.",
    "level": "I",
    "oracle": {
      "op": "sub",
      "a": "12.004",
      "b": "2.86"
    }
  },
  {
    "type": "number",
    "text": "Berechne 6 · 0,45.",
    "answer": "2,7",
    "hint": "Sechs gleiche Mengen werden zusammengefasst.",
    "why": "6 · 45 Hundertstel = 270 Hundertstel = 2,70.",
    "key": "v7:mul:01",
    "practiceSkill": "mul",
    "lesson": "c6-product",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Wiederholte gleiche Dezimalmengen bestimmen.",
    "level": "I",
    "oracle": {
      "op": "mul",
      "a": "6",
      "b": "0.45"
    }
  },
  {
    "type": "number",
    "text": "Berechne 2,05 · 0,6.",
    "answer": "1,23",
    "hint": "205 · 6 = 1230. Beachte die Stellenwerte.",
    "why": "2,05 · 0,6 = 1,230.",
    "key": "v7:mul:02",
    "practiceSkill": "mul",
    "lesson": "c6-product",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Zwei Dezimalfaktoren einschließlich innerer Null multiplizieren.",
    "level": "I",
    "oracle": {
      "op": "mul",
      "a": "2.05",
      "b": "0.6"
    }
  },
  {
    "type": "choice",
    "text": "Für a > 0: Wie verändert sich a bei a · 0,75?",
    "options": [
      "Es wird größer.",
      "Es wird kleiner.",
      "Es bleibt gleich.",
      "Das hängt davon ab, ob a größer als 10 ist."
    ],
    "answer": 1,
    "hint": "0,75 liegt zwischen 0 und 1.",
    "why": "Drei Viertel einer positiven Menge sind weniger als die ganze Menge.",
    "key": "v7:mul:03",
    "practiceSkill": "mul",
    "lesson": "c6-product",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Die Wirkung eines Faktors zwischen null und eins begrifflich deuten.",
    "level": "II"
  },
  {
    "type": "number",
    "text": "Rechne geschickt: 8 · 1,98.",
    "answer": "15,84",
    "hint": "Nutze 1,98 = 2 − 0,02.",
    "why": "16 − 0,16 = 15,84.",
    "key": "v7:mul:04",
    "practiceSkill": "mul",
    "lesson": "c6-product",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine nahe ganze Zahl zum vorteilhaften Rechnen verwenden.",
    "level": "II",
    "oracle": {
      "op": "mul",
      "a": "8",
      "b": "1.98"
    }
  },
  {
    "type": "number",
    "text": "Berechne 3,6 : 4.",
    "answer": "0,9",
    "hint": "Nutze die Multiplikation als Probe.",
    "why": "4 · 0,9 = 3,6.",
    "key": "v7:div:01",
    "practiceSkill": "div",
    "lesson": "c6-divisor",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine Dezimalmenge auf eine natürliche Zahl verteilen.",
    "level": "I",
    "oracle": {
      "op": "div",
      "a": "3.6",
      "b": "4"
    }
  },
  {
    "type": "number",
    "text": "Berechne 0,96 : 0,08.",
    "answer": "12",
    "hint": "Verändere beide Zahlen mit demselben Faktor.",
    "why": "0,96 : 0,08 = 96 : 8 = 12.",
    "key": "v7:div:02",
    "practiceSkill": "div",
    "lesson": "c6-divisor",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Beide Operanden so verändern, dass ein natürlicher Teiler entsteht.",
    "level": "I",
    "oracle": {
      "op": "div",
      "a": "0.96",
      "b": "0.08"
    }
  },
  {
    "type": "error",
    "text": "Finde die erste falsche Zeile.",
    "steps": [
      "2,52 : 0,6",
      "Ich multipliziere nur den Teiler mit 10: 2,52 : 6.",
      "Das Ergebnis ist 0,42."
    ],
    "answer": 1,
    "hint": "Der Quotient bleibt nur bei gleichsinniger Veränderung beider Zahlen erhalten.",
    "why": "25,2 : 6 = 4,2.",
    "key": "v7:div:03",
    "practiceSkill": "div",
    "lesson": "c6-divisor",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Einseitiges Komma-Verschieben als unzulässig erkennen.",
    "level": "II"
  },
  {
    "type": "work",
    "text": "2,7 l werden in 0,22-l-Flaschen gefüllt.",
    "fields": [
      "Anzahl voller Flaschen",
      "Rest in Litern"
    ],
    "answer": [
      "12",
      "0,06"
    ],
    "rows": [
      [
        "Anzahl voller Flaschen",
        {
          "field": 0
        }
      ],
      [
        "Rest in Litern",
        {
          "field": 1
        }
      ]
    ],
    "hint": "Prüfe 12 und 13 Flaschen mit Multiplikation.",
    "why": "12 · 0,22 = 2,64 l; 0,06 l bleiben. 13 Flaschen brauchen 2,86 l.",
    "key": "v7:div:04",
    "practiceSkill": "div",
    "lesson": "c6-divisor",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Quotient im Sachkontext als volle Portionen und Rest interpretieren.",
    "level": "II"
  },
  {
    "type": "work",
    "text": "Schriftliche Addition: 5,86 + 2,79. Trage die Überträge an ihrer Zielstelle ein.",
    "fields": [
      "Übertrag zu den Zehnteln",
      "Übertrag zu den Einern",
      "Ergebnis"
    ],
    "answer": [
      "1",
      "1",
      "8,65"
    ],
    "rows": [
      [
        "Stelle",
        "E",
        "z",
        "h"
      ],
      [
        "Übertrag",
        {
          "field": 1
        },
        {
          "field": 0
        },
        ""
      ],
      [
        "",
        "5",
        "8",
        "6"
      ],
      [
        "+",
        "2",
        "7",
        "9"
      ],
      [
        "Ergebnis",
        {
          "field": 2
        }
      ]
    ],
    "hint": "Beginne rechts; zehn Hundertstel werden ein Zehntel.",
    "why": "6 + 9 = 15, also ein Übertrag. 8 + 7 + 1 = 16, also noch ein Übertrag. Ergebnis 8,65.",
    "key": "v7:written:01",
    "practiceSkill": "written",
    "lesson": "c6-add",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Überträge an den Zielstellen und das Ergebnis gemeinsam ergänzen.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Addiere 12,406 + 3,78 schriftlich: Ergänze zuerst den zweiten Summanden.",
    "fields": [
      "Zehntel",
      "Hundertstel",
      "Tausendstel",
      "Summe"
    ],
    "answer": [
      "7",
      "8",
      "0",
      "16,186"
    ],
    "rows": [
      [
        "",
        "E",
        "z",
        "h",
        "t"
      ],
      [
        "",
        "12",
        "4",
        "0",
        "6"
      ],
      [
        "+",
        "3",
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
        "=",
        {
          "field": 3
        }
      ]
    ],
    "hint": "Richte Komma unter Komma aus.",
    "why": "3,78 = 3,780; zusammen 16,186.",
    "key": "v7:written:02",
    "practiceSkill": "written",
    "lesson": "c6-add",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Den zweiten Summanden stellenrichtig mit Endnull schreiben.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Entbündele 6,003 für die Rechnung 6,003 − 0,875.",
    "fields": [
      "Einer nach allen Tauschen",
      "Zehntel",
      "Hundertstel",
      "Tausendstel",
      "Ergebnis"
    ],
    "answer": [
      "5",
      "9",
      "9",
      "13",
      "5,128"
    ],
    "rows": [
      [
        "Einer nach allen Tauschen",
        {
          "field": 0
        }
      ],
      [
        "Zehntel",
        {
          "field": 1
        }
      ],
      [
        "Hundertstel",
        {
          "field": 2
        }
      ],
      [
        "Tausendstel",
        {
          "field": 3
        }
      ],
      [
        "Ergebnis",
        {
          "field": 4
        }
      ]
    ],
    "hint": "Tausche schrittweise; der Wert von 6,003 bleibt erhalten.",
    "why": "5 Einer + 9 Zehntel + 9 Hundertstel + 13 Tausendstel = 6,003. Abziehen ergibt 5,128.",
    "lesson": "c6-sub",
    "key": "v7:written:03",
    "practiceSkill": "written",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Entbündeln über zwei Nullstellen als Tauschwerte darstellen.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Schriftlich: 4,02 − 0,67. Ergänze die Tauschwerte und das Ergebnis.",
    "fields": [
      "Einer nach dem Tauschen",
      "Zehntel",
      "Hundertstel",
      "Ergebnis"
    ],
    "answer": [
      "3",
      "9",
      "12",
      "3,35"
    ],
    "rows": [
      [
        "Einer nach dem Tauschen",
        {
          "field": 0
        }
      ],
      [
        "Zehntel",
        {
          "field": 1
        }
      ],
      [
        "Hundertstel",
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
    "hint": "Ein Einer wird zehn Zehntel; ein Zehntel wird zehn Hundertstel.",
    "why": "4,02 = 3 + 0,9 + 0,12; Rest 3,35.",
    "lesson": "c6-sub",
    "key": "v7:written:04",
    "practiceSkill": "written",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Tauschwerte und Differenz einer schriftlichen Subtraktion verknüpfen.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Multipliziere 1,36 · 0,24 mithilfe von 136 · 24.",
    "fields": [
      "Teilprodukt 136 · 4",
      "Versetztes Teilprodukt 136 · 20",
      "Natürliches Produkt",
      "Dezimalprodukt"
    ],
    "answer": [
      "544",
      "2720",
      "3264",
      "0,3264"
    ],
    "rows": [
      [
        "Teilprodukt 136 · 4",
        {
          "field": 0
        }
      ],
      [
        "Versetztes Teilprodukt 136 · 20",
        {
          "field": 1
        }
      ],
      [
        "Natürliches Produkt",
        {
          "field": 2
        }
      ],
      [
        "Dezimalprodukt",
        {
          "field": 3
        }
      ]
    ],
    "hint": "Beide Faktoren haben zwei Nachkommastellen.",
    "why": "544 + 2720 = 3264; das Dezimalprodukt hat hier vier Nachkommastellen.",
    "lesson": "c6-multiply-written",
    "key": "v7:written:05",
    "practiceSkill": "written",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Versetzte natürliche Teilprodukte und Dezimalergebnis unterscheiden.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Multipliziere 2,07 · 0,3 mithilfe von 207 · 3.",
    "fields": [
      "Übertrag zu den Zehnern der Hilfsrechnung",
      "Natürliches Produkt",
      "Dezimalprodukt"
    ],
    "answer": [
      "2",
      "621",
      "0,621"
    ],
    "rows": [
      [
        "Übertrag zu den Zehnern der Hilfsrechnung",
        {
          "field": 0
        }
      ],
      [
        "Natürliches Produkt",
        {
          "field": 1
        }
      ],
      [
        "Dezimalprodukt",
        {
          "field": 2
        }
      ]
    ],
    "hint": "3 · 7 = 21. Der Übertrag gehört in die nächste Spalte.",
    "why": "207 · 3 = 621; 2,07 · 0,3 = 0,621.",
    "lesson": "c6-multiply-written",
    "key": "v7:written:06",
    "practiceSkill": "written",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Multiplikationsübertrag und zwei verschiedene Kommastellenzahlen beachten.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Vervollständige 14,28 : 7.",
    "fields": [
      "Erste Quotientenziffer",
      "Quotientenziffer für die Zehntel",
      "Rest vor dem Herunterholen der 8",
      "Ganzes Ergebnis"
    ],
    "answer": [
      "2",
      "0",
      "2",
      "2,04"
    ],
    "rows": [
      [
        "Erste Quotientenziffer",
        {
          "field": 0
        }
      ],
      [
        "Quotientenziffer für die Zehntel",
        {
          "field": 1
        }
      ],
      [
        "Rest vor dem Herunterholen der 8",
        {
          "field": 2
        }
      ],
      [
        "Ganzes Ergebnis",
        {
          "field": 3
        }
      ]
    ],
    "hint": "Nach 14 : 7 bleiben 0 Einer. 2 Zehntel lassen sich noch nicht durch 7 teilen.",
    "why": "2 Zehntel geben die Quotientenziffer 0 und den Rest 2 Zehntel. 28 Hundertstel : 7 = 4 Hundertstel.",
    "lesson": "c6-divide-written",
    "key": "v7:written:07",
    "practiceSkill": "written",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine Null im Quotienten nicht unterschlagen und Reste beachten.",
    "level": "I"
  },
  {
    "type": "work",
    "text": "Rechne 5,616 : 1,2 mit ganzzahligem Teiler.",
    "fields": [
      "Neuer Dividend",
      "Neuer Teiler",
      "Quotient"
    ],
    "answer": [
      "56,16",
      "12",
      "4,68"
    ],
    "rows": [
      [
        "Neuer Dividend",
        {
          "field": 0
        }
      ],
      [
        "Neuer Teiler",
        {
          "field": 1
        }
      ],
      [
        "Quotient",
        {
          "field": 2
        }
      ]
    ],
    "hint": "Multipliziere beide Operanden mit 10.",
    "why": "56,16 : 12 = 4,68. Probe: 4,68 · 1,2 = 5,616.",
    "lesson": "c6-divisor",
    "key": "v7:written:08",
    "practiceSkill": "written",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Äquivalente Division und Endergebnis mit Dezimalteiler bestimmen.",
    "level": "I"
  },
  {
    "type": "number",
    "text": "Ergänze: 1,85 + □ = 4,20.",
    "answer": "2,35",
    "hint": "Welche Umkehrrechnung passt?",
    "why": "4,20 − 1,85 = 2,35.",
    "key": "v7:inverse:01",
    "practiceSkill": "inverse",
    "lesson": "c6-inverse",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine additive Lücke mit der Umkehroperation bestimmen.",
    "level": "I",
    "oracle": {
      "op": "sub",
      "a": "4.20",
      "b": "1.85"
    }
  },
  {
    "type": "number",
    "text": "Nach einer Entnahme von 2,675 l bleiben 6,4 l. Wie viel war zuvor da?",
    "answer": "9,075",
    "hint": "Die Entnahme muss zum Rest addiert werden.",
    "why": "6,4 + 2,675 = 9,075.",
    "key": "v7:inverse:02",
    "practiceSkill": "inverse",
    "lesson": "c6-inverse",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine Anfangsmenge aus Rest und Entnahme rekonstruieren.",
    "level": "II",
    "oracle": {
      "op": "add",
      "a": "6.4",
      "b": "2.675"
    }
  },
  {
    "type": "number",
    "text": "Ergänze: □ · 0,8 = 3,6.",
    "answer": "4,5",
    "hint": "Teile das Produkt durch den bekannten Faktor.",
    "why": "3,6 : 0,8 = 4,5.",
    "key": "v7:inverse:03",
    "practiceSkill": "inverse",
    "lesson": "c6-inverse",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Einen unbekannten Faktor bei einem Faktor kleiner eins berechnen.",
    "level": "II",
    "oracle": {
      "op": "div",
      "a": "3.6",
      "b": "0.8"
    }
  },
  {
    "type": "number",
    "text": "Eine Zahl wird durch 0,5 geteilt, danach werden 1,2 addiert. Das Ergebnis ist 6. Welche Zahl war es?",
    "answer": "2,4",
    "hint": "Mache zuerst das Addieren, dann das Teilen rückgängig.",
    "why": "(6 − 1,2) · 0,5 = 2,4.",
    "key": "v7:inverse:04",
    "practiceSkill": "inverse",
    "lesson": "c6-inverse",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Eine zweistufige Rechenkette in umgekehrter Reihenfolge auflösen.",
    "level": "II"
  },
  {
    "type": "choice",
    "text": "Kann 12,4 · 0,5 = 62 stimmen?",
    "options": [
      "Ja, Multiplizieren vergrößert.",
      "Nein, die Hälfte von 12,4 ist 6,2.",
      "Nein, das Ergebnis muss 0,62 sein."
    ],
    "answer": 1,
    "hint": "0,5 bedeutet die Hälfte.",
    "why": "6,2 ist halb so groß wie 12,4.",
    "key": "v7:plausible:01",
    "practiceSkill": "plausible",
    "lesson": "c6-estimate",
    "difficulty": 1,
    "stage": "practice",
    "introduce": false,
    "purpose": "Ein unmögliches Produkt ohne komplette Rechnung erkennen.",
    "level": "I"
  },
  {
    "type": "choice",
    "text": "Du brauchst 6,3 l und kaufst nur 1,5-l-Flaschen. Wie viele reichen mindestens?",
    "options": [
      "4",
      "4,2",
      "5",
      "6"
    ],
    "answer": 2,
    "hint": "Es können nur ganze Flaschen gekauft werden.",
    "why": "4 Flaschen enthalten 6 l; erst 5 enthalten genug.",
    "key": "v7:plausible:02",
    "practiceSkill": "plausible",
    "lesson": "c6-estimate",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Flaschenanzahl aufrunden, damit der Bedarf wirklich gedeckt wird.",
    "level": "II"
  },
  {
    "type": "multi",
    "text": "Welche Ergebnisse sind schon an ihrer Größenordnung erkennbar falsch?",
    "options": [
      "4,8 + 0,37 = 0,517",
      "5,02 − 0,78 = 4,24",
      "3,2 : 0,4 = 0,8",
      "0,6 · 0,3 = 0,18"
    ],
    "answer": [
      0,
      2
    ],
    "hint": "Eine positive Summe ist größer als jeder Summand; Teilen durch 0,4 vergrößert eine positive Zahl.",
    "why": "Die Summe ist 5,17, der Quotient ist 8.",
    "key": "v7:plausible:03",
    "practiceSkill": "plausible",
    "lesson": "c6-estimate",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Mehrere Ergebnisse anhand der Operationswirkung prüfen.",
    "level": "II"
  },
  {
    "type": "work",
    "text": "Ein 5-m-Band wird in Abschnitte zu je 0,65 m ohne Verschnitt geteilt.",
    "fields": [
      "Anzahl voller Abschnitte",
      "Rest in Metern"
    ],
    "answer": [
      "7",
      "0,45"
    ],
    "rows": [
      [
        "Anzahl voller Abschnitte",
        {
          "field": 0
        }
      ],
      [
        "Rest in Metern",
        {
          "field": 1
        }
      ]
    ],
    "hint": "Acht Abschnitte würden 5,2 m benötigen.",
    "why": "7 · 0,65 = 4,55 m; es bleiben 0,45 m.",
    "key": "v7:plausible:04",
    "practiceSkill": "plausible",
    "lesson": "c6-estimate",
    "difficulty": 2,
    "stage": "practice",
    "introduce": false,
    "purpose": "Maximal volle Längenstücke und verbleibende Länge gemeinsam bestimmen.",
    "level": "II"
  }
]);
export const practiceTask = key => PRACTICE_BANK.find(t=>t.key===key);

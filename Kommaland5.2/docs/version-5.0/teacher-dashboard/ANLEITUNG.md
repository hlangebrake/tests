# Lernblick für Lehrkräfte · Bedienung

## Drei Fragen

**Wo steht die Klasse?** Die Übersicht zeigt den mittleren regulären Questfortschritt,
Themenstand und die Zahl der beobachteten Lernenden. Herausforderungen zählen separat.

**Wo gibt es Schwierigkeiten?** Themenansicht und einzelne Wissensgedanken verdichten
Versuche, gelöste Aufgabenbearbeitungen, Hilfen und aktive Zeit. Ein Thema mit vielen
Fehlversuchen in der Klasse kann Anlass für eine gemeinsame Wiederaufnahme sein.

**Wo genauer hinschauen?** Hinweise führen zu einer Person und zeigen ihre konkreten
Beobachtungen. Die Anwendung stellt keine Diagnose und vergibt keine Leistungsnote.

## Dateien einlesen

Über „Lernstände importieren“ Dateien auswählen oder hineinziehen. Möglich sind
Einzel-JSON, Mehrfachauswahl und ZIP. Ordnerstrukturen innerhalb eines ZIP können
beliebig tief sein. ZIP in ZIP wird nicht entpackt. Bilder, Textdateien und versteckte
Metadaten werden ignoriert; ungültige JSON-Lernstände werden gesondert gemeldet.
Verschlüsselte, mehrteilige oder ZIP64-Archive sind nicht unterstützt.

Jede Datei wird geprüft. Der Bericht nennt ergänzt, vollständig vorhanden, ungültig
und ignoriert sowie die Anzahl neuer beziehungsweise schon vorhandener Ereignisse.
Eine ungültige Datei stoppt nicht die anderen Dateien. Bei einem Speicherfehler
erscheint eine Fehlermeldung; einzelne bereits abgeschlossene Dateiimporte bleiben
vorhanden. Es gibt keine globale Alles-oder-nichts-Transaktion für ein ganzes Klassen-ZIP.

Später einfach neuere Speicherstände derselben Personen importieren. `studentId`
identifiziert die Person; `eventId` identifiziert ein Ereignis. Alte Ereignisse werden
nicht erneut gezählt. Ein identischer Import bleibt für den Lernbestand wirkungslos,
erhält aber einen weiteren nachvollziehbaren Eintrag in der Importhistorie.
Widersprüchliche Daten mit derselben ID werden zurückgewiesen, nicht überschrieben.

Namen sind keine verlässlichen technischen Identifikatoren. Bei zwei gleichen Namen
mit unterschiedlichen IDs prüfen, ob zwei Personen oder zwei unabhängig gestartete
Spielstände vorliegen. Die App führt sie nicht automatisch zusammen. Ein Gerätewechsel
mit Import des bisherigen Schüler-Speicherstands behält die ID bei.

## Klassen und Personen

In einer Personenansicht „Identität & lokale Verwaltung“ öffnen und Klasse/Gruppe
(z. B. „6a“) zuordnen. Über den globalen Klassenfilter anschließend die Lerngruppe wählen.
Die Tabelle lässt sich nach Name, Fortschritt, Questzahl, Zurückstellungen, Fehlerquote,
Versuchen, Hilfen, aktiver Zeit, Challenges, letzter Aktivität und Hinweisen sortieren.
Eine Namenssuche und ein Hinweisfilter sind verfügbar. Der CSV-Export enthält die
gewählte Klasse und den globalen Zeitraum; lokale Namens-/Hinweisfilter der Tabelle
werden nicht auf den CSV-Export übertragen.

Ein Klick auf eine Person öffnet Überblick, Quests & Aufgaben, Zeitleiste und Sitzungen.
Aufgaben lassen sich auf bearbeitete, fehlerbehaftete oder mit Hilfen bearbeitete filtern.
Pro Aufgabe gibt es einzelne Durchläufe, Versuchszahlen, Ergebnis, aktive Zeit und
Hilfeepisoden mit Öffnen, Schließen und Dauer. Es werden keine getippten Antwortwerte
oder freien Schülertexte gespeichert.

## Was die Kennzahlen bedeuten

| Kennzahl | Definition |
|---|---|
| Questfortschritt | Abgeschlossene reguläre Quests / 37 reguläre Quests. Beim Klassenmittel werden nur zum Stichtag bekannte Lernstände berücksichtigt. |
| Bearbeitungsquote | Reguläre Quests mit einem begonnenen, abgeschlossenen oder ausdrücklich zurückgestellten Status / reguläre Quests. |
| Fehlerquote | Falsche Antwortversuche / alle Antwortversuche im gewählten Zeitraum. |
| Aufgaben gelöst | Aufgaben-Durchläufe mit richtiger Antwort im Zeitraum / Durchläufe mit mindestens einem Versuch im Zeitraum. |
| Ø Versuche | Versuche im Zeitraum / Aufgaben-Durchläufe mit einem Versuch im Zeitraum. |
| Hilfequote | Bearbeitete Durchläufe mit selbst gewählter Hilfe / Durchläufe mit Versuchen. Automatische Wissenseinführungen sind ausgeschlossen. |
| Für später | Anteil der Quests, die bis zum Stichtag mindestens einmal ausdrücklich zurückgestellt wurden; aktuell noch zurückgestellte Quests werden daneben angezeigt. |
| Aktive Zeit | Begrenzte, gemessene Vordergrundintervalle der bearbeiteten Aufgaben, einschließlich ihrer Wissens- und Hilfezeiten. Nicht verstrichene Uhrzeit. |
| Challenge-Status | Freigeschaltete, begonnene, abgeschlossene Meisterherausforderungen; nicht Teil der regulären Fehlerrate. |

Eine Wiederholung einer fertigen Quest ist ein neuer Durchlauf; mehrere Versuche in
diesem Durchlauf bleiben mehrere Versuche und werden nicht mit einer Wiederholung
verwechselt. Wegen der unterschiedlichen Aufgaben und Selbstregulation ist eine
Zeitmessung kein Geschwindigkeitsvergleich und keine Konzentrationsmessung.

Tipps, Beispiele, Lösungsschritte und bewusst geöffnetes Wissen werden unterschieden.
Ein bereits geöffneter Tipp, der nach einem Beispiel wieder sichtbar wird, erzeugt
eine neue Sichtbarkeitsepisode, aber **keine zusätzliche bewusste Tipp-Anforderung**.
Dessen aktive Sichtbarkeitszeit bleibt dennoch enthalten. Wenn mehrere Hilfeelemente
gleichzeitig sichtbar sind, können ihre Zeitanteile überlappen; sie nicht zu einer
Gesamtsitzungsdauer addieren.

Die Messung hält bei verborgenem Dokument an und spätestens 90 Sekunden nach der
letzten Interaktion. Sehr lange unbeobachtete Timer-Lücken werden verworfen. Lesen
auf Papier, Nachdenken ohne Interaktion, Zusammenarbeit, technische Unterbrechungen
oder ein vergessener offener Tab sind damit nicht zuverlässig unterscheidbar.

„Für später merken“ ist eine ausdrückliche Schülerentscheidung am Quest-Einstieg.
Ein Fenster zu schließen ist eine Unterbrechung; eine Vorwissenswarnung zu übergehen
ist ein gesondertes Ereignis. Beides wird nicht automatisch als Überspringen gezählt.
Die vorhandenen Spielfreischaltungen werden dadurch nicht verändert.

## Hinweise und Prioritäten

Alle Schwellen stehen zentral in `js/analytics.js → RULES` und werden in der Ansicht
„Daten & Einstellungen“ erläutert. Für Schwierigkeitshinweise sind mindestens acht
beobachtete Aufgaben-Durchläufe mit Antworten notwendig.

Beispiele: mindestens 40 % Fehlversuche **und** mindestens 2,2 Versuche im Mittel;
oder mindestens 50 % Hilfenutzung, weniger als 65 % gelöst **und** hohe Fehlerquote.
Häufige Hilfe allein führt nicht zu einem Schwierigkeitshinweis. Kleine Datenmengen
werden als solche ausgewiesen. Zeit allein löst nie eine Priorisierung aus.

Weitere Hinweise betreffen ausdrücklich zurückgestellte Inhalte, Erfolg nach mehreren
Versuchen mit Hilfe und zusätzliche Herausforderungen bei sehr sicheren regulären
Ergebnissen und bereits erfolgreicher Challenge. Auch das sind Gesprächsanlässe,
keine Aussagen über Intelligenz, Motivation, eine Diagnose oder dauerhaftes Können.

## Zeitliche Auswertung

„Letzter Datentag“, „Letzte Datenwoche“ oder Von/Bis setzen den Zeitfilter. Der Bezug
ist der letzte importierte Datentag, nicht zwingend das heutige Datum. Datumsangaben
werden in der lokalen Zeitzone angezeigt; Rohdateien enthalten UTC-Zeitstempel.

**Fortschritt** wird zum Ende des Zeitraums rekonstruiert. **Versuche und Hilfen** in
Übersichtskarten beziehen sich auf den ausgewählten Zeitraum. Die Detail-Listen von
Quests/Aufgaben zeigen die kumulierte Historie bis zu diesem Enddatum; die persönliche
Ereigniszeitleiste lässt sich zusätzlich auf den Zeitraum und Ereignisarten begrenzen.
Die Sitzungstabelle zeigt die vollständigen Sitzungen, die den Filter berühren.

Die Klassenkurve zeigt kumulierte Werte an beobachteten Aktivitätstagen bzw. Wochen.
Zeitpunkte können angeklickt und zwei frei gewählte Daten verglichen werden. Bei mehr
als 120 Aktivitätstagen wird die Kurve ausgedünnt, nicht der gespeicherte Ereignisbestand.
Unterschiedliche Anzahlen bereits beobachteter Personen können den Klassenmittelwert
verändern; die Zahl der beobachteten Personen steht deshalb dabei. Vor dem ersten
beobachteten Lernstand gibt es keinen erfundenen Nullstand. Bei alten Spielständen
beginnt die belastbare Verlaufshistorie erst mit dem Upgrade.

## Sichern und Löschen

„Gesamten Bestand sichern“ erstellt eine JSON-Sicherung mit Personen, Ereignissen,
Sitzungen, gespeicherten Zuständen, Klassenzuordnungen und Importhistorie. Wiederherstellung
über denselben Importdialog. Die Daten bleiben personenbezogen und unverschlüsselt.
Sicherungen geschützt ablegen. Die Anfrage „Dauerhaften Speicher anfragen“ ersetzt
keine Sicherung. Der Browser kann eine Zusicherung verweigern und die Nutzerin oder
der Nutzer kann Websitedaten weiterhin löschen.

Eine Person lässt sich einschließlich ihrer Ereignisse, Projektionen und zugehörigen
Importprotokolle löschen. Alternativ den ganzen aktiven Datenbestand löschen. Bereits
exportierte Dateien außerhalb des Browsers werden dadurch nicht entfernt.

## Technische Grenzen

Schülerdatei maximal 64 MiB, 250.000 Ereignisse und 20.000 Sitzungen pro Datei.
Lehrkräfte-Gesamtsicherung als einzelne JSON bis 256 MiB und zwei Millionen Ereignisse.
ZIP maximal 250 MiB, 5.000 Einträge und 512 MiB ausgewählte entpackte JSON-Daten;
ein einzelner ZIP-JSON-Eintrag maximal 64 MiB. Bibliothek: lokal mitgelieferte JSZip 3.10.1.

Die Beschränkungen verhindern unbegrenzte Entpacklasten, sind aber keine Zusicherung,
dass ein speicherarmes Gerät die Maximalgrößen komfortabel verarbeitet. Bei großen
Beständen kleinere Importpakete verwenden. Import und Auswertung laufen standardmäßig
in Modul-Workern, sofern der Browser diese unterstützt. Große Datentabellen sind paginiert.

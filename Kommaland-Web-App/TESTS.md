# Kommaland · Testprotokoll

**Stand: 9. September 2026 · Version 1.0.0**

## Ergebnis

20 automatisierte Node-Tests bestanden. Ein Browserdurchlauf hat alle 33 Quests mit insgesamt 99 richtigen Teilantworten über die Bedienelemente abgeschlossen. Zusätzlich wurde absichtlich eine falsche Antwort gegeben. Am Ende: 33 abgeschlossene Quests, 100 Versuche, 99 richtige Antworten, keine erfassten JavaScript-Laufzeitfehler und WebGL-Fehlerstatus 0.

Die Screenshots stammen aus der laufenden Anwendung, nicht aus einem vorgerenderten Entwurf.

## 1. Rechen- und Inhaltstests

Geprüft wurden die exakte Gleichwertigkeit von Dezimalkomma und Dezimalpunkt, angehängte Nullen, führende Nullen, ungültige Eingaben und der Verzicht auf eine Fließkomma-Toleranz. Alle sechs Antwortformate besitzen positive und negative Prüffälle.

Die Inhaltsprüfung kontrolliert 33 eindeutige Quest-IDs, 99 vollständige Aufgaben, 24 Wissensseiten, gültige Lösungsindizes, passende Zuordnungs- und Reihenfolgewerte sowie erreichbare Werte auf den Zahlengeraden. Der gesamte Freischaltungsgraph wird bis zum Finale durchlaufen. Waldbegegnungen dürfen nur bereits bearbeitete Themen verwenden.

Eine Prüfung gegen die hinterlegten Lösungsschlüssel ist kein unabhängiger fachdidaktischer Kompetenznachweis. Der vollständige Katalog liegt zur fachlichen Durchsicht in `AUFGABEN.md` vor.

## 2. Speicher- und Importtests

Versionierung, JSON-Rundreise, Position, Fortschritt, Einstellungen, Zurückweisung beschädigter/fremder Daten, Ausschluss beliebiger HTML-/Zusatzfelder, beschädigter Hauptstand, automatischer Snapshot und Rücksicherung vor einem Import wurden geprüft. Nicht verfügbarer Speicher darf das laufende Spiel nicht blockieren.

Im Browser wurden eine ungültige Importdatei ohne Überschreiben des Fortschritts, eine gültige Datei mit Bestätigungsdialog und anschließend die Wiederherstellung des vorherigen Stands geprüft. Beim Wechsel einer offenen Zahlenaufgabe zur Wissensseite und zurück blieb die eingegebene Antwort erhalten. Ein Wiederholungsdurchlauf beginnt als Übung und vergibt keine zweite Questbelohnung.

**Wichtig:** Wegen der isolierten Testumgebung wurde für die Browserprüfung `localStorage` durch einen speicherresidenten Ersatz mit derselben verwendeten Schnittstelle ersetzt. Die Persistenzlogik wurde außerdem mit getrennten Store-Instanzen getestet. Dauerhafte Speicherung durch echtes Safari, dessen Speicherbereinigung und der echte iPad-Dateidialog wurden nicht auf Hardware geprüft.

## 3. Welt und Navigation

41 interaktive Ziele: 33 Questobjekte und acht Infoschilder. Jedes Ziel erhielt einen gültigen Weg vom Dorf aus; jeder Weg endete außerhalb des Hindernisses und in Interaktionsreichweite. Anschließend wurde für **alle 41 Ziele die tatsächliche Laufphysik** schrittweise bis zur Ankunft simuliert.

Dabei gefundene Probleme an schmalen Übergängen zwischen Insel und Brücke wurden durch zusätzliche Navigationsabstände, Prüfung der Wegsegmente und begrenzte Bewegungsschritte korrigiert. Die endgültige Testsuite erreicht alle 41 Ziele ohne Hängenbleiben.

## 4. Browser und Layout

Getestet: Chromium 144, Linux mit virtuellem Bildschirm, WebGL-Rendering; emulierte Touch-Verfügbarkeit. Die Dateien wurden wegen der gesperrten Browsernavigation über einen lokalen Test-Harness in einen isolierten Dokumentkontext eingebracht. Dabei werden ES-Modul-Importe für den Test miteinander verbunden; der ausgelieferte App-Code bleibt modular. Es wurden keine Browser- oder Administrationsrichtlinien verändert.

| Ansicht in CSS-Pixeln | Lernlandkarte im Viewport | Kein horizontaler Überlauf | Primäre Aktion sichtbar |
|---|---|---|---|
| 1180 × 820 | ja | ja | ja |
| 1024 × 768 | ja | ja | ja |
| 768 × 1024 | ja | ja | ja |
| 820 × 1180 | ja | ja | ja |

Wissensrolle, Zahlentastatur, Fehlerrückmeldung, alle Antwortformate, Weltveränderungen, Finale, Karte, Rucksack, Import, Rücksicherung und überspringbare Begegnung wurden geöffnet beziehungsweise bedient. Die erste Quest wurde mit simulierten Zeigerklicks gespielt, weitere Antworten über die jeweiligen DOM-Bedienelemente ausgelöst. Das Modell der Spielfigur wurde zur verkürzten Prüfung weiterer Quests an das jeweilige Objekt versetzt; die Wege wurden separat vollständig getestet.

## 5. Offline-Dateien

Die Service-Worker-Logik wurde in einem isolierten JavaScript-Kontext geprüft: Alle 14 Cache-Einträge verweisen auf vorhandene Dateien. Unterverzeichnis und Querystring funktionieren im Cachemodell. Fremde Domains und Schreibanfragen werden nicht abgefangen.

**Nicht auf einem echten Browser-Ursprung geprüft:** Installation und Update des Service Workers, Offline-Neustart, Home-Bildschirm-Installation sowie Vollbild unter iPadOS. Der Service Worker ist implementiert; der tatsächliche Plattform-Lebenszyklus war in der abgeschotteten Umgebung nicht testbar. Vor einem Offline-Unterrichtseinsatz deshalb den folgenden Gerätetest durchführen.

## Empfohlener Abnahmetest auf dem Schul-iPad

1. App über HTTPS in Safari öffnen; ins Dorf starten, bewegen und das Infoschild lesen. Eine Quest mit falscher und richtiger Antwort bearbeiten.
2. App schließen und erneut öffnen. Erledigte Schritte und reparierte Objekte prüfen.
3. JSON exportieren, einen anderen Stand importieren und die eigene Sicherung wiederherstellen.
4. Zum Home-Bildschirm hinzufügen; Hoch-/Querformat, große Schrift und Touch-Steuerung prüfen.
5. Nach vollständig erfolgter Offline-Installation Flugmodus einschalten und die App neu starten. Danach den Flugmodus wieder ausschalten.

Ein reales iPad, echtes Safari, Apple Pencil, VoiceOver, Betriebssystem-Zoom und die dauerhafte Bildrate auf älteren Geräten wurden **nicht** getestet. Es wird keine vollständige Barrierefreiheits- oder Geräte-Zertifizierung behauptet.

## Tests erneut ausführen

Für die Node-Tests werden keine npm-Abhängigkeiten installiert:

```sh
cd kommaland
npm test
```

Alternativ: `node --test tests/*.test.js`. Dafür eine aktuelle Node-Version mit ES-Modulen und integriertem Test-Runner verwenden.

Die optionalen Browserprüfungen in `tests/browser_test.py` benötigen Python, Playwright und Chromium. Sie benutzen den beschriebenen isolierten Harness mit Ersatzspeicher. Unter Linux kann ein virtueller Bildschirm erforderlich sein, zum Beispiel:

```sh
xvfb-run -a python3 tests/browser_test.py
```

Der Browserpfad kann über `CHROMIUM_PATH` gesetzt werden. Ohne System-Chromium wird die von Playwright verwaltete Browserinstallation verwendet. Browser-Screenshots und Ergebnisdaten werden unter `test-artifacts/` abgelegt. Diese Testprogramme und ihre Werkzeuge werden **nicht** zum Hosten oder Spielen benötigt.

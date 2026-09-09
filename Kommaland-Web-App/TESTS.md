# Kommaland 4.0 · Testprotokoll

## Ergebnis und Umgebung

**70 automatisierte Node-Tests bestanden, keine fehlgeschlagen.** Die Browser-Suite hat alle **45 Quests mit 393 Teilaufgaben** über die tatsächlichen Antwortbedienelemente abgeschlossen. Die separate Wissensmodell-Suite prüfte **83 Karten, 230 Wertänderungen und 35 Layoutfälle**. In diesen Browser-Suiten wurden keine JavaScript-Seitenfehler protokolliert.

Verwendet wurden Node.js 22.16.0, Python 3.13.5, Playwright und Chromium 144.0.7559.96 auf Linux. WebGL läuft über SwiftShader im sichtbaren Browser unter Xvfb. Der Browser ist **kein Safari und kein physisches iPad**.

Die verwaltete Umgebung blockiert reguläre Browsernavigation zum lokalen HTTP-Testserver. Deshalb verwendet `tests/browser_harness.py` einen transparenten, lokalen Test-Harness: die tatsächlichen ES-Module werden in derselben Abhängigkeitsreihenfolge als lokale Modul-Funktionen geladen; HTML und CSS stammen aus den ausgelieferten Dateien. `localStorage` ist durch eine In-Memory-Map ersetzt. Es werden keine Zugriffsblockaden umgangen. Die App selbst wird als unveränderte statische ES-Modul-App ausgeliefert, nicht als dieser Test-Harness.

**Nicht geprüft:** echte HTTPS-Auslieferung, Safari-WebGL und iPad-Leistung, Browser-Neustart mit dauerhaftem localStorage, Home-Bildschirm-Installation, tatsächliche Service-Worker-Installation und Offline-Neustart. Ein JSON-Rundlauf im Harness ist kein Beweis dauerhafter Browserspeicherung.

## Reproduzierbare Ergebnisse

- `tests/node-results.txt`: vollständige Ausgabe der 70 Node-Tests.
- `tests/browser-v4-results.json`: Aufgaben-, Test-, Speicher- und Tablet-Layoutprüfungen.
- `tests/visual-browser-results.json`: alle 83 interaktiven Wissensmodelle, 230 Veränderungen und Layoutprüfungen.
- `tests/gate-audit.json`: zusätzliche Untersuchung aller 22 Richtungen auf Stopppunkt und mögliche seitliche Bodenwege.

Screenshots entstehen durch die Browser-Suiten in `test-artifacts/`. Die zusätzlich geprüften Biombilder sind Szenenvorschauen mit gezielt gesetztem abgeschlossenem Spielstand, kein separater Durchspielnachweis. Das Bild `meisterdorf.png` stammt dagegen aus dem vollständigen automatisierten Questdurchlauf.

## Node-Tests

Die bisherigen mathematischen, Schaubild-, Speicher-, Gelände- und Offline-Strukturtests wurden an Version 4 angepasst. Hinzu kommen Prüfungen für Lernfolgen, Testanforderungen, Herausforderungen und Kollisionen.

Es wird kontrolliert, dass alle 115 regulären Denkgruppen je drei Aufgaben enthalten und dass jede der 83 Wissens-IDs nahe, übertragende und eigenständige Prüfungsvarianten besitzt. 7470 erzeugte Instanzen (83 Gedanken × 3 Modi × 30 Startwerte) werden auf gültige Typen, auswählbare Schlüssel, eindeutige Optionen, passende Zahlenräume und akzeptierte Sollantworten geprüft. Diese Strukturprüfung ist nicht gleichbedeutend mit einer unabhängigen Herleitung jedes Antwortschlüssels.

Alle 22 initialen Wegtests decken ihr vollständiges Ausgangswissen und die jeweiligen Zielvoraussetzungen ab. Kein initialer Test ist eine Eins-zu-eins-Kopie einer regulären Übungsaufgabe. Das Ausgangssiegel verleiht kein ungeprüftes Zielwissen. Frühversuche, korrekt erhaltene Gedanken, Fehlerrunden, Testpausen, Wiederaufnahme und mindestens drei Aufgaben in neuen Zusatzprüfungen werden getestet.

Die 48 Meisteraufgaben werden erst nach allen regulären Quests des jeweiligen Gebiets freigeschaltet. 18 ihrer Rechenaufgaben werden zusätzlich aus den Sachangaben unabhängig nachgerechnet. Die Antwortprüfer weisen falsche Fehlerzeilen, falsche Argumentfolgen, doppelte oder außerhalb liegende Markierungen zurück. Äquivalente Dezimalschreibweisen werden exakt akzeptiert.

Die Navigation erreicht bei erfüllten Voraussetzungen alle 83 interaktiven Objekte. Auf allen 22 Richtungen hält die reale A*-Route mit der Bewegungs- und Kollisionslogik an der erwarteten Blockade. Eine zusätzliche Abtastung prüft mögliche Umgehungen im seitlichen Korridor; in den geprüften Stellen wurde kein begehbarer Bypass gefunden. Das ist eine gezielte Stichprobe und kein formaler Beweis für jedes mögliche Kontinuum von Laufbewegungen.

Öffnung und Verblassen der Blockaden werden bis zum einmaligen Abschluss-Callback geprüft. Unsichtbare Meisterkristalle blockieren zuvor keine Laufwege; nach Freischaltung und Abschluss sind Modelle und dauerhafte Dekorationen korrekt aktiv. Die alte Schema-2-Aufgabenposition wird auf die ergänzte Folge abgebildet, fertige Quests bleiben fertig, neue Prüfungsdaten werden validiert.

Die Service-Worker-Strukturprüfung kontrolliert 24 Cache-Einträge, vorhandene lokale Dateien, Installationspfadbindung und keine externen Laufzeit-Abhängigkeiten. Sie installiert nicht tatsächlich einen Service Worker im Browser.

## Browser: Aufgaben und Prüfungen

Der Durchlauf beginnt mit tatsächlicher Auswahl der Startschaltfläche. Geprüft werden stark gedämpfte künftige Questzeichen, zunächst unsichtbare Meisterquests und das ausdrückliche Übergehen einer normalen Vorwissenswarnung. Die Zuordnungsaufgabe wird mit Maus-Drag, einer über das Chromium-Protokoll emulierten Finger-Ziehbewegung und Tastatureingabe bearbeitet; ein Wechsel zu Wissen und Beispiel erhält den Zwischenstand.

Der frühe Dorf-Wald-Test enthält 19 Aufgaben und zeigt die Warnung zu acht noch offenen Dorfquests. Während der Bearbeitung fehlen Hilfe- und Lösungsbedienelemente. Die Suite gibt absichtlich eine falsche und 18 richtige Antworten ab: vor Ende der Runde erscheint keine Einzelrückmeldung. Danach bleibt genau ein Gedanke offen; die übrigen 18 werden erhalten. Eine Pause bewahrt den Testindex. Nach der Korrekturrunde wird das Siegel gespeichert und die Öffnungsanimation ausgelöst.

Im vollständigen Questdurchlauf werden die 393 Antworten über die echten DOM-Bedienelemente eingegeben und anschließend geprüft. Dies umfasst 240 Zahleneingaben, 64 Einfachauswahlen, 18 Mehrfachauswahlen, 12 Zuordnungen, 28 Fehlerzeilen, elf Argumentfolgen, acht Zahlengeraden, sechs Markieraufgaben und sechs Reihenfolgen. Die Lernkarten öffnen sich 115-mal vor einer Gruppe, nicht 345-mal vor jeder regulären Aufgabe.

Die Suite steuert die Questwahl über die vorhandene Debug-Schnittstelle und testet Aufgaben mit den hinterlegten Lösungen. Bauanimationen werden im langen Gesamtdurchlauf nach ihrem Start zeitlich beschleunigt; einzelne Toröffnungen werden gesondert getestet. Der Durchlauf ist deshalb kein unbeschleunigtes, manuelles Erwandern aller Wege und kein unabhängiger mathematischer Beweis aller Lösungen.

Die Zahlengerade zeigt nur zwei Zahlbeschriftungen; die laufende Ausgabe bleibt „Markierung gesetzt“ und verrät keinen Wert. Die Flächenmarkierung wird zusätzlich durch einen tatsächlichen emulierten Touch-Tap geprüft. Dabei wurde ein Fehler behoben, bei dem der anschließende Browser-Klick das eben markierte Feld wieder abwählte.

Ein lokaler JSON-Rundlauf erhält Quests, Siegel und Dekorationen. Drei komplexe Aufgabenformate werden bei 1024 × 768, 820 × 1180 und 768 × 1024 geprüft: kein horizontaler Überlauf, erreichbare Fußleiste innerhalb des Fensters.

## Browser: Wissensmodelle

Die separate Suite öffnet alle 83 Wissenskarten. Sie verändert 230 Werte, bedient Zahlengerade und Rechteckecke mit Pointer, färbt per Touch, bearbeitet zusammenhängende Felder und nutzt Tastatur sowie große ±-Tasten. Beim Wechsel Aufgabe → Wissen → Beispiel → Wissen → Aufgabe bleiben der Aufgabenzwischenstand und die vorübergehende Laboreinstellung erhalten.

35 Layoutfälle untersuchen mehrere Modellfamilien bei 1180 × 820, 1024 × 768, 820 × 1180, 768 × 1024 und 390 × 844. Das simuliert Fenstergrößen, nicht Hardwareleistung oder Safari-Eigenheiten.

## Erforderliche Abnahme auf einem Schul-iPad

Zunächst den bisherigen Stand exportieren, alle neuen Dateien unter derselben HTTPS-Adresse veröffentlichen und prüfen, dass im Rucksack „Kommaland 4.0“ steht. Eine frühe Stellenwertquest öffnen, Warnung übergehen, Bezeichnungen sowohl mit dem Finger ziehen als auch antippen und die Hilferücksprünge testen.

An einem Dorfausgang einen Test beginnen, eine falsche Antwort eingeben, pausieren, Safari vollständig schließen und den gespeicherten Test wieder öffnen. Nach Erfolg die Toranimation ansehen; einen zweiten Ausgang mit anderem Vorwissen prüfen. Exportieren und auf einem zweiten Gerät importieren, ohne den ursprünglichen Stand zu überschreiben.

Eine Region regulär fertigstellen, das Erscheinen des Meisterkristalls und die sechs Aufgaben prüfen. Nach Erfolg müssen Dekoration und zusätzliche Figuren auch nach einem echten App-Neustart sichtbar sein. Abschließend Home-Bildschirm-Start, Offline-Neustart nach abgeschlossener Installation, Hoch-/Querformat und Sparmodus prüfen. Erst diese Schritte nehmen die tatsächliche Geräteumgebung ab.

## Ausführen

```sh
npm test
xvfb-run -a python3 tests/browser_v4.py
xvfb-run -a python3 tests/visual_browser.py
```

Playwright, Chromium und Xvfb sind nur Testwerkzeuge. Die veröffentlichte App benötigt diese Programme nicht.

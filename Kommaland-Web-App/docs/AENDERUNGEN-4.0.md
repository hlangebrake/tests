# Änderungen in Kommaland 4.0.0

## Spielwelt

Zukünftige Questzeichen auf 13 % Deckkraft reduziert; nahe Zeichen bleiben interaktiv. Bei vielen Zeichen werden Überlagerungen priorisiert. Noch nicht freigeschaltete Meisterquests werden nicht als zukünftige Wegpunkte eingeblendet.

Elf Verbindungen enthalten nun 22 richtungsabhängige Ausgangsblockaden. Tore, Baumstämme, Felsen, Fracht, Karren, kleine Wegwächter und Runen passen zu den jeweiligen Landschaften. Laufziele und manuelle Bewegung halten davor an. Siegel eröffnen Wege mit einer Öffnungs- und Ausblendanimation.

Unterschiedliche lokale Wegführungen statt eines einheitlichen Radialschemas. Neue Modelle für Pferdeunterstände, Ponys, Rehe, Futterküche, Holzarbeit, Karren, Bienenstöcke mit fliegenden Bienen, Lager, Kristalle, Bewohner, Ziegen und kleine Drachen. Vorhandene kontinuierliche Landfläche und natürlichen Geländegrenzen bleiben erhalten.

Nach vollständigem Abschluss der regulären Quests erscheint pro Gebiet ein Meisterkristall. Sein Abschluss lässt das Gebiet dauerhaft aufblühen und fügt Blumen, Bewohner, Tiere und einen Himmelsbogen hinzu. Die bisherigen Bauanimationen bleiben bestehen.

## Lernen und Prüfen

115 Dreiergruppen mit je Nachvollziehen, Festigen und Weiterdenken statt dauerndem Wechsel zwischen einem Gedanken und einer einzigen Aufgabe. Die 37 regulären Quests umfassen nun 345 Aufgaben. Acht Meisterquests ergänzen 48 anspruchsvolle Aufgaben, insgesamt 393.

Normale Voraufgaben sind Empfehlungen mit ausdrücklich übergehbarer Warnung. Wegtests sind unabhängig davon: Sie prüfen Ausgangswissen plus fehlendes Zielvorwissen, auch bei offenen Quests. Ohne Hilfen und Lösungen, Bewertung erst am Rundenende, Fortsetzung nach Pause, richtige Nachweise bleiben für die Prüfung erhalten. Das vollständige Ausgangssiegel wird nicht durch bloßes Erledigen von Quests ersetzt.

Zusätzliche Zielanforderungen sind eigene Vorwissensbarrieren. So lässt ein über den Waldweg erworbenes Dorfsiegel unbekanntes Hafen- oder Mühlenvorwissen nicht automatisch passieren. Jede neue Zusatzprüfung umfasst mindestens drei Aufgaben; Fehlerrunden dürfen nur die verbleibenden Gedanken enthalten.

Neue Antwortformate für echtes Stellenwert-Drag-and-drop, Flächenmarkierung, Fehlerzeilen und Argumentationsketten mit unpassenden Karten. Auswahlantworten und Bezeichnungsablagen werden gemischt. Zahlengeraden zeigen nur Endpunktzahlen, keinen laufenden Markerwert.

Alle 83 interaktiven Wissenskarten und Beispiele bleiben eingebunden. Während Wegprüfungen sind sie nicht erreichbar. Aufgabenvarianten nutzen vorgegebene lokale Modelle und exakte Antwortprüfung, keine externe KI.

## Technik und Fehlerbehebungen

Dateiformat Schema 3; App-Version 4.0.0. Bestehende abgeschlossene Projekte bleiben erhalten. Offene Version-2/3-Teilschritte werden auf die erweiterten Reihenfolgen abgebildet; neue Übungsaufgaben bleiben gegebenenfalls offen. Gebietszertifikate, Kompetenzen und pausierte Tests werden exportiert/importiert.

Pointer-Drag-and-drop ergänzt um Antipp- und Tastaturbedienung. Touch-kompatible Nachklicks werden nicht mehr als zusätzliche Tastatureingabe fehlinterpretiert; dadurch wird eine eben markierte Zelle nicht sofort wieder abgewählt. Pointer-Abbruch setzt eine unbestätigte Malbewegung zurück.

Animationen verwenden verstrichene Zeit unabhängig vom für die Physik begrenzten Schritt. So verlängert geringe Bildrate die Öffnungsanimation nicht unverhältnismäßig. Inaktive Browserphasen verursachen keinen großen Bewegungssprung.

Service-Worker-Cache auf v4.0.0 angehoben; alle 17 JavaScript-Module lokal im Cache. Keine neuen Laufzeit-Abhängigkeiten. Die Dokumentationswerkzeuge erzeugen Aufgaben-, Wissens-, Lernweg- und Prüfungskataloge aus den tatsächlichen Inhalten.

## Abnahme

Siehe TESTS.md. Getestet wurden Node-Logik, Browser-DOM, WebGL-Darstellung und simulierte Touch-Eingaben. Eine physische iPad-/Safari-Abnahme einschließlich dauerhaftem localStorage und Offline-Neustart ist weiterhin offen.

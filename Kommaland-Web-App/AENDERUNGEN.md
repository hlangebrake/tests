# Kommaland 3.0.0 · Änderungen

## Interaktive Wissensseiten

83 ausdrückliche Zuordnungen zu 38 Modellfamilien statt überwiegend statischer Gleichungen. Pro Seite: kurze Erkundungsfrage, dynamische Zeichnung, Zahlen-/Einheitenanzeige, Begründung, bedienbare Größen und Zurücksetzen. Brüche werden bildlich und mit getrenntem Zähler/Nenner gezeigt; der Nenner ist in der Bruch-Erinnerung veränderbar. Kleine Flächen und Ziehpunkte haben zusätzlich Regler oder große Tasten.

Das Erkundungsmodell bleibt bei Hilfe-Abstechern innerhalb der Sitzung erhalten. Neue Seiten, Import/Rücksicherung oder ein neues Abenteuer beginnen mit einem frischen Erkundungszustand. Änderungen im Schaubild verändern keine Aufgabenantwort, keine Versuchszähler und keine Questfreigaben.

## Fachliche Korrekturen

Einheiten in Flächengleichungen und Sachbeispielen vervollständigt, tatsächliche Viertelblöcke im Hundertfeld, ausdrücklich vergrößerte Tausendstel-Lupe, exakte gemeinsame Skalen, Werterhaltung beim Bündeln/Entbündeln, getrennte Modelle für gerechtes Verteilen und Portionieren mit Rest, keine Verwechslung von Dezimalstunden und Minuten. Das Verdopplungsbeispiel zeigt zwei statt drei Geräte. Details in `MATHEMATIK-PRUEFUNG.md`.

## Unverändert und kompatibel

37 Quests, 122 Antwortschlüssel und deren Abhängigkeiten, 8 Landschaftsorte, Weltgeometrie und Aufbauanimationen. `content.js`, `state.js`, `world.js` und `terrain.js` sind bytegleich mit dem gelieferten Version-2-Paket. Schema 2 und lokaler Installationsschlüssel bleiben erhalten. Beim Versionswechsel von 2 auf 3 muss keine offene Aufgabe neu begonnen werden.

## Veröffentlichung

Alle Laufzeitdateien gemeinsam ersetzen. Die neuen Module `js/visuals.js` und `js/visual-models.js` werden durch Cache-Version `v3.0.0` mit gespeichert. Vor dem Update Spielstand exportieren. Kein Backend, CDN, Framework oder Build-Schritt hinzugefügt.

---

# Änderungen in Kommaland 2.0.0

## Landschaft

Eine zusammenhängende Landfläche ersetzt die acht runden Inseln. Acht verschieden geformte Lichtungen, geschwungene Wege, dichte Waldränder, Küste und Berge bilden die Lernlandschaft. Die Papierkarte zeigt dieselben Geländeformen. Hindernisse und Wege werden gemeinsam für Darstellung, Kollision und Wegsuche verwendet. Sämtliche 45 interaktiven Ziele bleiben vom Startdorf erreichbar.

## Didaktik

Vier zusätzliche Dorfprojekte trennen Hälfte, Zehntel, Hundertstel und Tausendstel. Der Einstieg beginnt mit der Mitte zwischen zwei ganzen Zahlen. Die Verbindung „Hälfte = fünf Zehntel“ wird erarbeitet, Brüche werden ausdrücklich erinnert. Einige bisherige Aufgaben erhalten weitere vorbereitende Teilschritte. Ergebnis: 37 Quests und 122 Aufgaben statt 33 und 99.

83 kurze Wissensschritte ersetzen die 24 allgemeinen Seiten. Jede Aufgabe verweist auf genau eine Karte und ein separates Beispiel. Vor dem Bearbeiten erscheint diese Karte automatisch. „Ein Beispiel lesen“ ergänzt „Wissen lesen“ und „Tipp“. Beispiele werden in drei Schritten aufgedeckt. Eingegebene Antworten bleiben bei Hilferücksprung erhalten.

Konkrete Voraufgaben ersetzen pauschale Freigaben. Reisesiegel hängen an den abschließenden Kernprojekten, nicht an zwei beliebigen Aufgaben. Zufallsbegegnungen verwenden nur Inhalte wirklich abgeschlossener Quests. Zeit-/Geldvertiefung und geometrische Einheiten sind explizite Zusatzwege zur Spielroute.

## Bauabschluss

Die letzte richtige Antwort markiert ein Projekt zunächst nur als bereit. Erst „Quest abschließen“ speichert den Bauabschluss, schließt die Rolle und startet die sichtbare Aufbauanimation am tatsächlichen Objekt. Eine reduzierte Bewegungsvariante bleibt verfügbar. Der Abschluss ist gegen einen Neustart während der Szene abgesichert.

## Spielstand und Update

Schema 2; kompatibler lokaler Installationsschlüssel. Alte fertige Bauwerke bleiben erhalten. Alte offene Teilaufgaben starten wegen geänderter Inhalte neu. Neu ergänzte Projekte bleiben offen. Ein Version-2-Stand kann auch einen noch unbestätigten Bauabschluss wiederherstellen. Vor dem Austausch der Laufzeitdateien einen JSON-Export anlegen. `js/lessons.js`, `js/terrain.js` und den aktualisierten Service Worker unbedingt mit veröffentlichen.

## Nachweise

Neue Quellen-/Aufgaben-Dokumentation, Voraussetzungenmatrix, automatisierte Tests zu Lernfolge, Migration, Landschaft und Aufbau sowie überarbeiteter Browser-Test. Details und Grenzen in `TESTS.md`. Keine durchgeführte physische iPad-/Safari-Abnahme und keine Erprobung mit einer Lerngruppe.

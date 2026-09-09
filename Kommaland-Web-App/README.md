# Kommaland
## Eine kleine 3D-Lernwelt für Dezimalzahlen

**Version 1.0.0 · 9. September 2026**

Eine statisch hostbare Web-App für das iPad: 8 Lernorte, 33 Quests, 99 feste Teilaufgaben, 24 kurze Wissensseiten und seltene, variierende Waldbegegnungen. Die komplette 3D-Welt entsteht aus lokal erzeugter WebGL-Geometrie. Keine Bibliothek, kein CDN, keine Anmeldung, kein Backend, keine Schriftdateien und kein Build-Schritt erforderlich.

### Sofort starten

Den gesamten Inhalt dieses Ordners auf einen statischen Webserver hochladen. **`index.html`, `styles.css`, `js/`, `icons/`, `sw.js` und `manifest.webmanifest` müssen zusammenbleiben.** Dann die Adresse des Ordners in Safari öffnen. Die App funktioniert auch in einem Unterverzeichnis, beispielsweise `/mathe/kommaland/`.

Für die Installation als Web-App und die Offline-Funktion HTTPS verwenden. Zum lokalen Entwickeln genügt ein lokaler Webserver:

```sh
cd kommaland
python3 -m http.server 8765
```

Am selben Computer anschließend `http://localhost:8765/` öffnen. Auf einem iPad ist `localhost` das iPad selbst, nicht der Entwicklungscomputer. Für den Unterricht deshalb die gehostete HTTPS-Adresse verwenden. Das bloße Öffnen der HTML-Datei aus einer ZIP oder der Dateien-App ist **nicht** der unterstützte Startweg; ES-Module brauchen eine passende Webserver-Auslieferung.

### Auf dem iPad

In Safari öffnen → Teilen → gegebenenfalls „Mehr“ → „Zum Home-Bildschirm“. Soweit angeboten, „Als Web-App öffnen“ aktivieren und die App vom Home-Bildschirm starten. Das ist der bevorzugte Weg ohne Browserleisten. Der Rucksack enthält zusätzlich einen Vollbildknopf; dessen Verfügbarkeit hängt vom Browser ab. [2][3]

Hoch- und Querformat sind vorgesehen. Der äußere Bildschirm scrollt nicht. Größere Schriftrollen und das Reisebuch dürfen **innerhalb** ihres Fensters scrollen. Browser-Zoomgesten werden durch Viewport-Einstellungen, Touch-Einstellungen und Safari-Gestenbehandlung unterdrückt; Betriebssystem-Bedienungshilfen lassen sich dadurch nicht zuverlässig ausschalten. Es gibt eine eigene Einstellung für größere Schrift. [6]

### Steuerung

- Links den Steuerkreis ziehen; alternativ auf eine begehbare Bodenfläche tippen. Die Figur sucht selbst einen Weg und umgeht Hindernisse.
- Ein Objekt in der Nähe erhält einen goldenen Ring und ein hervorgehobenes Schild. Direkt darauf tippen oder unten rechts öffnen. Ein weiter entferntes sichtbares Questzeichen setzt zunächst ein Laufziel; es öffnet die Quest erst bei Ankunft.
- Die Lernlandkarte zeigt alle Orte, Voraussetzungen und Aufgaben. Auch dort gesetzte Ziele werden **erlaufen**, nicht per Fernzugriff gelöst. Im Rucksack führt „Zurück nach Hause“ direkt ins Startdorf.
- Tastatur: Pfeile oder WASD bewegen, E / Leertaste interagieren, M öffnet die Karte, Esc schließt Fenster. Zahlen, Komma, Punkt, Rücktaste und Enter funktionieren zusätzlich zur Bildschirm-Zahlentastatur.

Das Spiel prüft Zahleneingaben exakt mit ganzzahligen Stellenwerten. `0,5`, `0.5` und `0,50` gelten als dieselbe Zahl; `0,05` nicht. Einheiten stehen schon am Eingabefeld. Rechenterme wie `1+2` sind keine zulässige Ergebniseingabe.

### Spielstand und Sicherungen

Der Fortschritt wird nach Antworten und wichtigen Aktionen, etwa alle zehn Sekunden und beim Verlassen/Hintergrundwechsel lokal gespeichert. Gespeichert werden Position, abgeschlossene Quests, bereits gelöste Schritte laufender Quests, Hilfen/Versuche, besuchte Orte und Einstellungen. Eine gerade erst eingetippte, **noch nicht geprüfte** Antwort wird nicht dauerhaft gesichert. Im offenen Spiel bleibt sie beim Wechsel zum Wissen erhalten.

Ein Gerätestand gehört zu einem Browserprofil, einer Website-Adresse und einem Installations-Unterordner. Es gibt keine automatische Gerätesynchronisation und keine Benutzerkonten. Bei gemeinsam genutzten iPads muss vor einem Personenwechsel exportiert und der persönliche Stand wieder importiert werden. Gelöschte Websitedaten, private Sitzungen und Speicherbereinigung können Daten entfernen. Auch Safari und eine Home-Bildschirm-Installation können je nach System getrennte Speicherbereiche haben: vor einem Wechsel exportieren. [4]

**Export:** Rucksack → „Spielstand exportieren“. Es entsteht eine JSON-Datei wie `Kommaland-2026-09-09-14-30.json`; auf dem iPad gegebenenfalls in „Dateien“ sichern.

**Import:** Rucksack → „Spielstand importieren“ → Datei wählen → Zusammenfassung prüfen → Laden bestätigen. Ungültiges JSON, fremde Formate, unbekannte Quest-IDs, ungültige Positionen und Dateien über 1 MB werden vor dem Ersetzen zurückgewiesen. Importierte Freitexte werden nicht als HTML übernommen.

Vor einem Import oder Neustart bleibt eine separate lokale Rücksicherung erhalten. „Vorherigen Stand laden“ holt sie zurück. Zusätzlich wird automatisch ein letzter gültiger Snapshot geführt. Diese lokalen Kopien ersetzen keinen regelmäßigen Dateiexport.

### Offline

Der Service Worker legt alle zum Spielen nötigen Dateien in einem Cache dieses Installationsordners ab. Einmal online über HTTPS vollständig öffnen; der Rucksack meldet anschließend, dass die Offline-Dateien bereit sind. Danach ist das Spiel ohne weitere Netzabrufe seiner bereits gespeicherten Dateien vorgesehen. Service Worker benötigen einen sicheren Kontext; `localhost` ist für Entwicklung eine Ausnahme. [5]

Das tatsächliche Cache-Verhalten, Speicherbereinigung und Starten ohne Netz sollten vor einer Unterrichtsstunde auf dem eingesetzten iPad geprüft werden. Die App lädt keine externen Assets. Der Webserver kann beim ersten Abruf dennoch übliche Zugriffslogs führen; **Spielstände werden von der App nicht hochgeladen**.

Bei Änderungen an App-Dateien die Versionskennung `v1.0.0` in `sw.js` erhöhen und alle Dateien gemeinsam hochladen. Sonst kann der bestehende Offline-Cache ältere Dateien ausliefern. Eine Installation nach einem Versionswechsel neu öffnen beziehungsweise einmal neu laden. Die Speicherschemaversion in `js/state.js` nicht ohne Migration ändern.

### Lerninhalt

Das Lernkonzept, die Freischaltlogik und die Einordnung in Niedersachsen stehen in **DIDAKTIK.md**. **AUFGABEN.md** enthält den vollständigen Questkatalog mit Lösungen und Hilfen zur redaktionellen Kontrolle.

Die Vorgaben werden im Kerncurriculum für den **Doppelschuljahrgang 5/6** formuliert. Die Zuordnung zur Klasse 6 und die konkrete Reihenfolge hier sind eine begründete Unterrichtsentscheidung, keine staatlich vorgeschriebene Spielroute. [1]

### Dateien bearbeiten

| Datei | Aufgabe |
|---|---|
| `index.html` | Ein Bildschirm, Welt-Canvas, Bedienung, Dialogcontainer |
| `styles.css` | iPad-Oberfläche, Schriftrollen, Touch-Ziele, Hoch-/Querformat |
| `js/app.js` | Spielablauf, Eingaben, Dialoge, Quiz, Speichern, Import/Export |
| `js/content.js` | Orte, Aufgaben, kurze Erklärungen und Freischaltungen |
| `js/world.js` | Häuser, Bäume, Figuren, Gelände, Wege, Navigation und Umbauten |
| `js/engine.js` | Kleiner eigener WebGL-Renderer mit orthografischer Kamera |
| `js/math.js` | Exakte Prüfung der sechs Antwortformate |
| `js/state.js` | Versioniertes Speicherformat, Validierung, Rücksicherungen |
| `js/ui.js` | Lokale SVG-Symbole und mathematische Veranschaulichungen |
| `sw.js`, `manifest.webmanifest`, `icons/` | Offline- und Home-Bildschirm-Unterstützung |
| `tests/` | Automatisierte Prüfungen, nicht für den Spielbetrieb erforderlich |

Bestehende Quest-IDs nicht umbenennen, wenn alte Spielstände weiterverwendet werden sollen. Beim Hinzufügen von Quests die Gesamtanzeige in `index.html` und `app.js`, die Aufgabenanzahlen in der Oberfläche sowie die Tests aktualisieren. Antwortoptionen und Lösungsindizes stehen gemeinsam in `content.js`.

### Qualität und Grenzen

**TESTS.md** nennt die tatsächlich ausgeführten Tests und ihre Grenzen. Kein Test auf einem physischen iPad wurde durchgeführt. Es gibt keinen Nachweis einer bestimmten Bildrate auf älteren Geräten. Für leistungsschwächere Geräte stehen Sparmodus und reduzierte Bewegung bereit. WebGL muss verfügbar sein; eine zweidimensionale Ersatzwelt ist nicht enthalten.

Das ist eine Lern- und Übungsapp, **kein manipulationssicheres Prüfungssystem**. Lösungsschlüssel liegen bei einer vollständig statischen App notwendigerweise auf dem Gerät. Die App bewertet Ergebnisse, Entscheidungen und ausgewählte Begründungen; sie analysiert weder handschriftliche Rechenwege noch freie mündliche oder schriftliche Argumentationen. Hinweise dürfen ausdrücklich genutzt werden.

Es gibt keine wörtlichen Buch- oder Verlagsaufgaben, keine fremden Spielgrafiken und keine eingebundenen Minecraft-Assets. Alle Quests und die prozedurale Gestaltung wurden für dieses Projekt angelegt.

### Quellen und technische Referenzen

Abgerufen am 9. September 2026. Die Quellen begründen den curricularen Rahmen und Browserbedingungen, nicht eine Geräte-Zertifizierung der App.

[1] Niedersächsisches Kultusministerium, *Kerncurriculum Gymnasium Schuljahrgänge 5–10: Mathematik*, 2015, insbesondere S. 33 und 41, Lernbereich „Umgang mit Dezimalzahlen“: https://cuvo.nibis.de/index.php?p=download&upload=63

[2] Apple, *Bookmark a website in Safari on iPad*, Abschnitt Home Screen: https://support.apple.com/guide/ipad/bookmark-favorite-webpages-ipadc602b75b/ipados

[3] MDN, `Element.requestFullscreen()`: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen

[4] MDN, `Window.localStorage`: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

[5] MDN, *Service Worker API*: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

[6] MDN, `touch-action`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action

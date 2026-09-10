# Lehrkräfte-Anleitung · Kommaland 7.1

> **Release 7.2:** Dashboardlogik und Austauschschema 5 bleiben gegenüber 7.1 unverändert. Schüleroberflächen sind neu priorisiert; tatsächliche Niveau-, Hilfe- und Aufgabenereignisse werden weiter identisch verarbeitet.


## Import und lokale Daten

Über „Lernstände importieren“ eine oder mehrere JSON-Dateien oder ZIP wählen. Unterordner in ZIP werden durchsucht; irrelevante Dateien werden ignoriert, ungültige Dateien berichtet. Import ist lokal; es findet kein Schüler-Upload statt. Gleiche `studentId` und gleiche `eventId` werden nicht doppelt gezählt. Gleicher Name bei anderer ID bleibt eine andere Person. Importe werden separat protokolliert; dies sind keine zusätzlichen Lernversuche.

Sitzungen, Ereignisse, Lernstände und Importhistorie liegen in IndexedDB. Bei einem neuen Browser oder einer anderen Domain ist das kein identischer Datenbestand. In „Daten & Einstellungen“ regelmäßig Gesamtsicherung exportieren. Klassenangaben lassen sich pro Person verwalten. Dateien und Datenbank sind nicht durch die App verschlüsselt; Datenschutzdokument beachten.

## Bestehende Übersichten

Klasse, Lernende, Themen, priorisierte Beobachtungen, Selbstregulationsverlauf und Zeitansichten bleiben erhalten. Quoten der regulären Aufgaben beziehen sich weiterhin auf 16 Quests und 77 Aufgaben. Challenges bleiben separat. Aufgabenhistorie, Versuchszahl, Hilfen und aktive Dauer lassen sich einzeln ansehen. Fortschritt ist der kumulierte Stand am Filterende; Versuche/Hilfen sind Daten aus dem gewählten Zeitraum. Leere Vorgeschichte ist unbekannt, nicht null Fehler bei sicherer Beherrschung.

## Neu: Fachlicher Blick

Der neue Navigationspunkt enthält drei Ebenen: Personen mit einer Fehlerhäufung, aufklappbare fachliche Gesprächskarten und eine getrennte Übersicht über ergänzende Lernaktivitäten. Alle 17 Karten lassen sich auch ohne automatischen Anlass bewusst öffnen.

Pro Person erscheint das Register „Fachlicher Blick“. Dort stehen Ziele/Selbsteinschätzungen, finite Zusatzrunden mit Versuchen und Hilfen, Entscheidungen zu zusätzlichen Übungen sowie offene Texte, Selbstkontrolle und Gesprächsstatus. Texte werden nicht automatisch beurteilt; ein Status „mit Partner besprochen“ stammt von der lernenden Person. Kein Partnername wird gespeichert.

Eine beendete Zusatzrunde kann übersprungene Aufgaben enthalten. Sie vergrößert weder reguläre Questzahl noch Kernfortschritt und erzeugt keine Note. Eigene Notizen sind freiwillig, bis 1200 Zeichen und nur als Text angezeigt. Fehlende Notiz schließt Papier-/mündliche Bearbeitung nicht aus.

## Fachdiagnostischer Gebrauch

„Diagnoseanlass“ heißt: Hier lohnt sich ein Gespräch. Auslöser sind zunächst mindestens drei Fehlversuche zu einem Gedanken im gewählten Zeitraum. Nach Klick stehen eine **mögliche**, nicht festgestellte Fehlvorstellung, zwei passende Diagnosefragen und ein Beobachtungsschwerpunkt bereit. Fehler können ebenso durch Lesefehler, Bedienung oder Unachtsamkeit entstehen.

Wegproben liefern nur „in einer Stichprobe richtig“. Zwei verschiedene erfolgreiche reguläre Aufgaben erlauben „mehrfach gezeigt“, ein Abstand von mindestens sieben Tagen zusätzlich „erneut nach Abstand“. Die Labels sind keine vollständige Kompetenzdiagnose und kein Versprechen stabiler Beherrschung. Hilfen, Lösungswege und Umstände prüfen. Fehlende Daten bleiben unbekannt. Schwellen: `shared/learning7.js`, allgemeine Priorisierung: `js/analytics.js`, jeweils zentral und anpassbar.

## Selbsteinschätzungen

Neue Zieleinschätzungen besitzen vier verbale Kategorien. Der historische Selbstregulationsverlauf verwendet aus Kompatibilitätsgründen weiter die alte Skala 1–5; neue Planangaben werden dort auf 1,2,4,5 abgebildet. Für die neue Vierfachdarstellung das Register „Fachlicher Blick“ verwenden; beide Skalen nicht ohne Erklärung zu einer einzigen Zahl zusammenfassen.

## Unterrichtlicher nächster Schritt

Eine beobachtete Häufung auswählen, die zugehörige Aufgabe und Hilfen ansehen, dann eine Diagnosefrage mündlich stellen und die Erklärung aufnehmen. Erst daraus eine Unterstützung entscheiden: andere Darstellung, gezielte kurze Übung, erneutes schriftliches Verfahren, Partnergespräch oder freiwillige Vertiefung. Die App übernimmt diesen fachdiagnostischen Schluss nicht.

## Geräteprüfung

Dashboard online starten, eine synthetische Datei importieren, Browser schließen/erneut öffnen, Datenbestand prüfen, Sicherung exportieren und wiederherstellen, doppelt importieren, Offline-Start prüfen. Reales Safari/iPad und native Browserspeicherung sind in der Entwicklungsumgebung nicht geprüft; technische Testgrenzen stehen in der Projektdatei TESTS.md.

## Neu: Niveau-Lernspuren (7.1)

Unter „Fachlicher Blick“ liegt eine eingeklappte Niveauübersicht, zusätzlich in der Einzelansicht. Pro Quest: letzte ausdrücklich dokumentierte Wahl, tatsächliche Bearbeitungen je Niveau, Erstlösungen, bewusste Hilfen, angenommene/abgelehnte Angebote und eigene Änderungen. Beobachtungen gehören zu Aufgabensituationen, nicht zu einem festen Schülerniveau. Keine Rangliste oder Benotung.

Für Bearbeitungen, die im Datumsfenster aktiv waren, zeigt diese Ansicht den vollständigen Verlauf bis zum Endstichtag. Entscheidungsereignisse sind exakt nach ihrem Datum gefiltert. Die letzte dokumentierte Wahl wird bis zum Stichtag berücksichtigt. „Direkt richtig“ setzt einen tatsächlich ersten richtigen Versuch voraus. Bei alten Aufgaben ohne Variantenmetadaten steht „Niveau nicht dokumentiert“, nicht nachträglich Niveau 2.

Bei mindestens drei N3-Bearbeitungen mit mehreren bewussten Hilfeöffnungen gibt es einen vorsichtigen Gesprächsanlass: „Woran entscheidest du, welches Niveau gerade gut passt?“ Hilfe allein wird nicht als Überforderung interpretiert. Details zu Auswahlregeln und Feldern: `shared/difficulty.js` und die mitgelieferte Schülerdokumentation `NIVEAUS.md` im Gesamtpaket.

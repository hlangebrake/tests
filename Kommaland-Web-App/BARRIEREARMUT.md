# Barrierearmut · Kommaland 7.2

Neu: Help-Button mit `aria-expanded` und `aria-controls`, natives Details/Summary für Kriterien und Erklärungen, Escape schließt zuerst das Help-Panel und erhält Aufgabe/Eingabe. Der Modalfokus umfasst nur sichtbare Bedienelemente. Enter/Space auf Controls schickt keine zweite Antwort ab. Fortschrittspunkte tragen einen zugänglichen Zähler; der Titel bleibt per `aria-labelledby` mit dem Dialog verbunden.

Toröffnung und stille Erfolgszustände werden über `#worldStatus` (`role=status`, `aria-live=polite`, `aria-atomic=true`) außerhalb des inerten Weltbereichs angekündigt. Das ist kein visuelles Popup und verschiebt den Fokus nicht. Speicherfehler bleiben sichtbar und sind als Warnung beschriftet.

Bestehende Alternativen zu präzisem Ziehen, 44px-Bedienflächen, Tastaturbewegung, sichtbarer Fokus, größere Schrift, reduzierte Bewegung und Sparmodus bleiben erhalten. Matheseiten haben kompaktere Header, keine abgeschnittenen Aufträge und interne Scrollbereiche. 3D-Welt bleibt zentral, kein separater 2D-Lernmodus.

Prüfung: Chromium mit emuliertem Touch/Tastatur, fünf Bildschirmgrößen. Kein physisches iPad/Safari und keine vollständige Screenreader-/WCAG-Abnahme. Auf Schulgeräten: VoiceOver-Niveau/Help/Progress/Gate-Status, große Schrift, Tastatur, Touch und Fehlerstatus tatsächlich prüfen. Normorientierung/Details: `UI-DESIGN.md`.

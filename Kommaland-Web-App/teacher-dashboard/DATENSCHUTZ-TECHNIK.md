# Lokale Verarbeitung und Betriebsgrenzen

Diese Dokumentation beschreibt technische Eigenschaften, keine rechtliche Freigabe
für einen bestimmten Schulträger oder eine automatische Datenschutzkonformität.

## Welche Daten verarbeitet werden

Name oder vereinbartes Kürzel, zufällige Schüler-ID, Quest-/Aufgaben-/Themenbezug,
Versuchs-Ergebnis, Hilfe-Nutzung, ausdrückliche Zurückstellungen, Sitzungs- und
Ereigniszeitstempel sowie aktive Zeitintervalle. Ab 5.1 zusätzlich freiwillige Lernziele,
ungefähre Planzahlen, Selbsteinschätzungen 1–5, ausgewählte Strategien, kurze Gründe
aus vorgegebenen Listen, Navigationsentscheidungen und Unterstützungsänderungen. Auf Lehrkräfteseite kommen eine
frei gesetzte Klassenzuordnung und Importzeitpunkte/Dateinamen hinzu.

Nicht erfasst: Schüler-Freitexte, konkrete eingetippte Antwortwerte, Tastatureingaben,
Geburtsdatum, E-Mail-Adresse, Kamera, Mikrofon, Standort, Geräte-Fingerabdruck oder
IP-Adresse im Lernstand. Anzeigename und zufällige ID sind getrennt. Der Name kann
in Abstimmung durch ein Kürzel ersetzt werden; damit wird die Datei nicht automatisch
anonym, wenn die Lehrkraft das Kürzel zuordnen kann.

## Keine automatische Datenübertragung

Die Apps enthalten keine Uploadfunktion für Lernstände, keine Cloud-Datenbank,
keinen Analyse-Dienst, keine externen Schriftarten und kein CDN. ZIP-Bibliothek und
alle gemeinsamen Module liegen im Paket. Rechnen und Speicherung erfolgen clientseitig.
Der Webserver liefert nur Programmdateien; Lernstände werden im Browser importiert.

Ein Betreiber des statischen Webservers kann unabhängig vom App-Code gewöhnliche
Zugriffsprotokolle führen. Hosting-Konfiguration, Geräteverwaltung und der von der
Schule gewählte Dateiübertragungsweg sind außerhalb dieser Anwendung zu prüfen.

## Verantwortung beim Betrieb

Nur vereinbarte Identifikationsangaben verwenden. Vor Einsatz Informationspflichten,
zulässige Nutzung, Zuständigkeiten, Aufbewahrungsdauer, Löschkonzept und den geschützten
Übertragungsweg nach den schulischen Vorgaben klären. Kein öffentlich freigegebenes
Verzeichnis für Schüler-Speicherstände verwenden.

Die Dateien und Browserdaten sind **nicht durch diese Anwendung verschlüsselt**.
Es gibt keine Lehrer-Anmeldung, Rechteverwaltung, Passwortsperre oder serverseitige
Zugriffskontrolle. Ein separates geschütztes Browser-/Betriebssystemprofil verwenden.
Eine öffentlich erreichbare statische Dashboard-Seite stellt keine importierten
Dateien online, schützt aber auch nicht vor Personen mit Zugriff auf dasselbe Gerät.

IndexedDB ist pro Web-Ursprung isoliert, nicht automatisch gegen andere Skripte derselben
Webadresse abgeschottet. Keine fremden Werbe-/Tracking-Skripte oder unkontrollierte
Anwendungen auf demselben Ursprung einbinden; für Lehrkräftedaten ist eine getrennte
vertrauenswürdige Hosting-Adresse sinnvoll. Das Dashboard setzt eine eigene Content
Security Policy und rendert importierte Namen/Texte nicht ungeprüft als HTML.

## Aufbewahren, Exportieren, Löschen

Lokaler Speicher ist kein Backup. Browserbereinigung, privater Modus, Geräteverlust
oder Benutzerlöschung können Daten entfernen. Eine Speicher-Persistenzanfrage kann
abgelehnt werden und verhindert bewusstes Löschen nicht. Regelmäßige Sicherungen
auf einem geschützten Speicherort sind erforderlich.

Einzelne Personen oder den gesamten aktiven Dashboard-Bestand in der Oberfläche
löschen. Bereits exportierte Dateien, Kopien auf anderen Geräten, Backups und Dateien
auf dem Übertragungsweg werden dadurch nicht gelöscht und sind separat zu behandeln.

Bei geteilter iPad-Nutzung ist jeweils nur ein Profil im Schüler-Spiel aktiv. Vor dem
Wechsel sichern und die richtige Datei importieren. Bei vollständigem Löschen aller
Browserdaten geht ohne Export auch die stabile lokale Identität verloren.

## Freiwillige Angaben zur Lernregulation

Planung, Sicherheit und Gründe können ohne Angabe übersprungen werden. Lernziele sind
keine Verpflichtung. Die aktuellen UI-Antworten werden als feste Codes gespeichert,
nicht als freie Reflexionstexte. Sie werden im vollständigen Export mit der Lehrkraft
geteilt; diese Verwendung ist auf der Abschlussseite sichtbar.

Keine Profilbildung mit einem globalen Selbstregulations-Score. Wenige Hilfen, freie
Navigation oder viele Challenges sind keine Diagnosen. Regeln sind konfigurierbare
Startheuristiken, keine empirisch geprüften psychologischen Schwellen. Die Beobachtung
„Beispiel → später richtig“ belegt keinen ursächlichen Effekt.

## Aussagekraft

Aufzeichnungen sind beobachtete Bedienereignisse, keine direkte Messung von Verständnis,
Aufmerksamkeit oder Fähigkeit. Hilfe kann eine sinnvolle Strategie sein. Zeit wird
nicht zur pauschalen Einstufung genutzt. Schwierige Challenges fließen nicht in die
negative Grundkompetenz-Priorisierung ein. Kleine oder lückenhafte Datenbestände
werden kenntlich gemacht. Es werden keine automatischen pädagogischen Diagnosen
oder Noten erstellt.

Lokale Dateien sind nicht digital signiert. Schülerinnen, Schüler oder andere Personen
mit Dateizugriff könnten sie verändern. Strukturvalidierung und ID-Konfliktprüfung sind
keine Prüfungsaufsicht und kein Manipulationsnachweis. Die Daten dienen der
pädagogischen Orientierung, nicht einer fälschungssicheren Leistungsbescheinigung.

## Technische Referenzen

- IndexedDB: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- Persistenzanfrage: https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist
- JSZip: https://stuk.github.io/jszip/documentation/api_jszip/load_async.html

Stand der implementierten Version: Kommaland 5.1, 10. September 2026.

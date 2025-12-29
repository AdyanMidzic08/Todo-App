# Todo API

Eine REST-API für die Verwaltung von Aufgaben, entwickelt mit Node.js und Express. Das Projekt beinhaltet ein Frontend im public-Ordner und speichert Daten persistent in einer JSON-Datei.

## Installation

1. Installieren Sie die Abhängigkeiten:
   ```bash
   npm install
   ```

## Starten der Anwendung

Starten Sie den Server:

```bash
npm run dev
```

Der Server ist unter folgender Adresse erreichbar: http://localhost:3000

## Frontend

Das Frontend im `public`-Ordner ist vollständig implementiert und ermöglicht die Interaktion mit der API. Es unterstützt das Erstellen (POST), Aktualisieren (PUT) und Löschen (DELETE) von Aufgaben über die Benutzeroberfläche.

## API Endpunkte

### Todos abrufen

- **URL:** `/todos`
- **Methode:** `GET`
- **Beschreibung:** Gibt die Liste aller Todos zurück.

### Todo erstellen

- **URL:** `/todos`
- **Methode:** `POST`
- **Body:**
  ```json
  {
    "title": "Titel",
    "text": "Beschreibung"
  }
  ```

### Todo aktualisieren

- **URL:** `/todos/:id`
- **Methode:** `PUT`
- **Body:**
  ```json
  {
    "done": true
  }
  ```

### Todo löschen

- **URL:** `/todos/:id`
- **Methode:** `DELETE`

## Technologien

- Node.js
- Express
- UUID (für eindeutige IDs)

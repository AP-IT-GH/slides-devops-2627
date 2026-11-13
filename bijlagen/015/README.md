# Labo Docker sandboxes

## Situatie

Je werkt nog steeds voor ACME. De developers willen een coding agent gebruiken op de todo-API, maar de security officer is niet overtuigd:

> "Zo'n agent voert commando's uit op de laptop van een collega. Toon me eerst wat er kan mislopen en wat Docker Sandboxes daartegen doet."

Jij bouwt een proof of concept en schrijft een kort advies. De volledige takenlijst staat in de slides van dit labo.

## Inhoud van deze bijlage

| Map | Doel |
|---|---|
| `acme-todo/` | Kleine todo-API zonder dependencies. `test/overdue.test.js` faalt bewust: die test hoort bij `docs/issue-16.md`. |
| `kit-opgave/` | Onvolledige kit die je zelf aanvult. |

## De applicatie

| Commando | Effect |
|---|---|
| `npm test` | Voert de tests uit. |
| `npm start` | Start de API op poort 3000. |

Omgevingsvariabelen:

| Variabele | Standaard | Betekenis |
|---|---|---|
| `HOST` | `127.0.0.1` | Adres waarop de server luistert. |
| `PORT` | `3000` | Poort waarop de server luistert. |

Endpoints: `GET /api/todos` en `POST /api/todos` (JSON-body met `title`).

Kopieer `acme-todo` naar een map **buiten** deze repository voor je eraan begint.

# Labo CI/CD

## Situatie

ACME vindt dat er te vaak code op `main` terechtkomt die de tests breekt. Bovendien bouwt een developer de Docker image nog met de hand op de eigen laptop.

Jij zet een pipeline op die elke wijziging automatisch test en een image publiceert. De opdrachten staan in de slides van dit labo.

## De applicatie

`acme-todo/` is een kleine todo-API zonder dependencies.

| Commando | Effect |
|---|---|
| `npm test` | Voert de tests uit. |
| `npm start` | Start de API op poort 3000. |

| Variabele | Standaard | Betekenis |
|---|---|---|
| `HOST` | `127.0.0.1` | Adres waarop de server luistert. |
| `PORT` | `3000` | Poort waarop de server luistert. |

Endpoints: `GET /api/todos` en `POST /api/todos` (JSON-body met `title`).

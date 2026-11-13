# Issue 16: todo's met een deadline

Een todo moet een optionele deadline kunnen krijgen.

## Gewenst gedrag

- `add` aanvaardt een optioneel veld `dueDate` (bijvoorbeeld `2026-06-01`).
- `list({ overdue: true, now })` geeft enkel todo's terug waarvan de deadline voor `now` ligt en die nog niet afgewerkt zijn. Zonder `now` geldt het huidige tijdstip.
- `GET /api/todos?overdue=true` past deze filter toe.
- `list()` zonder argumenten blijft alle todo's teruggeven.

## Klaar wanneer

`npm test` slaagt, zonder dat de bestaande tests gewijzigd zijn.

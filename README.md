# Presentaties DevOps

## Korte uitleg

### Eerste keer (NodeJS)
Als je NodeJS op je systeem hebt, kan je dit doen:

- `git clone git@github.com:AP-IT-GH/slides-devops-2627.git; cd slides-devops-2627; npm i; node server.js`
- Surf dan naar `localhost:8000` (zonder `index.html`).
- Kies via het keuzemenu een onderwerp.
- Je kan de "speaker notes" raadplegen door op de toets `s` te duwen.

### Eerste keer (Dev container)
Open de root folder met Visual Studio Code. Als je de dev container extensie hebt, krijg je vanzelf de optie om een dev container te starten. In die container run je `node server.js`. Voor de rest zijn de stappen dezelfde als wanneer je de slides lokaal uitvoert.

### PDF maken
Indien je een printable versie van de slides wil, zet je `?print-pdf` achter de URL voor het labo. Bijvoorbeeld `localhost:8000/001 - Inleiding?print-pdf`. Dan gewoon via het printvenster van je browser printen. Met de meeste browsers is dit CTRL-P. Pas de settings aan om de gewenste weergave te verkrijgen (bv. wel/geen styling, zorgen dat slides mooi op één pagina passen,...).

**Let op:** de printversie bevat geen speaker notes. Bovendien is het een beter idee de cursus te bestuderen dan de slides te printen.

### Updaten
`git pull`

### Nieuwe presentaties maken
Voeg een map toe met daarin een `index.md`.
Schrijf daarin Markdown compatibel met Reveal.js.
Geen extra `<section>` of `<script>` of `<textarea>`, gewoon de Markdown.

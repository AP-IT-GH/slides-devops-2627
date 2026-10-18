# (single-node) container orchestration

note:

- zie "bijlagen" in de slides repository
- applicatie wordt stapsgewijs uitgebreid
- steeds complexere applicatie vraagt steeds meer van Docker

---

## de oplossing: Docker Compose

note:

- demo in de les: omzetten van de uiteindelijke applicatie
  - toon `build` en `image`
- begonnen als Pythonscript dat gewoon een reeks `docker run` commands met de juiste opties uitvoerde
  - je kan hetzelfde resultaat bereiken met handwerk (maar lastiger en trager)
- **declaratief**
- zet je configuratie in versiebeheer ⇒ in het ideale geval onmiddellijk reproduceerbaar

---

## YAML syntax

note:

- handig formaat (weliswaar met problemen rond ambiguïteit)
- gok niet, test: https://jsonformatter.org/yaml-to-json

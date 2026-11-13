<style>
.reveal .mermaid svg { width: 100%; max-width: 100% !important; height: auto; max-height: 420px; }
</style>

# CI/CD

note:

- les 002, "doelstelling in dit vak": we registreren een aanpassing in Git, de testen starten vanzelf, de build gebeurt vanzelf,...
- vandaag maken we dat waar

---

## Zonder automatisatie

- "works on my machine"
- integreren aan het einde van het project
- manuele release op vrijdagavond

note:

- vraag: wie heeft al een groepswerk gehad dat de avond voor de deadline niet meer samen werkte?
- elke manuele stap wordt vroeg of laat vergeten of anders uitgevoerd
- hoe langer je wacht met integreren, hoe groter en pijnlijker de merge (zie trunk-based development)

---

## Continuous Integration

- vaak integreren in `main`, minstens dagelijks
- elke wijziging wordt automatisch gebouwd en getest
- een gebroken build herstel je eerst

note:

- term populair gemaakt door Kent Beck en Martin Fowler (eind jaren 90)
- CI is in de eerste plaats een **praktijk**, pas daarna een tool
  - een CI-server op lange branches die maanden niet gemerged worden is geen CI
- snelle feedback: de auteur weet binnen minuten dat iets stuk is, niet na weken

---

## Continuous Delivery en Deployment

<div class="mermaid">
<pre>
flowchart LR
  C[commit] --> B[build] --> T[test] --> P[package] --> S[staging]
  S -->|delivery: knop| PR[productie]
  S -.->|deployment: automatisch| PR
</pre>
</div>

note:

- **delivery**: elke versie die door de pipeline raakt, *kan* naar productie, een mens beslist wanneer
- **deployment**: elke versie die door de pipeline raakt, *gaat* naar productie
- "CD" wordt voor beide gebruikt: vraag altijd welke bedoeld wordt
- deployment vraagt veel vertrouwen in de tests en goede monitoring

---

## Pipeline

- reeks stappen, getriggerd door een gebeurtenis
- faalt een stap, dan stopt de rest
- snelle stappen eerst

note:

- "fail fast": linting en unit tests voor trage integratietests
- elke stap levert iets op dat de volgende gebruikt (artefact: build, image, rapport)
- een pipeline is zelf code ⇒ staat in versiebeheer, wordt gereviewd

---

## Waarom?

- kleine wijzigingen, vaak
- snellere feedback
- reproduceerbare builds

note:

- DORA-metrieken om de prestaties van een team te meten
  - deployment frequency
  - lead time for changes
  - change failure rate
  - time to restore service
- kleine batches zijn makkelijker te reviewen, te testen en terug te draaien
- reproduceerbaar: de build gebeurt in een propere omgeving, niet op een laptop met toevallige tools
  - doet denken aan containers

---

## Tools

- GitHub Actions
- GitLab CI/CD
- Forgejo Actions (Codeberg)
- Jenkins

note:

- vroeger draaide CI vaak op een eigen Jenkins-server
- vandaag zit CI meestal ingebouwd in het Git-platform
- Forgejo Actions lijkt sterk op GitHub Actions: workflows zijn grotendeels uitwisselbaar
- in dit vak: GitHub Actions

---

# GitHub Actions

---

## Concepten

<div class="mermaid">
<pre>
flowchart LR
  E[event] --> W[workflow]
  W --> J1[job]
  W --> J2[job]
  J1 --> S1[step]
  J1 --> S2[step]
  R[runner] -.- J1
</pre>
</div>

note:

- **workflow**: YAML-bestand in `.github/workflows/`
- **event**: wat de workflow start (push, pull request, manueel, op een tijdstip,...)
- **job**: reeks stappen op één runner; jobs lopen standaard parallel
- **step**: een shellcommando of een **action**
- **action**: herbruikbaar onderdeel, vaak uit een andere repository
- **runner**: de machine die een job uitvoert
- YAML: zie les 008

---

## Runners

- GitHub-hosted: verse VM per job
- self-hosted: je eigen machine

note:

- GitHub-hosted: na de job wordt de VM weggegooid ⇒ niets blijft over tussen jobs, tenzij expliciet bewaard
- gratis voor publieke repositories, beperkt aantal minuten voor private
- self-hosted: handig voor speciale hardware of interne netwerken
  - **nooit** voor publieke repositories: iedereen kan via een pull request code laten uitvoeren op je machine
- vergelijk met de sandboxes: een runner voert ook code uit die je niet zelf geschreven hebt

---

## Jobs combineren

<div class="mermaid">
<pre>
flowchart LR
  T1[test node 22] --> I[image]
  T2[test node 24] --> I
  T3[test node 26] --> I
  I --> D[deploy]
</pre>
</div>

note:

- jobs kunnen van elkaar afhangen ⇒ gerichte graaf
- **matrix**: dezelfde job voor meerdere combinaties (versies, besturingssystemen,...)
- voorwaarden: een job enkel uitvoeren voor bepaalde events of branches
  - bv. tests bij elke pull request, maar enkel een image publiceren vanaf `main`

---

## Containers bouwen en publiceren

- image bouwen op basis van de Dockerfile
- publiceren naar een registry
- tags afleiden uit branch of versie

note:

- GitHub Container Registry (`ghcr.io`) hoort bij je repository
- geen `latest` in productie: een vaste versie maakt terugdraaien mogelijk
- semantic versioning: `MAJOR.MINOR.PATCH`
- dit is de "package"-stap uit de DevOps-cyclus van les 002

---

## Environments

- doelomgeving zoals `staging` of `productie`
- eigen secrets
- verplichte goedkeuring mogelijk

note:

- verplichte goedkeuring = continuous delivery: de pipeline wacht op een mens
- zonder goedkeuring = continuous deployment
- het eigenlijke uitrollen hangt af van de infrastructuur: SSH naar een server, een cloudplatform, een cluster,...

---

## Secrets

- versleuteld bewaard, enkel beschikbaar tijdens een job
- worden gemaskeerd in logs
- niet beschikbaar voor pull requests vanuit forks

note:

- maskeren is **geen** beveiliging: wie een workflow kan wijzigen, kan een secret ook vervormd afdrukken
  - wie schrijfrechten heeft, kan dus alle secrets lezen
- het `GITHUB_TOKEN` wordt per job aangemaakt: geef het enkel de rechten die nodig zijn
- forks: anders kan elke vreemde een workflow schrijven die je secrets doorstuurt
  - triggers die dit omzeilen (`pull_request_target`) zijn gevaarlijk

---

## Supply chain

- een action is code van iemand anders
- een tag kan verplaatst worden
- vastpinnen op een commit of met een lockfile

note:

- maart 2025: `tj-actions/changed-files`, gebruikt in meer dan 23.000 repositories
  - aanvaller verplaatste bestaande tags naar een kwaadaardige commit
  - die drukte secrets af in de (publieke) logs
  - wie op een commit-hash had vastgepind, bleef gespaard
- sinds eind oktober 2026 ondersteunt GitHub ook lockfiles voor actions
  - pint ook de actions vast die een action zelf gebruikt
- Dependabot kan pins up-to-date houden
- zelfde idee als `package-lock.json` en vaste versies van images

---

## CI en branching

- verplichte controles in een ruleset
- `main` blijft groen

note:

- terug naar de vorige theorieles: een ruleset kan eisen dat bepaalde jobs geslaagd zijn
- zo kan niemand, ook geen beheerder, per ongeluk een rode pull request mergen
- GitHub flow + CI: elke branch wordt getest voor hij in `main` komt

---

## Samengevat

| Begrip | Betekenis |
|---|---|
| CI | elke wijziging automatisch bouwen en testen |
| continuous delivery | altijd klaar om uit te rollen, mens beslist |
| continuous deployment | automatisch uitrollen |
| workflow, job, step | bouwstenen van een pipeline in GitHub Actions |

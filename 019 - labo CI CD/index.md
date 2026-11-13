# labo CI/CD

note:

- je hebt de theorielessen over branching en CI/CD nodig
- materiaal: `bijlagen/019` in de slides repository

---

## Scenario

ACME heeft genoeg van gebroken code op `main` en van images die met de hand gebouwd worden.

Jij zet een pipeline op die:

- elke wijziging test
- enkel groene code laat mergen
- een image publiceert

---

## Documentatie

- [docs.github.com/actions](https://docs.github.com/actions)
- elke action heeft een README in haar eigen repository, bv. [actions/checkout](https://github.com/actions/checkout)
- optioneel: de GitHub CLI, zie `gh help`

note:

- de workflowsyntax staat in de docs onder "reference"
- lees bij elke action welke inputs ze verwacht, en kies de recentste major versie

---

## Voorbereiding

- kopieer `bijlagen/019/acme-todo` naar een map buiten de slides repository
- plaats ze onder versiebeheer
- push naar een nieuwe, **publieke** repository `acme-todo-ci`

note:

- publiek: rulesets, environments en GitHub-hosted runners zijn dan gratis

---

## Opdracht 1

Schrijf een workflow die bij elke push toont:

- de hostname
- de gebruiker
- het besturingssysteem
- de inhoud van de werkmap

Bekijk het resultaat in het tabblad "Actions".

---

## Vraag 1

- Op welke machine liep je workflow?
- Waarom is de werkmap leeg?
- Wat blijft er van die machine over na afloop?

---

## Opdracht 2

Schrijf een workflow `ci` met een job `test` die:

- start bij een push naar `main` en bij elke pull request
- de code ophaalt
- Node.js 24 installeert
- de tests uitvoert

Beperk het `GITHUB_TOKEN` tot leesrechten. Verwijder daarna de workflow uit opdracht 1.

note:

- actions die je kan gebruiken: `actions/checkout`, `actions/setup-node`
- `npm help test`
- zoek in de docs naar "permissions"

---

## Vraag 2

- Waarom start je de workflow niet bij een push naar **elke** branch?
- Welke rechten heeft het token als je niets instelt?

---

## Opdracht 3

- maak een branch waarop een bestaande test faalt door een wijziging in `src/`
- open een pull request
- zoek in de log welke test faalt en waarom

---

## Vraag 3

Zonder CI: wie had deze fout ontdekt, en wanneer?

---

## Opdracht 4

- bescherm `main` met een ruleset
  - wijzigingen enkel via een pull request
  - de job `test` moet geslaagd zijn
- probeer de rode pull request te mergen
- herstel de fout op dezelfde branch en merge

note:

- zoek in [docs.github.com](https://docs.github.com) naar "rulesets"
- om alleen te kunnen werken: stel het aantal verplichte goedkeuringen op 0

---

## Opdracht 5

- voer de tests uit op Node.js 22, 24 en 26 met een matrix
- open een pull request
- bekijk de lijst met controles en de status van je ruleset

note:

- zoek in de docs naar "matrix"

---

## Vraag 5

- Hoeveel jobs lopen er nu, en hoe heten ze?
- Waarom raakt je pull request niet meer gemerged? Los het op.
- Wat gebeurt er als je later de job hernoemt?

---

## Opdracht 6

Voeg een job toe die een image bouwt en publiceert:

- enkel bij een push naar `main`, nooit bij een pull request
- enkel als alle tests geslaagd zijn
- naar de GitHub Container Registry, met de naam van je repository
- enkel deze job mag packages schrijven

Start de gepubliceerde image daarna op je eigen machine.

note:

- actions van Docker: `docker/login-action`, `docker/metadata-action`, `docker/build-push-action`
- zoek in de docs naar "container registry"
- de image luistert standaard op `127.0.0.1`: zie de README van de bijlage

---

## Vraag 6

- Waarom krijgt enkel deze job schrijfrechten op packages?
- Welke tag kreeg je image?
- Lukt het om de image te pullen zonder aan te melden? Waarom?

---

## Opdracht 7

- publiceer ook een image als je een tag zoals `v1.0.0` pusht
- de image krijgt dan tag `1.0.0`
- maak de tag en controleer het resultaat

note:

- README van `docker/metadata-action`, zoek "semver"
- `git help tag`

---

## Vraag 7

Waarom gebruik je in productie liever `1.0.0` dan `latest`?

---

## Opdracht 8

- maak een environment `productie` die een goedkeuring vereist
- voeg een job `deploy` toe die na de image komt en de tag van de image afdrukt
- keur de deployment goed in de interface

note:

- zoek in de docs naar "environments"

---

## Vraag 8

- Is dit continuous delivery of continuous deployment?
- Wat moet je veranderen om naar het andere te gaan?

---

## Opdracht 9

- maak een repository secret `ACME_DEMO` met een **nepwaarde**
- schrijf een workflow die je manueel start en die het secret
  - gewoon afdrukt
  - achterstevoren afdrukt

note:

- zoek in de docs naar "secrets" en "workflow_dispatch"
- `man rev`

---

## Vraag 9

- Wat zie je in de log, en waarom?
- Wie kan je secrets dus lezen?
- Waarom krijgen pull requests uit forks geen secrets?

---

## Opdracht 10

- pin elke action in je workflows op een commit-hash
- zet de versie als commentaar achter de hash
- controleer dat de pipeline nog werkt

note:

- de hash vind je bij de release van de action op GitHub, of met `git help ls-remote`
- let op: een hash moet uit de repository van de action zelf komen

---

## Vraag 10

- Wat is er in maart 2025 gebeurd met `tj-actions/changed-files`?
- Welke repositories waren beschermd, en waarom?
- Wat is het nadeel van pinnen op een hash?

---

## Extra's

- lockfile voor actions: zoek in de docs naar "lock workflow dependencies"
- Dependabot voor je actions: zoek naar "dependabot version updates"
- een statusbadge in je README
- een geplande nachtelijke run: zoek naar "schedule"

note:

- alle extra's zijn een **aanvulling**, ze vervangen nooit de stof

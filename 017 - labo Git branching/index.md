# labo Git branching

- `git help <subcommando>`
- `git help -g`
- [git-scm.com/docs](https://git-scm.com/docs)
- [docs.github.com](https://docs.github.com)

note:

- je hebt de theorieles over branching nodig
- het tweede deel doe je per twee
- je gebruikt je GitHub-account en SSH-sleutel uit labo 2
- onder Windows opent `git help` een HTML-versie in je browser
- lees de man page **voor** je zoekt op het web: de opties die je nodig hebt staan er altijd in
- tip: in een man page zoek je met `/` en spring je naar het volgende resultaat met `n`

---

## Voorbereiding

- maak een nieuwe map `branching-labo` en plaats die onder versiebeheer
- zorg dat de eerste branch `main` heet
- maak `menu.md` en commit:

```text
# Menu
- soep: tomatensoep
- hoofdgerecht: stoofvlees
- prijs: 12 euro
```

note:

- zie `git help init` en `git help config`

---

## Opdracht

- zoek in `.git` het bestand dat aangeeft op welke branch je staat
- zoek ook het bestand dat hoort bij `main`
- vergelijk de inhoud met `git log`
- denkvraag: hoeveel ruimte kost een branch?

note:

- `git help repository-layout`

---

## Opdracht

- maak een branch `dessert` en ga erop staan
- voeg `- dessert: tiramisu` toe en commit
- toon de geschiedenis van **alle** branches als graaf
- ga terug naar `main`
  - wat zie je in `menu.md`?
  - wat zie je in de bestanden uit de vorige opdracht?

note:

- `git help switch` en `git help log`
- de graaf zal je nog vaak nodig hebben: een alias kan handig zijn (`git help config`, zoek "alias")

---

## Opdracht

- merge `dessert` in `main`
- welk woord in de uitvoer valt op?
- is er een commit bijgekomen?
- verwijder de branch `dessert`

note:

- `git help merge` en `git help branch`

---

## Opdracht

- maak een branch `drank` met de regel `- drank: water`
- verander op `main` de soep in pompoensoep
- merge `drank` in `main`
- bekijk de graaf: wat is anders dan bij de vorige merge?
- toon de ruwe inhoud van de merge commit: hoeveel ouders heeft hij?

note:

- `git help cat-file`
- Git opent een editor voor de boodschap van de merge commit: in Vim sluit je af met `:wq`

---

## Opdracht

- maak vanaf `main` twee branches
  - in de ene wordt de prijs 14 euro
  - in de andere wordt de prijs 13 euro
- merge beide in `main`
- breek de tweede merge eerst af en vraag de status op
- herbegin en los het conflict op **zonder** mergetool: 14 euro blijft

---

## Vraag

- In labo 2 kreeg je ook een conflict, bij `git pull`. Welke twee branches werden daar samengevoegd?
- Wat had `git config pull.rebase false` daarmee te maken?

note:

- `git help pull`

---

## Opdracht

- spring naar de commit twee stappen voor `main`, zonder branch
- lees de boodschap die Git toont
- maak een commit en ga terug naar `main`
- staat je commit nog in de graaf?
- vind hem terug en geef hem een branch

note:

- `git help switch` (zoek "detach"), `git help revisions` en `git help reflog`

---

## Vraag

- In labo 1 sprong je met `git checkout` naar een oude commit. In welke toestand stond je toen?
- Waarom was committen daar riskant?
- Hoe lang bewaart Git een commit waar geen branch naar wijst?

note:

- `git help gc`

---

## Opdracht

- maak vanaf `main` een branch `ontbijt` met twee commits die `ontbijt.md` aanmaken
- verander op `main` het hoofdgerecht en commit
- zet `ontbijt` met een rebase bovenop `main`
- noteer de hashes van de commits op `ontbijt`, voor en na
- merge `ontbijt` in `main`: welk soort merge wordt het?

note:

- `git help rebase`

---

## Vraag

- Waarom kregen de commits een andere hash?
- Een collega had `ontbijt` al binnengehaald voor jouw rebase. Wat gebeurt er als die verder werkt?

---

## Opdracht

- koppel een lege, **publieke** GitHub-repository via SSH en push `main`
- maak een branch `lunch` met een bestand `lunch.md`
- publiceer `lunch`, met `origin/lunch` als upstream
- toon alle branches, ook de remote-tracking branches
- toon welke upstream elke lokale branch volgt

note:

- `git help push` en `git help branch`

---

## Opdracht

- open op GitHub een pull request van `lunch` naar `main`
- bekijk het tabblad met de gewijzigde bestanden
- merge met **squash**
- werk je lokale `main` bij en bekijk de graaf
- verwijder je lokale `lunch` en lees wat Git meldt

---

## Vraag

- Hoeveel commits van `lunch` staan nu in `main`?
- Waarom vindt Git dat `lunch` niet in `main` zit?
- Wanneer is het veilig om een branch geforceerd te verwijderen?

---

## Opdracht (per 2)

- A geeft B schrijfrechten op de repository uit de vorige opdracht
- A beschermt `main` met een ruleset
  - wijzigingen enkel via een pull request
  - minstens één goedkeuring
  - geen force push
- zet de ruleset actief

note:

- zoek in [docs.github.com](https://docs.github.com) naar "rulesets"
- rulesets zijn gratis voor publieke repositories

---

## Opdracht (per 2)

- B maakt een commit op `main` en pusht rechtstreeks
- lees de foutmelding
- B zet de commit op een nieuwe branch en zet de lokale `main` terug gelijk met `origin/main`
- A probeert ook rechtstreeks te pushen naar `main`

note:

- `git help branch` en `git help reset` (lees goed wat `--hard` doet)

---

## Vraag

- Kon A als beheerder wel rechtstreeks pushen? Waarom zou je dat zo willen?
- Wat moest B doen om de commit niet te verliezen?

---

## Opdracht (per 2)

- B opent een pull request met de commit van daarnet
- A plaatst commentaar bij een regel en vraagt aanpassingen
- B past aan **zonder** een nieuwe pull request te openen
- B probeert de eigen pull request goed te keuren
- A keurt goed en merget

---

## Opdracht (per 2)

- A en B maken elk een branch vanaf dezelfde `main`
- allebei veranderen jullie de prijs, elk naar een ander bedrag
- elk opent een pull request
- A merget eerst
- wat toont GitHub bij de pull request van B?
- B lost het conflict lokaal op, zonder nieuwe pull request

---

## Vraag

- B had ook kunnen rebasen in plaats van mergen. Wat moet B dan anders doen bij de push?
- Waarom is dat aanvaardbaar op de branch van B, maar niet op `main`?

note:

- `git help push`, zoek "force-with-lease"

---

## Opdracht (per 2)

- fork de repository van een ander duo
- maak een wijziging en open een pull request naar het origineel
- het andere duo merget je wijziging
- breng je fork en je lokale repository terug in lijn met het origineel

note:

- `git help remote`: je hebt een tweede remote nodig

---

## Vraag

- Waarom werkt open source met forks en niet met schrijfrechten?
- Welke twee remotes heb je nu, en waar wijzen ze naar?

---

- [Learn Git Branching](https://learngitbranching.js.org)
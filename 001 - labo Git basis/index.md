labo Git basis

note:

- sommige klasgroepen labo voor eerste theorieles
- als je eerst labo hebt:
  - Git dient om projecten op te volgen doorheen de tijd
  - Git dient om werk te delen met collega's
  - probeer dit niet met OneDrive / Dropbox / ... ⇒ in de theorie wordt dit uitgebreider vergeleken
  - Git wordt vandaag door **bijna iedere** developer gebruikt en zou door elke moderne sysadmin gebruikt moeten worden
    - de kans dat je Git nodig zal hebben in je beroep > de kans dat je JavaScript nodig zal hebben

---

[installatie](https://git-scm.com/)

note:

- kies een text editor die je effectief kent
- zorg in Windows dat verborgen bestanden en folders zichtbaar zijn (Google!)

---

- `git --help`
- `git <SUBCOMMANDO> --help`

note:

- in het begin kan dit overweldigend lijken
- maar goede reminder voor de mogelijkheden
- we kunnen onmogelijk alle variaties van alle commando's leren, raadpleeg dit soort commando's
- leer "man pages" (i.e. "manual pages") gebruiken
  - belangrijkste functionaliteit is `h`, tweede belangrijkste is zoeken met `/`
  - syntax: zaken zoals `[` en `...` moet je kunnen lezen

---

`git init`

note:

- commando om een directory onder versiebeheer te plaatsen
- versiebeheer werkt dankzij metadata in verborgen folder `.git`

---

## Opdracht

- start Git Bash
- navigeer naar een *nieuwe* map
- plaats onder versiebeheer
- inspecteer met `ls -la`

note:

- niet uitvoeren in niet-projectmappen (bv. "Mijn Documenten")
- niet aanmaken in map waarvan een voorouder al onder versiebeheer staat
  - je kan dit zien aan de prompt van Git Bash

---

`git status -u`

note:

- "hoe staat het met de files die deel uitmaken van dit project?"
- `-u` is niet essentieel maar aangeraden

---

## Opdracht

- maak een .txt file in je map van eerder
- zet je voornaam er in
- controleer de status

---

`git add <FILENAAM>`

note:

- niet noodzakelijk om iets toe te voegen
- betekent "noteer in potlood" dat er iets veranderd is (toegevoegd of verwijderd)
  - modernere alias: `git stage`

---

## Opdracht

- lees de instructie bij de status van je file
- voer ze uit
- vraag de status opnieuw op
- wat valt op?

---

`git commit`

note:

- vereist eerst wat gegevens: `git config user.name "Voornaam Familienaam` en `git config user.email "ik@mijndomein.com"`
  - `--global` als dit voor al je projecten zelfde is
    - beter niet als je aparte credentials voor privé / werk wil gebruiken
- noteer de wijzigingen niet "in potlood", maar "in pen"
- volgt op één *of meerdere* `git add` commando's
- werkt niet zonder `git add`
- maakt een "pakketje" met alle wijzigingen
  - elk pakketje krijgt een uniek ID, de "commit hash"
- **standaardafspraak**: enkel gewenste toestand committen
  - veel bedrijven hebben deze regel
  - later branches als manier om dit een beetje werkbaarder te maken

---

## Opdracht

(zie speaker notes)

note:

- voer de "commit" operatie uit
- gebruik de boodschap "eerste versie nieuwe file"
- controleer opnieuw de status → lees de volledige tekst
- voeg je achternaam toe aan de tekst in het bestand
- controleer opnieuw de status
- zorg voor een tweede commit
  - als je twijfelt of dit gelukt is: `git status -u` toont "nothing to commit" vlak na een geslaagde commit

---

Goede beginnersstrategie

(zie speaker notes)

note:

- `.git` bevat de metadata voor versiebeheer; commits,... wijzigen de versiegeschiedenis
- failsafe: kopieer je volledige projectmap voor je operaties uitvoert, voer dan operatie uit in het origineel
- indien het mis loopt, wis je origineel en zet je kopie in de plaats
- bijna alle fouten zijn herstelbaar, maar als je de concepten nog niet goed kent, riskeer je problemen erger te maken

---

`git log`

note:

- nuttige opties (combineerbaar):
  - `--oneline`
  - `--graph`
  - `--abbrev-commit`
  - `--color --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'`

---

## Opdracht

- lees de afgekorte commit hash van de **eerste** commit in je repository af

---

`.gitignore`

note:

- niet alles hoort thuis in versiebeheer
  - wachtwoorden,...
  - gegenereerde files (node_modules,...)
- gewoon tekstbestand, voorlopig met letterlijk de namen van files / folders die uitgesloten worden

---

## Opdracht

- maak een nieuw, leeg bestand "nieuwbestand.txt"
- check de status, dit bestand zou "untracked" moeten zijn
- zorg, zonder het bestand te wissen en zonder het te committen, dat er niets over gezegd wordt **over dat specifieke bestand** door `git status`
- doe een commit die verhindert dat "nieuwbestand.txt" in de toekomst in versiebeheer terecht zou komen

---

`git tag`

note:

- commits hebben een commit hash
  - technisch belangrijk
  - niet voorspelbaar
  - niet makkelijk terug te vinden
- tags zijn "leesbare namen" voor commits

---

## Opdracht

- geef je recentste commit de tag `v1`
- voer `git log` uit en controleer dat je de tag ziet verschijnen

---

`git reset`

note:

- werk ongedaan maken
- belangrijkste varianten: `--soft` en `--hard`
- **gebruik de eerste weken / maanden de beginnersstrategie!**

---

## Opdracht

- **beginnersstrategie gebruiken!**
- doe een "soft reset" naar de *voorlaatste* commit uit je log
- vraag de status op
- commit alles dat momenteel "staged" is
- denkvraag: wat is veranderd tegenover vlak voor de reset?

---

## Opdracht

- **beginnersstrategie gebruiken!**
- maak nog een bestand, "nieuwerbestand.txt" en commit dat
- bekijk je log
- doe een harde reset naar de voorlaatste commit
- wat zie je en hoe is dit anders dan als je een zachte reset gedaan zou hebben?

---

`git diff`

note:

- toont verschillen tussen commits
- normaal groen voor toevoegingen en rood voor verwijderingen
  - desnoods kan je settings aanpassen (via `git config`, Google desnoods)

---

## Opdracht

- laat zien wat veranderd is tussen commit "v1" en de allereerste commit

---

`git checkout`

note:

- springt naar een ander punt maar maakt geen aanpassingen ongedaan
- je kan hierna (met onze huidige kennis) niet committen

---

## Opdracht

- spring terug naar de commit die we eerder "v1" genoemd hebben
- voer `git status` uit
- pas de file van eerder aan zodat je voornaam nu volledig in hoofdletters staat
- probeer te committen, wat gebeurt er?
- vraag de status op
- lees de instructies om de aanpassing ongedaan te maken
- ga terug naar de recentste commit: `git checkout main`

note:
- naargelang je settings kan laatste commando ook `git checkout master` zijn

---

## Extra's

- [Oh My Git!](https://ohmygit.org)

note:

- alle extra's zijn altijd een **aanvulling**, ze vervangen nooit de stof

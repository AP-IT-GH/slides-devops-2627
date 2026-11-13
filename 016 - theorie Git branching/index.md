<style>
.reveal .mermaid svg { width: 100%; max-width: 100% !important; height: auto; max-height: 420px; }
</style>

# Git branching

note:

- vervolg op les 002: daar was de geschiedenis nog een rechte lijn
- in labo 1 en 2 zijn we al twee keer tegen branches aangelopen zonder het te weten
  - `git checkout` van een oude commit
  - het merge conflict bij `git pull`

---

## Waarom branches?

- dringende bugfix terwijl een feature half af is
- iets uitproberen zonder de werkende versie te verliezen
- met meerdere mensen tegelijk aan hetzelfde project

note:

- vraag: hoe zou je dit oplossen met wat je nu kent?
  - map kopiëren, `project-v2-echt-finaal`,... ⇒ terug naar "versiebeheer oude stijl" uit les 002
- in oudere systemen (bv. Subversion) was een branch effectief een kopie van een map, dus duur en traag
  - gevolg: men vermeed branches ⇒ grote, pijnlijke merges

---

## Een branch is een label

<div class="mermaid">
<pre>
%%{init: {'gitGraph': {'rotateCommitLabel': false}}}%%
gitGraph
  commit id: "A"
  commit id: "B"
  branch feature
  checkout feature
  commit id: "C"
  commit id: "D"
  checkout main
  commit id: "E"
</pre>
</div>

note:

- elke commit wijst naar zijn ouder(s) ⇒ de geschiedenis is een **graaf**, geen lijst
- een branch is een verplaatsbaar label dat naar één commit wijst
  - bij een nieuwe commit schuift het label mee
- demo: toon het bestand voor een branch in `.git/refs/heads/`
  - bevat enkel een hash ⇒ een branch maken kost bijna niets
- `main` is geen speciale branch, enkel een afspraak (vroeger vaak `master`)

---

## HEAD

- "waar sta ik nu?"
- wijst normaal naar een branch
- **detached HEAD**: wijst rechtstreeks naar een commit

note:

- demo: inhoud van `.git/HEAD` voor en na het wisselen van branch
- labo 1: na `git checkout` van een oude commit stonden we in detached HEAD
  - committen kan wel, maar geen enkel label wijst naar die commit
  - wissel je terug, dan is de commit "zoek" (niet weg: zie `reflog` in het labo)
- wisselen van branch past de working directory aan aan de commit waar het label naar wijst
  - lokale wijzigingen gaan mee, of Git weigert als ze zouden verloren gaan
- recentere Git-versies splitsen `checkout` op in `switch` (branches) en `restore` (bestanden)

---

## Fast-forward merge

<div class="mermaid">
<pre>
%%{init: {'gitGraph': {'rotateCommitLabel': false}}}%%
gitGraph
  commit id: "A"
  commit id: "B"
  branch feature
  checkout feature
  commit id: "C"
  commit id: "D"
</pre>
</div>

`main` schuift op van B naar D

note:

- `main` heeft sinds de aftakking niets nieuws ⇒ niets samen te voegen
- Git verplaatst enkel het label, er komt **geen** nieuwe commit bij
- kan je vermijden als je toch een spoor van de branch wil (zie man page van `merge`)

---

## Three-way merge

<div class="mermaid">
<pre>
%%{init: {'gitGraph': {'rotateCommitLabel': false}}}%%
gitGraph
  commit id: "A"
  commit id: "B"
  branch feature
  checkout feature
  commit id: "C"
  checkout main
  commit id: "D"
  merge feature id: "M"
</pre>
</div>

note:

- beide branches hebben nieuwe commits
- "three-way": Git vergelijkt drie versies
  - de gemeenschappelijke voorouder (merge base, hier B)
  - de twee toppen (C en D)
- resultaat: een merge commit M met **twee ouders**

---

## Conflicten

```text
<<<<<<< HEAD
- prijs: 13 euro
=======
- prijs: 14 euro
>>>>>>> duurder
```

note:

- ontstaat als beide kanten dezelfde regels wijzigden
- Git kan niet raden wat juist is: een conflict is geen fout, maar een vraag
- oplossen = gewenste versie maken, markeringen weg, gewone `add` en `commit`
  - of de merge afbreken
- terug naar labo 2: `git pull` is eigenlijk `fetch` gevolgd door `merge`
  - het conflict daar was een merge tussen `main` en `origin/main`
  - twee branches, net zoals hier

---

## Remote branches

<div class="mermaid">
<pre>
%%{init: {'gitGraph': {'rotateCommitLabel': false}}}%%
gitGraph
  commit id: "A"
  commit id: "B" tag: "origin/main"
  commit id: "C"
  commit id: "D"
</pre>
</div>

- `origin/main`: laatst gekende stand van `main` op de remote
- lokale `main` staat hier twee commits voor

note:

- remote-tracking branches worden enkel bijgewerkt bij communicatie met de remote (`fetch`, `pull`, `push`)
- je werkt er nooit rechtstreeks op
- een lokale branch kan een **upstream** hebben: daardoor weet `git status` dat je "2 commits ahead" bent
- nieuwe branches bestaan enkel lokaal tot je ze expliciet pusht

---

## Rebase

<div class="mermaid">
<pre>
%%{init: {'gitGraph': {'rotateCommitLabel': false}}}%%
gitGraph
  commit id: "A"
  commit id: "B"
  commit id: "D"
  branch feature
  checkout feature
  commit id: "C'"
</pre>
</div>

`feature` opnieuw opgebouwd bovenop `main`

note:

- zelfde vertrekpunt als bij de three-way merge
- C wordt opnieuw toegepast bovenop D ⇒ **nieuwe** commit C' met een andere hash
- resultaat: lineaire geschiedenis, daarna kan `main` fast-forwarden
- **gouden regel**: rebase geen commits die anderen al hebben
  - je herschrijft dan hun geschiedenis en moet force pushen
- labo 2: `git config pull.rebase false` koos merge in plaats van rebase bij `pull`
- interactive rebase: commits opkuisen (samenvoegen, herschrijven) voor je ze deelt

---

## Merge, squash of rebase?

| Methode | Geschiedenis | Nadeel |
|---|---|---|
| merge commit | alles, met vertakkingen | drukke graaf |
| squash | één commit per branch | details gaan verloren |
| rebase | lineair | herschrijft commits |

note:

- GitHub biedt alle drie aan bij het mergen van een pull request
- geen juist antwoord: een team maakt een afspraak en houdt zich eraan
- squash: de commits op de branch komen niet in `main` ⇒ Git herkent de branch nadien niet als gemerged

---

## Pull requests

- voorstel om een branch te mergen
- bespreking en review vóór de merge
- automatische controles

note:

- concept van GitHub, GitLab ("merge request"), Codeberg,... niet van Git zelf
  - de Linux kernel werkt nog steeds met patches via e-mail
- review: tweede paar ogen, maar ook kennisdeling
- labo 2: issues sluiten via een commitboodschap ⇒ werkt ook vanuit de beschrijving van een PR
- automatische controles: zie de les over CI/CD

---

## Forks

- eigen kopie van andermans repository, op de server
- pushen naar je fork, pull request naar het origineel

note:

- les 002: clone van een publiek project en dan pushen lukte niet ⇒ dit is de oplossing
- typisch twee remotes: `origin` (je fork) en `upstream` (het origineel)
- open source werkt zo: niemand hoeft schrijfrechten te geven aan onbekenden
- binnen een bedrijf meestal één gedeelde repository met branches

---

## Branches beschermen

- geen rechtstreekse push naar `main`
- verplichte review
- verplichte geslaagde controles

note:

- op GitHub via **rulesets**
- gelden ook voor beheerders, tenzij die expliciet op een bypass list staan
- niet uit wantrouwen: iedereen maakt fouten, ook seniors
- vormt de brug naar CI/CD: "controles" = een pipeline die slaagt of faalt

---

## Strategieën

- Git flow
- GitHub flow
- trunk-based development

note:

- branching op zich is techniek, een strategie is een teamafspraak
- de keuze hangt af van hoe vaak je release en hoeveel versies je ondersteunt

---

## Git flow

<div class="mermaid">
<pre>
%%{init: {'gitGraph': {'rotateCommitLabel': false}}}%%
gitGraph
  commit id: "1.0" tag: "v1.0"
  branch develop
  checkout develop
  commit id: "d1"
  branch feature/login
  checkout feature/login
  commit id: "f1"
  commit id: "f2"
  checkout develop
  merge feature/login
  branch release/1.1
  checkout release/1.1
  commit id: "fix"
  checkout main
  merge release/1.1 tag: "v1.1"
  checkout develop
  merge release/1.1
</pre>
</div>

note:

- Vincent Driessen, 2010
- `main` bevat enkel releases, `develop` de volgende versie, daarnaast feature-, release- en hotfixbranches
- past bij software met genummerde versies die naast elkaar ondersteund worden (desktopsoftware, libraries)
- zwaar voor webapplicaties die continu uitrollen
  - de auteur zelf raadt het intussen af voor dat soort projecten

---

## GitHub flow

<div class="mermaid">
<pre>
%%{init: {'gitGraph': {'rotateCommitLabel': false}}}%%
gitGraph
  commit id: "A"
  branch fix-login
  checkout fix-login
  commit id: "B"
  checkout main
  merge fix-login
  branch prijzen
  checkout prijzen
  commit id: "C"
  commit id: "D"
  checkout main
  merge prijzen
</pre>
</div>

- `main` is altijd deploybaar
- per wijziging een korte branch, met PR

---

## Trunk-based development

- iedereen integreert minstens dagelijks in `main`
- branches leven hooguit een dag of twee
- onafgewerkt werk zit achter **feature flags**

note:

- "continuous integration" betekende oorspronkelijk letterlijk dit: vaak integreren
- kleine wijzigingen ⇒ kleine conflicten
- onderzoek van DORA (zie het boek "Accelerate") koppelt trunk-based development aan betere prestaties van teams
- feature flag: nieuwe code staat al in `main`, maar is uitgeschakeld tot ze af is
- vereist goede automatische tests ⇒ volgende theorieles

---

## Wat kies je?

| Situatie | Strategie |
|---|---|
| meerdere versies ondersteunen | Git flow |
| webapp, regelmatig releasen | GitHub flow |
| ervaren team, sterke tests | trunk-based |

note:

- geen religie: kies wat bij het product en het team past
- in dit vak gebruiken we GitHub flow

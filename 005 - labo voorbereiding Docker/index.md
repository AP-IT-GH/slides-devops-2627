## Opdracht

Download en installeer [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## Opdracht

Test uit: `docker run hello-world`

---

## In te prenten

- image: sjabloon, zoals een klasse
- container: instantie, zoals een object

---

<div class="mermaid"><pre>
flowchart TD
    G[Registry]
    A[Image]
    F[Dockerfile]
    C[Actieve container]
    B[Gestopte container]
    D[Permanent verwijderd]

    G -->|docker pull| A
    F -->|docker build| A

    A -->|docker run| C

    C -->|docker stop| B
    B -->|docker start| C
    C -->|docker restart| C

    C -->|docker commit| A

    A -->|docker rmi| D
    B -->|docker rm| D
</pre></div>

---

## Opdracht

Gebruik `docker --help` om te achterhalen welke images je al hebt.

---

## Container registry

[Docker Hub](https://www.docker.com/products/docker-desktop/)

note:

- registry (zoals Docker Hub) omvat repositories voor heleboel images
  - repositories zijn nodig omdat images in vele varianten bestaan
- container repository is iets anders dan een Git repository
- iedereen kan hier eigenlijk images uploaden
  - officiële images en images van gespecialiseerde organisaties zijn vaak goed gedocumenteerd
  - images van kleine gebruikers vaak veel minder goed

---

## Opdracht

- zoek `linuxserver/filezilla`
- volg de minimale instructies

note:

- merk op: grafische software is minder courant, maar is mogelijk
- aanpak hier: render visuele kant naar een browservenster
  - zal dan geen OS theming,... volgen
- **algemene richtlijn**: start steeds vanaf een minimale configuratie, copy-paste geen enorme configuraties die je niet begrijpt
  - quickstarts maken je het leven makkelijker, maar veronderstellen wel dat je weet wat je aan het doen bent

---

## Essentiële commando's

- `docker ps [-a]`
- `docker exec -it <CONTAINER_ID> sh`
- `docker logs <CONTAINER_ID>`

note:

- indien beschikbaar: `bash` in plaats van `sh` biedt betere ervaring

---

## Essentiële parameters `docker run`

- `-v <HOST_DIRECTORY>:<GUEST_DIRECTORY>`
  - **opgelet met Git Bash**
    - huidige directory aangeven met `//$PWD`
    - bestemming moet ook starten met *dubbele* `/`
    - bv. `//$PWD/mijnmap://bestemming`
- `-p <HOST_PORT>:<GUEST_PORT>`

---

## Opdracht

1. Download de **officiële** nginx image van Docker Hub
2. Run er een container mee zodat je naar `localhost:80` kan surfen
3. Log in op de container
4. Installeer een text editor
5. Pas de inhoud van de indexpagina aan zodat je naam in de hoofding staat
6. Check of je de wijziging ziet verschijnen in de browser
7. Stop en verwijder de container
8. Start een nieuwe, op zo'n manier dat je ook `localhost:80/custom/mijnpagina.html` kan bezoeken

note:

- de inhoud van mijnpagina.html is onbelangrijk, moet gewoon zichtbaar werken

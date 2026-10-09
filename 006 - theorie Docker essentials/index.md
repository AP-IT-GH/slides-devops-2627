## Caveat Git Bash

note:

- zie recentste commit slides: Git Bash interpreteert paden anders dan normale Bash, wat kan leiden tot problemen met de `-v`
- fix staat in nieuwere slides

---

## Images definiëren

```text
FROM <BASISIMAGE>          # programmeertaal / framework / eigen image / ...
WORKDIR <LOCATIE IN IMAGE> # voor alle hierop volgende commando's
COPY <FILE/DIRECTORY>      # naar de working directory
RUN <COMMANDO>             # runt tijdens bouwen van de image
EXPOSE <POORTNUMMER>       # documentatiecommando
CMD <COMMANDO_OF_ARGS>     # runt bij opstart, ENTRYPOINT bestaat ook
```

note:

- absolute basis voor iets werkend
- oefen tot het onderscheid duidelijk is
- dockerignore file kan files uitsluiten van COPY
  - handig als je bv. een NodeJS app wil containerizen,...
- vb.: NodeJS app
- vb.: C♯ app (met mcr.microsoft.com/dotnet/sdk:10.0)

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

note:

- gestopt: kan herstart worden
- verwijderd: data is weg

---

## Volumes en bind mounts

note:

- containers zijn niet bedoeld om lang te bewaren
  - bv. upgrade van software kan gewoon gebeuren door container te vervangen
- data opslaan in container zelf is geen goed idee
  - vergelijk met "externe USB drive" die we mount point geven
  - demo: iets oudere MySQL migreren naar nieuwere
- volumes: aangeraden, in intern beheer van Docker
- bind mounts: gebruiksgemak, maar soms meer issues permissies, security, storage drivers,...
  - kunnen wel erg handig zijn tijdens development

---

## De gebruiker

```
USER usernaam[:groep]
```

of

```
USER uid[:gid]
```

note:

- denk terug aan vorige theorieles, `chroot`
  - welke user maakt files,...?
- hiermee zeggen we dat instructies in de image/container door specifieke gebruiker worden uitgevoerd
  - deze **kan** matchen met een UID op de hostomgeving (dus typisch in WSL)
  - en voor `root` zal het 0 zijn op beide! **het gevolg is dat een container exploit root toegang op de host biedt!**
  - `docker run --user hostuser:containeruser` staat toe mapping expliciet te maken
    - staat bv. ook toe om root in de container te mappen op gewone user buiten de container (die misschien niet eens geregistreerd is)
- demonstratie
  - eerst even herinneren: UID/GID
  - voorzie bind mount
  - laat wat files maken door één user, wat files door een andere,...
  - check daarna op hostmachine
  - https://www.docker.com/blog/understanding-the-docker-user-instruction/
- belangrijk voor security: meer risico op schade buiten de container wanneer gebruiker te hoge privileges heeft
- we kunnen meerdere `USER` instructies gebruiken in één Dockerfile, bv. om eerst expliciet als root een gebruiker met gewenste privileges te maken en dan te switchen naar die user
- we kunnen de tweede syntax gebruiken om te verhinderen dat ID anders wordt toegekend op verschillende systemen

---

## Docker socket

note:

- "aanspreekpunt" voor Docker, eigenlijk stuurt de Docker CLI / Docker Desktop hier berichten naar
- https://docs.portainer.io/start/install-ce/server/docker/wsl (of https://docs.portainer.io/start/install-ce/server/docker/linux voor Linux)
  - moet allerlei info over lopende containers kunnen verkrijgen,...
  - meestal runt Docker zelf als root, dus we geven een applicatie hiermee de mogelijkheid root op de host te krijgen, zelfs als `USER` anders zou zijn
  - enkel doen bij vertrouwde, streng nagekeken software; afgeraden dit te doen als er ook een alternatief is (bv. Traefik kan dit maar niet noodzakelijk)

---

## Omgevingsvariabelen

```
ENV MIJN_VARIABELE="waarde"
--env MIJN_VARIABELE="waarde"
```

note:

- toon even concept in gewone (geneste) shell
- de eerste syntax komt in Dockerfile en geldt in zowel de rest van de Dockerfile als in de image
  - variant `ARG` geldt enkel in de rest van de Dockerfile
  - kan gebruikt worden om gedrag van `RUN`,... te sturen
- de tweede wordt pas bij runnen container vastgelegd (`docker run`)
- meestal zien we de tweede syntax
---

## Details container achterhalen

note:

- `docker inspect`
- toont allerlei configuratie-info over de container: intern IP, welke bind mounts

---

## Logs

note:

- container output is vaak nuttig, maar container op de voorgrond runnen niet
- `docker logs <CONTAINER_ID>` toont deze
- werkt ook voor gecrashte containers (`docker exec -it ... bash` gaat dan niet meer)
  - handig voor debugging
- vb.: `docker run -d --name some-mysql mysql`

---

## Networking

note:

- run paar containers op achtergrond
- inspecteer via `docker inspect`
- ping via IP
- probeer ping via ID of naam (merk op: DNSNames...)
- merk op: zelfde NetworkID (default netwerk)
- creëer expliciet netwerk met `docker network create`
- run een container hierop
- toon: NetworkID en DNSNames
- gevolg voor bereikbaarheid: containers kunnen elkaar via naam of ID bereiken
- nogal omslachtig, maar we zullen dit later stroomlijnen met Docker Compose

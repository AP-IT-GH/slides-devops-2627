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

- oefen tot het onderscheid duidelijk is
- dockerignore file kan files uitsluiten van COPY
  - handig als je bv. een NodeJS app wil containerizen,...

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

note:

- denk terug aan vorige theorieles, `chroot`
  - welke user maakt files,...?
- demonstratie
  - voorzie bind mount
  - laat wat files maken door één user, wat files door een andere,...
  - check daarna op hostmachine
  - https://www.docker.com/blog/understanding-the-docker-user-instruction/
- belangrijk voor security: meer risico op schade buiten de container wanneer gebruiker te hoge privileges heeft

---

## Docker socket

TODO: voorbeeld van wat hier mee kan, bv. oplijsten andere containers?

---

environmentvariabelen

---

inspect

---

logs

---

networking

- rol Docker socket
- docker inspect
- **docker logs**
- environmentvariabelen (eerst nog even algemeen, overerving van een omgeving in een andere, dan pas in Docker)
- container networking:
  - check IP van een eerste container
  - check IP van een tweede
  - toon mogelijkheden communicatie
  - toon mogelijkheid om ze doelgericht in netwerken te plaatsen

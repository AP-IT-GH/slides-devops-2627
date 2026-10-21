```
volumes:
  ...
```

note:

- **twee onderdelen** met dezelfde naam, **op andere plaats in docker-compose.yml**
- `volumes` op hetzelfde niveau als `services` geeft aan welke volumes bestaan
- `volumes` onder een services geeft aan welke bind mounts en volumes aangesloten zijn op een container in de Compose stack

---

```
networks:
  ...
```

note:

- zelfde opmerking rond twee voorkomens
- op niveau van `services` betekent het: "deze netwerken bestaan"
- onder een service betekent het: "deze service is aangesloten op dit netwerk"

---

```
environment:
  MYSQL_ROOT_PASSWORD: nietzoheelgeheim
```

note:

- slecht idee (secrets staan gewoon in versiebeheer, raken makkelijk verspreid en zijn ook niet geëncrypteerd, niet zo evident hoe de applicatie te parametriseren,...)

---

`.env` file

note:

- beter, kan in .gitignore, is ook een centrale plaats voor alle configuratie

---

```
services:
  myapp:
    image: myapp:latest
    secrets:
      - my_secret
secrets:
  my_secret:
    file: ./my_secret.txt
```

note:

- in de container: `/run/secrets/my_secret` met als inhoud dezelfde als `my_secret.txt`
- fijnkorrelig (expliciete toegang per individuele secret)
- kan niet per ongeluk in logging,... opduiken, applicatie moet heel doelbewust op die plaats in filesysteem gaan kijken
- veronderstelt dan ook wel dat de applicatie deze "good practice" volgt!
  - zie bv. MySQL documentatie op Docker Hub

---

## meerdere commando's als `CMD`

```
bash -c "commando1 && commando2 && commando3 &&..."
```

note:

- technisch gesproken is dit één commando (`bash`)
- de bedoelde commando's zijn één stringargument
  - vergelijk met bv. JavaScript `eval`

---

## Dev containers

note:

- "normale" containers voorzien een standaard voor **deployment**
- development gebeurt normaal met aparte tools, vaak afgesproken binnen een team
- idee oplossing: een image met development tools (SDK, debugger,...)
- praktisch obstakel: **werken** op de container

---

## Aanpak 1

note:

- gewoon development libraries en een terminal text editor installeren **op** een container
- voordeel: heel simpel
- nadeel: niet altijd handig, zeker niet als je geen terminal text editor gebruikt of de jouwe zwaar customizet

---

## Aanpak 2

note:

- VSC remote development containers extensie (andere editors hebben gelijkaardige oplossingen)
- nadeel: vereist server op container (eet wel wat resources)
- nadeel: extra laag complexiteit (configuratie in JSON bovenop bestaande Dockerfile en Docker Compose file, al dan niet zichtbaar)
  - soms meerdere manieren om hetzelfde te doen
- voordeel: heel gebruiksvriendelijk, met onmiddellijke configuratie van de editor (plugins,...)
- demo met file in bijlage
- referentie: https://code.visualstudio.com/docs/devcontainers/create-dev-container
- tweede goede referentie: containers.dev
- kan je zelf ook bouwen, is gewoon een Docker image met wat voorgeconfigureerde settings

---

## Overlap

note:

- `"build": { "dockerfile": "Dockerfile" }` betekent dat we Dockerfile kunnen aanpassen om extra software,... te installeren
- `features` zal typisch ook dingen installeren en configureren...
- `forwardPorts` (in JSON) vs. `ports` (in docker-compose.yml)
  - forwarding via VSC server versus via host
    - eerste is vooral indien nodig voor development, tweede indien nodig voor deployment
    - eerste is ook nodig als VSC en Docker op andere machine staan (wat kan, bv. in cloud deployments van VSC)

---

## Met Docker Compose

```
{
    "dockerComposeFile": "docker-compose.yml",
    "service": "devcontainer",
    "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}"
}
```

note:

- eerste: evident
- tweede: "welke container uit de stack is de 'hoofdcontainer'", i.e. waar opent onze terminal,...?
- derde: zegt waar in het filesysteem van de container ons VSC-project zichtbaar wordt, zoals een bind mount dus

---

![development loop](./images/development-loop.png)

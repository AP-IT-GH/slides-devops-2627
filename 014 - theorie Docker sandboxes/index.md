# Docker sandboxes*

note:

- dit is een aparte technologie, niet alleen een concept
  - je zou kunnen spreken over een container als een sandbox voor een applicatie, maar dat is niet wat we hier bedoelen

---

## Context

```
flowchart LR
    subgraph C["Container"]
        direction TB
        CP["Processen in de container"]
        CK["Gedeelde Host Kernel]
        CH["Host Hardware"]
        CP <-->|System Calls| CK
        CK --- CH
    end

    subgraph V["VM"]
        direction TB
        VP["Gastprocessen"]
        GK["Kernel van de gast"]
        HV["Hypervisor"]
        VH["Host"]

        VP --> GK
        GK <-->|Virtuele apparaten en hypercalls| HV
        HV --- VH
    end

    classDef workload fill:#dbeafe,stroke:#60a5fa,color:#1e3a8a
    classDef risk fill:#fff0d5,stroke:#d97706,color:#78350f
    classDef isolation fill:#d1fae5,stroke:#059669,color:#064e3b
    classDef hardware fill:#f3f4f6,stroke:#9ca3af,color:#374151

    class CP,VP,GK workload
    class CK risk
    class HV isolation
    class CH,VH hardware
```

note:

- VM's zijn architecturaal veiliger: een kernel exploit is niet genoeg
  - hypervisor exploits bestaan ook wel, maar zeldzamer en lastiger
- tegenwoordig bredere analyses van grote codebases mogelijk → meer kernel exploits

---

## De toepassing: agents

note:

- agents zijn heel aanwezig in development op dit punt
- horrorverhalen van hele codebases of zelfs hele systemen die gewist zijn door agents
  - blijft een risico: doen soms zaken zoals testen herschrijven of wissen (of een hacking challenge proberen winnen door eerst een niet-toegelaten website te hacken...)
  - dit is intrinsiek
  - bovendien kunnen prompts ook onbedoelde implicaties hebben
  - **en** het is eigenlijk onmogelijk na training te achterhalen of een model "sleeper" code bevat of poisoned is
- moraal van het verhaal: **geef agents geen toegang tot je hostsysteem**!
  - pizza's bestellen is een herkenbare demo maar geen serieuze toepassing en is intrinsiek onveilig
  - het moet maar één keer grondig fout lopen...

---

## Tekortkomingen containers voor agents

note:

- architecturaal gesproken minder veilig dan VM's
- Docker in Docker is mogelijk, maar kan lastig zijn en vereist hoge privileges om builds te kunnen doen
  - maar veel coding agents hebben zelf Docker nodig om hun applicaties te bouwen
- secrets management: komen **in leesbare vorm** in container terecht
- conclusie: het kan (en Docker heeft het geprobeerd voor de eerste versie van Docker Sandboxes), maar er zijn ernstige implicaties voor veiligheid

---

## Installatie

note:

- zie [website Docker sandboxes](https://www.docker.com/products/docker-sandboxes/)
- M.O.: ze bieden cloudoplossing aan (om je agents daar te laten lopen), wij negeren dat

---

## Basisgebruik

```
cd ~/Projects/mijnproject
sbx run --name opencode-sandbox-mijnproject opencode
```

note:

- OpenCode zou nogal dicht bij Claude liggen qua look and feel
- Ondersteuning voor OpenCode is ingebouwd, dus makkelijk om dat als voorbeeld te gebruiken
- lijkt niet meteen te werken, maar je moet (shortcuts worden weergegeven) switchen naar een gratis model om snel uit te testen
- heeft standaard toegang tot de projectfolder en tot een eigen filesysteem
  - test uit: "Which files are in the current folder? Which are in my home directory? What is my username?"

---

## Monitoren

```
sbx
sbx policy ls
```

note:

- kunnen hier meerdere agents in overzicht staan
- probeer eens uit: "What does the introduction at www.ap.be say?" ⇒ netwerkfout
  - kan hier policy voor die agent aanpassen
  - aangeraden dit stelselmatig te verhogen (betekent dat we soms twee of drie falende requests achter elkaar kunnen krijgen)

---

## Levenscyclus

note:

- vergelijkbaar met containers: sandboxes (de VM's dus) blijven bestaan in gestopte toestand wanneer een agent afsluit, we moeten ze eventueel manueel verwijderen
- kunnen later eventueel andere agent op aansluiten
- kunnen ook verhuizen naar cloudomgeving

---

## Gebruik

note:

- te veel mogelijkheden om in één (of een paar) lessen te doorlopen, dus belangrijkste
- `sbx exec -it <sandbox-name> bash` (zoals voor gewone containers)
- `sbx cp` (om files aan de agent te geven of gegenereerde files op te vragen)
- `sbx secret set` (om secrets in te stellen)

---

## Interactie met Git

note:

- zoals een bind mount: agent heeft toegang tot de projectfolder, kan committen (maar niet pushen) en zelfs commitgeschiedenis wijzigen maar niet pushen
- je kan reviewen met `git diff`
- eventueel kan je een agent een eigen versie van de repo geven via `sbx run --clone`
  - vooral handig als je meerdere agents op hetzelfde project laat werken

---

## Omgeving customizen

- templates
- kits

note:

- template: **snapshot van het gehele filesysteem van de VM**, uitgezonderd mounted onderdelen
  - dus de workspace zelf en koppeling aan de engine worden niet mee gekopieerd, maar geïnstalleerde tools,... wel
  - settings voor de agent (zoals `--publish`,...) worden ook niet overgenomen
  - levert gewoon een archiefbestand dat je kan doorgeven
  - eenvoudig en snel, maar beperkt en niet transparent → minder aanwezig in de documentatie en ik zou het niet snel gebruiken (net zoals `docker commit`)
- kit: declaratieve omschrijving voor hoe je de omgeving bouwt en runt
  - zie een beetje als "Dockerfile en Compose file voor één dienst in elkaar gerold"
  - deelbaar, geschikt om via versiebeheer te delen

---

## Voorbeeld kit: Pi agent

```text
kit
├── files
│   └── home
│       └── .pi
│           └── agent
│               ├── AGENTS.MD
│               ├── models.json
│               └── settings.json
└── spec.yaml
```

---

```yaml
schemaVersion: "1"
kind: agent
name: pi

agent:
  image: "docker/sandbox-templates:shell-docker"
  entrypoint:
    # zie beneden bij commands voor installatie
    run: [pi]

network:
  # dit doet meer aan Compose file denken
  allowedDomains:
    - "registry.npmjs.org" # needed to install Pi and themes
    - "host.docker.internal:1234" # what the agent accesses
    - "localhost:1234" # where that access is routed
    - "auth.docker.io" # Docker Hub
    - "registry-1.docker.io" # Docker Hub
    - "production.cloudfront.docker.com" # Docker Hub
    - "pi.dev" # for info on the Pi agent

commands:
  # de Pi agent kan alleen runnen als hij geïnstalleerd is...
  install:
    - command: "npm install -g --ignore-scripts @earendil-works/pi-coding-agent"
```

---

### settings.json

```text
{
    "defaultProvider": "lmstudio",
    "defaultModel": "prism-ml/bonsai-27b"
}
```

---

```text
{
    "providers": {
        "lmstudio": {
            "baseUrl": "http://host.docker.internal:1234/v1",
            "api": "openai-completions",
            "apiKey": "lm-studio",
            "models": [
                { "id": "prism-ml/bonsai-27b", "name": "Bonsai27B" }
            ]
        }
    }
}
```

---

## Voordelen

note:

- security is ingebakken, niet gewoon tekst in AGENTS.md (want die kan gewoon genegeerd worden)
  - ook geen eindeloze permission popups nodig
- agents mogen Docker gebruiken
- CLI ligt dicht bij die van Docker voor containers

---

## Toepassingsgebied

- VM's: voor agents
- containers: voor klassieke development en voor deployment

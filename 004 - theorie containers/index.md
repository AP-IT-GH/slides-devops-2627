# Wat, waarom, hoe?

---

## Ouderwets

<div class="mermaid">
<pre>
block-beta
columns 1
  block:apps
    app1
    app2
  end
  hostOS["host OS"]
</pre>
</div>

note:

- nog steeds wat gebeurt als je bv. installer doorloopt op Windows
- interferentie tussen applicaties mogelijk
  - zal sneller blijken tijdens developmentwerk dan als typische eindgebruiker
- fragiele dependencystructuur
  - bv. app1 verwacht Python 2 en app2 verwacht Python 3 op het systeem

---

## Recenter

<div class="mermaid">
<pre>
block-beta
columns 1
  block:apps
  columns 2
    app1
    app2
    OS1
    OS2
  end
  hypervisor["hypervisor"]
  hostOS["host OS"]
</pre></div>

note:

- voordeel: interferentie is opgelost
- nadelen:
  - veel gebruik resources (minder met microVMs)
  - apart te onderhouden OS per app
  - soms te geïsoleerd (bv. USB of GPU passthrough opzetten kan moeilijk zijn)

---

## Nog recenter

<div class="mermaid">
<pre>
block-beta
columns 1
  block:apps
  columns 2
    app1
    app2
    dependencies1["dependencies app 1"]
    dependencies2["dependencies app 2"]
  end
  container_engine["container engine"]
  hostOS["host OS"]
</pre></div>

note:

- recenter, maar daarom geen vervanging
  - efficiëntie is altijd mooi meegenomen
  - lagere isolatie is soms nadelig (zie later: Docker Sandboxes)

---

## Docker

note:

- een containeroplossing
- niet de eerste en niet de enige, maar wel als eerste toegankelijk genoeg gebleken voor massa-adoptie
  - bouwt eigenlijk voort op ander werk (LXC), biedt interface op hoger niveau en meer voor packaging van individuele applicaties
  - alternatieven, bv. Podman
    - gebruiken een gemeenschappelijke onderliggende basis genaamd `containerd` voor low-level operaties

---

## Hypervisor vs. container runtime

note:

- hypervisor "verdeelt hardware"
- container runtime "verdeelt OS"
- verdelen OS omvat:
  - filesysteem
  - processen
  - netwerkstack
  - ...

---

## Containers at home

note:

- gebaseerd op https://btholt.github.io/complete-intro-to-containers/chroot
  - start omgeving met `docker run -it --name docker-host --rm --privileged ubuntu:bionic`
- demo filesysteem (tijdens de les ook **in** een (privileged) Ubuntu Bionic container, want OS van de lector gebruikt niet-standaardfilesysteem dat zaken complexer maakt)
  - je kan dit zelf ook runnen nadat je in de labo's Docker hebt geïnstalleerd
  - `mkdir /my-new-root`
  - `echo "my super secret thing" >> /my-new-root/secret.txt`
  - `chroot /my-new-root bash` → verklaar foutmelding
  - `mkdir /my-new-root/bin`
  - `cp /bin/bash /bin/ls /my-new-root/bin/`
  - `chroot /my-new-root bash` → verklaar foutmelding
  - `ldd /bin/bash` (toont shared libraries, i.e. dependencies, op Windows zijn dit DLL files)
  - `mkdir /my-new-root/lib /my-new-root/lib64`
  - `cp /lib/x86_64-linux-gnu/libtinfo.so.5 /lib/x86_64-linux-gnu/libdl.so.2 /lib/x86_64-linux-gnu/libc.so.6 /my-new-root/lib`
  - `cp /lib64/ld-linux-x86-64.so.2 /my-new-root/lib64`
  - idem voor `ls` (`ldd`, files op juiste plaats)
  - `cp /lib/x86_64-linux-gnu/libselinux.so.1 /lib/x86_64-linux-gnu/libpcre.so.3 /lib/x86_64-linux-gnu/libpthread.so.0 /my-new-root/lib`
  - om `secret.txt` te inspecteren ook zelfde voor `cat`
- demo nood aan namespacing
  - zorg dat `chroot`-ed omgeving actief is
  - start een tweede shell op de container (`docker exec -it docker-host bash`)
  - run `tail -f /my-new-root/secret.txt &`
  - achterhaal op de host met `ps` het ID
  - run in de "container at home" `kill` voor dat process ID
  - oplossing: namespaces (voor processen, users, netwerk,...)
- geen demo nodig: resourcegebruik
  - fysieke resources verdelen ("cgroups")

---

## Windows containers?

note:

- aangezien de kernel gedeeld wordt, kunnen containers geen totaal ander OS runnen
- Windows containers bestaan, maar veel minder populair
- Windows heeft ingebouwde virtualisatie van Linux (WSL) dus kan Linux containers runnen
  - vice versa niet
- Mac OS gelijkaardig: runt Linux in verborgen VM

---

## Overzicht

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

## Voorbeeld 1

note:

- https://hub.docker.com/_/mysql
- `docker pull` levert image
- `docker run` voert hem uit (en pullt indien nodig)

---

## Voorbeeld 2

note:

- Dockerfile voor Pythonversie Hello World
- **hoeft** niet `python` image te zijn, maar logische keuze

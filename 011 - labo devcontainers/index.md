## Voorbereiding

- Installeer VSCode extensie voor devcontainers.
- Bekijk de repository in bijlage.

---

## Stap 1

- Zorg dat er een devcontainer voor NodeJS+TypeScript wordt gestart wanneer je het project opent.
  - Zie [mcr.microsoft.com](mcr.microsoft.com) om een geschikte image te vinden.
- De Compose file mag je voorlopig negeren.

---

## Stap 2

- Het project gebruikt Prisma ORM. Configureer je dev container zodat de extensie (met ID `Prisma.prisma`) deel uitmaakt van de ontwikkelomgeving. Tip: er is een tekstgebaseerde en een grafische manier.

---

## Stap 3

- Pas het project aan om de Docker Compose file te gebruiken. VSC blijft verbinden met de container voor de NodeJS applicatie.

---

## Stap 4

- Krijg de web server aan de praat. Zie de README file in de bijlage voor verdere instructies (die niet voor Docker geschreven zijn).
  - Zie [opstartcommando's voor dev containers](https://code.visualstudio.com/remote/advancedcontainers/start-processes) voor de meest gebruiksvriendelijke aanpak.

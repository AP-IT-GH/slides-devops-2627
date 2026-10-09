## Opdracht

- zie "bijlagen" in slides repo
- schrijf een Dockerfile om de gegeven C sharp applicatie te packagen
  - je vindt een goede basis op de voorpagina van [Microsoft Artifact Registry](https://mcr.microsoft.com/)
- tip: start met `sleep infinity` en log in op de container

---

## Opdracht

Ontleed dit commando. Wat doet het?

```
docker run --rm \
-v db-volume:/db:ro \
-v $(pwd):/bu \
debian \
tar cvf /bu/bu.tar /db
```

---

## Opdracht

1. Maak een volume genaamd `dbvolume` aan.
2. Maak een MySQL 9.7.1 container met volgende settings:
  - data komt terecht op het volume `dbvolume`
  - `DitIsGoed` als root wachtwoord
  - default database `DevOps`
  - gebruiker `dbUser` met wachtwoord `DitIsGoed`
3. Maak een tabel aan de hand van de SQL-code op de volgende slide.
4. Maak een eerste rij aan de hand van je eigen gegevens.
5. Maak nu een backup van volume.
6. Upgrade je MySQL naar 9.7.2.

---

## Opdracht

- Start twee `debian` containers op.
- Gebruik `docker inspect` om hun intern IP te achterhalen.
- Laat de ene container de andere pingen.
- Maak een netwerk met `docker network create`.
- Maak een nieuwe container en sluit hem aan (`--help`...)
- Gebruik `docker inspect` en `docker network inspect`. Wat zie je?

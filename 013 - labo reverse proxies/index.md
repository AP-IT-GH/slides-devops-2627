## Opdracht 1

Doorloop [de quickstart](https://doc.traefik.io/traefik/getting-started/docker/) voor Traefik in Docker Compose. Lees aandachtig en neem notities.

---

## Opdracht 2

Doorloop de [Docker setup](https://doc.traefik.io/traefik/setup/docker/), maar niet "Other configuration areas". Experimenteer met de settings, in het bijzonder de labels. Gebruik Git om je aanpassingen ongedaan te kunnen maken.

---

## Opdracht 3

Voeg een Apache web server toe, met daarin een eigen statische website, die je kan bezoeken via `mywebsite.localhost`.

---

## Opdracht 4

Krijg Traefik aan de praat met minimale aanpassingen. Gebruik [de Docker Hub pagina](https://hub.docker.com/_/traefik) en eventueel de Traefik documentatie als leidraad.

```
entryPoints:
  web:
    # dit laat je staan
    address: :8081
providers:
  file:
    # dit zal je moeten aanpassen
    filename: /path/to/dynamic/conf
```

```
http:
  routers:
    to-whoami:
      rule: "Host(`example.localhost`) && PathPrefix(`/whoami/`)"
      middlewares:
        - test-user # zie onder
      service: whoami
  middlewares:
    test-user:
      basicAuth:
        users:
        # run htpasswd -nb usernaamnaarkeuze wachtwoordnaarkeuze om een hashcode te krijgen
        # dit kan bijvoorbeeld in een httpd container
        - user:hashcode
  services:
    whoami:
      loadBalancer:
        servers:
        # dit zal je ook moeten aanpassen
        - url: http://private/whoami-service
```

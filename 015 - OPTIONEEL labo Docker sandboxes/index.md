# \[optioneel\] labo Docker sandboxes

note:

- je hebt de theorieles over Docker sandboxes nodig
- noteer je antwoorden op de vragen: je gebruikt ze in de eindopdracht

---

## Scenario

ACME wil coding agents inzetten op de todo-API.

De security officer vraagt:

> Wat kan er mislopen, en wat houdt Docker Sandboxes tegen?

Jij test dit uit en schrijft een kort advies.

Materiaal: `bijlagen/015` in de slides repository

---

## Takenlijst

1. Installeren en project klaarzetten
2. Grenzen van de sandbox verkennen
3. De agent een feature laten bouwen en reviewen
4. De applicatie draaien, ook in Docker
5. Netwerkbeleid testen
6. Risico's van de gedeelde workspace aantonen
7. Secrets afschermen
8. Werken in clone mode
9. Een kit vervolledigen
10. Opruimen en advies schrijven

---

## Regels van dit labo

- commando's voer je uit **op je host**, tenzij er "in de sandbox" staat
- gebruik enkel de nepwachtwoorden uit deze opgave
- voer de opdrachten met `.git/hooks` enkel uit in `acme-todo`

note:

- Git Bash herschrijft paden: gebruik `export MSYS_NO_PATHCONV=1` als een pad in de sandbox niet klopt (zie les 006)
- geen geschikte laptop? werk samen met iemand anders

---

## 1. Installeren

| Systeem | Commando |
|---|---|
| Windows 11 | `winget install -h Docker.sbx` |
| macOS (Apple silicon) | `brew trust docker/tap` en `brew install docker/tap/sbx` |
| Ubuntu 24.04+ | zie [installatiegids](https://docs.docker.com/ai/sandboxes/install/) |

note:

- Docker Desktop is niet vereist voor `sbx`, maar je gebruikt Docker in dit labo wel op je host
- Linux: KVM moet actief zijn en je gebruiker moet in de groep `kvm` zitten

---

## 1. Enkel Windows

Voer dit uit **vóór** de installatie, in PowerShell als administrator:

```powershell
Enable-WindowsOptionalFeature -Online `
  -FeatureName HypervisorPlatform -All
```

---

## 1. Aanmelden

```bash
sbx login
sbx policy init balanced
sbx diagnose
```

Meldt `sbx diagnose` geen problemen? Dan kan je verder.

note:

- kies je bij een prompt een policy? kies "Balanced"
- `sbx policy init` meldt een fout als er al een policy bestaat: dan is dat in orde

---

## 1. Project klaarzetten

Kopieer `bijlagen/015/acme-todo` naar `~/acme-todo`. Daarna:

```bash
cd ~/acme-todo
git init -b main
git add .
git commit -m "Startpunt ACME"
echo 'ACME_DB_PASSWORD=nep-wachtwoord-123' > .env
```

**Vraag:** waarom mag dit niet in een submap van de slides repository?

---

## 2. Sandbox starten

```bash
cd ~/acme-todo
sbx run --name acme-direct opencode
```

- wacht tot de agent klaar is en kies een gratis model
- vraag: "Which files are in the current folder? Which are in my home directory? What is my username?"
- laat de agent open en bekijk in een **tweede terminal** `sbx` en `sbx ls`

note:

- de eerste keer moet er een image gedownload worden
- de shortcuts om van model te wisselen staan onderaan in OpenCode

---

## 2. Rondkijken

Start op je host een container die we zo zoeken:

```bash
docker run -d --name host-canary nginx
```

Open een shell **in de sandbox**:

```bash
sbx exec -it acme-direct bash
```

---

## 2. Vervolledig deze tabel

| Commando | Host | Container | Sandbox |
|---|---|---|---|
| `uname -r` | | | |
| `whoami` | | | |
| `ls -a ~` | | | |
| `sudo whoami` | | n.v.t. | |
| `docker ps` | | n.v.t. | |

Container: `docker run --rm alpine <commando>`

note:

- onder Windows zijn `uname -r` en `ls -a ~` beschikbaar in Git Bash

---

## Vraag 1

- Welke kernels zijn verschillend?
- Docker Desktop gebruikt ook een VM. Wat blijft dan het verschil tussen containers en sandboxes?
- Zie je `host-canary` in de sandbox? Wat betekent dat voor een agent die Docker gebruikt?

---

## Vraag 2

In les 006 zagen we dat root in een container best vermeden wordt.

Hier heeft de agent `sudo`. Waarom is dat aanvaardbaar?

---

## 3. Feature bouwen

Geef de agent deze opdracht:

> Implement docs/issue-16.md. Do not change any file in test/. Do not commit.

Volg mee in je tweede terminal, op je host:

```bash
git status
```

note:

- geen werkend gratis model? maak de wijziging zelf in de sandbox: de volgende stappen blijven gelijk
- het resultaat verschilt per model

---

## 3. Reviewen

Op je host:

```bash
git diff --stat
git diff -- test/
```

In de sandbox: `npm test`

- Is alles geslaagd?
- Heeft de agent toch iets in `test/` gewijzigd?
- Lees de volledige diff. Commit pas als je tevreden bent.

---

## Vraag 3

De opdracht zei: "Do not change any file in test/".

- Wat garandeert dat de agent dit naleeft?
- Welke controle heb je zelf uitgevoerd die dat wel aantoont?

---

## 4. Applicatie bereiken

```bash
sbx ports acme-direct --publish 8080:3000
```

In de sandbox: `npm start`

Op je host: surf naar `http://localhost:8080/api/todos`

Wat zie je?

---

## Vraag 4

- Waarom lukt dit niet?
- Welke demo uit les 010 lijkt hierop?
- Krijg het werkend **zonder de code aan te passen**. Kijk in `src/server.js`.

---

## 4. Docker in de sandbox

Stop `npm start`. In de sandbox:

```bash
docker build -t acme-todo .
docker run -d --name acme -e HOST=0.0.0.0 \
  -p 3000:3000 acme-todo
docker ps
```

Test opnieuw via poort 8080. Voer daarna **op je host** uit:

```bash
docker ps
docker images | grep acme-todo
```

note:

- faalt de `docker build`? kijk in `sbx policy log acme-direct` welke host geblokkeerd werd

---

## Vraag 5

- Waar staat de image `acme-todo` nu?
- Wat zou je moeten doen om een agent in een gewone container images te laten bouwen?
- Waarom is dat gevaarlijk? Denk aan de Docker socket uit les 006.

---

## 5. Netwerk testen

In de sandbox:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' \
  --max-time 10 https://www.ap.be
```

Op je host:

```bash
sbx policy log acme-direct
sbx policy ls acme-direct
```

Vraag ook aan de agent: "What does the introduction at www.ap.be say?"

---

## 5. Regel toevoegen

```bash
sbx policy allow network --sandbox acme-direct www.ap.be
```

- Herhaal de `curl` en de vraag aan de agent.
- Bekijk opnieuw `sbx policy log acme-direct`.
- Verwijder de regel:

```bash
sbx policy rm network --sandbox acme-direct \
  --resource www.ap.be
```

note:

- de regel staat nu enkel op deze sandbox: zonder `--sandbox` geldt hij voor alle sandboxes
- soms duurt het een of twee pogingen voor een nieuwe regel actief is

---

## Vraag 6

Bekijk alle regels met `sbx policy ls --wide`.

- Welk standaarddomein zou je voor ACME schrappen, en waarom?
- Een agent mag naar `github.com`. Hoe kan die daar broncode mee lekken?
- Schrijf de regel die enkel `GET` en `HEAD` toelaat op `/repos/` van `api.github.com`.

Tip: `sbx policy allow network --help`

---

## 6. De workspace is gedeeld

In de sandbox:

```bash
cat .env
echo 'gemaakt in de sandbox' > uit-sandbox.txt
```

Op je host:

```bash
cat uit-sandbox.txt
rm uit-sandbox.txt
```

---

## 6. Een Git hook plaatsen

Stel: de agent ontspoort. In de sandbox:

```bash
cat > .git/hooks/pre-commit <<'EOF'
#!/bin/sh
echo "hook op $(hostname) als $(whoami)" \
  > HOOK-BEWIJS.txt
EOF
chmod +x .git/hooks/pre-commit
```

Op je host:

```bash
git status
git diff
```

Zie je een wijziging?

---

## 6. De hook afgaan

Op je host:

```bash
git commit --allow-empty -m "Onschuldige commit"
cat HOOK-BEWIJS.txt
hostname
```

Ruim op:

```bash
rm .git/hooks/pre-commit HOOK-BEWIJS.txt
git reset --soft HEAD~1
```

---

## Vraag 7

- Waar is de code van de hook uitgevoerd?
- Waarom hielp je review met `git diff` hier niet?
- Noem drie andere bestanden die via de workspace code op je host kunnen uitvoeren.
- Hoe controleer je de hooks na elke sessie?

---

## 7. Secrets

Op je host, met een **nepsleutel**:

```bash
printf '%s' 'NEP-ACME-SLEUTEL-12345' |
  sbx secret set-custom --host httpbin.org \
  --env ACME_API_KEY --value-stdin
sbx run -d --clone --name acme-clone opencode .
sbx policy allow network --sandbox acme-clone \
  httpbin.org,postman-echo.com
```

Noteer de placeholder die je ziet met `sbx secret ls`.

note:

- de secret moet bestaan voor de sandbox gemaakt wordt
- `set-custom` is experimenteel: bekijk `--help` als de uitvoer afwijkt

---

## 7. Secrets testen

```bash
sbx exec -it acme-clone bash
```

In de sandbox:

```bash
echo "$ACME_API_KEY"
curl -s -H "Authorization: Bearer $ACME_API_KEY" \
  https://httpbin.org/headers
curl -s -H "Authorization: Bearer $ACME_API_KEY" \
  https://postman-echo.com/headers
```

Op je host:

```bash
docker run --rm \
  -e ACME_API_KEY=NEP-ACME-SLEUTEL-12345 alpine env
```

---

## Vraag 8

- Welke waarde ziet de agent in zijn omgeving? En een proces in de container?
- Waar wordt de echte waarde ingevuld?
- Waarom kreeg maar één van de twee sites de echte sleutel?
- `httpbin.org` stuurt de header terug. Wat leer je daaruit over de keuze van `--host`?

---

## 8. Clone mode

Nog steeds in `acme-clone`:

```bash
pwd
ls -a
touch /run/sandbox/source/test.txt
git switch -c feat/clone-test
git config user.name "Agent"
git config user.email "agent@acme.test"
echo "werk van de agent" > agent.txt
git add agent.txt && git commit -m "Werk van de agent"
```

Probeer ook de hook van opdracht 6 opnieuw te plaatsen.

---

## 8. Werk ophalen

Op je host:

```bash
git status
ls -a .git/hooks | grep -v sample
git remote -v
git fetch sandbox-acme-clone
git log --oneline sandbox-acme-clone/feat/clone-test
git diff main..sandbox-acme-clone/feat/clone-test
```

---

## Vraag 9

- Staat `agent.txt` op je host? Waarom wel of niet?
- Waarom bereikte de hook je host nu niet?
- Is `.env` zichtbaar in de clone? En via `/run/sandbox/source`?
- Wanneer kies je clone mode, en wanneer de standaard?

---

## 9. Kit vervolledigen

Kopieer `bijlagen/015/kit-opgave` naar `~/acme-kit` en vul elke `___` aan.

```bash
cd ~
sbx kit validate ./acme-kit --offline
```

Herhaal tot je kit geldig is.

note:

- de theorie toont schema 1: dat wordt nog aanvaard, maar deze opgave gebruikt schema 2
- zie de [documentatie over kits](https://docs.docker.com/ai/sandboxes/customize/kits-v2/)

---

## 9. Kit gebruiken

```bash
cd ~/acme-todo
sbx run opencode --name acme-kit --kit ~/acme-kit .
```

Controleer in een tweede terminal:

```bash
sbx exec acme-kit tree -L 1
sbx exec acme-kit printenv ACME_ENV
sbx exec acme-kit cat AGENTS.md
sbx policy log acme-kit
```

Sluit af en bekijk `git status` op je host.

note:

- de Ubuntu-domeinen in de opgave zijn nodig voor `apt-get`

---

## Vraag 10

- `AGENTS.md` verbiedt andere websites, en `permissions.network.allow` beperkt ze ook. Welke van de twee is echt een beveiliging?
- Waarom verschijnt `AGENTS.md` op je host?
- Waarom verkies je een kit boven een template? Vergelijk met `docker commit`.

---

## Extra: vergiftigde issue

Geef in `acme-direct` de opdracht:

> Fix docs/issue-17.md.

- Bekijk nadien `git status`. Is er een `LEKTEST.txt`?
- Lees `docs/issue-17.md` als **ruwe tekst**.
- Stel `.env` had een echt wachtwoord bevat. Wat houdt de sandbox tegen, en wat niet?

note:

- het resultaat verschilt per model: de vraag blijft ook interessant als de agent niet toehapt
- verwijder `LEKTEST.txt` en draai de wijzigingen terug als je klaar bent

---

## 10. Levenscyclus en opruimen

```bash
sbx exec acme-direct sh -c 'echo bewaard > ~/test.txt'
sbx cp acme-direct:/home/agent/test.txt .
sbx stop acme-direct
sbx ls
sbx run --name acme-direct
```

Bestaat `~/test.txt` nog **in de sandbox**? Sluit de agent af en ruim op:

```bash
sbx rm acme-direct acme-clone acme-kit
sbx secret ls
sbx secret rm --placeholder <placeholder>
docker rm -f host-canary
```

---

## Vraag 11

- Wat bleef behouden na `sbx stop`?
- Wat is verdwenen na `sbx rm`? Wat staat nog op je host?
- Waar stond de commit uit clone mode als je die niet had opgehaald?

---

## 10. Advies aan ACME

Wat houdt de sandbox tegen, en wat blijft jouw taak?

| Risico | Tegengehouden door | Jouw taak |
|---|---|---|
| Hostbestanden wissen | | |
| Code lekken | | |
| API-sleutel lezen | | |

---

## 10. Advies aan ACME (vervolg)

| Risico | Tegengehouden door | Jouw taak |
|---|---|---|
| Git hook plaatsen | | |
| Tests herschrijven | | |
| Kernel exploit | | |

---

## 10. Besluit

Schrijf in drie zinnen:

- Mag ACME coding agents gebruiken?
- Onder welke voorwaarden?
- Welke modus en welk netwerkbeleid raad je aan?

labo gedistribueerd gebruik Git

---

# Opdracht

maak een account aan op GitHub

note:

- Codeberg is een heel mooi alternatief, aanrader voor wie al een GitHub-account heeft

---

# Opdracht

- maak (indien nodig) een SSH-sleutelpaar
- registreer de publieke in je GitHub account

---

# Opdracht

- maak een nieuwe repository op GitHub
  - zet hier **niets** in
    - **geen README, LICENSE,...**
- koppel je repository van labo 1
  - gebruik **SSH, geen HTTPS**

---

# Opdracht

- zorg **lokaal** voor een wijziging
  - maak bv. testlabo2_1.txt aan
- maak een nieuwe commit aan
- wat valt op op GitHub?

---

# Opdracht

- zorg dat de wijziging gespiegeld is

---

# Opdracht

- doe een wijziging via de web interface van GitHub
  - maak bv. testlabo2_2.txt aan
- wat zie je lokaal?

---

# Opdracht

- pas de file met je naam **lokaal** aan en zet er je studierichting in
- commit, maar push niet
- pas dezelfde file via de web interface aan en zet er je leeftijd in
- voer nu de lokale push uit
- wat merk je?
  - lees de boodschap volledig

---

# Opdracht

- voer eerst uit: `git config pull.rebase false`
- voer het commando uit dat na de push werd gesuggereerd
- wat zie je in de terminal?
- wat zie je in de file?
- pas nog niets aan

---

# Opdracht

- installeer [Meld](https://meldmerge.org/) (als je nog geen merge tool hebt)
- run nu `git mergetool`
- kies (via de pijltjes) welke wijzigingen je in de samengevoegde versie wil
  - kies hier voor de versie met je studierichting
- check ook in een gewone text editor het resultaat van de mergetool
- voer een commit uit als je tevreden bent
- run `git status`
  - eventuele restbestanden (`.orig`) mag je verwijderen
- push naar je remote

---

# Opdracht

- verwijder de file met je naam en commit deze wijziging
- push ze naar GitHub
- kan je de file nog ergens terugvinden?
  - denkoefening: wat als deze file permanent moet verdwijnen?

---

# Opdracht

- wis je lokale repository volledig, dus de parent folder van `.git`
- herstel deze
  - gebruik de groene knop op GitHub
  - geef de URI als argument aan `git clone`
  - ga in de map staan
- denkvraag: welk commando is "mutually exclusive" met `git clone`?

---

# Opdracht

- maak in je lokale repository een nieuwe file, `fileA.txt` en commit
- maak er via de web interface een tweede, `fileB.txt`
- pull de remote wijziging naar de lokale repo
- wat merk je?

---

# Opdracht

- verzin een mogelijke bug in je project
- maak er een "Issue" voor aan
- maak een nieuwe commit waarin de bug "opgelost" is en push naar GitHub
- sluit de issue
  - verwerk een verwijzing naar de commit die hem oplost
  - gebruik `#` voor de commit hash
  - wat merk je?

---

# Opdracht

- voorzie je repository van een README die ook verschijnt op GitHub
- [kies een licentie](https://choosealicense.com/) en voeg toe aan je project op GitHub

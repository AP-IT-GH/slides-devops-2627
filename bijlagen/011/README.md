# Devcontainers

Deze repository bevat een eenvoudige webserver in Express geschreven. De webserver maakt een connectie naar een Postgres databank via het Prisma ORM. 

Meer informatie: 
* Postgres: https://www.postgresql.org/
* Express: https://expressjs.com/
* Prisma: https://www.prisma.io/


## Installatie instructies

1. Ga naar de api folder

2. Maak een ```.env``` bestand aan. Inhoud:
> ```DATABASE_URL=postgres://postgres:Newpassword@localhost:5432/postgres```

3. Installeer dependencies
> ```npm install```

4. Maak tabellen aan
> ```npx prisma db push```

5. Seed de databank
> ```npx prisma db seed```


## Run instructies

1. Start de webserver
> ```npm run start```

2. Open browser en ga naar http://localhost:3000 of http://localhost:3000/blog

## Data beheer

Prisma komt met een data beheer dashboard. Om te raadplegen, open een terminal en voer volgend command uit:
> ```npx prisma studio```
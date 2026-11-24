---
title: PostgreSQL
sidebar:
  order: 2
---

Splitty fonctionne par défaut avec **SQLite** (zéro configuration), mais supporte **PostgreSQL 17** via le driver `pgx`.

## Avec Docker Compose

```bash
export POSTGRES_PASSWORD=changez-moi
export JWT_SECRET=changez-moi
docker compose -f docker-compose.yml -f docker-compose.postgres.yml up --build
```

`docker-compose.postgres.yml` ajoute :

- un service `db` (`postgres:17-alpine`) avec healthcheck `pg_isready`, volume `pgdata` ;
- les variables `DB_DRIVER=postgres` et `DATABASE_URL=postgres://splitty:...@db:5432/splitty?sslmode=disable` sur le service `app`.

## En local (backend seul)

```bash
docker run -d --name splitty-pg -p 5432:5432 \
  -e POSTGRES_USER=splitty -e POSTGRES_PASSWORD=splitty -e POSTGRES_DB=splitty \
  postgres:17-alpine

export DB_DRIVER=postgres
export DATABASE_URL="postgres://splitty:splitty@localhost:5432/splitty?sslmode=disable"
go run ./cmd/splitty
```

Les migrations SQL s'appliquent automatiquement au démarrage, quel que soit le moteur.

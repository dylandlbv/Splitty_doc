---
title: PostgreSQL
sidebar:
  order: 2
---

Splitty runs on **SQLite** by default (zero configuration) but supports **PostgreSQL 17** through the `pgx` driver.

## With Docker Compose

```bash
export POSTGRES_PASSWORD=change-me
export JWT_SECRET=change-me
docker compose -f docker-compose.yml -f docker-compose.postgres.yml up --build
```

`docker-compose.postgres.yml` adds:

- a `db` service (`postgres:17-alpine`) with a `pg_isready` healthcheck and a `pgdata` volume;
- the `DB_DRIVER=postgres` and `DATABASE_URL=postgres://splitty:...@db:5432/splitty?sslmode=disable` variables on the `app` service.

## Locally (backend only)

```bash
docker run -d --name splitty-pg -p 5432:5432 \
  -e POSTGRES_USER=splitty -e POSTGRES_PASSWORD=splitty -e POSTGRES_DB=splitty \
  postgres:17-alpine

export DB_DRIVER=postgres
export DATABASE_URL="postgres://splitty:splitty@localhost:5432/splitty?sslmode=disable"
go run ./cmd/splitty
```

SQL migrations are applied automatically at startup, whichever engine is used.

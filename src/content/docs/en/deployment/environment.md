---
title: Environment variables
sidebar:
  order: 3
---

All variables are read at backend startup (`backend/cmd/splitty/main.go`).

| Variable          | Required | Default                 | Purpose                                                            |
| ----------------- | -------- | ----------------------- | ------------------------------------------------------------------ |
| `JWT_SECRET`      | yes      | —                       | JWT signing secret. The backend refuses to start without it.       |
| `DB_DRIVER`       | no       | `sqlite`                | `sqlite` or `postgres`.                                            |
| `SQLITE_PATH`     | no       | `./data/splitty.db`     | SQLite file path (driver `sqlite`).                                |
| `DATABASE_URL`    | if postgres | —                    | PostgreSQL DSN, e.g. `postgres://user:pass@host:5432/db?sslmode=disable`. Required when `DB_DRIVER=postgres`. |
| `ADDR`            | no       | `:8080`                 | API listen address.                                                |
| `ALLOWED_ORIGIN`  | no       | —                       | Allowed CORS origin (e.g. `http://localhost:5173` in dev).         |
| `SPLITTY_PORT`    | no (compose) | `8080`              | Port published by Docker Compose.                                  |
| `POSTGRES_PASSWORD` | if postgres (compose) | —          | Password of the Postgres service.                                  |
| `TEST_DATABASE_URL` | no (tests) | —                     | DSN used by the store test suite.                                  |

:::danger
Pick a long, random `JWT_SECRET` in production. Anyone holding this secret can forge valid tokens.
:::

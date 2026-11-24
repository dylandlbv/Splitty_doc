---
title: Variables d'environnement
sidebar:
  order: 3
---

Toutes les variables sont lues au démarrage du backend (`backend/cmd/splitty/main.go`).

| Variable          | Obligatoire | Défaut                  | Rôle                                                              |
| ----------------- | ----------- | ----------------------- | ----------------------------------------------------------------- |
| `JWT_SECRET`      | oui         | —                       | Secret de signature des JWT. Le backend refuse de démarrer sans.  |
| `DB_DRIVER`       | non         | `sqlite`                | `sqlite` ou `postgres`.                                           |
| `SQLITE_PATH`     | non         | `./data/splitty.db`     | Chemin du fichier SQLite (driver `sqlite`).                       |
| `DATABASE_URL`    | si postgres | —                       | DSN PostgreSQL, ex. `postgres://user:pass@host:5432/db?sslmode=disable`. Obligatoire si `DB_DRIVER=postgres`. |
| `ADDR`            | non         | `:8080`                 | Adresse d'écoute de l'API.                                        |
| `ALLOWED_ORIGIN`  | non         | —                       | Origine autorisée en CORS (ex. `http://localhost:5173` en dev).   |
| `SPLITTY_PORT`    | non (compose) | `8080`                | Port publié par Docker Compose.                                   |
| `POSTGRES_PASSWORD` | si postgres (compose) | —             | Mot de passe du service Postgres.                                 |
| `TEST_DATABASE_URL` | non (tests) | —                     | DSN utilisé par la suite de tests du store.                       |

:::danger
Choisissez un `JWT_SECRET` long et aléatoire en production. Toute personne possédant ce secret peut forger des jetons valides.
:::

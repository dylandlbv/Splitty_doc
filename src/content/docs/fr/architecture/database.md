---
title: Base de données
sidebar:
  order: 3
---

Le schéma est défini dans `backend/internal/store/migrations/0001_init.up.sql` et appliqué automatiquement au démarrage (`store.Migrate`).

## Tables

| Table         | Rôle                                                              |
| ------------- | ----------------------------------------------------------------- |
| `users`       | `id`, `email` (unique), `name`, `password_hash` (bcrypt), `created_at` |
| `households`  | `id`, `name`, `created_at`                                        |
| `memberships` | `(household_id, user_id)`, `role` = `admin` \| `member`           |
| `incomes`     | `(household_id, user_id, month)`, `amount_cents >= 0`             |
| `expenses`    | `id`, `household_id`, `name`, `amount_cents > 0`, `paid_by`, `is_common`, `split_mode` (`equal` \| `proportional`), `month`, `created_at` |

Index : `expenses (household_id, month)` et `incomes (household_id, month)`.

## Deux moteurs supportés

- **SQLite** (défaut) via `modernc.org/sqlite` — pilote purement Go, sans CGO ; chemin configurable avec `SQLITE_PATH`.
- **PostgreSQL 17** via `github.com/jackc/pgx/v5` ; DSN passée par `DATABASE_URL` quand `DB_DRIVER=postgres`.

Les requêtes sont écrites pour rester compatibles avec les deux moteurs (les migrations embarquées gèrent les spécificités).

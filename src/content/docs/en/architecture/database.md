---
title: Database
sidebar:
  order: 3
---

The schema is defined in `backend/internal/store/migrations/0001_init.up.sql` and applied automatically at startup (`store.Migrate`).

## Tables

| Table         | Role                                                              |
| ------------- | ----------------------------------------------------------------- |
| `users`       | `id`, `email` (unique), `name`, `password_hash` (bcrypt), `created_at` |
| `households`  | `id`, `name`, `created_at`                                        |
| `memberships` | `(household_id, user_id)`, `role` = `admin` \| `member`           |
| `incomes`     | `(household_id, user_id, month)`, `amount_cents >= 0`             |
| `expenses`    | `id`, `household_id`, `name`, `amount_cents > 0`, `paid_by`, `is_common`, `split_mode` (`equal` \| `proportional`), `month`, `created_at` |

Indexes: `expenses (household_id, month)` and `incomes (household_id, month)`.

## Two supported engines

- **SQLite** (default) via `modernc.org/sqlite` — pure-Go driver, no CGO; path configurable with `SQLITE_PATH`.
- **PostgreSQL 17** via `github.com/jackc/pgx/v5`; DSN passed through `DATABASE_URL` when `DB_DRIVER=postgres`.

Queries are written to stay compatible with both engines (the embedded migrations handle the specifics).

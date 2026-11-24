---
title: Overview
sidebar:
  order: 1
---

Splitty is a full-stack web app made of a **Go backend** (REST API), a **React frontend**, a **SQLite or PostgreSQL database**, all served by a **single Docker image** (nginx + API).

## Repository layout

```
backend/
├── cmd/splitty/           # entrypoint: env, DB open, migrations, HTTP server
└── internal/
    ├── api/               # HTTP handlers + auth middleware (JWT) + CORS
    ├── auth/              # JWT, bcrypt, ID generation
    ├── domain/            # types + balance calculation engine (unit-tested)
    └── store/             # SQLite / PostgreSQL access + embedded migrations
        └── migrations/    # 0001_init.up.sql

frontend/
└── src/
    ├── api.ts             # typed API client
    ├── auth.tsx           # authentication context
    └── pages/             # Login, Households, Household
```

## Request flow

1. The browser calls `/api/...`; in dev, Vite proxies to the backend on `:8080`; in production, nginx reverse-proxies.
2. The `auth` middleware checks the JWT (`Authorization: Bearer <token>`) and injects the current user.
3. The handler validates the request, then calls the `store` (SQL via `database/sql`) or the `domain` for calculations.
4. The calculation engine (`internal/domain`) produces balances and repayments **outside any database**: it is pure and unit-tested.

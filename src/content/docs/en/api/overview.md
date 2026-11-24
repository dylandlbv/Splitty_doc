---
title: Overview
sidebar:
  order: 1
---

The API is a **REST JSON API** served by the Go backend (net/http) under `/api`. In production nginx reverse-proxies it; in dev, Vite proxies `/api` to `http://localhost:8080`.

## Authentication

Sign-up and login return a **JWT**:

```http
POST /api/auth/login HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{"email":"a@example.com","password":"secret"}
```

All routes except `register` / `login` require the header:

```
Authorization: Bearer <token>
```

## Conventions

- Request bodies and responses are **JSON** (`Content-Type: application/json`).
- All amounts are in **cents** (`amount_cents`, integers).
- Months use the `YYYY-MM` format (e.g. `2025-06`).
- IDs (`id`, `user_id`, `household_id`, `expenseID`) are strings.
- Errors: HTTP 4xx/5xx status with a JSON error body; 401 when the token is missing or invalid.

See the [route reference](/api/reference/).

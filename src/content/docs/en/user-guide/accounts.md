---
title: Accounts and login
sidebar:
  order: 1
---

## Sign up

Create an account with an **email**, a **name** and a **password**. The password is hashed with **bcrypt** before storage — it is never stored in plain text.

- `POST /api/auth/register` → `{email, name, password}` → `{token, user}`

## Log in

- `POST /api/auth/login` → `{email, password}` → `{token, user}`

The response contains a **JWT** to send back in the header of every request:

```
Authorization: Bearer <token>
```

All API routes except `register` and `login` require this header. The token also identifies the current user via `GET /api/me`.

---
title: Households and members
sidebar:
  order: 2
---

A **household** groups the members who share expenses. A user can belong to several households.

## Create a household

- `POST /api/households` → creates a household; you become its **administrator** (`role: admin`).
- `GET /api/households` → lists your households.
- `GET /api/households/{id}` → household details + its members (roles `admin` / `member`).

## Invite a member

Only an **admin** of the household can invite:

- `POST /api/households/{id}/members` with the **email** of an already-registered user → they join the household with the role `member`.

:::tip
Invitations are sent by email to an existing account. Self-service invitation links are a planned evolution.
:::

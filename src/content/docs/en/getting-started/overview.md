---
title: Overview
sidebar:
  order: 1
---

Splitty manages the family budget: everyone declares their monthly income, everyone records what they pay, and the app works out who owes whom — pro rata to what each person earns.

## Features

- **User accounts**: sign up / log in (JWT, passwords hashed with bcrypt).
- **Multi-household**: each household has its members, incomes and expenses. The household creator is an admin and invites other members by email.
- **Monthly incomes**: each member declares their income for each month.
- **Custom expenses**: name, amount, payer, common or personal expense, split **equally** or **proportionally** to declared incomes.
- **Monthly balances**: for each member (paid, share due, balance); and the list of suggested repayments (*who owes what to whom*).

## Tech stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Backend    | Go 1.27 (net/http, database/sql, JWT, bcrypt)          |
| Frontend   | React 19 + TypeScript + Vite + React Router            |
| Database   | SQLite (default) or PostgreSQL 17                      |
| Deployment | Docker Compose (SQLite default; Postgres variant)      |

## Calculation rules at a glance

Only **common** expenses count towards balances; personal expenses are tracked but excluded from repayments. All amounts are stored in **cents** (bigint) to avoid floating-point errors.

See the [calculation engine](/en/architecture/calculation-engine/) for the rounding and repayment rules in detail.

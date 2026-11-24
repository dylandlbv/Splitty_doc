---
title: Route reference
sidebar:
  order: 2
---

All routes except `register` / `login` require `Authorization: Bearer <token>`.

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | `{email, name, password}` → `{token, user}` |
| POST | `/api/auth/login` | `{email, password}` → `{token, user}` |
| GET | `/api/me` | current user |
| GET / POST | `/api/households` | list / create a household |
| GET | `/api/households/{id}` | household + members |
| POST | `/api/households/{id}/members` | invite a member by email (admin) |
| GET | `/api/households/{id}/incomes?month=YYYY-MM` | incomes for the month |
| PUT | `/api/households/{id}/incomes/YYYY-MM` | `{incomes: [{user_id, amount_cents}]}` |
| GET / POST | `/api/households/{id}/expenses` | month's expenses (`?month=`) / create |
| DELETE | `/api/households/{id}/expenses/{expenseID}` | delete |
| GET | `/api/households/{id}/balances/YYYY-MM` | balances + repayments |

## Examples

Declare June's incomes (in cents):

```http
PUT /api/households/HH/incomes/2025-06 HTTP/1.1
Authorization: Bearer <token>
Content-Type: application/json

{"incomes":[{"user_id":"U1","amount_cents":300000},{"user_id":"U2","amount_cents":150000}]}
```

Create a common expense with proportional split:

```http
POST /api/households/HH/expenses HTTP/1.1
Authorization: Bearer <token>
Content-Type: application/json

{"name":"Rent","amount_cents":120000,"paid_by":"U1","is_common":true,"split_mode":"proportional","month":"2025-06"}
```

Read the month's balances and repayments:

```http
GET /api/households/HH/balances/2025-06 HTTP/1.1
Authorization: Bearer <token>
```

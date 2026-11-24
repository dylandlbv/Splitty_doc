---
title: Référence des routes
sidebar:
  order: 2
---

Toutes les routes sauf `register` / `login` exigent `Authorization: Bearer <token>`.

| Méthode | Route | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | `{email, name, password}` → `{token, user}` |
| POST | `/api/auth/login` | `{email, password}` → `{token, user}` |
| GET | `/api/me` | utilisateur courant |
| GET / POST | `/api/households` | lister / créer un foyer |
| GET | `/api/households/{id}` | foyer + membres |
| POST | `/api/households/{id}/members` | inviter un membre par email (admin) |
| GET | `/api/households/{id}/incomes?month=YYYY-MM` | revenus du mois |
| PUT | `/api/households/{id}/incomes/YYYY-MM` | `{incomes: [{user_id, amount_cents}]}` |
| GET / POST | `/api/households/{id}/expenses` | dépenses du mois (`?month=`) / créer |
| DELETE | `/api/households/{id}/expenses/{expenseID}` | supprimer |
| GET | `/api/households/{id}/balances/YYYY-MM` | soldes + remboursements |

## Exemples

Déclarer les revenus du mois de juin (centimes) :

```http
PUT /api/households/HH/incomes/2025-06 HTTP/1.1
Authorization: Bearer <token>
Content-Type: application/json

{"incomes":[{"user_id":"U1","amount_cents":300000},{"user_id":"U2","amount_cents":150000}]}
```

Créer une dépense commune à répartition proportionnelle :

```http
POST /api/households/HH/expenses HTTP/1.1
Authorization: Bearer <token>
Content-Type: application/json

{"name":"Loyer","amount_cents":120000,"paid_by":"U1","is_common":true,"split_mode":"proportional","month":"2025-06"}
```

Lire les soldes et remboursements du mois :

```http
GET /api/households/HH/balances/2025-06 HTTP/1.1
Authorization: Bearer <token>
```

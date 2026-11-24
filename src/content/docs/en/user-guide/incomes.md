---
title: Monthly incomes
sidebar:
  order: 3
---

Each member declares their income for each month. These incomes are the basis for the **proportional split** of common expenses.

- `GET /api/households/{id}/incomes?month=YYYY-MM` → household incomes for the month.
- `PUT /api/households/{id}/incomes/YYYY-MM` → replaces the month's incomes:

```json
{ "incomes": [{ "user_id": "...", "amount_cents": 300000 }] }
```

Amounts are expressed in **cents**: `300000` = €3,000.00.

:::caution
A member with **no declared income** (€0) for a month is **excluded by default** from that month's proportional split. If no member has a declared income, the expense falls back to an **equal** split.
:::

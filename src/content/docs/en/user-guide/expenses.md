---
title: Expenses
sidebar:
  order: 4
---

- `GET /api/households/{id}/expenses?month=YYYY-MM` → lists the month's expenses.
- `POST /api/households/{id}/expenses` → creates an expense.
- `DELETE /api/households/{id}/expenses/{expenseID}` → deletes an expense.

## Expense fields

```json
{
  "name": "Saturday groceries",
  "amount_cents": 8450,
  "paid_by": "<user_id>",
  "is_common": true,
  "split_mode": "proportional",
  "month": "2025-06"
}
```

| Field          | Description                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------- |
| `name`         | Free-form label                                                                                   |
| `amount_cents` | Amount in cents, strictly positive                                                                |
| `paid_by`      | Member who paid                                                                                   |
| `is_common`    | `true` = common expense (counts towards balances), `false` = personal (tracked, excluded from repayments) |
| `split_mode`   | `equal` or `proportional` (pro rata to incomes)                                                   |
| `month`        | Month in `YYYY-MM` format                                                                         |

## Split rules

- **Equal**: the amount is divided into equal shares among all household members (rounded to the cent; the remainder is split equally).
- **Proportional**: `share = income / Σ incomes × amount`. Rounding cents are redistributed one by one, in member order.

---
title: Balances and repayments
sidebar:
  order: 5
---

- `GET /api/households/{id}/balances/YYYY-MM` → month's balances + suggested repayments.

For each household member, the monthly balance shows:

- **paid**: total of common expenses they paid,
- **share due**: their share of common expenses according to the split mode,
- **balance**: `paid − share due` (positive = creditor, negative = debtor).

## Suggested repayments

Repayments are computed with the **greedy method**: from the largest debt to the largest credit. For an equal total amount transferred, this strategy **minimizes the number of payments**.

Only **common** expenses count towards this calculation; personal expenses are excluded.

---
title: Calculation engine
sidebar:
  order: 2
---

The calculation engine lives in `backend/internal/domain` and is **storage-independent**: it takes in-memory data and returns balances + repayments. It is covered by unit tests (`balances_test.go`).

## Principles

- **Amounts in cents** (`bigint`): no floating-point arithmetic, so no accumulated rounding errors.
- **Common expenses only**: personal expenses (`is_common = false`) are tracked but excluded from balances and repayments.

## Splitting an expense

- **Equal** (`equal`): the amount is divided into equal shares among all household members. Rounded to the cent; the remainder is split equally.
- **Proportional** (`proportional`): `share = income / Σ incomes × amount`.
  - A member with **no declared income** (€0) that month is **excluded by default** from the proportional split.
  - If **no** member has a declared income, the expense falls back to an **equal** split.
  - Rounding cents are redistributed one by one, in member order.

## Balances

For each member and each month: `balance = paid − share due` (in cents). Positive = creditor, negative = debtor.

## Repayments (greedy method)

Debtors repay creditors **from the largest debt to the largest credit**. For an equal total amount transferred, this greedy method **minimizes the number of payments** needed to settle the month.

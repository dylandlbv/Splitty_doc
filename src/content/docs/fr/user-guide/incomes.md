---
title: Revenus mensuels
sidebar:
  order: 3
---

Chaque membre déclare son revenu pour chaque mois. Ces revenus servent de base à la **répartition proportionnelle** des dépenses communes.

- `GET /api/households/{id}/incomes?month=YYYY-MM` → revenus du foyer pour le mois.
- `PUT /api/households/{id}/incomes/YYYY-MM` → remplace les revenus du mois :

```json
{ "incomes": [{ "user_id": "...", "amount_cents": 300000 }] }
```

Les montants sont exprimés en **centimes** : `300000` = 3000,00 €.

:::caution
Un membre **sans revenu déclaré** (0 €) pour un mois est **exclu par défaut** de la répartition proportionnelle de ce mois. Si aucun membre n'a de revenu déclaré, la dépense retombe en répartition **égalitaire**.
:::

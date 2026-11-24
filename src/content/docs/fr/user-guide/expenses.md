---
title: Dépenses
sidebar:
  order: 4
---

- `GET /api/households/{id}/expenses?month=YYYY-MM` → liste les dépenses du mois.
- `POST /api/households/{id}/expenses` → crée une dépense.
- `DELETE /api/households/{id}/expenses/{expenseID}` → supprime une dépense.

## Champs d'une dépense

```json
{
  "name": "Courses du samedi",
  "amount_cents": 8450,
  "paid_by": "<user_id>",
  "is_common": true,
  "split_mode": "proportional",
  "month": "2025-06"
}
```

| Champ          | Description                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| `name`         | Libellé libre                                                                                            |
| `amount_cents` | Montant en centimes, strictement positif                                                                 |
| `paid_by`      | Membre qui a payé                                                                                        |
| `is_common`    | `true` = dépense commune (entre dans les soldes), `false` = personnelle (tracée, exclue des remboursements) |
| `split_mode`   | `equal` (égalitaire) ou `proportional` (au prorata des revenus)                                          |
| `month`        | Mois au format `YYYY-MM`                                                                                 |

## Règles de répartition

- **Égalitaire** : le montant est divisé en parts égales entre tous les membres du foyer (arrondi au centime, le reliquat est réparti à titre égal).
- **Proportionnelle** : `part = revenu / Σ revenus × montant`. Les centimes d'arrondi sont redistribués un par un, dans l'ordre des membres.

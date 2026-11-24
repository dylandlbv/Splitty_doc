---
title: Soldes et remboursements
sidebar:
  order: 5
---

- `GET /api/households/{id}/balances/YYYY-MM` → soldes du mois + remboursements suggérés.

Pour chaque membre du foyer, le solde du mois indique :

- **payé** : total des dépenses communes qu'il a payées,
- **part due** : sa part des dépenses communes selon le mode de répartition,
- **solde** : `payé − part due` (positif = créancier, négatif = débiteur).

## Remboursements suggérés

Les remboursements sont calculés par la **méthode gloutonne** : du plus gros débit vers le plus gros crédit. À montant total transféré égal, c'est la stratégie qui **minimise le nombre de virements**.

Seules les dépenses **communes** entrent dans ce calcul ; les dépenses personnelles sont exclues.

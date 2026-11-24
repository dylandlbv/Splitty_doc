---
title: Moteur de calcul
sidebar:
  order: 2
---

Le moteur de calcul vit dans `backend/internal/domain` et est **indépendant du stockage** : il reçoit des données en mémoire et renvoie soldes + remboursements. Il est couvert par des tests unitaires (`balances_test.go`).

## Principes

- **Montants en centimes** (`bigint`) : aucun calcul en virgule flottante, donc aucune erreur d'arrondi cumulée.
- **Dépenses communes uniquement** : les dépenses personnelles (`is_common = false`) sont tracées mais exclues des soldes et des remboursements.

## Répartition d'une dépense

- **Égalitaire** (`equal`) : le montant est divisé en parts égales entre tous les membres du foyer. Arrondi au centime ; le reliquat est réparti à titre égal.
- **Proportionnelle** (`proportional`) : `part = revenu / Σ revenus × montant`.
  - Un membre **sans revenu déclaré** (0 €) ce mois-là est **exclu par défaut** de la répartition proportionnelle.
  - Si **aucun** membre n'a de revenu déclaré, la dépense retombe sur une répartition **égalitaire**.
  - Les centimes d'arrondi sont redistribués un par un, dans l'ordre des membres.

## Soldes

Pour chaque membre et chaque mois : `solde = payé − part due` (en centimes). Positif = créancier, négatif = débiteur.

## Remboursements (méthode gloutonne)

Les débiteurs remboursent les créanciers **du plus gros débit vers le plus gros crédit**. À montant total transféré égal, cette méthode gloutonne **minimise le nombre de virements** nécessaires pour solder le mois.

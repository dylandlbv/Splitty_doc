---
title: Présentation
sidebar:
  order: 1
---

Splitty gère le budget familial : chacun déclare ses revenus mensuels, chacun enregistre ce qu'il paie, et l'application calcule qui doit rembourser qui — au prorata de ce que chacun rapporte.

## Fonctionnalités

- **Comptes utilisateurs** : inscription / connexion (JWT, mots de passe hachés avec bcrypt).
- **Multi-foyers** : chaque foyer a ses membres, ses revenus et ses dépenses. Le créateur d'un foyer est administrateur et invite les autres membres par email.
- **Revenus mensuels** : chaque membre déclare son revenu pour chaque mois.
- **Dépenses personnalisées** : nom, montant, payeur, dépense commune ou personnelle, répartition **égalitaire** ou **proportionnelle** aux revenus déclarés.
- **Soldes mensuels** : pour chaque membre (payé, part due, solde) ; et la liste des remboursements suggérés (*qui doit quoi à qui*).

## Stack technique

| Couche      | Technologie                                            |
| ----------- | ------------------------------------------------------ |
| Backend     | Go 1.27 (net/http, database/sql, JWT, bcrypt)          |
| Frontend    | React 19 + TypeScript + Vite + React Router            |
| Base        | SQLite (par défaut) ou PostgreSQL 17                   |
| Déploiement | Docker Compose (SQLite par défaut ; variante Postgres) |

## Règles de calcul en bref

Seules les dépenses **communes** entrent dans les soldes ; les dépenses personnelles sont tracées mais exclues des remboursements. Tous les montants sont stockés en **centimes** (bigint) pour éviter les erreurs de virgule flottante.

Voir [le moteur de calcul](/architecture/calculation-engine/) pour le détail des règles d'arrondi et de remboursement.

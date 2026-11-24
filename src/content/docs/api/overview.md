---
title: Vue d'ensemble
sidebar:
  order: 1
---

L'API est une **API REST JSON** servie par le backend Go (net/http) sur `/api`. En production, nginx la reverse-proxy ; en dev, Vite proxifie `/api` vers `http://localhost:8080`.

## Authentification

Inscription et connexion renvoient un **JWT** :

```http
POST /api/auth/login HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{"email":"a@exemple.fr","password":"secret"}
```

Toutes les routes sauf `register` / `login` exigent l'en-tête :

```
Authorization: Bearer <token>
```

## Conventions

- Corps et réponses en **JSON** (`Content-Type: application/json`).
- Tous les montants sont en **centimes** (`amount_cents`, entiers).
- Les mois sont au format `YYYY-MM` (ex. `2025-06`).
- Les identifiants (`id`, `user_id`, `household_id`, `expenseID`) sont des chaînes.
- Erreurs : code HTTP 4xx/5xx avec un corps JSON d'erreur ; 401 si le jeton est absent ou invalide.

Voir la [référence des routes](/api/reference/).

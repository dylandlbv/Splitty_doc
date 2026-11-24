---
title: Vue d'ensemble
sidebar:
  order: 1
---

Splitty est une application web full-stack composée d'un **backend Go** (API REST), d'un **frontend React**, d'une **base SQLite ou PostgreSQL**, le tout servi par une **image Docker unique** (nginx + API).

## Arborescence du dépôt

```
backend/
├── cmd/splitty/           # point d'entrée : env, ouverture DB, migrations, serveur HTTP
└── internal/
    ├── api/               # handlers HTTP + middleware auth (JWT) + CORS
    ├── auth/              # JWT, bcrypt, génération d'ID
    ├── domain/            # types + moteur de calcul des soldes (testé unitairement)
    └── store/             # accès SQLite / PostgreSQL + migrations embarquées
        └── migrations/    # 0001_init.up.sql

frontend/
└── src/
    ├── api.ts             # client API typé
    ├── auth.tsx           # contexte d'authentification
    └── pages/             # Login, Households, Household
```

## Flux d'une requête

1. Le navigateur appelle `/api/...` ; en dev, Vite proxifie vers le backend `:8080` ; en production, nginx fait le reverse-proxy.
2. Le middleware `auth` vérifie le JWT (`Authorization: Bearer <token>`) et injecte l'utilisateur courant.
3. Le handler valide la requête, appelle le `store` (SQL via `database/sql`) ou le `domain` pour les calculs.
4. Le moteur de calcul (`internal/domain`) produit soldes et remboursements **hors de toute base de données** : il est pur et testé unitairement.

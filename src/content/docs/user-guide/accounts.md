---
title: Comptes et connexion
sidebar:
  order: 1
---

## Inscription

Créez un compte avec un **email**, un **nom** et un **mot de passe**. Le mot de passe est haché avec **bcrypt** avant stockage — il n'est jamais stocké en clair.

- `POST /api/auth/register` → `{email, name, password}` → `{token, user}`

## Connexion

- `POST /api/auth/login` → `{email, password}` → `{token, user}`

La réponse contient un **JWT** à renvoyer dans l'en-tête de chaque requête :

```
Authorization: Bearer <token>
```

Toutes les routes de l'API, sauf `register` et `login`, exigent cet en-tête. Le jeton permet aussi de retrouver l'utilisateur courant via `GET /api/me`.

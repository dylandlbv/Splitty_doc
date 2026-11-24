---
title: Foyers et membres
sidebar:
  order: 2
---

Un **foyer** (household) regroupe les membres qui partagent des dépenses. Un utilisateur peut appartenir à plusieurs foyers.

## Créer un foyer

- `POST /api/households` → crée un foyer ; vous en devenez **administrateur** (`role: admin`).
- `GET /api/households` → liste vos foyers.
- `GET /api/households/{id}` → détail du foyer + ses membres (rôles `admin` / `member`).

## Inviter un membre

Seul un **administrateur** du foyer peut inviter :

- `POST /api/households/{id}/members` avec l'**email** d'un utilisateur déjà inscrit → il rejoint le foyer avec le rôle `member`.

:::tip
L'invitation se fait par email vers un compte existant. Les liens d'invitation avec auto-inscription sont une piste d'évolution prévue.
:::

---
title: Démarrage rapide
sidebar:
  order: 2
---

## Avec Docker (recommandé)

```bash
export JWT_SECRET=changez-moi
SPLITTY_PORT=8080 docker compose up --build
```

L'application est disponible sur [http://localhost:8080](http://localhost:8080). Les données SQLite sont persistées dans le volume `sqldata`.

Pour utiliser l'image publiée plutôt que de builder localement :

```bash
export JWT_SECRET=changez-moi
docker run -p 8080:80 -e DB_DRIVER=sqlite -e SQLITE_PATH=/data/splitty.db \
  -e JWT_SECRET -v sqldata:/data ghcr.io/dylandlbv/splitty:latest
```

## En développement local

Prérequis : Go 1.27, Node 22+, npm.

1. Backend :

   ```bash
   cd backend
   export JWT_SECRET=dev-secret
   go run ./cmd/splitty        # API sur http://localhost:8080
   ```

2. Frontend (dans un autre terminal) :

   ```bash
   cd frontend
   npm install
   npm run dev                 # http://localhost:5173, /api est proxifié vers :8080
   ```

Les migrations SQL s'appliquent automatiquement au démarrage du backend.

## Ensuite

- Créez un compte, puis un foyer depuis l'interface.
- Consultez le [guide utilisateur](/user-guide/households/) pour inviter des membres et saisir revenus et dépenses.
- Détails de déploiement : [Docker](/deployment/docker/), [PostgreSQL](/deployment/postgres/), [variables d'environnement](/deployment/environment/).

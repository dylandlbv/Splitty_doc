---
title: Docker et Docker Compose
sidebar:
  order: 1
---

## Image publiée

L'image officielle est publiée sur GitHub Container Registry à chaque push sur `main` et à chaque tag `v*` :

```
ghcr.io/dylandlbv/splitty
```

Tags disponibles : `latest`, `sha-<commit>` sur `main` ; `X.Y.Z` / `X.Y` / `X` / `latest` sur un tag git `vX.Y.Z`.

## Lancer avec l'image publiée (SQLite)

```bash
export JWT_SECRET=un-secret-long-et-aleatoire
docker run -d -p 8080:80 \
  -e DB_DRIVER=sqlite -e SQLITE_PATH=/data/splitty.db \
  -e JWT_SECRET \
  -v splitty-data:/data \
  ghcr.io/dylandlbv/splitty:latest
```

## Lancer depuis les sources avec Docker Compose

```bash
export JWT_SECRET=changez-moi
docker compose up --build
```

Le `docker-compose.yml` à la racine build l'image unique (frontend + backend + nginx) et la publie sur le port `${SPLITTY_PORT:-8080}`. Les données SQLite vivent dans le volume `sqldata`.

## Architecture de l'image

Le `Dockerfile` construit dans l'ordre : frontend (Node) → backend (Go) → image finale **nginx** contenant le binaire, les statiques et `docker-entrypoint.sh`. Cet entrypoint lance l'API en fond et nginx en foreground ; si l'API meurt, le conteneur s'arrête.

- nginx sert le frontend et reverse-proxy `/api` vers le backend Go (localhost:8080).
- Pour sortir une version : `git tag v0.1.0 && git push origin v0.1.0`.

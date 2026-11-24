---
title: Docker and Docker Compose
sidebar:
  order: 1
---

## Published image

The official image is published to GitHub Container Registry on every push to `main` and every `v*` tag:

```
ghcr.io/dylandlbv/splitty
```

Available tags: `latest`, `sha-<commit>` on `main`; `X.Y.Z` / `X.Y` / `X` / `latest` on a `vX.Y.Z` git tag.

## Run the published image (SQLite)

```bash
export JWT_SECRET=a-long-random-secret
docker run -d -p 8080:80 \
  -e DB_DRIVER=sqlite -e SQLITE_PATH=/data/splitty.db \
  -e JWT_SECRET \
  -v splitty-data:/data \
  ghcr.io/dylandlbv/splitty:latest
```

## Run from sources with Docker Compose

```bash
export JWT_SECRET=change-me
docker compose up --build
```

The root `docker-compose.yml` builds the single image (frontend + backend + nginx) and publishes it on port `${SPLITTY_PORT:-8080}`. SQLite data lives in the `sqldata` volume.

## Image layout

The `Dockerfile` builds in order: frontend (Node) → backend (Go) → final **nginx** image containing the binary, the static assets and `docker-entrypoint.sh`. This entrypoint runs the API in the background and nginx in the foreground; if the API dies, the container stops.

- nginx serves the frontend and reverse-proxies `/api` to the Go backend (localhost:8080).
- To cut a release: `git tag v0.1.0 && git push origin v0.1.0`.

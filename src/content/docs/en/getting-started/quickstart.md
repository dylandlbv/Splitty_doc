---
title: Quickstart
sidebar:
  order: 2
---

## With Docker (recommended)

```bash
export JWT_SECRET=change-me
SPLITTY_PORT=8080 docker compose up --build
```

The app is available at [http://localhost:8080](http://localhost:8080). SQLite data is persisted in the `sqldata` volume.

To use the published image instead of building locally:

```bash
export JWT_SECRET=change-me
docker run -p 8080:80 -e DB_DRIVER=sqlite -e SQLITE_PATH=/data/splitty.db \
  -e JWT_SECRET -v sqldata:/data ghcr.io/dylandlbv/splitty:latest
```

## Local development

Prerequisites: Go 1.27, Node 22+, npm.

1. Backend:

   ```bash
   cd backend
   export JWT_SECRET=dev-secret
   go run ./cmd/splitty        # API on http://localhost:8080
   ```

2. Frontend (in another terminal):

   ```bash
   cd frontend
   npm install
   npm run dev                 # http://localhost:5173, /api is proxied to :8080
   ```

SQL migrations are applied automatically when the backend starts.

## Next steps

- Create an account, then a household, from the UI.
- See the [user guide](/user-guide/households/) to invite members and enter incomes and expenses.
- Deployment details: [Docker](/deployment/docker/), [PostgreSQL](/deployment/postgres/), [environment variables](/deployment/environment/).

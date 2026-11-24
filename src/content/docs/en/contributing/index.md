---
title: Contributing
sidebar:
  order: 1
---

## Run the tests

```bash
cd backend
go test ./...      # balance engine: shares, rounding, transfers
```

The store suite (`internal/store`) and the register/login integration test run on SQLite through a temp file: no infrastructure needed (`TEST_DATABASE_URL` lets you target Postgres).

```bash
cd frontend
npm ci
npm run build      # tsc --noEmit + vite build
```

## CI/CD

Two GitHub Actions workflows (`.github/workflows/`) in the `Splitty` repo:

- **CI** — on every push to `main` and every PR: gofmt/build/vet/test for the backend, `npm ci` + build (tsc + Vite) for the frontend.
- **Docker** — on every push to `main` and every `v*` tag: build and publish the `ghcr.io/dylandlbv/splitty` image (no secret needed, `GITHUB_TOKEN` is enough).

## Style

- Backend: `gofmt`, `go vet`, packages under `internal/` (api, auth, domain, store); the domain stays pure (no I/O).
- Frontend: strict TypeScript, typed API client in `src/api.ts`.

## Roadmap ideas

- Export / archive of past months, split charts.
- Proportional split with custom weights per expense.
- Self-service invitation links.
- Expense categories and monthly budgets.

## Contributing to this documentation

This documentation lives in the [`dylandlbv/Splitty_doc`](https://github.com/dylandlbv/Splitty_doc) repo (Astro Starlight, FR + EN). To edit it: change the pages in `src/content/docs/` (root = French, `en/` = English), then run `npm run dev` to preview. Deployment to GitHub Pages is automatic on every push to `main`.

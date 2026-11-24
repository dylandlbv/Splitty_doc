---
title: Contribuer
sidebar:
  order: 1
---

## Lancer les tests

```bash
cd backend
go test ./...      # moteur de calcul des soldes : parts, arrondis, transferts
```

La suite du store (`internal/store`) et le test d'intégration register/login tournent sur SQLite via un fichier temporaire : aucune infrastructure n'est nécessaire (`TEST_DATABASE_URL` permet de viser Postgres).

```bash
cd frontend
npm ci
npm run build      # tsc --noEmit + vite build
```

## CI/CD

Deux workflows GitHub Actions (`.github/workflows/`) dans le dépôt `Splitty` :

- **CI** — à chaque push sur `main` et chaque PR : gofmt/build/vet/test du backend, `npm ci` + build (tsc + Vite) du frontend.
- **Docker** — à chaque push sur `main` et chaque tag `v*` : build et publication de l'image `ghcr.io/dylandlbv/splitty` (aucun secret requis, `GITHUB_TOKEN` suffit).

## Style

- Backend : `gofmt`, `go vet`, code en packages `internal/` (api, auth, domain, store) ; le domaine reste pur (pas d'I/O).
- Frontend : TypeScript strict, client API typé dans `src/api.ts`.

## Pistes d'évolution

- Export / archivage des mois précédents, graphiques de répartition.
- Répartition proportionnelle avec quotités personnalisées par dépense.
- Liens d'invitation avec auto-inscription.
- Catégories de dépenses et budgets mensuels.

## Contribuer à cette documentation

Cette documentation vit dans le dépôt [`dylandlbv/Splitty_doc`](https://github.com/dylandlbv/Splitty_doc) (Astro Starlight, FR + EN). Pour la modifier : éditez les pages dans `src/content/docs/` (la racine = français, `en/` = anglais), puis `npm run dev` pour prévisualiser. Le déploiement sur GitHub Pages est automatique à chaque push sur `main`.

# Splitty_doc

Documentation officielle de [Splitty](https://github.com/dylandlbv/Splitty) — application de gestion du budget familial et de calcul des remboursements entre membres d'un foyer.

## Stack de la doc

- **[Astro Starlight](https://starlight.astro.build/)** — générateur de site de documentation (Astro 7).
- **i18n** — français (`/fr/`, langue par défaut) et anglais (`/en/`), avec sélecteur de langue.
- **Déploiement** — GitHub Pages, automatique à chaque push sur `main` via GitHub Actions (`.github/workflows/deploy.yml`).

## Développement local

```bash
npm install
npm run dev       # prévisualisation sur http://localhost:4321
npm run build     # build de production dans dist/
```

## Structure du contenu

```
src/content/docs/
├── fr/
│   ├── index.mdx              # accueil (FR)
├── getting-started/           # présentation + démarrage rapide
├── user-guide/                # comptes, foyers, revenus, dépenses, soldes
├── deployment/                # Docker, PostgreSQL, variables d'environnement
├── architecture/              # vue d'ensemble, moteur de calcul, base de données
├── api/                       # vue d'ensemble + référence des routes
├── contributing/              # tests, CI/CD, comment contribuer
└── en/                        # traduction anglaise (miroir de `fr/`)
```

Pour modifier la doc : éditez les fichiers Markdown/MDX concernés (`fr/` = français, `en/` = anglais), puis poussez sur `main` — le site est redéployé automatiquement.

## Liens

- Site publié : <https://dylandlbv.github.io/Splitty_doc/>
- Code de l'application : <https://github.com/dylandlbv/Splitty>

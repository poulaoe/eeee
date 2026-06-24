# Deploiement GitHub Pages (2 minutes)

## Ce qui est deja configure
- Workflow automatique: `.github/workflows/deploy-pages.yml`
- Deploiement au push sur la branche `main`

## Etapes a faire dans GitHub
1. Ouvrir le depot sur GitHub.
2. Aller dans `Settings` -> `Pages`.
3. Dans `Build and deployment`, choisir `Source: GitHub Actions`.
4. Faire un push sur `main` (ou lancer le workflow manuellement depuis `Actions`).
5. Attendre la fin du workflow `Deploy static site to GitHub Pages`.

## URL du site
- Format habituel: `https://<owner>.github.io/<repo>/`
- Pour ce repo: `https://poulaoe.github.io/eeee/`

## Notes importantes
- Le site est statique: accessible meme si ton PC est eteint.
- Le classement distant continue d'utiliser Supabase.
- Le workflow publie automatiquement tous les fichiers `*.html` et `*.js` du repo (+ dossier `v/` s'il existe).

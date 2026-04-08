# Musa Allama Personal Website Repository

This repository contains the institutional website build for Musa Allama.

## Repository structure

- `.github/` - GitHub Actions workflow for website verification
- `netlify.toml` - root Netlify configuration pointing to the website app
- `personal-website/` - the actual Next.js application

## Main application

The deployable app lives in:

- [`personal-website/`](./personal-website/)

That folder contains:

- the Next.js source code
- content architecture
- automation scripts
- deployment documentation

## Deployment

This repository is configured so Netlify deploys from the `personal-website` directory, not from the repo root.

See:

- [`personal-website/docs/github-netlify.md`](./personal-website/docs/github-netlify.md)
- [`personal-website/docs/deployment.md`](./personal-website/docs/deployment.md)

## Local development

Once Node.js is installed locally:

```powershell
cd .\personal-website
.\scripts\setup-project.ps1
.\scripts\run-dev.ps1
```

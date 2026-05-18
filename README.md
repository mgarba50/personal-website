# Musa Allama Personal Website Repository

This repository contains the institutional website build for Musa Allama.

## Repository structure

- `.github/` - GitHub Actions workflow for website verification
- `personal-website/` - the actual Next.js application

## Main application

The deployable app lives in:

- [`personal-website/`](./personal-website/)

That folder contains:

- the Next.js source code
- content architecture
- deployment documentation
- Supabase schema
- payment and launch documentation

## Deployment

This repository is configured so Vercel deploys from the `personal-website` directory, not from the repo root.

See:

- [`personal-website/docs/deployment-guide.md`](./personal-website/docs/deployment-guide.md)
- [`personal-website/docs/conversion-architecture.md`](./personal-website/docs/conversion-architecture.md)
- [`personal-website/docs/payment-integration-guide.md`](./personal-website/docs/payment-integration-guide.md)
- [`personal-website/docs/post-launch-checklist.md`](./personal-website/docs/post-launch-checklist.md)

## Local development

Once Node.js is installed locally:

```powershell
cd .\personal-website
npm install
npm run dev
```

# MusaAllama.com Institutional Platform

This repository contains the seed implementation for `MusaAllama.com`, built as a Next.js + TypeScript + Tailwind institutional platform rather than a generic portfolio site.

## Included in this build

- Executive homepage and institutional public pages
- Books, library, poetry, courses, media archive, impact, press, shop, and contact architecture
- Structured intake forms and API handlers
- Payment readiness scaffolding for Stripe, Paystack, Flutterwave, and manual transfer
- SEO foundations including metadata, sitemap, robots, and designed error states
- PowerShell automation package in [`scripts/`](./scripts)
- Documentation for setup, deployment, content updates, and owner handoff

## Prerequisites

- Node.js 20+
- npm 10+
- PowerShell 7+ recommended

Note: Node and npm were not available in PATH in the current build environment, so dependency installation and runtime verification were not executed here.

## Quick start

```powershell
cd .\personal-website
.\scripts\setup-project.ps1
.\scripts\run-dev.ps1
```

## GitHub and Vercel wiring

This project currently lives inside a larger root folder that already contains unrelated files. The deployment wiring is set up so you can keep the source in `personal-website` while using the existing root Git repository.

- Root-level [`.github/workflows/personal-website-ci.yml`](../.github/workflows/personal-website-ci.yml) runs validation and build checks only for the website
- Vercel should use `personal-website` as the project root directory

## Common commands

```powershell
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Important folders

- `app/` - Next.js routes, layouts, metadata, APIs
- `components/` - reusable design system and forms
- `content/` - typed content collections and site copy
- `emails/` - restrained HTML email templates
- `lib/` - metadata, validation, search, payments, server helpers
- `public/assets/` - placeholder visuals ready for replacement
- `scripts/` - PowerShell automation package
- `docs/` - deployment, content, and owner guidance
- `tests/` - smoke and validation tests

## Deployment support

- Primary framework configuration is Next.js App Router
- Vercel-ready by default

See [`docs/deployment.md`](./docs/deployment.md) for the deployment playbook.

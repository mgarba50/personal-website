# Deployment Guide

## Local development

1. Install Node.js 20+ and npm 10+.
2. Run `.\scripts\setup-project.ps1`.
3. Update `.env.local` with real values.
4. Run `.\scripts\run-dev.ps1`.

## GitHub workflow

1. Initialize the repository or commit within the existing repo.
2. Push `personal-website` to GitHub.
3. Store environment variables in your deployment provider before production build.

## Vercel

Recommended as the canonical deployment target for this Next.js codebase.

1. Import the repository into Vercel.
2. Set the root directory to `personal-website` if the repo contains other files.
3. Add environment variables from `.env.example`.
4. Deploy.

## Before production deployment

Run these commands:

```powershell
.\scripts\content-check.ps1
.\scripts\validate-assets.ps1
.\scripts\build-production.ps1
.\scripts\deploy-check.ps1
```

## Post-deploy checklist

- Confirm homepage, advisory, canon, library, diwan, impact, press, shop, and contact routes load
- Confirm search returns records
- Confirm form acknowledgements work
- Confirm payment keys are configured or intentionally left inactive
- Replace placeholder media and policy copy with approved production assets and legal text

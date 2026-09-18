# MusaAllama.com Production Deployment Authority

Last reconciled: 2026-09-18

## Authoritative source

- Repository: `mgarba50/personal-website`
- Branch: `master`
- Application root: `personal-website/`
- Vercel project: `personal-website`
- Vercel project ID: `prj_lv9tE5OVHY0nckOH8Mljr5vbaKG4`
- Vercel scope/team: `mgarba50s-projects`
- Vercel team ID: `team_0RltCXqqT9vE1V8gvR6MgxAy`

The GitHub/Vercel integration confirmed a successful deployment from the reconciled master line on 2026-09-18.

## Canon placement contract

- `/books` — general books only.
- `/books/archive` — recovered general-publication identities supported by archive evidence but not yet promoted to confirmed standalone publications.
- `/al-maqam` — Main and Extended Diwan Canon.
- `/al-maqam/archive/*` — Diwan archive/reconciliation evidence.
- Legacy `/books/...` Diwan routes may exist only as redirects for continuity.
- Public Diwan assets belong under `public/assets/al-maqam/`.

## Deployment identity endpoint

`/api/deployment-authority`

This endpoint deliberately exposes only non-secret deployment provenance:

- authoritative repository and branch;
- application root;
- Vercel project/team IDs;
- Vercel environment;
- deployment URL;
- Git commit branch and SHA when Vercel system variables are available;
- Canon reconciliation version and route contract.

It uses `Cache-Control: no-store` so deployment verification does not depend on stale page caches or search-engine snapshots.

## Operational rule

A production reconciliation is complete only when all of the following agree:

1. GitHub `master` contains the intended Canon state.
2. Vercel reports a successful deployment for that master commit.
3. The production domain serves the same deployment identity through `/api/deployment-authority`.
4. `/books`, `/books/archive`, `/al-maqam`, and representative Canon detail routes reflect their assigned collections.
5. Private/paid manuscript masters remain outside public assets.

If the Vercel connector cannot inspect the project because its OAuth session lacks the `mgarba50s-projects` scope, re-authorize that Vercel scope before attempting manual promotion, rollback, domain reassignment, or environment changes.

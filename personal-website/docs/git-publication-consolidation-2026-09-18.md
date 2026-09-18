# Git Publication Consolidation — 2026-09-18

## Authoritative source

The authoritative public website source is:

- Repository: `mgarba50/personal-website`
- Branch: `master`
- Application root: `personal-website/`

`mgarba50/allama-absolute` is a separate specification/test repository and is not the MusaAllama publishing website.

`mgarba50/personal-website-repository` is a legacy/private parallel build. It must not be used as the publication source unless a future migration explicitly supersedes this policy.

## Canon placement

### General Books Canon

Public route: `/books`

Use for non-Diwan books, manuals, commercial titles, verified completed manuscripts, and developing general publications.

### Al-Maqam / Diwan Canon

Public route: `/al-maqam`

Use for:

- Main Canon — `DIW-CAT-001` through `DIW-CAT-050`;
- Extended Canon — independently verified additional works;
- Archive & Reconciliation — `DIW-ARC-*` evidence records for aliases, index-only works, legacy covers, edition families, and unresolved identities.

Legacy `/books/...` Diwan URLs are retained only as redirects when needed for link continuity. Diwan public assets belong under `/public/assets/al-maqam/`, not `/public/assets/books/`.

## Public Git boundary

The repository may publish:

- canonical book metadata;
- publication status;
- approved cover assets;
- approved previews;
- public catalogue pages;
- archive/reconciliation evidence pages;
- public documentation.

Complete private or paid manuscript masters remain outside public Git unless an explicit public-edition decision authorizes them.

## Branch reconciliation performed

The following publication-related branches were compared against the current authoritative line before this consolidation:

- `publication/full-canon-repair-2026-09-18` — behind `master`; no unique work remains to port.
- `canon-completed-books-v2-2026-09-01` — behind `master`; superseded.
- `canon-completed-books-2026-09-01` — older completed-book implementation; its valid completed-manuscript work is already represented in the newer master architecture.
- `publication/2026-09-01-borderless-zill-reconciled` — older Borderless/Zill publication implementation; valid material is already represented, while its `/books` Diwan placement is superseded.
- `publication/2026-09-01-borderless-zill-canon` — older publication/homepage implementation; superseded by the current Canon architecture.
- `canon-publication-2026-09-01` — older checkout/book-detail implementation; current `master` contains the safer Canon-aware publication state logic.
- `codex/restructure-musaallama.com-for-monetization` — older commerce restructuring; do not merge wholesale over the current Canon.

Old branches remain historical evidence. They are not the authoritative publication state and should not be merged wholesale after `master` has advanced.

## Placement repairs in this consolidation

- The Zill Diwan public cover/preview package is moved from `public/assets/books/diwan-al-zill-al-mutaman/` to `public/assets/al-maqam/diwan-al-zill-al-mutaman/`.
- The Zill Canon preview path is updated to the Al-Maqam namespace.
- `Diwan al-Hayat` remains out of the general Books shelf and its legacy `/books/diwan-al-hayat` URL continues to redirect to Al-Maqam.
- `ديوان الظل المؤتمن` remains out of the general Books shelf and its legacy `/books/diwan-al-zill-al-mutaman` URL continues to redirect to its Al-Maqam Canon page.
- Archive/reconciliation records receive stable `DIW-ARC-*` identities and public evidence pages without being falsely counted as confirmed standalone books.

## Operating rule

New publication work should land on a branch created from current `master`, preserve existing Canon IDs, and be merged only after checking placement, publication state, cover authority, preview authority, and private-master exposure.

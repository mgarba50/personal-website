# MusaAllama Canon Placement Policy

Last reconciled: 2026-09-18

## 1. Public publishing surfaces

### `/books` — General Books Canon
Use this route for non-Diwan publications: commercial books, completed general manuscripts, manuals, strategic works, and developing non-Diwan titles.

A title may appear here before commercial release only when its status is explicit. “Coming soon”, “completed manuscript”, “developing work”, and “release-ready” are different states and must not be collapsed.

### `/al-maqam` — Al-Maqam / Diwan Canon
Use this route for the Arabic Diwan corpus and its archival reconciliation layer.

- Main Canon: DIW-CAT-001 through DIW-CAT-050.
- Extended Canon: independently verified works beyond the original fifty.
- Archive & Reconciliation: aliases, edition families, index-only works, legacy-cover witnesses, and unresolved identities.

Do not place a Diwan in the general Books shelf merely because it has a public preview or a legacy `/books/...` URL.

## 2. Legacy routes

Historical URLs should redirect to the correct current collection rather than creating duplicate public identities.

- `/books/diwan-al-zill-al-mutaman` redirects to `/al-maqam/diwan-al-zill-al-mutaman`.
- `/books/diwan-al-hayat` redirects to `/al-maqam` while its standalone identity remains under archive reconciliation.

Additional misplaced Diwan routes should follow the same pattern.

## 3. Private masters and public Git

The public repository may contain:

- canonical metadata;
- approved cover assets;
- approved preview files;
- public catalogue and release pages;
- public documentation.

The public repository must not contain complete private or paid manuscript masters unless a specific public-edition decision explicitly authorizes them.

“Publish the Canon” means publish the public identity and approved public package, not expose restricted source masters.

## 4. Edition and duplicate discipline

- Preserve old editions and covers as evidence.
- Never create a second Canon work from an edition label alone.
- Do not bind an ambiguous cover to a similarly named manuscript without identity evidence.
- Use redirects and metadata reconciliation instead of deleting historical routes blindly.
- Do not count composite dossiers as independent books unless their component work is independently verified.

## 5. Git branch discipline

Old publication branches may contain useful history but must not be merged wholesale after `master` has advanced.

Before merging an older branch:

1. compare it against current `master`;
2. identify genuinely missing work;
3. port only the missing or superior implementation;
4. avoid reintroducing superseded routing, payment, content, or layout code;
5. verify build and deployment after the consolidated commit.

The authoritative public code line is `master` in `mgarba50/personal-website` unless deployment configuration explicitly establishes another source.

## 6. Status integrity

Never present any of the following as equivalent:

- manuscript evidence;
- verified complete manuscript;
- publication package evidence;
- cover candidate;
- release-ready private master;
- publicly released edition;
- commercial title.

Each status must be stated independently so the Canon remains trustworthy.

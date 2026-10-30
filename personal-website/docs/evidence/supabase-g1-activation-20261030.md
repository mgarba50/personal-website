# Supabase G1/G2 activation evidence — 30 October 2026

Project: `rhxztdjosriejkxllrny`. The connected project's application schema and the three flagship object paths match this repository. Vercel's configured project URL/keys still require confirmation because its team API returns HTTP 403.

## Applied database preparation

| Recorded version | Migration | Source |
| --- | --- | --- |
| 20261030193844 | g1_g2_accounts_manual_delivery | `supabase/20261030_g1_g2.sql` |
| 20261030194448 | g1_g2_role_policy_indexes | `supabase/migrations/20261030194448_g1_g2_role_policy_indexes.sql` |

The CLI created the follow-up migration; its filename was aligned with the recorded remote version. Existing schema/secure-content SQL files predate this migration history. Do not run a blind `db push` or reapply `schema.sql`; reconcile the existing baseline/history first.

The [pre-migration snapshot](supabase-pre-g1-schema-20261030.json) records columns, constraints, indexes, enums and grants. Exact counts confirmed all 18 existing application tables and Auth users were empty. The snapshot contains no customer rows, credentials or private object contents. It is not a full database/storage backup or a demonstrated restore.

## Verified access controls

- All 23 public application tables have RLS enabled.
- The only ordinary-client table grant is authenticated SELECT on `app_user_roles`, restricted by the own-user policy. Clients cannot assign their own role.
- All eight commerce RPCs use invoker rights. Anonymous/authenticated EXECUTE is denied; service-role execution remains granted.
- All four storage buckets remain private; Storage object RLS is enabled and no permissive client Storage policy exists.
- The final Supabase security and performance advisors reported no ERROR or WARN findings. Informational notes remain for 22 intentionally server-only tables, unused indexes and nine pre-existing foreign-key index opportunities.

Reference notices: [server-only tables without client policies](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy), [foreign-key index guidance](https://supabase.com/docs/guides/database/database-linter?lint=0001_unindexed_foreign_keys), [unused-index guidance](https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index). Do not grant public access merely to silence informational notices.

## Live verification

- Seventeen SQL assertions passed: server order creation/idempotency, payload conflict, denied unauthorised review/issue, pending-delivery denial, receipt state/duplicate handling, anonymous/customer operational-record and RPC denial, and private Storage row denial.
- These SQL checks ran in one transaction that was rolled back. Follow-up counts confirmed zero orders, receipts, tokens, audit events, delivery attempts and Auth users remained.
- Twelve actual HTTP checks passed using the enabled publishable key: four anonymous table-read denials, one privileged-RPC denial, six private-file endpoint denials and an accepted public Auth settings request.
- Email signup is enabled and automatic email confirmation is disabled. No signup or email was sent.
- Six live public routes returned HTTP 200: health, home, Academy, the Agrochemical Sales Field Guide, Corporate and Inner Circle.
- The local PostgreSQL/API/compiled-HTTP suites passed again after the follow-up SQL: 29 + 70 + 42 = 141 assertions. Lint had zero errors and the same nine existing warnings. The prior production build and full runtime crawl remain applicable to the unchanged application runtime.

These checks establish database-level and anonymous HTTP denials. They do not replace the live signed-in owner/customer/browser journey or inbox delivery verification.

## Existing private assets

All 394 storage objects remain in place: 47 product files, two lead-magnet files and 345 source-vault files. No file or bucket visibility was changed.

| Approved flagship path in product-files | Recorded bytes | Recorded MIME type |
| --- | --- | --- |
| products/the-modern-farmer/digital-reader.pdf | 907207 | application/octet-stream |
| products/agrochemical-sales-field-guide/digital-reader.pdf | 2540252 | application/octet-stream |
| products/chinese-for-agrochemical-professionals/digital-reader.pdf | 1016908 | application/octet-stream |

The three objects exist. Their actual PDF bytes, title/edition/credit and checksum still require protected download verification. Generic MIME metadata needs review through the Storage API after the files are opened. Storage metadata was not changed directly with SQL.

## Activation still open

- Vercel team access and confirmation of its production/preview URL, runtime, key names and disabled commerce flag.
- A real confirmed operator account and an explicit database admin grant to that verified Auth UUID. There are currently no Auth accounts or admin roles.
- Auth SMTP/templates, the book sender and designated-recipient inbox delivery.
- Actual protected PDF/edition checks, signed-in customer isolation, browser QA and the controlled owner-performed bank transaction.
- GitHub Actions account billing unlock. Its test job did not start; local suites and Vercel builds are separate evidence.
- Backup/restore demonstration and the later completion gates.

The frontend candidate remains in draft PR #23. Production's route-repair release remains the public baseline; live database preparation does not declare G1/G2 or the full website complete.

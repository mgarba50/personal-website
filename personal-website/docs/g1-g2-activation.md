# G1/G2 account, payment-review and private-delivery candidate

This is an implementation candidate based on the working production route repair
at `c3952a9`. It is not a declaration that G1/G2 have passed their live gates.

## Resulting behaviour

- Supabase Auth supplies sign-in, email confirmation, password recovery and sign-out.
  Server-side `getUser()` validates sessions; the protected `app_user_roles` table
  is the role authority. Self-edited profile metadata never grants admin access.
- The three currently available flagship books use one server-side publication,
  price and delivery mapping. A persistent order and reference exist before bank
  instructions are shown. Guest access uses an HttpOnly capability cookie;
  account-associated orders also require the account that placed them.
- Receipt bytes, size (4 MB maximum) and fields are validated. The expected order amount is
  immutable and separate from the amount the customer reports paying. A receipt
  stays pending until a real bank credit is verified by an administrator.
- Protected staff pages review receipts, reject or approve payment, issue/resend
  delivery and revoke links. The bank reference is unique to prevent approving
  two orders against one transfer. Review/issue actions have an audit trail.
- Only an approved order can receive download links. Tokens are hashed in the
  database, expire after 72 hours and allow three atomic link claims. The final
  file URL lasts 30 seconds, supporting large PDFs without streaming through a
  small function response. Issuing fresh links revokes previous ones.
- A signed-in customer can see their own new orders and request fresh links.
  Guest and older order support remains available. Old receipt/token records are
  retained; valid legacy downloads require a matching approved receipt.
- Resend/Postmark dispatch is implemented and failures are recorded. A sender
  acknowledgement is not a claim that a message reached the recipient's inbox.
- Public chat and click tracking are excluded from account, checkout and staff
  pages. Public-to-private link navigation loads a fresh document so public chat
  code cannot remain attached to a private page.

Bundles remain enquiries until every advertised book/bonus is deliverable.
Courses, appointments and memberships remain enquiries until their separate
delivery/access gates are implemented. No placeholder entitlement accepts payment.

## Validation performed locally

- Executed PostgreSQL migrations, RLS and transaction functions in PGlite:
  **29 assertions passed**, including idempotent migration, own-role visibility,
  denied self-promotion, private-record denial, duplicate orders/reviews, unique
  bank references, expiry, revocation and atomic usage limits.
- API/access regression suite backed by the same real PostgreSQL implementation:
  **70 assertions passed**. Auth, storage and mail boundaries are isolated fixtures;
  no real email or bank transaction was sent.
- Compiled Next.js HTTP flow using the real Supabase SDK and Server Actions:
  **42 assertions passed**. Includes sign-in/cookies, password recovery/confirmation,
  private-page chat exclusion, staff/customer isolation, receipt review, customer
  downloads and persistent order history. Auth/storage endpoints are isolated
  fixtures, not live Supabase evidence.
- Production build and TypeScript passed; 264 generated pages in this candidate.
- ESLint: zero errors, nine existing image/preflight warnings.
- Publication and structural route guards passed. The candidate runtime crawl
  checked 112 sitemap routes, 152 pages, 23 assets, 10 redirects and seven unknown
  slugs with zero failures. The private-file repository audit also passed.
  Repeat these checks against the actual deployed candidate before cutover.

## Runtime and environment

The installed Supabase SDK requires Node 22 or newer. The package and CI pin
Node 24, matching the tested runtime. Verify that the hosting project honours it.

Keep values in the appropriate private environment configuration. Do not paste
secrets into a PR, report or chat. Required names:

- `NEXT_PUBLIC_SITE_URL=https://www.musaallama.com`
- `NEXT_PUBLIC_SUPABASE_URL`
- One of `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- Private bucket names from `.env.example`
- `EMAIL_PROVIDER`, `EMAIL_FROM`, and the selected Resend/Postmark server key
- `COMMERCE_ENABLED=false` until the live checks below pass

Use separate non-production configuration for previews. If unavailable, leave
their backend keys and commerce activation unset; use isolated fixtures for tests.
Never run a test fixture against production or substitute production credentials
into the test harness.

## Database migration and operator setup

1. Back up the existing database and inventory pending/approved historical receipts.
2. For an existing project, do not rerun `schema.sql` (it creates existing types and
   tables). Confirm the earlier secure-content migration is present, then apply
   `supabase/20261030_g1_g2.sql` in the intended Supabase project.
3. The migration is additive and transactional. It adds the account role, order,
   audit, delivery and rate-limit tables/functions, protects operational tables,
   and keeps the four default content/receipt buckets private. Inspect any existing
   Storage policies and any custom bucket names; bucket flags alone do not prove
   that unrelated authenticated users are denied access.
4. Register and confirm the owner's intended operator account. In the trusted SQL
   console, grant its actual Auth UUID an admin role using the following template.
   Replace the value locally with the verified UUID. No admin is automatically
   seeded from an email address, a public signup field or profile metadata.

```sql
insert into public.app_user_roles(user_id, role)
select id, 'admin' from auth.users
where id = '<verified-auth-user-uuid>'::uuid and email_confirmed_at is not null
on conflict(user_id) do update set role = excluded.role;
```

5. Confirm the account can enter `/admin` and that an ordinary customer cannot.
   Verify that revoking its role takes effect on the next privileged request.

## Confirmation and recovery email

Enable email confirmation and configure the Supabase Auth sender/SMTP. Its mail
configuration is separate from the book-delivery sender. Set the canonical Site
URL and allow the intended `/auth/callback` and `/auth/confirm` destinations.

Default PKCE callback links are supported. For confirmation/recovery that can be
opened on another device, use the server confirmation page in the Auth templates:

```text
Signup:   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup
Recovery: {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery
```

The landing page requires a confirmation button, so a mail scanner's GET does not
consume the token. Test signup, recovery, expired/used links and sign-out using
owner-controlled accounts before release. Do not claim that a configured sender
has delivered until the designated recipient actually receives the message.

## Readiness and cutover

From the application root with an untracked environment file:

```text
npm ci
npm run test:database
npm run test:commerce
npm run lint
npm run build
npm run test:http
node --env-file=.env.local scripts/check-commerce-readiness.mjs
```

The readiness script is read-only and logs only check names/results. It checks
schema columns, an explicit admin role, private bucket metadata, approved PDF
existence, anonymous file-access denial and sender-key presence. It does not send
email, transfer money, prove the content is the correct edition or prove that all
other authenticated users are denied Storage access.

Before enabling live orders, verify bank settings against the actual account,
open the three approved full PDFs, test sender delivery to a designated address,
and exercise another customer's denial of receipts/files. The owner performs any
real test transfer; software tests never assert that money moved.

Publish a reviewed candidate with commerce disabled, apply/verify its matching
database migration and account settings, then enable the flag and redeploy only
when ready for the controlled live order. Confirm the live source/deployment
identity and repeat the public crawl plus the protected acceptance journey.
Do not merge or promote solely because the mock-backed tests passed.

## Recovery and older receipts

- Email failed: check sender configuration; use the approved order's reissue/resend
  action. Earlier token links are revoked, so send only the newest delivery.
- Duplicate or unclear bank reference: retain the pending/rejected record and
  review the real bank ledger. Never approve a duplicate transfer twice.
- Historical approved receipts: retain their original reference/status/evidence.
  The legacy issuer script verifies an approved matching receipt; the download
  handler checks it again atomically. Resolve inconsistent old statuses with the
  operator before changing them, and never ask a customer to pay again just to
  create a new-system order.
- Failed receipt persistence: the new uploaded object is removed where possible.
  Inventory private orphan objects after outages using order references and logs;
  never delete an unknown historical receipt blindly.
- Rollback: disable commerce first, retain the additive tables and all new orders,
  and restore the known working public release. Do not drop tables or erase order
  evidence as a rollback operation.

## Current external blockers

The Vercel connection returned HTTP 403 for `mgarba50s-projects`, so live environment
configuration, the hosting runtime and private backend state are not verified.
An authorised account connection and the matching database setup are required
before the live gates can be marked passed. Browser QA of the new protected
preview is pending. GitHub Actions was account-billing-locked during the preceding
release; local checks remain the evidence until that job actually executes.

Implementation references consulted: Supabase's official Next.js server-side Auth
guide and the installed `@supabase/ssr` / `@supabase/supabase-js` sources and types.

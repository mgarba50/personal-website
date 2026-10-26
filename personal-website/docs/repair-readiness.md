# Website repair readiness

The repair continues PR #21 and preserves the publication registries, manuscripts,
existing prices, bank details, and Headquarters / Corporate / Academy / Inner Circle
architecture. Al-Maqam remains a separately reachable literary collection.
The original Inter, Cormorant Garamond, and Amiri typefaces are now self-hosted
with their original licenses so compilation does not depend on Google Fonts.

## Commerce operation

Checkout and receipt submission resolve the same registered product and price.
Only Academy books marked both `available` and `purchasable` can accept payment.
Receipts remain pending until a human approves the bank transfer. Uploading proof
does not grant access or prove that funds arrived.

After checking payment, an operator updates the matching `manual_payment_proofs`
record to `payment_approved`. The existing `issue-download-token.mjs` script now
requires an approved record matching the order, book slug, and customer email.
It produces the existing `/api/download/<token>` URL, which now has a handler.
The handler validates expiry, revocation, usage count, and the secure manifest;
it reads the private object and atomically increments usage before returning an
attachment. Neither a storage credential nor a permanent public PDF URL is sent
to the browser. Concurrent claims cannot exceed the token limit.

## Required before live commerce sign-off

- Verify `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the target
  environment. No live credentials were supplied to the local repair checkout.
- Apply existing schema/storage migrations and
  `supabase/20261027_commerce_access.sql`. This enforces RLS and removes anonymous
  and ordinary authenticated access to receipt records and download tokens.
- Confirm `payment-receipts`, `product-files`, and `source-vault` remain private;
  verify the three purchasable books exist at the secure manifest object paths.
- Test one receipt → manual approval → issued token → PDF download using a test
  order, including an expired token. Automated commerce tests mock Supabase and
  do not prove that remote credentials, tables, or objects exist.
- Stripe, Paystack, and Flutterwave configuration placeholders remain intact.
  Automated provider initialization/webhooks and email delivery are not implemented
  by the existing checkout; manual bank transfer and operator delivery remain the
  active workflow. Do not describe those placeholders as live integrations.

`The Global Seeker` has no cover asset in this checkout. Its descriptive record
remains available without a broken image; supply the approved cover separately.
Publication candidates remain inquiries, even where a complete manuscript exists.
Completeness does not establish commercial release authority.

## Regression verification

- `npm run verify:site`: registered destinations, internal literal links, cover and
  image references, sitemap destinations, release gates and unknown products.
- `npm run test:commerce`: forged products/prices, receipt signatures/size,
  pending review, token expiry/revocation/limits, manifest binding, concurrent
  claims, private delivery headers, and missing configuration.
- `npm run build`: existing publication and structural route guards, site guard,
  TypeScript validation, and production compilation.
- `node scripts/smoke-site.mjs http://127.0.0.1:3100`: runtime route and checkout
  checks against a running production server.

Production merge/deployment requires owner approval.

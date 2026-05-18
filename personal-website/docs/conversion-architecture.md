# Phase 2 Conversion Architecture

Every major public route now points to a measurable action. Links and submit buttons use `data-conversion` attributes, and the global `ConversionTracker` sends events to `/api/conversions`.

## Primary routes

| Route | Commercial role | Primary actions |
| --- | --- | --- |
| `/books` | The Canon catalog | `view_book_catalog`, `view_book`, `buy_book` |
| `/books/agro-logistics-across-the-great-divide` | Full sales page | `buy_book`, `book_advisory`, `apply_membership` |
| `/courses` | The Madrasa catalog | `view_course_catalog`, `view_course`, `enroll_course` |
| `/courses/chinese-for-importers` | Course sales page | `enroll_course`, `view_free_preview` |
| `/courses/hydroponics-practical-certification` | Course sales page | `enroll_course`, `view_free_preview` |
| `/advisory` | Advisory services | `book_advisory`, `send_inquiry` |
| `/membership` | Premium access tiers | `apply_membership`, `open_dashboard` |
| `/library` | SEO acquisition | `read_library`, `subscribe_dispatch`, `buy_book`, `enroll_course` |
| `/checkout` | Payment selection | `select_payment_stripe`, `select_payment_paystack`, `select_payment_flutterwave`, `submit_manual_payment` |
| `/dashboard` | Customer retention | `open_dashboard`, `apply_membership`, `enroll_course`, `book_advisory` |

## Action categories

- Buy: `buy_book`, `checkout_book_stripe`, `checkout_book_paystack_flutterwave`, `checkout_book_manual`
- Enroll: `enroll_course`, `view_free_preview`
- Book: `book_advisory`, `checkout_advisory_stripe`, `checkout_advisory_manual`
- Inquire: `send_inquiry`
- Subscribe: `subscribe_dispatch`
- Apply: `apply_membership`

## Production storage

The Supabase schema includes `conversion_events` with:

- `action`
- `label`
- `href`
- `path`
- `user_id`
- `metadata`
- `created_at`

The current `/api/conversions` route acknowledges events. In production, connect it to Supabase and optionally forward the same events to Vercel Analytics, Google Analytics, or Meta/TikTok pixels.

## Funnel verdict target

The site should move from executive profile to commercial platform by measuring:

- Book sales page views to checkout starts
- Course page views to enroll clicks
- Advisory page views to booking/inquiry
- Library visits to newsletter/resource capture
- Membership page visits to applications
- Checkout starts to payment provider selection

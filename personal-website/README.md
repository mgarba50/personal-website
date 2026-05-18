# MusaAllama.com - Institutional Digital Headquarters

MusaAllama.com is structured as a premium institutional platform for books, courses, strategic advisory, agro-industrial intelligence, memberships, publishing, and legacy archive work.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL schema
- Payment-ready checkout routes for Stripe, Paystack, Flutterwave, and manual bank transfer
- API stubs for newsletter, inquiries, and manual payment proof

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Important files

- `lib/content.ts` - launch content for books, courses, articles, advisory services, memberships, and lead magnets
- `supabase/schema.sql` - database schema
- `.env.example` - environment variable guide
- `docs/payment-integration-guide.md` - payment flow guide
- `docs/conversion-architecture.md` - measurable action map for books, courses, advisory, membership, library, checkout, and dashboard
- `docs/content-update-guide.md` - content update guide
- `docs/deployment-guide.md` - Vercel and Supabase guide
- `docs/backup-export-instructions.md` - backup/export guide
- `docs/post-launch-checklist.md` - launch checklist

## V1 included

- Home page
- Executive dossier
- Books section with product pages
- Checkout route and payment provider paths
- Courses listing and course pages
- Strategic advisory section and service pages
- Contact form
- Newsletter signup
- Basic admin dashboard
- Member dashboard
- Legal pages
- SEO metadata and JSON-LD on key pages

## V2 direction

- Full Supabase Auth integration
- Live Stripe, Paystack, and Flutterwave checkout
- Course LMS progress tracking
- Membership subscription billing
- Certificate generation
- Advanced admin analytics
- Private client vault

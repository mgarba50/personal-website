# GitHub + Vercel Wiring

## Current repository shape

The Git repository root is one level above the website:

- Git root: `C:\Users\Allama\OneDrive\Archives\Old_PC_Files\Documents\New project`
- Website app: `C:\Users\Allama\OneDrive\Archives\Old_PC_Files\Documents\New project\personal-website`

That means GitHub and Vercel need to treat `personal-website` as the deployable application directory.

## What is already wired

- Root GitHub Actions workflow validates the website subtree
- The Next.js app is self-contained under `personal-website`
- Vercel only needs the project root directory set to `personal-website`

## Recommended GitHub flow

1. Push from the repository root.
2. Keep staging scoped to the website app and workflow files when unrelated files exist in the wider root.

Example:

```powershell
cd "C:\Users\Allama\OneDrive\Archives\Old_PC_Files\Documents\New project"
git add personal-website .github
git commit -m "Update Musa Allama website"
git push origin master
```

## Recommended Vercel flow

1. Import the GitHub repository into Vercel.
2. Set **Root Directory** to `personal-website`.
3. Framework preset should auto-detect as **Next.js**.
4. Build command should remain `next build` or `npm run build`.
5. Add environment variables from `personal-website/.env.example`.
6. Deploy.

## Required environment variables

At minimum, set:

- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_NOTIFICATION_EMAIL`
- `PRESS_CONTACT_EMAIL`
- `BOOKINGS_CONTACT_EMAIL`
- `NEWSLETTER_FROM_EMAIL`

Then add integration keys as needed:

- `RESEND_API_KEY`
- `STRIPE_SECRET_KEY`
- `PAYSTACK_SECRET_KEY`
- `FLUTTERWAVE_SECRET_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `DATABASE_URL`

## Important note

The root repository still contains unrelated untracked files. If you only want the website deployment changes in GitHub, stage only:

- `personal-website/`
- `.github/`

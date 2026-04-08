# GitHub + Netlify Wiring

## Current repository shape

The Git repository root is one level above the website:

- Git root: `C:\Users\Allama\OneDrive\Archives\Old_PC_Files\Documents\New project`
- Website app: `C:\Users\Allama\OneDrive\Archives\Old_PC_Files\Documents\New project\personal-website`

That means GitHub and Netlify need to treat `personal-website` as the deployable application directory.

## What has already been wired

- Root [`netlify.toml`](../../netlify.toml) sets `base = "personal-website"`
- Root GitHub Actions workflow validates the website subtree
- Website-local Netlify config still exists as a fallback if you later extract the app into its own repo

## Recommended GitHub flow

1. Create an empty GitHub repository, for example `musaallama-site`
2. Add the remote from the repo root
3. Stage only the website deployment files and the website app
4. Commit
5. Push

Example:

```powershell
cd "C:\Users\Allama\OneDrive\Archives\Old_PC_Files\Documents\New project"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git add personal-website .github netlify.toml
git commit -m "Initial Musa Allama institutional website"
git push -u origin master
```

## Recommended Netlify flow

1. In Netlify, choose **Add new site** from Git
2. Select GitHub
3. Choose the repository you pushed
4. Confirm the base directory is `personal-website`
5. Confirm the build command is `npm run build`
6. Confirm Node version is `20`
7. Add environment variables from `personal-website/.env.example`
8. Deploy

## Required Netlify environment variables

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

The root repository still contains unrelated untracked files. If you only want the website on GitHub, stage only:

- `personal-website/`
- `.github/`
- `netlify.toml`

# Deployment Guide

## Vercel

1. Push this repository to GitHub.
2. Create a new Vercel project from the repository.
3. Add environment variables from `.env.example`.
4. Configure the production domain `musaallama.com`.
5. Run the production build.

## Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Enable Row Level Security before accepting real users.
4. Add authenticated user, admin, and public read policies.

## Email

Use Resend or Postmark for:

- Welcome email
- Purchase confirmation
- Download delivery
- Course enrollment
- Booking confirmation
- Membership renewal reminder
- Contact form notification

# Content Update Guide

Public launch content is separated into `lib/content.ts`.

Update these collections:

- `books`
- `courses`
- `advisoryServices`
- `articles`
- `membershipTiers`
- `leadMagnets`

Each public page reads from those records. In production, these records can be migrated into Supabase tables or a headless CMS while preserving the same fields.

## Books

Add title, slug, subtitle, category, description, reader audience, learning points, table of contents, author note, formats, related books, and price.

## Courses

Add title, slug, category, description, learning outcomes, modules, audience, duration, certificate text, price, and free preview lessons.

## Articles

Add SEO title, meta description, category, excerpt, reading time, related products, and article paragraphs.

# Content Guide

## Where to edit content

- Site-wide copy and navigation: `content/site.ts`
- Books: `content/collections/books.ts`
- Articles: `content/collections/articles.ts`
- Poetry: `content/collections/poems.ts`
- Courses: `content/collections/courses.ts`
- Products: `content/collections/products.ts`
- Initiatives: `content/collections/initiatives.ts`
- Media archive: `content/collections/media.ts`

## Asset workflow

1. Replace placeholder SVGs in `public/assets/` with approved images or production assets.
2. Keep filenames lowercase with hyphens.
3. Run `.\scripts\validate-assets.ps1` after replacing files.

## Books

Each book record supports:

- title
- subtitle
- slug
- abstract
- themes
- audience
- languages
- formats
- status
- commerceMode
- cover
- featured
- excerpt

## Articles

Each article record supports:

- title
- slug
- summary
- category
- tags
- date
- readingTime
- featured
- cover
- downloadablePdf
- body

## Poetry

Each poem record supports:

- title
- slug
- collection
- summary
- audioLabel
- arabicText
- translation
- notes

## Governance reminders

- Keep slugs unique
- Keep titles precise and institutional in tone
- Replace seeded placeholder copy with approved real copy before public launch
- Run `.\scripts\content-check.ps1` before building for production

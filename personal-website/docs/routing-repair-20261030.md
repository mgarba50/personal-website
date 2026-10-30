# Public navigation repair

The three-wing navigation linked to registered records without matching Next.js
route handlers. For example, the Academy linked to
`/academy/agriculture-development/agrochemical-sales-field-guide`, while the
production app had only `app/academy/page.tsx`. Legacy book redirects led to
the same missing destinations.

This repair restores topic and product pages in the Academy, Corporate service
pages, Inner Circle collections and entries, and the indexed Diwan records.
Static parameters come from the existing content registries. Unknown records
and mismatched book/topic combinations continue to return a real HTTP 404.
The new pages use the existing layout, prices and publication status. Purchase
buttons require an available, purchasable edition with a listed price.

The route guard now runs before every production build. The GET-only runtime
crawler checks every sitemap URL, follows rendered internal links, checks
referenced images, exercises legacy book redirects, and verifies unknown slugs.
It excludes dormant not-found markup serialized inside Next.js script data.

Broken cover references for Nurturing Seekers of Truth and The Soul Who Will
Never Disappoint now use existing approved assets. The Global Seeker is shown
without a cover until an approved asset exists.

## Local verification

- `npm ci --no-audit --no-fund`: passed.
- `npm run build`: publication guard, route guard, TypeScript and production
  compilation passed; 262 static pages generated.
- `npm run verify:runtime -- http://127.0.0.1:3100`: passed against the production
  server: 112 sitemap URLs, 146 page requests, 23 referenced assets, 9 legacy
  redirects and 7 unknown-slug checks; zero failures.
- `git diff --check`: passed.

After deployment, run the same runtime check against
`https://www.musaallama.com` to verify the public domain serves the repair.

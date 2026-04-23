# The Allama Institute Deployment Notes

The Institute portal is implemented inside the main Next.js application at `/institute`.

## Local Testing

```powershell
npm run dev
```

Then open:

```text
http://localhost:3000/institute
```

## Main Site Linking

The primary navigation now includes `The Institute`, routed to `/institute`.

The Institute portal itself links back to:

- `https://musaallama.com/canon`
- `https://musaallama.com/operations`
- `https://musaallama.com/endowments`

The main site includes redirects from `/operations` to `/agro-industrial` and from `/endowments` to `/impact`.

## Subdomain Readiness

The code includes a Next.js proxy that rewrites:

```text
https://institute.musaallama.com/
```

to:

```text
/institute
```

To activate this in Netlify, add `institute.musaallama.com` as a domain alias for the same Netlify site and point the DNS record to Netlify according to the Netlify domain setup instructions.

If a fully separate Netlify site is preferred later, the Institute portal can be extracted into its own Vite/React project while preserving the same curriculum data and UI direction.

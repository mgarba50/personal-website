# Madrasa Portal Notes

The Allama Institute LMS is now served directly from the main Next.js application at `/madrasa`.

## Local Testing

```powershell
npm run dev
```

Then open:

```text
http://localhost:3000/madrasa
```

## Main Site Linking

The primary navigation uses the existing `The Madrasa` item as the canonical entry point.

The portal links back into the main site through:

- `/`
- `/canon`
- `/operations`
- `/endowments`

The main site includes redirects from `/operations` to `/agro-industrial` and from `/endowments` to `/impact`.

## Legacy Path

The previous `/institute` route now redirects internally to `/madrasa` so old links do not break.

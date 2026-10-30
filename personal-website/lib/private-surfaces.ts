export const isPrivateSurface = (path: string) => /^\/(admin|dashboard|account|auth|checkout|login|signup|forgot-password)(\/|$)/.test(path);

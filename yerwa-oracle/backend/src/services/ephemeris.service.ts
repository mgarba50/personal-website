import { computePlanetaryHours } from './planetary-hour.service.js';
import { env } from '../config/env.js';

export async function syncEphemeris(lat: number, lon: number) {
  if (!env.ephemerisApiUrl) {
    return { source: 'local-fallback', data: computePlanetaryHours(lat, lon) };
  }

  const url = `${env.ephemerisApiUrl}?lat=${lat}&lon=${lon}`;
  const resp = await fetch(url, { headers: env.ephemerisApiKey ? { Authorization: `Bearer ${env.ephemerisApiKey}` } : {} });
  if (!resp.ok) {
    throw new Error(`Ephemeris API failed: ${resp.status}`);
  }
  const data = await resp.json();
  return { source: 'ephemeris-api', data };
}

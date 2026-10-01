import { LOCATION_PRESETS } from '../config/constants.js';
import { computePlanetaryHours } from './planetary-hour.service.js';

const bootTime = Date.now();

export async function fetchNodeTelemetry() {
  const started = Date.now();
  const nodes = LOCATION_PRESETS.map((loc) => {
    const hours = computePlanetaryHours(loc.lat, loc.lon);
    return {
      label: loc.label,
      lat: loc.lat,
      lon: loc.lon,
      timezone: hours.timezone,
      currentLord: hours.current.lord,
      nextHourStart: hours.nextBest.start
    };
  });

  return {
    uptimeSeconds: Math.floor((Date.now() - bootTime) / 1000),
    apiLatencyMs: Date.now() - started,
    nodes
  };
}

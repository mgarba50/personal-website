export const DEFAULT_LOCATION = {
  label: 'Maiduguri, Nigeria',
  lat: 11.8466,
  lon: 13.1571,
  timezone: 'Africa/Lagos',
  source: 'default'
};

export const LOCATION_PRESETS = [
  DEFAULT_LOCATION,
  { label: 'Beijing, China', lat: 39.9042, lon: 116.4074, timezone: 'Asia/Shanghai', source: 'preset' },
  { label: 'Shanghai, China', lat: 31.2304, lon: 121.4737, timezone: 'Asia/Shanghai', source: 'preset' },
  { label: 'Abu Dhabi, UAE', lat: 24.4539, lon: 54.3773, timezone: 'Asia/Dubai', source: 'preset' },
  { label: 'Dubai, UAE', lat: 25.2048, lon: 55.2708, timezone: 'Asia/Dubai', source: 'preset' }
] as const;

export const PLANET_SEQUENCE = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];

import SunCalc from 'suncalc';
import tzlookup from 'tz-lookup';
import { DateTime } from 'luxon';
import { PLANET_SEQUENCE } from '../config/constants.js';

function chaldeanForWeekday(weekday: number): string {
  const dayLords = ['Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Sun'];
  return dayLords[weekday - 1];
}

export function computePlanetaryHours(lat: number, lon: number, dateISO?: string) {
  const tz = tzlookup(lat, lon);
  const now = dateISO ? DateTime.fromISO(dateISO, { zone: tz }) : DateTime.now().setZone(tz);
  const times = SunCalc.getTimes(now.toJSDate(), lat, lon);
  const sunrise = DateTime.fromJSDate(times.sunrise, { zone: tz });
  const sunset = DateTime.fromJSDate(times.sunset, { zone: tz });
  const nextSunrise = sunrise.plus({ days: 1 });

  const dayHourMinutes = sunset.diff(sunrise, 'minutes').minutes / 12;
  const nightHourMinutes = nextSunrise.diff(sunset, 'minutes').minutes / 12;

  const dayLord = chaldeanForWeekday(now.weekday);
  const dayStartIdx = PLANET_SEQUENCE.indexOf(dayLord);

  const hours = Array.from({ length: 24 }).map((_, idx) => {
    const isDay = idx < 12;
    const start = isDay ? sunrise.plus({ minutes: idx * dayHourMinutes }) : sunset.plus({ minutes: (idx - 12) * nightHourMinutes });
    const end = isDay ? sunrise.plus({ minutes: (idx + 1) * dayHourMinutes }) : sunset.plus({ minutes: (idx - 11) * nightHourMinutes });
    const lord = PLANET_SEQUENCE[(dayStartIdx + idx) % PLANET_SEQUENCE.length];
    return { index: idx + 1, start: start.toISO(), end: end.toISO(), lord };
  });

  const current = hours.find((h) => now >= DateTime.fromISO(h.start!) && now < DateTime.fromISO(h.end!)) ?? hours[0];
  const nextBest = hours.find((h) => h.lord === 'Jupiter' || h.lord === 'Venus') ?? hours[1];
  return { timezone: tz, current, nextBest, hours };
}

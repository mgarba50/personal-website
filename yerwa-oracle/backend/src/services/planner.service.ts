import { DateTime } from 'luxon';
import { computePlanetaryHours } from './planetary-hour.service.js';

const goalAffinity: Record<string, string[]> = {
  contract: ['Mercury', 'Jupiter'],
  travel: ['Moon', 'Mercury'],
  money: ['Jupiter', 'Venus'],
  health: ['Sun', 'Jupiter'],
  authority: ['Sun', 'Saturn'],
  study: ['Mercury', 'Moon'],
  love: ['Venus', 'Moon'],
  protection: ['Saturn', 'Mars']
};

export function planElection(goal: string, lat: number, lon: number) {
  const data = computePlanetaryHours(lat, lon);
  const favored = goalAffinity[goal] || ['Jupiter'];
  const windows = data.hours
    .map((h) => {
      const score = Math.max(0, 100 - Math.abs((favored.indexOf(h.lord) + 1) * 20));
      return { ...h, score, note: `Best for ${goal} when ${h.lord} governs.` };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0'];
  windows.forEach((w, i) => {
    ics.push('BEGIN:VEVENT');
    ics.push(`UID:yerwa-${i}@oracle`);
    ics.push(`DTSTAMP:${DateTime.now().toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'")}`);
    ics.push(`DTSTART:${DateTime.fromISO(w.start!).toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'")}`);
    ics.push(`DTEND:${DateTime.fromISO(w.end!).toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'")}`);
    ics.push(`SUMMARY:Yerwa Election - ${goal} (${w.lord})`);
    ics.push('END:VEVENT');
  });
  ics.push('END:VCALENDAR');

  return { timezone: data.timezone, windows, ics: ics.join('\n') };
}

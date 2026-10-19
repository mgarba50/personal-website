import { computePlanetaryHours } from './planetary-hour.service.js';

const figures = ['Via', 'Populus', 'Fortuna Major', 'Albus', 'Rubeus', 'Conjunctio', 'Carcer', 'Acquisitio'];
const gates = ['radiance', 'permanence', 'royalty', 'decree'] as const;

type ResonanceBand = 'silence' | 'calm' | 'focus' | 'longing' | 'distress';

function seedFrom(input: string): number {
  return [...input].reduce((s, c, i) => s + c.charCodeAt(0) * (i + 1), 0);
}

function resonance(question: string): { band: ResonanceBand; score: number; cues: string[] } {
  const score = Math.min(100, question.length * 2);
  if (score < 20) return { band: 'silence', score, cues: ['Pause', 'Observe'] };
  if (score < 40) return { band: 'calm', score, cues: ['Steady pace', 'Low risk'] };
  if (score < 60) return { band: 'focus', score, cues: ['Act with precision', 'Clarify intent'] };
  if (score < 80) return { band: 'longing', score, cues: ['Avoid haste', 'Seek alignment'] };
  return { band: 'distress', score, cues: ['Protect resources', 'Delay confrontation'] };
}

function localizedFigure(name: string, lang: string) {
  const ar: Record<string, string> = { Via: 'الطريق', Populus: 'الجماعة', 'Fortuna Major': 'السعد الأكبر', Albus: 'الأبيض', Rubeus: 'الأحمر', Conjunctio: 'الاقتران', Carcer: 'السجن', Acquisitio: 'الاكتساب' };
  return lang === 'ar' ? ar[name] || name : name;
}

const signalsMap: Record<string, string[]> = {
  Via: ['travel', 'routes', 'opportunity'],
  Populus: ['market', 'communication', 'delay'],
  'Fortuna Major': ['authority', 'opportunity', 'healing'],
  Albus: ['communication', 'home', 'study'],
  Rubeus: ['danger', 'restriction', 'authority'],
  Conjunctio: ['communication', 'routes', 'opportunity'],
  Carcer: ['restriction', 'delay', 'home'],
  Acquisitio: ['market', 'money', 'opportunity']
};

export function castOracle(payload: { name: string; question: string; gate: (typeof gates)[number]; language: string; location: { lat: number; lon: number } }, snippets: string[]) {
  const seed = seedFrom(`${payload.name}:${payload.question}:${payload.gate}`);
  const figure = figures[seed % figures.length];
  const hourData = computePlanetaryHours(payload.location.lat, payload.location.lon);
  const emo = resonance(payload.question);
  const signals = signalsMap[figure] || ['communication'];
  const tafsir = payload.language === 'ar'
    ? `بوابة ${payload.gate} تشير إلى ${localizedFigure(figure, 'ar')} تحت ساعة ${hourData.current.lord}. حالة ${emo.band} توصي بالتركيز على ${signals.slice(0,2).join(' و')}.`
    : `Gate ${payload.gate} reveals ${figure} under the hour of ${hourData.current.lord}. The resonance is ${emo.band}, emphasizing ${signals.slice(0, 2).join(' and ')}.`;

  const fused = snippets.length ? `${tafsir} ${payload.language === 'ar' ? 'إشارات معرفية:' : 'Knowledge echoes:'} ${snippets.join(' | ')}` : tafsir;

  return {
    seed,
    figures: [figure],
    figureNames: [localizedFigure(figure, payload.language)],
    tafsir: fused,
    resonance: emo,
    signals,
    planetaryHour: hourData.current,
    timingNote: payload.language === 'ar' ? 'تجنب الاستعجال قبل الساعة التالية المناسبة.' : 'Avoid rushing before the next favorable hour.',
    bestNextHour: hourData.nextBest,
    timezone: hourData.timezone
  };
}

import { env } from '../config/env.js';

export async function synthesizeTafsir(input: {
  gate: string;
  hourLord: string;
  language: string;
  resonance: string;
  signals: string[];
  snippets: string[];
  question: string;
  name: string;
}) {
  if (!env.llmApiUrl) {
    const preface = input.language === 'ar' ? 'تحليل مركب:' : 'Synthesized briefing:';
    return `${preface} Gate=${input.gate}, Hour=${input.hourLord}, Resonance=${input.resonance}. Signals=${input.signals.join(', ')}. Knowledge=${input.snippets.join(' | ') || 'none'}.`;
  }

  const response = await fetch(env.llmApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(env.llmApiKey ? { Authorization: `Bearer ${env.llmApiKey}` } : {})
    },
    body: JSON.stringify({
      task: 'oracle_rag_synthesis',
      ...input
    })
  });

  if (!response.ok) {
    throw new Error(`LLM API failed: ${response.status}`);
  }

  const body = await response.json() as { text?: string };
  return body.text || '';
}

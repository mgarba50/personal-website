import { Request, Response } from 'express';
import { castOracle } from '../services/oracle.service.js';
import { KnowledgeItem } from '../models/KnowledgeItem.js';
import { cosine, embedText } from '../services/embed.service.js';
import { Session } from '../models/Session.js';
import { decryptText, encryptText } from '../services/crypto.service.js';
import { synthesizeTafsir } from '../services/rag.service.js';

async function topKnowledge(q: string) {
  const items = await KnowledgeItem.find().limit(300);
  const qv = embedText(q);
  return items
    .map((item) => ({ item, score: cosine(qv, item.embedding || []) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item, score }) => ({
      id: item._id,
      title: item.title,
      page: item.page,
      excerpt: decryptText(item.excerptEncrypted),
      score
    }));
}

export async function cast(req: Request, res: Response) {
  const payload = req.body;
  const hits = await topKnowledge(`${payload.name} ${payload.question} ${payload.gate}`);
  const reading = castOracle(payload, hits.map((h) => h.excerpt));
  const session = await Session.create({
    userId: (req as Request & { userId: string }).userId,
    castEncrypted: encryptText(JSON.stringify({ ...reading, knowledgeHits: hits })),
    seed: reading.seed,
    notesEncrypted: encryptText('')
  });
  res.json({ ...reading, knowledgeHits: hits, sessionId: session._id });
}

export async function rapid(req: Request, res: Response) {
  const payload = req.body;
  const reading = castOracle(payload, []);
  res.json(reading);
}

export async function synthesize(req: Request, res: Response) {
  const { gate, hourLord, language, resonance, signals, snippets, question, name } = req.body;
  const text = await synthesizeTafsir({ gate, hourLord, language, resonance, signals, snippets, question, name });
  res.json({ tafsir: text });
}

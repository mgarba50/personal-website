import { Request, Response } from 'express';
import { KnowledgeItem } from '../models/KnowledgeItem.js';
import { cosine, embedText } from '../services/embed.service.js';
import { decryptText } from '../services/crypto.service.js';

function project(item: any, score?: number) {
  return {
    id: item._id,
    title: item.title,
    page: item.page,
    excerpt: decryptText(item.excerptEncrypted),
    tags: item.tags,
    locale: item.locale,
    source: item.source,
    score
  };
}

export async function listKnowledge(_req: Request, res: Response) {
  const items = await KnowledgeItem.find().sort({ createdAt: -1 }).limit(200);
  res.json(items.map((i) => project(i)));
}

export async function searchKnowledge(req: Request, res: Response) {
  const q = String(req.query.q || '').toLowerCase();
  const items = await KnowledgeItem.find().limit(500);
  const filtered = items.filter((item) => {
    const excerpt = decryptText(item.excerptEncrypted).toLowerCase();
    const tags = (item.tags || []).join(' ').toLowerCase();
    return excerpt.includes(q) || tags.includes(q) || String(item.title || '').toLowerCase().includes(q);
  });
  res.json(filtered.slice(0, 30).map((i) => project(i)));
}

export async function semanticSearch(req: Request, res: Response) {
  const q = String(req.query.q || '');
  const qv = embedText(q);
  const items = await KnowledgeItem.find().limit(500);
  const ranked = items
    .map((item) => ({ item, score: cosine(qv, item.embedding || []) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ item, score }) => project(item, score));
  res.json(ranked);
}

export async function deleteKnowledge(req: Request, res: Response) {
  await KnowledgeItem.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}

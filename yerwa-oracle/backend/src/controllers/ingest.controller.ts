import { Request, Response } from 'express';
import pdfParse from 'pdf-parse';
import { KnowledgeItem } from '../models/KnowledgeItem.js';
import { embedText } from '../services/embed.service.js';
import { encryptText } from '../services/crypto.service.js';

export async function ingestUpload(req: Request, res: Response) {
  if (!req.file) return res.status(400).json({ error: 'PDF required' });
  const parsed = await pdfParse(req.file.buffer);
  const pages = parsed.text.split('\n\f\n').filter(Boolean);
  const title = req.file.originalname.replace(/\.pdf$/i, '');

  const saved = await Promise.all(pages.map((content: string, idx: number) => {
    const excerpt = content.slice(0, 240);
    const tags = Array.from(new Set((excerpt.match(/\b[a-zA-Z]{5,}\b/g) || []).slice(0, 8).map((s: string) => s.toLowerCase())));
    return KnowledgeItem.create({
      title,
      page: idx + 1,
      excerptEncrypted: encryptText(excerpt),
      contentEncrypted: encryptText(content),
      tags,
      locale: /[\u0600-\u06FF]/.test(content) ? 'ar' : 'en',
      source: req.file!.originalname,
      embedding: embedText(content)
    });
  }));

  res.json({ ok: true, pages: saved.length });
}

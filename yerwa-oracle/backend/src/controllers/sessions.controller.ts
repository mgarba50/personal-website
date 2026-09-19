import { Request, Response } from 'express';
import { Session } from '../models/Session.js';
import { decryptText, encryptText } from '../services/crypto.service.js';

function decode(session: any) {
  return {
    id: session._id,
    userId: session.userId,
    seed: session.seed,
    cast: JSON.parse(decryptText(session.castEncrypted) || '{}'),
    notes: decryptText(session.notesEncrypted),
    createdAt: session.createdAt,
    updatedAt: session.updatedAt
  };
}

export async function listSessions(req: Request, res: Response) {
  const sessions = await Session.find({ userId: (req as Request & { userId: string }).userId }).sort({ createdAt: -1 });
  res.json(sessions.map((s) => decode(s)));
}

export async function getSession(req: Request, res: Response) {
  const session = await Session.findById(req.params.id);
  if (!session) return res.status(404).json({ error: 'Not found' });
  res.json(decode(session));
}

export async function patchSession(req: Request, res: Response) {
  const session = await Session.findByIdAndUpdate(req.params.id, { notesEncrypted: encryptText(String(req.body.notes || '')) }, { new: true });
  res.json(session ? decode(session) : null);
}

export async function deleteSession(req: Request, res: Response) {
  await Session.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}

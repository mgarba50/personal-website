import { Request, Response } from 'express';
import crypto from 'crypto';
import { setPin, unlock } from '../services/auth.service.js';

const challenges = new Map<string, string>();

export async function setPinController(req: Request, res: Response) {
  const { pin } = req.body;
  if (!pin || String(pin).length < 4) return res.status(400).json({ error: 'PIN too short' });
  const user = await setPin(String(pin));
  return res.json({ ok: true, userId: user._id });
}

export async function unlockController(req: Request, res: Response) {
  try {
    const { token, user } = await unlock(String(req.body.pin));
    return res.json({ token, locale: user.locale, location: user.location });
  } catch (error) {
    return res.status(401).json({ error: (error as Error).message });
  }
}

export async function webauthnChallenge(req: Request, res: Response) {
  const userId = String(req.body.userId || 'default-user');
  const challenge = crypto.randomBytes(32).toString('base64url');
  challenges.set(userId, challenge);
  res.json({ challenge, rpId: req.hostname, userVerification: 'preferred' });
}

export async function webauthnVerify(req: Request, res: Response) {
  const userId = String(req.body.userId || 'default-user');
  const challenge = challenges.get(userId);
  if (!challenge || req.body.challenge !== challenge) {
    return res.status(401).json({ verified: false, error: 'Challenge mismatch' });
  }
  challenges.delete(userId);
  return res.json({ verified: true, note: 'WebAuthn challenge accepted (registration/attestation hook ready).' });
}

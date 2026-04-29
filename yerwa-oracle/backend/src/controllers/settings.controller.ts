import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { LOCATION_PRESETS } from '../config/constants.js';

export async function getSettings(req: Request, res: Response) {
  const user = await User.findById((req as Request & { userId: string }).userId);
  return res.json({ locale: user?.locale || 'en', location: user?.location, presets: LOCATION_PRESETS });
}

export async function updateSettings(req: Request, res: Response) {
  const user = await User.findById((req as Request & { userId: string }).userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.locale = req.body.locale || user.locale;
  user.location = req.body.location || user.location;
  await user.save();
  return res.json({ ok: true, user });
}

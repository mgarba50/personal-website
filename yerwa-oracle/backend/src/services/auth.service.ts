import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';
import { DEFAULT_LOCATION } from '../config/constants.js';

export async function setPin(pin: string) {
  const pinHash = await bcrypt.hash(pin, 10);
  const existing = await User.findOne();
  if (existing) {
    existing.pinHash = pinHash;
    await existing.save();
    return existing;
  }
  return User.create({ pinHash, location: DEFAULT_LOCATION, locale: 'en' });
}

export async function unlock(pin: string) {
  const user = await User.findOne();
  if (!user) throw new Error('PIN not set');
  const ok = await bcrypt.compare(pin, user.pinHash);
  if (!ok) throw new Error('Invalid PIN');
  const token = jwt.sign({ sub: user._id.toString() }, env.jwtSecret, { expiresIn: env.jwtExpiry });
  return { token, user };
}

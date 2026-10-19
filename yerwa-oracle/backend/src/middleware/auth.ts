import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function authRequired(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { sub: string };
    (req as Request & { userId: string }).userId = decoded.sub;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

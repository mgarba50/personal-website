import { Request, Response } from 'express';
import { syncEphemeris } from '../services/ephemeris.service.js';

export async function ephemerisSync(req: Request, res: Response) {
  const lat = Number(req.query.lat || 11.8466);
  const lon = Number(req.query.lon || 13.1571);
  const result = await syncEphemeris(lat, lon);
  res.json(result);
}

import { Request, Response } from 'express';
import { fetchNodeTelemetry } from '../services/telemetry.service.js';

export async function nodesTelemetry(_req: Request, res: Response) {
  const telemetry = await fetchNodeTelemetry();
  res.json(telemetry);
}

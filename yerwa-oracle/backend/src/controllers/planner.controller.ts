import { Request, Response } from 'express';
import { planElection } from '../services/planner.service.js';

export async function election(req: Request, res: Response) {
  const { goal, location } = req.body;
  const plan = planElection(goal, location.lat, location.lon);
  res.json(plan);
}

export async function electionIcs(req: Request, res: Response) {
  const goal = String(req.query.goal || 'contract');
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);
  const plan = planElection(goal, lat, lon);
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.send(plan.ics);
}

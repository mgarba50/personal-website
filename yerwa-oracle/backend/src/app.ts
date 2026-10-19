import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { env } from './config/env.js';
import { router } from './routes/index.js';

export const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api', router);

export async function bootstrap() {
  await mongoose.connect(env.mongoUri);
  return app;
}

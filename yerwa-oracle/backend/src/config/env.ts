import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/yerwa-oracle',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  jwtExpiry: process.env.JWT_EXPIRY || '7d',
  dataKey: process.env.DATA_KEY || '00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff',
  ephemerisApiUrl: process.env.EPHEMERIS_API_URL || '',
  ephemerisApiKey: process.env.EPHEMERIS_API_KEY || '',
  llmApiUrl: process.env.LLM_API_URL || '',
  llmApiKey: process.env.LLM_API_KEY || ''
};

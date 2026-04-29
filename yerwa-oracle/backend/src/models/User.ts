import { Schema, model } from 'mongoose';

const locationSchema = new Schema({
  lat: Number,
  lon: Number,
  label: String,
  source: { type: String, default: 'manual' }
}, { _id: false });

const passkeySchema = new Schema({
  credentialID: String,
  publicKey: String,
  counter: Number,
  transports: [String]
}, { _id: false });

const userSchema = new Schema({
  pinHash: { type: String, required: true },
  locale: { type: String, default: 'en' },
  location: { type: locationSchema, required: true },
  passkeys: { type: [passkeySchema], default: [] }
}, { timestamps: true });

export const User = model('User', userSchema);

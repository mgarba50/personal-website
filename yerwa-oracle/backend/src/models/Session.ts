import { Schema, model, Types } from 'mongoose';

const sessionSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  castEncrypted: { type: String, required: true },
  seed: { type: Number, required: true },
  notesEncrypted: { type: String, default: '' }
}, { timestamps: { createdAt: true, updatedAt: true } });

export const Session = model('Session', sessionSchema);

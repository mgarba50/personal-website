import { Schema, model } from 'mongoose';

const knowledgeItemSchema = new Schema({
  title: String,
  page: Number,
  excerptEncrypted: String,
  contentEncrypted: String,
  tags: [String],
  locale: { type: String, default: 'en' },
  source: String,
  embedding: [Number],
  embeddingModel: { type: String, default: 'local-hash-embed-v1' },
  embeddingVersion: { type: String, default: '1.0.0' }
}, { timestamps: { createdAt: true, updatedAt: false } });

export const KnowledgeItem = model('KnowledgeItem', knowledgeItemSchema);

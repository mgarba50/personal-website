# Yerwa Oracle v2 (Networked Command Architecture)

Yerwa Oracle v2 is now a networked intelligence node with external ephemeris sync, websocket telemetry, encrypted data-at-rest, and RAG-ready synthesis.

## Highlights
- Express + TypeScript API with Socket.io realtime channel
- External ephemeris integration route (`GET /ephemeris/sync`)
- Command telemetry route (`GET /telemetry/nodes`) + live dashboard feed
- Oracle synthesis route (`POST /oracle/synthesize`) for secure LLM/RAG blending
- AES-256 encrypted knowledge/session payloads in MongoDB
- PIN/JWT plus WebAuthn challenge endpoints
- Angular command dashboard/HUD UI in obsidian + matte-gold theme

## New Routes
- `GET /telemetry/nodes`
- `GET /ephemeris/sync`
- `POST /oracle/synthesize`
- `POST /auth/webauthn/challenge`
- `POST /auth/webauthn/verify`

## Configure Environment
Copy and edit:
```bash
cp .env.example .env
```
Important v2 keys:
- `DATA_KEY` (64 hex chars for AES-256)
- `EPHEMERIS_API_URL`, `EPHEMERIS_API_KEY`
- `LLM_API_URL`, `LLM_API_KEY`

## Run (Dev)
```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm start
```

## Windows `.exe` Packaging
```bash
cd yerwa-oracle
npm install
npm --prefix backend install
npm --prefix frontend install
npm run package:win
```
Output:
- `release/Yerwa-Oracle-Setup-<version>.exe`

## Security Notes
- `KnowledgeItem` text fields and `Session` cast/notes are stored encrypted in MongoDB.
- Semantic ranking runs against local embeddings; decrypted excerpts are only materialized in-process.
- WebAuthn registration/assertion storage hooks are scaffolded for enterprise hardening.

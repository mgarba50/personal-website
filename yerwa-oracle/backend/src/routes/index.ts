import { Router } from 'express';
import multer from 'multer';
import { setPinController, unlockController, webauthnChallenge, webauthnVerify } from '../controllers/auth.controller.js';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { cast, rapid, synthesize } from '../controllers/oracle.controller.js';
import { election, electionIcs } from '../controllers/planner.controller.js';
import { deleteKnowledge, listKnowledge, searchKnowledge, semanticSearch } from '../controllers/knowledge.controller.js';
import { ingestUpload } from '../controllers/ingest.controller.js';
import { deleteSession, getSession, listSessions, patchSession } from '../controllers/sessions.controller.js';
import { authRequired } from '../middleware/auth.js';
import { nodesTelemetry } from '../controllers/telemetry.controller.js';
import { ephemerisSync } from '../controllers/ephemeris.controller.js';

const upload = multer({ storage: multer.memoryStorage() });

export const router = Router();
router.post('/auth/set-pin', setPinController);
router.post('/auth/unlock', unlockController);
router.post('/auth/webauthn/challenge', webauthnChallenge);
router.post('/auth/webauthn/verify', webauthnVerify);

router.use(authRequired);
router.get('/settings', getSettings);
router.post('/settings', updateSettings);

router.post('/oracle/cast', cast);
router.post('/oracle/rapid', rapid);
router.post('/oracle/synthesize', synthesize);

router.post('/election', election);
router.get('/election/ics', electionIcs);

router.get('/knowledge', listKnowledge);
router.get('/knowledge/search', searchKnowledge);
router.get('/knowledge/semantic', semanticSearch);
router.delete('/knowledge/:id', deleteKnowledge);

router.post('/ingest/upload', upload.single('pdf'), ingestUpload);

router.get('/sessions', listSessions);
router.get('/sessions/:id', getSession);
router.patch('/sessions/:id', patchSession);
router.delete('/sessions/:id', deleteSession);

router.get('/telemetry/nodes', nodesTelemetry);
router.get('/ephemeris/sync', ephemerisSync);

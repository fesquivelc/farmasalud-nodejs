import { Router } from 'express';
import { drugWatchUI, drugWatchProcess } from '../handlers/drug-watch.handler.js';
import { contactUsUI, contactUsProcess } from '../handlers/contact-us.handler.js';

const router = Router();

/* UI routes */
router.get(['/', '/farmacovigilancia'], drugWatchUI);

router.get('/contacto', contactUsUI);

/* API routes */
router.post('/api/v1/drug-watch', drugWatchProcess);
router.post('/api/v1/contact-us', contactUsProcess);

export default router;

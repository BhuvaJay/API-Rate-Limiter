import express from 'express';
import { sendSMS, getTodayLogs, getLastMinuteLogs, getLastHourRateLimitViolation } from '../controllers/sms.controller';
import { rateLimiter } from '../middlewares/rateLimiter';

const router = express.Router();

router.post('/send', rateLimiter, sendSMS);
router.get('/Todaylogs', getTodayLogs);
router.get('/lastMinuteLogs', getLastMinuteLogs);
router.get('/lastHourRateLimitViolation', getLastHourRateLimitViolation);

export default router;

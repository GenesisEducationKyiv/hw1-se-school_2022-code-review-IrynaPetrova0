import express from 'express';
import rate from './rate.routes';
import subscribe from './subscribe.routes';
import sendEmails from './sendEmails.routes';

const router = express.Router();

router.use('/rate', rate);
router.use('/subscribe', subscribe);
router.use('/sendEmails', sendEmails);

export default router;
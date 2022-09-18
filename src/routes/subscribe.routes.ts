import express from 'express';
import SubscribeController from '../controllers/subscribe.controller';

const router = express.Router();

router
	.route('/')
	.post(SubscribeController.addNewEmail);

export default router;
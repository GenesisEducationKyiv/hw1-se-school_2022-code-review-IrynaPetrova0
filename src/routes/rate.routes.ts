import express from 'express';
import RateController from '../controllers/rate.controller';

const router = express.Router();

router
	.route('/')
	.get(RateController.getRate);

export default router;
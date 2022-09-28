import express from 'express';
import {rateController} from "../init/init";

const router = express.Router();

router
	.route('/')
	.get(rateController.getRate);

export default router;
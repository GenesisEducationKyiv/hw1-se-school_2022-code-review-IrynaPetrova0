import express from 'express';
import {sendEmailsController} from "../init/init";

const router = express.Router();

router
	.route('/')
	.post(sendEmailsController.send);

export default router;
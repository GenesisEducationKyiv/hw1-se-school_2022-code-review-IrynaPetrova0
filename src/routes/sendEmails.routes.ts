import express from 'express';
import SendEmailsController from'../controllers/sendEmails.controller';

const router = express.Router();

router
	.route('/')
	.post(SendEmailsController.send);

export default router;
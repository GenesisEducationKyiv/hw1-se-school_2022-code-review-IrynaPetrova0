import express from 'express';
import SendEmailsService from '../services/sendEmails.service';

class SendEmailsController {
	async send(request: express.Request, response: express.Response) {
		try {
			await SendEmailsService.sendToSubscribers();
			response.status(200).send('Email sent');
		} catch (e:any) {
			response.status(400).send(e);
		}
	}
}

export default new SendEmailsController();
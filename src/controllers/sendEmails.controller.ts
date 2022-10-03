import express from 'express';
import {SendEmailsServiceInterface} from "../interfaces/sendEmailsService.interface";

class SendEmailsController {

	sendEmailsService: SendEmailsServiceInterface;

	constructor(sendEmailsService: SendEmailsServiceInterface) {
		this.sendEmailsService = sendEmailsService;
	}

	send = async (request: express.Request, response: express.Response) => {
		try {
			await this.sendEmailsService.sendToSubscribers();
			response.status(200).send('Email sent');
		} catch (e:any) {
			response.status(400).send(e);
		}
	}
}

export {SendEmailsController};
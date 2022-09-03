const SendEmailsService = require('../services/sendEmails.service');

class SendEmailsController {
	async send(request,response) {
		try {
			await SendEmailsService.sendToSubscribers();
			response.status(200).send('Email sent');
		} catch (e) {
			response.status(400).send(e);
		}
	}
}

module.exports = new SendEmailsController();
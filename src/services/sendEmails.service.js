const config = require('../../config.json');
const RateService = require('../services/rate.service');
const SubscribeService = require('../services/subscribe.service');
const SibApiV3Sdk = require('sib-api-v3-sdk');

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = config.sendinBlue.api_key;

class SendEmailsService {
	async sendToSubscribers() {
		const emails = await SubscribeService.readFile();
		RateService.getCurrentRate().then(result => {
			if (emails) {
				for (const email of emails) {
					try {
						this.sendToSelectedEmail(email, result);
					} catch (e) {
						console.error(e);
						throw new Error(e);
					}
				}
			}
		});
	}

	sendToSelectedEmail(email, rate) {
		new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
			'sender':{
				'email':config.mailing.senderEmail,
				'test':config.mailing.test
			},
			'subject': config.mailing.subject,
			'textContent': '1 BTC = ' + rate + ' UAH.',
			'to' : [{'email': email}],
		});
	}
}

module.exports = new SendEmailsService();
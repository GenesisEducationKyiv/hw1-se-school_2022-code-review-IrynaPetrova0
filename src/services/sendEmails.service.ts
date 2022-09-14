import config from '../../config.json';
import RateService from './rate.service';
import DatabaseService from './database.service';

const SibApiV3Sdk = require('sib-api-v3-typescript');
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, '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');

class SendEmailsService {
	async sendToSubscribers() {
		const emails = await DatabaseService.readFile();
		RateService.getCurrentRate().then(result => {
			if (emails) {
				for (const email of emails) {
					try {
						this.sendToSelectedEmail(email, result);
					} catch (e) {
						console.error('ERROR: ',e);
					}
				}
			}
		});
	}

	sendToSelectedEmail(email:string, rate:any) {
		let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
		sendSmtpEmail.subject = config.mailing.subject;
		sendSmtpEmail.textContent = "1 BTC = " + rate + " UAH.";
		sendSmtpEmail.sender = {"name":"John Doe","email":config.mailing.senderEmail};
		sendSmtpEmail.to = [{"email": email}];

		apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data:any) {
			console.log('API called successfully. Returned data: ' + JSON.stringify(data));
		}, function(error:any) {
			console.error(error);
		});
	}
}

export default new SendEmailsService();
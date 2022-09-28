import Config from "../../config";
import RateService from './rate.service';
import DatabaseRepository from "../repositories/database.repository";

const SibApiV3Sdk = require('sib-api-v3-typescript');
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, Config.API_KEY);

class SendEmailsService {
	async sendToSubscribers() {
		const emails = await DatabaseRepository.getAllEmails();
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
		sendSmtpEmail.subject = Config.SUBJECT;
		sendSmtpEmail.textContent = "1 BTC = " + rate + " UAH.";
		sendSmtpEmail.sender = {"name":"John Doe","email":Config.SENDER_EMAIL};
		sendSmtpEmail.to = [{"email": email}];

		apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data:any) {
			console.log('API called successfully. Returned data: ' + JSON.stringify(data));
		}, function(error:any) {
			console.error(error);
		});
	}
}

export default new SendEmailsService();
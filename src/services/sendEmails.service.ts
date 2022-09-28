import Config from "../../config";
import DatabaseRepository from "../repositories/database.repository";
import {RateServiceInterface} from "../interfaces/rateService.interface";
import {SendEmailsServiceInterface} from "../interfaces/sendEmailsService.interface";


const SibApiV3Sdk = require('sib-api-v3-typescript');
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, Config.API_KEY);

class SendEmailsService implements SendEmailsServiceInterface{

	rateService: RateServiceInterface;
	smtpEmail: any;

	constructor(rateService: RateServiceInterface, smtpEmail : any) {
		this.rateService = rateService;
		this.smtpEmail = smtpEmail;
	}

	async sendToSubscribers() {
		const emails = await DatabaseRepository.getAllEmails();
		this.rateService.getCurrentRate().then(result => {
			if (emails) {
				for (const email of emails) {
					try {
						this.sendToSelectedEmail(email, result);
					} catch (e) {
						console.error('ERROR: ', e);
					}
				}
			}
		});
	}

	sendToSelectedEmail(email:string, rate:number | void) {
		this.smtpEmail.textContent = "1 BTC = " + rate + " UAH.";
		this.smtpEmail.to = [{"email": email}];

		apiInstance.sendTransacEmail(this.smtpEmail).then(function(data:any) {
			console.log('API called successfully. Returned data: ' + JSON.stringify(data));
		}, function(error:any) {
			console.error(error);
		});
	}
}

export {SendEmailsService}
import { Subscriber } from "../models/subscriber.model";
import DatabaseRepository from "../repositories/database.repository";

const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

class SubscribeService {
	async subscribe(email:string) {
		const emailToLowerCase = email.toLowerCase();
		if (validEmailRegex.test(emailToLowerCase)) {
			if (!await DatabaseRepository.hasDuplicate(emailToLowerCase)) {
				return await DatabaseRepository.append(new Subscriber(emailToLowerCase));
			} else {
				throw new Error('409 The subscription is already active for this email address.');
			}
		} else {
			throw new Error('400 Email is empty or was used invalid format.');
		}
	}
}

export default new SubscribeService();
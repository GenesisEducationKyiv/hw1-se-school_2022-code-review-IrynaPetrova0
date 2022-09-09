const DatabaseService = require('./database.service');

const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

class SubscribeService {
	async subscribe(email) {
		const emailToLowerCase = email.toLowerCase();
		if (validEmailRegex.test(emailToLowerCase)) {
			if (!await DatabaseService.hasDuplicate(emailToLowerCase)) {
				return await DatabaseService.writeToFile(emailToLowerCase);
			} else {
				throw new Error('409 The subscription is already active for this email address.');
			}
		} else {
			throw new Error('400 Email is empty or was used invalid format.');
		}
	}
}

module.exports = new SubscribeService();
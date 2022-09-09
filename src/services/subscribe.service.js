const fs = require('fs');

const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

class SubscribeService {
	async subscribe(email) {
		if (validEmailRegex.test(email)) {
			if (!await this.haveDuplicate(email)) {
				return await this.saveEmail(email);
			} else {
				throw new Error('409 The subscription is already active for this email address.');
			}
		} else {
			throw new Error('400 Email is empty or was used invalid format.');
		}
	}

	async haveDuplicate(email) {
		const result = await this.readFile('./src/db/emails.txt');
		return result.includes(email);
	}

	async readFile(filePath) {
		return fs.readFileSync(
			filePath,
			{encoding : 'utf-8'}
		).split(/\r?\n/).filter(element => element);
	}

	async saveEmail(email) {
		return fs.appendFileSync(
			'./src/db/emails.txt',
			email + '\n',
			{ encoding: 'utf8' }
		);
	}
}

module.exports = new SubscribeService();
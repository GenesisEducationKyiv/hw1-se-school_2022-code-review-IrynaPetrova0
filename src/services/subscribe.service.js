const fs = require('fs');

class SubscribeService {
	async subscribe(email) {
		if (!await this.haveDuplicate(email)) {
			return await this.saveEmail(email);
		} else {
			throw new Error('Duplicate!');
		}
	}

	async haveDuplicate(email) {
		const result = await this.readFile();
		return result.includes(email);
	}

	async readFile() {
		return fs.readFileSync(
			'./src/db/emails.txt',
			{encoding : 'utf-8'}
		).split(/\r?\n/).filter(element => element);
	}

	async saveEmail(email) {
		return fs.appendFileSync(
			'./src/db/emails.txt',
			'\n' + email,
			{ encoding: 'utf8' }
		);
	}
}

module.exports = new SubscribeService();
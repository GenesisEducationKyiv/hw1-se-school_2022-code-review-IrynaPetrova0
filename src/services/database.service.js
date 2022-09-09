const fs = require('fs');

const  FILE_PATH = './src/db/emails.txt';
const ENCODING_UTF_8 = {encoding : 'utf-8'};

class DatabaseService {

	async readFile(filePath) {
		return fs.readFileSync(
			filePath,
			ENCODING_UTF_8
		).split(/\r?\n/).filter(element => element);
	}

	async hasDuplicate(email) {
		const result = await this.readFile(FILE_PATH);
		return result.includes(email);
	}

	async writeToFile(email) {
		return fs.appendFileSync(
			FILE_PATH,
			email + '\n',
			ENCODING_UTF_8
		);
	}
}

module.exports = new DatabaseService();
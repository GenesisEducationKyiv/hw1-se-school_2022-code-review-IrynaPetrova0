import fs from 'fs';

const  FILE_PATH = './src/db/emails.txt';

class DatabaseService {

	async readFile() {
		return fs.readFileSync(
			FILE_PATH,
			{encoding : 'utf-8'}
		).split(/\r?\n/).filter(element => element);
	}

	async hasDuplicate(email:string) {
		const result = await this.readFile();
		return result.includes(email);
	}

	async writeToFile(email:string) {
		return fs.appendFileSync(
			FILE_PATH,
			email + '\n',
			{encoding : 'utf-8'}
		);
	}
}

export default new DatabaseService();
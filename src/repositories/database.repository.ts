import { SubscriberInterface } from "../interfaces/subscriber.model.interface";
import { DatabaseInterface } from "../interfaces/db.repository.interface";
import fs from "fs";

const  FILE_PATH = './src/db/emails.txt';

class DatabaseRepository implements DatabaseInterface {

	async append(subscriber: SubscriberInterface) {
		return fs.appendFileSync(
			FILE_PATH,
			subscriber.email + '\n',
			{encoding : 'utf-8'}
		);
	}

	async getAllEmails() {
		return fs.readFileSync(
			FILE_PATH,
			{encoding : 'utf-8'}
		).split(/\r?\n/).filter(element => element);
	}

	async hasDuplicate(email: string): Promise<any> {
		const result = await this.getAllEmails();
		return result.includes(email);
	}
}

export default new DatabaseRepository();
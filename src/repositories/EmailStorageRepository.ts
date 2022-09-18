// import fs from'fs';
// import DatabaseRepository from './database.repository';
//
// const ENCODING_UTF_8 = {encoding : 'utf-8'};
// let emails = [];
//
// class EmailStorageRepository extends DatabaseRepository {
// 	private filePath: string;
//
// 	constructor(filePath:string) {
// 		super();
// 		this.filePath = filePath;
// 	}
//
// 	async getAll() {
// 		emails =  fs.readFileSync(
// 			this.filePath,
// 			{encoding : 'utf-8'}
// 		).split(/\r?\n/).filter(element => element);
// 		return emails;
// 	}
// }
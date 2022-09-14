import express from 'express';
import SubscribeService from '../services/subscribe.service';

class SubscribeController {
	async addNewEmail(request: express.Request, response: express.Response) {
		try{
			console.log(request.body.email);
			await SubscribeService.subscribe(request.body.email);
			response.status(200).send('Subscribed!');
		} catch (e:any) {
			console.log(e);
			const errorInfo = e.message;
			console.log(errorInfo);
			response
				.status(parseInt(errorInfo.substring(0, errorInfo.indexOf(' '))))
				.send({'error': errorInfo.substring(errorInfo.indexOf(' ') + 1)});
		}
	}
}

export default new SubscribeController();
const SubscribeService = require('../services/subscribe.service');

class SubscribeController {
	async addNewEmail(request,response) {
		try{
			await SubscribeService.subscribe(request.body.email);
			response.status(200).send('Subscribed!');
		} catch (e) {
			const errorInfo = e.message;
			response
				.status(parseInt(errorInfo.substring(0, errorInfo.indexOf(' '))))
				.send({'error': errorInfo.substring(errorInfo.indexOf(' ') + 1)});
		}
	}
}

module.exports = new SubscribeController();
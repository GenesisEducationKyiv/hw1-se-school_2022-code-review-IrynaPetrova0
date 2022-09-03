const SubscribeService = require('../services/subscribe.service');

class SubscribeController {
	async addNewEmail(request,response) {
		const email = request.body.email.toLowerCase();
		try{
			await SubscribeService.subscribe(email);
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
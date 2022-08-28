const SubscribeService = require('../services/subscribe.service');

class SubscribeController {
	async addNewEmail(request,response) {
		const email = request.body.email.toLowerCase();
		const validRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		if (validRegex.test(email)) {
			try{
				await SubscribeService.subscribe(email);
				response.status(200).send('Subscribed!');
			} catch (e) {
				response.status(409).send({'error': 'The subscription is already active for this email address.'});
			}
		} else {
			response.status(400).send({'error': 'Email is empty or was used invalid format.'});
		}
	}
}

module.exports = new SubscribeController();
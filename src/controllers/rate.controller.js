const RateService = require('../services/rate.service');

class RateController {

	async getRate(request,response){
		try {
			const rate = await RateService.getCurrentRate();
			response.send(JSON.stringify(rate));
		} catch (e) {
			response.status(400);
			response.send('Invalid status value');
		}
	}
}
module.exports = new RateController();
const RateService = require('../services/rate.service');

class RateController {

	getRate(req, res){
		RateService.getCurrentRate().then((result) => {
			res.send(JSON.stringify(result));
		}).catch(() => {
			res.status(400);
			res.send('Invalid status value');
		});

	}
}
module.exports = new RateController();
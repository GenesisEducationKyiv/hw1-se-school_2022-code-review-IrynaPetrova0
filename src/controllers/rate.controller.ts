import express from 'express';
import RateService from'../services/rate.service';

class RateController {

	async getRate(request: express.Request, response: express.Response){
		try {
			const rate = await RateService.getCurrentRate();
			response.send(JSON.stringify(rate));
		} catch (e) {
			response.status(400);
			response.send('Invalid status value');
		}
	}
}
export default new RateController();
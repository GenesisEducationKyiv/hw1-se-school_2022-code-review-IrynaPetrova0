const axios = require('axios');
const config = require('../../config.json');

class RateService {
	async getCurrentRate() {
		return await axios
			.get(config.url.binance)
			.then((response) => {
				return Math.round(JSON.parse(response.data['price']));
			})
			.catch((err) => console.log(err));
	}
}

module.exports = new RateService();
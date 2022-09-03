const https = require('https');
const config = require('../../config.json');

class RateService {
	getCurrentRate() {
		return new Promise((resolve, reject) => {
			https.get(config.url.binance, (response) => {
				let data = '';

				response.on('data', (chunk) => {
					data += chunk;
				});

				response.on('end', () => {
					resolve(Math.round(JSON.parse(data)['price']));
				});
			}
			)
				.on('error', (error) => {
					reject(error);
				});
		});
	}
}

module.exports = new RateService();
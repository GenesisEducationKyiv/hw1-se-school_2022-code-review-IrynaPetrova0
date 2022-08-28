const https = require('https');

class RateService {
	getCurrentRate() {
		return new Promise((resolve, reject) => {
			https.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH', (response) => {
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
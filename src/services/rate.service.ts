import axios from'axios';
import config from '../../config.json';

class RateService {
	async getCurrentRate() {
		return await axios
			.get(config.url.binance)
			.then((response:any) => {
				return Math.round(JSON.parse(response.data['price']));
			})
			.catch((err:any) => console.log(err));
	}
}

export default new RateService();
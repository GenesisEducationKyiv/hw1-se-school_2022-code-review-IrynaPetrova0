import {CurrencyProvider} from "./rate/providers";

class RateService {
	async getCurrentRate() {
		try {
			return await CurrencyProvider.mainProviderCreator.factoryMethod().getRate();
		} catch (e) {
			return CurrencyProvider.mainProviderCreator.nextCreator?.factoryMethod().getRate();
		}
	}
}

export default new RateService();
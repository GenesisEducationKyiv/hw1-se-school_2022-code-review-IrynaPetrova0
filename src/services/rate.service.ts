import {CurrencyProvider} from "./rate/providers";
import cache_local from "../utils/cache_local";
import {CurrencyProviderInterface} from "../interfaces/currencyProvider.interface";

class RateService {
	async getCurrentRate() {
		const currencyProviderCreator = CurrencyProvider.mainProviderCreator;
		try {
			if (process.env.CACHING_ENABLED === "true"){
				return await this.getCurrentRateWithCache(currencyProviderCreator.factoryMethod());
			}else {
				return await currencyProviderCreator.factoryMethod().getRate();
			}
		} catch (e) {
			if (currencyProviderCreator.nextCreator && process.env.CACHING_ENABLED === "true"){
				return await this.getCurrentRateWithCache(currencyProviderCreator.nextCreator.factoryMethod())
			} else {
				return await currencyProviderCreator.nextCreator?.factoryMethod().getRate();
			}
		}
	}

	async getCurrentRateWithCache(currencyProvider: CurrencyProviderInterface) {
		let rate: Number | null | undefined | void = null;

		if (process.env.CACHING_ENABLED === "true") {
			rate = cache_local.get<Number>(currencyProvider.providerName);
		}

		if (!rate) {
			rate = await currencyProvider.getRate();
			cache_local.set(currencyProvider.providerName, rate);
		}
		return rate;
	}
}

export default new RateService();
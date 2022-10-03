import {CurrencyProviderInterface} from "../interfaces/currencyProvider.interface";
import {RateServiceInterface} from "../interfaces/rateService.interface";

class RateService implements RateServiceInterface{

	provider : CurrencyProviderInterface;

	constructor(provider: CurrencyProviderInterface) {
		this.provider = provider;
	}

	async getCurrentRate() {
		return this.provider.getRate();
	}
}

export {RateService}
import {CurrencyProviderInterface} from "../interfaces/currencyProvider.interface";
import axios from "axios";

abstract class CurrencyProviderAbstract implements CurrencyProviderInterface {
    protected abstract endpoint: string;
    abstract parseRate(response: any) : any;
    abstract providerName: string;

    nextProvider: CurrencyProviderInterface | null = null;

    async getRate() {
        return await axios
            .get(this.endpoint)
            .then((response:any) => {
                return this.parseRate(response);
            })
            .catch((err:any) => {
                return this.nextProvider?.getRate()
            });
    }

    setNext(nextProvider: CurrencyProviderInterface): CurrencyProviderInterface {
        this.nextProvider = nextProvider;
        return nextProvider;
    }

}

export { CurrencyProviderAbstract };
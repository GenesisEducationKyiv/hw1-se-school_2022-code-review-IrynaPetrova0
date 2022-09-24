import { CurrencyProviderInterface } from "../interfaces/currencyProvider.interface";
import axios from "axios";
import Config from "../../config";
import {CurrencyProvider} from "../services/rate/providers";

class BinanceProvider implements CurrencyProviderInterface {
    providerName: string = 'Binance';
    // @ts-ignore
    private readonly endpoint: string = Config.PROVIDERS.get(this.providerName);

    async getRate() {
        return await axios
            .get(this.endpoint)
            .then((response:any) => {
                return Math.round(JSON.parse(response.data['price']));
            })
            .catch((err:any) => console.log(err));
    }
}

class CoinbaseProvider implements CurrencyProviderInterface {
    providerName: string = 'Coinbase';
    // @ts-ignore
    private readonly endpoint: string = Config.PROVIDERS.get(this.providerName);

    async getRate() {
        return await axios
            .get(this.endpoint)
            .then((response:any) => {
                return Math.round(Number(response.data.data.amount));
            })
            .catch((err:any) => console.log(err));
    }
}

class CoingeckoProvider implements CurrencyProviderInterface {
    providerName: string = 'Coingecko';
    // @ts-ignore
    private readonly endpoint: string = Config.PROVIDERS.get(this.providerName);

    async getRate() {
        return await axios
            .get(this.endpoint)
            .then((response:any) => {
                return response.data["bitcoin"]["uah"];
            })
            .catch((err:any) => console.log(err));
    }
}

export {BinanceProvider, CoingeckoProvider, CoinbaseProvider}


import Config from "../../config";
import {CurrencyProviderAbstract} from "../providers/currencyProvider.abstract";

class BinanceProvider extends CurrencyProviderAbstract {
    providerName: string = 'Binance';
    // @ts-ignore
    readonly endpoint: string = Config.PROVIDERS.get(this.providerName);

    public parseRate(response :any){
        return Math.round(JSON.parse(response.data['price']));
    }
}

class CoinbaseProvider extends CurrencyProviderAbstract {
    providerName: string = 'Coinbase';
    // @ts-ignore
    readonly endpoint: string = Config.PROVIDERS.get(this.providerName);

    public parseRate(response :any){
        return Math.round(Number(response.data.data.amount));
    }
}

class CoingeckoProvider extends CurrencyProviderAbstract {
    providerName: string = 'Coingecko';
    // @ts-ignore
    readonly endpoint: string = Config.PROVIDERS.get(this.providerName);

    public parseRate(response :any){
        return response.data["bitcoin"]["uah"];
    }
}

export {BinanceProvider, CoingeckoProvider, CoinbaseProvider}


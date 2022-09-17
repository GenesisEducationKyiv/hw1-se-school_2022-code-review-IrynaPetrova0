import { CurrencyProviderInterface } from "../interfaces/currencyProvider.interface";
import axios from "axios";
import config from '../../config.json';

class BinanceProvider implements CurrencyProviderInterface {
    private readonly endpoint: string = config.providers[0].URL;

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
    private readonly endpoint: string = config.providers[1].URL;

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
    private readonly endpoint: string = config.providers[2].URL;

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


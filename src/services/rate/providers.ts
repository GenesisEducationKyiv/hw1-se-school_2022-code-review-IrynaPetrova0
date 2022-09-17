import {BinanceProviderCreator, CoinbaseProviderCreator, CoingeckoProviderCreator, Creator} from "./providersFactory";
import * as dotenv from 'dotenv';

dotenv.config();

class CurrencyProviders {
    list: Creator[] = [];

    mainProviderCreator: Creator;

    constructor() {
        const binanceCreator = new BinanceProviderCreator();
        const coinbaseCreator = new CoinbaseProviderCreator();
        const coingeckoCreator = new CoingeckoProviderCreator();

        this.list.push(binanceCreator);
        this.list.push(coinbaseCreator);
        this.list.push(coingeckoCreator);

        this.mainProviderCreator = this.list[Number(process.env.CRYPTO_CURRENCY_PROVIDER)] || this.list[0];

        if (this.list.length > 1) {
            for (let i = 1; i < this.list.length; i++) {
                this.list[i - 1].setNext(this.list[i]);
            }
        }
    }
}
const currencyProviders = new CurrencyProviders();
export {currencyProviders as CurrencyProvider}
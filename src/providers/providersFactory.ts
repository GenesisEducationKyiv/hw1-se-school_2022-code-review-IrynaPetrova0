import { CurrencyProviderInterface} from "../interfaces/currencyProvider.interface";
import {BinanceProvider, CoinbaseProvider, CoingeckoProvider} from "../models/currencyProvider.model";

abstract class Creator {
    public abstract factoryMethod(): CurrencyProviderInterface;
}

class BinanceProviderCreator extends Creator{
    factoryMethod(): CurrencyProviderInterface {
        return new BinanceProvider();
    }
}

class CoinbaseProviderCreator extends Creator{
    factoryMethod(): CurrencyProviderInterface {
        return new CoinbaseProvider();
    }
}

class CoingeckoProviderCreator extends Creator{
    factoryMethod(): CurrencyProviderInterface {
        return new CoingeckoProvider();
    }
}

export {BinanceProviderCreator, CoingeckoProviderCreator, CoinbaseProviderCreator, Creator}

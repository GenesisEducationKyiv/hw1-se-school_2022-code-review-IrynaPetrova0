import { CurrencyProviderInterface} from "../../interfaces/currencyProvider.interface";
import {BinanceProvider, CoinbaseProvider, CoingeckoProvider} from "../../models/currencyProvider.model";

abstract class Creator {
    nextCreator: Creator | null = null;

    public abstract factoryMethod(): CurrencyProviderInterface;
    public setNext(nextCreator: Creator): Creator {
        this.nextCreator = nextCreator;
        return nextCreator;
    }
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

interface CurrencyProviderInterface {

    getRate(): Promise<number | void>;
}

export {CurrencyProviderInterface};
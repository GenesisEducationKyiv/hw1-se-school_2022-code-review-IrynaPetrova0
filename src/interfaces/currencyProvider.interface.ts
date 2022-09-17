interface CurrencyProviderInterface {
    providerName: string;

    getRate(): Promise<number | void>;
}

export {CurrencyProviderInterface};
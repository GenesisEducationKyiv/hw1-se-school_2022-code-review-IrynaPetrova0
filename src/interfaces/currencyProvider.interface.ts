interface CurrencyProviderInterface {
    providerName: string;
    nextProvider: CurrencyProviderInterface | null;

    getRate(): Promise<number | void>;
    setNext(nextProvider: CurrencyProviderInterface): CurrencyProviderInterface;
}

export {CurrencyProviderInterface};
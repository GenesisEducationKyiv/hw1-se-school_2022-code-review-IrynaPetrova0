import {CurrencyProviderInterface} from "../interfaces/currencyProvider.interface";


class Logger implements CurrencyProviderInterface {
    providerName: string = "Logger";
    provider: CurrencyProviderInterface;


    async getRate(): Promise<number | void> {
        const currentRate = await this.provider.getRate();
        this.log(currentRate);
        return Promise.resolve(currentRate);
    }

    constructor(provider: CurrencyProviderInterface) {
        this.provider = provider;
    }

    log(rate: any) {
        console.log('\x1b[35m%s\x1b[0m', `${this.provider.providerName}: 1 Bitcoin = ${rate} UAH`);
    }

}

export {Logger}
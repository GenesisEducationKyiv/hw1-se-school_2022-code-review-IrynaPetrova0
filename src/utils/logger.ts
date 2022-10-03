import {RateServiceInterface} from "../interfaces/rateService.interface";


class Logger implements RateServiceInterface {

    service: RateServiceInterface;

    constructor(service: RateServiceInterface) {
        this.service = service;
    }

    async getCurrentRate() {
        try {
            const result = await this.service.getCurrentRate();
            this.log(result);
            return result;
        } catch (e) {
            throw e;
        }
    }

    log(rate: any) {
        console.log('\x1b[35m%s\x1b[0m', '[LOG]' , `1 Bitcoin = ${rate} UAH`);
    }
}

export {Logger}
import {RateServiceInterface} from "../interfaces/rateService.interface";
import cache_local from "./cache_local";

export class ServiceCache implements RateServiceInterface{
    service: RateServiceInterface;


    constructor(service: RateServiceInterface) {
        this.service = service;
    }

    async getCurrentRate() {
        let rate = null;

        rate = cache_local.get<number>('rate');

        if (!rate) {
            rate = await this.service.getCurrentRate();
            cache_local.set('rate', rate);
        }
        return rate;
    }
}
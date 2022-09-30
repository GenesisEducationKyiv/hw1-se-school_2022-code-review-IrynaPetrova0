import express from 'express';
import {RateServiceInterface} from "../interfaces/rateService.interface";

class RateController {
    rateService: RateServiceInterface;

    constructor(rateService: RateServiceInterface) {
        this.rateService = rateService;
    }

    getRate = async (request: express.Request, response: express.Response) => {

        try {
            const rate = await this.rateService.getCurrentRate();
            response.send(JSON.stringify(rate));
            response.status(200);
        } catch (e) {
            response.status(400);
            response.send('Invalid status value');
        }

    }
}

export {RateController}
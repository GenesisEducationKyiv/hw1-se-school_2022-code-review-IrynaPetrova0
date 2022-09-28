import {RateService} from "../services/rate.service";
import {RateController} from "../controllers/rate.controller";
import {CurrencyProviderInterface} from "../interfaces/currencyProvider.interface";
import {
    BinanceProviderCreator,
    CoinbaseProviderCreator,
    CoingeckoProviderCreator
} from "../providers/providersFactory";
import {Logger} from "../utils/logger";
import {ServiceCache} from "../utils/serviceCache";
import {RateServiceInterface} from "../interfaces/rateService.interface";
import {SendEmailsServiceInterface} from "../interfaces/sendEmailsService.interface";
import {SendEmailsService} from "../services/sendEmails.service";
const SibApiV3Sdk = require('sib-api-v3-typescript');
import Config from "../../config";
import {SendEmailsController} from "../controllers/sendEmails.controller";


export const initProviders = () => {
    const list : CurrencyProviderInterface[] = [];

    const binance = new BinanceProviderCreator().factoryMethod();
    const coinbase = new CoinbaseProviderCreator().factoryMethod();
    const coingecko = new CoingeckoProviderCreator().factoryMethod();
    list.push(binance);
    list.push(coinbase);
    list.push(coingecko);

    const mainProvider : CurrencyProviderInterface = list[Number(process.env.CRYPTO_CURRENCY_PROVIDER)] || list[0];

    if (list.length > 1) {
        for (let i = 1; i < list.length; i++) {
            list[i - 1].setNext(list[i]);
        }
    }

    return mainProvider;
}

let rateService : RateServiceInterface = new RateService(initProviders());

if (process.env.CACHING_ENABLED === "true") {
    rateService = new ServiceCache(rateService);
}

let rateController = new RateController(rateService);

if (process.env.LOGGER_ENABLED === "true") {
    const loggerService = new Logger(rateService);
    rateController = new RateController(loggerService);
}

const smtpEmail = new SibApiV3Sdk.SendSmtpEmail();
smtpEmail.subject = Config.SUBJECT;
smtpEmail.sender = {"name":"John Doe","email":Config.SENDER_EMAIL};

const sendEmailsService : SendEmailsServiceInterface = new SendEmailsService(rateService, smtpEmail);
const sendEmailsController : SendEmailsController = new SendEmailsController(sendEmailsService);

export {rateController, rateService, sendEmailsService, sendEmailsController}
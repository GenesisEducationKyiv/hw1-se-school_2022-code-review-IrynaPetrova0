export interface RateServiceInterface {
    getCurrentRate() : Promise<number| void>
}
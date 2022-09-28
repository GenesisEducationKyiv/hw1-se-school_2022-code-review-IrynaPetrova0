export interface SendEmailsServiceInterface {
    sendToSubscribers() : Promise<any>
}
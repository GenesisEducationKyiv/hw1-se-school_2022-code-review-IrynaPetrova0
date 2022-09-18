import { SubscriberInterface } from "../interfaces/subscriber.model.interface";

class Subscriber implements SubscriberInterface {
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}

export { Subscriber };
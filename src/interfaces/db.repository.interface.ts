import { SubscriberInterface } from "./subscriber.model.interface";

interface DatabaseInterface {
    append(subscriber: SubscriberInterface): Promise<void>;
    hasDuplicate(email: string): Promise<boolean>;
    getAllEmails(): Promise<string[]>;
}

export { DatabaseInterface };
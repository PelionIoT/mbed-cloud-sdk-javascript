import { WebhookType } from "./types";
import { Webhook as apiWebhook } from "../_api/mds";
export declare class Webhook {
    constructor(options: WebhookType);
    static map(from: apiWebhook): Webhook;
}
export interface Webhook extends WebhookType {
}

import { Webhook as apiWebhook } from "../../_api/mds";
import { Webhook } from "./webhook";
/**
 * Webhook Adapter
 */
export declare class WebhookAdapter {
    static map(from: apiWebhook): Webhook;
}

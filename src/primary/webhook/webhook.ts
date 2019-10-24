import { Webhook as apiWebhook} from "../../legacy/_api/mds";

export interface Webhook {
    /**
     * The URL to which the notifications must be sent
     */
    url: string;
    /**
     * Headers (key/value) that must be sent with the request
     */
    headers?: { [key: string]: string; };
}

export const webhookAdapter = (from: apiWebhook): Webhook => {
    return {
        url: from.url,
        headers: from.headers,
    };
};

import { WebhookType } from "./types";
import { Webhook as apiWebhook } from "../_api/mds";
import { DevicesApi } from "./index";
export declare class Webhook {
    private _api;
    constructor(options: WebhookType, _api?: DevicesApi);
    static map(from: apiWebhook, api: DevicesApi): Webhook;
    static reverseMap(from: WebhookType): WebhookType;
    /**
     * Updates the webhook
     * @param options webhook details
     * @returns Promise containing any error
     */
    update(options: WebhookType): Promise<void>;
    /**
     * Updates the webhook
     * @param options webhook details
     * @param callback A function that is passed any error
     */
    update(options: WebhookType, callback?: (err: any, data?: void) => any): any;
    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface Webhook extends WebhookType {
}

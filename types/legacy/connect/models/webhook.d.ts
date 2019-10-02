/**
 * Webhook
 */
export declare class Webhook {
    /**
     * The URL to which the notifications must be sent
     */
    readonly url: string;
    /**
     * Headers (key/value) that must be sent with the request
     */
    readonly headers?: {
        [key: string]: string;
    };
    constructor(init?: Partial<Webhook>);
}

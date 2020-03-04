import { Response } from "superagent";
/**
 * Defines an error raised in the SDK
 */
export declare class SDKError extends Error {
    message: string;
    response: Response;
    url: string;
    innerError?: Error;
    details?: string;
    code?: number;
    constructor(message: string, response?: Response, url?: string, innerError?: Error, details?: string, code?: number);
}

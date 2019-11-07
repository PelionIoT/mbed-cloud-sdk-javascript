/**
 * Defines an error raised in the SDK
 */
export declare class SDKError extends Error {
    innerError?: Error;
    details?: string;
    code?: number;
    constructor(message: string, innerError?: Error, details?: string, code?: number);
}

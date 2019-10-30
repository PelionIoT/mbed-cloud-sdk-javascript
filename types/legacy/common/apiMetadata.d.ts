/**
 * Internal class used for reporting metadata of last api call
 * @ignore
 */
export declare class ApiMetadata {
    /**
     * URL of the API request
     */
    readonly url?: string;
    /**
     * Method of the API request
     */
    readonly method?: string;
    /**
     * HTTP Status code of the API response
     */
    readonly statusCode?: number;
    /**
     * Date of the API response
     */
    readonly date?: Date;
    /**
     * Headers in the API response
     */
    readonly headers?: {
        [key: string]: string;
    };
    /**
     * Request ID of the transaction
     */
    readonly requestId?: string;
    /**
     * Object type of the returned data
     */
    readonly object?: string;
    /**
     * etag of the returned data
     */
    readonly etag?: string;
    /**
     * Any error message returned
     */
    readonly errorMessage?: string;
    constructor(statusCode?: number, errorMessage?: string, headers?: {
        [key: string]: string;
    }, body?: {
        [key: string]: string;
    }, request?: {
        [key: string]: string;
    });
}

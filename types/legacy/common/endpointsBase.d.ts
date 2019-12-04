import { ApiMetadata } from "./apiMetadata";
import { SDKError } from "./sdkError";
/**
 * Internal class
 * @ignore
 */
export declare class EndpointsBase {
    private lastMeta;
    getLastMeta(): ApiMetadata;
    protected responseHandler(error: SDKError, response: any): void;
}

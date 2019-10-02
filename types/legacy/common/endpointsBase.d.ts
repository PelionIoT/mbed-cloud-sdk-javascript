import { ApiMetadata } from "./apiMetadata";
import { SDKError } from "./sdkError";
/**
 * Internal class
 * @ignore
 */
export declare class EndpointsBase {
    private lastMeta;
    protected responseHandler(error: SDKError, response: any): void;
    getLastMeta(): ApiMetadata;
}

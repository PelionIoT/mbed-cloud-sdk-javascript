import { Resource as apiResource } from "../../_api/mds";
import { Resource } from "./resource";
/**
 * Resource Adapter
 */
export declare class ResourceAdapter {
    static map(from: apiResource, deviceId: string): Resource;
}

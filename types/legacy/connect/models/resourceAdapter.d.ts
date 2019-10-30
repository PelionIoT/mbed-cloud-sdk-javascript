import { Resource as apiResource } from "../../_api/mds";
import { ConnectApi } from "../connectApi";
import { Resource } from "./resource";
/**
 * Resource Adapter
 */
export declare class ResourceAdapter {
    static map(from: apiResource, deviceId: string, api: ConnectApi): Resource;
}

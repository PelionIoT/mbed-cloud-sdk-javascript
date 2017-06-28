import { EndpointData as apiDeviceEvent, ResourcesData as apiResourceEvent } from "../../_api/mds";
import { DeviceEvent } from "../types";
import { ConnectApi } from "../connectApi";
import { Resource } from "./resource";
/**
 * Device Event Adapter
 */
export declare class DeviceEventAdapter {
    static mapResource(from: apiResourceEvent, deviceId: string, api: ConnectApi): Resource;
    static map(from: apiDeviceEvent, api: ConnectApi): DeviceEvent<Resource>;
}

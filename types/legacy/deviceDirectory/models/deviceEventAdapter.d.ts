import { DeviceEventData as apiDeviceEvent } from "../../_api/device_directory";
import { DeviceEvent } from "./deviceEvent";
/**
 * Device Event Adapter
 */
export declare class DeviceEventAdapter {
    static map(from: apiDeviceEvent): DeviceEvent;
}

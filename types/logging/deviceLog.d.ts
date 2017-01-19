import { DeviceLogType } from "./types";
import { DeviceLogSerializerData as apiDeviceLogType } from "../_api/device_catalog";
export declare class DeviceLog {
    constructor(options: DeviceLogType);
    static map(from: apiDeviceLogType): DeviceLog;
}
export interface DeviceLog extends DeviceLogType {
}

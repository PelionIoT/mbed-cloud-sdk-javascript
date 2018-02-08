import { DeviceData as apiDevice, DeviceDataPostRequest as apiDeviceAdd, DeviceDataPutRequest as apiDeviceUpdate } from "../../_api/device_directory";
import { DeviceDirectoryApi } from "../deviceDirectoryApi";
import { AddDeviceObject, UpdateDeviceObject } from "../types";
import { Device } from "./device";
/**
 * Device Adapter
 */
export declare class DeviceAdapter {
    static map(from: apiDevice, api: DeviceDirectoryApi): Device;
    static addMap(from: AddDeviceObject): apiDeviceAdd;
    static updateMap(from: UpdateDeviceObject): apiDeviceUpdate;
}

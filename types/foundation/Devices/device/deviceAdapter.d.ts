import { Adapter } from "../../../common/adapter";
import { Device } from "./device";
/**
 *Device adapter
 */
export declare class DeviceAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data: any, instance?: any): Device;
}

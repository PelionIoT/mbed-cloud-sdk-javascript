import { Endpoint as apiConnectedDevice } from "../../_api/mds";
import { ConnectApi } from "../connectApi";
import { ConnectedDevice } from "./connectedDevice";
/**
 * Connected Device Adapter
 */
export declare class ConnectedDeviceAdapter {
    static map(from: apiConnectedDevice, api: ConnectApi): ConnectedDevice;
}

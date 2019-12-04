import { ConnectApi } from "../../../";
import { CallbackFn } from "../../common/interfaces";
import { ListResponse } from "../../common/listResponse";
import DeviceDirectoryApi from "../../deviceDirectory";
import { ConnectedDevice } from "../models/connectedDevice";
export declare const listConnectedDevices: (connect: ConnectApi, deviceDirectory: DeviceDirectoryApi, options?: any, callback?: CallbackFn<ListResponse<ConnectedDevice>>) => Promise<ListResponse<ConnectedDevice>>;

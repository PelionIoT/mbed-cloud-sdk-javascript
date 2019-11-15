import { ConnectApi } from "../../../";
import { apiWrapper } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { ListResponse } from "../../common/listResponse";
import DeviceDirectoryApi from "../../deviceDirectory";
import { ConnectedDevice } from "../models/connectedDevice";

export const listConnectedDevices = (
    connect: ConnectApi,
    deviceDirectory: DeviceDirectoryApi,
    options?: any,
    callback?: CallbackFn<ListResponse<ConnectedDevice>>
): Promise<ListResponse<ConnectedDevice>> => {
    options = options || {};
    if (typeof options === "function") {
        callback = options;
        options = {};
    }

    // Grab all connected devices
    options.filter = options.filter || {};
    options.filter.state = "registered";

    return apiWrapper(
        resultsFn => {
            deviceDirectory.listDevices(options, resultsFn);
        },
        (data, done) => {
            const devices = data.data.map(device => {
                return new ConnectedDevice(device, connect);
            });

            done(null, new ListResponse<ConnectedDevice>(data, devices));
        },
        callback
    );
};

import { apiWrapper } from "../../common/functions";
import { ListResponse } from "../../common/listResponse";
import { ConnectedDevice } from "../models/connectedDevice";
export const listConnectedDevices = (connect, deviceDirectory, options, callback) => {
    options = options || {};
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    // Grab all connected devices
    options.filter = options.filter || {};
    options.filter.state = "registered";
    return apiWrapper(resultsFn => {
        deviceDirectory.listDevices(options, resultsFn);
    }, (data, done) => {
        const devices = data.data.map(device => {
            return new ConnectedDevice(device, connect);
        });
        done(null, new ListResponse(data, devices));
    }, callback);
};
//# sourceMappingURL=devices.js.map
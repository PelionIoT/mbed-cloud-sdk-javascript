"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../common/functions");
var listResponse_1 = require("../../common/listResponse");
var connectedDevice_1 = require("../models/connectedDevice");
exports.listConnectedDevices = function (connect, deviceDirectory, options, callback) {
    options = options || {};
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    // Grab all connected devices
    options.filter = options.filter || {};
    options.filter.state = "registered";
    return functions_1.apiWrapper(function (resultsFn) {
        deviceDirectory.listDevices(options, resultsFn);
    }, function (data, done) {
        var devices = data.data.map(function (device) {
            return new connectedDevice_1.ConnectedDevice(device, connect);
        });
        done(null, new listResponse_1.ListResponse(data, devices));
    }, callback);
};
//# sourceMappingURL=devices.js.map
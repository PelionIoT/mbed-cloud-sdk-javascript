"use strict";
/*
 * Device State
 */
var DeviceState = (function () {
    function DeviceState(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    DeviceState.map = function (from) {
        var type = {
            campaign: from.campaign,
            createdAt: from.created_at,
            description: from.description,
            deviceId: from.device_id,
            id: from.id,
            mechanism: from.mechanism,
            mechanismUrl: from.mechanism_url,
            name: from.name,
            state: from.deployment_state,
            updatedAt: from.updated_at
        };
        return new DeviceState(type);
    };
    return DeviceState;
}());
exports.DeviceState = DeviceState;

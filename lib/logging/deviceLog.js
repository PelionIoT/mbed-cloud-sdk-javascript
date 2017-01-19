"use strict";
/*
 * Device Log
 */
var DeviceLog = (function () {
    function DeviceLog(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    DeviceLog.map = function (from) {
        var type = {
            changes: from.changes,
            data: from.data,
            eventDate: from.date_time,
            description: from.description,
            deviceId: from.device_id,
            logId: from.device_log_id,
            eventType: from.event_type,
            eventTypeDescription: from.event_type_description,
            stateChanged: from.state_change
        };
        return new DeviceLog(type);
    };
    return DeviceLog;
}());
exports.DeviceLog = DeviceLog;

"use strict";
/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var deviceEvent_1 = require("./deviceEvent");
/**
 * Device Event Adapter
 */
var DeviceEventAdapter = /** @class */ (function () {
    function DeviceEventAdapter() {
    }
    DeviceEventAdapter.map = function (from) {
        return new deviceEvent_1.DeviceEvent({
            id: from.id,
            eventDate: from.date_time,
            stateChanged: from.state_change,
            description: from.description,
            changes: from.changes,
            typeDescription: from.event_type_description,
            type: from.event_type,
            data: from.data,
            deviceId: from.device_id,
        });
    };
    return DeviceEventAdapter;
}());
exports.DeviceEventAdapter = DeviceEventAdapter;
//# sourceMappingURL=deviceEventAdapter.js.map
"use strict";
/*
* Mbed Cloud JavaScript SDK
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
var resource_1 = require("./resource");
/**
 * Device Event Adapter
 */
var DeviceEventAdapter = /** @class */ (function () {
    function DeviceEventAdapter() {
    }
    DeviceEventAdapter.mapResource = function (from, deviceId, api) {
        return new resource_1.Resource({
            contentType: from.ct,
            observable: from.obs,
            type: from.rf,
            path: from.path,
            deviceId: deviceId
        }, api);
    };
    DeviceEventAdapter.map = function (from, api) {
        var resources = from.resources.map(function (resource) {
            return DeviceEventAdapter.mapResource(resource, from.ep, api);
        });
        return {
            id: from.ep,
            type: from.ept,
            queueMode: from.q,
            resources: resources
        };
    };
    return DeviceEventAdapter;
}());
exports.DeviceEventAdapter = DeviceEventAdapter;

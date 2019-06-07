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
var deviceStateObserver_1 = require("./observers/deviceStateObserver");
var resourceValuesObserver_1 = require("./observers/resourceValuesObserver");
var Subscribe = /** @class */ (function () {
    function Subscribe(_connect) {
        if (_connect) {
            this.connect = _connect;
        }
        this.deviceStateObservers = new Array();
        this.resourceValueObservers = new Array();
    }
    /**
     * Returns a deviceStateObserver that is listening for device events.
     * To subscribe to specific events or devices, a DeviceEventFilter must be provided.
     *
     * Example: subscribe to device registration events.
     *
     * ```javascript
     * const observer = connect.subscribe.deviceStateChanges({ event: "registrations" });
     * // add a callback
     * observer.addCallback(res => console.log(res));
     * ```
     *
     * @param filter the deviceEventFilter
     */
    Subscribe.prototype.deviceStateChanges = function (filter) {
        var observer = new deviceStateObserver_1.DeviceStateObserver(filter);
        this.deviceStateObservers.push(observer);
        this.startNotifications();
        return observer;
    };
    Subscribe.prototype.resourceValues = function (filter, immediacy) {
        if (immediacy === void 0) { immediacy = "OnValueUpdate"; }
        var observer = new resourceValuesObserver_1.ResourceValuesObserver(filter, this.connect, immediacy);
        this.resourceValueObservers.push(observer);
        this.startNotifications();
        return observer;
    };
    /**
     * Notify all observers
     * @param data
     */
    Subscribe.prototype.notifyDeviceEvents = function (data) {
        this.deviceStateObservers.forEach(function (observer) { return observer.notify(data); });
    };
    /**
     * Notify all observers
     * @param data
     */
    Subscribe.prototype.notifyResourceValues = function (data) {
        this.resourceValueObservers.forEach(function (observer) { return observer.notify(data); });
    };
    Subscribe.prototype.startNotifications = function () {
        if (this.connect) {
            this.connect.startNotifications();
        }
    };
    return Subscribe;
}());
exports.Subscribe = Subscribe;
//# sourceMappingURL=subscribe.js.map
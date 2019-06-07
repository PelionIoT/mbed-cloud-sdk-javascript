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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var observer_1 = require("./observer");
var functions_1 = require("../../../legacy/common/functions");
var DeviceStateObserver = /** @class */ (function (_super) {
    __extends(DeviceStateObserver, _super);
    function DeviceStateObserver(_filter) {
        var _this = _super.call(this) || this;
        _this._subscribed = true;
        if (_filter) {
            _this.filter = _filter;
        }
        return _this;
    }
    DeviceStateObserver.prototype.filterFunc = function (data) {
        if (this.filter) {
            for (var key in this.filter) {
                if (functions_1.ensureArray(this.filter[key]).indexOf(data[key]) === -1) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * Notify this observer
     * @param data
     */
    DeviceStateObserver.prototype.notify = function (data) {
        if (this._subscribed) {
            if (this.filterFunc(data)) {
                _super.prototype.notify.call(this, data);
            }
        }
    };
    /**
     * Stop this observer from recieving notifications
     */
    DeviceStateObserver.prototype.unsubscribe = function () {
        this._subscribed = false;
        _super.prototype.clearListeners.call(this);
    };
    return DeviceStateObserver;
}(observer_1.Observer));
exports.DeviceStateObserver = DeviceStateObserver;
//# sourceMappingURL=deviceStateObserver.js.map
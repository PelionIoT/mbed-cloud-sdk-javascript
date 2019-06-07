"use strict";
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
var observer_1 = require("./observer");
var functions_1 = require("../../../legacy/common/functions");
var ResourceValuesObserver = /** @class */ (function (_super) {
    __extends(ResourceValuesObserver, _super);
    function ResourceValuesObserver(_filter, _connect, firstValue) {
        if (firstValue === void 0) { firstValue = "OnValueUpdate"; }
        var _this = _super.call(this) || this;
        _this._subscribed = true;
        _this.firstValue = firstValue;
        _this.localPresubscriptions = new Array();
        if (_connect) {
            _this.connect = _connect;
        }
        if (_filter) {
            _this.filter = _filter;
            // create presubscriptions
            functions_1.ensureArray(_this.filter.deviceId).forEach(function (d) {
                _this.localPresubscriptions.push({ deviceId: d, resourcePaths: _this.filter.resourcePaths || new Array() });
            });
            _this.syncPresubscriptions();
        }
        return _this;
    }
    /**
     * Notify this observer
     * @param data
     */
    ResourceValuesObserver.prototype.notify = function (data) {
        if (this._subscribed) {
            if (this.localPresubscriptions.length === 0) {
                _super.prototype.notify.call(this, data);
            }
            if (this.compareData(data)) {
                _super.prototype.notify.call(this, data);
            }
        }
    };
    /**
     * Stop this observer from recieving notifications
     */
    ResourceValuesObserver.prototype.unsubscribe = function () {
        this._subscribed = false;
        _super.prototype.clearListeners.call(this);
    };
    ResourceValuesObserver.prototype.compareData = function (data) {
        return this.localPresubscriptions.some(function (sub) {
            return functions_1.matchWithWildcard(sub.deviceId, data.deviceId) && (sub.resourcePaths.length === 0 || sub.resourcePaths.some(function (r) { return functions_1.matchWithWildcard(r, data.path); }));
        });
    };
    ResourceValuesObserver.prototype.syncPresubscriptions = function () {
        var _this = this;
        if (this.connect) {
            this.connect.listPresubscriptions()
                .then(function (subs) {
                var concat = _this.localPresubscriptions.concat(subs);
                var union = concat.filter(function (el, i, a) { return i === a.indexOf(el); });
                _this.connect.updatePresubscriptions(union);
            });
            if (this.firstValue === "OnValueUpdate") {
                this.localPresubscriptions.forEach(function (p) {
                    _this.connect.listConnectedDevices()
                        .then(function (devices) {
                        devices.data.filter(function (device) { return functions_1.matchWithWildcard(device.id, p.deviceId); })
                            .forEach(function (m) {
                            m.listResources()
                                .then(function (r) {
                                r.forEach(function (q) {
                                    if (p.resourcePaths.length === 0 || p.resourcePaths.some(function (w) { return functions_1.matchWithWildcard(w, q.path); })) {
                                        _this.connect.addResourceSubscription(m.id, q.path);
                                    }
                                });
                            });
                        });
                    });
                });
            }
        }
    };
    return ResourceValuesObserver;
}(observer_1.Observer));
exports.ResourceValuesObserver = ResourceValuesObserver;
//# sourceMappingURL=resourceValuesObserver.js.map
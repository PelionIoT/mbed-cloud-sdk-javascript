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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var utils_1 = require("../../../common/utils");
var functions_1 = require("../../../legacy/common/functions");
var types_1 = require("../../../legacy/connect/types");
var observer_1 = require("./observer");
var ResourceValuesObserver = /** @class */ (function (_super) {
    __extends(ResourceValuesObserver, _super);
    function ResourceValuesObserver(_filter, _connect, firstValue) {
        if (firstValue === void 0) { firstValue = "OnValueUpdate"; }
        var _this = _super.call(this) || this;
        _this.firstValue = firstValue;
        _this.localPresubscriptions = new Array();
        if (_connect) {
            _this.connect = _connect;
        }
        if (_filter) {
            _this.filter = _filter;
            // create presubscriptions
            functions_1.ensureArray(_this.filter.deviceId).forEach(function (d) {
                _this.localPresubscriptions.push({
                    deviceId: d,
                    resourcePaths: _this.filter.resourcePaths || new Array(),
                });
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
        if (this.subscribed) {
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
        this.subscribed = false;
        _super.prototype.clearListeners.call(this);
    };
    ResourceValuesObserver.prototype.compareData = function (data) {
        return this.localPresubscriptions.some(function (sub) {
            return (functions_1.matchWithWildcard(sub.deviceId, data.deviceId) &&
                (sub.resourcePaths.length === 0 || sub.resourcePaths.some(function (r) { return functions_1.matchWithWildcard(r, data.path); })));
        });
    };
    ResourceValuesObserver.prototype.syncPresubscriptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.connect) {
                    this.connect
                        .listPresubscriptions()
                        .then(function (serverPresubscriptions) {
                        return _this.connect.updatePresubscriptions(_this.unionOfPresubscriptions(serverPresubscriptions, _this.localPresubscriptions));
                    });
                    if (this.firstValue === "OnValueUpdate") {
                        this.localPresubscriptions.forEach(function (p) {
                            _this.connect.listConnectedDevices().then(function (devices) {
                                devices.data
                                    .filter(function (device) { return functions_1.matchWithWildcard(device.id, p.deviceId); })
                                    .forEach(function (m) {
                                    m.listResources().then(function (r) {
                                        r.forEach(function (q) {
                                            if (p.resourcePaths.length === 0 ||
                                                p.resourcePaths.some(function (w) { return functions_1.matchWithWildcard(w, q.path); })) {
                                                _this.connect.addResourceSubscription(m.id, q.path);
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ResourceValuesObserver.prototype.unionOfPresubscriptions = function (server, local) {
        return utils_1.union(server, local, types_1.presubscriptionsEqual);
    };
    return ResourceValuesObserver;
}(observer_1.Observer));
exports.ResourceValuesObserver = ResourceValuesObserver;
//# sourceMappingURL=resourceValuesObserver.js.map
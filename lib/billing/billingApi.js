"use strict";
/*
 * Mbed Cloud JavaScript SDK
 * Copyright Arm Limited 2018
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
var endpoints_1 = require("./endpoints");
var functions_1 = require("../common/functions");
var quotaHistoryAdapter_1 = require("./models/quotaHistoryAdapter");
var listResponse_1 = require("../common/listResponse");
var servicePackageAdapter_1 = require("./models/servicePackageAdapter");
var sdkError_1 = require("../common/sdkError");
var fs_1 = require("fs");
var BillingApi = /** @class */ (function () {
    /**
     * @param options Connection objects
     */
    function BillingApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    BillingApi.prototype.getReportOverview = function (month, filepath, callback) {
        var _this = this;
        if (typeof filepath === "function") {
            callback = filepath;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.billing.getBillingReport(functions_1.dateToBillingMonth(month), resultsFn);
        }, function (data, done) {
            var string = JSON.stringify(data);
            if (typeof window === "undefined") {
                // we're in node
                if (filepath) {
                    fs_1.writeFile(filepath, string, "utf8", function (error) {
                        if (error) {
                            return done(new sdkError_1.SDKError(error.message), null);
                        }
                        return done(null, string);
                    });
                }
            }
            else {
                done(null, string);
            }
        }, callback);
    };
    BillingApi.prototype.getServicePackages = function (callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.billing.getServicePackages(resultsFn);
        }, function (data, done) {
            var list = new Array();
            if (data) {
                if (data.pending) {
                    list.push(servicePackageAdapter_1.mapPending(data.pending));
                }
                if (data.active) {
                    list.push(servicePackageAdapter_1.mapActive(data.active));
                }
                if (data.previous) {
                    data.previous.forEach(function (p) { return list.push(servicePackageAdapter_1.mapPrevious(p)); });
                }
            }
            done(null, list);
        }, callback);
    };
    BillingApi.prototype.getQuotaHistory = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var limit = options.limit, after = options.after;
            _this._endpoints.billing.getServicePackageQuotaHistory(limit, after, resultsFn);
        }, function (data, done) {
            var keys;
            if (data && data.data && data.data.length) {
                keys = data.data.map(function (key) {
                    return quotaHistoryAdapter_1.mapQuotaHistory(key);
                });
            }
            done(null, new listResponse_1.ListResponse(data, keys));
        }, callback);
    };
    BillingApi.prototype.getQuotaRemaining = function (callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.billing.getServicePackageQuota(resultsFn);
        }, function (data, done) {
            if (data) {
                return done(null, data.quota);
            }
        }, callback);
    };
    return BillingApi;
}());
exports.BillingApi = BillingApi;

//# sourceMappingURL=billingApi.js.map

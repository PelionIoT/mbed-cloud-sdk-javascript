"use strict";
/*
 * Pelion Device Management JavaScript SDK
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
var superagent_1 = require("superagent");
var BillingApi = /** @class */ (function () {
    /**
     * The API can be initalized with a .env file in the wroking directory with the following values
     *
     * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
     *
     * and optionally
     *
     * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
     *
     * OR
     * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
     *
     * To create an instance of this API in [Node.js](https://nodejs.org):
     *
     * ```JavaScript
     * var PelionDMSDK = require("mbed-cloud-sdk");
     *
     * var billing = new PelionDMSDK.BillingApi({
     *     apiKey: "<Pelion DM API Key>"
     * });
     * ```
     *
     * To create an instance of this API in the browser:
     *
     * ```html
     * <script src="<pelion-dm-sdk>/bundles/billing.min.js"></script>
     *
     * <script>
     *     var billing = new MbedCloudSDK.BillingApi({
     *         apiKey: "<Pelion DM API Key>"
     *     });
     * </script>
     * ```
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
            if (functions_1.isThisNode()) {
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
    BillingApi.prototype.getReportActiveDevices = function (month, filepath, callback) {
        var _this = this;
        if (typeof filepath === "function") {
            callback = filepath;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.billing.getBillingReportActiveDevices(functions_1.dateToBillingMonth(month), resultsFn);
        }, function (data, done) {
            _this.streamToFile(filepath, data.url, done);
        }, callback);
    };
    BillingApi.prototype.getReportFirmwareUpdates = function (month, filepath, callback) {
        var _this = this;
        if (typeof filepath === "function") {
            callback = filepath;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.billing.getBillingReportFirmwareUpdates(functions_1.dateToBillingMonth(month), resultsFn);
        }, function (data, done) {
            _this.streamToFile(filepath, data.url, done);
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
    /**
     * Streams content from HTTP url to file path on disk
     * @param filepath
     * @param url
     * @param done callback
     */
    BillingApi.prototype.streamToFile = function (filepath, url, done) {
        if (functions_1.isThisNode() && filepath) {
            // we're in node and want to stream a file
            var fileStream = fs_1.createWriteStream(filepath, { flags: "a+" });
            var req = superagent_1.get(url);
            // bugfix: https://github.com/segmentio/superagent-retry/issues/24
            //         https://github.com/visionmedia/superagent/issues/313
            req.pipe(fileStream).on("finish", function (_) {
                done(null, url);
            });
            req.on("error", function (error) {
                done(new sdkError_1.SDKError(error.message), null);
            });
        }
        else {
            done(null, url);
        }
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
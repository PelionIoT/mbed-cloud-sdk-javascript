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
var functions_1 = require("../common/functions");
var endpoints_1 = require("./endpoints");
var listResponse_1 = require("../common/listResponse");
var EnrollmentAdapter = require("./models/enrollmentClaimAdapter");
var EnrollmentApi = /** @class */ (function () {
    /**
     * @param options Connection objects
     */
    function EnrollmentApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    EnrollmentApi.prototype.addEnrollmentClaim = function (enrollmentClaim, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.enrollment.createDeviceEnrollment(EnrollmentAdapter.addMap(enrollmentClaim), resultsFn);
        }, function (data, done) {
            done(null, EnrollmentAdapter.map(data, _this));
        }, callback);
    };
    EnrollmentApi.prototype.getEnrollmentClaim = function (claimId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.enrollment.getDeviceEnrollment(claimId, resultsFn);
        }, function (data, done) {
            done(null, EnrollmentAdapter.map(data, _this));
        }, callback);
    };
    EnrollmentApi.prototype.listEnrollmentClaims = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var limit = options.limit, after = options.after, order = options.order, include = options.include;
            _this._endpoints.enrollment.getDeviceEnrollments(limit, order, after, functions_1.encodeInclude(include), resultsFn);
        }, function (data, done) {
            var devices = data.data.map(function (device) {
                return EnrollmentAdapter.map(device, _this);
            });
            done(null, new listResponse_1.ListResponse(data, devices));
        }, callback);
    };
    EnrollmentApi.prototype.deleteEnrollmentClaim = function (claimId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.enrollment.deleteDeviceEnrollment(claimId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    EnrollmentApi.prototype.getLastApiMetadata = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            done(null, _this._endpoints.getLastMeta());
        }, callback);
    };
    return EnrollmentApi;
}());
exports.EnrollmentApi = EnrollmentApi;

//# sourceMappingURL=enrollmentApi.js.map

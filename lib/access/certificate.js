"use strict";
/*
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
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
var functions_1 = require("../common/functions");
/*
 * Certificate
 */
var Certificate = (function () {
    function Certificate(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Certificate.map = function (from, api) {
        var type = {
            accountId: from.account_id,
            createdAt: from.created_at,
            data: from.cert_data,
            id: from.id,
            issuer: from.issuer,
            name: from.name,
            service: from.service,
            subject: from.subject,
            validity: from.validity
        };
        return new Certificate(type, api);
    };
    Certificate.reverseMap = function (from) {
        return {
            cert_data: from.certificateData,
            name: from.name,
            service: from.service,
            signature: from.signature
        };
    };
    Certificate.prototype.update = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.updateCertificate({
                id: _this.id,
                name: options.name,
                certificateData: options.certificateData,
                service: options.service,
                signature: options.signature
            }, done);
        }, callback);
    };
    Certificate.prototype.delete = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteCertificate(_this, done);
        }, callback);
    };
    return Certificate;
}());
exports.Certificate = Certificate;

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
var functions_1 = require("../../common/functions");
/**
 * Certificate
 */
var Certificate = /** @class */ (function () {
    function Certificate(init, _api) {
        this._api = _api;
        /**
         * If true, signature parameter is not required. Default value is false.
         */
        this.enrollmentMode = false;
        for (var key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
    Certificate.prototype.update = function (signature, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.updateCertificate({
                id: _this.id,
                signature: signature,
                type: _this.type,
                status: _this.status,
                certificateData: _this.certificateData,
                name: _this.name,
                description: _this.description,
            }, done);
        }, callback);
    };
    Certificate.prototype.delete = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteCertificate(_this.id, done);
        }, callback);
    };
    return Certificate;
}());
exports.Certificate = Certificate;
//# sourceMappingURL=certificate.js.map
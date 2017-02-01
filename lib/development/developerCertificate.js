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
var pg = require("polygoat");
/*
 * Development Certificate
 */
var DeveloperCertificate = (function () {
    function DeveloperCertificate(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    DeveloperCertificate.map = function (from, api) {
        var type = {
            createdAt: from.created_at,
            id: from.id,
            publicKey: from.pub_key
        };
        return new DeveloperCertificate(type, api);
    };
    DeveloperCertificate.reverseMap = function (from) {
        return {
            pub_key: from.publicKey
        };
    };
    DeveloperCertificate.prototype.delete = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.deleteCertificate(done);
        }, callback);
    };
    return DeveloperCertificate;
}());
exports.DeveloperCertificate = DeveloperCertificate;

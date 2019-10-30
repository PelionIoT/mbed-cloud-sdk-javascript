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
var functions_1 = require("../../common/functions");
var PreSharedKey = /** @class */ (function () {
    function PreSharedKey(init, _api) {
        var _this = this;
        this._api = _api;
        Object.keys(init).forEach(function (key) {
            _this[key] = init[key];
        });
    }
    PreSharedKey.prototype.delete = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deletePsk(_this.endpointName, done);
        }, callback);
    };
    return PreSharedKey;
}());
exports.PreSharedKey = PreSharedKey;
//# sourceMappingURL=preSharedKey.js.map
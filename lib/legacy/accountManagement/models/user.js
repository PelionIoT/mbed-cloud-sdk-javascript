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
 * User
 */
var User = /** @class */ (function () {
    function User(init, _api) {
        this._api = _api;
        for (var key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
    User.prototype.update = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.updateUser(_this, done);
        }, callback);
    };
    User.prototype.listGroups = function (callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._api.listGroups(null, resultsFn);
        }, function (data, done) {
            var groups = [];
            if (data.data && data.data.length) {
                groups = data.data.filter(function (group) {
                    return _this.groups.indexOf(group.id) > -1;
                });
            }
            done(null, groups);
        }, callback);
    };
    User.prototype.listApiKeys = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.asyncStyle(function (done) {
            options.filter = {
                ownerId: { $eq: _this.id },
            };
            _this._api.listApiKeys(options, done);
        }, callback);
    };
    User.prototype.delete = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteUser(_this.id, done);
        }, callback);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map
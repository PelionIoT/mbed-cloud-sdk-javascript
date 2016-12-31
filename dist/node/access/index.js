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
var iam_1 = require("../_api/iam");
/**
* Root Account object
*/
var Access = (function () {
    /**
    * @param options Options object
    */
    function Access(options) {
        this._apis = new Access.APIContainer(options);
    }
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    Access.prototype.getUsers = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var limit = options.limit, after = options.after, order = options.order, include = options.include, filter = options.filter;
        return pg(function (done) {
            _this._apis.adAPI.getAllUsers(limit, after, order, include, filter, function (error, data) {
                if (error)
                    return done(error);
                /*
                { object: 'list',
                 limit: 50,
                 order: 'ASC',
                 total_count: 23,
                 has_more: false,
                 data:
                 */
                var users = data.data.map(function (user) {
                    return new Access.User(_this._apis, user);
                });
                done(null, users);
            });
        }, callback);
    };
    return Access;
}());
exports.Access = Access;
(function (Access) {
    var APIContainer = (function () {
        function APIContainer(options) {
            this.adAPI = new iam_1.AccountAdminApi(options.host);
            this.adAPI.setApiKey(iam_1.AccountAdminApiApiKeys.Bearer, "Bearer " + options.accessKey);
        }
        return APIContainer;
    }());
    Access.APIContainer = APIContainer;
    var User = (function () {
        function User(_apis, options) {
            this._apis = _apis;
            for (var key in options) {
                this[key] = options[key];
            }
            this._apis = null; //deleteme
        }
        return User;
    }());
    Access.User = User;
})(Access = exports.Access || (exports.Access = {}));

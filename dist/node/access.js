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
var iam_1 = require("./_api/iam");
/**
* Root Account object
*/
var Access = (function () {
    /**
    * @param options Options object
    */
    function Access(options) {
        this.api = new iam_1.AccountAdminApi();
        //        if (options.host) this.client.basePath = options.host;
        if (options.accessKey)
            this.api.setApiKey(iam_1.AccountAdminApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    Access.prototype.getUsers = function (limit, after, order, include, filter, callback) {
        var _this = this;
        return pg(function (done) {
            _this.api.getAllUsers(limit, after, order, include, filter, function (error, response) {
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
                var users = response.body.data.map(function (user) {
                    return new User(_this.api, user);
                });
                done(null, users);
            });
        }, callback);
    };
    return Access;
}());
exports.Access = Access;
var User = (function () {
    function User(api, options) {
        this.api = api;
        for (var key in options) {
            this[key] = options[key];
        }
        this.api = null;
    }
    return User;
}());
exports.User = User;

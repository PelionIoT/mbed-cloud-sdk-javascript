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
var functions_1 = require("../common/functions");
/*
 * Query
 */
var Query = (function () {
    function Query(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Query.map = function (from, api) {
        var attributes = functions_1.decodeAttributes(from.query, Query.CUSTOM_PREFIX);
        var type = {
            attributes: attributes.noMatch,
            customAttributes: attributes.match,
            createdAt: from.created_at,
            description: from.description,
            id: from.id,
            name: from.name,
            updatedAt: from.updated_at
        };
        return new Query(type, api);
    };
    Query.reverseMap = function (from) {
        return {
            description: from.description,
            name: from.name,
            query: functions_1.encodeFilter(from, Query.CUSTOM_PREFIX)
        };
    };
    Query.prototype.update = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.updateQuery({
                id: _this.id,
                name: options.name,
                description: options.description,
                attributes: options.attributes,
                customAttributes: options.customAttributes
            }, done);
        }, callback);
    };
    Query.prototype.delete = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.deleteQuery(_this, done);
        }, callback);
    };
    return Query;
}());
exports.Query = Query;
Query.CUSTOM_PREFIX = "custom_attributes__";

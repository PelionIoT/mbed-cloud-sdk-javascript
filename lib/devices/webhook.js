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
 * Webhook
 */
var Webhook = (function () {
    function Webhook(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Webhook.map = function (from, api) {
        var type = {
            headers: from.headers,
            url: from.url
        };
        return new Webhook(type, api);
    };
    Webhook.reverseMap = function (from) {
        return {
            headers: from.headers,
            url: from.url
        };
    };
    Webhook.prototype.update = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.updateWebhook(options, done);
        }, callback);
    };
    Webhook.prototype.delete = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.deleteWebhook(done);
        }, callback);
    };
    return Webhook;
}());
exports.Webhook = Webhook;

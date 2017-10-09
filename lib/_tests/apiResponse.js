"use strict";
/*
* Mbed Cloud JavaScript SDK
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _a = intern.getInterface("tdd"), suite = _a.suite, test = _a.test, beforeEach = _a.beforeEach;
var assert = intern.getPlugin("chai").assert;
var apiBase_1 = require("../common/apiBase");
var Api = /** @class */ (function (_super) {
    __extends(Api, _super);
    function Api() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Api.prototype.complete = function (error, response, acceptHeader, callback) {
        return _super.prototype.complete.call(this, error, response, acceptHeader, callback);
    };
    return Api;
}(apiBase_1.ApiBase));
suite("apiBase", function () {
    var api;
    beforeEach(function () {
        api = new Api();
    });
    test("should execute callback", function () {
        api.complete(null, null, null, function (_error, _data) {
            assert(true);
        });
    });
    test("should return body", function () {
        var body = "body";
        var text = "text";
        api.complete(null, {
            body: body,
            text: text
        }, null, function (_error, data) {
            assert.strictEqual(data, body);
        });
    });
    test("should return text", function () {
        var text = "text";
        api.complete(null, {
            text: text
        }, "application/json", function (_error, data) {
            assert.strictEqual(data, text);
        });
    });
    test("should make date", function () {
        var date = "1977-01-12T14:49:20.869Z";
        api.complete(null, {
            body: {
                birthday: date
            }
        }, "application/json", function (_error, data) {
            assert.typeOf(data.birthday, "date");
            assert.strictEqual(data.birthday.getDate(), 12);
            assert.strictEqual(data.birthday.getMonth(), 0);
            assert.strictEqual(data.birthday.getFullYear(), 1977);
        });
    });
    test("should not make date with application/json", function () {
        var date = "nineteen-seventy-seven";
        api.complete(null, {
            body: {
                birthday: date
            }
        }, "application/json", function (_error, data) {
            assert.typeOf(data.birthday, "string");
            assert.strictEqual(data.birthday, date);
        });
    });
    test("should not make date without application/json", function () {
        var date = "nineteen-seventy-seven";
        api.complete(null, {
            body: {
                birthday: date
            }
        }, null, function (_error, data) {
            assert.typeOf(data.birthday, "string");
            assert.notEqual(data, date);
        });
    });
    test("should raise error", function () {
        var message = "abort!";
        api.complete({
            message: message
        }, null, null, function (error) {
            assert.strictEqual(error.message, message);
        });
    });
    test("should have error details", function () {
        var message = "abort!";
        var details = "more details";
        api.complete({
            message: message
        }, {
            body: details
        }, null, function (error) {
            assert.strictEqual(error.message, message);
            assert.strictEqual(error.details, details);
        });
    });
    test("should raise error from response", function () {
        var message = "abort!";
        var responseError = "error!";
        var details = "more details";
        api.complete({
            message: message
        }, {
            body: details,
            error: {
                message: responseError
            }
        }, null, function (error) {
            assert.strictEqual(error.message, responseError);
            assert.strictEqual(error.details, details);
        });
    });
    test("should raise error from body", function () {
        var message = "abort!";
        var bodyError = "error!";
        api.complete({
            message: message
        }, {
            body: {
                message: bodyError
            }
        }, null, function (error) {
            assert.strictEqual(error.message, bodyError);
        });
    });
    test("should raise error from body message", function () {
        var message = "abort!";
        var bodyError = "error!";
        api.complete({
            message: message
        }, {
            body: {
                message: {
                    error: bodyError
                }
            }
        }, null, function (error) {
            assert.strictEqual(error.message, bodyError);
        });
    });
});

//# sourceMappingURL=apiResponse.js.map

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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = intern.getInterface("tdd"), suite = _a.suite, test = _a.test, beforeEach = _a.beforeEach;
var assert = intern.getPlugin("chai").assert;
var connectApi_1 = require("../connect/connectApi");
suite("connectEvents", function () {
    var api;
    beforeEach(function () {
        api = new connectApi_1.ConnectApi({
            apiKey: "key"
        });
    });
    test("should emit notification", function (ctx) {
        var dfd = ctx.async(1000);
        api.on(connectApi_1.ConnectApi.EVENT_NOTIFICATION, function (device) {
            assert.strictEqual(device.id, "device-id");
            dfd.resolve();
        });
        api.on(connectApi_1.ConnectApi.EVENT_REGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_REREGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_DEREGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_EXPIRED, function () {
            assert(false);
        });
        api.notify({
            notifications: [{ ep: "device-id" }]
        });
    });
    test("should emit registration", function (ctx) {
        var dfd = ctx.async(1000);
        api.on(connectApi_1.ConnectApi.EVENT_NOTIFICATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_REGISTRATION, function (device) {
            assert.strictEqual(device.id, "device-id");
            dfd.resolve();
        });
        api.on(connectApi_1.ConnectApi.EVENT_REREGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_DEREGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_EXPIRED, function () {
            assert(false);
        });
        api.notify({
            registrations: [{ ep: "device-id" }]
        });
    });
    test("should emit re-registration", function (ctx) {
        var dfd = ctx.async(1000);
        api.on(connectApi_1.ConnectApi.EVENT_NOTIFICATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_REGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_REREGISTRATION, function (device) {
            assert.strictEqual(device.id, "device-id");
            dfd.resolve();
        });
        api.on(connectApi_1.ConnectApi.EVENT_DEREGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_EXPIRED, function () {
            assert(false);
        });
        api.notify({
            "reg-updates": [{ ep: "device-id" }]
        });
    });
    test("should emit de-registration", function (ctx) {
        var dfd = ctx.async(1000);
        api.on(connectApi_1.ConnectApi.EVENT_NOTIFICATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_REGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_REREGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_DEREGISTRATION, function (id) {
            assert.strictEqual(id, "device-id");
            dfd.resolve();
        });
        api.on(connectApi_1.ConnectApi.EVENT_EXPIRED, function () {
            assert(false);
        });
        api.notify({
            "de-registrations": ["device-id"]
        });
    });
    test("should emit expired", function (ctx) {
        var dfd = ctx.async(1000);
        api.on(connectApi_1.ConnectApi.EVENT_NOTIFICATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_REGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_REREGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_DEREGISTRATION, function () {
            assert(false);
        });
        api.on(connectApi_1.ConnectApi.EVENT_EXPIRED, function (id) {
            assert.strictEqual(id, "device-id");
            dfd.resolve();
        });
        api.notify({
            "registrations-expired": ["device-id"]
        });
    });
    test("should emit multiple", function (ctx) {
        var notifications = {
            "notifications": ["1", "2"],
            "registrations": ["1", "2"],
            "reg-updates": ["1", "2"],
            "de-registrations": ["1", "2"],
            "registrations-expired": ["1", "2"]
        };
        var notificationCount = Object.keys(notifications).length * 2;
        var dfd = ctx.async(1000, notificationCount);
        api.on(connectApi_1.ConnectApi.EVENT_NOTIFICATION, function () {
            dfd.resolve();
        });
        api.on(connectApi_1.ConnectApi.EVENT_REGISTRATION, function () {
            dfd.resolve();
        });
        api.on(connectApi_1.ConnectApi.EVENT_REREGISTRATION, function () {
            dfd.resolve();
        });
        api.on(connectApi_1.ConnectApi.EVENT_DEREGISTRATION, function () {
            dfd.resolve();
        });
        api.on(connectApi_1.ConnectApi.EVENT_EXPIRED, function () {
            dfd.resolve();
        });
        api.notify(notifications);
    });
});
suite("notifications", function () {
    var api;
    function encode(payload) {
        if (typeof btoa === "function")
            return btoa(payload);
        return new Buffer(payload).toString("base64");
    }
    beforeEach(function () {
        api = new connectApi_1.ConnectApi({
            apiKey: "key"
        });
    });
    test("should notify", function (ctx) {
        var dfd = ctx.async(1000);
        var deviceId = "device-id";
        var devicePath = "test";
        var payload = "test-payload";
        var notifyFns = {};
        notifyFns["" + deviceId + devicePath] = function (value) {
            assert.strictEqual(value, payload);
            dfd.resolve();
        };
        // tslint:disable-next-line:no-string-literal
        api["_notifyFns"] = notifyFns;
        api.notify({
            notifications: [{
                    ep: deviceId,
                    path: devicePath,
                    payload: encode(payload)
                }]
        });
    });
    test("should respond to async", function (ctx) {
        var dfd = ctx.async(1000);
        var asyncId = "async-id";
        var payload = "test-payload";
        var asyncFns = {};
        asyncFns[asyncId] = function (_error, value) {
            assert.strictEqual(value, payload);
            dfd.resolve();
        };
        // tslint:disable-next-line:no-string-literal
        api["_asyncFns"] = asyncFns;
        api.notify({
            "async-responses": [{
                    id: asyncId,
                    payload: encode(payload)
                }]
        });
    });
});

//# sourceMappingURL=connectEvents.js.map

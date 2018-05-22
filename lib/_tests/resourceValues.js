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
var _a = intern.getInterface("tdd"), suite = _a.suite, test = _a.test;
var assert = intern.getPlugin("chai").assert;
var subscribe_1 = require("../subscribe/subscribe");
suite("testResourceValues", function () {
    test("presubscriptionConstruction", function () {
        var subscribe = new subscribe_1.Subscribe();
        var observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: ["3/0/*", "4/0/1"] });
        var presub = { deviceId: "2", resourcePaths: ["3/0/*", "4/0/1"] };
        assert.deepEqual(presub, observer.localPresubscriptions[0]);
    });
    test("multiplePresubscriptionConstruction", function () {
        var subscribe = new subscribe_1.Subscribe();
        var observer = subscribe.resourceValues({ deviceId: ["2", "3"], resourcePaths: ["3/0/*", "4/0/1"] });
        var presubs = [{ deviceId: "2", resourcePaths: ["3/0/*", "4/0/1"] }, { deviceId: "3", resourcePaths: ["3/0/*", "4/0/1"] }];
        assert.deepEqual(presubs, observer.localPresubscriptions);
    });
    test("subscribingToOneDevice", function () {
        var subscribe = new subscribe_1.Subscribe();
        var items = [];
        var observer = subscribe.resourceValues({ deviceId: "1" });
        observer.addListener(function (res) { return items.push(res); });
        mockNotify(subscribe);
        assert.lengthOf(items, 3);
        mockNotify(subscribe);
        assert.lengthOf(items, 6);
    });
    test("subscribingToMultipleDevices", function () {
        var subscribe = new subscribe_1.Subscribe();
        var items = [];
        var observer = subscribe.resourceValues({ deviceId: ["1", "2"] });
        observer.addListener(function (res) { return items.push(res); });
        mockNotify(subscribe);
        assert.lengthOf(items, 6);
        mockNotify(subscribe);
        assert.lengthOf(items, 12);
    });
    test("subscribingToResourcePath", function () {
        var subscribe = new subscribe_1.Subscribe();
        var items = [];
        var observer = subscribe.resourceValues({ resourcePaths: ["/3/0/0"] });
        observer.addListener(function (res) { return items.push(res); });
        mockNotify(subscribe);
        assert.lengthOf(items, 5);
        mockNotify(subscribe);
        assert.lengthOf(items, 10);
    });
    test("subscribingToOneDeviceAndResourcePath", function () {
        var subscribe = new subscribe_1.Subscribe();
        var items = [];
        var observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: ["/3/0/0"] });
        observer.addListener(function (res) { return items.push(res); });
        mockNotify(subscribe);
        assert.lengthOf(items, 1);
        mockNotify(subscribe);
        assert.lengthOf(items, 2);
    });
    test("subscribingToOneDeviceAndResourcePaths", function () {
        var subscribe = new subscribe_1.Subscribe();
        var items = [];
        var observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: ["/3/0/0", "/3/0/1"] });
        observer.addListener(function (res) { return items.push(res); });
        mockNotify(subscribe);
        assert.lengthOf(items, 2);
        mockNotify(subscribe);
        assert.lengthOf(items, 4);
    });
    test("subscribingToMultipleDevicesAndResourcePath", function () {
        var subscribe = new subscribe_1.Subscribe();
        var items = [];
        var observer = subscribe.resourceValues({ deviceId: ["2", "3"], resourcePaths: ["/3/0/0"] });
        observer.addListener(function (res) { return items.push(res); });
        mockNotify(subscribe);
        assert.lengthOf(items, 2);
        mockNotify(subscribe);
        assert.lengthOf(items, 4);
    });
    test("subscribingToMultipleDevicesAndResourcePaths", function () {
        var subscribe = new subscribe_1.Subscribe();
        var items = [];
        var observer = subscribe.resourceValues({ deviceId: ["2", "3"], resourcePaths: ["/3/0/0", "/3/0/1"] });
        observer.addListener(function (res) { return items.push(res); });
        mockNotify(subscribe);
        assert.lengthOf(items, 4);
        mockNotify(subscribe);
        assert.lengthOf(items, 8);
    });
    test("subscribingToOneDeviceWildcard", function () {
        var subscribe = new subscribe_1.Subscribe();
        var items = [];
        var observer = subscribe.resourceValues({ deviceId: "*" });
        observer.addListener(function (res) { return items.push(res); });
        mockNotify(subscribe);
        assert.lengthOf(items, 15);
        mockNotify(subscribe);
        assert.lengthOf(items, 30);
    });
    test("subscribingToOneDeviceAndResourcePathWildcard", function () {
        var subscribe = new subscribe_1.Subscribe();
        var items = [];
        var observer = subscribe.resourceValues({ deviceId: "2", resourcePaths: ["/3/*"] });
        observer.addListener(function (res) { return items.push(res); });
        mockNotify(subscribe);
        assert.lengthOf(items, 3);
        mockNotify(subscribe);
        assert.lengthOf(items, 6);
    });
});
function mockNotify(subscribe) {
    var notificationList = [
        { deviceId: "1", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "1", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "1", path: "/3/0/2", payload: "SGK=" },
        { deviceId: "2", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "2", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "2", path: "/3/0/2", payload: "SGK=" },
        { deviceId: "3", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "3", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "3", path: "/3/0/2", payload: "SGK=" },
        { deviceId: "4", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "4", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "4", path: "/3/0/2", payload: "SGK=" },
        { deviceId: "5", path: "/3/0/0", payload: "SGK=" },
        { deviceId: "5", path: "/3/0/1", payload: "SGK=" },
        { deviceId: "5", path: "/3/0/2", payload: "SGK=" }
    ];
    notificationList.forEach(function (item) { return subscribe.notifyResourceValues(item); });
}
exports.mockNotify = mockNotify;

//# sourceMappingURL=resourceValues.js.map

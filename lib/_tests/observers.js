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
var observer_1 = require("../connect/subscribe/observers/observer");
suite("testObserver", function () {
    test("subscribeFirst", function () {
        var observer = new observer_1.Observer();
        var a = observer.take();
        var b = observer.take();
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
        assert.notEqual(a, b);
        a.then(function (res) { return assert.strictEqual(res, "a"); });
        b.then(function (res) { return assert.strictEqual(res, "b"); });
    });
    test("subscribeFirstCallback", function () {
        var observer = new observer_1.Observer();
        observer.take(function (res) { return assert.strictEqual(res, "a"); });
        observer.take(function (res) { return assert.strictEqual(res, "b"); });
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
    });
    test("notifyFirst", function () {
        var observer = new observer_1.Observer();
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
        var a = observer.take();
        var b = observer.take();
        assert.notEqual(a, b);
        a.then(function (res) { return assert.strictEqual(res, "a"); });
        b.then(function (res) { return assert.strictEqual(res, "b"); });
    });
    test("notifyFirstCallback", function () {
        var observer = new observer_1.Observer();
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
        observer.take(function (res) { return assert.strictEqual(res, "a"); });
        observer.take(function (res) { return assert.strictEqual(res, "b"); });
    });
    test("interleaved", function () {
        var observer = new observer_1.Observer();
        observer.notify("a");
        var a = observer.take();
        var b = observer.take();
        var c = observer.take();
        observer.notify("b");
        var d = observer.take();
        observer.notify("c");
        observer.notify("d");
        observer.notify("e");
        var e = observer.take();
        a.then(function (res) { return assert.strictEqual(res, "a"); });
        b.then(function (res) { return assert.strictEqual(res, "b"); });
        c.then(function (res) { return assert.strictEqual(res, "c"); });
        d.then(function (res) { return assert.strictEqual(res, "d"); });
        e.then(function (res) { return assert.strictEqual(res, "e"); });
    });
    test("interleavedCallback", function () {
        var observer = new observer_1.Observer();
        observer.notify("a");
        observer.take(function (res) { return assert.strictEqual(res, "a"); });
        observer.take(function (res) { return assert.strictEqual(res, "b"); });
        observer.take(function (res) { return assert.strictEqual(res, "c"); });
        observer.notify("b");
        observer.take(function (res) { return assert.strictEqual(res, "d"); });
        observer.notify("c");
        observer.notify("d");
        observer.notify("e");
        observer.take(function (res) { return assert.strictEqual(res, "e"); });
    });
    test("callback", function () {
        var observer = new observer_1.Observer();
        var x = 1;
        observer.addCallback(function (res) { return x += res; });
        observer.addCallback(function (res) { return x += (res * 2); });
        observer.notify(3);
        assert.strictEqual(x, 10);
    });
    test("addRemoveCallbacks", function () {
        var observer = new observer_1.Observer();
        // tslint:disable-next-line:no-empty
        var f = function () { };
        // tslint:disable-next-line:no-empty
        var g = function () { };
        observer.addCallback(f);
        observer.addCallback(g);
        assert.sameOrderedMembers(observer.callbacks, [f, g]);
        observer.removeCallback(f);
        assert.sameOrderedMembers(observer.callbacks, [g]);
        observer.removeCallback(g);
        assert.sameOrderedMembers(observer.callbacks, []);
    });
    test("collection", function () {
        var observer = new observer_1.Observer();
        for (var index = 0; index < 10; index++) {
            observer.notify(index);
        }
        var items = [];
        observer.notificationQueue.forEach(function (item) { return items.push(item); });
        assert.sameOrderedMembers(items, Array.apply(null, { length: 10 }).map(Function.call, Number));
    });
});

//# sourceMappingURL=observers.js.map

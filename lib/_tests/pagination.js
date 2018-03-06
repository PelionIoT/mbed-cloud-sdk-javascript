"use strict";
/*
 * Mbed Cloud JavaScript SDK
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
var pagination_1 = require("../common/pagination");
var _a = intern.getInterface("tdd"), suite = _a.suite, test = _a.test;
var assert = intern.getPlugin("chai").assert;
// Wait for the stack to clear. Required because callbacks assigned with Promise.then are called asynchronously.
var wait = function () {
    return new Promise(function (resolve) {
        setTimeout(resolve, 1);
    });
};
// Mock a function that returns a promise. Calls to the function are tracked in the `calls` array allowing the returned promises to be resolved and rejected.
var mockAsync = function () {
    var calls = [];
    var mock = function () {
        var call = { resolve: null, reject: null, promise: null };
        call.promise = new Promise(function (resolvePromise, rejectPromise) {
            call.resolve = function (value) {
                resolvePromise(value);
                return wait();
            };
            call.reject = function () {
                rejectPromise();
                return wait();
            };
        });
        calls.push(call);
        return call.promise;
    };
    return { calls: calls, mock: mock };
};
// Utility to track if a promise has been rejected or resolved. The return value is mutated asynchronously.
var checkPromise = function (promise) {
    var tracker = { resolved: false, rejected: false };
    promise.then(function () { tracker.resolved = true; }, function () { tracker.rejected = true; });
    return tracker;
};
suite("executeForAll", function () {
    test("never runs execute if there are no items", function () {
        var _a = mockAsync(), executeCalls = _a.calls, execute = _a.mock;
        var _b = mockAsync(), getPageCalls = _b.calls, getPage = _b.mock;
        var tracker = checkPromise(pagination_1.executeForAll(getPage, execute));
        assert.strictEqual(getPageCalls.length, 1);
        return getPageCalls[0].resolve({
            data: [],
            hasMore: false
        })
            .then(function () {
            assert.strictEqual(executeCalls.length, 0);
            assert.strictEqual(tracker.resolved, true);
            assert.strictEqual(tracker.rejected, false);
        });
    });
    test("runs execute once per item if there is only one page", function () {
        var _a = mockAsync(), executeCalls = _a.calls, execute = _a.mock;
        var _b = mockAsync(), getPageCalls = _b.calls, getPage = _b.mock;
        var tracker = checkPromise(pagination_1.executeForAll(getPage, execute));
        assert.strictEqual(getPageCalls.length, 1);
        return getPageCalls[0].resolve({
            data: [{ id: "1" }, { id: "2" }],
            hasMore: false
        })
            .then(function () {
            assert.strictEqual(executeCalls.length, 2);
            return Promise.all(executeCalls.map(function (_a) {
                var resolve = _a.resolve;
                return resolve(null);
            }))
                .then(function () {
                assert.strictEqual(tracker.resolved, true);
                assert.strictEqual(tracker.rejected, false);
            });
        });
    });
    test("runs execute once per item if there are two pages", function () {
        var _a = mockAsync(), executeCalls = _a.calls, execute = _a.mock;
        var _b = mockAsync(), getPageCalls = _b.calls, getPage = _b.mock;
        var tracker = checkPromise(pagination_1.executeForAll(getPage, execute));
        assert.strictEqual(getPageCalls.length, 1);
        return getPageCalls[0].resolve({
            data: [{ id: "1" }, { id: "2" }],
            hasMore: true
        })
            .then(function () {
            assert.strictEqual(executeCalls.length, 2);
            return Promise.all(executeCalls.map(function (_a) {
                var resolve = _a.resolve;
                return resolve(null);
            }))
                .then(function () {
                return getPageCalls[1].resolve({
                    data: [{ id: "3" }, { id: "4" }],
                    hasMore: false
                })
                    .then(function () {
                    assert.strictEqual(executeCalls.length, 4);
                    return Promise.all([executeCalls[2].resolve(null), executeCalls[3].resolve(null)])
                        .then(function () {
                        assert.strictEqual(tracker.resolved, true);
                        assert.strictEqual(tracker.rejected, false);
                    });
                });
            });
        });
    });
    test("rejects the promise if the first getPage fails", function () {
        var _a = mockAsync(), executeCalls = _a.calls, execute = _a.mock;
        var _b = mockAsync(), getPageCalls = _b.calls, getPage = _b.mock;
        var tracker = checkPromise(pagination_1.executeForAll(getPage, execute));
        assert.strictEqual(getPageCalls.length, 1);
        return getPageCalls[0].reject()
            .then(function () {
            assert.strictEqual(executeCalls.length, 0);
            assert.strictEqual(tracker.resolved, false);
            assert.strictEqual(tracker.rejected, true);
        });
    });
    test("rejects the promise if an execute call fails", function () {
        var _a = mockAsync(), executeCalls = _a.calls, execute = _a.mock;
        var _b = mockAsync(), getPageCalls = _b.calls, getPage = _b.mock;
        var tracker = checkPromise(pagination_1.executeForAll(getPage, execute));
        assert.strictEqual(getPageCalls.length, 1);
        return getPageCalls[0].resolve({
            data: [{ id: "1" }, { id: "2" }],
            hasMore: true
        })
            .then(function () {
            assert.strictEqual(executeCalls.length, 2);
            return Promise.all([executeCalls[0].resolve(null), executeCalls[1].reject()])
                .then(function () {
                assert.strictEqual(tracker.resolved, false);
                assert.strictEqual(tracker.rejected, true);
            });
        });
    });
    test("rejects the promise if the second getPage fails", function () {
        var _a = mockAsync(), executeCalls = _a.calls, execute = _a.mock;
        var _b = mockAsync(), getPageCalls = _b.calls, getPage = _b.mock;
        var tracker = checkPromise(pagination_1.executeForAll(getPage, execute));
        assert.strictEqual(getPageCalls.length, 1);
        return getPageCalls[0].resolve({
            data: [{ id: "1" }, { id: "2" }],
            hasMore: true
        })
            .then(function () {
            assert.strictEqual(executeCalls.length, 2);
            return Promise.all([executeCalls[0].resolve(null), executeCalls[1].resolve(null)])
                .then(function () {
                assert.strictEqual(getPageCalls.length, 2);
                return getPageCalls[1].reject()
                    .then(function () {
                    assert.strictEqual(executeCalls.length, 2);
                    assert.strictEqual(tracker.resolved, false);
                    assert.strictEqual(tracker.rejected, true);
                });
            });
        });
    });
});

//# sourceMappingURL=pagination.js.map

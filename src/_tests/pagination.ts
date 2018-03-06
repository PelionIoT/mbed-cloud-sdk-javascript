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

import { executeForAll } from "../common/pagination";
import { ListResponse } from "../common/listResponse";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

interface Call<O> {
    resolve: (o: O) => Promise<void>;
    reject: () => Promise<void>;
    promise: Promise<O>;
}

// Wait for the stack to clear. Required because callbacks assigned with Promise.then are called asynchronously.
const wait = (): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(resolve, 1);
    });
};

// Mock a function that returns a promise. Calls to the function are tracked in the `calls` array allowing the returned promises to be resolved and rejected.
const mockAsync = <I, O>(): { calls: Array<Call<O>>, mock: (i: I) => Promise<O> } => {
    const calls: Array<Call<O>> = [];

    const mock = (): Promise<O> => {
        const call: Call<O> = { resolve: null, reject: null, promise: null };

        call.promise = new Promise<O>((resolvePromise, rejectPromise) => {
            call.resolve = value => {
                resolvePromise(value);
                return wait();
            };

            call.reject = () => {
                rejectPromise();
                return wait();
            };
        });

        calls.push(call);
        return call.promise;
    };

    return { calls, mock };
};

// Utility to track if a promise has been rejected or resolved. The return value is mutated asynchronously.
const checkPromise = <T>(promise: Promise<T>): { resolved: boolean, rejected: boolean } => {
    const tracker = { resolved: false, rejected: false };
    promise.then(() => { tracker.resolved = true; }, () => { tracker.rejected = true; });
    return tracker;
};

suite("executeForAll", () => {
    test("never runs execute if there are no items", () => {
        const { calls: executeCalls, mock: execute } = mockAsync<string, void>();
        const { calls: getPageCalls, mock: getPage } = mockAsync<{ after: string }, ListResponse<{ id: string }>>();

        const tracker = checkPromise(executeForAll(getPage, execute));

        assert.strictEqual(getPageCalls.length, 1);

        return getPageCalls[ 0 ].resolve({
            data: [],
            hasMore: false
        })
            .then(() => {
                assert.strictEqual(executeCalls.length, 0);

                assert.strictEqual(tracker.resolved, true);
                assert.strictEqual(tracker.rejected, false);
            });
    });

    test("runs execute once per item if there is only one page", () => {
        const { calls: executeCalls, mock: execute } = mockAsync<string, void>();
        const { calls: getPageCalls, mock: getPage } = mockAsync<{after: string}, ListResponse<{id: string}>>();

        const tracker = checkPromise(executeForAll(getPage, execute));

        assert.strictEqual(getPageCalls.length, 1);

        return getPageCalls[ 0 ].resolve({
            data: [ { id: "1" }, { id: "2" } ],
            hasMore: false
        })
            .then(() => {
                assert.strictEqual(executeCalls.length, 2);

                return Promise.all(executeCalls.map(({ resolve }) => resolve(null)))
                    .then(() => {
                        assert.strictEqual(tracker.resolved, true);
                        assert.strictEqual(tracker.rejected, false);
                    });
            });
    });

    test("runs execute once per item if there are two pages", () => {
        const { calls: executeCalls, mock: execute } = mockAsync<string, void>();
        const { calls: getPageCalls, mock: getPage } = mockAsync<{after: string}, ListResponse<{id: string}>>();

        const tracker = checkPromise(executeForAll(getPage, execute));

        assert.strictEqual(getPageCalls.length, 1);

        return getPageCalls[ 0 ].resolve({
            data: [ { id: "1" }, { id: "2" } ],
            hasMore: true
        })
            .then(() => {
                assert.strictEqual(executeCalls.length, 2);

                return Promise.all(executeCalls.map(({ resolve }) => resolve(null)))
                    .then(() => {
                        return getPageCalls[ 1 ].resolve({
                            data: [ { id: "3" }, { id: "4" } ],
                            hasMore: false
                        })
                            .then(() => {
                                assert.strictEqual(executeCalls.length, 4);

                                return Promise.all([ executeCalls[ 2 ].resolve(null), executeCalls[ 3 ].resolve(null) ])
                                    .then(() => {
                                        assert.strictEqual(tracker.resolved, true);
                                        assert.strictEqual(tracker.rejected, false);
                                    });
                            });
                    });
            });
    });

    test("rejects the promise if the first getPage fails", () => {
        const { calls: executeCalls, mock: execute } = mockAsync<string, void>();
        const { calls: getPageCalls, mock: getPage } = mockAsync<{ after: string }, ListResponse<{ id: string }>>();

        const tracker = checkPromise(executeForAll(getPage, execute));

        assert.strictEqual(getPageCalls.length, 1);

        return getPageCalls[0].reject()
            .then(() => {
                assert.strictEqual(executeCalls.length, 0);

                assert.strictEqual(tracker.resolved, false);
                assert.strictEqual(tracker.rejected, true);
            });
    });

    test("rejects the promise if an execute call fails", () => {
        const { calls: executeCalls, mock: execute } = mockAsync<string, void>();
        const { calls: getPageCalls, mock: getPage } = mockAsync<{ after: string }, ListResponse<{ id: string }>>();

        const tracker = checkPromise(executeForAll(getPage, execute));

        assert.strictEqual(getPageCalls.length, 1);

        return getPageCalls[ 0 ].resolve({
            data: [ { id: "1" }, { id: "2" } ],
            hasMore: true
        })
            .then(() => {
                assert.strictEqual(executeCalls.length, 2);

                return Promise.all([ executeCalls[ 0 ].resolve(null), executeCalls[ 1 ].reject() ])
                    .then(() => {
                        assert.strictEqual(tracker.resolved, false);
                        assert.strictEqual(tracker.rejected, true);
                    });
            });
    });

    test("rejects the promise if the second getPage fails", () => {
        const { calls: executeCalls, mock: execute } = mockAsync<string, void>();
        const { calls: getPageCalls, mock: getPage } = mockAsync<{ after: string }, ListResponse<{ id: string }>>();

        const tracker = checkPromise(executeForAll(getPage, execute));

        assert.strictEqual(getPageCalls.length, 1);

        return getPageCalls[0].resolve({
            data: [ { id: "1" }, { id: "2" } ],
            hasMore: true
        })
            .then(() => {
                assert.strictEqual(executeCalls.length, 2);

                return Promise.all([ executeCalls[0].resolve(null), executeCalls[1].resolve(null) ])
                    .then(() => {
                        assert.strictEqual(getPageCalls.length, 2);

                        return getPageCalls[1].reject()
                            .then(() => {
                                assert.strictEqual(executeCalls.length, 2);

                                assert.strictEqual(tracker.resolved, false);
                                assert.strictEqual(tracker.rejected, true);
                            });
                    });
            });
    });
});

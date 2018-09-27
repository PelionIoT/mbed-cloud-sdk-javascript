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

import { executeForAll, Paginator } from "../common/pagination";
import { ListResponse } from "../common/listResponse";
import { ListOptions } from "../common/interfaces";

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

interface Call<O> {
    resolve: (o: O) => Promise<void>;
    reject: () => Promise<void>;
    promise: Promise<O>;
}

// Wait for the stack to clear. Required because callbacks assigned with Promise.then are called asynchronously.
const wait = (): Promise<void> => {
    return new Promise( resolve => {
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

        return getPageCalls[0].resolve(new ListResponse({ has_more: false }, []))
            .then(() => {
                assert.strictEqual(executeCalls.length, 0);

                assert.strictEqual(tracker.resolved, true);
                assert.strictEqual(tracker.rejected, false);
            });
    });

    test("runs execute once per item if there is only one page", () => {
        const { calls: executeCalls, mock: execute } = mockAsync<string, void>();
        const { calls: getPageCalls, mock: getPage } = mockAsync<{ after: string }, ListResponse<{ id: string }>>();

        const tracker = checkPromise(executeForAll(getPage, execute));

        assert.strictEqual(getPageCalls.length, 1);

        return getPageCalls[0].resolve(new ListResponse({ has_more: false }, [ { id: "1" }, { id: "2" } ]))
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
        const { calls: getPageCalls, mock: getPage } = mockAsync<{ after: string }, ListResponse<{ id: string }>>();

        const tracker = checkPromise(executeForAll(getPage, execute));

        assert.strictEqual(getPageCalls.length, 1);

        return getPageCalls[0].resolve(new ListResponse({ has_more: true }, [ { id: "1" }, { id: "2" } ]))
            .then(() => {
                assert.strictEqual(executeCalls.length, 2);

                return Promise.all(executeCalls.map(({ resolve }) => resolve(null)))
                    .then(() => {
                        return getPageCalls[1].resolve(new ListResponse({ has_more: false }, [ { id: "3" }, { id: "4" } ]))
                            .then(() => {
                                assert.strictEqual(executeCalls.length, 4);

                                return Promise.all([
                                    executeCalls[2].resolve(null), executeCalls[3].resolve(null),
                                ])
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

        return getPageCalls[0].resolve(new ListResponse({ has_more: true }, [ { id: "1" }, { id: "2" } ]))
            .then(() => {
                assert.strictEqual(executeCalls.length, 2);

                return Promise.all([
                    executeCalls[0].resolve(null), executeCalls[1].reject(),
                ])
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

        return getPageCalls[0].resolve(new ListResponse({ has_more: true }, [ { id: "1" }, { id: "2" } ]))
            .then(() => {
                assert.strictEqual(executeCalls.length, 2);

                return Promise.all([
                    executeCalls[0].resolve(null), executeCalls[1].resolve(null),
                ])
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

suite("paginator", () => {
    test("Checking element navigation - one page", () => {
        const pageData = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
        function getPage(_: ListOptions): Promise<ListResponse<number>> {
            const response = {
                after: null,
                has_more: false,
                limit: 50,
                order: "ASC",
                total_count: null,
                continuation_marker: null,
            };
            return Promise.resolve(new ListResponse(response, pageData));
        }
        const options: ListOptions = {};
        const paginator = new Paginator(getPage, options);
        assert.isTrue(paginator.hasNext());
        // Moving to the next element (first)
        return paginator.next().then( element => {
            assert.isNotNull(element);
            assert.equal(element, pageData[0]);
            assert.isTrue(paginator.hasNext());
            return Promise.resolve();
            // Moving to the next element
        }).then(() => paginator.next().then( element => {
            assert.isNotNull(element);
            assert.equal(element, pageData[1]);
            assert.isTrue(paginator.hasNext());
            return Promise.resolve();
        })).then(() => paginator.all().then( all => {
            assert.isNotNull(all);
            assert.deepEqual(all, pageData);
            return Promise.resolve();
        }));
    });
    test("Checking element navigation - two pages", () => {
        const firstPageData = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
        const secondPageData = [ 9, 10, 11, 12, 13, 14, 15, 16 ];
        function getPage(listOptions: ListOptions): Promise<ListResponse<number>> {
            const response = {
                after: null,
                has_more: false,
                limit: 50,
                order: "ASC",
                total_count: null,
                continuation_marker: null,
            };
            // The following returns the first page if after is not equal to the last element of the first page. Otherwise the second page is returned. The first page is filled with relevant values to stipulate that there are more pages available i.e. has_more and continuation_marker are set.
            return listOptions.after === "" + firstPageData[firstPageData.length - 1] ? Promise.resolve(new ListResponse(response, secondPageData)) : Promise.resolve(new ListResponse({ ...response, has_more: true, continuation_marker: "" + firstPageData[firstPageData.length - 1] }, firstPageData));
        }
        const options: ListOptions = {};
        const paginator = new Paginator(getPage, options);
        assert.isTrue(paginator.hasNext());
        // Moving to the next element (first)

        return paginator.next().then( element => {
            assert.isNotNull(element);
            assert.equal(element, firstPageData[0]);
            assert.isTrue(paginator.hasNext());
            return Promise.resolve();
            // Moving to the next element
        }).then(() => paginator.next().then( element => {
            assert.isNotNull(element);
            assert.equal(element, firstPageData[1]);
            assert.isTrue(paginator.hasNext());
            return Promise.resolve();
        })).then(() => paginator.all().then( all => {
            assert.isNotNull(all);
            assert.deepEqual(all, firstPageData.concat(secondPageData));
            return Promise.resolve();
        })).then(() => paginator.first().then( first => {
            assert.isNotNull(first);
            assert.equal(first, firstPageData[0]);
            return Promise.resolve();
        }));
    });
    test("Checking element navigation - two pages with restrictive maxResults", () => {
        const firstPageData = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
        const secondPageData = [ 9, 10, 11, 12, 13, 14, 15, 16 ];
        const totalElementCount = firstPageData.length + secondPageData.length;
        function getPage(listOptions: ListOptions): Promise<ListResponse<number>> {
            const response = {
                after: null,
                has_more: false,
                limit: 50,
                order: "ASC",
                total_count: null,
                continuation_marker: null,
            };
            // The following returns the first page if after is not equal to the last element of the first page. Otherwise the second page is returned. The first page is filled with relevant values to stipulate that there are more pages available i.e. has_more and after are set.
            // The page also contains the total count if requested by the user.
            const pagePromise = (listOptions.after === "" + firstPageData[firstPageData.length - 1] ? Promise.resolve(new ListResponse(response, secondPageData)) : Promise.resolve(new ListResponse({ ...response, has_more: true, after: "" + firstPageData[firstPageData.length - 1] }, firstPageData)));
            return pagePromise.then( pageResponse => listOptions.include && listOptions.include.indexOf("totalCount") > -1 ? new ListResponse({ ...pageResponse, totalCount: totalElementCount }, pageResponse.data) : pageResponse);
        }
        const options: ListOptions = {};
        const maxResult = firstPageData.length - 3;
        options.maxSize = maxResult;
        const paginator = new Paginator(getPage, options);
        assert.isTrue(paginator.hasNext());
        // Moving to the next element (first)
        return paginator.next().then( element => {
            assert.isNotNull(element);
            assert.equal(element, firstPageData[0]);
            assert.isTrue(paginator.hasNext());
            return Promise.resolve();
            // Moving to the next element
        }).then(() => paginator.next().then( element => {
            assert.isNotNull(element);
            assert.equal(element, firstPageData[1]);
            assert.isTrue(paginator.hasNext());
            return Promise.resolve();
        })).then(() => paginator.all().then( all => {
            assert.isNotNull(all);
            assert.deepEqual(all, firstPageData.slice(0, maxResult));
            return Promise.resolve();
        })).then(() => paginator.totalCount().then( total => {
            assert.isNotNull(total);
            assert.equal(total, totalElementCount);
            return Promise.resolve();
        }));
    });
    test("Checking executeForAll - two pages and restrictive maxResult", () => {
        const firstPageData = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
        const secondPageData = [ 9, 10, 11, 12, 13, 14, 15, 16 ];
        const resultsExecution = [];
        function execute(element: number): Promise<void> {
            resultsExecution.push(element);
            return Promise.resolve();
        }
        function getPage(listOptions: ListOptions): Promise<ListResponse<number>> {
            const response = {
                after: null,
                has_more: false,
                limit: 50,
                order: "ASC",
                total_count: null,
                continuation_marker: null,
            };
            // The following returns the first page if after is not equal to the last element of the first page. Otherwise the second page is returned. The first page is filled with relevant values to stipulate that there are more pages available i.e. has_more and after are set.
            return listOptions.after === "" + firstPageData[firstPageData.length - 1] ? Promise.resolve(new ListResponse(response, secondPageData)) : Promise.resolve(new ListResponse({ ...response, has_more: true, after: "" + firstPageData[firstPageData.length - 1] }, firstPageData));
        }
        const options: ListOptions = {};
        const maxResult = firstPageData.length + 1;
        options.maxSize = maxResult;
        const expectedResult = firstPageData.concat(secondPageData.slice(0, maxResult - firstPageData.length));
        const paginator = new Paginator(getPage, options);
        return paginator.executeForAll(execute).then(() => assert.deepEqual(resultsExecution, expectedResult));
    });
});

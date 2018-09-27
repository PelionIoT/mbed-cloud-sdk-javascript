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

const { suite, test, beforeEach } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

import { ApiBase } from "../common/apiBase";
import { SDKError } from "../common/sdkError";

class Api extends ApiBase {
    public complete(error: any, response: any, acceptHeader: string, callback?: (sdkError: SDKError, data) => any) {
        return super.complete(error, response, acceptHeader, callback);
    }
}

suite("apiBase", () => {

    let api: Api;

    beforeEach(() => {
        api = new Api({ apiKey: "testApiKey" } );
    });

    test("should execute callback", () => {

        api.complete(null, null, null, (_error, _data) => {
            assert(true);
        });
    });

    test("should return body", () => {

        const body = "body";
        const text = "text";

        api.complete(null, {
            body: body,
            text: text,
        }, null, (_error, data) => {
            assert.strictEqual(data, body);
        });
    });

    test("should return text", () => {

        const text = "text";

        api.complete(null, {
            text: text,
        }, "application/json", (_error, data) => {
            assert.strictEqual(data, text);
        });
    });

    test("should make date", () => {

        const date = "1977-01-12T14:49:20.869Z";

        api.complete(null, {
            body: {
                birthday: date,
            },
        }, "application/json", (_error, data) => {
            assert.typeOf(data.birthday, "date");
            assert.strictEqual(data.birthday.getDate(), 12);
            assert.strictEqual(data.birthday.getMonth(), 0);
            assert.strictEqual(data.birthday.getFullYear(), 1977);
        });
    });

    test("should not make date with application/json", () => {

        const date = "nineteen-seventy-seven";

        api.complete(null, {
            body: {
                birthday: date,
            },
        }, "application/json", (_error, data) => {
            assert.typeOf(data.birthday, "string");
            assert.strictEqual(data.birthday, date);
        });
    });

    test("should not make date without application/json", () => {

        const date = "nineteen-seventy-seven";

        api.complete(null, {
            body: {
                birthday: date,
            },
        }, null, (_error, data) => {
            assert.typeOf(data.birthday, "string");
            assert.notEqual(data, date);
        });
    });

    test("should raise error", () => {

        const message = "abort!";

        api.complete({
            message: message,
        }, null, null, error => {
            assert.strictEqual(error.message, message);
        });
    });

    test("should have error details", () => {

        const message = "abort!";
        const details = "more details";

        api.complete({
            message: message,
        }, {
            body: details,
        }, null, error => {
            assert.strictEqual(error.message, message);
            assert.strictEqual(error.details, details);
        });
    });

    test("should raise error from response", () => {

        const message = "abort!";
        const responseError = "error!";
        const details = "more details";

        api.complete({
            message: message,
        }, {
            body: details,
            error: {
                message: responseError,
            },
        }, null, error => {
            assert.strictEqual(error.message, responseError);
            assert.strictEqual(error.details, details);
        });
    });

    test("should raise error from body", () => {

        const message = "abort!";
        const bodyError = "error!";

        api.complete({
            message: message,
        }, {
            body: {
                message: bodyError,
            },
        }, null, error => {
            assert.strictEqual(error.message, bodyError);
        });
    });

    test("should raise error from body message", () => {

        const message = "abort!";
        const bodyError = "error!";

        api.complete({
            message: message,
        }, {
            body: {
                message: {
                    error: bodyError,
                },
            },
        }, null, error => {
            assert.strictEqual(error.message, bodyError);
        });
    });
});

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
var functions_1 = require("../common/functions");
suite("testFunctions", function () {
    test("nullWildcardString", function () {
        var wildcard = null;
        var match = functions_1.matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
    });
    test("undefinedWildcardString", function () {
        var wildcard = undefined;
        var match = functions_1.matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
    });
    test("emptyWildcardString", function () {
        var wildcard = "";
        var match = functions_1.matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
    });
    test("correctWildcarsString", function () {
        var wildcard = "3/0/0";
        var match = functions_1.matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
    });
    test("wildcardString", function () {
        var wildcard = "3/*";
        var match = functions_1.matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
        wildcard = "3/0/*";
        match = functions_1.matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
        wildcard = "3/0/*";
        match = functions_1.matchWithWildcard(wildcard, "3/1/0");
        assert.isFalse(match);
        wildcard = "*";
        match = functions_1.matchWithWildcard(wildcard, "3/1/0");
        assert.isTrue(match);
    });
});
suite("testPayloadDecoding", function () {
    test("string", function () {
        var payload = functions_1.decodeBase64("dGVzdA==", "text/plain");
        assert.isString(payload);
    });
    test("number", function () {
        var payload = functions_1.decodeBase64("NQ==", "text/plain");
        assert.isNumber(payload);
    });
    test("tlv", function () {
        var payload = functions_1.decodeBase64("AAA=", "tlv");
        assert.deepEqual(payload, {
            "/0": ""
        });
    });
});

//# sourceMappingURL=functions.js.map

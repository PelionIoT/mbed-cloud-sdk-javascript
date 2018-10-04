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

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");
import { matchWithWildcard, decodeBase64, dateToBillingMonth } from "../../src/common/functions";

suite("testFunctions", () => {

    test("nullWildcardString", () => {
        const wildcard = null;
        const match = matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
    });

    test("undefinedWildcardString", () => {
        const wildcard = undefined;
        const match = matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
    });

    test("emptyWildcardString", () => {
        const wildcard = "";
        const match = matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
    });

    test("correctWildcarsString", () => {
        const wildcard = "3/0/0";
        const match = matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);
    });

    test("wildcardString", () => {
        let wildcard = "3/*";
        let match = matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);

        wildcard = "3/0/*";
        match = matchWithWildcard(wildcard, "3/0/0");
        assert.isTrue(match);

        wildcard = "3/0/*";
        match = matchWithWildcard(wildcard, "3/1/0");
        assert.isFalse(match);

        wildcard = "*";
        match = matchWithWildcard(wildcard, "3/1/0");
        assert.isTrue(match);
    });

});

suite("testPayloadDecoding", () => {

    test("string", () => {
        const payload = decodeBase64("dGVzdA==", "text/plain");
        assert.isString(payload);
    });

    test("number", () => {
        const payload = decodeBase64("NQ==", "text/plain");
        assert.isNumber(payload);
    });

    test("tlv", () => {
        const payload = decodeBase64("AAA=", "tlv");
        assert.deepEqual(payload, {
            "/0": "",
        });
    });
});

suite("testBillingMonth", () => {
    test("singleDigitMonth", () => {
        const date = new Date(2018, 4);
        const string = dateToBillingMonth(date);
        assert.strictEqual("2018-05", string);
    });

    test("doubleDigitMonth", () => {
        const date = new Date(2018, 11);
        const string = dateToBillingMonth(date);
        assert.strictEqual("2018-12", string);
    });
});

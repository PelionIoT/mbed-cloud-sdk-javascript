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
suite("extractFilter", function () {
    test("should return default", function () {
        var string = "dee folt";
        var result = functions_1.extractFilter(null, null, null, string);
        assert.strictEqual(result, string);
    });
    test("should extract from eq", function () {
        var value = "coffee";
        var filter = {
            filter: { $eq: value }
        };
        var result = functions_1.extractFilter(filter, "filter");
        assert.strictEqual(result, value);
    });
    test("should extract from ne", function () {
        var value = "coffee";
        var filter = {
            filter: { $ne: value }
        };
        var result = functions_1.extractFilter(filter, "filter", "$ne");
        assert.strictEqual(result, value);
    });
    test("should extract without eq", function () {
        var value = "coffee";
        var filter = {
            filter: value
        };
        var result = functions_1.extractFilter(filter, "filter");
        assert.strictEqual(result, value);
    });
});
suite("encodeFilter", function () {
    test("should return empty", function () {
        var result = functions_1.encodeFilter(null);
        assert.strictEqual(result, "");
    });
    test("should still return empty", function () {
        var result = functions_1.encodeFilter({});
        assert.strictEqual(result, "");
    });
    test("should encode filter", function () {
        var result = functions_1.encodeFilter({
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: 10, $gte: 2 }
        });
        assert.strictEqual(result, "key=value&error__neq=found&range__lte=10&range__gte=2");
    });
    test("should encode camel filter", function () {
        var result = functions_1.encodeFilter({
            key: { $eq: "value" },
            error: { $ne: "found" },
            theRange: { $lte: 10, $gte: 2 }
        });
        assert.strictEqual(result, "key=value&error__neq=found&the_range__lte=10&the_range__gte=2");
    });
    test("should encode bare filter", function () {
        var result = functions_1.encodeFilter({
            key: "value",
            error: { $ne: "found" },
            range: { $lte: 10, $gte: 2 }
        });
        assert.strictEqual(result, "key=value&error__neq=found&range__lte=10&range__gte=2");
    });
    test("should encode filter with map", function () {
        var result = functions_1.encodeFilter({
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: 10, $gte: 2 }
        }, {
            from: [
                "key"
            ],
            to: [
                "switch"
            ]
        });
        assert.strictEqual(result, "switch=value&error__neq=found&range__lte=10&range__gte=2");
    });
    test("should encode filter with nest", function () {
        var result = functions_1.encodeFilter({
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: 10, $gte: 2 },
            custom: {
                custom_1: { $eq: "custom_value_1" },
                custom_2: { $ne: "custom_value_2" }
            }
        }, {
            from: [
                "key"
            ],
            to: [
                "switch"
            ]
        }, [
            "custom"
        ]);
        assert.strictEqual(result, "switch=value&error__neq=found&range__lte=10&range__gte=2&custom__custom_1=custom_value_1&custom__custom_2__neq=custom_value_2");
    });
});
suite("decodeFilter", function () {
    test("should return object", function () {
        var result = functions_1.decodeFilter(null);
        assert.deepEqual(result, {});
    });
    test("should decode string", function () {
        var result = functions_1.decodeFilter("key=value&error__neq=found&range__lte=10&range__gte=2");
        assert.deepEqual(result, {
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: "10", $gte: "2" }
        });
    });
    test("should decode snake string", function () {
        var result = functions_1.decodeFilter("key=value&error__neq=found&the_range__lte=10&the_range__gte=2");
        assert.deepEqual(result, {
            key: { $eq: "value" },
            error: { $ne: "found" },
            theRange: { $lte: "10", $gte: "2" }
        });
    });
    test("should decode with map", function () {
        var result = functions_1.decodeFilter("switch=value&error__neq=found&range__lte=10&range__gte=2", {
            from: [
                "key"
            ],
            to: [
                "switch"
            ]
        });
        assert.deepEqual(result, {
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: "10", $gte: "2" }
        });
    });
    test("should decode with nest", function () {
        var result = functions_1.decodeFilter("switch=value&error__neq=found&range__lte=10&range__gte=2&custom__custom_1=custom_value_1&custom__custom_2__neq=custom_value_2", {
            from: [
                "key"
            ],
            to: [
                "switch"
            ]
        }, [
            "custom"
        ]);
        assert.deepEqual(result, {
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: "10", $gte: "2" },
            custom: {
                custom_1: { $eq: "custom_value_1" },
                custom_2: { $ne: "custom_value_2" }
            }
        });
    });
});

//# sourceMappingURL=filterFunctions.js.map

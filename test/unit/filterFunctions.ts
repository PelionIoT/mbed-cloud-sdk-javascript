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

import { extractFilter, encodeFilter, decodeFilter } from "../../src/common/functions";

describe("extractFilter", () => {

    test("should return default", () => {
        const string = "dee folt";
        const result = extractFilter(null, null, null, string);
        expect(result).toBe(string);
    });

    test("should extract from eq", () => {
        const value = "coffee";
        const filter = {
            filter: { $eq: value },
        };

        const result = extractFilter(filter, "filter");
        expect(result).toBe(value);
    });

    test("should extract from ne", () => {
        const value = "coffee";
        const filter = {
            filter: { $ne: value },
        };

        const result = extractFilter(filter, "filter", "$ne");
        expect(result).toBe(value);
    });

    test("should extract without eq", () => {
        const value = "coffee";
        const filter = {
            filter: value,
        };

        const result = extractFilter(filter, "filter");
        expect(result).toBe(value);
    });
});

describe("encodeFilter", () => {

    test("should return empty", () => {
        const result = encodeFilter(null);
        expect(result).toBe("");
    });

    test("should still return empty", () => {
        const result = encodeFilter({});
        expect(result).toBe("");
    });

    test("should encode filter", () => {
        const result = encodeFilter({
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: 10, $gte: 2 },
        });
        expect(result).toBe("key=value&error__neq=found&range__lte=10&range__gte=2");
    });

    test("should encode camel filter", () => {
        const result = encodeFilter({
            key: { $eq: "value" },
            error: { $ne: "found" },
            theRange: { $lte: 10, $gte: 2 },
        });
        expect(result).toBe("key=value&error__neq=found&the_range__lte=10&the_range__gte=2");
    });

    test("should encode bare filter", () => {
        const result = encodeFilter({
            key: "value",
            error: { $ne: "found" },
            range: { $lte: 10, $gte: 2 },
        });
        expect(result).toBe("key=value&error__neq=found&range__lte=10&range__gte=2");
    });

    test("should encode filter with map", () => {
        const result = encodeFilter({
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: 10, $gte: 2 },
        }, {
            from: [
                "key",
            ],
            to: [
                "switch",
            ],
        });
        expect(result).toBe("switch=value&error__neq=found&range__lte=10&range__gte=2");
    });

    test("should encode filter with nest", () => {
        const result = encodeFilter({
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: 10, $gte: 2 },
            custom: {
                custom_1: { $eq: "custom_value_1" },
                custom_2: { $ne: "custom_value_2" },
            },
        }, {
            from: [
                "key",
            ],
            to: [
                "switch",
            ],
        }, [
            "custom",
        ]);
        expect(result).toBe("switch=value&error__neq=found&range__lte=10&range__gte=2&custom__custom_1=custom_value_1&custom__custom_2__neq=custom_value_2");
    });
});

describe("decodeFilter", () => {

    test("should return object", () => {
        const result = decodeFilter(null);
        expect(result).toEqual({});
    });

    test("should decode string", () => {
        const result = decodeFilter("key=value&error__neq=found&range__lte=10&range__gte=2");
        expect(result).toEqual({
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: "10", $gte: "2" },
        });
    });

    test("should decode snake string", () => {
        const result = decodeFilter("key=value&error__neq=found&the_range__lte=10&the_range__gte=2");
        expect(result).toEqual({
            key: { $eq: "value" },
            error: { $ne: "found" },
            theRange: { $lte: "10", $gte: "2" },
        });
    });

    test("should decode with map", () => {
        const result = decodeFilter("switch=value&error__neq=found&range__lte=10&range__gte=2", {
            from: [
                "key",
            ],
            to: [
                "switch",
            ],
        });
        expect(result).toEqual({
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: "10", $gte: "2" },
        });
    });

    test("should decode with nest", () => {
        const result = decodeFilter("switch=value&error__neq=found&range__lte=10&range__gte=2&custom__custom_1=custom_value_1&custom__custom_2__neq=custom_value_2", {
            from: [
                "key",
            ],
            to: [
                "switch",
            ],
        }, [
            "custom",
        ]);
        expect(result).toEqual({
            key: { $eq: "value" },
            error: { $ne: "found" },
            range: { $lte: "10", $gte: "2" },
            custom: {
                custom_1: { $eq: "custom_value_1" },
                custom_2: { $ne: "custom_value_2" },
            },
        });
    });
});

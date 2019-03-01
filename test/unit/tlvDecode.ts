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

import { decodeTlv } from "../../src/legacy/common/tlvDecoder";

describe("decodeTlv", () => {
    function decode(payload) {
        if (typeof atob === "function") { return atob(payload); }
        return new Buffer(payload, "base64").toString("binary");
    }

    test("should decode nothing", () => {
        const result = decodeTlv("");
        expect(result).toEqual({});
    });

    test("should decode simple", () => {
        const payload = "AAA=";
        const tlv = decode(payload);

        const result = decodeTlv(tlv);

        expect(result).toEqual({
            "/0": "",
        });
    });

    test("should decode complex", () => {
        const payload = "iAsLSAAIAAAAAAAAAADBEFXIABAAAAAAAAAAAAAAAAAAAAAAyAEQAAAAAAAAAAAAAAAAAAAAAMECMMgRD2Rldl9kZXZpY2VfdHlwZcgSFGRldl9oYXJkd2FyZV92ZXJzaW9uyBUIAAAAAAAAAADIDQgAAAAAWdH0Bw==";
        const tlv = decode(payload);

        const result = decodeTlv(tlv);

        expect(result).toEqual({
            "/0": 0,
            "/1": 0,
            "/11/0": 0,
            "/13": 1506931719,
            "/16": "U",
            "/17": "dev_device_type",
            "/18": "dev_hardware_version",
            "/2": "0",
            "/21": 0,
        });
    });
});

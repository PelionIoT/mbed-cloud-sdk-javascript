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
var tlvDecoder_1 = require("../common/tlvDecoder");
suite("decodeTlv", function () {
    test("should decode nothing", function () {
        var result = tlvDecoder_1.decodeTlv("");
        assert.deepEqual(result, {});
    });
    test("should decode simple", function () {
        var payload = "AAA=";
        var tlv = new Buffer(payload, "base64").toString("binary");
        var result = tlvDecoder_1.decodeTlv(tlv);
        assert.deepEqual(result, {
            "/0": ""
        });
    });
    test("should decode complex", function () {
        var payload = "iAsLSAAIAAAAAAAAAADBEFXIABAAAAAAAAAAAAAAAAAAAAAAyAEQAAAAAAAAAAAAAAAAAAAAAMECMMgRD2Rldl9kZXZpY2VfdHlwZcgSFGRldl9oYXJkd2FyZV92ZXJzaW9uyBUIAAAAAAAAAADIDQgAAAAAWdH0Bw==";
        var tlv = new Buffer(payload, "base64").toString("binary");
        var result = tlvDecoder_1.decodeTlv(tlv);
        assert.deepEqual(result, {
            "/0": 0,
            "/1": 0,
            "/11/0": 0,
            "/13": 1506931719,
            "/16": "U",
            "/17": "dev_device_type",
            "/18": "dev_hardware_version",
            "/2": "0",
            "/21": 0
        });
    });
});

//# sourceMappingURL=tlvDecode.js.map

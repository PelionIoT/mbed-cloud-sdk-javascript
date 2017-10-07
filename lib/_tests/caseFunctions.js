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
suite("snakeToCamel", function () {
    test("should be camel", function () {
        var string = "im_really_a_camel";
        var result = functions_1.snakeToCamel(string);
        assert.strictEqual(result, "imReallyACamel");
    });
    test("begins with _", function () {
        var string = "_im_really_a_camel";
        var result = functions_1.snakeToCamel(string);
        assert.strictEqual(result, "ImReallyACamel");
    });
    test("ends with _", function () {
        var string = "im_really_a_camel_";
        var result = functions_1.snakeToCamel(string);
        assert.strictEqual(result, "imReallyACamel_");
    });
    test("creates capital at end", function () {
        var string = "im_really_a_came_l";
        var result = functions_1.snakeToCamel(string);
        assert.strictEqual(result, "imReallyACameL");
    });
    test("preserves capitals", function () {
        var string = "iM_reAlly_a_caMel";
        var result = functions_1.snakeToCamel(string);
        assert.strictEqual(result, "iMReAllyACaMel");
    });
});
suite("camelToSnake", function () {
    test("should be snake", function () {
        var string = "imReallyASnake";
        var result = functions_1.camelToSnake(string);
        assert.strictEqual(result, "im_really_a_snake");
    });
    test("begins with capital", function () {
        var string = "ImReallyASnake";
        var result = functions_1.camelToSnake(string);
        assert.strictEqual(result, "_im_really_a_snake");
    });
    test("ends with capital", function () {
        var string = "imReallyASnakE";
        var result = functions_1.camelToSnake(string);
        assert.strictEqual(result, "im_really_a_snak_e");
    });
    test("creates _ at beginning", function () {
        var string = "ImReallyASnake";
        var result = functions_1.camelToSnake(string);
        assert.strictEqual(result, "_im_really_a_snake");
    });
    test("preserves _", function () {
        var string = "imRe_allyA_Snake";
        var result = functions_1.camelToSnake(string);
        assert.strictEqual(result, "im_re_ally_a__snake");
    });
});

//# sourceMappingURL=caseFunctions.js.map

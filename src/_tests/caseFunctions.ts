const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

import { snakeToCamel, camelToSnake } from "../common/functions";

suite("snakeToCamel", () => {

    test("should be camel", () => {
        const string = "im_really_a_camel";
        const result = snakeToCamel(string);
        assert.strictEqual(result, "imReallyACamel");
    });

    test("begins with _", () => {
        const string = "_im_really_a_camel";
        const result = snakeToCamel(string);
        assert.strictEqual(result, "ImReallyACamel");
    });

    test("ends with _", () => {
        const string = "im_really_a_camel_";
        const result = snakeToCamel(string);
        assert.strictEqual(result, "imReallyACamel_");
    });

    test("creates capital at end", () => {
        const string = "im_really_a_came_l";
        const result = snakeToCamel(string);
        assert.strictEqual(result, "imReallyACameL");
    });

    test("preserves capitals", () => {
        const string = "iM_reAlly_a_caMel";
        const result = snakeToCamel(string);
        assert.strictEqual(result, "iMReAllyACaMel");
    });
});

suite("camelToSnake", () => {

    test("should be snake", () => {
        const string = "imReallyASnake";
        const result = camelToSnake(string);
        assert.strictEqual(result, "im_really_a_snake");
    });

    test("begins with capital", () => {
        const string = "ImReallyASnake";
        const result = camelToSnake(string);
        assert.strictEqual(result, "_im_really_a_snake");
    });

    test("ends with capital", () => {
        const string = "imReallyASnakE";
        const result = camelToSnake(string);
        assert.strictEqual(result, "im_really_a_snak_e");
    });

    test("creates _ at beginning", () => {
        const string = "ImReallyASnake";
        const result = camelToSnake(string);
        assert.strictEqual(result, "_im_really_a_snake");
    });

    test("preserves _", () => {
        const string = "imRe_allyA_Snake";
        const result = camelToSnake(string);
        assert.strictEqual(result, "im_re_ally_a__snake");
    });
});

"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../../legacy/common/functions");
/**
 * Decodes the specified base64 string.
 * @returns An Uint8Array containing the bytes extracted from the specified base64 string.
 */
function decodeBase64(text) {
    if (functions_1.isThisNode()) {
        return Buffer.from(text, "base64");
    }
    // If performance matters then replace with
    // https://github.com/danguer/blog-examples/blob/master/js/base64-binary.js
    return Uint8Array.from(atob(text), function (x) { return x.charCodeAt(0); });
}
exports.decodeBase64 = decodeBase64;
/**
 * Decodes the specified base64 string.
 * @returns The string value of the base64 string.
 */
function decodeBase64AsString(text) {
    if (functions_1.isThisNode()) {
        return Buffer.from(text, "base64").toString("binary");
    }
    return atob(text);
}
exports.decodeBase64AsString = decodeBase64AsString;
/**
 * Encodes the specified array into a base64 string.
 */
function encodeBase64(bytes) {
    var stringToEncode = String.fromCharCode.apply(String, __spread(bytes));
    if (functions_1.isThisNode()) {
        return Buffer.from(stringToEncode, "binary").toString("base64");
    }
    return btoa(stringToEncode);
}
exports.encodeBase64 = encodeBase64;
/**
 * Evaluates the specified value to a string.
 * @param {unknown} value - Literal value or function to call to determine the value.
 * @param {unknown[]} functionArgs - Optional arguments to be passed to the function to
 * invoke (if value is a function, otherwise ignored).
 * @returns String representation of the specified value. null and undefined are
 * converted to an empty string; functions are called and their result evaluated
 * recursively; objects are converted to JSON strings and each element of an array
 * is evaluated and then concatenated (using ", " as separator). Primitive values
 * are converted to string (note that -0 is evaluated as 0).
 * If an object has its own `toString()` implementation then it's called instead
 * of returning its JSON representation.
 */
function toString(value) {
    var functionArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        functionArgs[_i - 1] = arguments[_i];
    }
    if (value === null || value === undefined) {
        return "";
    }
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "function") {
        return toString(value.apply(void 0, __spread(functionArgs)));
    }
    if (Array.isArray(value)) {
        return value.map(toString).join(", ");
    }
    if (typeof value === "object") {
        // eslint-disable-next-line no-prototype-builtins
        if (value.hasOwnProperty("toString")) {
            return value.toString();
        }
        return JSON.stringify(value);
    }
    if (typeof value === "symbol") {
        return value.toString();
    }
    return "" + value;
}
exports.toString = toString;
//# sourceMappingURL=strings.js.map
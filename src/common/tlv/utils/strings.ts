import { isThisNode } from "../../../legacy/common/functions";

/**
 * Decodes the specified base64 string.
 * @returns An Uint8Array containing the bytes extracted from the specified base64 string.
 */
export function decodeBase64(text: string) {
    if (isThisNode()) {
        return Buffer.from(text, "base64");
    }
    // If performance matters then replace with
    // https://github.com/danguer/blog-examples/blob/master/js/base64-binary.js
    return Uint8Array.from(atob(text), x => x.charCodeAt(0));
}

/**
 * Decodes the specified base64 string.
 * @returns The string value of the base64 string.
 */
export function decodeBase64AsString(text: string): string {
    if (isThisNode()) {
        return Buffer.from(text, "base64").toString("binary");
    }

    return atob(text);
}

/**
 * Encodes the specified array into a base64 string.
 */
export function encodeBase64(bytes: Iterable<number>) {
    const stringToEncode = String.fromCharCode(...bytes);
    if (isThisNode()) {
        return Buffer.from(stringToEncode, "binary").toString("base64");
    }

    return btoa(stringToEncode);
}

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
export function toString(value: unknown, ...functionArgs: Array<unknown>): string {
    if (value === null || value === undefined) {
        return "";
    }

    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "function") {
        return toString(value(...functionArgs));
    }

    if (Array.isArray(value)) {
        return value.map(toString).join(", ");
    }

    if (typeof value === "object") {
        if (value!.hasOwnProperty("toString")) {
            return value!.toString();
        }

        return JSON.stringify(value);
    }

    if (typeof value === "symbol") {
        return value.toString();
    }

    return `${value}`;
}

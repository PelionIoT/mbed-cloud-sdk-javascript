/// <reference types="node" />
/**
 * Decodes the specified base64 string.
 * @returns An Uint8Array containing the bytes extracted from the specified base64 string.
 */
export declare function decodeBase64(text: string): Uint8Array | Buffer;
/**
 * Decodes the specified base64 string.
 * @returns The string value of the base64 string.
 */
export declare function decodeBase64AsString(text: string): string;
/**
 * Encodes the specified array into a base64 string.
 */
export declare function encodeBase64(bytes: Iterable<number>): string;
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
export declare function toString(value: unknown, ...functionArgs: Array<unknown>): string;

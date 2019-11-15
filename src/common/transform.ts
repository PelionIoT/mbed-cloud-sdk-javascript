import { camelToSnake } from "../legacy/common/functions";

/** @summary objectKeysToLowerCase( input, deep, filter )
 * returns a new object with all own keys converted to lower case.
 * The copy can be shallow (default) or deep.
 *
 * Circular references is supported during deep copy and the output will have
 * the same structure.
 *
 * By default only objects that have Object as constructor is copied.
 * It can be changed with the "filter"-function.
 *
 * NOTE: If an object has multiple keys that only differs in case,
 * only the value of the last seen key is saved. The order is usually
 * in the order that the keys where created.
 * Exaple : input =  {aa:1, aA:2, Aa:3, AA:4}, output = {aa:4};
 *
 * NOTE: To detect circular references, the list of objects already converted
 * is searched for every new object. If you have too many objects, it will
 * be slower and slower...
 *
 * @param {object} input
 *   The source object
 * @returns {object}
 *
 */
export function objectKeysToSnakeCase(input: object) {
    // tslint:disable-next-line:one-variable-per-declaration
    let idx, key, keys, last, output, self, value;
    self = objectKeysToSnakeCase;

    let deep: any = Infinity;

    // Check type of input, and throw if null or not an object.
    if (input === null || typeof input !== "object") {
        return {};
    }

    keys = Object.keys(input); // Get own keys from object
    last = keys.length - 1;
    output = {}; // new object

    // Create special object to be used during deep copy
    deep = Object.seal(
        Object.create(self.prototype, {
            input: { value: [] },
            output: { value: [] },
            level: { value: -1, writable: true },
            max: { value: deep, writable: false },
        })
    );

    deep.level += 1;
    deep.input.push(input);
    deep.output.push(output);

    idx = last + 1;
    while (idx--) {
        key = keys[last - idx]; // Using [last - idx] to preserve order.
        value = input[key];
        if (!Array.isArray(value) && typeof value === "object" && value && deep.level < deep.max) {
            if (value.constructor === Object) {
                value = self(value, deep);
            }
        }
        if (value !== null && value !== undefined) {
            output[camelToSnake(key)] = value;
        }
    }
    deep.level -= 1;

    return output;
}

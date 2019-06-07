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
  * @param {boolean|number} deep
  *   A shallow copy is made if "deep" is undefined, null, false or 0.
  *   A deep copy is made if "deep" is true or a positive number.
  *   The number specifies how many levels to copy. Infinity is a valid number.
  *   This variable is used internally during deep copy.
  * @param {function} filter
  *   A filter function(object) to filter objects that should be copied.
  *   If it returns true, the copy is performed.
  * @returns {object}
  *
  */
export function objectKeysToCamelCase(input, deep, filter) {
    // tslint:disable-next-line:one-variable-per-declaration
    let idx, key, keys, last, output, self, type, value;
    self = objectKeysToCamelCase;
    type = typeof deep;
    // Convert "deep" to a number between 0 to Infinity or keep special object.
    if (type === "undefined" || deep === null || deep === 0 || deep === false) {
        deep = 0; // Shallow copy
    }
    else if (type === "object") {
        if (!(deep instanceof self)) {
            throw new TypeError('Expected "deep" to be a special object');
        }
    }
    else if (deep === true) {
        deep = Infinity; // Deep copy
    }
    else if (type === "number") {
        if (isNaN(deep) || deep < 0) {
            throw new RangeError('Expected "deep" to be a positive number, got ' + deep);
        }
    }
    else {
        throw new TypeError('Expected "deep" to be a boolean, number or object, got "' + type + '"');
    }
    // Check type of input, and throw if null or not an object.
    if (input === null || typeof input !== "object") {
        throw new TypeError('Expected "input" to be an object');
    }
    // Check type of filter
    type = typeof filter;
    if (filter === null || type === "undefined" || type === "function") {
        filter = filter || null;
    }
    else {
        throw new TypeError('Expected "filter" to be a function');
    }
    keys = Object.keys(input); // Get own keys from object
    last = keys.length - 1;
    output = {}; // new object
    if (deep) { // only run the deep copy if needed.
        if (typeof deep === "number") {
            // Create special object to be used during deep copy
            deep =
                Object.seal(Object.create(self.prototype, {
                    input: { value: [] },
                    output: { value: [] },
                    level: { value: -1, writable: true },
                    max: { value: deep, writable: false }
                }));
        }
        else {
            // Circle detection
            idx = deep.input.indexOf(input);
            if (~idx) {
                return deep.output[idx];
            }
        }
        deep.level += 1;
        deep.input.push(input);
        deep.output.push(output);
        idx = last + 1;
        while (idx--) {
            key = keys[last - idx]; // Using [last - idx] to preserve order.
            value = input[key];
            if (!Array.isArray(value) && typeof value === "object" && value && deep.level < deep.max) {
                if (filter ? filter(value) : value.constructor === Object) {
                    value = self(value, deep, filter);
                }
            }
            if (value !== null && value !== undefined) {
                output[camelToSnake(key)] = value;
            }
        }
        deep.level -= 1;
    }
    else {
        // Simple shallow copy
        idx = last + 1;
        while (idx--) {
            key = keys[last - idx]; // Using [last - idx] to preserve order.
            output[camelToSnake(key)] = input[key];
        }
    }
    return output;
}
//# sourceMappingURL=transform.js.map
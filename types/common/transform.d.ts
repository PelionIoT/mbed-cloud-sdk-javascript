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
export declare function objectKeysToSnakeCase(input: object): any;

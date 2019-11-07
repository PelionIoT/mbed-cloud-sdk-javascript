/**
 * Extract the specified key form a filter object
 * @param filter The filter object
 * @param name The key to extract from the filter
 * @param operator The operator to get
 */
export function extractFilter(filter, name, operator) {
    if (filter && name && operator) {
        const filterObject = filter[name];
        if (filterObject) {
            // if filter object is an object, the decode contents of operator key
            if (filterObject.constructor === {}.constructor) {
                const filterObjectValue = filterObject[operator] || filterObject[`$${operator}`];
                return decode(filterObjectValue);
                // if not an object and operator is equals, decode directly
            }
            else if (operator === "eq" || operator === "$eq") {
                return decode(filterObject);
            }
        }
    }
    return null;
}
const decode = (value) => {
    if (value !== null && value !== undefined) {
        if (value._discriminator) {
            // value is an entity so return the id
            return value.id;
        }
        if (typeof value === "string" || typeof value === "number") {
            return value;
        }
        if (typeof value === "boolean") {
            return value.toString();
        }
        if (value instanceof Date) {
            return value.toISOString();
        }
        if (Array.isArray(value)) {
            return value.join();
        }
        if (value.constructor === {}.constructor) {
            return JSON.stringify(value);
        }
    }
    return null;
};
//# sourceMappingURL=filters.js.map
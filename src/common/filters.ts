import { Entity } from "./entity";

export function extractFilter(filter, name: string, operator: string): string | number {
    if (filter && name && operator) {
        const filterObject = filter[name];
        if (filterObject) {
            // if filter object is an object, the decode contents of operator key
            if ((filterObject as object).constructor === {}.constructor) {
                const filterObjectValue = filterObject[operator];
                return decode(filterObjectValue);
            // if not an object and operator is equals, decode directly
            } else if (operator === "eq") {
                return decode(filterObject);
            }
        }
    }

    return null;
}

const decode = (value: unknown) => {
    if (value) {
        if ((value as Entity)._discriminator) {
            // value is an entity so return the id
            return (value as Entity).id;
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

        if ((value as object).constructor === {}.constructor) {
            return JSON.stringify(value);
        }
    }

    return null;
};

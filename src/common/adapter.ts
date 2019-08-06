import { isObject } from "./utils";

/**
 * Abstract base class for adapters
 */
export abstract class Adapter {

    /**
     * Assign properties of the source object to the target, ignoring values that are undefined on the source
     * @param target target object
     * @param source source object
     */
    protected static assignDefined(target, source) {

        if (!isObject(target)) {
            target = {};
        }

        Object.keys(source).map((key, _index) => {
            if (source[key] !== undefined) {
                target[key] = source[key];
            }
        });

        return target;
    }
}

/**
 * Abstract base class for adapters
 */
export declare abstract class Adapter {
    /**
     * Assign properties of the source object to the target, ignoring values that are undefined on the source
     * @param target target object
     * @param source source object
     */
    protected static assignDefined(target: any, source: any): any;
}

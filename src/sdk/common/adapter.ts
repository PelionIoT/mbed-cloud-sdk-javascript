export abstract class Adapter {
    protected static assignDefined<T>(target: T, source: T) {

        Object.keys(source).map((key, _index) => {
            if (source[key] !== undefined) {
                target[key] = source[key];
            }
        });

        return target;
    }
}

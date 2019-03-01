export abstract class Adapter {
    protected static assignDefined(target, source) {

        Object.keys(source).map((key, _index) => {
            if (source[key] !== undefined) {
                target[key] = source[key];
            }
        });

        return target;
    }
}

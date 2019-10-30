"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * Abstract base class for adapters
 */
var Adapter = /** @class */ (function () {
    function Adapter() {
    }
    /**
     * Assign properties of the source object to the target, ignoring values that are undefined on the source
     * @param target target object
     * @param source source object
     */
    Adapter.assignDefined = function (target, source) {
        if (!utils_1.isObject(target)) {
            target = {};
        }
        Object.keys(source).map(function (key, _index) {
            if (source[key] !== undefined) {
                target[key] = source[key];
            }
        });
        return target;
    };
    return Adapter;
}());
exports.Adapter = Adapter;
//# sourceMappingURL=adapter.js.map
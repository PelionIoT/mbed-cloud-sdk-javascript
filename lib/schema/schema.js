"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schema = /** @class */ (function () {
    function Schema() {
    }
    Schema.prototype.getMethod = function (name) {
        return this.methods.filter(function (m) { return m.name === name; }).pop();
    };
    Schema.prototype.getMethods = function () {
        return this.methods.map(function (m) { return m.name; });
    };
    Schema.prototype.doesMethodExist = function (name) {
        return this.methods.some(function (m) { return m.name === name; });
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map
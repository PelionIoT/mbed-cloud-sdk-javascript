"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = function (val) {
    if (val === null || Array.isArray(val)) {
        return false;
    }
    return ((typeof val === "function") || (typeof val === "object"));
};
exports.isJwt = function (token) {
    if (token && token.startsWith("rt_")) {
        return true;
    }
    return false;
};
//# sourceMappingURL=utils.js.map
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = function (val) {
    if (val === null || Array.isArray(val)) {
        return false;
    }
    return typeof val === "function" || typeof val === "object";
};
exports.isJwt = function (token) {
    if (token && token.includes("rt_")) {
        return true;
    }
    return false;
};
exports.union = function (array1, array2, equality) {
    var e_1, _a;
    var res = __spread(array1);
    if (!equality) {
        equality = function (x, y) { return x === y; };
    }
    var _loop_1 = function (item) {
        if (!res.some(function (x) { return equality(x, item); })) {
            res.push(item);
        }
    };
    try {
        for (var array2_1 = __values(array2), array2_1_1 = array2_1.next(); !array2_1_1.done; array2_1_1 = array2_1.next()) {
            var item = array2_1_1.value;
            _loop_1(item);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (array2_1_1 && !array2_1_1.done && (_a = array2_1.return)) _a.call(array2_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return res;
};
exports.arraysEqual = function (array1, array2) {
    // compare lengths - can save a lot of time
    if (array1.length !== array2.length) {
        return false;
    }
    for (var i = 0, l = array1.length; i < l; i++) {
        if (!array1.includes(array2[i])) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=utils.js.map
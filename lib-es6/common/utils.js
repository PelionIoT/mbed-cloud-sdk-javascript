export const isObject = val => {
    if (val === null || Array.isArray(val)) {
        return false;
    }
    return typeof val === "function" || typeof val === "object";
};
export const isJwt = (token) => {
    if (token && token.indexOf("rt_") > -1) {
        return true;
    }
    return false;
};
export const union = (array1, array2, equality) => {
    const res = [...array1];
    if (!equality) {
        equality = (x, y) => x === y;
    }
    for (const item of array2) {
        if (!res.some(x => equality(x, item))) {
            res.push(item);
        }
    }
    return res;
};
export const arraysEqual = (array1, array2) => {
    // compare lengths - can save a lot of time
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0, l = array1.length; i < l; i++) {
        if (array1.indexOf(array2[i]) === -1) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=utils.js.map
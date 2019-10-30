export const isObject = val => {
    if (val === null || Array.isArray(val)) {
        return false;
    }

    return typeof val === "function" || typeof val === "object";
};

export const isJwt = (token: string) => {
    if (token && token.indexOf("rt_") > -1) {
        return true;
    }

    return false;
};

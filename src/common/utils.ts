export const isObject = val => {
    if (val === null || Array.isArray(val)) {
        return false;
    }

    return ((typeof val === "function") || (typeof val === "object"));
};

export const isJwt = (token: string) => {
    if (token && token.startsWith("rt_")) {
        return true;
    }

    return false;
};

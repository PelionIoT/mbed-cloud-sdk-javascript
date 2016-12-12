// https://github.com/umdjs/umd
(function (root, factory) {
    if (typeof define === 'function' && define.amd) define(factory);
    else if (typeof exports === 'object') module.exports = factory();
    else root.config = factory();
}(this, function() {
    return {
        key: "<mbed Cloud Application Key>",
        domain: "https://api.mbedcloud.com"
    };
}));

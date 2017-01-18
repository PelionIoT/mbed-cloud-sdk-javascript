// https://github.com/umdjs/umd
(function (root, factory) {
    if (typeof define === 'function' && define.amd) define(factory);
    else if (typeof exports === 'object') module.exports = factory();
    else root.config = factory();
}(this, function() {
    return {
        apiKey: "<mbed Cloud API Key>",
        host: "https://api.mbedcloud.com"
    };
}));

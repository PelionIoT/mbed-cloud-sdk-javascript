"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preSharedKey_1 = require("./preSharedKey");
exports.mapToSDK = function (from, api) {
    return new preSharedKey_1.PreSharedKey({
        endpointName: from.endpoint_name,
        createdAt: from.created_at,
        secretHex: null,
    }, api);
};
exports.mapFrom = function (from, api) {
    return new preSharedKey_1.PreSharedKey({
        endpointName: from.endpointName,
        secretHex: from.secretHex,
    }, api);
};
exports.mapToSpec = function (from) {
    return {
        endpoint_name: from.endpointName,
        secret_hex: from.secretHex,
    };
};

//# sourceMappingURL=preSharedKeyAdapter.js.map

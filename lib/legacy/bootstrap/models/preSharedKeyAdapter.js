"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preSharedKey_1 = require("./preSharedKey");
/**
 * Internal
 * @ignore
 */
exports.mapToSDK = function (from, api) {
    return new preSharedKey_1.PreSharedKey({
        endpointName: from.endpoint_name,
        createdAt: from.created_at,
        secretHex: null,
    }, api);
};
/**
 * Internal
 * @ignore
 */
exports.mapFrom = function (from, api) {
    return new preSharedKey_1.PreSharedKey({
        endpointName: from.endpointName,
        secretHex: from.secretHex,
    }, api);
};
/**
 * Internal
 * @ignore
 */
exports.mapToSpec = function (from) {
    return {
        endpoint_name: from.endpointName,
        secret_hex: from.secretHex,
    };
};
//# sourceMappingURL=preSharedKeyAdapter.js.map
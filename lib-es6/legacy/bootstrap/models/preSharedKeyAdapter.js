import { PreSharedKey } from "./preSharedKey";
/**
 * Internal
 * @ignore
 */
export const mapToSDK = (from, api) => {
    return new PreSharedKey({
        endpointName: from.endpoint_name,
        createdAt: from.created_at,
        secretHex: null,
    }, api);
};
/**
 * Internal
 * @ignore
 */
export const mapFrom = (from, api) => {
    return new PreSharedKey({
        endpointName: from.endpointName,
        secretHex: from.secretHex,
    }, api);
};
/**
 * Internal
 * @ignore
 */
export const mapToSpec = (from) => {
    return {
        endpoint_name: from.endpointName,
        secret_hex: from.secretHex,
    };
};
//# sourceMappingURL=preSharedKeyAdapter.js.map
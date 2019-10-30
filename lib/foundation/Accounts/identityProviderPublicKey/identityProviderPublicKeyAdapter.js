"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_1 = require("../../../common/adapter");
/**
 *IdentityProviderPublicKey adapter
 */
var IdentityProviderPublicKeyAdapter = /** @class */ (function (_super) {
    __extends(IdentityProviderPublicKeyAdapter, _super);
    function IdentityProviderPublicKeyAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    IdentityProviderPublicKeyAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = IdentityProviderPublicKeyAdapter.assignDefined(instance || {}, {
            _discriminator: "IDENTITY_PROVIDER_PUBLIC_KEY",
            key: data.key,
            kid: data.kid,
        });
        return mappedEntity;
    };
    return IdentityProviderPublicKeyAdapter;
}(adapter_1.Adapter));
exports.IdentityProviderPublicKeyAdapter = IdentityProviderPublicKeyAdapter;
//# sourceMappingURL=identityProviderPublicKeyAdapter.js.map
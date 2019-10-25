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
 *OidcRequestClaimMapping adapter
 */
var OidcRequestClaimMappingAdapter = /** @class */ (function (_super) {
    __extends(OidcRequestClaimMappingAdapter, _super);
    function OidcRequestClaimMappingAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    OidcRequestClaimMappingAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = OidcRequestClaimMappingAdapter.assignDefined(instance || {}, {
            _discriminator: "OIDC_REQUEST_CLAIM_MAPPING",
            email: data.email,
            emailVerified: data.email_verified,
            familyName: data.family_name,
            givenName: data.given_name,
            name: data.name,
            phoneNumber: data.phone_number,
            sub: data.sub,
            updatedAt: data.updated_at,
            updatedAtPattern: data.updated_at_pattern,
        });
        return mappedEntity;
    };
    return OidcRequestClaimMappingAdapter;
}(adapter_1.Adapter));
exports.OidcRequestClaimMappingAdapter = OidcRequestClaimMappingAdapter;
//# sourceMappingURL=oidcRequestClaimMappingAdapter.js.map
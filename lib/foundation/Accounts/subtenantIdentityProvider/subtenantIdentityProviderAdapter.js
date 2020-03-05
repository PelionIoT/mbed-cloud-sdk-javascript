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
var __1 = require("../..");
/**
 *SubtenantIdentityProvider adapter
 */
var SubtenantIdentityProviderAdapter = /** @class */ (function (_super) {
    __extends(SubtenantIdentityProviderAdapter, _super);
    function SubtenantIdentityProviderAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    SubtenantIdentityProviderAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = SubtenantIdentityProviderAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_IDENTITY_PROVIDER",
            accountId: data.account_id,
            createdAt: data.created_at,
            description: data.description,
            id: data.id,
            isDefault: data.is_default,
            name: data.name,
            oidcAttributes: __1.OidcRequestAdapter.fromApi(data.oidc_attributes),
            saml2Attributes: data.saml2_attributes,
            status: data.status,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return SubtenantIdentityProviderAdapter;
}(adapter_1.Adapter));
exports.SubtenantIdentityProviderAdapter = SubtenantIdentityProviderAdapter;
//# sourceMappingURL=subtenantIdentityProviderAdapter.js.map
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
var __1 = require("../..");
var __2 = require("../..");
var adapter_1 = require("../../../common/adapter");
/**
 *OidcRequest adapter
 */
var OidcRequestAdapter = /** @class */ (function (_super) {
    __extends(OidcRequestAdapter, _super);
    function OidcRequestAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    OidcRequestAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var keys = [];
        if (data.keys) {
            keys = data.keys.map(function (i) { return __2.IdentityProviderPublicKeyAdapter.fromApi(i); });
        }
        var mappedEntity = OidcRequestAdapter.assignDefined(instance || {}, {
            _discriminator: "OIDC_REQUEST",
            authorizationEndpoint: data.authorization_endpoint,
            autoEnrollment: data.auto_enrollment,
            claimMapping: __1.OidcRequestClaimMappingAdapter.fromApi(data.claim_mapping),
            clientId: data.client_id,
            clientSecret: data.client_secret,
            endSessionEndpoint: data.end_session_endpoint,
            issuer: data.issuer,
            jwksUri: data.jwks_uri,
            keys: keys,
            redirectUri: data.redirect_uri,
            revocationEndpoint: data.revocation_endpoint,
            scopes: data.scopes,
            tokenEndpoint: data.token_endpoint,
            tokenRequestMode: data.token_request_mode || "POST",
            tokenResponsePath: data.token_response_path,
            userinfoEndpoint: data.userinfo_endpoint,
        });
        return mappedEntity;
    };
    return OidcRequestAdapter;
}(adapter_1.Adapter));
exports.OidcRequestAdapter = OidcRequestAdapter;
//# sourceMappingURL=oidcRequestAdapter.js.map
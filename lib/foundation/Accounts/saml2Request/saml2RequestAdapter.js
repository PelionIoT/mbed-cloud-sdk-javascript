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
 *Saml2Request adapter
 */
var Saml2RequestAdapter = /** @class */ (function (_super) {
    __extends(Saml2RequestAdapter, _super);
    function Saml2RequestAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    Saml2RequestAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = Saml2RequestAdapter.assignDefined(instance || {}, {
            _discriminator: "SAML2_REQUEST",
            entityDescriptor: data.entity_descriptor,
            idpEntityId: data.idp_entity_id,
            idpX509Certs: data.idp_x509_certs,
            sloEndpoint: data.slo_endpoint,
            spEntityId: data.sp_entity_id,
            ssoEndpoint: data.sso_endpoint,
        });
        return mappedEntity;
    };
    return Saml2RequestAdapter;
}(adapter_1.Adapter));
exports.Saml2RequestAdapter = Saml2RequestAdapter;
//# sourceMappingURL=saml2RequestAdapter.js.map
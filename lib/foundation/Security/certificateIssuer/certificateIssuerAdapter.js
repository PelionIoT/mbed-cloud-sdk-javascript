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
 *CertificateIssuer adapter
 */
var CertificateIssuerAdapter = /** @class */ (function (_super) {
    __extends(CertificateIssuerAdapter, _super);
    function CertificateIssuerAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    CertificateIssuerAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = CertificateIssuerAdapter.assignDefined(instance || {}, {
            _discriminator: "CERTIFICATE_ISSUER",
            createdAt: data.created_at,
            description: data.description,
            id: data.id,
            issuerAttributes: data.issuer_attributes,
            issuerType: data.issuer_type,
            name: data.name,
        });
        return mappedEntity;
    };
    return CertificateIssuerAdapter;
}(adapter_1.Adapter));
exports.CertificateIssuerAdapter = CertificateIssuerAdapter;
//# sourceMappingURL=certificateIssuerAdapter.js.map
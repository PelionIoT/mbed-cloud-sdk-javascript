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
 *CertificateIssuerConfig adapter
 */
var CertificateIssuerConfigAdapter = /** @class */ (function (_super) {
    __extends(CertificateIssuerConfigAdapter, _super);
    function CertificateIssuerConfigAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    CertificateIssuerConfigAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = CertificateIssuerConfigAdapter.assignDefined(instance || {}, {
            _discriminator: "CERTIFICATE_ISSUER_CONFIG",
            certificateIssuerId: data.certificate_issuer_id,
            createdAt: data.created_at,
            id: data.id,
            reference: data.reference,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return CertificateIssuerConfigAdapter;
}(adapter_1.Adapter));
exports.CertificateIssuerConfigAdapter = CertificateIssuerConfigAdapter;
//# sourceMappingURL=certificateIssuerConfigAdapter.js.map
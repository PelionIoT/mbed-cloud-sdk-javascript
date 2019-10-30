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
var privateFunctions_1 = require("../../../common/privateFunctions");
/**
 *TrustedCertificate adapter
 */
var TrustedCertificateAdapter = /** @class */ (function (_super) {
    __extends(TrustedCertificateAdapter, _super);
    function TrustedCertificateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    TrustedCertificateAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = TrustedCertificateAdapter.assignDefined(instance || {}, {
            _discriminator: "TRUSTED_CERTIFICATE",
            accountId: data.account_id,
            certificate: data.certificate,
            certificateFingerprint: data.certificate_fingerprint,
            createdAt: data.created_at,
            description: data.description,
            deviceExecutionMode: data.device_execution_mode || 0,
            enrollmentMode: data.enrollment_mode,
            id: data.id,
            isDeveloperCertificate: data.is_developer_certificate,
            issuer: data.issuer,
            name: data.name,
            ownerId: data.owner_id,
            service: data.service,
            status: data.status,
            subject: data.subject,
            updatedAt: data.updated_at,
            valid: data.valid,
            validity: data.validity,
        });
        privateFunctions_1.isDeveloperCertificateGetter(mappedEntity);
        return mappedEntity;
    };
    return TrustedCertificateAdapter;
}(adapter_1.Adapter));
exports.TrustedCertificateAdapter = TrustedCertificateAdapter;
//# sourceMappingURL=trustedCertificateAdapter.js.map
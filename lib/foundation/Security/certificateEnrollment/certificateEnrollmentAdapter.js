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
 *CertificateEnrollment adapter
 */
var CertificateEnrollmentAdapter = /** @class */ (function (_super) {
    __extends(CertificateEnrollmentAdapter, _super);
    function CertificateEnrollmentAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    CertificateEnrollmentAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = CertificateEnrollmentAdapter.assignDefined(instance || {}, {
            _discriminator: "CERTIFICATE_ENROLLMENT",
            certificateName: data.certificate_name,
            createdAt: data.created_at,
            deviceId: data.device_id,
            enrollResult: data.enroll_result,
            enrollResultDetail: data.enroll_result_detail,
            enrollStatus: data.enroll_status,
            id: data.id,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return CertificateEnrollmentAdapter;
}(adapter_1.Adapter));
exports.CertificateEnrollmentAdapter = CertificateEnrollmentAdapter;
//# sourceMappingURL=certificateEnrollmentAdapter.js.map
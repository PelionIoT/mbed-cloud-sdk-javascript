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
 *DeviceEnrollmentDenial adapter
 */
var DeviceEnrollmentDenialAdapter = /** @class */ (function (_super) {
    __extends(DeviceEnrollmentDenialAdapter, _super);
    function DeviceEnrollmentDenialAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    DeviceEnrollmentDenialAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = DeviceEnrollmentDenialAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_ENROLLMENT_DENIAL",
            accountId: data.account_id,
            createdAt: data.created_at,
            endpointName: data.endpoint_name,
            id: data.id,
            trustedCertificateId: data.trusted_certificate_id,
        });
        return mappedEntity;
    };
    return DeviceEnrollmentDenialAdapter;
}(adapter_1.Adapter));
exports.DeviceEnrollmentDenialAdapter = DeviceEnrollmentDenialAdapter;
//# sourceMappingURL=deviceEnrollmentDenialAdapter.js.map
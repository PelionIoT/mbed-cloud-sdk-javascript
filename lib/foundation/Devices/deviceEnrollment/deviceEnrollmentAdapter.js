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
 *DeviceEnrollment adapter
 */
var DeviceEnrollmentAdapter = /** @class */ (function (_super) {
    __extends(DeviceEnrollmentAdapter, _super);
    function DeviceEnrollmentAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    DeviceEnrollmentAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = DeviceEnrollmentAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_ENROLLMENT",
            accountId: data.account_id,
            claimedAt: data.claimed_at,
            createdAt: data.created_at,
            enrolledDeviceId: data.enrolled_device_id,
            enrollmentIdentity: data.enrollment_identity,
            expiresAt: data.expires_at,
            id: data.id,
        });
        return mappedEntity;
    };
    return DeviceEnrollmentAdapter;
}(adapter_1.Adapter));
exports.DeviceEnrollmentAdapter = DeviceEnrollmentAdapter;
//# sourceMappingURL=deviceEnrollmentAdapter.js.map
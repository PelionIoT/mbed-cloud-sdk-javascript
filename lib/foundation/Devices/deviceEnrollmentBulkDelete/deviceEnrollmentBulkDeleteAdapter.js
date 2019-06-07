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
 *DeviceEnrollmentBulkDelete adapter
 */
var DeviceEnrollmentBulkDeleteAdapter = /** @class */ (function (_super) {
    __extends(DeviceEnrollmentBulkDeleteAdapter, _super);
    function DeviceEnrollmentBulkDeleteAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    DeviceEnrollmentBulkDeleteAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = DeviceEnrollmentBulkDeleteAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_ENROLLMENT_BULK_DELETE",
            accountId: data.account_id,
            completedAt: data.completed_at,
            createdAt: data.created_at,
            errorsCount: data.errors_count || 0,
            errorsReportFile: data.errors_report_file,
            fullReportFile: data.full_report_file,
            id: data.id,
            processedCount: data.processed_count || 0,
            status: data.status || "new",
            totalCount: data.total_count || 0,
        });
        return mappedEntity;
    };
    return DeviceEnrollmentBulkDeleteAdapter;
}(adapter_1.Adapter));
exports.DeviceEnrollmentBulkDeleteAdapter = DeviceEnrollmentBulkDeleteAdapter;
//# sourceMappingURL=deviceEnrollmentBulkDeleteAdapter.js.map
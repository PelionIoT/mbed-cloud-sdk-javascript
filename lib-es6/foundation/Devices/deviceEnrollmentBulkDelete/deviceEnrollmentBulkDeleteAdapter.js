import { Adapter } from "../../../common/adapter";
/**
 *DeviceEnrollmentBulkDelete adapter
 */
export class DeviceEnrollmentBulkDeleteAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = DeviceEnrollmentBulkDeleteAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_ENROLLMENT_BULK_DELETE",
            accountId: data.account_id,
            completedAt: data.completed_at,
            createdAt: data.created_at,
            errorsCount: data.errors_count,
            errorsReportFile: data.errors_report_file,
            fullReportFile: data.full_report_file,
            id: data.id,
            processedCount: data.processed_count,
            status: data.status || "new",
            totalCount: data.total_count,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=deviceEnrollmentBulkDeleteAdapter.js.map
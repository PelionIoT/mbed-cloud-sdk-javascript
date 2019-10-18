import { Adapter } from "../../../common/adapter";
/**
 *DeviceEnrollmentBulkCreate adapter
 */
export class DeviceEnrollmentBulkCreateAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = DeviceEnrollmentBulkCreateAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_ENROLLMENT_BULK_CREATE",
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
    }
}
//# sourceMappingURL=deviceEnrollmentBulkCreateAdapter.js.map
import { Adapter } from "../../../common/adapter";
import { DeviceEnrollmentBulkCreate } from "./deviceEnrollmentBulkCreate";
/**
 *DeviceEnrollmentBulkCreate adapter
 */
export class DeviceEnrollmentBulkCreateAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): DeviceEnrollmentBulkCreate {
        if (!data) {
            return null;
        }
        const mappedEntity = DeviceEnrollmentBulkCreateAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_ENROLLMENT_BULK_CREATE",
            accountId: data.account_id,
            completedAt: data.completed_at,
            createdAt: data.created_at,
            errorsCount: data.errors_count || undefined,
            errorsReportFile: data.errors_report_file,
            fullReportFile: data.full_report_file,
            id: data.id,
            processedCount: data.processed_count || undefined,
            status: data.status || "new",
            totalCount: data.total_count || undefined,
        });
        return mappedEntity;
    }
}

import { Adapter } from "../../../common/adapter";
import { DeviceEnrollmentBulkCreate } from "./deviceEnrollmentBulkCreate";
/**
 *DeviceEnrollmentBulkCreate adapter
 */
export class DeviceEnrollmentBulkCreateAdapter extends Adapter {
    public static fromApi(data: any, instance?: DeviceEnrollmentBulkCreate): DeviceEnrollmentBulkCreate {
        return DeviceEnrollmentBulkCreateAdapter.assignDefined<DeviceEnrollmentBulkCreate>(instance || {}, {
            accountId: data.account_id,
            completedAt: data.completed_at,
            createdAt: data.created_at,
            errorsCount: data.errors_count,
            errorsReportFile: data.errors_report_file,
            fullReportFile: data.full_report_file,
            id: data.id,
            processedCount: data.processed_count,
            status: data.status,
            totalCount: data.total_count,
        });
    }
}

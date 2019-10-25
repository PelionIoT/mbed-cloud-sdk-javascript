import { Schema } from "../../../schema/schema";
export const deviceEnrollmentBulkDeleteSchema = () => {
    return Object.assign(new Schema(), {
        name: "DeviceEnrollmentBulkDelete",
        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },
            {
                name: "completedAt",
                apiName: "completed_at",
                type: "Date",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "errorsCount",
                apiName: "errors_count",
                type: "number",
            },
            {
                name: "errorsReportFile",
                apiName: "errors_report_file",
                type: "string",
            },
            {
                name: "fullReportFile",
                apiName: "full_report_file",
                type: "string",
            },
            {
                name: "processedCount",
                apiName: "processed_count",
                type: "number",
            },
            {
                name: "status",
                apiName: "status",
                type: "DeviceEnrollmentBulkDeleteStatus",
            },
            {
                name: "totalCount",
                apiName: "total_count",
                type: "number",
            },
        ],
        methods: [
            {
                name: "delete",
                returnType: "Promise<DeviceEnrollmentBulkDelete>",
                parameters: [
                    {
                        name: "enrollmentIdentities",
                        position: 0,
                        type: "ReadStream | Buffer | File | Blob",
                    },
                ],
            },
            {
                name: "downloadErrorsReportFile",
                returnType: "Promise<ReadStream | Buffer | File | Blob>",
                parameters: [
                    {
                        name: "model",
                        position: 0,
                        type: "DeviceEnrollmentBulkDelete",
                    },
                ],
            },
            {
                name: "downloadFullReportFile",
                returnType: "Promise<ReadStream | Buffer | File | Blob>",
                parameters: [
                    {
                        name: "model",
                        position: 0,
                        type: "DeviceEnrollmentBulkDelete",
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<DeviceEnrollmentBulkDelete>",
                parameters: [
                    {
                        name: "deviceEnrollmentBulkDeleteId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=deviceEnrollmentBulkDeleteSchema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.deviceEnrollmentBulkCreateSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "DeviceEnrollmentBulkCreate",
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
                type: "DeviceEnrollmentBulkCreateStatus",
            },
            {
                name: "totalCount",
                apiName: "total_count",
                type: "number",
            },
        ],
        methods: [
            {
                name: "create",
                returnType: "Promise<DeviceEnrollmentBulkCreate>",
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
                        type: "DeviceEnrollmentBulkCreate",
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
                        type: "DeviceEnrollmentBulkCreate",
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<DeviceEnrollmentBulkCreate>",
                parameters: [
                    {
                        name: "deviceEnrollmentBulkCreateId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=deviceEnrollmentBulkCreateSchema.js.map
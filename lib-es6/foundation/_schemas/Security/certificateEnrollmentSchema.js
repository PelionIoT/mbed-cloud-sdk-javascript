import { Schema } from "../../../schema/schema";
export const certificateEnrollmentSchema = () => {
    return Object.assign(new Schema(), {
        name: "CertificateEnrollment",
        fields: [
            {
                name: "certificateName",
                apiName: "certificate_name",
                type: "string",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "deviceId",
                apiName: "device_id",
                type: "string",
            },
            {
                name: "enrollResult",
                apiName: "enroll_result",
                type: "CertificateEnrollmentEnrollResult",
            },
            {
                name: "enrollResultDetail",
                apiName: "enroll_result_detail",
                type: "string",
            },
            {
                name: "enrollStatus",
                apiName: "enroll_status",
                type: "CertificateEnrollmentEnrollStatus",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
        ],
        methods: [
            {
                name: "list",
                returnType: "Paginator<CertificateEnrollment, ListOptions>",
                parameters: [
                    {
                        name: "options",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                            {
                                name: "filter",
                                type: "CertificateEnrollmentFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<CertificateEnrollment>",
                parameters: [
                    {
                        name: "certificateEnrollmentId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=certificateEnrollmentSchema.js.map
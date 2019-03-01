import { Schema } from "../../../schema/schema";

export const certificateEnrollmentSchema = (): Schema => {
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
                type: "CertificateEnrollmentEnrollResultEnum",
            },
            {
                name: "enrollStatus",
                apiName: "enroll_status",
                type: "CertificateEnrollmentEnrollStatusEnum",
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

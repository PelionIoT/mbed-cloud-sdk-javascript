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
                name: "get",
                returnType: "Promise<CertificateEnrollment>",
                parameters: [
                    {
                        name: "id",
                        position: 0,
                        type: "string",
                    },
                ],
            },

            {
                name: "list",
                returnType: "Paginator<CertificateEnrollment, ListOptions>",
                parameters: [
                    {
                        name: "options",
                        position: 0,
                        type: "ListOptions",
                    },
                ],
            },
        ],
    });
};

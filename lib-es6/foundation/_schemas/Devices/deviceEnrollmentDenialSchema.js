import { Schema } from "../../../schema/schema";
export const deviceEnrollmentDenialSchema = () => {
    return Object.assign(new Schema(), {
        name: "DeviceEnrollmentDenial",
        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "endpointName",
                apiName: "endpoint_name",
                type: "string",
            },
            {
                name: "trustedCertificateId",
                apiName: "trusted_certificate_id",
                type: "string",
            },
        ],
        methods: [
            {
                name: "list",
                returnType: "Paginator<DeviceEnrollmentDenial, ListOptions>",
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
                                type: "DeviceEnrollmentDenialFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<DeviceEnrollmentDenial>",
                parameters: [
                    {
                        name: "deviceEnrollmentDenialId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=deviceEnrollmentDenialSchema.js.map
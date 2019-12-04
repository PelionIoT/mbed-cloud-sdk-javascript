"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.deviceEnrollmentDenialSchema = function () {
    return Object.assign(new schema_1.Schema(), {
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
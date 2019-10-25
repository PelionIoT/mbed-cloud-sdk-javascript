"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.trustedCertificateSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "TrustedCertificate",
        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },
            {
                name: "certificate",
                apiName: "certificate",
                type: "string",
            },
            {
                name: "certificateFingerprint",
                apiName: "certificate_fingerprint",
                type: "string",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "description",
                apiName: "description",
                type: "string",
            },
            {
                name: "deviceExecutionMode",
                apiName: "device_execution_mode",
                type: "number",
            },
            {
                name: "enrollmentMode",
                apiName: "enrollment_mode",
                type: "boolean",
            },
            {
                name: "isDeveloperCertificate",
                apiName: "is_developer_certificate",
                type: "boolean",
            },
            {
                name: "issuer",
                apiName: "issuer",
                type: "string",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
            {
                name: "ownerId",
                apiName: "owner_id",
                type: "string",
            },
            {
                name: "service",
                apiName: "service",
                type: "TrustedCertificateService",
            },
            {
                name: "status",
                apiName: "status",
                type: "TrustedCertificateStatus",
            },
            {
                name: "subject",
                apiName: "subject",
                type: "string",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
            {
                name: "valid",
                apiName: "valid",
                type: "boolean",
            },
            {
                name: "validity",
                apiName: "validity",
                type: "Date",
            },
        ],
        methods: [
            {
                name: "create",
                returnType: "Promise<TrustedCertificate>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "certificate",
                                type: "string",
                            },
                            {
                                name: "description",
                                type: "string",
                            },
                            {
                                name: "enrollmentMode",
                                type: "boolean",
                            },
                            {
                                name: "name",
                                type: "string",
                            },
                            {
                                name: "service",
                                type: "TrustedCertificateService",
                            },
                            {
                                name: "status",
                                type: "TrustedCertificateStatus",
                            },
                        ],
                    },
                ],
            },
            {
                name: "delete",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "trustedCertificateId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "getDeveloperCertificateInfo",
                returnType: "Promise<DeveloperCertificate>",
                parameters: [
                    {
                        name: "trustedCertificateId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<TrustedCertificate, ListOptions>",
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
                                type: "TrustedCertificateFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<TrustedCertificate>",
                parameters: [
                    {
                        name: "trustedCertificateId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<TrustedCertificate>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "certificate",
                                type: "string",
                            },
                            {
                                name: "description",
                                type: "string",
                            },
                            {
                                name: "enrollmentMode",
                                type: "boolean",
                            },
                            {
                                name: "name",
                                type: "string",
                            },
                            {
                                name: "service",
                                type: "TrustedCertificateService",
                            },
                            {
                                name: "status",
                                type: "TrustedCertificateStatus",
                            },
                        ],
                    },
                    {
                        name: "trustedCertificateId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=trustedCertificateSchema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.subtenantTrustedCertificateSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "SubtenantTrustedCertificate",
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
                type: "SubtenantTrustedCertificateService",
            },
            {
                name: "status",
                apiName: "status",
                type: "SubtenantTrustedCertificateStatus",
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
                returnType: "Promise<SubtenantTrustedCertificate>",
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
                                type: "SubtenantTrustedCertificateService",
                            },
                            {
                                name: "status",
                                type: "SubtenantTrustedCertificateStatus",
                            },
                        ],
                    },
                    {
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "delete",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantTrustedCertificateId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "getDeveloperCertificateInfo",
                returnType: "Promise<DeveloperCertificate>",
                parameters: [
                    {
                        name: "subtenantTrustedCertificateId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<SubtenantTrustedCertificate>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantTrustedCertificateId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<SubtenantTrustedCertificate>",
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
                                type: "SubtenantTrustedCertificateService",
                            },
                            {
                                name: "status",
                                type: "SubtenantTrustedCertificateStatus",
                            },
                        ],
                    },
                    {
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "subtenantTrustedCertificateId",
                        position: 2,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=subtenantTrustedCertificateSchema.js.map
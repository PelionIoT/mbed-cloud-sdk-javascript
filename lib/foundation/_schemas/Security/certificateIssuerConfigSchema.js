"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.certificateIssuerConfigSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "CertificateIssuerConfig",
        fields: [
            {
                name: "certificateIssuerId",
                apiName: "certificate_issuer_id",
                type: "string",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "reference",
                apiName: "reference",
                type: "string",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
        ],
        methods: [
            {
                name: "create",
                returnType: "Promise<CertificateIssuerConfig>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "certificateIssuerId",
                                type: "string",
                            },
                            {
                                name: "reference",
                                type: "string",
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
                        name: "certificateIssuerConfigId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "getDefault",
                returnType: "Promise<CertificateIssuerConfig>",
                parameters: [],
            },
            {
                name: "list",
                returnType: "Paginator<CertificateIssuerConfig, ListOptions>",
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
                                type: "CertificateIssuerConfigFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<CertificateIssuerConfig>",
                parameters: [
                    {
                        name: "certificateIssuerConfigId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<CertificateIssuerConfig>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "certificateIssuerId",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "certificateIssuerConfigId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=certificateIssuerConfigSchema.js.map
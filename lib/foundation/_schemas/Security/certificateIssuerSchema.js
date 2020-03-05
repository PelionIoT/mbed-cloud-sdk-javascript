"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.certificateIssuerSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "CertificateIssuer",
        fields: [
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
                name: "issuerAttributes",
                apiName: "issuer_attributes",
                type: "{ [key: string]: string }",
            },
            {
                name: "issuerType",
                apiName: "issuer_type",
                type: "CertificateIssuerType",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
        ],
        methods: [
            {
                name: "create",
                returnType: "Promise<CertificateIssuer>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "description",
                                type: "string",
                            },
                            {
                                name: "issuerAttributes",
                                type: "{ [key: string]: string }",
                            },
                            {
                                name: "issuerCredentials",
                                type: "{ [key: string]: string }",
                            },
                            {
                                name: "issuerType",
                                type: "CertificateIssuerType",
                            },
                            {
                                name: "name",
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
                        name: "certificateIssuerId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<CertificateIssuer, ListOptions>",
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
                returnType: "Promise<CertificateIssuer>",
                parameters: [
                    {
                        name: "certificateIssuerId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<CertificateIssuer>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "description",
                                type: "string",
                            },
                            {
                                name: "issuerAttributes",
                                type: "{ [key: string]: string }",
                            },
                            {
                                name: "issuerCredentials",
                                type: "{ [key: string]: string }",
                            },
                            {
                                name: "name",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "certificateIssuerId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "verify",
                returnType: "Promise<VerificationResponse>",
                parameters: [
                    {
                        name: "certificateIssuerId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=certificateIssuerSchema.js.map
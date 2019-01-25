import { Schema } from "../../../schema/schema";

export const certificateIssuerSchema = (): Schema => {
    return Object.assign(new Schema(), {
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
                type: "CertificateIssuerTypeEnum",
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
                                type: "CertificateIssuerTypeEnum",
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
                        name: "id",
                        position: 0,
                        type: "string",
                    },
                ],
            },

            {
                name: "get",
                returnType: "Promise<CertificateIssuer>",
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
                returnType: "Paginator<CertificateIssuer, ListOptions>",
                parameters: [
                    {
                        name: "options",
                        position: 0,
                        type: "ListOptions",
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
                        name: "id",
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
                        name: "id",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
import { Schema } from "../../../schema/schema";

export const certificateIssuerConfigSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "CertificateIssuerConfig",

        fields: [
            {
                name: "certificateIssuerId",
                apiName: "certificate_issuer_id",
                type: "string",
            },

            {
                name: "certificateReference",
                apiName: "reference",
                type: "string",
            },

            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
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
                                name: "certificateReference",
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
                returnType: "Promise<CertificateIssuerConfig>",
                parameters: [
                    {
                        name: "id",
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
                        type: "ListOptions",
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
                        name: "id",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};

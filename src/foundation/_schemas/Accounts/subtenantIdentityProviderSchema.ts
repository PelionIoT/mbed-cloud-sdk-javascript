import { Schema } from "../../../schema/schema";

export const subtenantIdentityProviderSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "SubtenantIdentityProvider",
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
                name: "description",
                apiName: "description",
                type: "string",
            },
            {
                name: "isDefault",
                apiName: "is_default",
                type: "boolean",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
            {
                name: "saml2Attributes",
                apiName: "saml2_attributes",
                type: "any",
            },
            {
                name: "status",
                apiName: "status",
                type: "SubtenantIdentityProviderStatus",
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
                returnType: "Promise<SubtenantIdentityProvider>",
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
                                name: "name",
                                type: "string",
                            },
                            {
                                name: "oidcAttributes",
                                type: "OidcRequest",
                            },
                            {
                                name: "saml2Attributes",
                                type: "any",
                            },
                            {
                                name: "status",
                                type: "SubtenantIdentityProviderStatus",
                            },
                        ],
                    },
                    {
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "discovery",
                        position: 2,
                        type: "boolean",
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
                        name: "subtenantIdentityProviderId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "deleteServiceProviderCertificate",
                returnType: "Promise<SubtenantIdentityProvider>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantIdentityProviderId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "generateServiceProviderCertificate",
                returnType: "Promise<SubtenantIdentityProvider>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "algorithm",
                                type: "SubtenantIdentityProviderAlgorithm",
                            },
                            {
                                name: "validity",
                                type: "number",
                            },
                        ],
                    },
                    {
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "subtenantIdentityProviderId",
                        position: 2,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<SubtenantIdentityProvider, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
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
                returnType: "Promise<SubtenantIdentityProvider>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantIdentityProviderId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "refreshTokens",
                returnType: "Promise<SubtenantIdentityProvider>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantIdentityProviderId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<SubtenantIdentityProvider>",
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
                                name: "name",
                                type: "string",
                            },
                            {
                                name: "oidcAttributes",
                                type: "OidcRequest",
                            },
                            {
                                name: "saml2Attributes",
                                type: "any",
                            },
                            {
                                name: "status",
                                type: "SubtenantIdentityProviderStatus",
                            },
                        ],
                    },
                    {
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "subtenantIdentityProviderId",
                        position: 2,
                        type: "string",
                    },
                    {
                        name: "discovery",
                        position: 3,
                        type: "boolean",
                    },
                ],
            },
        ],
    });
};

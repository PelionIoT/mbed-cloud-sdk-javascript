import { Schema } from "../../../schema/schema";

export const identityProviderSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "IdentityProvider",
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
                name: "identityProviderType",
                apiName: "type",
                type: "IdentityProviderType",
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
                type: "IdentityProviderStatus",
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
                returnType: "Promise<IdentityProvider>",
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
                                name: "identityProviderType",
                                type: "IdentityProviderType",
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
                                type: "IdentityProviderStatus",
                            },
                        ],
                    },
                    {
                        name: "discovery",
                        position: 1,
                        type: "boolean",
                    },
                ],
            },
            {
                name: "delete",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "identityProviderId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "deleteServiceProviderCertificate",
                returnType: "Promise<IdentityProvider>",
                parameters: [
                    {
                        name: "identityProviderId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "generateServiceProviderCertificate",
                returnType: "Promise<IdentityProvider>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "algorithm",
                                type: "IdentityProviderAlgorithm",
                            },
                            {
                                name: "validity",
                                type: "number",
                            },
                        ],
                    },
                    {
                        name: "identityProviderId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<IdentityProvider, ListOptions>",
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
                returnType: "Promise<IdentityProvider>",
                parameters: [
                    {
                        name: "identityProviderId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "refreshTokens",
                returnType: "Promise<IdentityProvider>",
                parameters: [
                    {
                        name: "identityProviderId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<IdentityProvider>",
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
                                name: "identityProviderType",
                                type: "IdentityProviderType",
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
                                type: "IdentityProviderStatus",
                            },
                        ],
                    },
                    {
                        name: "identityProviderId",
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
        ],
    });
};

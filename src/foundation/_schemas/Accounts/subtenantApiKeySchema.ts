import { Schema } from "../../../schema/schema";

export const subtenantApiKeySchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "SubtenantApiKey",
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
                name: "creationTime",
                apiName: "creation_time",
                type: "number",
            },
            {
                name: "groups",
                apiName: "groups",
                type: "Array<string>",
            },
            {
                name: "key",
                apiName: "key",
                type: "string",
            },
            {
                name: "lastLoginTime",
                apiName: "last_login_time",
                type: "number",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
            {
                name: "owner",
                apiName: "owner",
                type: "string",
            },
            {
                name: "status",
                apiName: "status",
                type: "SubtenantApiKeyStatus",
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
                returnType: "Promise<SubtenantApiKey>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "groups",
                                type: "Array<string>",
                            },
                            {
                                name: "name",
                                type: "string",
                            },
                            {
                                name: "owner",
                                type: "string",
                            },
                            {
                                name: "status",
                                type: "SubtenantApiKeyStatus",
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
                        name: "subtenantApiKeyId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "policyGroups",
                returnType: "Paginator<SubtenantPolicyGroup, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantApiKeyId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 2,
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
                returnType: "Promise<SubtenantApiKey>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantApiKeyId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<SubtenantApiKey>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "groups",
                                type: "Array<string>",
                            },
                            {
                                name: "name",
                                type: "string",
                            },
                            {
                                name: "owner",
                                type: "string",
                            },
                            {
                                name: "status",
                                type: "SubtenantApiKeyStatus",
                            },
                        ],
                    },
                    {
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "subtenantApiKeyId",
                        position: 2,
                        type: "string",
                    },
                ],
            },
        ],
    });
};

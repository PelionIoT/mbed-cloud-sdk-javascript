import { Schema } from "../../../schema/schema";

export const subtenantPolicyGroupSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "SubtenantPolicyGroup",
        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },
            {
                name: "apikeyCount",
                apiName: "apikey_count",
                type: "number",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
            {
                name: "userCount",
                apiName: "user_count",
                type: "number",
            },
        ],

        methods: [
            {
                name: "apiKeys",
                returnType: "Paginator<SubtenantApiKey, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantPolicyGroupId",
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
                name: "create",
                returnType: "Promise<SubtenantPolicyGroup>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "members",
                                type: "any",
                            },
                            {
                                name: "name",
                                type: "string",
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
                        name: "subtenantPolicyGroupId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<SubtenantPolicyGroup, ListOptions>",
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
                            {
                                name: "filter",
                                type: "SubtenantPolicyGroupSubtenantUserFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<SubtenantPolicyGroup>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantPolicyGroupId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<SubtenantPolicyGroup>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "name",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "subtenantPolicyGroupId",
                        position: 2,
                        type: "string",
                    },
                ],
            },
            {
                name: "users",
                returnType: "Paginator<SubtenantUser, ListOptions>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantPolicyGroupId",
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
                            {
                                name: "filter",
                                type: "SubtenantPolicyGroupSubtenantUserFilter",
                            },
                        ],
                    },
                ],
            },
        ],
    });
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.policyGroupSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "PolicyGroup",
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
                returnType: "Paginator<ApiKey, ListOptions>",
                parameters: [
                    {
                        name: "policyGroupId",
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
                name: "list",
                returnType: "Paginator<PolicyGroup, ListOptions>",
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
                                type: "PolicyGroupUserFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<PolicyGroup>",
                parameters: [
                    {
                        name: "policyGroupId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "users",
                returnType: "Paginator<User, ListOptions>",
                parameters: [
                    {
                        name: "policyGroupId",
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
                                type: "PolicyGroupUserFilter",
                            },
                        ],
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=policyGroupSchema.js.map
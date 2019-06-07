"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.apiKeySchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "ApiKey",
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
                type: "ApiKeyStatus",
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
                returnType: "Promise<ApiKey>",
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
                            {
                                name: "owner",
                                type: "string",
                            },
                            {
                                name: "status",
                                type: "ApiKeyStatus",
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
                        name: "apiKeyId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<ApiKey, ListOptions>",
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
                                type: "ApiKeyFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "me",
                returnType: "Promise<ApiKey>",
                parameters: [],
            },
            {
                name: "read",
                returnType: "Promise<ApiKey>",
                parameters: [
                    {
                        name: "apiKeyId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<ApiKey>",
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
                            {
                                name: "owner",
                                type: "string",
                            },
                            {
                                name: "status",
                                type: "ApiKeyStatus",
                            },
                        ],
                    },
                    {
                        name: "apiKeyId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=apiKeySchema.js.map
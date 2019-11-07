"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.preSharedKeySchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "PreSharedKey",
        fields: [
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "endpointName",
                apiName: "endpoint_name",
                type: "string",
            },
        ],
        methods: [
            {
                name: "create",
                returnType: "Promise<PreSharedKey>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "endpointName",
                                type: "string",
                            },
                            {
                                name: "secretHex",
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
                        name: "preSharedKeyId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<PreSharedKey, ListOptions>",
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
                returnType: "Promise<PreSharedKey>",
                parameters: [
                    {
                        name: "preSharedKeyId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=preSharedKeySchema.js.map
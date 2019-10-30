"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.darkThemeColorSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "DarkThemeColor",
        fields: [
            {
                name: "color",
                apiName: "color",
                type: "string",
            },
            {
                name: "reference",
                apiName: "reference",
                type: "DarkThemeColorReference",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
        ],
        methods: [
            {
                name: "delete",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "reference",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<DarkThemeColor, ListOptions>",
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
                returnType: "Promise<DarkThemeColor>",
                parameters: [
                    {
                        name: "reference",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<DarkThemeColor>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "color",
                                type: "string",
                            },
                            {
                                name: "updatedAt",
                                type: "Date",
                            },
                        ],
                    },
                    {
                        name: "reference",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=darkThemeColorSchema.js.map
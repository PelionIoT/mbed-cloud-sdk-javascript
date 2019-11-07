"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.subtenantDarkThemeColorSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "SubtenantDarkThemeColor",
        fields: [
            {
                name: "color",
                apiName: "color",
                type: "string",
            },
            {
                name: "reference",
                apiName: "reference",
                type: "SubtenantDarkThemeColorReference",
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
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "reference",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<SubtenantDarkThemeColor>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "reference",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<SubtenantDarkThemeColor>",
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
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "reference",
                        position: 2,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=subtenantDarkThemeColorSchema.js.map
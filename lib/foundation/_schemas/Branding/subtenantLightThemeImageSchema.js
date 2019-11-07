"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.subtenantLightThemeImageSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "SubtenantLightThemeImage",
        fields: [
            {
                name: "reference",
                apiName: "reference",
                type: "SubtenantLightThemeImageReference",
            },
            {
                name: "staticUri",
                apiName: "static_uri",
                type: "string",
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
                returnType: "Promise<SubtenantLightThemeImage>",
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
                returnType: "Promise<SubtenantLightThemeImage>",
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
                returnType: "Promise<SubtenantLightThemeImage>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "image",
                        position: 1,
                        type: "ReadStream | Buffer | File | Blob",
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
//# sourceMappingURL=subtenantLightThemeImageSchema.js.map
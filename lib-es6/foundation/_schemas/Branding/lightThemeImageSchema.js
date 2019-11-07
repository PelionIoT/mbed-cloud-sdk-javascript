import { Schema } from "../../../schema/schema";
export const lightThemeImageSchema = () => {
    return Object.assign(new Schema(), {
        name: "LightThemeImage",
        fields: [
            {
                name: "reference",
                apiName: "reference",
                type: "LightThemeImageReference",
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
                returnType: "Promise<LightThemeImage>",
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
                returnType: "Paginator<LightThemeImage, ListOptions>",
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
                returnType: "Promise<LightThemeImage>",
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
                returnType: "Promise<LightThemeImage>",
                parameters: [
                    {
                        name: "image",
                        position: 0,
                        type: "ReadStream | Buffer | File | Blob",
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
//# sourceMappingURL=lightThemeImageSchema.js.map
import { Schema } from "../../../schema/schema";
export const darkThemeImageSchema = () => {
    return Object.assign(new Schema(), {
        name: "DarkThemeImage",
        fields: [
            {
                name: "reference",
                apiName: "reference",
                type: "DarkThemeImageReference",
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
                returnType: "Promise<DarkThemeImage>",
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
                returnType: "Paginator<DarkThemeImage, ListOptions>",
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
                returnType: "Promise<DarkThemeImage>",
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
                returnType: "Promise<DarkThemeImage>",
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
//# sourceMappingURL=darkThemeImageSchema.js.map
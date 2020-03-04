import { Schema } from "../../../schema/schema";
export const lightThemeColorSchema = () => {
    return Object.assign(new Schema(), {
        name: "LightThemeColor",
        fields: [
            {
                name: "color",
                apiName: "color",
                type: "string",
            },
            {
                name: "reference",
                apiName: "reference",
                type: "LightThemeColorReference",
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
                returnType: "Paginator<LightThemeColor, ListOptions>",
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
                returnType: "Promise<LightThemeColor>",
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
                returnType: "Promise<LightThemeColor>",
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
//# sourceMappingURL=lightThemeColorSchema.js.map
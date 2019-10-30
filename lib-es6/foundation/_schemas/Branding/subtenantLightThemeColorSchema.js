import { Schema } from "../../../schema/schema";
export const subtenantLightThemeColorSchema = () => {
    return Object.assign(new Schema(), {
        name: "SubtenantLightThemeColor",
        fields: [
            {
                name: "color",
                apiName: "color",
                type: "string",
            },
            {
                name: "reference",
                apiName: "reference",
                type: "SubtenantLightThemeColorReference",
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
                returnType: "Promise<SubtenantLightThemeColor>",
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
                returnType: "Promise<SubtenantLightThemeColor>",
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
//# sourceMappingURL=subtenantLightThemeColorSchema.js.map
import { Schema } from "../../../schema/schema";
export const policySchema = () => {
    return Object.assign(new Schema(), {
        name: "Policy",
        fields: [
            {
                name: "action",
                apiName: "action",
                type: "string",
            },
            {
                name: "allow",
                apiName: "allow",
                type: "boolean",
            },
            {
                name: "feature",
                apiName: "feature",
                type: "string",
            },
            {
                name: "inherited",
                apiName: "inherited",
                type: "boolean",
            },
            {
                name: "inheritedFrom",
                apiName: "inherited_from",
                type: "string",
            },
            {
                name: "inheritedType",
                apiName: "inherited_type",
                type: "PolicyInheritedType",
            },
            {
                name: "resource",
                apiName: "resource",
                type: "string",
            },
        ],
    });
};
//# sourceMappingURL=policySchema.js.map
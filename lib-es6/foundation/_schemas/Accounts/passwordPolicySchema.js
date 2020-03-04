import { Schema } from "../../../schema/schema";
export const passwordPolicySchema = () => {
    return Object.assign(new Schema(), {
        name: "PasswordPolicy",
        fields: [
            {
                name: "minimumLength",
                apiName: "minimum_length",
                type: "number",
            },
        ],
    });
};
//# sourceMappingURL=passwordPolicySchema.js.map
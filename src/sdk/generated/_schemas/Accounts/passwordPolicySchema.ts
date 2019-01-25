import { Schema } from "../../../schema/schema";

export const passwordPolicySchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "PasswordPolicy",

        fields: [
            {
                name: "minimumLength",
                apiName: "minimum_length",
                type: "string",
            },
        ],
    });
};

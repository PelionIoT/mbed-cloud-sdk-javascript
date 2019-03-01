import { Schema } from "../../../schema/schema";

export const loginProfileSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "LoginProfile",
        fields: [
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
        ],
    });
};

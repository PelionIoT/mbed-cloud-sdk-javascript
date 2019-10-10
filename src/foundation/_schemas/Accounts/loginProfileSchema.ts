import { Schema } from "../../../schema/schema";

export const loginProfileSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "LoginProfile",
        fields: [
            {
                name: "loginProfileType",
                apiName: "type",
                type: "LoginProfileType",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
        ],
    });
};

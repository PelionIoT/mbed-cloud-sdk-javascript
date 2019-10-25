import { Schema } from "../../../schema/schema";
export const parentAccountSchema = () => {
    return Object.assign(new Schema(), {
        name: "ParentAccount",
        fields: [
            {
                name: "adminEmail",
                apiName: "admin_email",
                type: "string",
            },
            {
                name: "adminName",
                apiName: "admin_name",
                type: "string",
            },
        ],
    });
};
//# sourceMappingURL=parentAccountSchema.js.map
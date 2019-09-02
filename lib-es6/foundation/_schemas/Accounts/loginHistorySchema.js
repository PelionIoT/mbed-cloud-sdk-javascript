import { Schema } from "../../../schema/schema";
export const loginHistorySchema = () => {
    return Object.assign(new Schema(), {
        name: "LoginHistory",
        fields: [
            {
                name: "date",
                apiName: "date",
                type: "Date",
            },
            {
                name: "ipAddress",
                apiName: "ip_address",
                type: "string",
            },
            {
                name: "success",
                apiName: "success",
                type: "boolean",
            },
            {
                name: "userAgent",
                apiName: "user_agent",
                type: "string",
            },
        ],
    });
};
//# sourceMappingURL=loginHistorySchema.js.map
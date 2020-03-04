"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.loginHistorySchema = function () {
    return Object.assign(new schema_1.Schema(), {
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
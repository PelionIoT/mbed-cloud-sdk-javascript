"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.activeSessionSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "ActiveSession",
        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },
            {
                name: "ipAddress",
                apiName: "ip_address",
                type: "string",
            },
            {
                name: "loginTime",
                apiName: "login_time",
                type: "Date",
            },
            {
                name: "referenceToken",
                apiName: "reference_token",
                type: "string",
            },
            {
                name: "userAgent",
                apiName: "user_agent",
                type: "string",
            },
        ],
    });
};
//# sourceMappingURL=activeSessionSchema.js.map
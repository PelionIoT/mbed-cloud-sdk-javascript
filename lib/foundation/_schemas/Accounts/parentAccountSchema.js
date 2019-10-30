"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.parentAccountSchema = function () {
    return Object.assign(new schema_1.Schema(), {
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
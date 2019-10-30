"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.passwordPolicySchema = function () {
    return Object.assign(new schema_1.Schema(), {
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
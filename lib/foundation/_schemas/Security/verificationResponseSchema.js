"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.verificationResponseSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "VerificationResponse",
        fields: [
            {
                name: "message",
                apiName: "message",
                type: "string",
            },
            {
                name: "successful",
                apiName: "successful",
                type: "boolean",
            },
        ],
    });
};
//# sourceMappingURL=verificationResponseSchema.js.map
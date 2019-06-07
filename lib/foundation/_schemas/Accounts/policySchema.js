"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.policySchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "Policy",
        fields: [
            {
                name: "action",
                apiName: "action",
                type: "string",
            },
            {
                name: "allow",
                apiName: "allow",
                type: "boolean",
            },
            {
                name: "feature",
                apiName: "feature",
                type: "string",
            },
            {
                name: "inherited",
                apiName: "inherited",
                type: "boolean",
            },
            {
                name: "resource",
                apiName: "resource",
                type: "string",
            },
        ],
    });
};
//# sourceMappingURL=policySchema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.loginProfileSchema = function () {
    return Object.assign(new schema_1.Schema(), {
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
//# sourceMappingURL=loginProfileSchema.js.map
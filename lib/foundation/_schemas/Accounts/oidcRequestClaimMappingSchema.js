"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.oidcRequestClaimMappingSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "OidcRequestClaimMapping",
        fields: [
            {
                name: "email",
                apiName: "email",
                type: "string",
            },
            {
                name: "emailVerified",
                apiName: "email_verified",
                type: "string",
            },
            {
                name: "familyName",
                apiName: "family_name",
                type: "string",
            },
            {
                name: "givenName",
                apiName: "given_name",
                type: "string",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
            {
                name: "phoneNumber",
                apiName: "phone_number",
                type: "string",
            },
            {
                name: "sub",
                apiName: "sub",
                type: "string",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "string",
            },
            {
                name: "updatedAtPattern",
                apiName: "updated_at_pattern",
                type: "string",
            },
        ],
    });
};
//# sourceMappingURL=oidcRequestClaimMappingSchema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.identityProviderPublicKeySchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "IdentityProviderPublicKey",
        fields: [
            {
                name: "key",
                apiName: "key",
                type: "string",
            },
            {
                name: "kid",
                apiName: "kid",
                type: "string",
            },
        ],
    });
};
//# sourceMappingURL=identityProviderPublicKeySchema.js.map
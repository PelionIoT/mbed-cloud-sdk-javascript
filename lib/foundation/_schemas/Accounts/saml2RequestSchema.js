"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.saml2RequestSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "Saml2Request",
        fields: [
            {
                name: "entityDescriptor",
                apiName: "entity_descriptor",
                type: "string",
            },
            {
                name: "idpEntityId",
                apiName: "idp_entity_id",
                type: "string",
            },
            {
                name: "idpX509Certs",
                apiName: "idp_x509_certs",
                type: "Array<string>",
            },
            {
                name: "sloEndpoint",
                apiName: "slo_endpoint",
                type: "string",
            },
            {
                name: "spEntityId",
                apiName: "sp_entity_id",
                type: "string",
            },
            {
                name: "ssoEndpoint",
                apiName: "sso_endpoint",
                type: "string",
            },
        ],
    });
};
//# sourceMappingURL=saml2RequestSchema.js.map
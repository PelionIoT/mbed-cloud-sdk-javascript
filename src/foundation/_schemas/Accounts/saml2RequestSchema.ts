import { Schema } from "../../../schema/schema";

export const saml2RequestSchema = (): Schema => {
    return Object.assign(new Schema(), {
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

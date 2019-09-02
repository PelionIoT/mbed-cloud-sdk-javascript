import { Schema } from "../../../schema/schema";

export const oidcRequestClaimMappingSchema = (): Schema => {
    return Object.assign(new Schema(), {
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

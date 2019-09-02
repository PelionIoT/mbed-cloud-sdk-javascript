import { Schema } from "../../../schema/schema";

export const oidcRequestSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "OidcRequest",
        fields: [
            {
                name: "authorizationEndpoint",
                apiName: "authorization_endpoint",
                type: "string",
            },
            {
                name: "autoEnrollment",
                apiName: "auto_enrollment",
                type: "boolean",
            },
            {
                name: "claimMapping",
                apiName: "claim_mapping",
                type: "OidcRequestClaimMapping",
            },
            {
                name: "clientId",
                apiName: "client_id",
                type: "string",
            },
            {
                name: "clientSecret",
                apiName: "client_secret",
                type: "string",
            },
            {
                name: "endSessionEndpoint",
                apiName: "end_session_endpoint",
                type: "string",
            },
            {
                name: "issuer",
                apiName: "issuer",
                type: "string",
            },
            {
                name: "jwksUri",
                apiName: "jwks_uri",
                type: "string",
            },
            {
                name: "keys",
                apiName: "keys",
                type: "Array<IdentityProviderPublicKey>",
            },
            {
                name: "redirectUri",
                apiName: "redirect_uri",
                type: "string",
            },
            {
                name: "revocationEndpoint",
                apiName: "revocation_endpoint",
                type: "string",
            },
            {
                name: "scopes",
                apiName: "scopes",
                type: "string",
            },
            {
                name: "tokenEndpoint",
                apiName: "token_endpoint",
                type: "string",
            },
            {
                name: "tokenRequestMode",
                apiName: "token_request_mode",
                type: "OidcRequestTokenMode",
            },
            {
                name: "tokenResponsePath",
                apiName: "token_response_path",
                type: "string",
            },
            {
                name: "userinfoEndpoint",
                apiName: "userinfo_endpoint",
                type: "string",
            },
        ],
    });
};

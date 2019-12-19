import { Adapter } from "../../../common/adapter";
import { OidcRequest } from "./oidcRequest";
import { OidcRequestClaimMappingAdapter } from "../..";
import { IdentityProviderPublicKeyAdapter } from "../..";
/**
 *OidcRequest adapter
 */
export class OidcRequestAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): OidcRequest {
        if (!data) {
            return null;
        }
        let keys = [];
        if (data.keys) {
            keys = data.keys.map(i => IdentityProviderPublicKeyAdapter.fromApi(i));
        }
        const mappedEntity = OidcRequestAdapter.assignDefined(instance || {}, {
            _discriminator: "OIDC_REQUEST",
            authorizationEndpoint: data.authorization_endpoint,
            autoEnrollment: data.auto_enrollment,
            claimMapping: OidcRequestClaimMappingAdapter.fromApi(data.claim_mapping),
            clientId: data.client_id,
            clientSecret: data.client_secret,
            endSessionEndpoint: data.end_session_endpoint,
            issuer: data.issuer,
            jwksUri: data.jwks_uri,
            keys: keys,
            redirectUri: data.redirect_uri,
            revocationEndpoint: data.revocation_endpoint,
            scopes: data.scopes,
            tokenEndpoint: data.token_endpoint,
            tokenRequestMode: data.token_request_mode || "POST",
            tokenResponsePath: data.token_response_path,
            userinfoEndpoint: data.userinfo_endpoint,
        });
        return mappedEntity;
    }
}

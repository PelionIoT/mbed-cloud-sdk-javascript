import { Entity } from "../../../common/entity";
import { IdentityProviderPublicKey } from "../identityProviderPublicKey/identityProviderPublicKey";
import { OidcRequestClaimMapping } from "../oidcRequestClaimMapping/oidcRequestClaimMapping";
import { OidcRequestTokenMode } from "./types";
/**
 *OidcRequest
 */
export interface OidcRequest extends Entity {
    /**
     *URL of the OAuth 2.0 authorization endpoint.
     */
    readonly authorizationEndpoint?: string;

    /**
     *For future use.
     */
    readonly autoEnrollment?: boolean;

    /**
     *Mapping for non-standard OIDC claim names.
     */
    readonly claimMapping?: OidcRequestClaimMapping;

    /**
     *Client ID needed to authenticate and gain access to identity provider's API.
     */
    readonly clientId?: string;

    /**
     *Client secret needed to authenticate and gain access to identity provider's API.
     */
    readonly clientSecret?: string;

    /**
     *URL of the provider's end session endpoint.
     */
    readonly endSessionEndpoint?: string;

    /**
     *Issuer of the identity provider.
     */
    readonly issuer?: string;

    /**
     *URL of the provider's JSON web key set document.
     */
    readonly jwksUri?: string;

    /**
     *Represents provider's public key and key ID used to sign ID tokens. PEM-encoded.
     */
    readonly keys?: Array<IdentityProviderPublicKey>;

    /**
     *The URI needed to authenticate and gain access to identity provider's API. Leave this empty to use the default redirect URI.
     */
    readonly redirectUri?: string;

    /**
     *URL of the provider's token revocation endpoint.
     */
    readonly revocationEndpoint?: string;

    /**
     *Space-separated list of scopes sent in the authentication request. When not configured otherwise, the default scopes are ['openid profile email'](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims).
     *@example openid email
     */
    readonly scopes?: string;

    /**
     *URL of the OAuth 2.0 authorization endpoint.
     */
    readonly tokenEndpoint?: string;

    /**
     *One way to obtain the access token. Since the request results in the transmission of clear-text credentials, the client must use the POST mode.
     */
    readonly tokenRequestMode?: OidcRequestTokenMode;

    /**
     *Path to the standard data in the token response. Levels in the JSON structure must be separated by '.' (dot) characters.
     *@example oidc.data
     */
    readonly tokenResponsePath?: string;

    /**
     *URL of the OAuth 2.0 UserInfo endpoint.
     */
    readonly userinfoEndpoint?: string;
}

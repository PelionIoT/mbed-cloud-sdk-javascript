import { OidcRequest } from "../oidcRequest/oidcRequest";
export type IdentityProviderType = "NATIVE" | "MBED" | "SAML2" | "OIDC";
export type IdentityProviderStatus = "ACTIVE" | "SUSPENDED";
export type IdentityProviderAlgorithm =
    | "RSA2048"
    | "RSA3072"
    | "EC224"
    | "EC256"
    | "EC384"
    | "EC521"
    | "ECDSA224"
    | "ECDSA256"
    | "ECDSA384"
    | "ECDSA521";
/**
 *IdentityProviderCreateRequest
 */
export interface IdentityProviderCreateRequest {
    /**
     *Description for the identity provider.
     */
    readonly description?: string;

    /**
     *Identity provider type.
     */
    readonly identityProviderType: IdentityProviderType;

    /**
     *Name of the identity provider.
     */
    readonly name: string;

    /**
     *Represents OIDC specific attributes.
     */
    readonly oidcAttributes?: OidcRequest;

    /**
     *Represents SAML2 specific attributes in responses.
     */
    readonly saml2Attributes?: any;

    /**
     *Status of the identity provider.
     */
    readonly status?: IdentityProviderStatus;
}
/**
 *IdentityProviderGenerateServiceProviderCertificateRequest
 */
export interface IdentityProviderGenerateServiceProviderCertificateRequest {
    /**
     *The algorithm and its key size used for generating the certificate. Defaults to RSA2048.
     */
    readonly algorithm?: IdentityProviderAlgorithm;

    /**
     *Validity for the certificate in days.
     */
    readonly validity?: number;
}
/**
 *IdentityProviderUpdateRequest
 */
export interface IdentityProviderUpdateRequest {
    /**
     *Description for the identity provider.
     */
    readonly description?: string;

    /**
     *Identity provider type.
     */
    readonly identityProviderType: IdentityProviderType;

    /**
     *Name of the identity provider.
     */
    readonly name: string;

    /**
     *Represents OIDC specific attributes.
     */
    readonly oidcAttributes?: OidcRequest;

    /**
     *Represents SAML2 specific attributes in responses.
     */
    readonly saml2Attributes?: any;

    /**
     *Status of the identity provider.
     */
    readonly status?: IdentityProviderStatus;
}

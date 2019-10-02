import { OidcRequest } from "../oidcRequest/oidcRequest";
export type SubtenantIdentityProviderStatus = "ACTIVE" | "SUSPENDED";
export type SubtenantIdentityProviderAlgorithm =
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
 *SubtenantIdentityProviderCreateRequest
 */
export interface SubtenantIdentityProviderCreateRequest {
    /**
     *Description for the identity provider.
     */
    readonly description?: string;

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
    readonly status?: SubtenantIdentityProviderStatus;
}
/**
 *SubtenantIdentityProviderGenerateServiceProviderCertificateRequest
 */
export interface SubtenantIdentityProviderGenerateServiceProviderCertificateRequest {
    /**
     *The algorithm and its key size used for generating the certificate. Defaults to RSA2048.
     */
    readonly algorithm?: SubtenantIdentityProviderAlgorithm;

    /**
     *Validity for the certificate in days.
     */
    readonly validity?: number;
}
/**
 *SubtenantIdentityProviderUpdateRequest
 */
export interface SubtenantIdentityProviderUpdateRequest {
    /**
     *Description for the identity provider.
     */
    readonly description?: string;

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
    readonly status?: SubtenantIdentityProviderStatus;
}

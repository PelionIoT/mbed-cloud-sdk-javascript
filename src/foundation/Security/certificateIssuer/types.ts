export type CertificateIssuerType = "GLOBAL_SIGN" | "CFSSL_AUTH";
/**
 *CertificateIssuerCreateRequest
 */
export interface CertificateIssuerCreateRequest {
    /**
     *description
     */
    readonly description?: string;

    /**
     *issuerAttributes
     */
    readonly issuerAttributes?: { [key: string]: string };

    /**
     *issuerCredentials
     */
    readonly issuerCredentials?: { [key: string]: string };

    /**
     *issuerType
     */
    readonly issuerType: CertificateIssuerType;

    /**
     *name
     */
    readonly name?: string;
}
/**
 *CertificateIssuerUpdateRequest
 */
export interface CertificateIssuerUpdateRequest {
    /**
     *description
     */
    readonly description?: string;

    /**
     *issuerAttributes
     */
    readonly issuerAttributes?: { [key: string]: string };

    /**
     *issuerCredentials
     */
    readonly issuerCredentials?: { [key: string]: string };

    /**
     *name
     */
    readonly name?: string;
}

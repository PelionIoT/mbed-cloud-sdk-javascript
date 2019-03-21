import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *CertificateIssuerConfigCreateRequest
 */
export interface CertificateIssuerConfigCreateRequest {
    /**
*The ID of the certificate issuer.
Null if Device Management internal HSM is used.

*@example 01648415a2a30242ac18000500000000
*/
    readonly certificateIssuerId?: string;

    /**
     *The certificate name to which the certificate issuer configuration applies.
     *@example customer.dlms
     */
    readonly certificateReference: string;
}
/**
 *CertificateIssuerConfigUpdateRequest
 */
export interface CertificateIssuerConfigUpdateRequest {
    /**
*The ID of the certificate issuer.
Null if Device Management internal HSM is used.

*@example 01648415a2a30242ac18000500000000
*/
    readonly certificateIssuerId?: string;
}
/**
 *CertificateIssuerConfigCertificateReferenceFilter
 */
export interface CertificateIssuerConfigCertificateReferenceFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *CertificateIssuerConfigFilter
 */
export interface CertificateIssuerConfigFilter {
    /**
     *certificateReference
     */
    certificateReference?: string | CertificateIssuerConfigCertificateReferenceFilter;
}
/**
 *CertificateIssuerConfigListOptions
 */
export interface CertificateIssuerConfigListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: CertificateIssuerConfigFilter;
}

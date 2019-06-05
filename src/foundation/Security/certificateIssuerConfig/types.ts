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
    readonly reference: string;
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
 *CertificateIssuerConfigCertificateIssuerConfigReferenceFilter
 */
export interface CertificateIssuerConfigCertificateIssuerConfigReferenceFilter {
    /**
     *reference equal to
     */
    eq?: string;
}
/**
 *CertificateIssuerConfigCertificateIssuerConfigFilter
 */
export interface CertificateIssuerConfigCertificateIssuerConfigFilter {
    /**
     *Filter by reference on CertificateIssuerConfig
     */
    reference?: string | CertificateIssuerConfigCertificateIssuerConfigReferenceFilter;
}
/**
 *CertificateIssuerConfigCertificateIssuerConfigListOptions
 */
export interface CertificateIssuerConfigCertificateIssuerConfigListOptions extends ListOptions {
    /**
     *Filter for CertificateIssuerConfig
     */
    filter?: CertificateIssuerConfigCertificateIssuerConfigFilter;
}

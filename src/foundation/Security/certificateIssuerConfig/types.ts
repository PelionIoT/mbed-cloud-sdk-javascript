import { ListOptions } from "../../../common";
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
 *CertificateIssuerConfigReferenceFilter
 */
export interface CertificateIssuerConfigReferenceFilter {
    /**
     *reference equal to
     */
    eq?: string;
}
/**
 *CertificateIssuerConfigFilter
 */
export interface CertificateIssuerConfigFilter {
    /**
     *Filter by reference on CertificateIssuerConfig
     */
    reference?: string | CertificateIssuerConfigReferenceFilter;
}
/**
 *CertificateIssuerConfigListOptions
 */
export interface CertificateIssuerConfigListOptions extends ListOptions {
    /**
     *Filter for CertificateIssuerConfig
     */
    filter?: CertificateIssuerConfigFilter;
}

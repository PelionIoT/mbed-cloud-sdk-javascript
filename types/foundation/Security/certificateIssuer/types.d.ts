export declare type CertificateIssuerType = "GLOBAL_SIGN" | "CFSSL_AUTH";
/**
 *CertificateIssuerCreateRequest
 */
export interface CertificateIssuerCreateRequest {
    /**
     *General description for the certificate issuer.
     *@example GlobalSign sample issuer
     */
    readonly description?: string;
    /**
*General attributes for connecting the certificate issuer.
When the issuer_type is GLOBAL_SIGN, the value shall be empty.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAttributes.

*@example
*/
    readonly issuerAttributes?: {
        [key: string]: string;
    };
    /**
*The credentials required for connecting to the certificate issuer.
When the issuer_type is GLOBAL_SIGN, see definition of GlobalSignCredentials.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAuthCredentials.

*@example
*/
    readonly issuerCredentials: {
        [key: string]: string;
    };
    /**
*The type of the certificate issuer.
- GLOBAL_SIGN:
  Certificates are issued by GlobalSign service. The users must provide their own GlobalSign account credentials.
- CFSSL_AUTH:
  Certificates are issued by CFSSL authenticated signing service.
  The users must provide their own CFSSL host_url and credentials.

*@example GLOBAL_SIGN
*/
    readonly issuerType: CertificateIssuerType;
    /**
     *Certificate issuer name, unique per account.
     *@example GS Issuer
     */
    readonly name?: string;
}
/**
 *CertificateIssuerUpdateRequest
 */
export interface CertificateIssuerUpdateRequest {
    /**
     *General description for the certificate issuer.
     *@example GlobalSign sample issuer
     */
    readonly description?: string;
    /**
*General attributes for connecting the certificate issuer.
When the issuer_type is GLOBAL_SIGN, the value shall be empty.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAttributes.

*@example
*/
    readonly issuerAttributes?: {
        [key: string]: string;
    };
    /**
*The credentials required for connecting to the certificate issuer.
When the issuer_type is GLOBAL_SIGN, see definition of GlobalSignCredentials.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAuthCredentials.

*@example
*/
    readonly issuerCredentials?: {
        [key: string]: string;
    };
    /**
     *Certificate issuer name, unique per account.
     *@example GS Issuer
     */
    readonly name?: string;
}

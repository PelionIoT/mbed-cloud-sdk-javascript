export type CertificateIssuerType = "GLOBAL_SIGN" | "CFSSL_AUTH";
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
When the issuer_type is GLOBAL_SIGN, the value is empty.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAttributes.
*@example 
*/
    readonly issuerAttributes?: { [key: string]: string };

    /**
*The credentials required to connect to the certificate issuer.
When the issuer_type is GLOBAL_SIGN, see definition of GlobalSignCredentials.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAuthCredentials.
*@example 
*/
    readonly issuerCredentials: { [key: string]: string };

    /**
*Certificate issuer type.
- GLOBAL_SIGN:
  Certificates are issued by GlobalSign service. You must provide your own GlobalSign account credentials.
- CFSSL_AUTH:
  Certificates are issued by CFSSL authenticated signing service.
  You must provide your own CFSSL host_url and credentials.
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
When the issuer_type is GLOBAL_SIGN, the value is empty.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAttributes.
*@example 
*/
    readonly issuerAttributes?: { [key: string]: string };

    /**
*The credentials required to connect to the certificate issuer.
When the issuer_type is GLOBAL_SIGN, see definition of GlobalSignCredentials.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAuthCredentials.
*@example 
*/
    readonly issuerCredentials?: { [key: string]: string };

    /**
     *Certificate issuer name, unique per account.
     *@example GS Issuer
     */
    readonly name?: string;
}

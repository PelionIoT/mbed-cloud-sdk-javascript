import { Entity } from "../../../common/entity";
import { CertificateIssuerType } from "./types";
/**
 *CertificateIssuer
 */
export interface CertificateIssuer extends Entity {
    /**
     *Creation UTC time RFC3339.
     *@example 2017-01-01T00:00:00Z
     */
    readonly createdAt?: Date;
    /**
     *General description for the certificate issuer.
     *@example GlobalSign sample issuer
     */
    description?: string;
    /**
*General attributes for connecting the certificate issuer.
When the issuer_type is GLOBAL_SIGN, the value shall be empty.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAttributes.

*@example
*/
    issuerAttributes?: {
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
    issuerType: CertificateIssuerType;
    /**
     *Certificate issuer name, unique per account.
     *@example GS Issuer
     */
    name: string;
}

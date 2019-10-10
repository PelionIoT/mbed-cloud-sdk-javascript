import { Entity } from "../../../common/entity";
/**
 *CertificateIssuerConfig
 */
export interface CertificateIssuerConfig extends Entity {
    /**
*The ID of the certificate issuer.
Null if Device Management internal HSM is used.

*@example 01648415a2a30242ac18000500000000
*/
    certificateIssuerId: string;
    /**
     *Created UTC time RFC3339.
     *@example 2017-01-01T00:00:00Z
     */
    readonly createdAt?: Date;
    /**
     *The certificate name to which the certificate issuer configuration applies.
     *@example customer.dlms
     */
    reference: string;
    /**
     *Updated UTC time RFC3339.
     *@example 2017-02-01T00:00:00Z
     */
    readonly updatedAt?: Date;
}

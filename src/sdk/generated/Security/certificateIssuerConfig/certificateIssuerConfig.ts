import { Entity } from "../../../common/entity";
/**
 *CertificateIssuerConfig
 */
export interface CertificateIssuerConfig extends Entity {
    /**
     *certificateIssuerId
     */
    certificateIssuerId: string;

    /**
     *certificateReference
     */
    certificateReference: string;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;
}

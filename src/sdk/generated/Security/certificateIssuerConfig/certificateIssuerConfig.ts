import { Entity } from "../../../common/entity";
/**
 *CertificateIssuerConfig
 */
export interface CertificateIssuerConfig extends Entity {
    /**
     *certificateIssuerId
     */
    certificateIssuerId?: string;

    /**
     *certificateReference
     */
    certificateReference?: string;

    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *id
     */
    id?: string;

    /**
     *updatedAt
     */
    updatedAt?: Date;
}

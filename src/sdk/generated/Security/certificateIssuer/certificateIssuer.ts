import { Entity } from "../../../common/entity";
import { CertificateIssuerTypeEnum } from "./types";
/**
 *CertificateIssuer
 */
export interface CertificateIssuer extends Entity {
    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *description
     */
    description?: string;

    /**
     *id
     */
    id?: string;

    /**
     *issuerAttributes
     */
    issuerAttributes?: { [key: string]: string };

    /**
     *issuerType
     */
    issuerType?: CertificateIssuerTypeEnum;

    /**
     *name
     */
    name?: string;
}

import { Entity } from "../../../common/entity";
import { CertificateIssuerType } from "./types";
/**
 *CertificateIssuer
 */
export interface CertificateIssuer extends Entity {
    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *description
     */
    description?: string;

    /**
     *issuerAttributes
     */
    issuerAttributes?: { [key: string]: string };

    /**
     *issuerType
     */
    issuerType: CertificateIssuerType;

    /**
     *name
     */
    name: string;
}

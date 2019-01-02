import { CertificateIssuerIssuerTypeEnum } from "./types";
/**
 *CertificateIssuer
 */
export interface CertificateIssuer {
    /**
     *createdAt
     */
    createdAt: Date;

    /**
     *description
     */
    description: string;

    /**
     *id
     */
    id: string;

    /**
     *issuerAttributes
     */
    issuerAttributes: { [key: string]: string };

    /**
     *issuerType
     */
    issuerType: CertificateIssuerIssuerTypeEnum;

    /**
     *name
     */
    name: string;
}

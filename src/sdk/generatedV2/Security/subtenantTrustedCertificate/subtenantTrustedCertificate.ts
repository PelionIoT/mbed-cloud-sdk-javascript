import { SubtenantTrustedCertificateServiceEnum, SubtenantTrustedCertificateStatusEnum } from "./types";
/**
 *SubtenantTrustedCertificate
 */
export interface SubtenantTrustedCertificate {
    /**
     *accountId
     */
    accountId: string;

    /**
     *certificate
     */
    certificate: string;

    /**
     *certificateFingerprint
     */
    certificateFingerprint: string;

    /**
     *createdAt
     */
    createdAt: Date;

    /**
     *description
     */
    description: string;

    /**
     *deviceExecutionMode
     */
    deviceExecutionMode: number;

    /**
     *enrollmentMode
     */
    enrollmentMode: boolean;

    /**
     *id
     */
    id: string;

    /**
     *isDeveloperCertificate
     */
    isDeveloperCertificate: boolean;

    /**
     *issuer
     */
    issuer: string;

    /**
     *name
     */
    name: string;

    /**
     *ownerId
     */
    ownerId: string;

    /**
     *service
     */
    service: SubtenantTrustedCertificateServiceEnum;

    /**
     *status
     */
    status: SubtenantTrustedCertificateStatusEnum;

    /**
     *subject
     */
    subject: string;

    /**
     *updatedAt
     */
    updatedAt: Date;

    /**
     *validity
     */
    validity: Date;
}

import { Entity } from "common/entity";
import { SubtenantTrustedCertificateServiceEnum, SubtenantTrustedCertificateStatusEnum } from "./types";
/**
 *SubtenantTrustedCertificate
 */
export interface SubtenantTrustedCertificate extends Entity {
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
    readonly certificateFingerprint?: string;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *description
     */
    description?: string;

    /**
     *deviceExecutionMode
     */
    deviceExecutionMode?: number;

    /**
     *enrollmentMode
     */
    enrollmentMode?: boolean;

    /**
     *isDeveloperCertificate
     */
    isDeveloperCertificate?: boolean;

    /**
     *issuer
     */
    readonly issuer?: string;

    /**
     *name
     */
    name: string;

    /**
     *ownerId
     */
    readonly ownerId?: string;

    /**
     *service
     */
    service: SubtenantTrustedCertificateServiceEnum;

    /**
     *status
     */
    status?: SubtenantTrustedCertificateStatusEnum;

    /**
     *subject
     */
    readonly subject?: string;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;

    /**
     *valid
     */
    readonly valid?: boolean;

    /**
     *validity
     */
    readonly validity?: Date;
}

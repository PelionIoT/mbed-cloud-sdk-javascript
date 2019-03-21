import { Entity } from "../../../common/entity";
import { SubtenantTrustedCertificateService, SubtenantTrustedCertificateStatus } from "./types";
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
    service: SubtenantTrustedCertificateService;

    /**
     *status
     */
    status?: SubtenantTrustedCertificateStatus;

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

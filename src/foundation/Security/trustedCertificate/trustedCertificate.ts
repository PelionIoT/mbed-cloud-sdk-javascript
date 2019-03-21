import { Entity } from "../../../common/entity";
import { TrustedCertificateService, TrustedCertificateStatus } from "./types";
/**
 *TrustedCertificate
 */
export interface TrustedCertificate extends Entity {
    /**
     *accountId
     */
    readonly accountId?: string;

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
    service: TrustedCertificateService;

    /**
     *status
     */
    status?: TrustedCertificateStatus;

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

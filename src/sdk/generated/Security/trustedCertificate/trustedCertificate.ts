import { Entity } from "../../../common/entity";
import { TrustedCertificateServiceEnum, TrustedCertificateStatusEnum } from "./types";
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
    service: TrustedCertificateServiceEnum;

    /**
     *status
     */
    status?: TrustedCertificateStatusEnum;

    /**
     *subject
     */
    readonly subject?: string;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;

    /**
     *validity
     */
    readonly validity?: Date;
}

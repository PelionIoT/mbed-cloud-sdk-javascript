import { Entity } from "../../../common/entity";
import { TrustedCertificateServiceEnum, TrustedCertificateStatusEnum } from "./types";
/**
 *TrustedCertificate
 */
export interface TrustedCertificate extends Entity {
    /**
     *accountId
     */
    accountId?: string;

    /**
     *certificate
     */
    certificate?: string;

    /**
     *certificateThumbprint
     */
    certificateThumbprint?: string;

    /**
     *createdAt
     */
    createdAt?: Date;

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
     *id
     */
    id?: string;

    /**
     *isDeveloperCertificate
     */
    isDeveloperCertificate?: boolean;

    /**
     *issuer
     */
    issuer?: string;

    /**
     *name
     */
    name?: string;

    /**
     *ownerId
     */
    ownerId?: string;

    /**
     *service
     */
    service?: TrustedCertificateServiceEnum;

    /**
     *status
     */
    status?: TrustedCertificateStatusEnum;

    /**
     *subject
     */
    subject?: string;

    /**
     *updatedAt
     */
    updatedAt?: Date;

    /**
     *validity
     */
    validity?: Date;
}

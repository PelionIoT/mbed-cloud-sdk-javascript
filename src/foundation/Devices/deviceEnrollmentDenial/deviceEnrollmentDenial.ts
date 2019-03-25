import { Entity } from "../../../common/entity";
/**
 *DeviceEnrollmentDenial
 */
export interface DeviceEnrollmentDenial extends Entity {
    /**
     *accountId
     */
    readonly accountId?: string;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *endpointName
     */
    readonly endpointName?: string;

    /**
     *trustedCertificateId
     */
    readonly trustedCertificateId?: string;
}

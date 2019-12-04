import { Entity } from "../../../common/entity";
/**
 *DeviceEnrollmentDenial
 */
export interface DeviceEnrollmentDenial extends Entity {
    /**
     *account id
     *@example 00005a4e027f0a580a01081c00000000
     */
    readonly accountId?: string;
    /**
     *date on which the failed bootstrap was attempted on
     *@example 2000-01-23T04:56:07.000+00:00
     */
    readonly createdAt?: Date;
    /**
     *endpoint name
     *@example Endpoint_1234
     */
    readonly endpointName?: string;
    /**
     *Trusted certificate id
     *@example 00005a4e027f0a580a01081c00000000
     */
    readonly trustedCertificateId?: string;
}

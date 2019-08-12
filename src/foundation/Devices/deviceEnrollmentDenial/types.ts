import { ListOptions } from "../../../common";
/**
 *DeviceEnrollmentDenialTrustedCertificateIdFilter
 */
export interface DeviceEnrollmentDenialTrustedCertificateIdFilter {
    /**
     *trustedCertificateId equal to
     */
    eq?: string;
}
/**
 *DeviceEnrollmentDenialEndpointNameFilter
 */
export interface DeviceEnrollmentDenialEndpointNameFilter {
    /**
     *endpointName equal to
     */
    eq?: string;
}
/**
 *DeviceEnrollmentDenialFilter
 */
export interface DeviceEnrollmentDenialFilter {
    /**
     *Filter by trustedCertificateId on DeviceEnrollmentDenial
     */
    trustedCertificateId?: string | DeviceEnrollmentDenialTrustedCertificateIdFilter;

    /**
     *Filter by endpointName on DeviceEnrollmentDenial
     */
    endpointName?: string | DeviceEnrollmentDenialEndpointNameFilter;
}
/**
 *DeviceEnrollmentDenialListOptions
 */
export interface DeviceEnrollmentDenialListOptions extends ListOptions {
    /**
     *Filter for DeviceEnrollmentDenial
     */
    filter?: DeviceEnrollmentDenialFilter;
}

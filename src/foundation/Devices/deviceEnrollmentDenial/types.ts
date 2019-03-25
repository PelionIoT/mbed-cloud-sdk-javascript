import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DeviceEnrollmentDenialTrustedCertificateIdFilter
 */
export interface DeviceEnrollmentDenialTrustedCertificateIdFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *DeviceEnrollmentDenialEndpointNameFilter
 */
export interface DeviceEnrollmentDenialEndpointNameFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *DeviceEnrollmentDenialFilter
 */
export interface DeviceEnrollmentDenialFilter {
    /**
     *trustedCertificateId
     */
    trustedCertificateId?: string | DeviceEnrollmentDenialTrustedCertificateIdFilter;

    /**
     *endpointName
     */
    endpointName?: string | DeviceEnrollmentDenialEndpointNameFilter;
}
/**
 *DeviceEnrollmentDenialListOptions
 */
export interface DeviceEnrollmentDenialListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: DeviceEnrollmentDenialFilter;
}

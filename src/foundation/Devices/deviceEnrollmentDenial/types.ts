import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DeviceEnrollmentDenialDeviceEnrollmentDenialTrustedCertificateIdFilter
 */
export interface DeviceEnrollmentDenialDeviceEnrollmentDenialTrustedCertificateIdFilter {
    /**
     *trustedCertificateId equal to
     */
    eq?: string;
}
/**
 *DeviceEnrollmentDenialDeviceEnrollmentDenialEndpointNameFilter
 */
export interface DeviceEnrollmentDenialDeviceEnrollmentDenialEndpointNameFilter {
    /**
     *endpointName equal to
     */
    eq?: string;
}
/**
 *DeviceEnrollmentDenialDeviceEnrollmentDenialFilter
 */
export interface DeviceEnrollmentDenialDeviceEnrollmentDenialFilter {
    /**
     *Filter by trustedCertificateId on DeviceEnrollmentDenial
     */
    trustedCertificateId?: string | DeviceEnrollmentDenialDeviceEnrollmentDenialTrustedCertificateIdFilter;

    /**
     *Filter by endpointName on DeviceEnrollmentDenial
     */
    endpointName?: string | DeviceEnrollmentDenialDeviceEnrollmentDenialEndpointNameFilter;
}
/**
 *DeviceEnrollmentDenialDeviceEnrollmentDenialListOptions
 */
export interface DeviceEnrollmentDenialDeviceEnrollmentDenialListOptions extends ListOptions {
    /**
     *Filter for DeviceEnrollmentDenial
     */
    filter?: DeviceEnrollmentDenialDeviceEnrollmentDenialFilter;
}

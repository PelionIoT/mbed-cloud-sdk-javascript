import { ListOptions } from "../../../legacy/common/interfaces";
export type DeviceDeployedState = "development" | "production";
export type DeviceExecutionMode = "0" | "1" | "5";
export type DeviceLifecycleStatus = "enabled" | "blocked";
export type DeviceMechanism = "connector" | "direct";
export type DeviceState = "unenrolled" | "cloud_enrolling" | "bootstrapped" | "registered" | "deregistered";
/**
 *DeviceCreateRequest
 */
export interface DeviceCreateRequest {
    /**
     *DEPRECATED: Mark this device for automatic firmware update.
     */
    readonly autoUpdate?: boolean;

    /**
     *The expiration date of the certificate used to connect to bootstrap server.
     */
    readonly bootstrapExpirationDate?: Date;

    /**
     *The timestamp of the device&#39;s most recent bootstrap process.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly bootstrappedTimestamp?: Date;

    /**
     *The certificate issuer&#39;s ID.
     *@example 00000000000000000000000000000000
     */
    readonly caId?: string;

    /**
     *The expiration date of the certificate used to connect to LwM2M server.
     */
    readonly connectorExpirationDate?: Date;

    /**
     *Up to five custom key-value attributes. Note that keys cannot begin with a number. Both keys and values are limited to 128 characters. Updating this field replaces existing contents.
     *@example [object Object]
     */
    readonly customAttributes?: { [key: string]: string };

    /**
     *DEPRECATED: The last deployment used on the device.
     */
    readonly deployment?: string;

    /**
     *The description of the device.
     *@example description
     */
    readonly description?: string;

    /**
     *An ID representing the model and hardware revision of the device.
     */
    readonly deviceClass?: string;

    /**
*The execution mode from the certificate of the device. Defaults to inheriting from host_gateway device.
Permitted values:
  - 0 - unspecified execution mode (default if host_gateway invalid or not set)
  - 1 - development devices
  - 5 - production devices
*/
    readonly deviceExecutionMode?: number;

    /**
     *The fingerprint of the device certificate.
     *@example 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
     */
    readonly deviceKey?: string;

    /**
     *The endpoint name given to the device.
     *@example 00000000-0000-0000-0000-000000000000
     */
    readonly endpointName?: string;

    /**
     *The endpoint type of the device. For example, the device is a gateway.
     */
    readonly endpointType?: string;

    /**
     *The SHA256 checksum of the current firmware image.
     *@example 0000000000000000000000000000000000000000000000000000000000000000
     */
    readonly firmwareChecksum?: string;

    /**
     *The `endpoint_name` of the host gateway, if appropriate.
     */
    readonly hostGateway?: string;

    /**
     *SHA256 fingerprint of the certificate used to validate the signature of the device certificate.
     *@example C42EDEFC75871E4CE2146FCDA67D03DDA05CC26FDF93B17B55F42C1EADFDC322
     */
    readonly issuerFingerprint?: string;

    /**
     *DEPRECATED: The URL for the current device manifest.
     */
    readonly manifest?: string;

    /**
     *The ID of the channel used to communicate with the device.
     */
    readonly mechanism?: DeviceMechanism;

    /**
     *The address of the connector to use.
     */
    readonly mechanismUrl?: string;

    /**
     *The name of the device.
     *@example 00000000-0000-0000-0000-000000000000
     */
    readonly name?: string;

    /**
     *The serial number of the device.
     *@example 00000000-0000-0000-0000-000000000000
     */
    readonly serialNumber?: string;

    /**
     *The current state of the device.
     */
    readonly state?: DeviceState;

    /**
     *The device vendor ID.
     *@example 00000000-0000-0000-0000-000000000000
     */
    readonly vendorId?: string;
}
/**
 *DeviceUpdateRequest
 */
export interface DeviceUpdateRequest {
    /**
     *DEPRECATED: Mark this device for automatic firmware update.
     */
    readonly autoUpdate?: boolean;

    /**
     *The certificate issuer&#39;s ID.
     *@example 00000000000000000000000000000000
     */
    readonly caId?: string;

    /**
     *Up to five custom key-value attributes. Note that keys cannot begin with a number. Both keys and values are limited to 128 characters. Updating this field replaces existing contents.
     *@example [object Object]
     */
    readonly customAttributes?: { [key: string]: string };

    /**
     *The description of the device.
     *@example description
     */
    readonly description?: string;

    /**
     *The fingerprint of the device certificate.
     *@example 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
     */
    readonly deviceKey?: string;

    /**
     *The endpoint name given to the device.
     *@example 00000000-0000-0000-0000-000000000000
     */
    readonly endpointName?: string;

    /**
     *The endpoint type of the device. For example, the device is a gateway.
     */
    readonly endpointType?: string;

    /**
     *The `endpoint_name` of the host gateway, if appropriate.
     */
    readonly hostGateway?: string;

    /**
     *The name of the device.
     *@example 00000000-0000-0000-0000-000000000000
     */
    readonly name?: string;
}
/**
 *DeviceAccountIdFilter
 */
export interface DeviceAccountIdFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceAutoUpdateFilter
 */
export interface DeviceAutoUpdateFilter {
    /**
     *eq
     */
    eq?: boolean;

    /**
     *neq
     */
    neq?: boolean;

    /**
     *in
     */
    in?: Array<boolean>;

    /**
     *nin
     */
    nin?: Array<boolean>;
}
/**
 *DeviceBootstrappedExpirationDateFilter
 */
export interface DeviceBootstrappedExpirationDateFilter {
    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;

    /**
     *lte
     */
    lte?: Array<string>;

    /**
     *gte
     */
    gte?: Array<string>;
}
/**
 *DeviceBootstrappedTimestampFilter
 */
export interface DeviceBootstrappedTimestampFilter {
    /**
     *in
     */
    in?: Array<Date>;

    /**
     *nin
     */
    nin?: Array<Date>;

    /**
     *lte
     */
    lte?: Array<Date>;

    /**
     *gte
     */
    gte?: Array<Date>;
}
/**
 *DeviceCaIdFilter
 */
export interface DeviceCaIdFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceConnectorExpirationDateFilter
 */
export interface DeviceConnectorExpirationDateFilter {
    /**
     *in
     */
    in?: Array<Date>;

    /**
     *nin
     */
    nin?: Array<Date>;

    /**
     *lte
     */
    lte?: Array<Date>;

    /**
     *gte
     */
    gte?: Array<Date>;
}
/**
 *DeviceCreatedAtFilter
 */
export interface DeviceCreatedAtFilter {
    /**
     *in
     */
    in?: Array<Date>;

    /**
     *nin
     */
    nin?: Array<Date>;

    /**
     *lte
     */
    lte?: Array<Date>;

    /**
     *gte
     */
    gte?: Array<Date>;
}
/**
 *DeviceCustomAttributesFilter
 */
export interface DeviceCustomAttributesFilter {
    /**
     *eq
     */
    eq?: { [key: string]: string };

    /**
     *neq
     */
    neq?: { [key: string]: string };
}
/**
 *DeviceDeployedStateFilter
 */
export interface DeviceDeployedStateFilter {
    /**
     *eq
     */
    eq?: DeviceDeployedState;

    /**
     *neq
     */
    neq?: DeviceDeployedState;

    /**
     *in
     */
    in?: Array<DeviceDeployedState>;

    /**
     *nin
     */
    nin?: Array<DeviceDeployedState>;
}
/**
 *DeviceDeploymentFilter
 */
export interface DeviceDeploymentFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceDescriptionFilter
 */
export interface DeviceDescriptionFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceDeviceClassFilter
 */
export interface DeviceDeviceClassFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceDeviceExecutionModeFilter
 */
export interface DeviceDeviceExecutionModeFilter {
    /**
     *eq
     */
    eq?: number;

    /**
     *neq
     */
    neq?: number;

    /**
     *in
     */
    in?: Array<number>;

    /**
     *nin
     */
    nin?: Array<number>;
}
/**
 *DeviceDeviceKeyFilter
 */
export interface DeviceDeviceKeyFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceEndpointNameFilter
 */
export interface DeviceEndpointNameFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceEndpointTypeFilter
 */
export interface DeviceEndpointTypeFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceEnrollmentListTimestampFilter
 */
export interface DeviceEnrollmentListTimestampFilter {
    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;

    /**
     *lte
     */
    lte?: Array<string>;

    /**
     *gte
     */
    gte?: Array<string>;
}
/**
 *DeviceFirmwareChecksumFilter
 */
export interface DeviceFirmwareChecksumFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceHostGatewayFilter
 */
export interface DeviceHostGatewayFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceIdFilter
 */
export interface DeviceIdFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceManifestFilter
 */
export interface DeviceManifestFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceManifestTimestampFilter
 */
export interface DeviceManifestTimestampFilter {
    /**
     *in
     */
    in?: Array<Date>;

    /**
     *nin
     */
    nin?: Array<Date>;

    /**
     *lte
     */
    lte?: Array<Date>;

    /**
     *gte
     */
    gte?: Array<Date>;
}
/**
 *DeviceMechanismFilter
 */
export interface DeviceMechanismFilter {
    /**
     *eq
     */
    eq?: DeviceMechanism;

    /**
     *neq
     */
    neq?: DeviceMechanism;

    /**
     *in
     */
    in?: Array<DeviceMechanism>;

    /**
     *nin
     */
    nin?: Array<DeviceMechanism>;
}
/**
 *DeviceMechanismUrlFilter
 */
export interface DeviceMechanismUrlFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceNameFilter
 */
export interface DeviceNameFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceSerialNumberFilter
 */
export interface DeviceSerialNumberFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceStateFilter
 */
export interface DeviceStateFilter {
    /**
     *eq
     */
    eq?: DeviceState;

    /**
     *neq
     */
    neq?: DeviceState;

    /**
     *in
     */
    in?: Array<DeviceState>;

    /**
     *nin
     */
    nin?: Array<DeviceState>;
}
/**
 *DeviceUpdatedAtFilter
 */
export interface DeviceUpdatedAtFilter {
    /**
     *in
     */
    in?: Array<Date>;

    /**
     *nin
     */
    nin?: Array<Date>;

    /**
     *lte
     */
    lte?: Array<Date>;

    /**
     *gte
     */
    gte?: Array<Date>;
}
/**
 *DeviceVendorIdFilter
 */
export interface DeviceVendorIdFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceFilter
 */
export interface DeviceFilter {
    /**
     *accountId
     */
    accountId?: string | DeviceAccountIdFilter;

    /**
     *autoUpdate
     */
    autoUpdate?: boolean | DeviceAutoUpdateFilter;

    /**
     *bootstrappedExpirationDate
     */
    bootstrappedExpirationDate?: DeviceBootstrappedExpirationDateFilter;

    /**
     *bootstrappedTimestamp
     */
    bootstrappedTimestamp?: DeviceBootstrappedTimestampFilter;

    /**
     *caId
     */
    caId?: string | DeviceCaIdFilter;

    /**
     *connectorExpirationDate
     */
    connectorExpirationDate?: DeviceConnectorExpirationDateFilter;

    /**
     *createdAt
     */
    createdAt?: DeviceCreatedAtFilter;

    /**
     *customAttributes
     */
    customAttributes?: { [key: string]: string } | DeviceCustomAttributesFilter;

    /**
     *deployedState
     */
    deployedState?: DeviceDeployedState | DeviceDeployedStateFilter;

    /**
     *deployment
     */
    deployment?: string | DeviceDeploymentFilter;

    /**
     *description
     */
    description?: string | DeviceDescriptionFilter;

    /**
     *deviceClass
     */
    deviceClass?: string | DeviceDeviceClassFilter;

    /**
     *deviceExecutionMode
     */
    deviceExecutionMode?: number | DeviceDeviceExecutionModeFilter;

    /**
     *deviceKey
     */
    deviceKey?: string | DeviceDeviceKeyFilter;

    /**
     *endpointName
     */
    endpointName?: string | DeviceEndpointNameFilter;

    /**
     *endpointType
     */
    endpointType?: string | DeviceEndpointTypeFilter;

    /**
     *enrollmentListTimestamp
     */
    enrollmentListTimestamp?: DeviceEnrollmentListTimestampFilter;

    /**
     *firmwareChecksum
     */
    firmwareChecksum?: string | DeviceFirmwareChecksumFilter;

    /**
     *hostGateway
     */
    hostGateway?: string | DeviceHostGatewayFilter;

    /**
     *id
     */
    id?: string | DeviceIdFilter;

    /**
     *manifest
     */
    manifest?: string | DeviceManifestFilter;

    /**
     *manifestTimestamp
     */
    manifestTimestamp?: DeviceManifestTimestampFilter;

    /**
     *mechanism
     */
    mechanism?: DeviceMechanism | DeviceMechanismFilter;

    /**
     *mechanismUrl
     */
    mechanismUrl?: string | DeviceMechanismUrlFilter;

    /**
     *name
     */
    name?: string | DeviceNameFilter;

    /**
     *serialNumber
     */
    serialNumber?: string | DeviceSerialNumberFilter;

    /**
     *state
     */
    state?: DeviceState | DeviceStateFilter;

    /**
     *updatedAt
     */
    updatedAt?: DeviceUpdatedAtFilter;

    /**
     *vendorId
     */
    vendorId?: string | DeviceVendorIdFilter;
}
/**
 *DeviceListOptions
 */
export interface DeviceListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: DeviceFilter;
}

import { ListOptions } from "../../../legacy/common/interfaces";
export declare type DeviceDeployedState = "development" | "production";
export declare type DeviceExecutionMode = "0" | "1" | "5";
export declare type DeviceMechanism = "connector" | "direct";
export declare type DeviceState = "unenrolled" | "cloud_enrolling" | "bootstrapped" | "registered" | "deregistered";
/**
 *DeviceAddToGroupRequest
 */
export interface DeviceAddToGroupRequest {
    /**
     *deviceId
     *@example 00000000000000000000000000000000
     */
    readonly deviceId: string;
}
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
     *The certificate issuer's ID.
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
    readonly customAttributes?: {
        [key: string]: string;
    };
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
     *The ID of the host gateway, if appropriate.
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
 *DeviceRemoveFromGroupRequest
 */
export interface DeviceRemoveFromGroupRequest {
    /**
     *deviceId
     *@example 00000000000000000000000000000000
     */
    readonly deviceId: string;
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
     *The certificate issuer's ID.
     *@example 00000000000000000000000000000000
     */
    readonly caId?: string;
    /**
     *Up to five custom key-value attributes. Note that keys cannot begin with a number. Both keys and values are limited to 128 characters. Updating this field replaces existing contents.
     *@example [object Object]
     */
    readonly customAttributes?: {
        [key: string]: string;
    };
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
     *The ID of the host gateway, if appropriate.
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
     *accountId equal to
     */
    eq?: string;
    /**
     *accountId not equal to
     */
    neq?: string;
    /**
     *accountId in
     */
    in?: Array<string>;
    /**
     *accountId not in
     */
    nin?: Array<string>;
}
/**
 *DeviceAutoUpdateFilter
 */
export interface DeviceAutoUpdateFilter {
    /**
     *autoUpdate equal to
     */
    eq?: boolean;
    /**
     *autoUpdate not equal to
     */
    neq?: boolean;
}
/**
 *DeviceBootstrapExpirationDateFilter
 */
export interface DeviceBootstrapExpirationDateFilter {
    /**
     *bootstrapExpirationDate in
     */
    in?: Array<Date>;
    /**
     *bootstrapExpirationDate not in
     */
    nin?: Array<Date>;
    /**
     *bootstrapExpirationDate less than
     */
    lte?: Array<Date>;
    /**
     *bootstrapExpirationDate greater than
     */
    gte?: Array<Date>;
}
/**
 *DeviceBootstrappedTimestampFilter
 */
export interface DeviceBootstrappedTimestampFilter {
    /**
     *bootstrappedTimestamp in
     */
    in?: Array<Date>;
    /**
     *bootstrappedTimestamp not in
     */
    nin?: Array<Date>;
    /**
     *bootstrappedTimestamp less than
     */
    lte?: Array<Date>;
    /**
     *bootstrappedTimestamp greater than
     */
    gte?: Array<Date>;
}
/**
 *DeviceCaIdFilter
 */
export interface DeviceCaIdFilter {
    /**
     *caId equal to
     */
    eq?: string;
    /**
     *caId not equal to
     */
    neq?: string;
    /**
     *caId in
     */
    in?: Array<string>;
    /**
     *caId not in
     */
    nin?: Array<string>;
}
/**
 *DeviceConnectorExpirationDateFilter
 */
export interface DeviceConnectorExpirationDateFilter {
    /**
     *connectorExpirationDate in
     */
    in?: Array<Date>;
    /**
     *connectorExpirationDate not in
     */
    nin?: Array<Date>;
    /**
     *connectorExpirationDate less than
     */
    lte?: Array<Date>;
    /**
     *connectorExpirationDate greater than
     */
    gte?: Array<Date>;
}
/**
 *DeviceCreatedAtFilter
 */
export interface DeviceCreatedAtFilter {
    /**
     *createdAt in
     */
    in?: Array<Date>;
    /**
     *createdAt not in
     */
    nin?: Array<Date>;
    /**
     *createdAt less than
     */
    lte?: Array<Date>;
    /**
     *createdAt greater than
     */
    gte?: Array<Date>;
}
/**
 *DeviceDeployedStateFilter
 */
export interface DeviceDeployedStateFilter {
    /**
     *deployedState equal to
     */
    eq?: DeviceDeployedState;
    /**
     *deployedState not equal to
     */
    neq?: DeviceDeployedState;
    /**
     *deployedState in
     */
    in?: Array<DeviceDeployedState>;
    /**
     *deployedState not in
     */
    nin?: Array<DeviceDeployedState>;
}
/**
 *DeviceDeploymentFilter
 */
export interface DeviceDeploymentFilter {
    /**
     *deployment equal to
     */
    eq?: string;
    /**
     *deployment not equal to
     */
    neq?: string;
    /**
     *deployment in
     */
    in?: Array<string>;
    /**
     *deployment not in
     */
    nin?: Array<string>;
}
/**
 *DeviceDescriptionFilter
 */
export interface DeviceDescriptionFilter {
    /**
     *description equal to
     */
    eq?: string;
    /**
     *description not equal to
     */
    neq?: string;
    /**
     *description in
     */
    in?: Array<string>;
    /**
     *description not in
     */
    nin?: Array<string>;
}
/**
 *DeviceDeviceClassFilter
 */
export interface DeviceDeviceClassFilter {
    /**
     *deviceClass equal to
     */
    eq?: string;
    /**
     *deviceClass not equal to
     */
    neq?: string;
    /**
     *deviceClass in
     */
    in?: Array<string>;
    /**
     *deviceClass not in
     */
    nin?: Array<string>;
}
/**
 *DeviceDeviceExecutionModeFilter
 */
export interface DeviceDeviceExecutionModeFilter {
    /**
     *deviceExecutionMode equal to
     */
    eq?: number;
    /**
     *deviceExecutionMode not equal to
     */
    neq?: number;
    /**
     *deviceExecutionMode in
     */
    in?: Array<number>;
    /**
     *deviceExecutionMode not in
     */
    nin?: Array<number>;
}
/**
 *DeviceDeviceKeyFilter
 */
export interface DeviceDeviceKeyFilter {
    /**
     *deviceKey equal to
     */
    eq?: string;
    /**
     *deviceKey not equal to
     */
    neq?: string;
    /**
     *deviceKey in
     */
    in?: Array<string>;
    /**
     *deviceKey not in
     */
    nin?: Array<string>;
}
/**
 *DeviceEndpointNameFilter
 */
export interface DeviceEndpointNameFilter {
    /**
     *endpointName equal to
     */
    eq?: string;
    /**
     *endpointName not equal to
     */
    neq?: string;
    /**
     *endpointName in
     */
    in?: Array<string>;
    /**
     *endpointName not in
     */
    nin?: Array<string>;
}
/**
 *DeviceEndpointTypeFilter
 */
export interface DeviceEndpointTypeFilter {
    /**
     *endpointType equal to
     */
    eq?: string;
    /**
     *endpointType not equal to
     */
    neq?: string;
    /**
     *endpointType in
     */
    in?: Array<string>;
    /**
     *endpointType not in
     */
    nin?: Array<string>;
}
/**
 *DeviceEnrolmentListTimestampFilter
 */
export interface DeviceEnrolmentListTimestampFilter {
    /**
     *enrolmentListTimestamp in
     */
    in?: Array<Date>;
    /**
     *enrolmentListTimestamp not in
     */
    nin?: Array<Date>;
    /**
     *enrolmentListTimestamp less than
     */
    lte?: Array<Date>;
    /**
     *enrolmentListTimestamp greater than
     */
    gte?: Array<Date>;
}
/**
 *DeviceFirmwareChecksumFilter
 */
export interface DeviceFirmwareChecksumFilter {
    /**
     *firmwareChecksum equal to
     */
    eq?: string;
    /**
     *firmwareChecksum not equal to
     */
    neq?: string;
    /**
     *firmwareChecksum in
     */
    in?: Array<string>;
    /**
     *firmwareChecksum not in
     */
    nin?: Array<string>;
}
/**
 *DeviceHostGatewayFilter
 */
export interface DeviceHostGatewayFilter {
    /**
     *hostGateway equal to
     */
    eq?: string;
    /**
     *hostGateway not equal to
     */
    neq?: string;
    /**
     *hostGateway in
     */
    in?: Array<string>;
    /**
     *hostGateway not in
     */
    nin?: Array<string>;
}
/**
 *DeviceIdFilter
 */
export interface DeviceIdFilter {
    /**
     *id equal to
     */
    eq?: string;
    /**
     *id not equal to
     */
    neq?: string;
    /**
     *id in
     */
    in?: Array<string>;
    /**
     *id not in
     */
    nin?: Array<string>;
}
/**
 *DeviceManifestFilter
 */
export interface DeviceManifestFilter {
    /**
     *manifest equal to
     */
    eq?: string;
    /**
     *manifest not equal to
     */
    neq?: string;
    /**
     *manifest in
     */
    in?: Array<string>;
    /**
     *manifest not in
     */
    nin?: Array<string>;
}
/**
 *DeviceManifestTimestampFilter
 */
export interface DeviceManifestTimestampFilter {
    /**
     *manifestTimestamp in
     */
    in?: Array<Date>;
    /**
     *manifestTimestamp not in
     */
    nin?: Array<Date>;
    /**
     *manifestTimestamp less than
     */
    lte?: Array<Date>;
    /**
     *manifestTimestamp greater than
     */
    gte?: Array<Date>;
}
/**
 *DeviceMechanismFilter
 */
export interface DeviceMechanismFilter {
    /**
     *mechanism equal to
     */
    eq?: DeviceMechanism;
    /**
     *mechanism not equal to
     */
    neq?: DeviceMechanism;
    /**
     *mechanism in
     */
    in?: Array<DeviceMechanism>;
    /**
     *mechanism not in
     */
    nin?: Array<DeviceMechanism>;
}
/**
 *DeviceMechanismUrlFilter
 */
export interface DeviceMechanismUrlFilter {
    /**
     *mechanismUrl equal to
     */
    eq?: string;
    /**
     *mechanismUrl not equal to
     */
    neq?: string;
    /**
     *mechanismUrl in
     */
    in?: Array<string>;
    /**
     *mechanismUrl not in
     */
    nin?: Array<string>;
}
/**
 *DeviceNameFilter
 */
export interface DeviceNameFilter {
    /**
     *name equal to
     */
    eq?: string;
    /**
     *name not equal to
     */
    neq?: string;
    /**
     *name in
     */
    in?: Array<string>;
    /**
     *name not in
     */
    nin?: Array<string>;
}
/**
 *DeviceSerialNumberFilter
 */
export interface DeviceSerialNumberFilter {
    /**
     *serialNumber equal to
     */
    eq?: string;
    /**
     *serialNumber not equal to
     */
    neq?: string;
    /**
     *serialNumber in
     */
    in?: Array<string>;
    /**
     *serialNumber not in
     */
    nin?: Array<string>;
}
/**
 *DeviceStateFilter
 */
export interface DeviceStateFilter {
    /**
     *state equal to
     */
    eq?: DeviceState;
    /**
     *state not equal to
     */
    neq?: DeviceState;
    /**
     *state in
     */
    in?: Array<DeviceState>;
    /**
     *state not in
     */
    nin?: Array<DeviceState>;
}
/**
 *DeviceUpdatedAtFilter
 */
export interface DeviceUpdatedAtFilter {
    /**
     *updatedAt in
     */
    in?: Array<Date>;
    /**
     *updatedAt not in
     */
    nin?: Array<Date>;
    /**
     *updatedAt less than
     */
    lte?: Array<Date>;
    /**
     *updatedAt greater than
     */
    gte?: Array<Date>;
}
/**
 *DeviceVendorIdFilter
 */
export interface DeviceVendorIdFilter {
    /**
     *vendorId equal to
     */
    eq?: string;
    /**
     *vendorId not equal to
     */
    neq?: string;
    /**
     *vendorId in
     */
    in?: Array<string>;
    /**
     *vendorId not in
     */
    nin?: Array<string>;
}
/**
 *DeviceFilter
 */
export interface DeviceFilter {
    /**
     *Filter by accountId on Device
     */
    accountId?: string | DeviceAccountIdFilter;
    /**
     *Filter by autoUpdate on Device
     */
    autoUpdate?: boolean | DeviceAutoUpdateFilter;
    /**
     *Filter by bootstrapExpirationDate on Device
     */
    bootstrapExpirationDate?: DeviceBootstrapExpirationDateFilter;
    /**
     *Filter by bootstrappedTimestamp on Device
     */
    bootstrappedTimestamp?: DeviceBootstrappedTimestampFilter;
    /**
     *Filter by caId on Device
     */
    caId?: string | DeviceCaIdFilter;
    /**
     *Filter by connectorExpirationDate on Device
     */
    connectorExpirationDate?: DeviceConnectorExpirationDateFilter;
    /**
     *Filter by createdAt on Device
     */
    createdAt?: DeviceCreatedAtFilter;
    /**
     *Filter by deployedState on Device
     */
    deployedState?: DeviceDeployedState | DeviceDeployedStateFilter;
    /**
     *Filter by deployment on Device
     */
    deployment?: string | DeviceDeploymentFilter;
    /**
     *Filter by description on Device
     */
    description?: string | DeviceDescriptionFilter;
    /**
     *Filter by deviceClass on Device
     */
    deviceClass?: string | DeviceDeviceClassFilter;
    /**
     *Filter by deviceExecutionMode on Device
     */
    deviceExecutionMode?: number | DeviceDeviceExecutionModeFilter;
    /**
     *Filter by deviceKey on Device
     */
    deviceKey?: string | DeviceDeviceKeyFilter;
    /**
     *Filter by endpointName on Device
     */
    endpointName?: string | DeviceEndpointNameFilter;
    /**
     *Filter by endpointType on Device
     */
    endpointType?: string | DeviceEndpointTypeFilter;
    /**
     *Filter by enrolmentListTimestamp on Device
     */
    enrolmentListTimestamp?: DeviceEnrolmentListTimestampFilter;
    /**
     *Filter by firmwareChecksum on Device
     */
    firmwareChecksum?: string | DeviceFirmwareChecksumFilter;
    /**
     *Filter by hostGateway on Device
     */
    hostGateway?: string | DeviceHostGatewayFilter;
    /**
     *Filter by id on Device
     */
    id?: string | DeviceIdFilter;
    /**
     *Filter by manifest on Device
     */
    manifest?: string | DeviceManifestFilter;
    /**
     *Filter by manifestTimestamp on Device
     */
    manifestTimestamp?: DeviceManifestTimestampFilter;
    /**
     *Filter by mechanism on Device
     */
    mechanism?: DeviceMechanism | DeviceMechanismFilter;
    /**
     *Filter by mechanismUrl on Device
     */
    mechanismUrl?: string | DeviceMechanismUrlFilter;
    /**
     *Filter by name on Device
     */
    name?: string | DeviceNameFilter;
    /**
     *Filter by serialNumber on Device
     */
    serialNumber?: string | DeviceSerialNumberFilter;
    /**
     *Filter by state on Device
     */
    state?: DeviceState | DeviceStateFilter;
    /**
     *Filter by updatedAt on Device
     */
    updatedAt?: DeviceUpdatedAtFilter;
    /**
     *Filter by vendorId on Device
     */
    vendorId?: string | DeviceVendorIdFilter;
}
/**
 *DeviceListOptions
 */
export interface DeviceListOptions extends ListOptions {
    /**
     *Filter for Device
     */
    filter?: DeviceFilter;
}

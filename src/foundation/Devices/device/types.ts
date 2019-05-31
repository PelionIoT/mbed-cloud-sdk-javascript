import { ListOptions } from "../../../legacy/common/interfaces";
export type DeviceDeployedState = "development" | "production";
export type DeviceExecutionMode = "0" | "1" | "5";
export type DeviceLifecycleStatus = "enabled" | "blocked";
export type DeviceMechanism = "connector" | "direct";
export type DeviceState = "unenrolled" | "cloud_enrolling" | "bootstrapped" | "registered" | "deregistered";
/**
 *DeviceAddToGroupRequest
 */
export interface DeviceAddToGroupRequest {
    /**
     *deviceId
     *@example 00000000000000000000000000000000
     */
    readonly deviceId?: string;
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
    readonly deviceId?: string;
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
 *DeviceDeviceLifecycleStatusFilter
 */
export interface DeviceDeviceLifecycleStatusFilter {
    /**
     *lifecycleStatus equal to
     */
    eq?: DeviceLifecycleStatus;

    /**
     *lifecycleStatus not equal to
     */
    neq?: DeviceLifecycleStatus;

    /**
     *lifecycleStatus in
     */
    in?: Array<DeviceLifecycleStatus>;

    /**
     *lifecycleStatus not in
     */
    nin?: Array<DeviceLifecycleStatus>;
}
/**
 *DeviceDeviceOperatorSuspendedFilter
 */
export interface DeviceDeviceOperatorSuspendedFilter {
    /**
     *operatorSuspended equal to
     */
    eq?: boolean;

    /**
     *operatorSuspended not equal to
     */
    neq?: boolean;
}
/**
 *DeviceDeviceLastOperatorSuspensionCategoryFilter
 */
export interface DeviceDeviceLastOperatorSuspensionCategoryFilter {
    /**
     *lastOperatorSuspensionCategory equal to
     */
    eq?: string;

    /**
     *lastOperatorSuspensionCategory not equal to
     */
    neq?: string;

    /**
     *lastOperatorSuspensionCategory in
     */
    in?: Array<string>;

    /**
     *lastOperatorSuspensionCategory not in
     */
    nin?: Array<string>;
}
/**
 *DeviceDeviceLastOperatorSuspensionUpdatedAtFilter
 */
export interface DeviceDeviceLastOperatorSuspensionUpdatedAtFilter {
    /**
     *lastOperatorSuspensionUpdatedAt in
     */
    in?: Array<string>;

    /**
     *lastOperatorSuspensionUpdatedAt not in
     */
    nin?: Array<string>;

    /**
     *lastOperatorSuspensionUpdatedAt less than
     */
    lte?: Array<string>;

    /**
     *lastOperatorSuspensionUpdatedAt greater than
     */
    gte?: Array<string>;
}
/**
 *DeviceDeviceSystemSuspendedFilter
 */
export interface DeviceDeviceSystemSuspendedFilter {
    /**
     *systemSuspended equal to
     */
    eq?: boolean;

    /**
     *systemSuspended not equal to
     */
    neq?: boolean;
}
/**
 *DeviceDeviceLastSystemSuspensionCategoryFilter
 */
export interface DeviceDeviceLastSystemSuspensionCategoryFilter {
    /**
     *lastSystemSuspensionCategory equal to
     */
    eq?: string;

    /**
     *lastSystemSuspensionCategory not equal to
     */
    neq?: string;

    /**
     *lastSystemSuspensionCategory in
     */
    in?: Array<string>;

    /**
     *lastSystemSuspensionCategory not in
     */
    nin?: Array<string>;
}
/**
 *DeviceDeviceLastSystemSuspensionUpdatedAtFilter
 */
export interface DeviceDeviceLastSystemSuspensionUpdatedAtFilter {
    /**
     *lastSystemSuspensionUpdatedAt in
     */
    in?: Array<string>;

    /**
     *lastSystemSuspensionUpdatedAt not in
     */
    nin?: Array<string>;

    /**
     *lastSystemSuspensionUpdatedAt less than
     */
    lte?: Array<string>;

    /**
     *lastSystemSuspensionUpdatedAt greater than
     */
    gte?: Array<string>;
}
/**
 *DeviceDeviceAccountIdFilter
 */
export interface DeviceDeviceAccountIdFilter {
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
 *DeviceDeviceAutoUpdateFilter
 */
export interface DeviceDeviceAutoUpdateFilter {
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
 *DeviceDeviceBootstrapExpirationDateFilter
 */
export interface DeviceDeviceBootstrapExpirationDateFilter {
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
 *DeviceDeviceBootstrappedTimestampFilter
 */
export interface DeviceDeviceBootstrappedTimestampFilter {
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
 *DeviceDeviceCaIdFilter
 */
export interface DeviceDeviceCaIdFilter {
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
 *DeviceDeviceConnectorExpirationDateFilter
 */
export interface DeviceDeviceConnectorExpirationDateFilter {
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
 *DeviceDeviceCreatedAtFilter
 */
export interface DeviceDeviceCreatedAtFilter {
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
 *DeviceDeviceDeployedStateFilter
 */
export interface DeviceDeviceDeployedStateFilter {
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
 *DeviceDeviceDeploymentFilter
 */
export interface DeviceDeviceDeploymentFilter {
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
 *DeviceDeviceDescriptionFilter
 */
export interface DeviceDeviceDescriptionFilter {
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
 *DeviceDeviceDeviceClassFilter
 */
export interface DeviceDeviceDeviceClassFilter {
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
 *DeviceDeviceDeviceExecutionModeFilter
 */
export interface DeviceDeviceDeviceExecutionModeFilter {
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
 *DeviceDeviceDeviceKeyFilter
 */
export interface DeviceDeviceDeviceKeyFilter {
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
 *DeviceDeviceEndpointNameFilter
 */
export interface DeviceDeviceEndpointNameFilter {
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
 *DeviceDeviceEndpointTypeFilter
 */
export interface DeviceDeviceEndpointTypeFilter {
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
 *DeviceDeviceEnrolmentListTimestampFilter
 */
export interface DeviceDeviceEnrolmentListTimestampFilter {
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
 *DeviceDeviceFirmwareChecksumFilter
 */
export interface DeviceDeviceFirmwareChecksumFilter {
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
 *DeviceDeviceHostGatewayFilter
 */
export interface DeviceDeviceHostGatewayFilter {
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
 *DeviceDeviceIdFilter
 */
export interface DeviceDeviceIdFilter {
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
 *DeviceDeviceManifestFilter
 */
export interface DeviceDeviceManifestFilter {
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
 *DeviceDeviceManifestTimestampFilter
 */
export interface DeviceDeviceManifestTimestampFilter {
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
 *DeviceDeviceMechanismFilter
 */
export interface DeviceDeviceMechanismFilter {
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
 *DeviceDeviceMechanismUrlFilter
 */
export interface DeviceDeviceMechanismUrlFilter {
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
 *DeviceDeviceNameFilter
 */
export interface DeviceDeviceNameFilter {
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
 *DeviceDeviceSerialNumberFilter
 */
export interface DeviceDeviceSerialNumberFilter {
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
 *DeviceDeviceStateFilter
 */
export interface DeviceDeviceStateFilter {
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
 *DeviceDeviceUpdatedAtFilter
 */
export interface DeviceDeviceUpdatedAtFilter {
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
 *DeviceDeviceVendorIdFilter
 */
export interface DeviceDeviceVendorIdFilter {
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
 *DeviceDeviceFilter
 */
export interface DeviceDeviceFilter {
    /**
     *Filter by lifecycleStatus on Device
     */
    lifecycleStatus?: DeviceLifecycleStatus | DeviceDeviceLifecycleStatusFilter;

    /**
     *Filter by operatorSuspended on Device
     */
    operatorSuspended?: boolean | DeviceDeviceOperatorSuspendedFilter;

    /**
     *Filter by lastOperatorSuspensionCategory on Device
     */
    lastOperatorSuspensionCategory?: string | DeviceDeviceLastOperatorSuspensionCategoryFilter;

    /**
     *Filter by lastOperatorSuspensionUpdatedAt on Device
     */
    lastOperatorSuspensionUpdatedAt?: DeviceDeviceLastOperatorSuspensionUpdatedAtFilter;

    /**
     *Filter by systemSuspended on Device
     */
    systemSuspended?: boolean | DeviceDeviceSystemSuspendedFilter;

    /**
     *Filter by lastSystemSuspensionCategory on Device
     */
    lastSystemSuspensionCategory?: string | DeviceDeviceLastSystemSuspensionCategoryFilter;

    /**
     *Filter by lastSystemSuspensionUpdatedAt on Device
     */
    lastSystemSuspensionUpdatedAt?: DeviceDeviceLastSystemSuspensionUpdatedAtFilter;

    /**
     *Filter by accountId on Device
     */
    accountId?: string | DeviceDeviceAccountIdFilter;

    /**
     *Filter by autoUpdate on Device
     */
    autoUpdate?: boolean | DeviceDeviceAutoUpdateFilter;

    /**
     *Filter by bootstrapExpirationDate on Device
     */
    bootstrapExpirationDate?: DeviceDeviceBootstrapExpirationDateFilter;

    /**
     *Filter by bootstrappedTimestamp on Device
     */
    bootstrappedTimestamp?: DeviceDeviceBootstrappedTimestampFilter;

    /**
     *Filter by caId on Device
     */
    caId?: string | DeviceDeviceCaIdFilter;

    /**
     *Filter by connectorExpirationDate on Device
     */
    connectorExpirationDate?: DeviceDeviceConnectorExpirationDateFilter;

    /**
     *Filter by createdAt on Device
     */
    createdAt?: DeviceDeviceCreatedAtFilter;

    /**
     *Filter by deployedState on Device
     */
    deployedState?: DeviceDeployedState | DeviceDeviceDeployedStateFilter;

    /**
     *Filter by deployment on Device
     */
    deployment?: string | DeviceDeviceDeploymentFilter;

    /**
     *Filter by description on Device
     */
    description?: string | DeviceDeviceDescriptionFilter;

    /**
     *Filter by deviceClass on Device
     */
    deviceClass?: string | DeviceDeviceDeviceClassFilter;

    /**
     *Filter by deviceExecutionMode on Device
     */
    deviceExecutionMode?: number | DeviceDeviceDeviceExecutionModeFilter;

    /**
     *Filter by deviceKey on Device
     */
    deviceKey?: string | DeviceDeviceDeviceKeyFilter;

    /**
     *Filter by endpointName on Device
     */
    endpointName?: string | DeviceDeviceEndpointNameFilter;

    /**
     *Filter by endpointType on Device
     */
    endpointType?: string | DeviceDeviceEndpointTypeFilter;

    /**
     *Filter by enrolmentListTimestamp on Device
     */
    enrolmentListTimestamp?: DeviceDeviceEnrolmentListTimestampFilter;

    /**
     *Filter by firmwareChecksum on Device
     */
    firmwareChecksum?: string | DeviceDeviceFirmwareChecksumFilter;

    /**
     *Filter by hostGateway on Device
     */
    hostGateway?: string | DeviceDeviceHostGatewayFilter;

    /**
     *Filter by id on Device
     */
    id?: string | DeviceDeviceIdFilter;

    /**
     *Filter by manifest on Device
     */
    manifest?: string | DeviceDeviceManifestFilter;

    /**
     *Filter by manifestTimestamp on Device
     */
    manifestTimestamp?: DeviceDeviceManifestTimestampFilter;

    /**
     *Filter by mechanism on Device
     */
    mechanism?: DeviceMechanism | DeviceDeviceMechanismFilter;

    /**
     *Filter by mechanismUrl on Device
     */
    mechanismUrl?: string | DeviceDeviceMechanismUrlFilter;

    /**
     *Filter by name on Device
     */
    name?: string | DeviceDeviceNameFilter;

    /**
     *Filter by serialNumber on Device
     */
    serialNumber?: string | DeviceDeviceSerialNumberFilter;

    /**
     *Filter by state on Device
     */
    state?: DeviceState | DeviceDeviceStateFilter;

    /**
     *Filter by updatedAt on Device
     */
    updatedAt?: DeviceDeviceUpdatedAtFilter;

    /**
     *Filter by vendorId on Device
     */
    vendorId?: string | DeviceDeviceVendorIdFilter;
}
/**
 *DeviceDeviceListOptions
 */
export interface DeviceDeviceListOptions extends ListOptions {
    /**
     *Filter for Device
     */
    filter?: DeviceDeviceFilter;
}

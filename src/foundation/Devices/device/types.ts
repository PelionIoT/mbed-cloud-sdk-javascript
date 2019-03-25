import { ListOptions } from "../../../legacy/common/interfaces";
export type DeviceDeployedStateEnum = "development" | "production";
export type DeviceExecutionMode = "0" | "1" | "5";
export type DeviceMechanismEnum = "connector" | "direct";
export type DeviceStateEnum = "unenrolled" | "cloud_enrolling" | "bootstrapped" | "registered" | "deregistered";
/**
 *DeviceCreateRequest
 */
export interface DeviceCreateRequest {
    /**
     *autoUpdate
     */
    readonly autoUpdate?: boolean;

    /**
     *bootstrapExpirationDate
     */
    readonly bootstrapExpirationDate?: Date;

    /**
     *bootstrappedTimestamp
     */
    readonly bootstrappedTimestamp?: Date;

    /**
     *caId
     */
    readonly caId?: string;

    /**
     *connectorExpirationDate
     */
    readonly connectorExpirationDate?: Date;

    /**
     *customAttributes
     */
    readonly customAttributes?: { [key: string]: string };

    /**
     *deployment
     */
    readonly deployment?: string;

    /**
     *description
     */
    readonly description?: string;

    /**
     *deviceClass
     */
    readonly deviceClass?: string;

    /**
     *deviceExecutionMode
     */
    readonly deviceExecutionMode?: number;

    /**
     *deviceKey
     */
    readonly deviceKey?: string;

    /**
     *endpointName
     */
    readonly endpointName?: string;

    /**
     *endpointType
     */
    readonly endpointType?: string;

    /**
     *firmwareChecksum
     */
    readonly firmwareChecksum?: string;

    /**
     *hostGateway
     */
    readonly hostGateway?: string;

    /**
     *issuerFingerprint
     */
    readonly issuerFingerprint?: string;

    /**
     *manifest
     */
    readonly manifest?: string;

    /**
     *mechanism
     */
    readonly mechanism?: DeviceMechanismEnum;

    /**
     *mechanismUrl
     */
    readonly mechanismUrl?: string;

    /**
     *name
     */
    readonly name?: string;

    /**
     *serialNumber
     */
    readonly serialNumber?: string;

    /**
     *state
     */
    readonly state?: DeviceStateEnum;

    /**
     *vendorId
     */
    readonly vendorId?: string;
}
/**
 *DeviceUpdateRequest
 */
export interface DeviceUpdateRequest {
    /**
     *autoUpdate
     */
    readonly autoUpdate?: boolean;

    /**
     *caId
     */
    readonly caId?: string;

    /**
     *customAttributes
     */
    readonly customAttributes?: { [key: string]: string };

    /**
     *description
     */
    readonly description?: string;

    /**
     *deviceKey
     */
    readonly deviceKey?: string;

    /**
     *endpointName
     */
    readonly endpointName?: string;

    /**
     *endpointType
     */
    readonly endpointType?: string;

    /**
     *hostGateway
     */
    readonly hostGateway?: string;

    /**
     *name
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
    eq?: DeviceDeployedStateEnum;

    /**
     *neq
     */
    neq?: DeviceDeployedStateEnum;

    /**
     *in
     */
    in?: Array<DeviceDeployedStateEnum>;

    /**
     *nin
     */
    nin?: Array<DeviceDeployedStateEnum>;
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
    eq?: DeviceMechanismEnum;

    /**
     *neq
     */
    neq?: DeviceMechanismEnum;

    /**
     *in
     */
    in?: Array<DeviceMechanismEnum>;

    /**
     *nin
     */
    nin?: Array<DeviceMechanismEnum>;
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
    eq?: DeviceStateEnum;

    /**
     *neq
     */
    neq?: DeviceStateEnum;

    /**
     *in
     */
    in?: Array<DeviceStateEnum>;

    /**
     *nin
     */
    nin?: Array<DeviceStateEnum>;
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
    deployedState?: DeviceDeployedStateEnum | DeviceDeployedStateFilter;

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
    mechanism?: DeviceMechanismEnum | DeviceMechanismFilter;

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
    state?: DeviceStateEnum | DeviceStateFilter;

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

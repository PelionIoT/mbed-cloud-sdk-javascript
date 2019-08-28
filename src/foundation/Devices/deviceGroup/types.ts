import { ListOptions } from "../../../common";
/**
 *DeviceGroupAddDeviceRequest
 */
export interface DeviceGroupAddDeviceRequest {
    /**
     *deviceId
     *@example 00000000000000000000000000000000
     */
    readonly deviceId?: string;
}
/**
 *DeviceGroupCreateRequest
 */
export interface DeviceGroupCreateRequest {
    /**
     *Up to ten custom key-value attributes. Keys cannot begin with a number. Both key and value are limited to 128 characters. Updating this field replaces existing contents.
     *@example [object Object]
     */
    readonly customAttributes?: { [key: string]: string };

    /**
     *The description of the group.
     *@example Devices on the factory floor.
     */
    readonly description?: string;

    /**
     *Name of the group.
     *@example My devices
     */
    readonly name?: string;
}
/**
 *DeviceGroupRemoveDeviceRequest
 */
export interface DeviceGroupRemoveDeviceRequest {
    /**
     *deviceId
     *@example 00000000000000000000000000000000
     */
    readonly deviceId?: string;
}
/**
 *DeviceGroupUpdateRequest
 */
export interface DeviceGroupUpdateRequest {
    /**
     *Up to ten custom key-value attributes. Keys cannot begin with a number. Both key and value are limited to 128 characters. Updating this field replaces existing contents.
     *@example [object Object]
     */
    readonly customAttributes?: { [key: string]: string };

    /**
     *The description of the group.
     *@example Devices on the factory floor.
     */
    readonly description?: string;

    /**
     *Name of the group.
     *@example My devices
     */
    readonly name?: string;
}
/**
 *DeviceGroupDeviceLifecycleStatusFilter
 */
export interface DeviceGroupDeviceLifecycleStatusFilter {
    /**
     *lifecycleStatus equal to
     */
    eq?: string;

    /**
     *lifecycleStatus not equal to
     */
    neq?: string;

    /**
     *lifecycleStatus in
     */
    in?: Array<string>;

    /**
     *lifecycleStatus not in
     */
    nin?: Array<string>;
}
/**
 *DeviceGroupDeviceOperatorSuspendedFilter
 */
export interface DeviceGroupDeviceOperatorSuspendedFilter {
    /**
     *operatorSuspended equal to
     */
    eq?: string;

    /**
     *operatorSuspended not equal to
     */
    neq?: string;
}
/**
 *DeviceGroupDeviceLastOperatorSuspendedCategoryFilter
 */
export interface DeviceGroupDeviceLastOperatorSuspendedCategoryFilter {
    /**
     *lastOperatorSuspendedCategory equal to
     */
    eq?: string;

    /**
     *lastOperatorSuspendedCategory not equal to
     */
    neq?: string;

    /**
     *lastOperatorSuspendedCategory in
     */
    in?: Array<string>;

    /**
     *lastOperatorSuspendedCategory not in
     */
    nin?: Array<string>;
}
/**
 *DeviceGroupDeviceLastOperatorSuspendedUpdatedAtFilter
 */
export interface DeviceGroupDeviceLastOperatorSuspendedUpdatedAtFilter {
    /**
     *lastOperatorSuspendedUpdatedAt in
     */
    in?: Array<string>;

    /**
     *lastOperatorSuspendedUpdatedAt not in
     */
    nin?: Array<string>;

    /**
     *lastOperatorSuspendedUpdatedAt less than
     */
    lte?: Array<string>;

    /**
     *lastOperatorSuspendedUpdatedAt greater than
     */
    gte?: Array<string>;
}
/**
 *DeviceGroupDeviceSystemSuspendedFilter
 */
export interface DeviceGroupDeviceSystemSuspendedFilter {
    /**
     *systemSuspended equal to
     */
    eq?: string;

    /**
     *systemSuspended not equal to
     */
    neq?: string;
}
/**
 *DeviceGroupDeviceLastSystemSuspendedCategoryFilter
 */
export interface DeviceGroupDeviceLastSystemSuspendedCategoryFilter {
    /**
     *lastSystemSuspendedCategory equal to
     */
    eq?: string;

    /**
     *lastSystemSuspendedCategory not equal to
     */
    neq?: string;

    /**
     *lastSystemSuspendedCategory in
     */
    in?: Array<string>;

    /**
     *lastSystemSuspendedCategory not in
     */
    nin?: Array<string>;
}
/**
 *DeviceGroupDeviceLastSystemSuspendedUpdatedAtFilter
 */
export interface DeviceGroupDeviceLastSystemSuspendedUpdatedAtFilter {
    /**
     *lastSystemSuspendedUpdatedAt in
     */
    in?: Array<string>;

    /**
     *lastSystemSuspendedUpdatedAt not in
     */
    nin?: Array<string>;

    /**
     *lastSystemSuspendedUpdatedAt less than
     */
    lte?: Array<string>;

    /**
     *lastSystemSuspendedUpdatedAt greater than
     */
    gte?: Array<string>;
}
/**
 *DeviceGroupDeviceAccountIdFilter
 */
export interface DeviceGroupDeviceAccountIdFilter {
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
 *DeviceGroupDeviceAutoUpdateFilter
 */
export interface DeviceGroupDeviceAutoUpdateFilter {
    /**
     *autoUpdate equal to
     */
    eq?: string;

    /**
     *autoUpdate not equal to
     */
    neq?: string;
}
/**
 *DeviceGroupDeviceBootstrapExpirationDateFilter
 */
export interface DeviceGroupDeviceBootstrapExpirationDateFilter {
    /**
     *bootstrapExpirationDate in
     */
    in?: Array<string>;

    /**
     *bootstrapExpirationDate not in
     */
    nin?: Array<string>;

    /**
     *bootstrapExpirationDate less than
     */
    lte?: Array<string>;

    /**
     *bootstrapExpirationDate greater than
     */
    gte?: Array<string>;
}
/**
 *DeviceGroupDeviceBootstrappedTimestampFilter
 */
export interface DeviceGroupDeviceBootstrappedTimestampFilter {
    /**
     *bootstrappedTimestamp in
     */
    in?: Array<string>;

    /**
     *bootstrappedTimestamp not in
     */
    nin?: Array<string>;

    /**
     *bootstrappedTimestamp less than
     */
    lte?: Array<string>;

    /**
     *bootstrappedTimestamp greater than
     */
    gte?: Array<string>;
}
/**
 *DeviceGroupDeviceCaIdFilter
 */
export interface DeviceGroupDeviceCaIdFilter {
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
 *DeviceGroupDeviceConnectorExpirationDateFilter
 */
export interface DeviceGroupDeviceConnectorExpirationDateFilter {
    /**
     *connectorExpirationDate in
     */
    in?: Array<string>;

    /**
     *connectorExpirationDate not in
     */
    nin?: Array<string>;

    /**
     *connectorExpirationDate less than
     */
    lte?: Array<string>;

    /**
     *connectorExpirationDate greater than
     */
    gte?: Array<string>;
}
/**
 *DeviceGroupDeviceCreatedAtFilter
 */
export interface DeviceGroupDeviceCreatedAtFilter {
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
 *DeviceGroupDeviceDeployedStateFilter
 */
export interface DeviceGroupDeviceDeployedStateFilter {
    /**
     *deployedState equal to
     */
    eq?: string;

    /**
     *deployedState not equal to
     */
    neq?: string;

    /**
     *deployedState in
     */
    in?: Array<string>;

    /**
     *deployedState not in
     */
    nin?: Array<string>;
}
/**
 *DeviceGroupDeviceDeploymentFilter
 */
export interface DeviceGroupDeviceDeploymentFilter {
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
 *DeviceGroupDeviceDescriptionFilter
 */
export interface DeviceGroupDeviceDescriptionFilter {
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
 *DeviceGroupDeviceDeviceClassFilter
 */
export interface DeviceGroupDeviceDeviceClassFilter {
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
 *DeviceGroupDeviceDeviceExecutionModeFilter
 */
export interface DeviceGroupDeviceDeviceExecutionModeFilter {
    /**
     *deviceExecutionMode equal to
     */
    eq?: string;

    /**
     *deviceExecutionMode not equal to
     */
    neq?: string;

    /**
     *deviceExecutionMode in
     */
    in?: Array<string>;

    /**
     *deviceExecutionMode not in
     */
    nin?: Array<string>;
}
/**
 *DeviceGroupDeviceDeviceKeyFilter
 */
export interface DeviceGroupDeviceDeviceKeyFilter {
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
 *DeviceGroupDeviceEndpointNameFilter
 */
export interface DeviceGroupDeviceEndpointNameFilter {
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
 *DeviceGroupDeviceEndpointTypeFilter
 */
export interface DeviceGroupDeviceEndpointTypeFilter {
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
 *DeviceGroupDeviceEnrolmentListTimestampFilter
 */
export interface DeviceGroupDeviceEnrolmentListTimestampFilter {
    /**
     *enrolmentListTimestamp in
     */
    in?: Array<string>;

    /**
     *enrolmentListTimestamp not in
     */
    nin?: Array<string>;

    /**
     *enrolmentListTimestamp less than
     */
    lte?: Array<string>;

    /**
     *enrolmentListTimestamp greater than
     */
    gte?: Array<string>;
}
/**
 *DeviceGroupDeviceFirmwareChecksumFilter
 */
export interface DeviceGroupDeviceFirmwareChecksumFilter {
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
 *DeviceGroupDeviceHostGatewayFilter
 */
export interface DeviceGroupDeviceHostGatewayFilter {
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
 *DeviceGroupDeviceIdFilter
 */
export interface DeviceGroupDeviceIdFilter {
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
 *DeviceGroupDeviceManifestFilter
 */
export interface DeviceGroupDeviceManifestFilter {
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
 *DeviceGroupDeviceManifestTimestampFilter
 */
export interface DeviceGroupDeviceManifestTimestampFilter {
    /**
     *manifestTimestamp in
     */
    in?: Array<string>;

    /**
     *manifestTimestamp not in
     */
    nin?: Array<string>;

    /**
     *manifestTimestamp less than
     */
    lte?: Array<string>;

    /**
     *manifestTimestamp greater than
     */
    gte?: Array<string>;
}
/**
 *DeviceGroupDeviceMechanismFilter
 */
export interface DeviceGroupDeviceMechanismFilter {
    /**
     *mechanism equal to
     */
    eq?: string;

    /**
     *mechanism not equal to
     */
    neq?: string;

    /**
     *mechanism in
     */
    in?: Array<string>;

    /**
     *mechanism not in
     */
    nin?: Array<string>;
}
/**
 *DeviceGroupDeviceMechanismUrlFilter
 */
export interface DeviceGroupDeviceMechanismUrlFilter {
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
 *DeviceGroupDeviceNameFilter
 */
export interface DeviceGroupDeviceNameFilter {
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
 *DeviceGroupDeviceSerialNumberFilter
 */
export interface DeviceGroupDeviceSerialNumberFilter {
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
 *DeviceGroupDeviceStateFilter
 */
export interface DeviceGroupDeviceStateFilter {
    /**
     *state equal to
     */
    eq?: string;

    /**
     *state not equal to
     */
    neq?: string;

    /**
     *state in
     */
    in?: Array<string>;

    /**
     *state not in
     */
    nin?: Array<string>;
}
/**
 *DeviceGroupDeviceUpdatedAtFilter
 */
export interface DeviceGroupDeviceUpdatedAtFilter {
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
 *DeviceGroupDeviceVendorIdFilter
 */
export interface DeviceGroupDeviceVendorIdFilter {
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
 *DeviceGroupDeviceFilter
 */
export interface DeviceGroupDeviceFilter {
    /**
     *Filter by lifecycleStatus on Device
     */
    lifecycleStatus?: string | DeviceGroupDeviceLifecycleStatusFilter;

    /**
     *Filter by operatorSuspended on Device
     */
    operatorSuspended?: string | DeviceGroupDeviceOperatorSuspendedFilter;

    /**
     *Filter by lastOperatorSuspendedCategory on Device
     */
    lastOperatorSuspendedCategory?: string | DeviceGroupDeviceLastOperatorSuspendedCategoryFilter;

    /**
     *Filter by lastOperatorSuspendedUpdatedAt on Device
     */
    lastOperatorSuspendedUpdatedAt?: DeviceGroupDeviceLastOperatorSuspendedUpdatedAtFilter;

    /**
     *Filter by systemSuspended on Device
     */
    systemSuspended?: string | DeviceGroupDeviceSystemSuspendedFilter;

    /**
     *Filter by lastSystemSuspendedCategory on Device
     */
    lastSystemSuspendedCategory?: string | DeviceGroupDeviceLastSystemSuspendedCategoryFilter;

    /**
     *Filter by lastSystemSuspendedUpdatedAt on Device
     */
    lastSystemSuspendedUpdatedAt?: DeviceGroupDeviceLastSystemSuspendedUpdatedAtFilter;

    /**
     *Filter by accountId on Device
     */
    accountId?: string | DeviceGroupDeviceAccountIdFilter;

    /**
     *Filter by autoUpdate on Device
     */
    autoUpdate?: string | DeviceGroupDeviceAutoUpdateFilter;

    /**
     *Filter by bootstrapExpirationDate on Device
     */
    bootstrapExpirationDate?: DeviceGroupDeviceBootstrapExpirationDateFilter;

    /**
     *Filter by bootstrappedTimestamp on Device
     */
    bootstrappedTimestamp?: DeviceGroupDeviceBootstrappedTimestampFilter;

    /**
     *Filter by caId on Device
     */
    caId?: string | DeviceGroupDeviceCaIdFilter;

    /**
     *Filter by connectorExpirationDate on Device
     */
    connectorExpirationDate?: DeviceGroupDeviceConnectorExpirationDateFilter;

    /**
     *Filter by createdAt on Device
     */
    createdAt?: DeviceGroupDeviceCreatedAtFilter;

    /**
     *Filter by deployedState on Device
     */
    deployedState?: string | DeviceGroupDeviceDeployedStateFilter;

    /**
     *Filter by deployment on Device
     */
    deployment?: string | DeviceGroupDeviceDeploymentFilter;

    /**
     *Filter by description on Device
     */
    description?: string | DeviceGroupDeviceDescriptionFilter;

    /**
     *Filter by deviceClass on Device
     */
    deviceClass?: string | DeviceGroupDeviceDeviceClassFilter;

    /**
     *Filter by deviceExecutionMode on Device
     */
    deviceExecutionMode?: string | DeviceGroupDeviceDeviceExecutionModeFilter;

    /**
     *Filter by deviceKey on Device
     */
    deviceKey?: string | DeviceGroupDeviceDeviceKeyFilter;

    /**
     *Filter by endpointName on Device
     */
    endpointName?: string | DeviceGroupDeviceEndpointNameFilter;

    /**
     *Filter by endpointType on Device
     */
    endpointType?: string | DeviceGroupDeviceEndpointTypeFilter;

    /**
     *Filter by enrolmentListTimestamp on Device
     */
    enrolmentListTimestamp?: DeviceGroupDeviceEnrolmentListTimestampFilter;

    /**
     *Filter by firmwareChecksum on Device
     */
    firmwareChecksum?: string | DeviceGroupDeviceFirmwareChecksumFilter;

    /**
     *Filter by hostGateway on Device
     */
    hostGateway?: string | DeviceGroupDeviceHostGatewayFilter;

    /**
     *Filter by id on Device
     */
    id?: string | DeviceGroupDeviceIdFilter;

    /**
     *Filter by manifest on Device
     */
    manifest?: string | DeviceGroupDeviceManifestFilter;

    /**
     *Filter by manifestTimestamp on Device
     */
    manifestTimestamp?: DeviceGroupDeviceManifestTimestampFilter;

    /**
     *Filter by mechanism on Device
     */
    mechanism?: string | DeviceGroupDeviceMechanismFilter;

    /**
     *Filter by mechanismUrl on Device
     */
    mechanismUrl?: string | DeviceGroupDeviceMechanismUrlFilter;

    /**
     *Filter by name on Device
     */
    name?: string | DeviceGroupDeviceNameFilter;

    /**
     *Filter by serialNumber on Device
     */
    serialNumber?: string | DeviceGroupDeviceSerialNumberFilter;

    /**
     *Filter by state on Device
     */
    state?: string | DeviceGroupDeviceStateFilter;

    /**
     *Filter by updatedAt on Device
     */
    updatedAt?: DeviceGroupDeviceUpdatedAtFilter;

    /**
     *Filter by vendorId on Device
     */
    vendorId?: string | DeviceGroupDeviceVendorIdFilter;
}
/**
 *DeviceGroupDeviceListOptions
 */
export interface DeviceGroupDeviceListOptions extends ListOptions {
    /**
     *Filter for Device
     */
    filter?: DeviceGroupDeviceFilter;
}
/**
 *DeviceGroupIdFilter
 */
export interface DeviceGroupIdFilter {
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
 *DeviceGroupDevicesCountFilter
 */
export interface DeviceGroupDevicesCountFilter {
    /**
     *devicesCount equal to
     */
    eq?: number;

    /**
     *devicesCount not equal to
     */
    neq?: number;

    /**
     *devicesCount in
     */
    in?: Array<number>;

    /**
     *devicesCount not in
     */
    nin?: Array<number>;

    /**
     *devicesCount less than
     */
    lte?: Array<number>;

    /**
     *devicesCount greater than
     */
    gte?: Array<number>;
}
/**
 *DeviceGroupNameFilter
 */
export interface DeviceGroupNameFilter {
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
 *DeviceGroupCreatedAtFilter
 */
export interface DeviceGroupCreatedAtFilter {
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
 *DeviceGroupUpdatedAtFilter
 */
export interface DeviceGroupUpdatedAtFilter {
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
 *DeviceGroupFilter
 */
export interface DeviceGroupFilter {
    /**
     *Filter by id on DeviceGroup
     */
    id?: string | DeviceGroupIdFilter;

    /**
     *Filter by devicesCount on DeviceGroup
     */
    devicesCount?: number | DeviceGroupDevicesCountFilter;

    /**
     *Filter by name on DeviceGroup
     */
    name?: string | DeviceGroupNameFilter;

    /**
     *Filter by createdAt on DeviceGroup
     */
    createdAt?: DeviceGroupCreatedAtFilter;

    /**
     *Filter by updatedAt on DeviceGroup
     */
    updatedAt?: DeviceGroupUpdatedAtFilter;
}
/**
 *DeviceGroupListOptions
 */
export interface DeviceGroupListOptions extends ListOptions {
    /**
     *Filter for DeviceGroup
     */
    filter?: DeviceGroupFilter;
}

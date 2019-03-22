import { Entity } from "../../../common/entity";
import { DeviceDeployedStateEnum, DeviceLifecycleStatusEnum, DeviceMechanismEnum, DeviceStateEnum } from "./types";
/**
 *Device
 */
export interface Device extends Entity {
    /**
     *accountId
     */
    readonly accountId?: string;

    /**
     *autoUpdate
     */
    autoUpdate?: boolean;

    /**
     *bootstrapExpirationDate
     */
    bootstrapExpirationDate?: Date;

    /**
     *bootstrappedTimestamp
     */
    bootstrappedTimestamp?: Date;

    /**
     *caId
     */
    caId?: string;

    /**
     *connectorExpirationDate
     */
    connectorExpirationDate?: Date;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *customAttributes
     */
    customAttributes?: { [key: string]: string };

    /**
     *deployedState
     */
    readonly deployedState?: DeviceDeployedStateEnum;

    /**
     *deployment
     */
    deployment?: string;

    /**
     *description
     */
    description?: string;

    /**
     *deviceClass
     */
    deviceClass?: string;

    /**
     *deviceExecutionMode
     */
    deviceExecutionMode?: number;

    /**
     *deviceKey
     */
    deviceKey?: string;

    /**
     *endpointName
     */
    readonly endpointName?: string;

    /**
     *endpointType
     */
    endpointType?: string;

    /**
     *enrolmentListTimestamp
     */
    readonly enrolmentListTimestamp?: Date;

    /**
     *firmwareChecksum
     */
    firmwareChecksum?: string;

    /**
     *hostGateway
     */
    hostGateway?: string;

    /**
     *issuerFingerprint
     */
    issuerFingerprint?: string;

    /**
     *lastOperatorSuspendedCategory
     */
    readonly lastOperatorSuspendedCategory?: string;

    /**
     *lastOperatorSuspendedDescription
     */
    readonly lastOperatorSuspendedDescription?: string;

    /**
     *lastOperatorSuspendedUpdatedAt
     */
    readonly lastOperatorSuspendedUpdatedAt?: Date;

    /**
     *lastSystemSuspendedCategory
     */
    readonly lastSystemSuspendedCategory?: string;

    /**
     *lastSystemSuspendedDescription
     */
    readonly lastSystemSuspendedDescription?: string;

    /**
     *lastSystemSuspendedUpdatedAt
     */
    readonly lastSystemSuspendedUpdatedAt?: Date;

    /**
     *lifecycleStatus
     */
    readonly lifecycleStatus?: DeviceLifecycleStatusEnum;

    /**
     *manifest
     */
    manifest?: string;

    /**
     *manifestTimestamp
     */
    readonly manifestTimestamp?: Date;

    /**
     *mechanism
     */
    mechanism?: DeviceMechanismEnum;

    /**
     *mechanismUrl
     */
    mechanismUrl?: string;

    /**
     *name
     */
    name?: string;

    /**
     *operatorSuspended
     */
    readonly operatorSuspended?: boolean;

    /**
     *serialNumber
     */
    serialNumber?: string;

    /**
     *state
     */
    state?: DeviceStateEnum;

    /**
     *systemSuspended
     */
    readonly systemSuspended?: boolean;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;

    /**
     *vendorId
     */
    vendorId?: string;
}

import { Entity } from "../../../common/entity";
import { DeviceDeployedStateEnum, DeviceLifecycleStatusEnum, DeviceMechanismEnum, DeviceStateEnum } from "./types";
/**
 *Device
 */
export interface Device extends Entity {
    /**
     *accountId
     */
    accountId?: string;

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
    createdAt?: Date;

    /**
     *customAttributes
     */
    customAttributes?: { [key: string]: string };

    /**
     *deployedState
     */
    deployedState?: DeviceDeployedStateEnum;

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
    endpointName?: string;

    /**
     *endpointType
     */
    endpointType?: string;

    /**
     *enrolmentListTimestamp
     */
    enrolmentListTimestamp?: Date;

    /**
     *firmwareChecksum
     */
    firmwareChecksum?: string;

    /**
     *hostGateway
     */
    hostGateway?: string;

    /**
     *id
     */
    id?: string;

    /**
     *issuerFingerprint
     */
    issuerFingerprint?: string;

    /**
     *lastOperatorSuspendedCategory
     */
    lastOperatorSuspendedCategory?: string;

    /**
     *lastOperatorSuspendedDescription
     */
    lastOperatorSuspendedDescription?: string;

    /**
     *lastOperatorSuspendedUpdatedAt
     */
    lastOperatorSuspendedUpdatedAt?: Date;

    /**
     *lastSystemSuspendedCategory
     */
    lastSystemSuspendedCategory?: string;

    /**
     *lastSystemSuspendedDescription
     */
    lastSystemSuspendedDescription?: string;

    /**
     *lastSystemSuspendedUpdatedAt
     */
    lastSystemSuspendedUpdatedAt?: Date;

    /**
     *lifecycleStatus
     */
    lifecycleStatus?: DeviceLifecycleStatusEnum;

    /**
     *manifest
     */
    manifest?: string;

    /**
     *manifestTimestamp
     */
    manifestTimestamp?: Date;

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
    operatorSuspended?: boolean;

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
    systemSuspended?: boolean;

    /**
     *updatedAt
     */
    updatedAt?: Date;

    /**
     *vendorId
     */
    vendorId?: string;
}

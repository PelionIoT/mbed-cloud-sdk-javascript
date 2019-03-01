import { Entity } from "../../../common/entity";
import { DeviceDeployedStateEnum, DeviceMechanismEnum, DeviceStateEnum } from "./types";
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
    endpointName?: string;

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
     *serialNumber
     */
    serialNumber?: string;

    /**
     *state
     */
    state?: DeviceStateEnum;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;

    /**
     *vendorId
     */
    vendorId?: string;
}

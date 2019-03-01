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

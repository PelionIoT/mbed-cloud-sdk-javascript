export type DeviceDeployedState = "development" | "production";
export type DeviceExecutionMode = "0" | "1" | "5";
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
     *Up to five custom key-value attributes.
     *@example { &#39;key&#39;: &#39;value&#39; }
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
     *Up to five custom key-value attributes.
     *@example { &#39;key&#39;: &#39;value&#39; }
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

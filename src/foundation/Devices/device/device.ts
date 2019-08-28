import { Entity } from "../../../common/entity";
import { DeviceDeployedState, DeviceLifecycleStatus, DeviceMechanism, DeviceState } from "./types";
/**
 *Device
 */
export interface Device extends Entity {
    /**
     *The ID of the associated account.
     *@example 00000000000000000000000000000000
     */
    readonly accountId?: string;

    /**
     *DEPRECATED: Mark this device for automatic firmware update.
     */
    autoUpdate?: boolean;

    /**
     *The expiration date of the certificate used to connect to bootstrap server.
     */
    bootstrapExpirationDate?: Date;

    /**
     *The timestamp of the device's most recent bootstrap process.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly bootstrappedTimestamp?: Date;

    /**
     *The certificate issuer's ID.
     *@example 00000000000000000000000000000000
     */
    caId?: string;

    /**
     *The expiration date of the certificate used to connect to LwM2M server.
     */
    connectorExpirationDate?: Date;

    /**
     *The timestamp of when the device was created in the device directory.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;

    /**
     *Up to five custom key-value attributes. Note that keys cannot begin with a number. Both keys and values are limited to 128 characters. Updating this field replaces existing contents.
     *@example [object Object]
     */
    customAttributes?: { [key: string]: string };

    /**
     *DEPRECATED: The state of the device's deployment.
     */
    readonly deployedState?: DeviceDeployedState;

    /**
     *DEPRECATED: The last deployment used on the device.
     */
    deployment?: string;

    /**
     *The description of the device.
     *@example description
     */
    description?: string;

    /**
     *An ID representing the model and hardware revision of the device.
     */
    deviceClass?: string;

    /**
*The execution mode from the certificate of the device. Defaults to inheriting from host_gateway device.
Permitted values:
  - 0 - Unspecified execution mode (default if host_gateway invalid or not set). The device firmware uses a certificate that is not identified as a developer or production certificate.
  - 1 - Development device. The device firmware uses a developer certificate to communicate with Device Management.
  - 5 - Production device. The device firmware uses a factory-generated certificate to communicate with Device Management.
*/
    deviceExecutionMode?: number;

    /**
     *The fingerprint of the device certificate.
     *@example 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00
     */
    deviceKey?: string;

    /**
     *The endpoint name given to the device.
     *@example 00000000-0000-0000-0000-000000000000
     */
    readonly endpointName?: string;

    /**
     *The endpoint type of the device. For example, the device is a gateway.
     */
    endpointType?: string;

    /**
     *The claim date/time.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly enrolmentListTimestamp?: Date;

    /**
     *The SHA256 checksum of the current firmware image.
     *@example 0000000000000000000000000000000000000000000000000000000000000000
     */
    readonly firmwareChecksum?: string;

    /**
     *groups
     */
    readonly groups?: Array<string>;

    /**
     *The ID of the host gateway, if appropriate.
     */
    hostGateway?: string;

    /**
     *SHA256 fingerprint of the certificate used to validate the signature of the device certificate.
     *@example C42EDEFC75871E4CE2146FCDA67D03DDA05CC26FDF93B17B55F42C1EADFDC322
     */
    issuerFingerprint?: string;

    /**
     *The reference of the block category.
     *@example maintenance
     */
    readonly lastOperatorSuspendedCategory?: string;

    /**
     *The most recent description why the device was suspended or returned to service.
     *@example Suspended for maintenance.
     */
    readonly lastOperatorSuspendedDescription?: string;

    /**
     *The timestamp of the most recent suspension activity.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly lastOperatorSuspendedUpdatedAt?: Date;

    /**
     *The reference of the block category.
     *@example maintenance
     */
    readonly lastSystemSuspendedCategory?: string;

    /**
     *The most recent description of why the device was blocked or unblocked by the system.
     *@example A certificate in the device's certificate chain was blacklisted by the system.
     */
    readonly lastSystemSuspendedDescription?: string;

    /**
     *The timestamp of the most recent system block activity.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly lastSystemSuspendedUpdatedAt?: Date;

    /**
     *The lifecycle status of the device.
     *@example enabled
     */
    readonly lifecycleStatus?: DeviceLifecycleStatus;

    /**
     *DEPRECATED: The URL for the current device manifest.
     */
    manifest?: string;

    /**
     *The timestamp of the current manifest version.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly manifestTimestamp?: Date;

    /**
     *The ID of the channel used to communicate with the device.
     */
    mechanism?: DeviceMechanism;

    /**
     *The address of the connector to use.
     */
    mechanismUrl?: string;

    /**
     *The name of the device.
     *@example 00000000-0000-0000-0000-000000000000
     */
    name?: string;

    /**
     *Is the device suspended by the operator?
     */
    readonly operatorSuspended?: boolean;

    /**
     *The serial number of the device.
     *@example 00000000-0000-0000-0000-000000000000
     */
    serialNumber?: string;

    /**
     *The current state of the device.
     */
    state?: DeviceState;

    /**
     *Is the device suspended by the system?
     */
    readonly systemSuspended?: boolean;

    /**
     *The time the object was updated.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;

    /**
     *The device vendor ID.
     *@example 00000000-0000-0000-0000-000000000000
     */
    vendorId?: string;
}

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
     *Up to ten custom key-value attributes. Note that keys cannot begin with a number. Both keys and values are limited to 128 characters. Updating this field replaces existing contents.
     *@example [object Object]
     */
    readonly componentAttributes?: { [key: string]: string };

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
     *@example Temperature measuring device
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
     *The endpoint name given to the device. The endpoint_name is from the device certificate and is set by factory tool.
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
     *The ID of the host gateway, if appropriate. A device behind Edge has this host_gateway set.
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
     * Enabled: The device is allowed to connect to Pelion Device Management.
     * Blocked: The device is prevented from connecting to Pelion Device Management. Device can be, for example, 'suspended'.
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
     *NOT USED: The ID of the channel used to communicate with the device.
     */
    mechanism?: DeviceMechanism;

    /**
     *NOT USED: The address of the connector to use.
     */
    mechanismUrl?: string;

    /**
     *The name given by the web application for the device. Device itself provides only the endpoint_name.
     *@example 00000000-0000-0000-0000-000000000000
     */
    name?: string;

    /**
     *Device has been suspended by operator.
     */
    readonly operatorSuspended?: boolean;

    /**
     *The [serial number](https://www.pelion.com/docs/device-management-provision/latest/provisioning-info/lwm2m-device-object.html#serial-number) of the device. The serial number is injected by the factory tool during manufacturing.
     *@example 00000000-0000-0000-0000-000000000000
     */
    serialNumber?: string;

    /**
     *The current state of the device.
     * Unenrolled: The device has been created, but has not yet bootstrapped or connected to Device Management.
     * Cloud_enrolling: The device is bootstrapping for the first time. This state is set only while bootstrapping is in progress. For example, an external CA gives an error, and the device tries to bootstrap again after few seconds.
     * Bootstrapped: The device has bootstrapped, and has credentials to connect to Device Management.
     * Registered: The device has registered with Pelion Device Management. [Device commands](https://www.pelion.com/docs/device-management-api/connect/) can be queued. The device sends events for [subscribed](https://www.pelion.com/docs/device-management/current/resources/handle-resource-webapp.html) resources.
     * Deregistered: The device has requested deregistration, or its registration has expired.
     */
    state?: DeviceState;

    /**
     *Is the device suspended by the system?
     */
    readonly systemSuspended?: boolean;

    /**
     *The time this data object was updated.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;

    /**
     *The device vendor ID.
     *@example 00000000-0000-0000-0000-000000000000
     */
    vendorId?: string;
}

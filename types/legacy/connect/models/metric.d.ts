/**
 * Metric
 */
export declare class Metric {
    /**
     * The ID of the metric
     */
    readonly id: string;
    /**
     * UTC time in RFC3339 format. The timestamp is the starting point of the interval for which the data is aggregated. Each interval includes data for the time greater than or equal to the timestamp and less than the next interval's starting point.
     */
    readonly timestamp?: Date;
    /**
     * The number of successful TLS handshakes the account has performed. The SSL or TLS handshake enables the SSL or TLS client and server to establish the secret keys with which they communicate. A successful TLS handshake is required for establishing a connection with Pelion Device Management Connect for any operaton such as registration, registration update and deregistration.
     */
    readonly handshakes?: number;
    /**
     * The number of transaction events from or to devices linked to the account. A transaction is a 512-byte block of data processed by Pelion Device Management. It can be either sent by the device (device --> Pelion Device Management) or received by the device (Pelion Device Management --> device). A transaction does not include IP, TCP or UDP, TLS or DTLS packet overhead. It only contains the packet payload (full CoAP packet including CoAP headers).
     */
    readonly transactions?: number;
    /**
     * The number of observations received by Pelion Device Management Connect from the devices linked to the account. The observations are pushed from the device to Pelion Device Management Connect when you have successfully subscribed to the device resources using Connect API endpoints.
     */
    readonly observations?: number;
    /**
     * The number of successful requests the account has performed.
     */
    readonly successfulApiCalls?: number;
    /**
     * The number of failed requests the account has performed.
     */
    readonly failedApiCalls?: number;
    /**
     * The number of successful proxy requests from Pelion Device Management Connect to devices linked to the account. The proxy requests are made from Pelion Device Management Connect to devices when you try to read or write values to device resources using Connect API endpoints.
     */
    readonly successfulProxyRequests?: number;
    /**
     * The number of failed proxy requests from Pelion Device Management Connect to devices linked to the account. The proxy requests are made from Pelion Device Management Connect to devices when you try to read or write values to device resources using Connect API endpoints.
     */
    readonly failedProxyRequests?: number;
    /**
     * The number of successful subscription requests from Pelion Device Management Connect to devices linked to the account. The subscription requests are made from Pelion Device Management Connect to devices when you try to subscribe to a resource path using Connect API endpoints.
     */
    readonly successfulSubscriptionRequests?: number;
    /**
     * The number of failed subscription requests from Pelion Device Management Connect to devices linked to the account. The subscription requests are made from Pelion Device Management Connect to devices when you try to subscribe to a resource path using Connect API endpoints.
     */
    readonly failedSubscriptionRequests?: number;
    /**
     * The number of successful bootstraps the account has performed. Bootstrap is the process of provisioning a Lightweight Machine to Machine Client to a state where it can initiate a management session to a new Lightweight Machine to Machine Server.
     */
    readonly successfulBootstraps?: number;
    /**
     * The number of failed bootstraps the account has performed. Bootstrap is the process of provisioning a Lightweight Machine to Machine Client to a state where it can initiate a management session to a new Lightweight Machine to Machine Server.
     */
    readonly failedBootstraps?: number;
    /**
     * The number of pending bootstraps the account has performed. Bootstrap is the process of provisioning a Lightweight Machine to Machine Client to a state where it can initiate a management session to a new Lightweight Machine to Machine Server.
     */
    readonly pendingBootstraps?: number;
    /**
     * The number of full registrations linked to the account. Full registration is the process of registering a device with the Pelion Device Management Connect by providing its lifetime and capabilities such as the resource structure. The registered status of the device does not guarantee that the device is active and accessible from Mebd Cloud Connect at any point of time.
     */
    readonly fullRegistrations?: number;
    /**
     * The number of registration updates linked to the account. Registration update is the process of updating the registration status with the Pelion Device Management Connect to update or extend the lifetime of the device.
     */
    readonly updatedRegistrations?: number;
    /**
     * The number of expired registrations linked to the account. Pelion Device Management Connect removes the device registrations when the devices cannot update their registration before the expiry of the lifetime. Pelion Device Management Connect no longer handles requests for a device whose registration has expired already.
     */
    readonly expiredRegistrations?: number;
    /**
     * The number of deleted registrations (deregistrations) linked to the account. Deregistration is the process of removing the device registration from the Pelion Device Management Connect registry. The deregistration is usually initiated by the device. Pelion Device Management Connect no longer handles requests for a deregistered device.
     */
    readonly deletedRegistrations?: number;
    constructor(init?: Partial<Metric>);
}

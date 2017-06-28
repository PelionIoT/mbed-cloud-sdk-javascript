/**
 * Metric
 */
export declare class Metric {
    /**
     * The ID of the metric
     */
    readonly id: string;
    /**
     * UTC time in RFC3339 format
     */
    readonly timestamp?: Date;
    /**
     * Number of transaction events from devices linked to the account.
     */
    readonly transactions?: number;
    /**
     * Number of successful bootstraps the account has used.
     */
    readonly successfulDeviceRegistrations?: number;
    /**
     * Number of pending bootstraps the account has used.
     */
    readonly pendingDeviceRegistrations?: number;
    /**
     * Number of failed bootstraps the account has used.
     */
    readonly failedDeviceRegistrations?: number;
    /**
     * Number of successful device server REST API requests the account has used.
     */
    readonly successfulApiCalls?: number;
    /**
     * Number of failed device server REST API requests the account has used.
     */
    readonly failedApiCalls?: number;
    /**
     * Number of successful handshakes the account has used.
     */
    readonly successfulHandshakes?: number;
    /**
     * Number of failed handshakes the account has used.
     */
    readonly failedHandshakes?: number;
    /**
     * Maximum number of registered devices linked to the account.
     */
    readonly registeredDevices?: number;
    constructor(init?: Partial<Metric>);
}

/**
 * Possible types of the event log
 */
export declare type EventTypeEnum = "update.device.device-created" | "update.device.device-updated" | "update.deployment.campaign-device-metadata-created" | "update.deployment.campaign-device-metadata-updated" | "update.deployment.campaign-device-metadata-removed" | "update.connector.connector-device.firmware-update.state" | "update.connector.connector-device.firmware-update.result";
/**
 * Device log data structure
 */
export interface DeviceLogType {
    /**
     * Date and time of the event
     */
    eventDate: Date;
    /**
     * Whether the event changed state
     */
    stateChanged?: boolean;
    /**
     * Description of the event
     */
    description?: string;
    /**
     * Changes made
     */
    changes?: string;
    /**
     * Description of the event type
     */
    eventTypeDescription?: string;
    /**
     * ID of the event log entry
     */
    logId?: string;
    /**
     * Type of the event
     */
    eventType?: EventTypeEnum;
    /**
     * Data pertaining to the event
     */
    data?: string;
    /**
     * Device ID related to the event
     */
    deviceId?: string;
}

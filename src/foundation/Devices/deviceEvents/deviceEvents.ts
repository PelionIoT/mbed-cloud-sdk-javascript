import { Entity } from "../../../common/entity";
/**
 *DeviceEvents
 */
export interface DeviceEvents extends Entity {
    /**
     *changes
     */
    readonly changes?: { [key: string]: string };

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *data
     */
    readonly data?: { [key: string]: string };

    /**
     *dateTime
     */
    readonly dateTime?: Date;

    /**
     *description
     */
    readonly description?: string;

    /**
     *deviceId
     */
    readonly deviceId?: string;

    /**
     *eventType
     */
    readonly eventType?: string;

    /**
     *eventTypeCategory
     */
    readonly eventTypeCategory?: string;

    /**
     *eventTypeDescription
     */
    readonly eventTypeDescription?: string;

    /**
     *stateChange
     */
    readonly stateChange?: boolean;
}

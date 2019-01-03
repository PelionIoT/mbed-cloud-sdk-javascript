import { Entity } from "../../../common/entity";
/**
 *DeviceEvents
 */
export interface DeviceEvents extends Entity {
    /**
     *changes
     */
    changes?: { [key: string]: string };

    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *data
     */
    data?: { [key: string]: string };

    /**
     *dateTime
     */
    dateTime?: Date;

    /**
     *description
     */
    description?: string;

    /**
     *deviceId
     */
    deviceId?: string;

    /**
     *eventType
     */
    eventType?: string;

    /**
     *eventTypeCategory
     */
    eventTypeCategory?: string;

    /**
     *eventTypeDescription
     */
    eventTypeDescription?: string;

    /**
     *id
     */
    id?: string;

    /**
     *stateChange
     */
    stateChange?: boolean;
}

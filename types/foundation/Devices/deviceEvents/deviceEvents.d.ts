import { Entity } from "../../../common/entity";
/**
 *DeviceEvents
 */
export interface DeviceEvents extends Entity {
    /**
     *changes
     *@example
     */
    readonly changes?: {
        [key: string]: string;
    };
    /**
     *createdAt
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;
    /**
     *Additional data relevant to the event.
     *@example [object Object]
     */
    readonly data?: {
        [key: string]: string;
    };
    /**
     *dateTime
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly dateTime?: Date;
    /**
     *description
     *@example Device record created
     */
    readonly description?: string;
    /**
     *deviceId
     *@example 00000000000000000000000000000000
     */
    readonly deviceId?: string;
    /**
     *Event code
     *@example UPD2_100
     */
    readonly eventType?: string;
    /**
     *Category code which groups the event type by a summary category.
     *@example FAIL_MANIFEST_REJECTED
     */
    readonly eventTypeCategory?: string;
    /**
     *Generic description of the event
     *@example FAIL
     */
    readonly eventTypeDescription?: string;
    /**
     *stateChange
     */
    readonly stateChange?: boolean;
}

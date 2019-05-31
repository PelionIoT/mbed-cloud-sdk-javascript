import { Entity } from "../../../common/entity";
/**
 *DeviceGroup
 */
export interface DeviceGroup extends Entity {
    /**
     *The time the campaign was created.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;

    /**
     *Up to ten custom key-value attributes. Keys cannot begin with a number. Both key and value are limited to 128 characters. Updating this field replaces existing contents.
     *@example [object Object]
     */
    customAttributes?: { [key: string]: string };

    /**
     *The description of the group.
     *@example Devices on the factory floor.
     */
    description?: string;

    /**
     *The number of devices in this group.
     *@example 10
     */
    readonly devicesCount?: number;

    /**
     *Name of the group.
     *@example My devices
     */
    name?: string;

    /**
     *The time the object was updated.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;
}

import { Entity } from "../../../common/entity";
/**
 *DeviceGroup
 */
export interface DeviceGroup extends Entity {
    /**
*Up to ten component key-value attributes. The key represents the component name, while its value represents the corresponding component version.
Keys cannot begin with a number. Both key and value are limited to 128 characters. Updating this field replaces existing contents.
Component name must be the same as in device Component Name resource.
Component version must comply to semantic versioning. Maximum 3 digits per sub number, therefore max version number will be 999.999.999
*@example [object Object]
*/
    componentAttributes?: { [key: string]: string };

    /**
     *The time the group was created.
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
     *The time this object was updated.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;
}

import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { Device } from "../../index";
import { DeviceGroup } from "./deviceGroup";
import { DeviceGroupCreateRequest } from "./types";
import { DeviceGroupListOptions } from "./types";
import { DeviceGroupRemoveDeviceRequest } from "./types";
import { DeviceGroupUpdateRequest } from "./types";
import { DeviceGroupAddDeviceRequest } from "./types";
import { DeviceGroupDeviceListOptions } from "./types";
/**
 *DeviceGroup repository
 */
export declare class DeviceGroupRepository extends Repository {
    /**
     * addDevice
     * @param request - The entity to perform action on.
     * @param id - The ID of the group.
     */
    addDevice(request: DeviceGroupAddDeviceRequest, id: string): Promise<void>;
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: DeviceGroupCreateRequest): Promise<DeviceGroup>;
    /**
     * delete
     * @param id - The ID of the group.
     */
    delete(id: string): Promise<void>;
    /**
     * devices
     * @param id - id
     * @param options - Options to use for the List
     */
    devices(id: string, options?: DeviceGroupDeviceListOptions): Paginator<Device, ListOptions>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: DeviceGroupListOptions): Paginator<DeviceGroup, ListOptions>;
    /**
     * read
     * @param id - The group ID.
     */
    read(id: string): Promise<DeviceGroup>;
    /**
     * removeDevice
     * @param request - The entity to perform action on.
     * @param id - The ID of the group.
     */
    removeDevice(request: DeviceGroupRemoveDeviceRequest, id: string): Promise<void>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The group ID.
     */
    update(request: DeviceGroupUpdateRequest, id: string): Promise<DeviceGroup>;
}

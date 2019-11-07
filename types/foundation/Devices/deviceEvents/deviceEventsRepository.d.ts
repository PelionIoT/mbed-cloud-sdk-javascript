import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { DeviceEvents } from "./deviceEvents";
import { DeviceEventsListOptions } from "./types";
/**
 *DeviceEvents repository
 */
export declare class DeviceEventsRepository extends Repository {
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: DeviceEventsListOptions): Paginator<DeviceEvents, ListOptions>;
    /**
     * read
     * @param id - id
     */
    read(id: string): Promise<DeviceEvents>;
}

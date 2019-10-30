import { Repository } from "../../../common/repository";
import { DeviceEvents } from "./deviceEvents";
import { DeviceEventsListOptions } from "./types";
import { Paginator } from "../../../index";
import { ListOptions } from "../../../common";
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

import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DeviceEvents } from "./deviceEvents";
import { extractFilter } from "../../../common/filters";
import { DeviceEventsListOptions } from "./types";
import { DeviceEventsAdapter } from "../../index";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *DeviceEvents repository
 */
export class DeviceEventsRepository extends Repository {
    /**
     * list
     * @param options - Options to use for the List
     */
    public list(options?: DeviceEventsListOptions): Paginator<DeviceEvents, ListOptions> {
        const pageFunc = (pageOptions: DeviceEventsListOptions): Promise<Page<DeviceEvents>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/device-events/",
                            method: "GET",
                            query: {
                                date_time__in: extractFilter(pageOptions.filter, "dateTime", "in"),
                                date_time__nin: extractFilter(pageOptions.filter, "dateTime", "nin"),
                                date_time__lte: extractFilter(pageOptions.filter, "dateTime", "lte"),
                                date_time__gte: extractFilter(pageOptions.filter, "dateTime", "gte"),
                                description__eq: extractFilter(pageOptions.filter, "description", "eq"),
                                description__neq: extractFilter(pageOptions.filter, "description", "neq"),
                                description__in: extractFilter(pageOptions.filter, "description", "in"),
                                description__nin: extractFilter(pageOptions.filter, "description", "nin"),
                                id__eq: extractFilter(pageOptions.filter, "id", "eq"),
                                id__neq: extractFilter(pageOptions.filter, "id", "neq"),
                                id__in: extractFilter(pageOptions.filter, "id", "in"),
                                id__nin: extractFilter(pageOptions.filter, "id", "nin"),
                                device_id__eq: extractFilter(pageOptions.filter, "deviceId", "eq"),
                                device_id__neq: extractFilter(pageOptions.filter, "deviceId", "neq"),
                                device_id__in: extractFilter(pageOptions.filter, "deviceId", "in"),
                                device_id__nin: extractFilter(pageOptions.filter, "deviceId", "nin"),
                                event_type__eq: extractFilter(pageOptions.filter, "eventType", "eq"),
                                event_type__neq: extractFilter(pageOptions.filter, "eventType", "neq"),
                                event_type__in: extractFilter(pageOptions.filter, "eventType", "in"),
                                event_type__nin: extractFilter(pageOptions.filter, "eventType", "nin"),
                                state_change__eq: extractFilter(pageOptions.filter, "stateChange", "eq"),
                                state_change__neq: extractFilter(pageOptions.filter, "stateChange", "neq"),
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<DeviceEvents>, done) => {
                    done(null, new Page(data, data.data, DeviceEventsAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - id
     */
    public read(id: string): Promise<DeviceEvents> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-events/{device_event_id}/",
                        method: "GET",
                        pathParams: {
                            device_event_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceEventsAdapter.fromApi(data));
            }
        );
    }
}

import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { DeviceEvents } from "./deviceEvents";
import { DeviceEventsAdapter } from "../../index";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
/**
 *DeviceEvents repository
 */
export class DeviceEventsRepository extends Repository {
    public get(id: string): Promise<DeviceEvents> {
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
    public list(options: ListOptions): Paginator<DeviceEvents, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DeviceEvents>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/device-events/",
                            method: "GET",
                            query: {
                                after: options.after,
                                include: options.include,
                                limit: options.limit,
                                order: options.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<DeviceEvents>, done) => {
                    done(null, new ListResponse(data, data.data, DeviceEventsAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}

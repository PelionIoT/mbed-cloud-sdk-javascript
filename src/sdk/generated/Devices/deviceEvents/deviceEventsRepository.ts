import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../legacy/common/functions";
import { DeviceEvents } from "./deviceEvents";
import { DeviceEventsAdapter } from "../../index";
import { Paginator } from "../../../../legacy/common/pagination";
import { ListResponse } from "../../../../legacy/common/listResponse";
import { ListOptions } from "../../../../legacy/common/interfaces";
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
    public list(options?: ListOptions): Paginator<DeviceEvents, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DeviceEvents>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/device-events/",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
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

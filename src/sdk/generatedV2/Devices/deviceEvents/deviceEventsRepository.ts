import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { DeviceEvents } from "./deviceEvents";
import { DeviceEventsAdapter } from "./deviceEventsAdapter";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions, OrderEnum } from "../../../../common/interfaces";
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
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public list(options?: {
        after?: string;
        include?: string;
        limit?: number;
        order?: OrderEnum;
    }): Paginator<DeviceEvents, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DeviceEvents>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi(
                        {
                            url: "/v3/device-events/",
                            method: "GET",
                            query: { after, include, order, limit },
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

import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";

import { CrudEntity } from "../../../common/crudEntity";

/**
 * DeviceEvents
 */
export class DeviceEvents extends EntityBase implements CrudEntity<DeviceEvents> {
    /**
     * Additional data relevant to the event.
     */
    public changes?: { [key: string]: string };

    /**
     * created_at
     */
    public createdAt?: Date;

    /**
     * data
     */
    public data?: any;

    /**
     * date_time
     */
    public dateTime?: Date;

    /**
     * description
     */
    public description?: string;

    /**
     * device_id
     */
    public deviceId?: string;

    /**
     * Event code
     */
    public eventType?: string;

    /**
     * Category code which groups the event type by a summary category.
     */
    public eventTypeCategory?: string;

    /**
     * Generic description of the event
     */
    public eventTypeDescription?: string;

    /**
     * state_change
     */
    public stateChange?: boolean;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * gets a DeviceEvents.
     * @returns Promise containing DeviceEvents.
     */
    public get(): Promise<DeviceEvents> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeviceEvents>(
                    {
                        url: "/v3/device-events/{device_event_id}/",
                        method: "GET",
                        pathParams: {
                            device_event_id: this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List DeviceEventss
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<DeviceEvents, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DeviceEvents>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<DeviceEvents>(
                        {
                            url: "/v3/device-events/",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        DeviceEvents,
                        resultsFn
                    );
                },
                (data: ListResponse<DeviceEvents>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}

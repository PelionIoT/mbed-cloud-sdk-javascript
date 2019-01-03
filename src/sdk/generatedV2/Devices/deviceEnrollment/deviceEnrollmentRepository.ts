import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { DeviceEnrollment } from "./deviceEnrollment";
import { DeviceEnrollmentCreateRequest } from "./types";
import { DeviceEnrollmentAdapter } from "./deviceEnrollmentAdapter";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions, OrderEnum } from "../../../../common/interfaces";
/**
 *DeviceEnrollment repository
 */
export class DeviceEnrollmentRepository extends Repository {
    public create(request: DeviceEnrollmentCreateRequest): Promise<DeviceEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments",
                        method: "POST",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments/{id}",
                        method: "DELETE",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(id: string): Promise<DeviceEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments/{id}",
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
    }): Paginator<DeviceEnrollment, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DeviceEnrollment>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi(
                        {
                            url: "/v3/device-enrollments",
                            method: "GET",
                            query: { after, include, order, limit },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<DeviceEnrollment>, done) => {
                    done(null, new ListResponse(data, data.data, DeviceEnrollmentAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}

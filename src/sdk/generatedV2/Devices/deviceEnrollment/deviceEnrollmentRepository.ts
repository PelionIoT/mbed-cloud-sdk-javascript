import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { DeviceEnrollment } from "./deviceEnrollment";
import { DeviceEnrollmentAdapter } from "../../index";
import { DeviceEnrollmentCreateRequest } from "./types";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
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
                        body: {
                            enrollment_identity: request.enrollmentIdentity,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceEnrollmentAdapter.fromApi(data));
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
                        pathParams: {
                            id: id,
                        },
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
                        pathParams: {
                            id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceEnrollmentAdapter.fromApi(data));
            }
        );
    }
    public list(options: ListOptions): Paginator<DeviceEnrollment, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DeviceEnrollment>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/device-enrollments",
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

import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../legacy/common/functions";
import { DeviceEnrollment } from "./deviceEnrollment";
import { DeviceEnrollmentAdapter } from "../../index";
import { DeviceEnrollmentCreateRequest } from "./types";
import { Paginator } from "../../../../legacy/common/pagination";
import { ListResponse } from "../../../../legacy/common/listResponse";
import { ListOptions } from "../../../../legacy/common/interfaces";
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
                done(null, DeviceEnrollmentAdapter.fromApi(data, request));
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
    public list(options?: ListOptions): Paginator<DeviceEnrollment, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DeviceEnrollment>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/device-enrollments",
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
                (data: ListResponse<DeviceEnrollment>, done) => {
                    done(null, new ListResponse(data, data.data, DeviceEnrollmentAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public read(id: string): Promise<DeviceEnrollment> {
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
}

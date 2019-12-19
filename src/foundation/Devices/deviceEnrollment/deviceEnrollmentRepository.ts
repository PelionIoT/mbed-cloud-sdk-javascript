import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DeviceEnrollment } from "./deviceEnrollment";
import { DeviceEnrollmentAdapter } from "../../index";
import { DeviceEnrollmentCreateRequest } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *DeviceEnrollment repository
 */
export class DeviceEnrollmentRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
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
    /**
     * delete
     * @param id - Enrollment identity.
     */
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
    /**
     * list
     * @param options - options
     */
    public list(options?: ListOptions): Paginator<DeviceEnrollment, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<DeviceEnrollment>> => {
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
                (data: Page<DeviceEnrollment>, done) => {
                    done(null, new Page(data, data.data, DeviceEnrollmentAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - Enrollment identity.
     */
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

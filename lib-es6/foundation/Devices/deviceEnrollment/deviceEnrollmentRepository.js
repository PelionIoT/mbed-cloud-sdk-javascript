import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DeviceEnrollmentAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *DeviceEnrollment repository
 */
export class DeviceEnrollmentRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/device-enrollments",
                method: "POST",
                body: {
                    enrollment_identity: request.enrollmentIdentity,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, DeviceEnrollmentAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param id - Enrollment identity.
     */
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/device-enrollments/{id}",
                method: "DELETE",
                pathParams: {
                    id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * list
     * @param options - options
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/device-enrollments",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, DeviceEnrollmentAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - Enrollment identity.
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/device-enrollments/{id}",
                method: "GET",
                pathParams: {
                    id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, DeviceEnrollmentAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=deviceEnrollmentRepository.js.map
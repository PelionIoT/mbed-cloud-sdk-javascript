import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { DeviceEnrollment } from "./deviceEnrollment";
import { DeviceEnrollmentCreateRequest } from "./types";
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
}

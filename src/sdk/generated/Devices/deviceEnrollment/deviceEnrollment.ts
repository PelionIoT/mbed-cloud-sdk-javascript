import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";

/**
 * DeviceEnrollment
 */
export class DeviceEnrollment extends EntityBase {
    /**
     * ID
     */
    public accountId?: string;

    /**
     * The time of claiming the device to be assigned to the account.
     */
    public claimedAt?: Date;

    /**
     * The time of the enrollment identity creation.
     */
    public createdAt?: Date;

    /**
     * The ID of the device in the Device Directory once it has been registered.
     */
    public enrolledDeviceId?: string;

    /**
     * Enrollment identity.
     */
    public enrollmentIdentity?: string;

    /**
     * The enrollment claim expiration time. If the device does not connect to Mbed Cloud before the expiration, the claim is removed without a separate notice
     */
    public expiresAt?: Date;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a DeviceEnrollment.
     * @returns Promise containing DeviceEnrollment.
     */
    public create(): Promise<DeviceEnrollment> {
        const body = {
            enrollment_identity: this.enrollmentIdentity,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeviceEnrollment>(
                    {
                        url: "/v3/device-enrollments",
                        method: "POST",
                        body: body,
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
     * deletes a DeviceEnrollment.
     * @returns Promise containing DeviceEnrollment.
     */
    public delete(): Promise<DeviceEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeviceEnrollment>(
                    {
                        url: "/v3/device-enrollments/{id}",
                        method: "DELETE",
                        pathParams: {
                            id: this.id,
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
     * gets a DeviceEnrollment.
     * @returns Promise containing DeviceEnrollment.
     */
    public get(): Promise<DeviceEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeviceEnrollment>(
                    {
                        url: "/v3/device-enrollments/{id}",
                        method: "GET",
                        pathParams: {
                            id: this.id,
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
     * List DeviceEnrollments
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<DeviceEnrollment, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DeviceEnrollment>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<DeviceEnrollment>(
                        {
                            url: "/v3/device-enrollments",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        DeviceEnrollment,
                        resultsFn
                    );
                },
                (data: ListResponse<DeviceEnrollment>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }
}

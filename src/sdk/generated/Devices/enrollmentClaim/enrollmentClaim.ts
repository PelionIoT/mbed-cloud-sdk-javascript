import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";

/**
 * EnrollmentClaim
 */
export class EnrollmentClaim extends EntityBase {
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
     * The enrollment claim expiration time. If the device does not connect to Device Management before the expiration, the claim is removed without a separate notice
     */
    public expiresAt?: Date;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a EnrollmentClaim.
     * @returns Promise containing EnrollmentClaim.
     */
    public create(): Promise<EnrollmentClaim> {
        const body = {
            enrollment_identity: this.enrollmentIdentity,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<EnrollmentClaim>(
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
     * deletes a EnrollmentClaim.
     * @returns Promise containing EnrollmentClaim.
     */
    public delete(): Promise<EnrollmentClaim> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<EnrollmentClaim>(
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
     * gets a EnrollmentClaim.
     * @returns Promise containing EnrollmentClaim.
     */
    public get(): Promise<EnrollmentClaim> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<EnrollmentClaim>(
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
     * List EnrollmentClaims
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<EnrollmentClaim, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<EnrollmentClaim>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<EnrollmentClaim>(
                        {
                            url: "/v3/device-enrollments",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        new EnrollmentClaim(),
                        resultsFn
                    );
                },
                (data: ListResponse<EnrollmentClaim>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }
}

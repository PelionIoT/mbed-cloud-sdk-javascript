import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { CertificateEnrollmentEnrollResultEnum } from "../../enums";
import { CertificateEnrollmentEnrollStatusEnum } from "../../enums";

/**
 * CertificateEnrollment
 */
export class CertificateEnrollment extends EntityBase {
    /**
     * The certificate name.
     */
    public certificateName?: string;

    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * The device ID.
     */
    public deviceId?: string;

    /**
     * enroll_result
     */
    public enrollResult?: CertificateEnrollmentEnrollResultEnum;

    /**
     * enroll_status
     */
    public enrollStatus?: CertificateEnrollmentEnrollStatusEnum;

    /**
     * Update UTC time RFC3339.
     */
    public updatedAt?: Date;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * gets a CertificateEnrollment.
     * @returns Promise containing CertificateEnrollment.
     */
    public get(): Promise<CertificateEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateEnrollment>(
                    {
                        url: "/v3/certificate-enrollments/{certificate-enrollment-id}",
                        method: "GET",
                        pathParams: {
                            "certificate-enrollment-id": this.id,
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
     * List CertificateEnrollments
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<CertificateEnrollment, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<CertificateEnrollment>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<CertificateEnrollment>(
                        {
                            url: "/v3/certificate-enrollments",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        CertificateEnrollment,
                        resultsFn
                    );
                },
                (data: ListResponse<CertificateEnrollment>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}

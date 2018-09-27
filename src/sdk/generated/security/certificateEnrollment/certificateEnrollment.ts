import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";

/**
 * CertificateEnrollment
 */
export class CertificateEnrollment extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
        "certificate-enrollment-id": "certificateEnrollmentId",
    };

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
    public enrollResult?: string;

    /**
     * enroll_status
     */
    public enrollStatus?: string;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * gets a CertificateEnrollment.
     * @returns Promise containing CertificateEnrollment.
     */
    public get(certificateEnrollmentId: string): Promise<CertificateEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateEnrollment>(
                    {
                        url: "/v3/certificate-enrollments/{certificate-enrollment-id}",
                        method: "GET",
                        pathParams: {
                            "certificate-enrollment-id": certificateEnrollmentId,
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
                        new CertificateEnrollment(),
                        resultsFn
                    );
                },
                (data: ListResponse<CertificateEnrollment>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }
}

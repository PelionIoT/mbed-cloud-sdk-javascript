import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { CertificateEnrollment } from "./certificateEnrollment";
import { CertificateEnrollmentAdapter } from "../../index";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
/**
 *CertificateEnrollment repository
 */
export class CertificateEnrollmentRepository extends Repository {
    public get(id: string): Promise<CertificateEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-enrollments/{certificate-enrollment-id}",
                        method: "GET",
                        pathParams: {
                            "certificate-enrollment-id": id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CertificateEnrollmentAdapter.fromApi(data));
            }
        );
    }
    public list(options?: ListOptions): Paginator<CertificateEnrollment, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<CertificateEnrollment>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/certificate-enrollments",
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
                (data: ListResponse<CertificateEnrollment>, done) => {
                    done(null, new ListResponse(data, data.data, CertificateEnrollmentAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}

import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { CertificateEnrollment } from "./certificateEnrollment";
import { extractFilter } from "../../../common/filters";
import { CertificateEnrollmentCertificateEnrollmentListOptions } from "./types";
import { CertificateEnrollmentAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *CertificateEnrollment repository
 */
export class CertificateEnrollmentRepository extends Repository {
    /**
     * list
     * @param options - Options to use for the List
     */
    public list(
        options?: CertificateEnrollmentCertificateEnrollmentListOptions
    ): Paginator<CertificateEnrollment, ListOptions> {
        const pageFunc = (
            pageOptions: CertificateEnrollmentCertificateEnrollmentListOptions
        ): Promise<ListResponse<CertificateEnrollment>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/certificate-enrollments",
                            method: "GET",
                            query: {
                                device_id__eq: extractFilter(pageOptions.filter, "deviceId", "eq"),
                                certificate_name__eq: extractFilter(pageOptions.filter, "certificateName", "eq"),
                                enroll_status__neq: extractFilter(pageOptions.filter, "enrollStatus", "neq"),
                                enroll_status__eq: extractFilter(pageOptions.filter, "enrollStatus", "eq"),
                                enroll_result__neq: extractFilter(pageOptions.filter, "enrollResult", "neq"),
                                enroll_result__eq: extractFilter(pageOptions.filter, "enrollResult", "eq"),
                                created_at__lte: extractFilter(pageOptions.filter, "createdAt", "lte"),
                                created_at__gte: extractFilter(pageOptions.filter, "createdAt", "gte"),
                                updated_at__lte: extractFilter(pageOptions.filter, "updatedAt", "lte"),
                                updated_at__gte: extractFilter(pageOptions.filter, "updatedAt", "gte"),
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
    /**
     * read
     * @param id - The certificate enrollment ID.
     */
    public read(id: string): Promise<CertificateEnrollment> {
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
}

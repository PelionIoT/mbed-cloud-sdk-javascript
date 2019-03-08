import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { CertificateEnrollment } from "./certificateEnrollment";
import { extractFilter } from "../../../common/filters";
import { CertificateEnrollmentListOptions } from "./types";
import { CertificateEnrollmentAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *CertificateEnrollment repository
 */
export class CertificateEnrollmentRepository extends Repository {
    public list(options?: CertificateEnrollmentListOptions): Paginator<CertificateEnrollment, ListOptions> {
        const pageFunc = (
            pageOptions: CertificateEnrollmentListOptions
        ): Promise<ListResponse<CertificateEnrollment>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/certificate-enrollments",
                            method: "GET",
                            query: {
                                device_id__eq: extractFilter(options.filter, "device_id", "eq"),
                                certificate_name__eq: extractFilter(options.filter, "certificate_name", "eq"),
                                enroll_status__neq: extractFilter(options.filter, "enroll_status", "neq"),
                                enroll_status__eq: extractFilter(options.filter, "enroll_status", "eq"),
                                enroll_result__neq: extractFilter(options.filter, "enroll_result", "neq"),
                                enroll_result__eq: extractFilter(options.filter, "enroll_result", "eq"),
                                created_at__lte: extractFilter(options.filter, "created_at", "lte"),
                                created_at__gte: extractFilter(options.filter, "created_at", "gte"),
                                updated_at__lte: extractFilter(options.filter, "updated_at", "lte"),
                                updated_at__gte: extractFilter(options.filter, "updated_at", "gte"),
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

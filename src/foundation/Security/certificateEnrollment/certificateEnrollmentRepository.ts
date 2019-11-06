import { ListOptions } from "../../../common";
import { extractFilter } from "../../../common/filters";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { CertificateEnrollmentAdapter } from "../../index";
import { CertificateEnrollment } from "./certificateEnrollment";
import { CertificateEnrollmentListOptions } from "./types";
/**
 *CertificateEnrollment repository
 */
export class CertificateEnrollmentRepository extends Repository {
    /**
     * list
     * @param options - Options to use for the List
     */
    public list(options?: CertificateEnrollmentListOptions): Paginator<CertificateEnrollment, ListOptions> {
        const pageFunc = (pageOptions: CertificateEnrollmentListOptions): Promise<Page<CertificateEnrollment>> => {
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
                (data: Page<CertificateEnrollment>, done) => {
                    done(null, new Page(data, data.data, CertificateEnrollmentAdapter.fromApi, pageOptions));
                },
                null
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

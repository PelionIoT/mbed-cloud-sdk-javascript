import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { TrustedCertificateAdapter } from "../../index";
import { DeveloperCertificateAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *TrustedCertificate repository
 */
export class TrustedCertificateRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/trusted-certificates",
                method: "POST",
                body: {
                    certificate: request.certificate,
                    description: request.description,
                    enrollment_mode: request.enrollmentMode,
                    name: request.name,
                    service: request.service,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, TrustedCertificateAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param id - The ID of the trusted certificate to delete.
     */
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/trusted-certificates/{cert_id}",
                method: "DELETE",
                pathParams: {
                    cert_id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * getDeveloperCertificateInfo
     * @param id - ID that uniquely identifies the developer certificate.
     */
    getDeveloperCertificateInfo(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/developer-certificates/{developerCertificateId}",
                method: "GET",
                pathParams: {
                    developerCertificateId: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, DeveloperCertificateAdapter.fromApi(data));
        });
    }
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/trusted-certificates",
                    method: "GET",
                    query: {
                        name__eq: extractFilter(pageOptions.filter, "name", "eq"),
                        service__eq: extractFilter(pageOptions.filter, "service", "eq"),
                        expire__eq: extractFilter(pageOptions.filter, "expire", "eq"),
                        device_execution_mode__eq: extractFilter(pageOptions.filter, "deviceExecutionMode", "eq"),
                        device_execution_mode__neq: extractFilter(pageOptions.filter, "deviceExecutionMode", "neq"),
                        owner__eq: extractFilter(pageOptions.filter, "owner", "eq"),
                        enrollment_mode__eq: extractFilter(pageOptions.filter, "enrollmentMode", "eq"),
                        status__eq: extractFilter(pageOptions.filter, "status", "eq"),
                        issuer__like: extractFilter(pageOptions.filter, "issuer", "like"),
                        subject__like: extractFilter(pageOptions.filter, "subject", "like"),
                        valid__eq: extractFilter(pageOptions.filter, "valid", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, TrustedCertificateAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - Entity ID.
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/trusted-certificates/{cert_id}",
                method: "GET",
                pathParams: {
                    cert_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, TrustedCertificateAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     */
    update(request, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/trusted-certificates/{cert_id}",
                method: "PUT",
                pathParams: {
                    cert_id: id,
                },
                body: {
                    certificate: request.certificate,
                    description: request.description,
                    enrollment_mode: request.enrollmentMode,
                    name: request.name,
                    service: request.service,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, TrustedCertificateAdapter.fromApi(data, request));
        });
    }
}
//# sourceMappingURL=trustedCertificateRepository.js.map
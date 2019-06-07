import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { CertificateIssuerConfigAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *CertificateIssuerConfig repository
 */
export class CertificateIssuerConfigRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuer-configurations",
                method: "POST",
                body: {
                    certificate_issuer_id: request.certificateIssuerId,
                    reference: request.reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, CertificateIssuerConfigAdapter.fromApi(data, request));
        });
    }
    /**
* delete
* @param id - The ID of the certificate issuer configuration.

*/
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                method: "DELETE",
                pathParams: {
                    "certificate-issuer-configuration-id": id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * getDefault
     */
    getDefault() {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuer-configurations/lwm2m",
                method: "GET",
            }, resultsFn);
        }, (data, done) => {
            done(null, CertificateIssuerConfigAdapter.fromApi(data));
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
                    url: "/v3/certificate-issuer-configurations",
                    method: "GET",
                    query: {
                        reference__eq: extractFilter(pageOptions.filter, "reference", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, CertificateIssuerConfigAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
* read
* @param id - The ID of the certificate issuer configuration.

*/
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                method: "GET",
                pathParams: {
                    "certificate-issuer-configuration-id": id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, CertificateIssuerConfigAdapter.fromApi(data));
        });
    }
    /**
* update
* @param request - The entity to perform action on.
* @param id - The ID of the certificate issuer configuration.

*/
    update(request, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                method: "PUT",
                pathParams: {
                    "certificate-issuer-configuration-id": id,
                },
                body: {
                    certificate_issuer_id: request.certificateIssuerId,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, CertificateIssuerConfigAdapter.fromApi(data, request));
        });
    }
}
//# sourceMappingURL=certificateIssuerConfigRepository.js.map
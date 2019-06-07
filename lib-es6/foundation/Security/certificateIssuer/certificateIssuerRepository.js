import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { CertificateIssuerAdapter } from "../../index";
import { VerificationResponseAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *CertificateIssuer repository
 */
export class CertificateIssuerRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuers",
                method: "POST",
                body: {
                    description: request.description,
                    issuer_attributes: request.issuerAttributes,
                    issuer_credentials: request.issuerCredentials,
                    issuer_type: request.issuerType,
                    name: request.name,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, CertificateIssuerAdapter.fromApi(data, request));
        });
    }
    /**
* delete
* @param id - Certificate issuer ID. <br> The ID of the certificate issuer.
An active certificate issuer may not be deleted.

*/
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuers/{certificate-issuer-id}",
                method: "DELETE",
                pathParams: {
                    "certificate-issuer-id": id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * list
     * @param options - options
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/certificate-issuers",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, CertificateIssuerAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The ID of the certificate issuer.
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuers/{certificate-issuer-id}",
                method: "GET",
                pathParams: {
                    "certificate-issuer-id": id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, CertificateIssuerAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the certificate issuer.
     */
    update(request, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuers/{certificate-issuer-id}",
                method: "PUT",
                pathParams: {
                    "certificate-issuer-id": id,
                },
                body: {
                    description: request.description,
                    issuer_attributes: request.issuerAttributes,
                    issuer_credentials: request.issuerCredentials,
                    name: request.name,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, CertificateIssuerAdapter.fromApi(data, request));
        });
    }
    /**
* verify
* @param id - Certificate issuer ID. <br> The ID of the certificate issuer.

*/
    verify(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/certificate-issuers/{certificate-issuer-id}/verify",
                method: "POST",
                pathParams: {
                    "certificate-issuer-id": id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, VerificationResponseAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=certificateIssuerRepository.js.map
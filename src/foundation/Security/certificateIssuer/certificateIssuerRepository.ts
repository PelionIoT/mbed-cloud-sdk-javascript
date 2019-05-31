import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { CertificateIssuer } from "./certificateIssuer";
import { CertificateIssuerAdapter } from "../../index";
import { CertificateIssuerCreateRequest } from "./types";
import { CertificateIssuerUpdateRequest } from "./types";
import { VerificationResponse } from "../../index";
import { VerificationResponseAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *CertificateIssuer repository
 */
export class CertificateIssuerRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    public create(request: CertificateIssuerCreateRequest): Promise<CertificateIssuer> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuers",
                        method: "POST",
                        body: {
                            description: request.description,
                            issuer_attributes: request.issuerAttributes,
                            issuer_credentials: request.issuerCredentials,
                            issuer_type: request.issuerType,
                            name: request.name,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CertificateIssuerAdapter.fromApi(data, request));
            }
        );
    }
    /**
* delete
* @param id - Certificate issuer ID.
An active certificate issuer cannot be deleted.
*/
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}",
                        method: "DELETE",
                        pathParams: {
                            "certificate-issuer-id": id,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    /**
     * list
     * @param options - options
     */
    public list(options?: ListOptions): Paginator<CertificateIssuer, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<CertificateIssuer>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/certificate-issuers",
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
                (data: ListResponse<CertificateIssuer>, done) => {
                    done(null, new ListResponse(data, data.data, CertificateIssuerAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - Certificate issuer ID.
     */
    public read(id: string): Promise<CertificateIssuer> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}",
                        method: "GET",
                        pathParams: {
                            "certificate-issuer-id": id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CertificateIssuerAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Certificate issuer ID.
     */
    public update(request: CertificateIssuerUpdateRequest, id: string): Promise<CertificateIssuer> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
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
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CertificateIssuerAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * verify
     * @param id - Certificate issuer ID.
     */
    public verify(id: string): Promise<VerificationResponse> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}/verify",
                        method: "POST",
                        pathParams: {
                            "certificate-issuer-id": id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, VerificationResponseAdapter.fromApi(data));
            }
        );
    }
}

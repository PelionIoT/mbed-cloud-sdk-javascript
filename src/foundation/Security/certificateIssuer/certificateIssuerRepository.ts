import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { CertificateIssuer } from "./certificateIssuer";
import { CertificateIssuerAdapter } from "../../index";
import { CertificateIssuerCreateRequest } from "./types";
import { CertificateIssuerUpdateRequest } from "./types";
import { VerificationResponse } from "../../index";
import { VerificationResponseAdapter } from "../../index";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
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
* @param id - Certificate issuer ID. <br> The ID of the certificate issuer.
An active certificate issuer may not be deleted.

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
        const pageFunc = (pageOptions: ListOptions): Promise<Page<CertificateIssuer>> => {
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
                (data: Page<CertificateIssuer>, done) => {
                    done(null, new Page(data, data.data, CertificateIssuerAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The ID of the certificate issuer.
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
     * @param id - The ID of the certificate issuer.
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
* @param id - Certificate issuer ID. <br> The ID of the certificate issuer.

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

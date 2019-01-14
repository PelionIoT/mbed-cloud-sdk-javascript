import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { CertificateIssuer } from "./certificateIssuer";
import { CertificateIssuerAdapter } from "../../index";
import { CertificateIssuerCreateRequest } from "./types";
import { CertificateIssuerUpdateRequest } from "./types";
import { VerificationResponse } from "../../index";
import { VerificationResponseAdapter } from "../../index";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
/**
 *CertificateIssuer repository
 */
export class CertificateIssuerRepository extends Repository {
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
    public get(id: string): Promise<CertificateIssuer> {
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

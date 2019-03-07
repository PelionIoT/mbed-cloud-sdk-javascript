import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { TrustedCertificate } from "./trustedCertificate";
import { TrustedCertificateAdapter } from "../../index";
import { TrustedCertificateCreateRequest } from "./types";
import { DeveloperCertificate } from "../../index";
import { DeveloperCertificateAdapter } from "../../index";
import { TrustedCertificateListOptions } from "./types";
import { TrustedCertificateUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *TrustedCertificate repository
 */
export class TrustedCertificateRepository extends Repository {
    public create(request: TrustedCertificateCreateRequest): Promise<TrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
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
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, TrustedCertificateAdapter.fromApi(data, request));
            }
        );
    }
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/trusted-certificates/{cert_id}",
                        method: "DELETE",
                        pathParams: {
                            cert_id: id,
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
    public getDeveloperCertificateInfo(id: string): Promise<DeveloperCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/developer-certificates/{developerCertificateId}",
                        method: "GET",
                        pathParams: {
                            developerCertificateId: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeveloperCertificateAdapter.fromApi(data));
            }
        );
    }
    public list(options?: TrustedCertificateListOptions): Paginator<TrustedCertificate, ListOptions> {
        const pageFunc = (pageOptions: TrustedCertificateListOptions): Promise<ListResponse<TrustedCertificate>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/trusted-certificates",
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
                (data: ListResponse<TrustedCertificate>, done) => {
                    done(null, new ListResponse(data, data.data, TrustedCertificateAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public read(id: string): Promise<TrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/trusted-certificates/{cert_id}",
                        method: "GET",
                        pathParams: {
                            cert_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, TrustedCertificateAdapter.fromApi(data));
            }
        );
    }
    public update(request: TrustedCertificateUpdateRequest, id: string): Promise<TrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
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
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, TrustedCertificateAdapter.fromApi(data, request));
            }
        );
    }
}

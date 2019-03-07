import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { CertificateIssuerConfig } from "./certificateIssuerConfig";
import { CertificateIssuerConfigAdapter } from "../../index";
import { CertificateIssuerConfigCreateRequest } from "./types";
import { CertificateIssuerConfigListOptions } from "./types";
import { CertificateIssuerConfigUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *CertificateIssuerConfig repository
 */
export class CertificateIssuerConfigRepository extends Repository {
    public create(request: CertificateIssuerConfigCreateRequest): Promise<CertificateIssuerConfig> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuer-configurations",
                        method: "POST",
                        body: {
                            certificate_issuer_id: request.certificateIssuerId,
                            reference: request.certificateReference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CertificateIssuerConfigAdapter.fromApi(data, request));
            }
        );
    }
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                        method: "DELETE",
                        pathParams: {
                            "certificate-issuer-configuration-id": id,
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
    public getDefault(): Promise<CertificateIssuerConfig> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuer-configurations/lwm2m",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CertificateIssuerConfigAdapter.fromApi(data));
            }
        );
    }
    public list(options?: CertificateIssuerConfigListOptions): Paginator<CertificateIssuerConfig, ListOptions> {
        const pageFunc = (
            pageOptions: CertificateIssuerConfigListOptions
        ): Promise<ListResponse<CertificateIssuerConfig>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/certificate-issuer-configurations",
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
                (data: ListResponse<CertificateIssuerConfig>, done) => {
                    done(null, new ListResponse(data, data.data, CertificateIssuerConfigAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public read(id: string): Promise<CertificateIssuerConfig> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                        method: "GET",
                        pathParams: {
                            "certificate-issuer-configuration-id": id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CertificateIssuerConfigAdapter.fromApi(data));
            }
        );
    }
    public update(request: CertificateIssuerConfigUpdateRequest, id: string): Promise<CertificateIssuerConfig> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                        method: "PUT",
                        pathParams: {
                            "certificate-issuer-configuration-id": id,
                        },
                        body: {
                            certificate_issuer_id: request.certificateIssuerId,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CertificateIssuerConfigAdapter.fromApi(data, request));
            }
        );
    }
}

import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { TrustedCertificate } from "./trustedCertificate";
import { TrustedCertificateCreateRequest } from "./types";
import { DeveloperCertificate } from "../../Security/developerCertificate";
import { TrustedCertificateAdapter } from "./trustedCertificateAdapter";
import { TrustedCertificateUpdateRequest } from "./types";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions, OrderEnum } from "../../../../common/interfaces";
/**
 *TrustedCertificate repository
 */
export class TrustedCertificateRepository extends Repository {
    public create(
        request: TrustedCertificateCreateRequest,
        deviceExecutionMode: number,
        isDeveloperCertificate: boolean
    ): Promise<TrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/trusted-certificates",
                        method: "POST",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public delete(deviceExecutionMode: number, id: string, isDeveloperCertificate: boolean): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/trusted-certificates/{cert_id}",
                        method: "DELETE",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public developerCertificateInfo(
        deviceExecutionMode: number,
        id: string,
        isDeveloperCertificate: boolean
    ): Promise<DeveloperCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/developer-certificates/{developerCertificateId}",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(deviceExecutionMode: number, id: string, isDeveloperCertificate: boolean): Promise<TrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/trusted-certificates/{cert_id}",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public list(
        deviceExecutionMode: number,
        isDeveloperCertificate: boolean,
        options?: { after?: string; include?: string; limit?: number; order?: OrderEnum }
    ): Paginator<TrustedCertificate, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<TrustedCertificate>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi(
                        {
                            url: "/v3/trusted-certificates",
                            method: "GET",
                            query: { after, include, order, limit },
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
    public update(
        request: TrustedCertificateUpdateRequest,
        deviceExecutionMode: number,
        id: string,
        isDeveloperCertificate: boolean
    ): Promise<TrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/trusted-certificates/{cert_id}",
                        method: "PUT",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
}

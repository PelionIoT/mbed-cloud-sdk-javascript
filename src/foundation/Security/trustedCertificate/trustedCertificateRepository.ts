import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { TrustedCertificate } from "./trustedCertificate";
import { TrustedCertificateAdapter } from "../../index";
import { TrustedCertificateCreateRequest } from "./types";
import { DeveloperCertificate } from "../../index";
import { DeveloperCertificateAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { TrustedCertificateListOptions } from "./types";
import { TrustedCertificateUpdateRequest } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *TrustedCertificate repository
 */
export class TrustedCertificateRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
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
    /**
     * delete
     * @param id - The ID of the trusted certificate to delete.
     */
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
    /**
     * getDeveloperCertificateInfo
     * @param id - ID that uniquely identifies the developer certificate.
     */
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
    /**
     * list
     * @param options - Options to use for the List
     */
    public list(options?: TrustedCertificateListOptions): Paginator<TrustedCertificate, ListOptions> {
        const pageFunc = (pageOptions: TrustedCertificateListOptions): Promise<Page<TrustedCertificate>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/trusted-certificates",
                            method: "GET",
                            query: {
                                name__eq: extractFilter(pageOptions.filter, "name", "eq"),
                                service__eq: extractFilter(pageOptions.filter, "service", "eq"),
                                expire__eq: extractFilter(pageOptions.filter, "expire", "eq"),
                                device_execution_mode__eq: extractFilter(
                                    pageOptions.filter,
                                    "deviceExecutionMode",
                                    "eq"
                                ),
                                device_execution_mode__neq: extractFilter(
                                    pageOptions.filter,
                                    "deviceExecutionMode",
                                    "neq"
                                ),
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
                        },
                        resultsFn
                    );
                },
                (data: Page<TrustedCertificate>, done) => {
                    done(null, new Page(data, data.data, TrustedCertificateAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - Entity ID.
     */
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
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     */
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

import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantTrustedCertificate } from "./subtenantTrustedCertificate";
import { SubtenantTrustedCertificateAdapter } from "../../index";
import { SubtenantTrustedCertificateCreateRequest } from "./types";
import { DeveloperCertificate } from "../../index";
import { DeveloperCertificateAdapter } from "../../index";
import { SubtenantTrustedCertificateUpdateRequest } from "./types";
/**
 *SubtenantTrustedCertificate repository
 */
export class SubtenantTrustedCertificateRepository extends Repository {
    /**
     * create
     * @returns Promise<SubtenantTrustedCertificate>
     * @param request *required*
     * @param accountId *required*
     */
    public create(
        request: SubtenantTrustedCertificateCreateRequest,
        accountId: string
    ): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates",
                        method: "POST",
                        pathParams: {
                            account_id: accountId,
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
                done(null, SubtenantTrustedCertificateAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @returns Promise<void>
     * @param accountId *required*
     * @param id *required*
     */
    public delete(accountId: string, id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                        method: "DELETE",
                        pathParams: {
                            account_id: accountId,
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
     * @returns Promise<DeveloperCertificate>
     * @param id *required*
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
     * read
     * @returns Promise<SubtenantTrustedCertificate>
     * @param accountId *required*
     * @param id *required*
     */
    public read(accountId: string, id: string): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                        method: "GET",
                        pathParams: {
                            account_id: accountId,
                            cert_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantTrustedCertificateAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @returns Promise<SubtenantTrustedCertificate>
     * @param request *required*
     * @param accountId *required*
     * @param id *required*
     */
    public update(
        request: SubtenantTrustedCertificateUpdateRequest,
        accountId: string,
        id: string
    ): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                        method: "PUT",
                        pathParams: {
                            account_id: accountId,
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
                done(null, SubtenantTrustedCertificateAdapter.fromApi(data, request));
            }
        );
    }
}

import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { SubtenantTrustedCertificate } from "./subtenantTrustedCertificate";
import { SubtenantTrustedCertificateAdapter } from "../../index";
import { SubtenantTrustedCertificateCreateRequest } from "./types";
import { DeveloperCertificate } from "../../index";
import { DeveloperCertificateAdapter } from "../../index";
import { SubtenantTrustedCertificateUpdateRequest } from "./types";
/**
 *SubtenantTrustedCertificate Repository
 */
export class SubtenantTrustedCertificateRepository extends Repository {
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
    public delete(accountId: string, certId: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                        method: "DELETE",
                        pathParams: {
                            account_id: accountId,
                            cert_id: certId,
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
    public developerCertificateInfo(id: string): Promise<DeveloperCertificate> {
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
    public get(accountId: string, certId: string): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                        method: "GET",
                        pathParams: {
                            account_id: accountId,
                            cert_id: certId,
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
    public update(
        request: SubtenantTrustedCertificateUpdateRequest,
        accountId: string,
        certId: string
    ): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                        method: "PUT",
                        pathParams: {
                            account_id: accountId,
                            cert_id: certId,
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

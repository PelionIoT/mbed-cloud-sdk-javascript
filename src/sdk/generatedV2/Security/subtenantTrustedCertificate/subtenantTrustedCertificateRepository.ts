import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { SubtenantTrustedCertificate } from "./subtenantTrustedCertificate";
import { SubtenantTrustedCertificateCreateRequest } from "./types";
import { DeveloperCertificate } from "../../Security/developerCertificate";
import { SubtenantTrustedCertificateUpdateRequest } from "./types";
/**
 *SubtenantTrustedCertificate repository
 */
export class SubtenantTrustedCertificateRepository extends Repository {
    public create(
        request: SubtenantTrustedCertificateCreateRequest,
        accountId: string,
        deviceExecutionMode: number,
        isDeveloperCertificate: boolean
    ): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates",
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
    public delete(
        accountId: string,
        deviceExecutionMode: number,
        id: string,
        isDeveloperCertificate: boolean
    ): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
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
    public get(
        accountId: string,
        deviceExecutionMode: number,
        id: string,
        isDeveloperCertificate: boolean
    ): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
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
    public update(
        request: SubtenantTrustedCertificateUpdateRequest,
        accountId: string,
        deviceExecutionMode: number,
        id: string,
        isDeveloperCertificate: boolean
    ): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
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

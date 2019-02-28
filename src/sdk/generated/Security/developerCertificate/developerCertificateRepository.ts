import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../legacy/common/functions";
import { DeveloperCertificate } from "./developerCertificate";
import { DeveloperCertificateAdapter } from "../../index";
import { DeveloperCertificateCreateRequest } from "./types";
import { TrustedCertificate } from "../../index";
import { TrustedCertificateAdapter } from "../../index";
/**
 *DeveloperCertificate repository
 */
export class DeveloperCertificateRepository extends Repository {
    public create(request: DeveloperCertificateCreateRequest): Promise<DeveloperCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/developer-certificates",
                        method: "POST",
                        body: {
                            description: request.description,
                            name: request.name,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeveloperCertificateAdapter.fromApi(data, request));
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
    public get(id: string): Promise<DeveloperCertificate> {
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
    public getTrustedCertificateInfo(id: string): Promise<TrustedCertificate> {
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
}

import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { TrustedCertificate } from "./trustedCertificate";
import { TrustedCertificateCreateRequest } from "./types";
import { DeveloperCertificate } from "../../Security/developerCertificate";
import { TrustedCertificateUpdateRequest } from "./types";
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
            (_data, done) => {
                done(null, null);
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(id: string): Promise<TrustedCertificate> {
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
            (_data, done) => {
                done(null, null);
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
}

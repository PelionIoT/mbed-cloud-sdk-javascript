import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { CertificateIssuerConfig } from "./certificateIssuerConfig";
import { CertificateIssuerConfigCreateRequest } from "./types";
import { CertificateIssuerConfigUpdateRequest } from "./types";
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
    public get(id: string): Promise<CertificateIssuerConfig> {
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public lwm2m(): Promise<CertificateIssuerConfig> {
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
            (_data, done) => {
                done(null, null);
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
}

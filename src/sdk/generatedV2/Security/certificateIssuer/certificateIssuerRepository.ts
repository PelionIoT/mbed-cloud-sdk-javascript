import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { CertificateIssuer } from "./certificateIssuer";
import { CertificateIssuerCreateRequest } from "./types";
import { CertificateIssuerUpdateRequest } from "./types";
import { VerificationResponse } from "../../Security/verificationResponse";
/**
 *CertificateIssuer repository
 */
export class CertificateIssuerRepository extends Repository {
    public create(request: CertificateIssuerCreateRequest): Promise<CertificateIssuer> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuers",
                        method: "POST",
                        body: {
                            description: request.description,
                            issuer_attributes: request.issuerAttributes,
                            issuer_credentials: request.issuerCredentials,
                            issuer_type: request.issuerType,
                            name: request.name,
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
                        url: "/v3/certificate-issuers/{certificate-issuer-id}",
                        method: "DELETE",
                        pathParams: {
                            "certificate-issuer-id": id,
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
    public get(id: string): Promise<CertificateIssuer> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}",
                        method: "GET",
                        pathParams: {
                            "certificate-issuer-id": id,
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
    public update(request: CertificateIssuerUpdateRequest, id: string): Promise<CertificateIssuer> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}",
                        method: "PUT",
                        pathParams: {
                            "certificate-issuer-id": id,
                        },
                        body: {
                            description: request.description,
                            issuer_attributes: request.issuerAttributes,
                            issuer_credentials: request.issuerCredentials,
                            name: request.name,
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
    public verify(id: string): Promise<VerificationResponse> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}/verify",
                        method: "POST",
                        pathParams: {
                            "certificate-issuer-id": id,
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

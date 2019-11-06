import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DeveloperCertificateAdapter } from "../../index";
import { TrustedCertificate } from "../../index";
import { TrustedCertificateAdapter } from "../../index";
import { DeveloperCertificate } from "./developerCertificate";
import { DeveloperCertificateCreateRequest } from "./types";
/**
 *DeveloperCertificate repository
 */
export class DeveloperCertificateRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
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
     * getTrustedCertificateInfo
     * @param id - Entity ID.
     */
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
    /**
     * read
     * @param id - ID that uniquely identifies the developer certificate.
     */
    public read(id: string): Promise<DeveloperCertificate> {
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
}

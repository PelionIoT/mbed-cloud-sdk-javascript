import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { VerificationResponse } from "../../index";
import { CertificateIssuerIssuerTypeEnum } from "../../enums";

/**
 * CertificateIssuer
 */
export class CertificateIssuer extends EntityBase {
    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * General description for the certificate issuer.
     */
    public description?: string;

    /**
            * General attributes for connecting the certificate issuer.
When the issuer_type is GLOBAL_SIGN, the value shall be empty.
When the issuer_type is CFSSL_AUTH, see definition of CfsslAttributes.
            */
    public issuerAttributes?: { [key: string]: string };

    /**
            * The type of the certificate issuer.
- GLOBAL_SIGN:
  Certificates are issued by GlobalSign service. The users must provide their own GlobalSign account credentials.
- CFSSL_AUTH:
  Certificates are issued by CFSSL authenticated signing service.
  The users must provide their own CFSSL host_url and credentials.
            */
    public issuerType?: CertificateIssuerIssuerTypeEnum;

    /**
     * Certificate issuer name, unique per account.
     */
    public name?: string;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a CertificateIssuer.
     * @returns Promise containing CertificateIssuer.
     */
    public create(issuerCredentials?: { [key: string]: string }): Promise<CertificateIssuer> {
        const body = {
            description: this.description,
            issuer_attributes: this.issuerAttributes,
            issuer_credentials: issuerCredentials,
            issuer_type: this.issuerType,
            name: this.name,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateIssuer>(
                    {
                        url: "/v3/certificate-issuers",
                        method: "POST",
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * deletes a CertificateIssuer.
     * @returns Promise containing CertificateIssuer.
     */
    public delete(): Promise<CertificateIssuer> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateIssuer>(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}",
                        method: "DELETE",
                        pathParams: {
                            "certificate-issuer-id": this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * gets a CertificateIssuer.
     * @returns Promise containing CertificateIssuer.
     */
    public get(): Promise<CertificateIssuer> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateIssuer>(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}",
                        method: "GET",
                        pathParams: {
                            "certificate-issuer-id": this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List CertificateIssuers
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<CertificateIssuer, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<CertificateIssuer>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<CertificateIssuer>(
                        {
                            url: "/v3/certificate-issuers",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        CertificateIssuer,
                        resultsFn
                    );
                },
                (data: ListResponse<CertificateIssuer>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * updates a CertificateIssuer.
     * @returns Promise containing CertificateIssuer.
     */
    public update(issuerCredentials?: { [key: string]: string }): Promise<CertificateIssuer> {
        const body = {
            description: this.description,
            issuer_attributes: this.issuerAttributes,
            issuer_credentials: issuerCredentials,
            name: this.name,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateIssuer>(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}",
                        method: "PUT",
                        pathParams: {
                            "certificate-issuer-id": this.id,
                        },
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * verifys a VerificationResponse.
     * @returns Promise containing VerificationResponse.
     */
    public verify(): Promise<VerificationResponse> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<VerificationResponse>(
                    {
                        url: "/v3/certificate-issuers/{certificate-issuer-id}/verify",
                        method: "POST",
                        pathParams: {
                            "certificate-issuer-id": this.id,
                        },
                    },
                    VerificationResponse,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}

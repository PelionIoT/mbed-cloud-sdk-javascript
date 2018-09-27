import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";

/**
 * CertificateIssuerConfig
 */
export class CertificateIssuerConfig extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
        "certificate-issuer-configuration-id": "id",
    };

    /**
         * The ID of the certificate issuer.
Null if Device Management internal HSM is used.
         */
    public certificateIssuerId?: string;

    /**
     * Created UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * is_custom
     */
    public isCustom?: boolean;

    /**
     * The certificate name to which the certificate issuer configuration applies.
     */
    public reference?: string;

    /**
     * Updated UTC time RFC3339.
     */
    public updatedAt?: Date;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a CertificateIssuerConfig.
     * @returns Promise containing CertificateIssuerConfig.
     */
    public create(): Promise<CertificateIssuerConfig> {
        const body = {
            certificate_issuer_id: this.certificateIssuerId,
            reference: this.reference,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateIssuerConfig>(
                    {
                        url: "/v3/certificate-issuer-configurations",
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
     * deletes a CertificateIssuerConfig.
     * @returns Promise containing CertificateIssuerConfig.
     */
    public delete(): Promise<CertificateIssuerConfig> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateIssuerConfig>(
                    {
                        url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                        method: "DELETE",
                        pathParams: {
                            "certificate-issuer-configuration-id": this.id,
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
     * gets a CertificateIssuerConfig.
     * @returns Promise containing CertificateIssuerConfig.
     */
    public get(): Promise<CertificateIssuerConfig> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateIssuerConfig>(
                    {
                        url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                        method: "GET",
                        pathParams: {
                            "certificate-issuer-configuration-id": this.id,
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
     * List CertificateIssuerConfigs
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<CertificateIssuerConfig, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<CertificateIssuerConfig>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<CertificateIssuerConfig>(
                        {
                            url: "/v3/certificate-issuer-configurations",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        new CertificateIssuerConfig(),
                        resultsFn
                    );
                },
                (data: ListResponse<CertificateIssuerConfig>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * updates a CertificateIssuerConfig.
     * @returns Promise containing CertificateIssuerConfig.
     */
    public update(): Promise<CertificateIssuerConfig> {
        const body = {
            certificate_issuer_id: this.certificateIssuerId,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateIssuerConfig>(
                    {
                        url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                        method: "PUT",
                        pathParams: {
                            "certificate-issuer-configuration-id": this.id,
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
}

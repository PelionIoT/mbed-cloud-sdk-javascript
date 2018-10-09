import { EntityBase } from "../../../common/entityBase";
import * as privateFunctions from "../../../common/privateFunctions";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { DeveloperCertificate } from "../../index";
import { TrustedCertificateServiceEnum } from "../../enums";
import { TrustedCertificateStatusEnum } from "../../enums";

/**
 * TrustedCertificate
 */
export class TrustedCertificate extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
        "cert-id": "id",
    };

    /**
     * The UUID of the account.
     */
    public accountId?: string;

    /**
     * X509.v3 trusted certificate in PEM format.
     */
    public certificate?: string;

    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * Human readable description of this certificate.
     */
    public description?: string;

    /**
     * The type of the certificate.
     */
    get developer(): boolean {
        return privateFunctions.developerCertificateGetter(this);
    }
    set developer(value: boolean) {
        privateFunctions.developerCertificateSetter(this, value);
    }

    /**
     * Device execution mode where 1 means a developer certificate.
     */
    public deviceExecutionMode?: number;

    /**
     * If true, signature is not required. Default value false.
     */
    public enrollmentMode?: boolean;

    /**
     * Issuer of the certificate.
     */
    public issuer?: string;

    /**
     * Certificate name.
     */
    public name?: string;

    /**
     * The UUID of the owner.
     */
    public ownerId?: string;

    /**
     * Service name where the certificate is to be used.
     */
    public service?: TrustedCertificateServiceEnum;

    /**
     * Status of the certificate.
     */
    public status?: TrustedCertificateStatusEnum;

    /**
     * Subject of the certificate.
     */
    public subject?: string;

    /**
     * Last update UTC time RFC3339.
     */
    public updatedAt?: Date;

    /**
     * Expiration time in UTC formatted as RFC3339.
     */
    public validity?: Date;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a TrustedCertificate.
     * @returns Promise containing TrustedCertificate.
     */
    public create(signature?: string): Promise<TrustedCertificate> {
        const body = {
            certificate: this.certificate,
            description: this.description,
            enrollment_mode: this.enrollmentMode,
            name: this.name,
            service: this.service,
            signature: signature,
            status: this.status,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<TrustedCertificate>(
                    {
                        url: "/v3/trusted-certificates",
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
     * deletes a TrustedCertificate.
     * @returns Promise containing TrustedCertificate.
     */
    public delete(): Promise<TrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<TrustedCertificate>(
                    {
                        url: "/v3/trusted-certificates/{cert-id}",
                        method: "DELETE",
                        pathParams: {
                            "cert-id": this.id,
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
     * developerCertificateInfos a DeveloperCertificate.
     * @returns Promise containing DeveloperCertificate.
     */
    public developerCertificateInfo(): Promise<DeveloperCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeveloperCertificate>(
                    {
                        url: "/v3/developer-certificates/{developerCertificateId}",
                        method: "GET",
                        pathParams: {
                            developerCertificateId: this.id,
                        },
                    },
                    DeveloperCertificate,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * gets a TrustedCertificate.
     * @returns Promise containing TrustedCertificate.
     */
    public get(): Promise<TrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<TrustedCertificate>(
                    {
                        url: "/v3/trusted-certificates/{cert-id}",
                        method: "GET",
                        pathParams: {
                            "cert-id": this.id,
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
     * List TrustedCertificates
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<TrustedCertificate, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<TrustedCertificate>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<TrustedCertificate>(
                        {
                            url: "/v3/trusted-certificates",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        TrustedCertificate,
                        resultsFn
                    );
                },
                (data: ListResponse<TrustedCertificate>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * updates a TrustedCertificate.
     * @returns Promise containing TrustedCertificate.
     */
    public update(signature?: string): Promise<TrustedCertificate> {
        const body = {
            certificate: this.certificate,
            description: this.description,
            enrollment_mode: this.enrollmentMode,
            name: this.name,
            service: this.service,
            signature: signature,
            status: this.status,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<TrustedCertificate>(
                    {
                        url: "/v3/trusted-certificates/{cert-id}",
                        method: "PUT",
                        pathParams: {
                            "cert-id": this.id,
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

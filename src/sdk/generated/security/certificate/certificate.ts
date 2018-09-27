import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";

/**
 * Certificate
 */
export class Certificate extends EntityBase {
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
     * PEM format X.509 developer certificate.
     */
    public developerCertificate?: string;

    /**
     * PEM format developer private key associated to the certificate.
     */
    public developerPrivateKey?: string;

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
     * Content of the security.c file that will be flashed into the device to provide the security credentials
     */
    public securityFileContent?: string;

    /**
     * Service name where the certificate is to be used.
     */
    public service?: string;

    /**
     * Status of the certificate.
     */
    public status?: string;

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
     * createDevelopers a Certificate.
     * @returns Promise containing Certificate.
     */
    public createDeveloper(): Promise<Certificate> {
        const body = {
            description: this.description,
            name: this.name,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Certificate>(
                    {
                        url: "/v3/developer-certificates",
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
     * createStandards a Certificate.
     * @returns Promise containing Certificate.
     */
    public createStandard(signature?: string): Promise<Certificate> {
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
                this.client._CallApi<Certificate>(
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
     * deletes a Certificate.
     * @returns Promise containing Certificate.
     */
    public delete(): Promise<Certificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Certificate>(
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
     * getDevelopers a Certificate.
     * @returns Promise containing Certificate.
     */
    public getDeveloper(developerCertificateId: string): Promise<Certificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Certificate>(
                    {
                        url: "/v3/developer-certificates/{developerCertificateId}",
                        method: "GET",
                        pathParams: {
                            developerCertificateId: developerCertificateId,
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
     * getStandards a Certificate.
     * @returns Promise containing Certificate.
     */
    public getStandard(): Promise<Certificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Certificate>(
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
     * List Certificates
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<Certificate, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Certificate>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<Certificate>(
                        {
                            url: "/v3/trusted-certificates",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        new Certificate(),
                        resultsFn
                    );
                },
                (data: ListResponse<Certificate>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * updates a Certificate.
     * @returns Promise containing Certificate.
     */
    public update(signature?: string): Promise<Certificate> {
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
                this.client._CallApi<Certificate>(
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
